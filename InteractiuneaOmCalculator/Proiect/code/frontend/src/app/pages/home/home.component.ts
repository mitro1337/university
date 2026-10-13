import { Component, inject, signal, computed, OnInit } from '@angular/core';
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

export type HomeTab = 'all' | 'cybersecurity' | 'enterprise' | 'niche' | 'homelab' | 'sbc';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-12 text-center relative lenis-reveal is-revealed">
      <div data-lenis-parallax="0.18" class="absolute -top-12 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div data-lenis-parallax="-0.12" data-lenis-parallax-x="0.08" class="absolute top-24 right-4 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl pointer-events-none -z-10"></div>
      
      <h1 data-lenis-parallax="0.04" class="font-display uppercase tracking-wider text-4xl sm:text-6xl lg:text-7xl text-text-primary leading-[0.98] sm:leading-[0.95] max-w-4xl mx-auto mb-6 overflow-hidden">
        <span class="block overflow-hidden">
          <span class="text-reveal-item" style="animation-delay: 0.05s">
            {{ i18n.isRo() ? 'Conectează Datele Tale ' : 'Connect Your Data ' }}
          </span>
        </span>
        <span class="block overflow-hidden">
          <span class="text-reveal-item" style="animation-delay: 0.15s">
            <span class="gradient-text-flow font-bold">
              {{ i18n.isRo() ? 'de la Senzor la Enterprise Rack' : 'from Edge Sensor to Any Cloud' }}
            </span>
          </span>
        </span>
      </h1>

      <p data-lenis-parallax="0.06" class="text-sm sm:text-base text-text-secondary leading-relaxed max-w-3xl mx-auto mb-8 font-normal blur-to-sharp" style="animation-delay: 0.2s">
        {{ i18n.isRo() 
          ? 'Platformă de comerț tehnic specializată pentru sysadmins, network engineers și security researchers. Echipamente de virtualizare Proxmox VE, rețelistică 10G/25G SFP+, SBC-uri ARM/RISC-V și unelte de audit securitate radio validate pentru funcționare 24/7. Configurează un sistem complet prin ' 
          : 'Specialized enterprise platform for sysadmins, network engineers, and security researchers. Proxmox virtualization nodes, 10G/25G SFP+ networking, ARM/RISC-V SBCs, and security audit hardware validated for 24/7 operations. Build your custom system through ' }}
        <a routerLink="/build-your-lab" class="text-cyan-400 hover:text-cyan-300 underline font-medium decoration-cyan-400/50 transition-colors">
          {{ i18n.isRo() ? 'Lab Builder și motorul de compatibilitate automată' : 'Lab Builder and the automated compatibility engine' }}</a>.
      </p>

      <div data-lenis-parallax="0.05" class="flex flex-wrap items-center justify-center gap-3.5 mb-6">
        <a routerLink="/build-your-lab" 
           class="btn-pill-accent group">
          <span>{{ i18n.isRo() ? 'Construiește Laboratorul' : 'Build Your Lab' }}</span>
          <span class="group-hover:translate-x-1 transition-transform">→</span>
        </a>
        <button 
           type="button"
           (click)="scrollToInventory()" 
           class="btn-pill-secondary cursor-pointer">
          <span>{{ i18n.isRo() ? 'Hardware Disponibil' : 'Available Hardware' }} ↓</span>
        </button>
        <a routerLink="/produse" 
           class="btn-pill-secondary">
          <span>{{ i18n.isRo() ? 'Explorează Catalogul (180)' : 'Explore Catalog (180)' }}</span>
        </a>
      </div>

      <div data-lenis-parallax="0.06" data-lenis-parallax-scale="-0.02" class="max-w-2xl mx-auto mt-8 px-2">
        <div 
          #heroTiltCard
          (mousemove)="on3DTilt($event, heroTiltCard)"
          (mouseleave)="reset3DTilt(heroTiltCard)"
          class="perspective-tilt-card bg-surface/90 backdrop-blur-md border border-border-strong rounded-2xl p-5 shadow-[0_1px_0_rgba(255,255,255,0.1)_inset,0_16px_36px_rgba(0,0,0,0.7)] text-left flex flex-col sm:flex-row items-center gap-5 relative overflow-hidden group">
          
          <div class="absolute inset-0 highlight-sweep pointer-events-none opacity-20"></div>

          <div class="w-28 h-28 sm:w-32 sm:h-32 flex-shrink-0 bg-surface-sunken border border-border-strong rounded-xl p-3 flex items-center justify-center relative product-floating overflow-hidden shadow-inner">
            <img 
              src="images/products/nvidia-jetson-orin-nano-8gb-dev-kit.png" 
              alt="Flagship SBC Node"
              data-lenis-parallax="0.08"
              class="lenis-parallax-image max-h-full max-w-full object-contain filter drop-shadow-[0_8px_12px_rgba(0,0,0,0.7)]">
            <span class="absolute -top-1.5 -right-1.5 text-[9px] font-bold px-2 py-0.5 rounded-full bg-cyan-400 text-black uppercase tracking-wider shadow-xs">
              Flagship
            </span>
          </div>

          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2 mb-1">
              <span class="text-[10px] uppercase text-cyan-400 font-bold tracking-wider font-mono">SKU: VX-R9-TITAN</span>
              <span class="text-border">|</span>
              <span class="text-[10px] text-emerald-400 font-medium flex items-center gap-1.5">
                <span class="led-indicator-3d" style="--led-color: #00ff9d; --led-glow: rgba(0, 255, 157, 0.8)"></span>
                24/7 Enterprise Validated
              </span>
            </div>
            <h3 class="font-heading text-base font-bold text-text-primary group-hover:text-cyan-400 transition-colors truncate">
              Vexera Titan-9 Edge Compute Node
            </h3>
            <p class="text-xs text-text-secondary mt-1 line-clamp-2 leading-relaxed">
              Procesor 8-Core ARM64 v9, accelerator NPU 6 TOPS, dual 10G SFP+ și carcasă aluminiu frezat CNC cu răcire pasivă 0dB.
            </p>
            <div class="mt-3 flex items-center justify-between gap-3">
              <div class="text-sm font-bold text-text-primary tabular-nums">
                1.849,00 <span class="text-[11px] text-text-muted font-normal font-sans">lei</span>
              </div>
              <a routerLink="/build-your-lab" class="text-xs font-semibold text-cyan-400 hover:text-cyan-300 inline-flex items-center gap-1 transition-colors">
                Configurează în Lab →
              </a>
            </div>
          </div>
        </div>

        <!-- Klarna BNPL Highlights Bar -->
        <div class="mt-4 flex flex-wrap items-center justify-center gap-3 text-xs text-text-muted">
          <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-elevated border border-[#FFB3C7]/40 shadow-[0_2px_8px_rgba(255,179,199,0.15)]">
            <span class="px-1.5 py-0.5 rounded bg-[#FFB3C7] text-black font-black text-[10px] tracking-tight">Klarna.</span>
            <span class="text-text-primary font-medium">
              {{ i18n.isRo() ? 'Cumpără acum, plătește în 3 rate fără dobândă (0% DAE)' : 'Buy now, pay in 3 interest-free installments (0% APR)' }}
            </span>
          </div>
          <div class="inline-flex items-center gap-1.5 text-[11px] text-emerald-400 font-medium">
            <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
            <span>Fără card de credit • Aprobare pe loc</span>
          </div>
        </div>
      </div>

    </section>

    <section id="inventory-grid" class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 border-t border-border/80 lenis-reveal is-revealed">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-border mb-6">
        <div>
          <h2 class="font-display text-3xl sm:text-4xl lg:text-5xl uppercase tracking-wide text-text-primary">
            {{ i18n.isRo() ? 'Hardware din Depozitul Local' : 'Live Inventory Hardware' }}
          </h2>
          <p class="text-xs text-text-secondary mt-0.5">Stoc fizic gata de expediere cu parametri tehnici măsurați</p>
        </div>

        <div class="flex items-center gap-1.5 text-xs overflow-x-auto pb-1 sm:pb-0">
          <button 
            type="button"
            (click)="setCategoryTab('all')"
            [class.bg-gradient-to-r]="activeTab() === 'all'"
            [class.from-cyan-400]="activeTab() === 'all'"
            [class.to-blue-500]="activeTab() === 'all'"
            [class.text-black]="activeTab() === 'all'"
            [class.font-bold]="activeTab() === 'all'"
            [class.shadow-[0_3px_0_#02668c,0_8px_16px_rgba(0,210,255,0.35)]]="activeTab() === 'all'"
            [class.bg-surface-elevated]="activeTab() !== 'all'"
            [class.text-text-secondary]="activeTab() !== 'all'"
            class="px-3.5 py-1.5 rounded-lg border border-border-strong hover:border-cyan-400/50 active:translate-y-0.5 transition-all whitespace-nowrap text-xs font-medium flex items-center gap-1.5 cursor-pointer shadow-[0_2px_0_#06090e]">
            <span>{{ i18n.isRo() ? 'Toate' : 'All' }}</span>
          </button>
          <button 
            type="button"
            (click)="setCategoryTab('cybersecurity')"
            [class.bg-gradient-to-r]="activeTab() === 'cybersecurity'"
            [class.from-cyan-400]="activeTab() === 'cybersecurity'"
            [class.to-blue-500]="activeTab() === 'cybersecurity'"
            [class.text-black]="activeTab() === 'cybersecurity'"
            [class.font-bold]="activeTab() === 'cybersecurity'"
            [class.shadow-[0_3px_0_#02668c,0_8px_16px_rgba(0,210,255,0.35)]]="activeTab() === 'cybersecurity'"
            [class.bg-surface-elevated]="activeTab() !== 'cybersecurity'"
            [class.text-text-secondary]="activeTab() !== 'cybersecurity'"
            class="px-3.5 py-1.5 rounded-lg border border-border-strong hover:border-cyan-400/50 active:translate-y-0.5 transition-all whitespace-nowrap text-xs font-medium flex items-center gap-1.5 cursor-pointer shadow-[0_2px_0_#06090e]">
            <span>Securitate</span>
          </button>
          <button 
            type="button"
            (click)="setCategoryTab('enterprise')"
            [class.bg-gradient-to-r]="activeTab() === 'enterprise'"
            [class.from-cyan-400]="activeTab() === 'enterprise'"
            [class.to-blue-500]="activeTab() === 'enterprise'"
            [class.text-black]="activeTab() === 'enterprise'"
            [class.font-bold]="activeTab() === 'enterprise'"
            [class.shadow-[0_3px_0_#02668c,0_8px_16px_rgba(0,210,255,0.35)]]="activeTab() === 'enterprise'"
            [class.bg-surface-elevated]="activeTab() !== 'enterprise'"
            [class.text-text-secondary]="activeTab() !== 'enterprise'"
            class="px-3.5 py-1.5 rounded-lg border border-border-strong hover:border-cyan-400/50 active:translate-y-0.5 transition-all whitespace-nowrap text-xs font-medium flex items-center gap-1.5 cursor-pointer shadow-[0_2px_0_#06090e]">
            <span>Enterprise & Servere</span>
          </button>
          <button 
            type="button"
            (click)="setCategoryTab('niche')"
            [class.bg-gradient-to-r]="activeTab() === 'niche'"
            [class.from-cyan-400]="activeTab() === 'niche'"
            [class.to-blue-500]="activeTab() === 'niche'"
            [class.text-black]="activeTab() === 'niche'"
            [class.font-bold]="activeTab() === 'niche'"
            [class.shadow-[0_3px_0_#02668c,0_8px_16px_rgba(0,210,255,0.35)]]="activeTab() === 'niche'"
            [class.bg-surface-elevated]="activeTab() !== 'niche'"
            [class.text-text-secondary]="activeTab() !== 'niche'"
            class="px-3.5 py-1.5 rounded-lg border border-border-strong hover:border-cyan-400/50 active:translate-y-0.5 transition-all whitespace-nowrap text-xs font-medium flex items-center gap-1.5 cursor-pointer shadow-[0_2px_0_#06090e]">
            <span>Hardware Nișat</span>
          </button>
          <button 
            type="button"
            (click)="setCategoryTab('homelab')"
            [class.bg-gradient-to-r]="activeTab() === 'homelab'"
            [class.from-cyan-400]="activeTab() === 'homelab'"
            [class.to-blue-500]="activeTab() === 'homelab'"
            [class.text-black]="activeTab() === 'homelab'"
            [class.font-bold]="activeTab() === 'homelab'"
            [class.shadow-[0_3px_0_#02668c,0_8px_16px_rgba(0,210,255,0.35)]]="activeTab() === 'homelab'"
            [class.bg-surface-elevated]="activeTab() !== 'homelab'"
            [class.text-text-secondary]="activeTab() !== 'homelab'"
            class="px-3.5 py-1.5 rounded-lg border border-border-strong hover:border-cyan-400/50 active:translate-y-0.5 transition-all whitespace-nowrap text-xs font-medium flex items-center gap-1.5 cursor-pointer shadow-[0_2px_0_#06090e]">
            <span>Homelab & Rețea</span>
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lenis-reveal-stagger is-revealed">
        @for (prod of filteredFeaturedProducts().slice(0, 8); track prod.id) {
          <div 
            class="spotlight-card product-card-hover lenis-velocity-card bg-surface hover:bg-surface-elevated border border-border rounded-xl p-4 shadow-panel group flex flex-col justify-between"
            [style.transition-delay]="($index * 40) + 'ms'">
            <div>
              <a [routerLink]="['/produs', prod.slug]" 
                 class="relative h-44 w-full bg-surface-sunken border border-border/60 rounded-lg p-3 flex items-center justify-center mb-3 product-image-container block overflow-hidden shadow-inner">
                <img 
                  [src]="prod.image_url" 
                  [alt]="prod.name"
                  data-lenis-parallax="0.035"
                  class="lenis-parallax-image max-h-full max-w-full object-contain filter drop-shadow-md">
                
                @if (prod.stock > 0) {
                  <span class="absolute top-2 left-2 text-[10px] font-semibold px-2 py-0.5 rounded bg-surface/90 border border-emerald-500/30 text-emerald-400 flex items-center gap-1 shadow-xs">
                    <span class="led-indicator-3d" style="--led-color: #00ff9d; --led-glow: rgba(0, 255, 157, 0.8); width: 6px; height: 6px;"></span>
                    În stoc ({{ prod.stock }})
                  </span>
                } @else {
                  <span class="absolute top-2 left-2 text-[10px] font-semibold px-2 py-0.5 rounded bg-surface/90 border border-rose-500/30 text-rose-400 flex items-center gap-1 shadow-xs">
                    <span class="led-indicator-3d" style="--led-color: #ff3366; --led-glow: rgba(255, 51, 102, 0.8); width: 6px; height: 6px;"></span>
                    La comandă
                  </span>
                }

                <button
                  type="button"
                  (click)="$event.preventDefault(); $event.stopPropagation(); wishlistService.toggleWishlist(prod)"
                  class="heart-button absolute top-2 right-2 w-7 h-7 rounded-full bg-surface/85 backdrop-blur-xs border border-border flex items-center justify-center text-text-muted hover:text-rose-400 z-10 shadow-xs"
                  [class.is-active]="wishlistService.isWishlisted(prod.id)"
                  [title]="wishlistService.isWishlisted(prod.id) ? 'Elimină din favorite' : 'Adaugă la favorite'">
                  <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </a>

              <div class="flex items-center justify-between mb-1 gap-2">
                <span class="text-[10px] text-text-muted uppercase tracking-wider truncate font-mono">{{ prod.subcategory }}</span>
                <button 
                  type="button"
                  (click)="$event.stopPropagation(); uiFeedback.copyToClipboard(prod.sku, 'Cod SKU')"
                  title="Click pentru a copia codul SKU"
                  class="cursor-copy-interactive text-[10px] tabular-nums font-mono px-1.5 py-0.5 rounded bg-surface-sunken border border-border text-text-muted font-medium inline-flex items-center gap-1 active:translate-y-0.5 flex-shrink-0 shadow-inner">
                  <span>{{ prod.sku }}</span>
                  <svg class="w-2.5 h-2.5 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <rect x="8" y="8" width="12" height="12" rx="2" stroke-width="2"/>
                    <path d="M16 8V6a2 2 0 00-2-2H6a2 2 0 00-2 2v8a2 2 0 002 2h2" stroke-width="2"/>
                  </svg>
                </button>
              </div>

              <h4 class="font-heading text-xs sm:text-sm font-semibold text-text-primary group-hover:text-cyan-400 transition-colors leading-snug line-clamp-2">
                <a [routerLink]="['/produs', prod.slug]" class="interactive-text-link">
                  {{ prod.name }}
                </a>
              </h4>
              <p class="text-xs text-text-secondary mt-1.5 line-clamp-2 leading-relaxed font-normal">
                {{ prod.short_desc || prod.full_desc }}
              </p>
            </div>

            <div class="pt-3.5 mt-3 border-t border-border flex items-center justify-between">
              <div>
                <div class="text-base sm:text-lg font-bold text-text-primary tabular-nums leading-none">
                  {{ prod.price_ron.toFixed(2) }} <span class="text-xs font-normal text-text-muted font-sans">lei</span>
                </div>
                <div class="text-[10px] text-text-muted mt-0.5 font-mono">TVA inclus &bull; Factură</div>
              </div>

              <div class="flex items-center gap-1.5">
                <a [routerLink]="['/produs', prod.slug]"
                   class="px-2.5 py-1.5 rounded-lg bg-surface-elevated hover:bg-surface-sunken text-text-primary text-xs font-medium border border-border hover:border-cyan-400/40 active:translate-y-0.5 transition-all shadow-[0_2px_0_#06090e]">
                  Fișă
                </a>
                <button
                  type="button"
                  (click)="addToCartWithFeedback(prod)"
                  [class.btn-added-state]="isJustAdded(prod.id)"
                  class="px-3 py-1.5 rounded-lg bg-gradient-to-b from-cyan-400 to-blue-600 hover:from-cyan-300 hover:to-blue-500 text-black text-xs font-bold transition-all shadow-[0_3px_0_#02668c,0_6px_12px_rgba(0,210,255,0.3)] active:translate-y-1 active:shadow-none flex items-center gap-1.5 min-w-[72px] justify-center cursor-pointer">
                  @if (isJustAdded(prod.id)) {
                    <svg class="w-3 h-3 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
                    </svg>
                    <span>Adăugat</span>
                  } @else {
                    <span>+ Coș</span>
                  }
                </button>
              </div>
            </div>
          </div>
        }
      </div>

      <div class="text-center mt-8">
        <a routerLink="/produse" 
           class="btn-pill-secondary inline-flex text-xs">
          <span>Vezi toate cele {{ totalProductsCount() }} echipamente în Catalog</span>
          <span>→</span>
        </a>
      </div>
    </section>

    <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mb-6 lenis-reveal is-revealed">
      <div class="bg-gradient-to-r from-surface via-surface-elevated to-surface border border-border-strong rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_1px_0_rgba(255,255,255,0.1)_inset,0_16px_36px_rgba(0,0,0,0.7)]">
        <div data-lenis-parallax="0.06" class="lenis-reveal-left is-revealed">
          <span class="text-[10px] font-bold uppercase tracking-wider text-cyan-400 px-2.5 py-1 rounded bg-cyan-950/60 border border-cyan-400/30 font-mono">
            {{ i18n.isRo() ? 'Infrastructură & Arhitectură Fizică' : 'Infrastructure & Physical Architecture' }}
          </span>
          <h3 class="font-display text-2xl sm:text-3xl lg:text-4xl uppercase tracking-wide text-text-primary mt-2">
            {{ i18n.isRo() ? 'Asamblează un Rack 19" Pas cu Pas' : 'Assemble a 19" Rack Step by Step' }}
          </h3>
          <p class="text-xs sm:text-sm text-text-secondary mt-1 max-w-xl font-normal leading-relaxed">
            {{ i18n.isRo() ? 'Vizualizează unitățile rack (1U, 2U, 4U), calculează consumul în wați (W), adâncimea carcasei și necesarul de răcire PDU înainte de achiziție.' : 'Visualize rack units (1U, 2U, 4U), calculate power draw (W), chassis depth and PDU cooling requirements prior to deployment.' }}
          </p>
        </div>
        <div data-lenis-parallax="-0.04" class="flex items-center gap-3 flex-shrink-0 lenis-reveal-right is-revealed">
          <a routerLink="/build-your-lab"
             class="btn-pill-accent text-xs">
            <span>{{ i18n.isRo() ? 'Deschide Rack Builder' : 'Open Rack Builder' }}</span>
            <span>→</span>
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


  on3DTilt(event: MouseEvent, card: HTMLElement) {
    this.animationService.handle3DTilt(event, card, 8);
  }

  reset3DTilt(card: HTMLElement) {
    this.animationService.reset3DTilt(card);
  }

  isJustAdded(id: number): boolean {
    return this.justAddedProductIds().includes(id);
  }

  addToCartWithFeedback(prod: Product) {
    this.cartService.addToCart(prod);
    this.uiFeedback.showToast(`${prod.name} adăugat în coș`, 'success');
    
    // Animate button state transition to "Adăugat ✓"
    this.justAddedProductIds.update(ids => [...ids, prod.id]);
    setTimeout(() => {
      this.justAddedProductIds.update(ids => ids.filter(i => i !== prod.id));
    }, 1500);
  }

  scrollToInventory() {
    this.lenisService.scrollTo('#inventory-grid', { offset: -48, duration: 1.15 });
  }

  getVelocityDisplay(): string {
    return Math.abs(this.lenisService.velocity()).toFixed(0);
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
