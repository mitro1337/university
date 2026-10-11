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

export interface PinMapItem {
  pin: string;
  name: string;
  function: string;
}

export interface PinoutInfo {
  total_pins?: number;
  gpio_count?: number;
  logic_level?: string;
  pin_map?: PinMapItem[];
  wiring_notes?: string[];
}

export interface Category {
  id: number;
  slug: string;
  name: string;
  icon: string;
  description: string;
  sort_order: number;
  product_count?: number;
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
  pinout_info?: PinoutInfo | null;
  datasheet_url?: string | null;
  image_url: string;
  badge?: string | null;
  tags: string[];
  rating: number;
  review_count: number;
  featured: boolean;
  compatible_with?: string[];
  skill_level?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  why_buy?: string[];
  why_buy_en?: string[];
  best_for?: string[];
  best_for_en?: string[];
  works_with_os?: string[];
  linux_support?: {
    status: 'mainline' | 'vendor' | 'community' | 'none';
    kernel?: string;
    bootloader?: string;
  };
  power_watts?: number;
  u_height?: number;
  architecture?: 'ARM64' | 'x86_64' | 'RISC-V' | 'ESP32' | 'FPGA' | 'MIPS' | 'AVR' | 'Other';
  ram_gb?: number;
  network_speed?: '1GbE' | '2.5GbE' | '10GbE' | '25GbE' | '40GbE' | '100GbE' | 'Wi-Fi 6';
  documentation_links?: {
    title: string;
    url: string;
    type: 'datasheet' | 'github' | 'manual' | 'firmware' | 'schematic';
  }[];
  compatible_products?: {
    id: number;
    slug: string;
    name: string;
    sku: string;
    price_ron: number;
    old_price_ron?: number | null;
    image_url: string;
    stock_status: string;
    rating: number;
  }[];
}

export interface FilterFacets {
  subcategories: string[];
  minPrice: number;
  maxPrice: number;
  voltages: string[];
  interfaces: string[];
  architectures?: string[];
  ramSizes?: string[];
  networkSpeeds?: string[];
  skillLevels?: string[];
  linuxSupports?: string[];
}
