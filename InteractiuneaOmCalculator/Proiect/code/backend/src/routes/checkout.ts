import { Router, Request, Response } from 'express';
import { pool } from '../db.js';
import { netopiaService } from '../services/netopia.js';
import { stripeService } from '../services/stripe.js';

export const checkoutRouter = Router();

// Helper to generate unique order number
function generateOrderNumber(): string {
  const dateStr = new Date().toISOString().slice(2, 10).replace(/-/g, '');
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  return `VEX-${dateStr}-${randomSuffix}`;
}

// POST /api/checkout/order - Create guest checkout order
checkoutRouter.post('/order', async (req: Request, res: Response) => {
  const conn = await pool.getConnection();
  try {
    const {
      guestName,
      guestEmail,
      guestPhone,
      shippingAddress,
      city,
      county,
      postalCode = '',
      deliveryMethod = 'curier_sameday',
      paymentMethod = 'stripe_card',
      notes = '',
      items = []
    } = req.body;

        if (!guestName || !guestEmail || !guestPhone || !shippingAddress || !city || !county) {
      return res.status(400).json({ error: 'Toate câmpurile de contact și livrare sunt obligatorii.' });
    }

    if (!items || items.length === 0) {
      return res.status(400).json({ error: 'Coșul de cumpărături este gol.' });
    }

    await conn.beginTransaction();

        let subtotal = 0;
    const validatedItems: any[] = [];

    for (const item of items) {
      const [pRows]: any = await conn.query('SELECT * FROM products WHERE id = ? FOR UPDATE', [item.productId]);
      if (pRows.length === 0) {
        await conn.rollback();
        return res.status(400).json({ error: `Produsul cu ID-ul ${item.productId} nu mai există în catalog.` });
      }

      const prod = pRows[0];
      const unitPrice = parseFloat(prod.price_ron);
      const requestedQty = parseInt(item.quantity, 10) || 1;

      if (prod.stock < requestedQty) {
        await conn.rollback();
        return res.status(400).json({
          error: `Stoc insuficient pentru "${prod.name}". Disponibil: ${prod.stock} buc, solicitat: ${requestedQty} buc.`
        });
      }

      const lineTotal = unitPrice * requestedQty;
      subtotal += lineTotal;

      validatedItems.push({
        productId: prod.id,
        name: prod.name,
        sku: prod.sku,
        unitPrice,
        quantity: requestedQty,
        subtotal: lineTotal,
        imageUrl: prod.image_url
      });
    }

        let shipping = 0;
    if (deliveryMethod === 'ridicare_bucuresti') {
      shipping = 0;
    } else if (subtotal >= 250) {
      shipping = 0; // Transport gratuit peste 250 RON
    } else if (deliveryMethod === 'easybox') {
      shipping = 14.00;
    } else {
      shipping = 19.00; // Curier rapid Sameday
    }

    const total = subtotal + shipping;
    const orderNumber = generateOrderNumber();

        const [orderInsert]: any = await conn.query(
      `INSERT INTO orders (
        order_number, guest_name, guest_email, guest_phone,
        shipping_address, city, county, postal_code, delivery_method,
        notes, subtotal_ron, shipping_ron, total_ron, status, payment_method
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        orderNumber,
        guestName,
        guestEmail,
        guestPhone,
        shippingAddress,
        city,
        county,
        postalCode,
        deliveryMethod,
        notes,
        subtotal.toFixed(2),
        shipping.toFixed(2),
        total.toFixed(2),
        (paymentMethod === 'stripe_card' || paymentMethod === 'netopia_card') ? 'pending_payment' : 'processing',
        paymentMethod === 'netopia_card' ? 'stripe_card' : paymentMethod
      ]
    );

    const orderId = orderInsert.insertId;

        for (const item of validatedItems) {
      await conn.query(
        `INSERT INTO order_items (
          order_id, product_id, product_name, sku, unit_price_ron, quantity, subtotal_ron
        ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          orderId,
          item.productId,
          item.name,
          item.sku,
          item.unitPrice,
          item.quantity,
          item.subtotal
        ]
      );

      // If COD, decrement stock immediately
      if (paymentMethod === 'cash_on_delivery') {
        await conn.query(
          `UPDATE products 
           SET stock = GREATEST(0, stock - ?),
               stock_status = CASE 
                 WHEN stock - ? <= 0 THEN 'out_of_stock'
                 WHEN stock - ? <= 5 THEN 'low_stock'
                 ELSE 'in_stock'
               END
           WHERE id = ?`,
          [item.quantity, item.quantity, item.quantity, item.productId]
        );
      }
    }

    await conn.commit();

        if (paymentMethod === 'stripe_card' || paymentMethod === 'netopia_card') {
      const stripeData = await stripeService.createPaymentIntent({
        orderNumber,
        amount: total,
        currency: 'RON',
        guestEmail,
        guestName,
        description: `Comanda ${orderNumber} - Vexera`
      });

      return res.status(201).json({
        success: true,
        orderNumber,
        subtotal,
        shipping,
        total,
        paymentMethod: 'stripe_card',
        stripe: stripeData,
        // Keep netopia field aliased for backwards compatibility
        netopia: {
          paymentUrl: stripeData.paymentUrl,
          token: stripeData.clientSecret
        }
      });
    }

    // Cash on delivery response
    return res.status(201).json({
      success: true,
      orderNumber,
      subtotal,
      shipping,
      total,
      paymentMethod,
      redirectUrl: `/checkout/confirmare?orderId=${orderNumber}`
    });
  } catch (error: any) {
    await conn.rollback();
    console.error('Checkout error:', error);
    res.status(500).json({ error: error.message || 'Eroare la procesarea comenzii' });
  } finally {
    conn.release();
  }
});

