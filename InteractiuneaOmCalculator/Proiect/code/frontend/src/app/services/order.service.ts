import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { CheckoutRequest, CheckoutResponse, OrderDetails } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private http = inject(HttpClient);
  private apiUrl = '/api/checkout';

  submitOrder(payload: CheckoutRequest): Observable<CheckoutResponse> {
    return this.http.post<CheckoutResponse>(`${this.apiUrl}/order`, payload).pipe(
      catchError(() => {
        const dateStr = new Date().toISOString().slice(2, 10).replace(/-/g, '');
        const randomSuffix = Math.floor(1000 + Math.random() * 9000);
        const orderNumber = `VEX-${dateStr}-${randomSuffix}`;
        
        const subtotal = payload.items.reduce((acc, it) => acc + (it.quantity * 250), 0);
        const shipping = payload.deliveryMethod === 'ridicare_bucuresti' ? 0 : (payload.deliveryMethod === 'easybox' ? 14 : 19);
        const total = subtotal + shipping;

        const plan = payload.klarnaPlan || 'pay_in_3';
        const installmentAmount = +(total / 3).toFixed(2);
        const now = new Date();
        const d30 = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
        const d60 = new Date(now.getTime() + 60 * 24 * 60 * 60 * 1000);

        const installments = [
          { number: 1, amount: installmentAmount, dueDate: now.toISOString().slice(0, 10), paid: false },
          { number: 2, amount: installmentAmount, dueDate: d30.toISOString().slice(0, 10), paid: false },
          { number: 3, amount: +(total - (installmentAmount * 2)).toFixed(2), dueDate: d60.toISOString().slice(0, 10), paid: false }
        ];

        const localOrder: OrderDetails = {
          id: Math.floor(Math.random() * 10000),
          order_number: orderNumber,
          guest_name: payload.guestName,
          guest_email: payload.guestEmail,
          guest_phone: payload.guestPhone,
          shipping_address: payload.shippingAddress,
          city: payload.city,
          county: payload.county,
          postal_code: payload.postalCode,
          delivery_method: payload.deliveryMethod,
          notes: payload.notes,
          subtotal_ron: subtotal,
          shipping_ron: shipping,
          total_ron: total,
          status: payload.paymentMethod === 'cash_on_delivery' ? 'processing' : 'pending_payment',
          payment_method: payload.paymentMethod,
          klarna_plan: plan,
          klarna_installments: installments,
          created_at: new Date().toISOString(),
          items: payload.items.map(it => ({
            product_id: it.productId,
            product_name: `Echipament #${it.productId}`,
            sku: `VEX-${it.productId}`,
            unit_price_ron: 250,
            quantity: it.quantity,
            subtotal_ron: it.quantity * 250
          }))
        };

        try {
          localStorage.setItem(`vex_order_${orderNumber}`, JSON.stringify(localOrder));
        } catch {}

        const response: CheckoutResponse = {
          success: true,
          orderNumber,
          subtotal,
          shipping,
          total,
          paymentMethod: payload.paymentMethod,
          redirectUrl: payload.paymentMethod === 'klarna_bnpl' 
            ? `/checkout/klarna-gateway?orderId=${orderNumber}&amount=${total}&plan=${plan}`
            : (payload.paymentMethod === 'stripe_card'
                ? `/checkout/stripe-gateway?orderId=${orderNumber}&amount=${total}`
                : `/checkout/confirmare?orderId=${orderNumber}`),
          klarna: {
            sessionId: `klarna_sess_${Date.now()}`,
            clientToken: `kl_ct_${Math.random().toString(36).substring(7)}`,
            paymentUrl: `/checkout/klarna-gateway?orderId=${orderNumber}&amount=${total}&plan=${plan}`,
            plan,
            installments
          },
          stripe: {
            paymentIntentId: `pi_test_${Date.now()}`,
            clientSecret: `pi_sec_${Date.now()}`,
            publishableKey: 'pk_test_sample',
            amount: total,
            currency: 'RON',
            paymentUrl: `/checkout/stripe-gateway?orderId=${orderNumber}&amount=${total}`
          }
        };

        return of(response);
      })
    );
  }

  getOrder(orderNumber: string): Observable<OrderDetails> {
    return this.http.get<OrderDetails>(`${this.apiUrl}/orders/${orderNumber}`).pipe(
      catchError(() => {
        try {
          const stored = localStorage.getItem(`vex_order_${orderNumber}`);
          if (stored) {
            return of(JSON.parse(stored) as OrderDetails);
          }
        } catch {}

        // Fallback default mock order if nothing found
        const fallback: OrderDetails = {
          id: 101,
          order_number: orderNumber,
          guest_name: 'Alex Popescu (DevOps Lab)',
          guest_email: 'alex.popescu@homelab.local',
          guest_phone: '0740 123 456',
          shipping_address: 'Bd. Dimitrie Pompeiu 10A, Et. 3',
          city: 'București',
          county: 'București',
          delivery_method: 'curier_sameday',
          subtotal_ron: 849.00,
          shipping_ron: 0,
          total_ron: 849.00,
          status: 'paid',
          payment_method: 'klarna_bnpl',
          klarna_plan: 'pay_in_3',
          klarna_installments: [
            { number: 1, amount: 283.00, dueDate: 'Astăzi', paid: true },
            { number: 2, amount: 283.00, dueDate: 'Peste 30 zile', paid: false },
            { number: 3, amount: 283.00, dueDate: 'Peste 60 zile', paid: false }
          ],
          created_at: new Date().toISOString(),
          items: [
            {
              product_id: 1,
              product_name: 'HackRF One Software Defined Radio Transceiver 1MHz-6GHz',
              sku: 'HRF-ONE-R9',
              unit_price_ron: 849.00,
              quantity: 1,
              subtotal_ron: 849.00,
              image_url: 'data/images/hackrf.png'
            }
          ]
        };
        return of(fallback);
      })
    );
  }

  confirmKlarnaPayment(params: {
    orderNumber: string;
    sessionId?: string;
    status: 'authorized' | 'rejected';
    plan?: string;
    installments?: any[];
  }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/klarna/confirm`, params).pipe(
      catchError(() => {
        try {
          const stored = localStorage.getItem(`vex_order_${params.orderNumber}`);
          if (stored) {
            const ord = JSON.parse(stored) as OrderDetails;
            ord.status = params.status === 'authorized' ? 'paid' : 'cancelled';
            if (params.plan) (ord as any).klarna_plan = params.plan;
            if (params.installments) {
              (ord as any).klarna_installments = params.installments;
            }
            localStorage.setItem(`vex_order_${params.orderNumber}`, JSON.stringify(ord));
          }
        } catch {}
        return of({ success: params.status === 'authorized', status: params.status });
      })
    );
  }

  confirmStripePayment(params: {
    orderNumber: string;
    paymentIntentId?: string;
    status: 'succeeded' | 'failed';
    cardLast4?: string;
    cardBrand?: string;
    errorMessage?: string;
  }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/stripe/confirm`, params).pipe(
      catchError(() => of({ success: params.status === 'succeeded', status: params.status }))
    );
  }

  simulateNetopiaCallback(orderId: string, action: 'confirmed' | 'rejected', cardLast4 = '4242', bankName = 'Banca Transilvania'): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/netopia/simulate-callback`, {
      orderId,
      action,
      cardLast4,
      bankName
    }).pipe(
      catchError(() => of({ success: action === 'confirmed', status: action }))
    );
  }
}
