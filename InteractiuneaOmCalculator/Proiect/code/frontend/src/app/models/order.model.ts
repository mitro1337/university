export interface OrderItemDetails {
  id?: number;
  order_id?: number;
  product_id: number;
  product_name: string;
  sku: string;
  unit_price_ron: number;
  quantity: number;
  subtotal_ron: number;
  image_url?: string;
  slug?: string;
}

export interface OrderDetails {
  id: number;
  order_number: string;
  guest_name: string;
  guest_email: string;
  guest_phone: string;
  shipping_address: string;
  city: string;
  county: string;
  postal_code?: string;
  delivery_method: 'curier_sameday' | 'easybox' | 'ridicare_bucuresti';
  notes?: string;
  subtotal_ron: number;
  shipping_ron: number;
  total_ron: number;
  status: 'pending_payment' | 'paid' | 'processing' | 'shipped' | 'cancelled';
  payment_method: 'stripe_card' | 'netopia_card' | 'cash_on_delivery';
  netopia_transaction_id?: string;
  netopia_auth_code?: string;
  created_at: string;
  items: OrderItemDetails[];
}

export interface CheckoutRequest {
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  shippingAddress: string;
  city: string;
  county: string;
  postalCode?: string;
  deliveryMethod: 'curier_sameday' | 'easybox' | 'ridicare_bucuresti';
  paymentMethod: 'stripe_card' | 'netopia_card' | 'cash_on_delivery';
  notes?: string;
  items: {
    productId: number;
    quantity: number;
  }[];
}

export interface CheckoutResponse {
  success: boolean;
  orderNumber: string;
  subtotal: number;
  shipping: number;
  total: number;
  paymentMethod: string;
  redirectUrl?: string;
  stripe?: {
    paymentIntentId: string;
    clientSecret: string;
    publishableKey: string;
    amount: number;
    currency: string;
    paymentUrl: string;
  };
  netopia?: {
    paymentUrl: string;
    token: string;
  };
}
