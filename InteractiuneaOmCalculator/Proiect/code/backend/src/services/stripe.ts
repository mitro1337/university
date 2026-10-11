import { pool } from '../db.js';

export interface StripeInitiateParams {
  orderNumber: string;
  amount: number;
  currency: string;
  guestEmail: string;
  guestName: string;
  description: string;
}

export interface StripeInitiateResult {
  paymentIntentId: string;
  clientSecret: string;
  publishableKey: string;
  amount: number;
  currency: string;
  paymentUrl: string;
}

export class StripePaymentsService {
  private publishableKey: string;
  private secretKey: string;

  constructor() {
    this.publishableKey = process.env.STRIPE_PUBLISHABLE_KEY || 'pk_test_51VexeraDemoKey2026';
    this.secretKey = process.env.STRIPE_SECRET_KEY || 'sk_test_51VexeraDemoSecret2026';
  }

  /**
   * Creates a Stripe PaymentIntent simulation
   */
  public async createPaymentIntent(params: StripeInitiateParams): Promise<StripeInitiateResult> {
    const conn = await pool.getConnection();
    try {
      // Find the order in DB
      const [orderRows]: any = await conn.query('SELECT id FROM orders WHERE order_number = ?', [params.orderNumber]);
      if (orderRows.length === 0) {
        throw new Error(`Comanda ${params.orderNumber} nu a fost găsită.`);
      }
      const orderId = orderRows[0].id;

      const paymentIntentId = `pi_test_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
      const clientSecret = `${paymentIntentId}_secret_${Math.random().toString(36).substring(2, 10)}`;

      // Record transaction
      await conn.query(
        `INSERT INTO payment_transactions (order_id, netopia_order_id, amount_ron, currency, status, raw_ipn_data)
         VALUES (?, ?, ?, ?, 'initiated', ?)`,
        [orderId, paymentIntentId, params.amount.toFixed(2), params.currency, JSON.stringify({ clientSecret, email: params.guestEmail })]
      );

      const paymentUrl = `/checkout/stripe-gateway?orderId=${encodeURIComponent(params.orderNumber)}&pi=${paymentIntentId}&amount=${params.amount.toFixed(2)}`;

      return {
        paymentIntentId,
        clientSecret,
        publishableKey: this.publishableKey,
        amount: params.amount,
        currency: params.currency,
        paymentUrl
      };
    } finally {
      conn.release();
    }
  }

  /**
   * Process Stripe Payment Confirmation / Webhook
   */
  public async confirmPayment(params: {
    orderNumber: string;
    paymentIntentId: string;
    status: 'succeeded' | 'requires_action' | 'failed';
    cardLast4?: string;
    cardBrand?: string;
    errorMessage?: string;
  }): Promise<{ success: boolean; message: string }> {
    const conn = await pool.getConnection();
    try {
      await conn.beginTransaction();

      const [orderRows]: any = await conn.query('SELECT * FROM orders WHERE order_number = ? FOR UPDATE', [params.orderNumber]);
      if (orderRows.length === 0) {
        throw new Error(`Comanda ${params.orderNumber} nu a fost găsită.`);
      }
      const order = orderRows[0];

      if (params.status === 'succeeded') {
        const chargeId = `ch_test_${Date.now()}`;

                await conn.query(
          `UPDATE orders 
           SET status = 'paid', 
               netopia_transaction_id = ?, 
               netopia_auth_code = ?,
               updated_at = NOW() 
           WHERE id = ?`,
          [params.paymentIntentId || chargeId, `AUTH-STRIPE-${params.cardLast4 || '4242'}`, order.id]
        );

                const [items]: any = await conn.query('SELECT product_id, quantity FROM order_items WHERE order_id = ?', [order.id]);
        for (const it of items) {
          await conn.query(
            `UPDATE products 
             SET stock = GREATEST(0, stock - ?),
                 stock_status = CASE 
                   WHEN stock - ? <= 0 THEN 'out_of_stock'
                   WHEN stock - ? <= 5 THEN 'low_stock'
                   ELSE 'in_stock'
                 END
             WHERE id = ?`,
            [it.quantity, it.quantity, it.quantity, it.product_id]
          );
        }

                await conn.query(
          `UPDATE payment_transactions 
           SET status = 'confirmed', 
               raw_ipn_data = ? 
           WHERE order_id = ?`,
          [JSON.stringify({ chargeId, cardLast4: params.cardLast4, cardBrand: params.cardBrand }), order.id]
        );

        await conn.commit();
        return { success: true, message: 'Plata a fost autorizată cu succes prin Stripe.' };
      } else {
        // Payment failed
        await conn.query(
          `UPDATE orders SET status = 'failed', updated_at = NOW() WHERE id = ?`,
          [order.id]
        );

        await conn.query(
          `UPDATE payment_transactions SET status = 'rejected', raw_ipn_data = ? WHERE order_id = ?`,
          [JSON.stringify({ error: params.errorMessage || 'Plată refuzată' }), order.id]
        );

        await conn.commit();
        return { success: false, message: params.errorMessage || 'Plata a fost refuzată.' };
      }
    } catch (err) {
      await conn.rollback();
      throw err;
    } finally {
      conn.release();
    }
  }
}

export const stripeService = new StripePaymentsService();
