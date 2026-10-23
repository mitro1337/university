import { Component, inject, signal, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { ComparisonService } from '../../services/comparison.service';
import { TranslationService } from '../../services/translation.service';
import { UiFeedbackService } from '../../services/ui-feedback.service';
import { LenisService } from '../../services/lenis.service';
import { WishlistService } from '../../services/wishlist.service';
import { AnimationService } from '../../services/animation.service';
import { Category, Product } from '../../models/product.model';
import { HardwareViewer3dComponent } from '../../components/ui/hardware-viewer-3d.component';

export type HomeTab = 'all' | 'cybersecurity' | 'enterprise' | 'niche' | 'homelab' | 'sbc';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, HardwareViewer3dComponent],
  template: `
    <!-- Hero Section: Ubiquiti & Framework Inspired Split Layout -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 pb-12 relative lenis-reveal is-revealed">
      <div data-lenis-parallax="0.18" class="absolute -top-12 left-1/3 -translate-x-1/2 w-96 h-96 bg-accent/8 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div data-lenis-parallax="-0.12" data-lenis-parallax-x="0.08" class="absolute top-24 right-4 w-72 h-72 bg-accent/6 rounded-full blur-3xl pointer-events-none -z-10"></div>
      
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        <!-- Left Hero Copy & Tactile Controls -->
        <div class="lg:col-span-7 text-left">
          
          <!-- Category & Ecosystem Badges (Tactile Hardware Style) -->
          <div class="flex flex-wrap items-center gap-2 mb-4">
            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-surface-elevated border border-border text-[11px] font-bold tracking-wider uppercase text-text-primary">
              <span class="w-2 h-2 rounded-full bg-accent"></span>
              {{ i18n.isRo() ? 'Ecosistem Hardware & Homelab' : 'Hardware & Homelab Ecosystem' }}
            </span>
            <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-surface-sunken border border-border text-[11px] font-bold text-accent uppercase">
              10GbE • RISC-V • SFP+
            </span>
          </div>

          <h1 class="font-display uppercase tracking-tight text-3xl sm:text-5xl lg:text-6xl text-text-primary leading-[1.02] mb-5">
            {{ i18n.isRo() ? 'Conectează Datele Tale de la Senzor la Enterprise Rack' : 'Connect Your Data from Edge Sensor to Enterprise Rack' }}
          </h1>

          <p class="text-xs sm:text-sm text-text-secondary leading-relaxed max-w-2xl mb-6 font-normal">
            {{ i18n.isRo() 
              ? 'Platformă tehnică dedicată inginerilor de sistem, cercetătorilor în securitate și pasionaților de homelab. Echipamente de rețelistică 10G/25G SFP+, noduri de virtualizare Proxmox VE, SBC-uri ARM/RISC-V și instrumente radio de precizie validate pentru operare 24/7.' 
              : 'Technical platform engineered for sysadmins, security researchers, and homelab builders. 10G/25G SFP+ networking, Proxmox VE virtualization clusters, ARM/RISC-V SBCs, and precision radio tools tested for continuous 24/7 uptime.' }}
          </p>

          <!-- Primary Actions -->
          <div class="flex flex-wrap items-center gap-3 mb-6">
            <a routerLink="/build-your-lab" 
               class="px-5 py-2.5 rounded-xl bg-accent hover:opacity-95 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center gap-2 group cursor-pointer">
              <span>{{ i18n.isRo() ? 'Configurator Rack 19"' : '19" Rack Builder' }}</span>
              <span class="group-hover:translate-x-1 transition-transform">→</span>
            </a>

            <button 
               type="button"
               (click)="scrollToInventory()" 
               class="px-4 py-2.5 rounded-xl bg-surface-elevated hover:bg-surface-sunken border border-border text-text-primary font-bold text-xs uppercase tracking-wider transition-all cursor-pointer">
              <span>{{ i18n.isRo() ? 'Catalog Live (180)' : 'Live Inventory (180)' }} ↓</span>
            </button>

            <a routerLink="/arhitectura" 
               class="px-4 py-2.5 rounded-xl bg-surface-elevated hover:bg-surface-sunken border border-border text-text-secondary hover:text-text-primary font-bold text-xs uppercase tracking-wider transition-all">
              <span>{{ i18n.isRo() ? 'Documentație 5.11' : 'Architecture 5.11' }}</span>
            </a>
          </div>

          <!-- Tactile Metric Strip (Teenage Engineering & Lab Instrument Style) -->
          <div class="grid grid-cols-3 gap-3 p-3 rounded-xl bg-surface-sunken border border-border max-w-xl">
            <div class="p-2 text-left border-r border-border">
              <div class="text-[10px] uppercase font-bold text-text-muted tracking-wider">{{ i18n.isRo() ? 'Echipamente' : 'Products' }}</div>
              <div class="text-base sm:text-lg font-bold text-text-primary tabular-nums">180+ SKU</div>
              <div class="text-[10px] text-accent font-semibold">{{ i18n.isRo() ? 'Stoc fizic depozit' : 'Verified stock' }}</div>
            </div>

            <div class="p-2 text-left border-r border-border">
              <div class="text-[10px] uppercase font-bold text-text-muted tracking-wider">{{ i18n.isRo() ? 'Finanțare' : 'Financing' }}</div>
              <div class="text-base sm:text-lg font-bold text-text-primary tabular-nums">3x Klarna</div>
              <div class="text-[10px] text-accent font-semibold">{{ i18n.isRo() ? '0% Dobândă fără card' : '0% Interest BNPL' }}</div>
            </div>

            <div class="p-2 text-left">
              <div class="text-[10px] uppercase font-bold text-text-muted tracking-wider">{{ i18n.isRo() ? 'Garanție' : 'Warranty' }}</div>
              <div class="text-base sm:text-lg font-bold text-text-primary tabular-nums">24 Luni</div>
              <div class="text-[10px] text-accent font-semibold">{{ i18n.isRo() ? 'Conform OUG 140' : 'EU Legal standard' }}</div>
            </div>
          </div>

        </div>

        <!-- Right: Real-time 3D Interactive WebGL Hardware Viewer -->
        <div class="lg:col-span-5">
          <div class="relative rounded-2xl p-1 bg-surface-elevated border border-border shadow-2xl">
            <app-hardware-viewer-3d [productName]="'Vexera Titan-9 Edge Compute Node'"></app-hardware-viewer-3d>
            
            <div class="p-3 bg-surface rounded-xl border border-border mt-2 flex items-center justify-between gap-3 text-xs">
              <div class="flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-accent"></span>
                <span class="font-bold text-text-primary">Titan-9 Edge Compute Node</span>
              </div>
              <div class="text-accent font-bold tabular-nums">
                1.849,00 {{ i18n.currencyLabel() }}
              </div>
            </div>
          </div>
        </div>

      </div>

      <!-- Klarna BNPL Highlights Bar -->
      <div class="mt-8 flex flex-wrap items-center justify-center gap-3 text-xs text-text-muted">
        <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-elevated border border-[#FFB3C7]/40 shadow-xs">
          <span class="px-1.5 py-0.5 rounded bg-[#FFB3C7] text-black font-black text-[10px] tracking-tight">Klarna.</span>
          <span class="text-text-primary font-medium">
            {{ i18n.isRo() ? 'Cumpără acum, plătește în 3 rate egale fără dobândă (0% DAE)' : 'Buy now, pay in 3 interest-free installments (0% APR)' }}
          </span>
        </div>
        <div class="inline-flex items-center gap-1.5 text-[11px] text-accent font-semibold">
          <span>{{ i18n.isRo() ? 'Fără card de credit • Aprobare pe loc' : 'No credit card required • Instant approval' }}</span>
        </div>
      </div>
    </section>

    <!-- Live Inventory Section -->
    <section id="inventory-grid" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 border-t border-border lenis-reveal is-revealed">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-border mb-6">
        <div>
          <h2 class="font-display text-2xl sm:text-3xl lg:text-4xl uppercase tracking-tight text-text-primary">
            {{ i18n.isRo() ? 'Hardware din Depozitul Local' : 'Live Inventory Hardware' }}
          </h2>
          <p class="text-xs text-text-secondary mt-0.5">{{ i18n.isRo() ? 'Stoc fizic gata de expediere cu parametri tehnici măsurați' : 'Physical stock ready to ship with verified hardware benchmarks' }}</p>
        </div>

        <div class="flex items-center gap-1.5 text-xs overflow-x-auto pb-1 sm:pb-0">
          <button 
            type="button"
            (click)="setCategoryTab('all')"
            [class.bg-accent]="activeTab() === 'all'"
            [class.text-white]="activeTab() === 'all'"
            [class.bg-surface-elevated]="activeTab() !== 'all'"
            [class.text-text-secondary]="activeTab() !== 'all'"
            class="px-3.5 py-1.5 rounded-lg border border-border hover:border-accent active:scale-95 transition-all whitespace-nowrap text-xs font-bold cursor-pointer">
            <span>{{ i18n.isRo() ? 'Toate' : 'All' }}</span>
          </button>
          <button 
            type="button"
            (click)="setCategoryTab('cybersecurity')"
            [class.bg-accent]="activeTab() === 'cybersecurity'"
            [class.text-white]="activeTab() === 'cybersecurity'"
            [class.bg-surface-elevated]="activeTab() !== 'cybersecurity'"
            [class.text-text-secondary]="activeTab() !== 'cybersecurity'"
            class="px-3.5 py-1.5 rounded-lg border border-border hover:border-accent active:scale-95 transition-all whitespace-nowrap text-xs font-bold cursor-pointer">
            <span>{{ i18n.isRo() ? 'Securitate' : 'Security' }}</span>
          </button>
          <button 
            type="button"
            (click)="setCategoryTab('enterprise')"
            [class.bg-accent]="activeTab() === 'enterprise'"
            [class.text-white]="activeTab() === 'enterprise'"
            [class.bg-surface-elevated]="activeTab() !== 'enterprise'"
            [class.text-text-secondary]="activeTab() !== 'enterprise'"
            class="px-3.5 py-1.5 rounded-lg border border-border hover:border-accent active:scale-95 transition-all whitespace-nowrap text-xs font-bold cursor-pointer">
            <span>{{ i18n.isRo() ? 'Enterprise & Servere' : 'Enterprise & Servers' }}</span>
          </button>
          <button 
            type="button"
            (click)="setCategoryTab('niche')"
            [class.bg-accent]="activeTab() === 'niche'"
            [class.text-white]="activeTab() === 'niche'"
            [class.bg-surface-elevated]="activeTab() !== 'niche'"
            [class.text-text-secondary]="activeTab() !== 'niche'"
            class="px-3.5 py-1.5 rounded-lg border border-border hover:border-accent active:scale-95 transition-all whitespace-nowrap text-xs font-bold cursor-pointer">
            <span>{{ i18n.isRo() ? 'Hardware Nișat' : 'Niche Hardware' }}</span>
          </button>
          <button 
            type="button"
            (click)="setCategoryTab('homelab')"
            [class.bg-accent]="activeTab() === 'homelab'"
            [class.text-white]="activeTab() === 'homelab'"
            [class.bg-surface-elevated]="activeTab() !== 'homelab'"
            [class.text-text-secondary]="activeTab() !== 'homelab'"
            class="px-3.5 py-1.5 rounded-lg border border-border hover:border-accent active:scale-95 transition-all whitespace-nowrap text-xs font-bold cursor-pointer">
            <span>{{ i18n.isRo() ? 'Homelab & Rețea' : 'Homelab & Network' }}</span>
          </button>
        </div>
      </div>

      <!-- Products Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lenis-reveal-stagger is-revealed">
        @for (prod of filteredFeaturedProducts().slice(0, 8); track prod.id) {
          <div 
            class="bg-surface hover:bg-surface-elevated border border-border rounded-xl p-4 shadow-panel group flex flex-col justify-between transition-all"
            [style.transition-delay]="($index * 40) + 'ms'">
            <div>
              <a [routerLink]="['/produs', prod.slug]" 
                 class="relative h-44 w-full bg-surface-sunken rounded-lg p-3 flex items-center justify-center mb-3 block overflow-hidden">
                <img 
                  [src]="prod.image_url" 
                  [alt]="i18n.getProductName(prod)"
                  data-lenis-parallax="0.035"
                  class="lenis-parallax-image max-h-full max-w-full object-contain filter drop-shadow-sm">
                
                @if (prod.stock > 0) {
                  <span class="absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded bg-surface border border-accent/40 text-accent">
                    {{ i18n.isRo() ? 'În stoc (' + prod.stock + ' buc)' : 'In stock (' + prod.stock + ' pcs)' }}
                  </span>
                } @else {
                  <span class="absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded bg-surface border border-border text-text-muted">
                    {{ i18n.isRo() ? 'La comandă' : 'Backorder' }}
                  </span>
                }

                <button
                  type="button"
                  (click)="$event.preventDefault(); $event.stopPropagation(); wishlistService.toggleWishlist(prod)"
                  class="heart-button absolute top-2 right-2 w-7 h-7 rounded-full bg-surface/85 backdrop-blur-xs border border-border flex items-center justify-center text-text-muted hover:text-accent z-10"
                  [class.is-active]="wishlistService.isWishlisted(prod.id)"
                  [title]="wishlistService.isWishlisted(prod.id) ? (i18n.isRo() ? 'Elimină din favorite' : 'Remove from wishlist') : (i18n.isRo() ? 'Adaugă la favorite' : 'Add to wishlist')">
                  <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </a>

              <div class="flex items-center justify-between mb-1 gap-2">
                <span class="text-[10px] text-text-muted uppercase tracking-wider truncate font-semibold">{{ i18n.getSubcategoryName(prod.subcategory) }}</span>
                <button 
                  type="button"
                  (click)="$event.stopPropagation(); uiFeedback.copyToClipboard(prod.sku, i18n.isRo() ? 'Cod SKU' : 'SKU Code')"
                  [title]="i18n.isRo() ? 'Click pentru a copia codul SKU' : 'Click to copy SKU code'"
                  class="text-[10px] tabular-nums px-1.5 py-0.5 rounded bg-surface-sunken border border-border text-text-muted font-bold inline-flex items-center gap-1 active:scale-95 flex-shrink-0 cursor-pointer">
                  <span>{{ prod.sku }}</span>
                  <svg class="w-2.5 h-2.5 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <rect x="8" y="8" width="12" height="12" rx="2" stroke-width="2"/>
                    <path d="M16 8V6a2 2 0 00-2-2H6a2 2 0 00-2 2v8a2 2 0 002 2h2" stroke-width="2"/>
                  </svg>
                </button>
              </div>

              <h4 class="font-heading text-xs sm:text-sm font-bold text-text-primary group-hover:text-accent transition-colors leading-snug line-clamp-2">
                <a [routerLink]="['/produs', prod.slug]">
                  {{ i18n.getProductName(prod) }}
                </a>
              </h4>
              <p class="text-xs text-text-secondary mt-1.5 line-clamp-2 leading-relaxed font-normal">
                {{ i18n.getProductShortDesc(prod) }}
              </p>
            </div>

            <div class="pt-3.5 mt-3 border-t border-border flex items-center justify-between">
              <div>
                <div class="text-base sm:text-lg font-bold text-text-primary tabular-nums leading-none">
                  {{ prod.price_ron.toFixed(2) }} <span class="text-xs font-normal text-text-muted">{{ i18n.isRo() ? 'lei' : 'RON' }}</span>
                </div>
                <div class="text-[10px] text-text-muted mt-0.5">{{ i18n.isRo() ? 'TVA inclus • Factură' : 'VAT included • Invoice' }}</div>
              </div>

              <div class="flex items-center gap-1.5">
                <a [routerLink]="['/produs', prod.slug]"
                   class="px-2.5 py-1.5 rounded-lg bg-surface-elevated hover:bg-surface-sunken text-text-primary text-xs font-bold border border-border hover:border-accent active:scale-95 transition-all">
                  {{ i18n.isRo() ? 'Fișă' : 'Specs' }}
                </a>
                <button
                  type="button"
                  (click)="addToCartWithFeedback(prod)"
                  [class.btn-added-state]="isJustAdded(prod.id)"
                  class="px-3 py-1.5 rounded-lg bg-accent hover:opacity-95 active:scale-95 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 min-w-[72px] justify-center cursor-pointer">
                  @if (isJustAdded(prod.id)) {
                    <span>{{ i18n.isRo() ? 'Adăugat' : 'Added' }}</span>
                  } @else {
                    <span>{{ i18n.isRo() ? '+ Coș' : '+ Cart' }}</span>
                  }
                </button>
              </div>
            </div>
          </div>
        }
      </div>

      <div class="text-center mt-8">
        <a routerLink="/produse" 
           class="px-5 py-2.5 rounded-xl bg-surface-elevated hover:bg-surface-sunken border border-border text-text-primary font-bold text-xs uppercase tracking-wider inline-flex items-center gap-2 transition-all">
          <span>{{ i18n.isRo() ? 'Vezi toate cele ' + totalProductsCount() + ' echipamente în Catalog' : 'View all ' + totalProductsCount() + ' hardware products in Catalog' }}</span>
          <span>→</span>
        </a>
      </div>
    </section>

    <!-- Visual Rack Builder Highlight Section -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mb-6 lenis-reveal is-revealed">
      <div class="bg-surface-elevated border border-border rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-panel">
        <div>
          <span class="text-[10px] font-bold uppercase tracking-wider text-accent px-2.5 py-1 rounded bg-accent/10 border border-accent/20">
            {{ i18n.isRo() ? 'Infrastructură & Arhitectură Fizică' : 'Infrastructure & Physical Architecture' }}
          </span>
          <h3 class="font-display text-2xl sm:text-3xl lg:text-4xl uppercase tracking-tight text-text-primary mt-2">
            {{ i18n.isRo() ? 'Asamblează un Rack 19" Pas cu Pas' : 'Assemble a 19" Rack Step by Step' }}
          </h3>
          <p class="text-xs sm:text-sm text-text-secondary mt-1 max-w-xl font-normal leading-relaxed">
            {{ i18n.isRo() ? 'Vizualizează unitățile rack (1U, 2U, 4U), calculează consumul în wați (W), adâncimea carcasei și necesarul de răcire PDU înainte de achiziție.' : 'Visualize rack units (1U, 2U, 4U), calculate power draw (W), chassis depth and PDU cooling requirements prior to deployment.' }}
          </p>
        </div>
        <div class="flex items-center gap-3 flex-shrink-0">
          <a routerLink="/build-your-lab"
             class="px-5 py-2.5 rounded-xl bg-accent hover:opacity-95 text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer">
            <span>{{ i18n.isRo() ? 'Deschide Rack Builder' : 'Open Rack Builder' }}</span>
            <span class="ml-1">→</span>
          </a>
        </div>
      </div>
    </section>
  `
})
export class HomeComponent implements OnInit {
  productService = inject(ProductService);
  cartService = inject(CartService);
  compService = inject(ComparisonService);
  i18n = inject(TranslationService);
  uiFeedback = inject(UiFeedbackService);
  lenisService = inject(LenisService);
  wishlistService = inject(WishlistService);
  animationService = inject(AnimationService);

