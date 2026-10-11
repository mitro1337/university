import crypto from 'crypto';
import dotenv from 'dotenv';
import { pool } from '../db.js';

dotenv.config();

export interface NetopiaInitiateParams {
  orderNumber: string;
  amount: number;
  currency: string;
  guestEmail: string;
  guestPhone: string;
  guestName: string;
  description: string;
}

export interface NetopiaInitiateResult {
  paymentUrl: string;
  orderNumber: string;
  token: string;
  envKey?: string;
  data?: string;
  isSandbox: boolean;
  signature: string;
}

export class NetopiaPaymentsService {
  private signature: string;
  private isSandbox: boolean;
  private returnUrl: string;
  private confirmUrl: string;

  constructor() {
    this.signature = process.env.NETOPIA_SIGNATURE || 'KWT-DEMO-NETOPIA-SIGNATURE-2026';
    this.isSandbox = process.env.NETOPIA_SANDBOX !== 'false';
    this.returnUrl = process.env.NETOPIA_RETURN_URL || 'http://localhost:4200/checkout/confirmare';
    this.confirmUrl = process.env.NETOPIA_IPN_URL || 'http://localhost:3001/api/checkout/netopia/ipn';
  }

  /**
   * Generates Netopia transaction token and initiation payload
   */
  public async initiatePayment(params: NetopiaInitiateParams): Promise<NetopiaInitiateResult> {
    const token = crypto.randomBytes(24).toString('hex');
    const timestamp = new Date().toISOString();

    // Record pending transaction in MySQL audit table
    const [orderRows]: any = await pool.query('SELECT id FROM orders WHERE order_number = ?', [params.orderNumber]);
    if (orderRows.length === 0) {
      throw new Error(`Order ${params.orderNumber} not found`);
    }
    const orderId = orderRows[0].id;

    await pool.query(
      `INSERT INTO payment_transactions (order_id, netopia_order_id, amount_ron, currency, status, raw_ipn_data)
       VALUES (?, ?, ?, ?, 'pending', ?)`,
      [
        orderId,
        params.orderNumber,
        params.amount,
        params.currency,
        JSON.stringify({
          initiated_at: timestamp,
          token,
          email: params.guestEmail,
          phone: params.guestPhone,
          signature: this.signature
        })
      ]
    );

    // Build the redirect URL
    // Route to interactive Netopia 3DS simulator
    const paymentUrl = `/checkout/netopia-gateway?orderId=${encodeURIComponent(params.orderNumber)}&token=${token}&amount=${params.amount}`;

    return {
      paymentUrl,
      orderNumber: params.orderNumber,
      token,
      isSandbox: this.isSandbox,
      signature: this.signature,
      envKey: Buffer.from(`ENV_${params.orderNumber}_${Date.now()}`).toString('base64'),
      data: Buffer.from(JSON.stringify({
        orderId: params.orderNumber,
        amount: params.amount,
        currency: params.currency,
        timestamp
      })).toString('base64')
    };
  }

  /**
   * Process and verify Netopia IPN (Instant Payment Notification)
   */
  public async processIPN(payload: {
    orderId: string;
    action: 'confirmed' | 'rejected' | 'error';
    transactionId?: string;
    authCode?: string;
    amount?: number;
    currency?: string;
    errorMessage?: string;
  }): Promise<{ status: string; message: string; xmlResponse: string }> {
    const { orderId, action, transactionId, authCode, amount, errorMessage } = payload;

    const [orderRows]: any = await pool.query(
      'SELECT id, order_number, total_ron, status FROM orders WHERE order_number = ?',
      [orderId]
    );

    if (orderRows.length === 0) {
      return {
        status: 'error',
        message: 'Order not found',
        xmlResponse: '<crc error_type="1" error_code="101">Order not found</crc>'
      };
    }

    const order = orderRows[0];

    // Verify amount if provided
    if (amount && Math.abs(parseFloat(order.total_ron) - amount) > 0.05) {
      return {
        status: 'error',
        message: 'Amount mismatch',
        xmlResponse: '<crc error_type="2" error_code="102">Amount mismatch</crc>'
      };
    }

    if (action === 'confirmed') {
            await pool.query(
        `UPDATE orders 
         SET status = 'paid', 
             netopia_transaction_id = ?, 
             netopia_auth_code = ?,
             updated_at = NOW() 
         WHERE id = ?`,
        [transactionId || `NETOPIA-TX-${Date.now()}`, authCode || `AUTH-${Math.floor(100000 + Math.random() * 900000)}`, order.id]
      );

            const [itemRows]: any = await pool.query(
        'SELECT product_id, quantity FROM order_items WHERE order_id = ?',
        [order.id]
      );

      for (const item of itemRows) {
        await pool.query(
          `UPDATE products 
           SET stock = GREATEST(0, stock - ?),
               stock_status = CASE 
                 WHEN stock - ? <= 0 THEN 'out_of_stock'
                 WHEN stock - ? <= 5 THEN 'low_stock'
                 ELSE 'in_stock'
               END
           WHERE id = ?`,
          [item.quantity, item.quantity, item.quantity, item.product_id]
        );
      }

            await pool.query(
        `UPDATE payment_transactions 
         SET status = 'confirmed', raw_ipn_data = ?
         WHERE order_id = ? AND status = 'pending'
         ORDER BY id DESC LIMIT 1`,
        [JSON.stringify(payload), order.id]
      );

      return {
        status: 'confirmed',
        message: 'Payment confirmed successfully and stock updated',
        xmlResponse: '<crc error_type="0" error_code="0">ok</crc>'
      };
    } else {
      // Payment rejected or error
      await pool.query(
        `UPDATE orders SET status = 'cancelled' WHERE id = ?`,
        [order.id]
      );

      await pool.query(
        `UPDATE payment_transactions 
         SET status = 'rejected', error_message = ?, raw_ipn_data = ?
         WHERE order_id = ? AND status = 'pending'
         ORDER BY id DESC LIMIT 1`,
        [errorMessage || 'Payment rejected by issuing bank', JSON.stringify(payload), order.id]
      );

      return {
        status: 'rejected',
        message: errorMessage || 'Payment rejected',
        xmlResponse: '<crc error_type="0" error_code="0">ok</crc>'
      };
    }
  }
}

export const netopiaService = new NetopiaPaymentsService();
