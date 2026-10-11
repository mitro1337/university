export interface Category {
  id: number;
  slug: string;
  name: string;
  icon: string;
  description: string;
  sort_order: number;
}

export interface TechnicalSpecs {
  operating_voltage?: string;
  processor?: string;
  ram?: string;
  storage?: string;
  interfaces?: string[];
  power_consumption?: string;
  dimensions?: string;
  form_factor?: string;
  operating_temperature?: string;
  connectivity?: string;
  ports?: string;
  accuracy?: string;
  range?: string;
  [key: string]: any;
}

export interface PinoutInfo {
  total_pins?: number;
  gpio_count?: number;
  logic_level?: string;
  pin_map?: { pin: string; name: string; function: string }[];
  wiring_notes?: string[];
}

export interface Product {
  id: number;
  slug: string;
  name: string;
  sku: string;
  mpn?: string;
  category_id: number;
  category_slug?: string;
  category_name?: string;
  subcategory: string;
  price_ron: number;
  old_price_ron?: number | null;
  stock: number;
  stock_status: 'in_stock' | 'low_stock' | 'out_of_stock';
  short_desc: string;
  full_desc: string;
  technical_specs: TechnicalSpecs;
  pinout_info?: PinoutInfo;
  datasheet_url?: string;
  image_url: string;
  badge?: string;
  tags: string[];
  rating: number;
  review_count: number;
  featured: boolean;
  compatible_with?: string[];
  created_at?: string;
}

export interface OrderItem {
  id?: number;
  order_id?: number;
  product_id: number;
  product_name: string;
  sku: string;
  unit_price_ron: number;
  quantity: number;
  subtotal_ron: number;
  image_url?: string;
}

export interface Order {
  id?: number;
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
  payment_method: 'netopia_card' | 'cash_on_delivery';
  netopia_transaction_id?: string;
  netopia_auth_code?: string;
  created_at?: string;
  updated_at?: string;
  items?: OrderItem[];
}

export interface PaymentTransaction {
  id?: number;
  order_id: number;
  netopia_order_id: string;
  amount_ron: number;
  currency: string;
  status: 'pending' | 'confirmed' | 'rejected' | 'error';
  error_message?: string;
  raw_ipn_data?: string;
  created_at?: string;
}
