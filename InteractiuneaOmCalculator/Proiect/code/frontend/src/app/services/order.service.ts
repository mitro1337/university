import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CheckoutRequest, CheckoutResponse, OrderDetails } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private http = inject(HttpClient);
  private apiUrl = '/api/checkout';

  submitOrder(payload: CheckoutRequest): Observable<CheckoutResponse> {
    return this.http.post<CheckoutResponse>(`${this.apiUrl}/order`, payload);
  }

  getOrder(orderNumber: string): Observable<OrderDetails> {
    return this.http.get<OrderDetails>(`${this.apiUrl}/orders/${orderNumber}`);
  }

  confirmStripePayment(params: {
    orderNumber: string;
    paymentIntentId?: string;
    status: 'succeeded' | 'failed';
    cardLast4?: string;
    cardBrand?: string;
    errorMessage?: string;
  }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/stripe/confirm`, params);
  }

  simulateNetopiaCallback(orderId: string, action: 'confirmed' | 'rejected', cardLast4 = '4242', bankName = 'Banca Transilvania'): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/netopia/simulate-callback`, {
      orderId,
      action,
      cardLast4,
      bankName
    });
  }
}