  categories = signal<Category[]>([]);
  featuredProducts = signal<Product[]>([]);
  totalProductsCount = signal<number>(180);
  activeTab = signal<HomeTab>('all');
  justAddedProductIds = signal<number[]>([]);

  isJustAdded(id: number): boolean {
    return this.justAddedProductIds().includes(id);
  }

  addToCartWithFeedback(prod: Product) {
    this.cartService.addToCart(prod);
    const prodName = this.i18n.getProductName(prod);
    const msg = this.i18n.isRo() ? `${prodName} adăugat în coș` : `${prodName} added to cart`;
    this.uiFeedback.showToast(msg, 'success');
    
    this.justAddedProductIds.update(ids => [...ids, prod.id]);
    setTimeout(() => {
      this.justAddedProductIds.update(ids => ids.filter(i => i !== prod.id));
    }, 1500);
  }

  scrollToInventory() {
    this.lenisService.scrollTo('#inventory-grid', { offset: -48, duration: 1.15 });
  }

  setCategoryTab(tab: HomeTab) {
    this.activeTab.set(tab);
    setTimeout(() => {
      this.lenisService.observeRevealElements();
      this.lenisService.resize();
    }, 50);
  }

  ngOnInit() {
    this.productService.getCategories().subscribe(cats => {
      this.categories.set(cats);
      const total = cats.reduce((acc, c) => acc + (Number(c.product_count) || 0), 0);
      if (total > 0) {
        this.totalProductsCount.set(total);
      }
    });

    this.productService.getProducts({ featured: true, limit: 30 }).subscribe({
      next: (prods) => {
        this.featuredProducts.set(prods);
        setTimeout(() => {
          this.lenisService.observeRevealElements();
          this.lenisService.resize();
        }, 100);
      }
    });
  }

  filteredFeaturedProducts() {
    const tab = this.activeTab();
    const list = this.featuredProducts();
    if (tab === 'all') return list;
    if (tab === 'cybersecurity') return list.filter(p => p.category_id === 7);
    if (tab === 'enterprise') return list.filter(p => p.category_id === 5);
    if (tab === 'niche') return list.filter(p => p.category_id === 6);
    if (tab === 'homelab') return list.filter(p => p.category_id === 2);
    if (tab === 'sbc') return list.filter(p => p.category_id === 1);
    return list;
  }
}
