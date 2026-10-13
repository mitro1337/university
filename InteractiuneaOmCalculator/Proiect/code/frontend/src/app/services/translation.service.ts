import { Injectable, signal, computed } from '@angular/core';

export type Language = 'ro' | 'en';

export interface Translations {
  [key: string]: {
    ro: string;
    en: string;
  };
}

export const DICTIONARY: Translations = {
  // Brand
  brand_name: {
    ro: 'Vexera',
    en: 'Vexera'
  },
  
  // Announcement / Top Bar
  support_phone: {
    ro: 'Suport: 0720 123 456',
    en: 'Support: +40 720 123 456'
  },
  work_hours: {
    ro: 'Luni - Vineri: 09:00 - 18:00',
    en: 'Mon - Fri: 09:00 - 18:00'
  },
  warehouse_info: {
    ro: 'Depozit București: Expedieri în 24h',
    en: 'Bucharest Hub: 24h Dispatch'
  },
  free_shipping_notice: {
    ro: 'Transport Gratuit peste 250 lei',
    en: 'Free Shipping over 250 lei'
  },
  secure_payments: {
    ro: 'Plăți Securizate Stripe',
    en: 'Secure Stripe Payments'
  },
  track_order_top: {
    ro: 'Urmărește comanda',
    en: 'Track order'
  },

  // Search & Header
  search_placeholder: {
    ro: 'Cauta un produs..',
    en: 'Search for a product..'
  },
  search_btn_title: {
    ro: 'Caută',
    en: 'Search'
  },
  cart_label: {
    ro: 'Coș Cumpărături',
    en: 'Shopping Cart'
  },
  all_products_menu: {
    ro: 'TOATE PRODUSELE',
    en: 'ALL PRODUCTS'
  },
  cat_sbc: {
    ro: 'Plăci SBC & Microcontrolere',
    en: 'SBCs & Microcontrollers'
  },
  cat_homelab: {
    ro: 'Homelab & Rețea 10G',
    en: 'Homelab & 10G Networking'
  },
  cat_sensors: {
    ro: 'Senzori & Module IoT',
    en: 'Sensors & IoT Modules'
  },
  cat_power: {
    ro: 'Alimentare & Conectică',
    en: 'Power & Connectivity'
  },
  cat_enterprise: {
    ro: 'Enterprise & Datacenter',
    en: 'Enterprise & Datacenter'
  },
  cat_niche: {
    ro: 'Hardware Nișat & Lab',
    en: 'Niche Hardware & Lab'
  },
  cat_cybersecurity: {
    ro: 'Cybersecurity & Pentest',
    en: 'Cybersecurity & Pentest'
  },
  stock_realtime: {
    ro: 'Stoc verificat în timp real',
    en: 'Real-time verified stock'
  },

  // Home Page Hero
  hero_badge: {
    ro: 'COMPONENTE HARDWARE & HOMELAB TESTATE',
    en: 'TESTED HARDWARE & HOMELAB COMPONENTS'
  },
  hero_title_1: {
    ro: 'Infrastructură Homelab &',
    en: 'Homelab Infrastructure &'
  },
  hero_title_2: {
    ro: 'Microcontrolere de Top',
    en: 'Premium Microcontrollers'
  },
  hero_desc: {
    ro: 'Echipamente de rețea 10GbE, SBC-uri Raspberry Pi, microcontrolere ESP32/Arduino și senzori de precizie cu livrare rapidă din stoc.',
    en: '10GbE network cards, Raspberry Pi SBCs, ESP32/Arduino microcontrollers and precision sensors with fast warehouse dispatch.'
  },
  hero_btn_explore: {
    ro: 'Explorează Catalogul',
    en: 'Explore Catalog'
  },
  hero_btn_homelab: {
    ro: 'Vezi Proiecte Homelab',
    en: 'View Homelab Gear'
  },

  // Trust Badges
  trust_1_title: {
    ro: 'Expediere în 24h',
    en: '24h Dispatch'
  },
  trust_1_sub: {
    ro: 'Din depozitul din București',
    en: 'From Bucharest warehouse'
  },
  trust_2_title: {
    ro: 'Retur Garantat 14 Zile',
    en: '14-Day Guaranteed Return'
  },
  trust_2_sub: {
    ro: 'Conform OUG 34/2014 fără bătăi de cap',
    en: 'EU Compliant hassle-free returns'
  },
  trust_3_title: {
    ro: 'Garanție 24 Luni',
    en: '24-Month Warranty'
  },
  trust_3_sub: {
    ro: 'Produse originale testate',
    en: 'Original tested products'
  },
  trust_4_title: {
    ro: 'Suport Tehnic Specializat',
    en: 'Expert Tech Support'
  },
  trust_4_sub: {
    ro: 'Consiliere hardware & rețea',
    en: 'Hardware & network advice'
  },

  // Home Tabs
  tab_popular: {
    ro: 'Cele Mai Populare',
    en: 'Most Popular'
  },
  tab_sbc: {
    ro: 'Noutăți & SBC',
    en: 'New Arrivals & SBC'
  },
  tab_10g: {
    ro: 'Rețelistică 10G',
    en: '10G Networking'
  },
  view_all_products: {
    ro: 'Vezi toate produsele →',
    en: 'View all products →'
  },

  // Catalog
  catalog_title: {
    ro: 'Catalog Componente & Echipamente',
    en: 'Components & Equipment Catalog'
  },
  catalog_subtitle: {
    ro: 'Găsește exact piesele de care ai nevoie pentru proiectul tău de rețea, server sau IoT.',
    en: 'Find exactly the hardware you need for your networking, server, or IoT projects.'
  },
  filter_categories: {
    ro: 'Categorii',
    en: 'Categories'
  },
  filter_all: {
    ro: 'Toate Categoriile',
    en: 'All Categories'
  },
  filter_stock: {
    ro: 'Disponibilitate',
    en: 'Availability'
  },
  filter_instock_only: {
    ro: 'Doar produse în stoc',
    en: 'In-stock only'
  },
  filter_price: {
    ro: 'Interval Preț (lei)',
    en: 'Price Range (lei)'
  },
  filter_reset: {
    ro: 'Resetează filtrele',
    en: 'Reset filters'
  },
  sort_by: {
    ro: 'Sortează după:',
    en: 'Sort by:'
  },
  sort_recommended: {
    ro: 'Recomandate Vexera',
    en: 'Recommended by Vexera'
  },
  sort_price_asc: {
    ro: 'Preț: Crescător',
    en: 'Price: Low to High'
  },
  sort_price_desc: {
    ro: 'Preț: Descrescător',
    en: 'Price: High to Low'
  },
  sort_rating: {
    ro: 'Cele mai apreciate',
    en: 'Top Rated'
  },
  products_found: {
    ro: 'produse găsite',
    en: 'products found'
  },
  no_products_found: {
    ro: 'Nu am găsit produse conform filtrelor selectate.',
    en: 'No products found matching your current filters.'
  },

  // Product Card & Details
  btn_add_to_cart: {
    ro: 'Adaugă în coș',
    en: 'Add to cart'
  },
  btn_in_cart: {
    ro: 'În coș',
    en: 'In cart'
  },
  badge_in_stock: {
    ro: 'În stoc',
    en: 'In stock'
  },
  badge_low_stock: {
    ro: 'Stoc limitat',
    en: 'Low stock'
  },
  badge_out_of_stock: {
    ro: 'Stoc epuizat',
    en: 'Out of stock'
  },
  specs_title: {
    ro: 'Specificații Tehnice',
    en: 'Technical Specifications'
  },
  desc_title: {
    ro: 'Descriere Produs',
    en: 'Product Description'
  },
  pinout_title: {
    ro: 'Diagramă Pini & Conexiuni',
    en: 'Pinout & Connections'
  },
  compatible_with: {
    ro: 'Compatibil cu:',
    en: 'Compatible with:'
  },
  sku_label: {
    ro: 'Cod Produs (SKU):',
    en: 'Product SKU:'
  },
  category_label: {
    ro: 'Categorie:',
    en: 'Category:'
  },
  reviews_label: {
    ro: 'recenzii verificate',
    en: 'verified reviews'
  },

  // Cart Drawer
  cart_drawer_title: {
    ro: 'Coșul Tău de Cumpărături',
    en: 'Your Shopping Cart'
  },
  cart_empty_title: {
    ro: 'Coșul tău este gol',
    en: 'Your cart is empty'
  },
  cart_empty_desc: {
    ro: 'Adaugă componente hardware sau module din catalog pentru a plasa o comandă.',
    en: 'Add hardware components or modules from our catalog to place an order.'
  },
  cart_subtotal: {
    ro: 'Subtotal:',
    en: 'Subtotal:'
  },
  cart_shipping: {
    ro: 'Cost Livrare:',
    en: 'Shipping Cost:'
  },
  shipping_free: {
    ro: 'GRATUIT',
    en: 'FREE'
  },
  shipping_calculated_checkout: {
    ro: 'Calculat la checkout',
    en: 'Calculated at checkout'
  },
  cart_total_estimated: {
    ro: 'Total estimat:',
    en: 'Estimated total:'
  },
  cart_checkout_btn: {
    ro: 'Mergi la Finalizare Comandă →',
    en: 'Proceed to Checkout →'
  },
  cart_continue_btn: {
    ro: 'Continuă cumpărăturile',
    en: 'Continue shopping'
  },
  free_shipping_progress: {
    ro: 'Mai adaugă produse de',
    en: 'Add another'
  },
  free_shipping_progress_tail: {
    ro: 'lei pentru transport gratuit!',
    en: 'lei for free shipping!'
  },
  free_shipping_unlocked: {
    ro: 'Felicitări! Beneficiezi de transport gratuit prin Sameday!',
    en: 'Congratulations! You qualify for free delivery with Sameday!'
  },

  // Checkout Page
  checkout_guest_badge: {
    ro: 'COMANDĂ RAPIDĂ FĂRĂ CONT OBLIGATORIU (GUEST CHECKOUT)',
    en: 'FAST ORDER WITHOUT MANDATORY ACCOUNT (GUEST CHECKOUT)'
  },
  checkout_title: {
    ro: 'Finalizare Comandă Securizată',
    en: 'Secure Order Checkout'
  },
  checkout_subtitle: {
    ro: 'Completează datele de expediere și alege modalitatea de plată preferată',
    en: 'Fill in your delivery details and choose your preferred payment method'
  },
  step_1_title: {
    ro: 'Date de Contact & Destinatar',
    en: 'Contact & Recipient Details'
  },
  field_name: {
    ro: 'Nume și Prenume *',
    en: 'Full Name *'
  },
  field_email: {
    ro: 'Adresă Email (confirmare și factură) *',
    en: 'Email Address (confirmation & invoice) *'
  },
  field_phone: {
    ro: 'Număr Telefon (SMS curier) *',
    en: 'Phone Number (courier SMS notification) *'
  },
  delivery_select_title: {
    ro: 'Selectează Modalitatea de Livrare *',
    en: 'Select Delivery Method *'
  },
  delivery_sameday: {
    ro: 'Curier Rapid Sameday (Livrare la adresă)',
    en: 'Sameday Express Courier (Doorstep delivery)'
  },
  delivery_sameday_sub: {
    ro: 'Livrare în 24-48 ore lucrătoare direct la ușa ta',
    en: 'Delivery in 24-48 business hours directly to your door'
  },
  delivery_easybox: {
    ro: 'Locker Sameday Easybox (Ridicare 24/7)',
    en: 'Sameday Easybox Locker (24/7 Pickup)'
  },
  delivery_easybox_sub: {
    ro: 'Ridici coletul oricând folosind codul QR/PIN primit prin SMS',
    en: 'Pick up your package anytime using the PIN/QR received via SMS'
  },
  delivery_warehouse: {
    ro: 'Ridicare Personală Depozit București',
    en: 'Self-Pickup Bucharest Warehouse'
  },
  delivery_warehouse_sub: {
    ro: 'Sector 2, Șos. Fabrica de Glucoză (L-V 10:00 - 18:00)',
    en: 'Sector 2, Fabrica de Glucoza (Mon-Fri 10:00 - 18:00)'
  },
  field_address: {
    ro: 'Stradă, Număr, Bloc, Apartament *',
    en: 'Street, Number, Building, Apartment *'
  },
  field_county: {
    ro: 'Județ *',
    en: 'County *'
  },
  field_city: {
    ro: 'Localitate / Oraș *',
    en: 'City / Town *'
  },
  field_notes: {
    ro: 'Mențiuni pentru curier sau instrucțiuni de livrare (opțional)',
    en: 'Courier notes or delivery instructions (optional)'
  },
  step_2_title: {
    ro: 'Metodă de Plată',
    en: 'Payment Method'
  },
  pay_stripe_title: {
    ro: 'Card Bancar Online / Apple Pay / Google Pay (Stripe)',
    en: 'Online Card / Apple Pay / Google Pay (Stripe)'
  },
  pay_stripe_badge: {
    ro: 'Securizat 3D-Secure',
    en: 'Secure 3D-Secure'
  },
  pay_stripe_desc: {
    ro: 'Procesare instantanee securizată prin Stripe (Visa, Mastercard, Revolut, Apple Pay, Google Pay).',
    en: 'Instant secure processing via Stripe (Visa, Mastercard, Revolut, Apple Pay, Google Pay).'
  },
  pay_stripe_simulator_hint: {
    ro: 'Vei fi direcționat către poarta securizată Stripe Checkout',
    en: 'You will be redirected to the secure Stripe Checkout gateway'
  },
  pay_cod_title: {
    ro: 'Plată Ramburs la Livrare (Numerar / Card la curier)',
    en: 'Cash on Delivery (Cash / Card to courier)'
  },
  pay_cod_desc: {
    ro: 'Achiti contravaloarea comenzii la preluarea coletului',
    en: 'Pay for your order upon receiving the package'
  },
  summary_title: {
    ro: 'Sumar Comandă',
    en: 'Order Summary'
  },
  summary_modify: {
    ro: 'Modifică',
    en: 'Edit'
  },
  summary_subtotal: {
    ro: 'Subtotal produse:',
    en: 'Items subtotal:'
  },
  summary_shipping: {
    ro: 'Cost transport:',
    en: 'Shipping cost:'
  },
  summary_total: {
    ro: 'Total de Plată:',
    en: 'Total to Pay:'
  },
  summary_vat_note: {
    ro: 'Preț final în lei • TVA inclus',
    en: 'Final price in lei • VAT included'
  },
  btn_pay_stripe: {
    ro: 'Plătește prin Stripe →',
    en: 'Pay with Stripe →'
  },
  btn_place_cod: {
    ro: 'Plasează Comanda (Ramburs) →',
    en: 'Place Order (COD) →'
  },
  btn_generating: {
    ro: 'Se generează comanda...',
    en: 'Creating your order...'
  },
  security_guarantee_title: {
    ro: 'Securitate Tranzacție Garantată',
    en: 'Guaranteed Transaction Security'
  },
  security_guarantee_desc: {
    ro: 'Datele tale sunt criptate SSL pe 256 de biți. Tranzacțiile cu cardul sunt procesate de Stripe conform standardului PCI-DSS Nivel 1.',
    en: 'Your data is encrypted with 256-bit SSL. Card payments are handled by Stripe under PCI-DSS Level 1 compliance.'
  },

  // Order Tracking Page
  track_heading: {
    ro: 'Verifică Starea Comenzii Tale',
    en: 'Track Your Order Status'
  },
  track_subheading: {
    ro: 'Introdu numărul comenzii primit pe email (format: VEX-XXXX-XXXX) pentru a vedea statusul în timp real din depozit și la curier.',
    en: 'Enter your order number from your confirmation email (format: VEX-XXXX-XXXX) to check real-time warehouse & courier status.'
  },
  track_btn: {
    ro: 'Verifică',
    en: 'Check'
  },
  track_step_1: {
    ro: '1. Preluată',
    en: '1. Received'
  },
  track_step_1_sub: {
    ro: 'Comandă înregistrată',
    en: 'Order registered'
  },
  track_step_2: {
    ro: '2. Plătită',
    en: '2. Paid'
  },
  track_step_2_sub: {
    ro: 'Stripe 3D-Secure',
    en: 'Stripe 3D-Secure'
  },
  track_step_3: {
    ro: '3. Ambalată',
    en: '3. Packed'
  },
  track_step_3_sub: {
    ro: 'Depozit București',
    en: 'Bucharest Hub'
  },
  track_step_4: {
    ro: '4. Curier',
    en: '4. Courier'
  },
  track_step_4_sub: {
    ro: 'Sameday AWB',
    en: 'Sameday AWB'
  },

  // Footer
  footer_about: {
    ro: 'Vexera este o platformă modernă dedicată pasionaților de homelab, rețelistică 10GbE, microcontrolere și proiecte hardware. Produse originale, stocuri reale și expediere rapidă din București.',
    en: 'Vexera is a modern platform built for homelab enthusiasts, 10GbE networking, microcontrollers, and hardware tinkerers. Genuine hardware, live inventory, and fast dispatch from Bucharest.'
  },
  footer_quick_links: {
    ro: 'Link-uri Rapide',
    en: 'Quick Links'
  },
  footer_categories: {
    ro: 'Categorii Tehnice',
    en: 'Technical Categories'
  },
  footer_contact_info: {
    ro: 'Informații Depozit & Contact',
    en: 'Warehouse & Contact Info'
  },
  footer_rights: {
    ro: 'Toate drepturile rezervate.',
    en: 'All rights reserved.'
  }
};

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  // Signal for current language
  readonly currentLanguage = signal<Language>(this.getInitialLanguage());

  // Computed helper for isRomanian / isEnglish
  readonly isRo = computed(() => this.currentLanguage() === 'ro');
  readonly isEn = computed(() => this.currentLanguage() === 'en');

  constructor() {
    // Sync html lang attribute
    this.updateHtmlLang(this.currentLanguage());
  }

  private getInitialLanguage(): Language {
    if (typeof window !== 'undefined' && window.localStorage) {
      const saved = window.localStorage.getItem('vexera_lang');
      if (saved === 'ro' || saved === 'en') {
        return saved;
      }
    }
    return 'ro';
  }

  public setLanguage(lang: Language): void {
    this.currentLanguage.set(lang);
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem('vexera_lang', lang);
    }
    this.updateHtmlLang(lang);
  }

  public toggleLanguage(): void {
    const next: Language = this.currentLanguage() === 'ro' ? 'en' : 'ro';
    this.setLanguage(next);
  }

  private updateHtmlLang(lang: Language): void {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang;
    }
  }

  /**
   * Translate a key into the current active language
   */
  public translate(key: string, defaultFallback?: string): string {
    const entry = DICTIONARY[key];
    if (!entry) {
      return defaultFallback || key;
    }
    return entry[this.currentLanguage()] || defaultFallback || key;
  }

  /**
   * Shorthand alias
   */
  public t(key: string, defaultFallback?: string): string {
    return this.translate(key, defaultFallback);
  }

  public currencyLabel(): string {
    return this.isRo() ? 'lei' : 'RON';
  }

  public getCategoryName(slug?: string, fallback?: string): string {
    if (!slug) return fallback || '';
    const map: Record<string, { ro: string; en: string }> = {
      'sbc-microcontrollers': {
        ro: 'Plăci de Dezvoltare & SBC',
        en: 'Development Boards & SBCs'
      },
      'homelab-networking': {
        ro: 'Homelab & Echipamente Rețea',
        en: 'Homelab & Networking Hardware'
      },
      'sensors-iot': {
        ro: 'Senzori & Module IoT',
        en: 'Sensors & IoT Modules'
      },
      'power-accessories': {
        ro: 'Alimentare, Răcire & Conectică',
        en: 'Power, Cooling & Connectivity'
      },
      'enterprise-hardware': {
        ro: 'Infrastructură Enterprise & Datacenter',
        en: 'Enterprise & Datacenter Infrastructure'
      },
      'niche-hardware': {
        ro: 'Hardware Nișat & Cercetare / Lab',
        en: 'Niche Hardware & Research Lab'
      },
      'cybersecurity-research': {
        ro: 'Cybersecurity & Security Research',
        en: 'Cybersecurity & Security Research'
      }
    };
    const item = map[slug];
    if (item) {
      return item[this.currentLanguage()];
    }
    return fallback || slug;
  }

  public getCategoryDescription(slug?: string, fallback?: string): string {
    if (!slug) return fallback || '';
    const map: Record<string, { ro: string; en: string }> = {
      'sbc-microcontrollers': {
        ro: 'Calculatoare pe o singură placă (SBC), microcontrolere avansate ARM/RISC-V, plăci Edge AI, module ESP32 Wi-Fi 6 / Zigbee și Arduino.',
        en: 'Single-board computers (SBC), advanced ARM/RISC-V microcontrollers, Edge AI boards, ESP32 Wi-Fi 6 / Zigbee modules and Arduino.'
      },
      'homelab-networking': {
        ro: 'Noduri Mini PC Proxmox, plăci de rețea 10G/25G SFP28, gateway-uri UniFi, switch-uri MikroTik, transceivere optice și cabinete rack.',
        en: 'Proxmox Mini PC nodes, 10G/25G SFP28 network cards, UniFi gateways, MikroTik switches, optical transceivers and rack cabinets.'
      },
      'sensors-iot': {
        ro: 'Gateway-uri Home Assistant, coordonatoare Zigbee 3.0, senzori de calitate aer CO2 NDIR/VOC, telemetrie laser ToF, relee SSR și module industriale RS485.',
        en: 'Home Assistant gateways, Zigbee 3.0 coordinators, NDIR/VOC CO2 air quality sensors, ToF laser telemetry, SSR relays and industrial RS485 modules.'
      },
      'power-accessories': {
        ro: 'Surse industriale Mean Well, surse USB-PD 27W, UPS-uri rackmount, ventilatoare 1U server, regulatoare DC-DC Pololu, injectoare PoE și cabluri Cat6.',
        en: 'Mean Well industrial power supplies, USB-PD 27W adapters, rackmount UPS units, 1U server fans, Pololu DC-DC regulators, PoE injectors and Cat6 cables.'
      },
      'enterprise-hardware': {
        ro: 'Servere rackmount 1U/2U, plăci de rețea 25G/40G/100G Mellanox, controllere SAS HBA IT-Mode ZFS, SSD-uri Enterprise U.2 PLP și unități PDU administrate.',
        en: '1U/2U rackmount servers, 25G/40G/100G Mellanox network cards, SAS HBA IT-Mode ZFS controllers, Enterprise U.2 PLP SSDs and managed PDUs.'
      },
      'niche-hardware': {
        ro: 'Dispozitive Apple legacy (A10/A10X) pentru Linux & checkm8, SBC-uri RK3588, plăci RISC-V, kituri FPGA, unelte de reverse engineering, sonde JTAG/SWD și module Software Defined Radio (SDR).',
        en: 'Legacy Apple hardware (A10/A10X) for Linux & checkm8, RK3588 SBCs, RISC-V development kits, FPGA boards, reverse engineering tools, JTAG/SWD debuggers and SDR modules.'
      },
      'cybersecurity-research': {
        ro: 'Echipamente pentru audit de securitate autorizat și cercetare hardware: Flipper Zero, ecosistem Hak5 (WiFi Pineapple, LAN Turtle, Packet Squirrel, Rubber Ducky), unelte RFID/NFC (Proxmark3, ChameleonUltra), plăci ESP32 Marauder/Bruce, adaptoare monitor mode și TAP-uri hardware de rețea.',
        en: 'Hardware security audit & research tools: Flipper Zero, Hak5 ecosystem (WiFi Pineapple, LAN Turtle, Packet Squirrel, Rubber Ducky), RFID/NFC tools (Proxmark3, ChameleonUltra), ESP32 Marauder/Bruce, monitor mode adapters and hardware network TAPs.'
      }
    };
    const item = map[slug];
    if (item) {
      return item[this.currentLanguage()];
    }
    return fallback || '';
  }
}