// POST /api/checkout/netopia/ipn - Netopia IPN Webhook callback
checkoutRouter.post('/netopia/ipn', async (req: Request, res: Response) => {
  try {
    console.log('Received Netopia IPN POST:', req.body);
    const { orderId, action = 'confirmed', transactionId, authCode, amount, errorMessage } = req.body;

    if (!orderId) {
      return res.status(400).send('<crc error_type="1" error_code="100">Missing orderId</crc>');
    }

    const result = await netopiaService.processIPN({
      orderId,
      action,
      transactionId,
      authCode,
      amount: amount ? Number(amount) : undefined,
      errorMessage
    });

    res.set('Content-Type', 'application/xml');
    res.status(200).send(result.xmlResponse);
  } catch (error) {
    console.error('Netopia IPN handler error:', error);
    res.status(500).send('<crc error_type="99" error_code="999">Internal error</crc>');
  }
});

// POST /api/checkout/netopia/simulate-callback - Sandbox simulator helper
checkoutRouter.post('/netopia/simulate-callback', async (req: Request, res: Response) => {
  try {
    const { orderId, action, cardLast4 = '4242', bankName = 'Banca Transilvania' } = req.body;
    console.log(`Simulating Netopia 3DS gateway authorization for order ${orderId}: ${action}`);

    const transactionId = `NETOPIA-TX-${Date.now()}`;
    const authCode = `BT-3DS-${Math.floor(100000 + Math.random() * 900000)}`;

    const result = await netopiaService.processIPN({
      orderId,
      action: action === 'confirmed' ? 'confirmed' : 'rejected',
      transactionId,
      authCode,
      errorMessage: action === 'rejected' ? 'Fonduri insuficiente / Card refuzat de banca emitenta' : undefined
    });

    res.json({
      success: result.status === 'confirmed',
      status: result.status,
      transactionId,
      authCode,
      cardLast4,
      bankName,
      message: result.message
    });
  } catch (error: any) {
    console.error('Error simulating Netopia payment:', error);
    res.status(500).json({ error: error.message || 'Simulation error' });
  }
});

// POST /api/checkout/stripe/confirm - Process Stripe payment confirmation / 3DS
checkoutRouter.post('/stripe/confirm', async (req: Request, res: Response) => {
  try {
    const { orderNumber, paymentIntentId, status = 'succeeded', cardLast4 = '4242', cardBrand = 'Visa', errorMessage } = req.body;
    console.log(`Processing Stripe payment for order ${orderNumber}: ${status}`);

    if (!orderNumber) {
      return res.status(400).json({ error: 'orderNumber este obligatoriu' });
    }

    const result = await stripeService.confirmPayment({
      orderNumber,
      paymentIntentId: paymentIntentId || `pi_test_${Date.now()}`,
      status: status === 'succeeded' ? 'succeeded' : 'failed',
      cardLast4,
      cardBrand,
      errorMessage
    });

    res.json(result);
  } catch (error: any) {
    console.error('Error confirming Stripe payment:', error);
    res.status(500).json({ error: error.message || 'Eroare la confirmarea plății Stripe' });
  }
});

// GET /api/orders/:orderNumber - Fetch order status and receipt details
checkoutRouter.get('/orders/:orderNumber', async (req: Request, res: Response) => {
  try {
    const { orderNumber } = req.params;

    const [orderRows]: any = await pool.query(
      `SELECT * FROM orders WHERE order_number = ? LIMIT 1`,
      [orderNumber]
    );

    if (orderRows.length === 0) {
      return res.status(404).json({ error: 'Comanda nu a fost găsită' });
    }

    const order = orderRows[0];

    const [items]: any = await pool.query(
      `SELECT oi.*, p.image_url, p.slug
       FROM order_items oi
       LEFT JOIN products p ON oi.product_id = p.id
       WHERE oi.order_id = ?`,
      [order.id]
    );

    const [txRows]: any = await pool.query(
      `SELECT * FROM payment_transactions WHERE order_id = ? ORDER BY id DESC`,
      [order.id]
    );

    res.json({
      ...order,
      subtotal_ron: parseFloat(order.subtotal_ron),
      shipping_ron: parseFloat(order.shipping_ron),
      total_ron: parseFloat(order.total_ron),
      items: items.map((it: any) => ({
        ...it,
        unit_price_ron: parseFloat(it.unit_price_ron),
        subtotal_ron: parseFloat(it.subtotal_ron)
      })),
      transactions: txRows
    });
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ error: 'Eroare la căutarea comenzii' });
  }
});
