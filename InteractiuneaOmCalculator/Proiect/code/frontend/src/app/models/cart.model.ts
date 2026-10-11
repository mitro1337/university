import { Product } from './product.model';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartSummary {
  itemsCount: number;
  subtotalRon: number;
  shippingRon: number;
  totalRon: number;
  freeShippingRemainingRon: number;
  isFreeShipping: boolean;
}
