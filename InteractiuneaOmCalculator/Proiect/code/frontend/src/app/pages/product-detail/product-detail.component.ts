import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { ComparisonService } from '../../services/comparison.service';
import { LabProfileService } from '../../services/lab-profile.service';
import { TranslationService } from '../../services/translation.service';
import { UiFeedbackService } from '../../services/ui-feedback.service';
import { LenisService } from '../../services/lenis.service';
import { WishlistService } from '../../services/wishlist.service';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { Product } from '../../models/product.model';
import { UiBadgeComponent } from '../../components/ui/ui-badge.component';
import { UiAlertComponent } from '../../components/ui/ui-alert.component';
import { KlarnaModalComponent } from '../../components/ui/klarna-modal.component';
import { HardwareViewer3dComponent } from '../../components/ui/hardware-viewer-3d.component';

interface EngineeringReview {
  id: string;
  author: string;
  role: string;
  rating: number;
  date: string;
  verifiedBuyer: boolean;
  labEnvironment: string;
  title: string;
  contentRo: string;
  contentEn: string;
  benchMetrics?: { key: string; value: string }[];
}

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [RouterLink, TranslatePipe, UiBadgeComponent, UiAlertComponent, KlarnaModalComponent, HardwareViewer3dComponent],
  template: `
    @if (loading()) {
      <div class="max-w-7xl mx-auto px-4 py-24 text-center">
        <div class="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p class="text-xs text-text-muted font-medium">
          {{ i18n.isRo() ? 'Se încarcă fișa tehnică a produsului...' : 'Loading product engineering datasheet...' }}
        </p>
      </div>
    } @else if (!product()) {
      <div class="max-w-7xl mx-auto px-4 py-24 text-center space-y-4">
        <h2 class="font-heading text-xl font-bold text-text-primary">
          {{ i18n.isRo() ? 'Produsul nu a fost găsit' : 'Product Not Found' }}
        </h2>
        <p class="text-xs text-text-muted">
          {{ i18n.isRo() ? 'Componenta căutată nu mai există în catalogul activ.' : 'This component does not exist in the active catalog.' }}
        </p>
        <a routerLink="/produse" class="inline-block px-5 py-2.5 rounded-lg bg-surface border border-border hover:bg-surface-elevated text-text-primary font-medium text-xs uppercase tracking-wider transition-colors">
          {{ i18n.isRo() ? 'Înapoi la Catalog' : 'Back to Catalog' }}
        </a>
      </div>
    } @else {
      @let prod = product()!;
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <nav class="flex items-center gap-2 text-xs text-text-muted mb-6 overflow-x-auto flex-wrap" aria-label="Breadcrumb">
          <a routerLink="/" class="breadcrumb-interactive hover:text-text-primary transition-colors whitespace-nowrap">
            {{ i18n.isRo() ? 'Acasă' : 'Home' }}
          </a>
          <span class="text-border">/</span>
          <a routerLink="/produse" class="breadcrumb-interactive hover:text-text-primary transition-colors whitespace-nowrap">
            {{ 'catalog_title' | translate }}
          </a>
          <span class="text-border">/</span>
          <a [routerLink]="['/categorie', prod.category_slug]" class="breadcrumb-interactive hover:text-text-primary transition-colors whitespace-nowrap">
            {{ i18n.getCategoryName(prod.category_slug, prod.category_name) }}
          </a>
          <span class="text-border">/</span>
          <a [routerLink]="['/produs', prod.slug]" 
             class="breadcrumb-interactive hover:text-text-primary transition-colors whitespace-nowrap truncate max-w-[280px]"
             [class.text-text-primary]="activeTab() === 'overview'"
             [class.font-medium]="activeTab() === 'overview'">
            {{ i18n.getProductName(prod) }}
          </a>
          @if (activeTab() !== 'overview') {
            <span class="text-border">/</span>
            <span class="text-accent font-semibold whitespace-nowrap">
              @switch (activeTab()) {
                @case ('specifications') { {{ 'specs_title' | translate }} }
                @case ('compatibility') { {{ i18n.isRo() ? 'Compatibilitate' : 'Compatibility' }} }
                @case ('documentation') { {{ i18n.isRo() ? 'Documentație' : 'Documentation' }} }
                @case ('reviews') { {{ i18n.isRo() ? 'Recenzii Inginerie' : 'Reviews' }} }
              }
            </span>
          }
        </nav>

        <div class="bg-surface rounded-xl border border-border shadow-xs p-6 sm:p-8 mb-8 transition-colors lenis-reveal is-revealed">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            
            <div class="lg:col-span-5 space-y-3">
              <!-- View Mode Switcher: 2D Photos vs 3D WebGL Model -->
              <div class="flex items-center justify-between pb-1">
                <div class="flex items-center gap-1 p-1 rounded-lg bg-surface-elevated border border-border">
                  <button 
                    type="button" 
                    (click)="viewMode.set('photos')"
                    [class.bg-surface]="viewMode() === 'photos'"
                    [class.text-text-primary]="viewMode() === 'photos'"
                    [class.text-text-muted]="viewMode() !== 'photos'"
                    class="px-2.5 py-1 rounded text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs">
                    <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                    </svg>
                    <span>{{ i18n.isRo() ? 'Galerie Foto' : 'Photo Gallery' }}</span>
                  </button>
                  <button 
                    type="button" 
                    (click)="viewMode.set('3d')"
                    [class.bg-accent-500]="viewMode() === '3d'"
                    [class.text-white]="viewMode() === '3d'"
                    [class.text-text-muted]="viewMode() !== '3d'"
                    class="px-2.5 py-1 rounded text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs">
                    <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
                    </svg>
                    <span>{{ i18n.isRo() ? 'Inspectează 3D WebGL' : 'Inspect 3D WebGL' }}</span>
                  </button>
                </div>
                <span class="text-[10px] font-heading font-bold text-accent-500 tracking-wider">360° CAD</span>
              </div>

              @if (viewMode() === '3d') {
                <app-hardware-viewer-3d [productName]="i18n.getProductName(prod)"></app-hardware-viewer-3d>
              } @else {
                <div data-lenis-parallax="0.06" data-lenis-parallax-scale="0.02" class="relative aspect-square rounded-lg bg-surface-sunken border border-border p-6 sm:p-8 flex items-center justify-center overflow-hidden">
                  <img 
                    [src]="currentDisplayImage()" 
                    [alt]="i18n.getProductName(prod)"
                    [class.is-switching]="isSwitchingImage()"
                    data-lenis-parallax="0.04"
                    class="gallery-crossfade-img lenis-parallax-image max-w-full max-h-full object-contain filter drop-shadow-sm">
                  
                  @if (prod.badge) {
                    <div class="absolute top-4 left-4">
                      <app-ui-badge variant="mono">{{ prod.badge }}</app-ui-badge>
                    </div>
                  }

                  <button
                    type="button"
                    (click)="wishlistService.toggleWishlist(prod)"
                    class="heart-button absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-surface/85 backdrop-blur-xs border border-border flex items-center justify-center text-text-muted hover:text-rose-400 z-10"
                    [class.is-active]="wishlistService.isWishlisted(prod.id)"
                    [title]="wishlistService.isWishlisted(prod.id) ? (i18n.isRo() ? 'Elimină din favorite' : 'Remove from wishlist') : (i18n.isRo() ? 'Adaugă la favorite' : 'Add to wishlist')">
                    <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                </div>

                <div class="grid grid-cols-4 gap-2">
                  @for (img of galleryImages(); track $index) {
                    <button 
                      type="button"
                      (click)="selectGalleryImage($index)"
                      [class.border-accent]="activeImageIndex() === $index"
                      [class.ring-1]="activeImageIndex() === $index"
                      [class.ring-accent]="activeImageIndex() === $index"
                      [class.opacity-100]="activeImageIndex() === $index"
                      [class.opacity-60]="activeImageIndex() !== $index"
                      class="h-16 rounded-lg bg-surface-sunken border border-border p-1.5 flex items-center justify-center hover:opacity-100 hover:border-border-strong transition-all overflow-hidden cursor-pointer">
                      <img [src]="img" [alt]="i18n.getProductName(prod) + (i18n.isRo() ? ' unghi ' : ' angle ') + ($index + 1)" class="max-h-full max-w-full object-contain">
                    </button>
                  }
                </div>
              }

              <div class="p-3.5 rounded-lg bg-surface-elevated border border-border text-xs text-text-muted flex items-center justify-between gap-3">
                <button 
                  type="button"
                  (click)="copyCode(prod.sku, 'SKU')"
                  class="cursor-copy-interactive flex items-center gap-1.5 hover:text-text-primary transition-colors text-left"
                  [title]="i18n.isRo() ? 'Apasă pentru a copia SKU' : 'Click to copy SKU'">
                  <span>{{ 'sku_label' | translate }}</span>
                  <strong class="text-text-primary font-semibold">{{ prod.sku }}</strong>
                  <svg class="w-3.5 h-3.5 text-text-muted hover:text-accent shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"/>
                  </svg>
                </button>
                @if (prod.mpn) {
                  <button 
                    type="button"
                    (click)="copyCode(prod.mpn, 'MPN')"
                    class="cursor-copy-interactive flex items-center gap-1.5 hover:text-text-primary transition-colors text-left"
                    [title]="i18n.isRo() ? 'Apasă pentru a copia MPN' : 'Click to copy MPN'">
                    <span>MPN:</span>
                    <strong class="text-text-primary font-semibold">{{ prod.mpn }}</strong>
                    <svg class="w-3.5 h-3.5 text-text-muted hover:text-accent shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"/>
                    </svg>
                  </button>
                }
              </div>
            </div>

            <div class="lg:col-span-7 space-y-6">
              <div>
                <div class="flex flex-wrap items-center gap-2 mb-2">
                  <app-ui-badge variant="accent">{{ i18n.getSubcategoryName(prod.subcategory) }}</app-ui-badge>
                  <app-ui-badge variant="neutral">{{ i18n.isRo() ? 'Nivel: ' : 'Level: ' }}{{ getSkillLevel(prod) }}</app-ui-badge>
                  <div class="flex items-center gap-1.5 text-xs text-text-muted ml-1">
                    <svg class="w-3.5 h-3.5 text-amber-500 fill-amber-500 shrink-0" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                    <span class="text-text-primary font-bold">{{ prod.rating }}</span>
                    <span>({{ prod.review_count }} {{ 'reviews_label' | translate }})</span>
                  </div>
                </div>

                <h1 class="font-heading text-xl sm:text-2xl font-bold text-text-primary leading-snug">
                  {{ i18n.getProductName(prod) }}
                </h1>
                
                <p class="text-xs sm:text-sm text-text-muted mt-3 leading-relaxed">
                  {{ i18n.getProductShortDesc(prod) }}
                </p>
              </div>

              <div class="p-5 rounded-lg bg-surface-elevated border border-border space-y-4">
                <div class="flex flex-wrap items-baseline justify-between gap-3">
                  <div class="flex items-baseline gap-3">
                    <span class="text-3xl font-bold text-text-primary tabular-nums">
                      {{ prod.price_ron.toFixed(2) }} <span class="text-sm font-medium text-text-muted">{{ i18n.currencyLabel() }}</span>
                    </span>
                    @if (prod.old_price_ron) {
                      <span class="text-sm text-text-muted line-through tabular-nums">
                        {{ prod.old_price_ron.toFixed(2) }} {{ i18n.currencyLabel() }}
                      </span>
                      <app-ui-badge variant="success">
                        -{{ (prod.old_price_ron - prod.price_ron).toFixed(2) }} {{ i18n.currencyLabel() }}
                      </app-ui-badge>
                    }
                  </div>

                  <div>
                    @if (prod.stock > 5) {
                      <app-ui-badge variant="success">
                        ● {{ i18n.isRo() ? 'În stoc depozit (' + prod.stock + ' buc)' : 'In stock (' + prod.stock + ' pcs)' }}
                      </app-ui-badge>
                    } @else if (prod.stock > 0) {
                      <app-ui-badge variant="warning">
                        ● {{ i18n.isRo() ? 'Stoc limitat (' + prod.stock + ' buc)' : 'Low stock (' + prod.stock + ' pcs)' }}
                      </app-ui-badge>
                    } @else {
                      <app-ui-badge variant="error">
                        {{ 'badge_out_of_stock' | translate }}
                      </app-ui-badge>
                    }
                  </div>
                </div>

                <!-- Klarna Buy Now Pay Later Widget -->
                <div class="p-3 rounded-lg bg-surface-sunken border border-[#FFB3C7]/30 flex items-center justify-between gap-3">
                  <div class="flex items-center gap-2.5">
                    <div class="w-10 h-6 rounded bg-[#FFB3C7] text-black font-black text-xs flex items-center justify-center tracking-tighter px-1.5 select-none shrink-0 shadow-xs">
                      Klarna.
                    </div>
                    <div class="text-xs">
                      <span class="text-text-primary font-semibold">
                        {{ i18n.isRo() ? 'Plătește în 3 rate de ' : 'Pay in 3 installments of ' }}
                        <strong class="text-[#FFB3C7] tabular-nums font-bold">{{ (prod.price_ron / 3).toFixed(2) }} {{ i18n.currencyLabel() }}</strong>
                      </span>
                      <span class="text-[11px] text-text-muted block">
                        {{ i18n.isRo() ? '0% dobândă • Fără costuri ascunse' : '0% interest • No hidden fees' }}
                      </span>
                    </div>
                  </div>

                  <button 
                    type="button"
                    (click)="isKlarnaModalOpen.set(true)"
                    class="text-xs font-semibold text-[#FFB3C7] hover:underline whitespace-nowrap cursor-pointer">
                    {{ i18n.isRo() ? 'Află detalii →' : 'Learn more →' }}
                  </button>
                </div>

                <div class="pt-4 border-t border-border flex flex-wrap items-center gap-3">
                  <div class="flex items-center border border-border rounded-lg bg-surface p-1">
                    <button 
                      type="button"
                      (click)="decreaseQty()"
                      [disabled]="selectedQty <= 1"
                      class="w-8 h-8 rounded flex items-center justify-center text-text-muted hover:text-text-primary disabled:opacity-30 transition-colors text-sm font-bold">
                      -
                    </button>
                    <span class="w-10 text-center text-sm font-bold text-text-primary tabular-nums">
                      {{ selectedQty }}
                    </span>
                    <button 
                      type="button"
                      (click)="increaseQty()"
                      [disabled]="selectedQty >= prod.stock"
                      class="w-8 h-8 rounded flex items-center justify-center text-text-muted hover:text-text-primary disabled:opacity-30 transition-colors text-sm font-bold">
                      +
                    </button>
                  </div>

                  <button 
                    type="button"
                    (click)="addToCart()"
                    [disabled]="prod.stock <= 0"
                    [class.btn-added-state]="isJustAdded()"
                    class="flex-1 py-2.5 px-6 rounded-lg bg-accent hover:bg-accent-hover text-white font-semibold text-xs transition-all disabled:opacity-40 flex items-center justify-center gap-2 shadow-xs cursor-pointer min-w-[140px]">
                    @if (isJustAdded()) {
                      <svg class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
                      </svg>
                      <span>{{ i18n.isRo() ? 'Adăugat în Coș' : 'Added to Cart' }}</span>
                    } @else {
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
                      </svg>
                      <span>{{ 'btn_add_to_cart' | translate }}</span>
                    }
                  </button>

                  <button 
                    type="button"
                    (click)="quickBuy()"
                    [disabled]="prod.stock <= 0"
                    class="py-2.5 px-5 rounded-lg bg-surface border border-border hover:bg-surface-elevated text-text-primary font-medium text-xs transition-colors disabled:opacity-40 cursor-pointer">
                    {{ i18n.isRo() ? 'Cumpără Acum' : 'Buy Now' }}
                  </button>

                  <button 
                    type="button"
                    (click)="wishlistService.toggleWishlist(prod)"
                    class="heart-button py-2.5 px-4 rounded-lg border text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer"
                    [class.is-active]="wishlistService.isWishlisted(prod.id)"
                    [class.bg-rose-950/20]="wishlistService.isWishlisted(prod.id)"
                    [class.border-rose-500/40]="wishlistService.isWishlisted(prod.id)"
                    [class.text-rose-400]="wishlistService.isWishlisted(prod.id)"
                    [class.bg-surface]="!wishlistService.isWishlisted(prod.id)"
                    [class.border-border]="!wishlistService.isWishlisted(prod.id)"
                    [class.text-text-muted]="!wishlistService.isWishlisted(prod.id)">
                    <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    <span>{{ wishlistService.isWishlisted(prod.id) ? (i18n.isRo() ? 'Salvat' : 'Saved') : (i18n.isRo() ? 'Favorit' : 'Wishlist') }}</span>
                  </button>

                  <button 
                    type="button"
                    (click)="compService.toggleProduct(prod)"
                    class="py-2.5 px-3.5 rounded-lg border text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer"
                    [class.bg-amber-950/30]="compService.isInComparison(prod.id)"
                    [class.border-amber-700]="compService.isInComparison(prod.id)"
                    [class.text-amber-400]="compService.isInComparison(prod.id)"
                    [class.bg-surface]="!compService.isInComparison(prod.id)"
                    [class.border-border]="!compService.isInComparison(prod.id)"
                    [class.text-text-muted]="!compService.isInComparison(prod.id)">
                    <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"/>
                    </svg>
                    <span>{{ compService.isInComparison(prod.id) ? (i18n.isRo() ? 'În Comparație' : 'In Compare') : (i18n.isRo() ? 'Compară' : 'Compare') }}</span>
                  </button>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 text-[11px] text-text-muted">
                  <div class="flex items-center gap-1.5">
                    <svg class="w-3.5 h-3.5 text-primary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
                    <span>{{ i18n.isRo() ? 'Livrare Sameday & Easybox în 24-48h' : 'Sameday & Easybox in 24-48h' }}</span>
                  </div>
                  <div class="flex items-center gap-1.5">
                    <svg class="w-3.5 h-3.5 text-primary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
                    <span>{{ i18n.isRo() ? 'Garanție Tehnică 24 Luni & Retur 14 Zile' : '24-Mo Tech Warranty & 14-Day Returns' }}</span>
                  </div>
                </div>
              </div>

              <div class="flex flex-wrap items-center gap-1.5">
                <span class="text-xs text-text-muted">{{ i18n.isRo() ? 'Etichete:' : 'Tags:' }}</span>
                @for (tag of prod.tags; track tag) {
                  <span class="text-[11px] px-2 py-0.5 rounded bg-surface-elevated text-text-muted border border-border font-medium">
                    #{{ tag }}
                  </span>
                }
              </div>

            </div>
          </div>
        </div>

        <section id="product-tabs" class="bg-surface rounded-xl border border-border shadow-xs p-6 sm:p-8 mb-8 transition-colors lenis-reveal is-revealed">
          <div class="border-b border-border mb-6 flex items-center gap-6 overflow-x-auto text-xs font-medium">
            <a 
              [routerLink]="['/produs', prod.slug]"
              [class.text-accent]="activeTab() === 'overview'"
              [class.border-accent]="activeTab() === 'overview'"
              class="pb-3 border-b-2 transition-colors whitespace-nowrap"
              [class.border-transparent]="activeTab() !== 'overview'"
              [class.text-text-muted]="activeTab() !== 'overview'">
              {{ i18n.isRo() ? 'Prezentare Generală' : 'Overview' }}
            </a>

            <a 
              [routerLink]="['/produs', prod.slug, 'specificatii']"
              [class.text-accent]="activeTab() === 'specifications'"
              [class.border-accent]="activeTab() === 'specifications'"
              class="pb-3 border-b-2 transition-colors whitespace-nowrap"
              [class.border-transparent]="activeTab() !== 'specifications'"
              [class.text-text-muted]="activeTab() !== 'specifications'">
              {{ 'specs_title' | translate }}
            </a>

            <a 
              [routerLink]="['/produs', prod.slug, 'compatibilitate']"
              [class.text-accent]="activeTab() === 'compatibility'"
              [class.border-accent]="activeTab() === 'compatibility'"
              class="pb-3 border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5"
              [class.border-transparent]="activeTab() !== 'compatibility'"
              [class.text-text-muted]="activeTab() !== 'compatibility'">
              <span>{{ i18n.isRo() ? 'Compatibilitate' : 'Compatibility' }}</span>
            </a>

            <a 
              [routerLink]="['/produs', prod.slug, 'documentatie']"
              [class.text-accent]="activeTab() === 'documentation'"
              [class.border-accent]="activeTab() === 'documentation'"
              class="pb-3 border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5"
              [class.border-transparent]="activeTab() !== 'documentation'"
              [class.text-text-muted]="activeTab() !== 'documentation'">
              <span>{{ i18n.isRo() ? 'Documentație' : 'Documentation' }}</span>
            </a>

            <a 
              [routerLink]="['/produs', prod.slug, 'recenzii']"
              [class.text-accent]="activeTab() === 'reviews'"
              [class.border-accent]="activeTab() === 'reviews'"
              class="pb-3 border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5"
              [class.border-transparent]="activeTab() !== 'reviews'"
              [class.text-text-muted]="activeTab() !== 'reviews'">
              <span>{{ i18n.isRo() ? 'Recenzii Inginerie' : 'Engineering Reviews' }} ({{ prod.review_count }})</span>
            </a>
          </div>

          @if (activeTab() === 'overview') {
            <div class="space-y-6">
              <div class="prose max-w-none text-xs leading-relaxed text-text-muted space-y-3">
                <p class="text-sm font-medium text-text-primary leading-normal">{{ i18n.isRo() ? prod.full_desc : (i18n.getProductShortDesc(prod) || prod.full_desc) }}</p>
                <p>
                  {{ i18n.isRo() 
                    ? 'Echipamentul este selectat și verificat individual în laboratorul tehnic Vexera pentru sarcini continue 24/7, eficiență termică optimă și interoperabilitate garantată în topologii de rețea, clustere de calcul sau sisteme embedded.' 
                    : 'This equipment is individually tested and qualified in the Vexera engineering lab for 24/7 duty cycles, optimal thermal dissipation, and certified interoperability across network topologies, compute clusters, or embedded stacks.' }}
                </p>
              </div>

              <div class="pt-4 border-t border-border space-y-3">
                <h4 class="text-xs font-semibold text-text-primary flex items-center gap-2">
                  <span class="text-accent">●</span>
                  <span>{{ i18n.isRo() ? 'De ce ai alege acest produs (Engineering Rationale)' : 'Why you might want this' }}</span>
                </h4>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                  @for (pt of getWhyPoints(prod); track pt) {
                    <div class="spotlight-card p-3.5 rounded-lg bg-surface-elevated border border-border flex items-start gap-2.5 text-xs text-text-muted transition-all">
                      <svg class="w-4 h-4 text-accent mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
                      <p class="leading-relaxed">{{ pt }}</p>
                    </div>
                  }
                </div>
              </div>

              <div class="pt-4 border-t border-border space-y-2.5">
                <h4 class="text-xs font-semibold text-text-primary flex items-center gap-2">
                  <span class="text-accent">●</span>
                  <span>{{ i18n.isRo() ? 'Ideal pentru scenarii (Best for)' : 'Best for scenarios' }}</span>
                </h4>
                <div class="flex flex-wrap items-center gap-2">
                  @for (bf of getBestFor(prod); track bf) {
                    <app-ui-badge variant="neutral">{{ bf }}</app-ui-badge>
                  }
                </div>
              </div>

              <div class="p-4 rounded-lg bg-canvas-subtle border border-border text-xs space-y-2">
                <div class="flex items-center justify-between text-text-muted text-[11px] font-medium">
                  <span>{{ i18n.isRo() ? 'STATUS KERNEL MAINLINE & FIRMWARE' : 'MAINLINE KERNEL & FIRMWARE STATUS' }}</span>
                  <span class="text-accent font-bold">● {{ i18n.isRo() ? 'TESTAT & CERTIFICAT' : 'TESTED & CERTIFIED' }}</span>
                </div>
                <div class="text-text-primary font-medium">
                  {{ i18n.isRo() ? 'Kernel minim:' : 'Minimum Kernel:' }} <span class="text-primary font-bold">Linux 6.6 LTS+</span> | {{ i18n.isRo() ? 'Bootloader:' : 'Bootloader:' }} <span class="text-primary font-bold">U-Boot v2024 / EDK2 UEFI</span>
                </div>
                <div class="text-[11px] text-text-muted">
                  {{ i18n.isRo() ? 'Suport nativ FDT / Device Tree overlay inclus în imaginile oficiale Debian, Ubuntu Server și Alpine.' : 'Native FDT / Device Tree overlay support included in official Debian, Ubuntu Server, and Alpine images.' }}
                </div>
              </div>

              <div class="pt-6 border-t border-border space-y-3">
                <h4 class="text-xs font-semibold uppercase tracking-wider text-text-muted mb-2">
                  {{ i18n.isRo() ? 'Detalii Inginerie & Compatibilitate Extinsă' : 'Engineering & Extended Compatibility Details' }}
                </h4>

                <div class="border border-border rounded-lg bg-surface-elevated overflow-hidden">
                  <button 
                    type="button"
                    (click)="toggleAccordion('power')"
                    class="w-full p-3.5 text-left flex items-center justify-between text-xs font-semibold text-text-primary hover:text-accent transition-colors cursor-pointer">
                    <span class="flex items-center gap-2">
                      <span class="w-1.5 h-1.5 rounded-full bg-accent"></span>
                      <span>{{ i18n.isRo() ? 'Topologie Alimentare & Eficiență Energetică' : 'Power Delivery Topology & Efficiency' }}</span>
                    </span>
                    <svg class="w-4 h-4 transform transition-transform duration-200" [class.rotate-180]="isAccordionOpen('power')" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                    </svg>
                  </button>
                  <div class="accordion-wrapper" [class.is-open]="isAccordionOpen('power')">
                    <div class="accordion-inner p-3.5 pt-0 text-xs text-text-muted border-t border-border/60 space-y-1.5">
                      <p>{{ i18n.isRo() ? 'Tensiune operațională:' : 'Operating voltage:' }} <strong class="text-text-primary">{{ prod.technical_specs.operating_voltage || '5V DC / PD 27W' }}</strong>.</p>
                      <p>{{ i18n.isRo() ? 'Circuite de protecție OVP (Over-Voltage), OCP (Over-Current) și monitorizare termică prin senzori integrați PMIC.' : 'Integrated OVP (Over-Voltage), OCP (Over-Current) protection circuits and PMIC thermal monitoring.' }}</p>
                    </div>
                  </div>
                </div>

                <div class="border border-border rounded-lg bg-surface-elevated overflow-hidden">
                  <button 
                    type="button"
                    (click)="toggleAccordion('bus')"
                    class="w-full p-3.5 text-left flex items-center justify-between text-xs font-semibold text-text-primary hover:text-accent transition-colors cursor-pointer">
                    <span class="flex items-center gap-2">
                      <span class="w-1.5 h-1.5 rounded-full bg-accent"></span>
                      <span>{{ i18n.isRo() ? 'Protocoale Bus & Interfețe de Comunicație' : 'Bus Protocols & Communication Interfaces' }}</span>
                    </span>
                    <svg class="w-4 h-4 transform transition-transform duration-200" [class.rotate-180]="isAccordionOpen('bus')" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                    </svg>
                  </button>
                  <div class="accordion-wrapper" [class.is-open]="isAccordionOpen('bus')">
                    <div class="accordion-inner p-3.5 pt-0 text-xs text-text-muted border-t border-border/60 space-y-1.5">
                      <p>{{ i18n.isRo() ? 'Magistrale suportate:' : 'Supported interfaces:' }} <strong class="text-text-primary">{{ (prod.technical_specs.interfaces || ['PCIe 2.0 / 3.0', 'I2C', 'SPI', 'UART', 'Gigabit Ethernet']).join(', ') }}</strong>.</p>
                      <p>{{ i18n.isRo() ? 'Compatibil cu drivere mainline Linux fără module proprietare (out-of-tree) necesare.' : 'Compatible with mainline Linux drivers with zero proprietary out-of-tree modules needed.' }}</p>
                    </div>
                  </div>
                </div>

                <div class="border border-border rounded-lg bg-surface-elevated overflow-hidden">
                  <button 
                    type="button"
                    (click)="toggleAccordion('qa')"
                    class="w-full p-3.5 text-left flex items-center justify-between text-xs font-semibold text-text-primary hover:text-accent transition-colors cursor-pointer">
                    <span class="flex items-center gap-2">
                      <span class="w-1.5 h-1.5 rounded-full bg-accent"></span>
                      <span>{{ i18n.isRo() ? 'Protocol Verificare Laborator Vexera' : 'Vexera Lab Verification Protocol' }}</span>
                    </span>
                    <svg class="w-4 h-4 transform transition-transform duration-200" [class.rotate-180]="isAccordionOpen('qa')" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                    </svg>
                  </button>
                  <div class="accordion-wrapper" [class.is-open]="isAccordionOpen('qa')">
                    <div class="accordion-inner p-3.5 pt-0 text-xs text-text-muted border-t border-border/60 space-y-1.5">
                      <p>{{ i18n.isRo() ? 'Fiecare lot este supus testelor automate de burn-in termic (48h la sarcină 100%), integritate memorie ECC/RAM și stabilitate pachete pe interfețele de rețea.' : 'Each production batch undergoes automated 48-hour 100% thermal burn-in, ECC/RAM memory validation, and packet stability benchmarks.' }}</p>
                      <p>{{ i18n.isRo() ? 'Garanție tehnică comercială de 24 luni cu înlocuire expresă din stocul local.' : '24-month commercial hardware warranty with express dispatch from local inventory.' }}</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          }

          @if (activeTab() === 'specifications') {
            <div class="space-y-6">
              <div class="overflow-x-auto rounded-lg border border-border">
                <table class="w-full text-xs text-left border-collapse">
                  <tbody>
                    @for (spec of getSpecsArray(prod.technical_specs); track spec.key) {
                      <tr class="border-b border-border hover:bg-surface-elevated transition-colors">
                        <td class="py-3 px-4 text-text-muted text-xs font-medium w-1/3">
                          {{ formatSpecKey(spec.key) }}
                        </td>
                        <td class="py-3 px-4 text-text-primary font-medium">
                          {{ formatSpecValue(spec.val) }}
                        </td>
                      </tr>
                    }
                  </tbody>
                </table>
              </div>

              @if (prod.pinout_info) {
                <div class="pt-6 border-t border-border space-y-4">
                  <div class="flex items-center justify-between">
                    <h4 class="font-heading text-xs font-semibold text-text-primary">
                      {{ 'pinout_title' | translate }} ({{ prod.pinout_info.total_pins }} {{ i18n.isRo() ? 'Pini' : 'Pins' }})
                    </h4>
                    <span class="text-xs text-text-muted">
                      {{ i18n.isRo() ? 'Nivel logic:' : 'Logic level:' }} <strong class="text-text-primary font-semibold">{{ prod.pinout_info.logic_level }}</strong>
                    </span>
                  </div>

                  @if (prod.pinout_info.pin_map && prod.pinout_info.pin_map.length > 0) {
                    <div class="overflow-x-auto rounded-lg border border-border">
                      <table class="w-full text-xs text-left border-collapse">
                        <thead>
                          <tr class="border-b border-border bg-surface-elevated text-text-muted text-xs font-medium">
                            <th class="py-2.5 px-4">Pin</th>
                            <th class="py-2.5 px-4">{{ i18n.isRo() ? 'Semnal' : 'Signal' }}</th>
                            <th class="py-2.5 px-4">{{ i18n.isRo() ? 'Funcție & Protocol' : 'Function & Protocol' }}</th>
                          </tr>
                        </thead>
                        <tbody>
                          @for (pin of prod.pinout_info.pin_map; track pin.pin) {
                            <tr class="border-b border-border hover:bg-surface-elevated">
                              <td class="py-2 px-4 font-bold text-primary">{{ pin.pin }}</td>
                              <td class="py-2 px-4 font-medium text-text-primary">{{ pin.name }}</td>
                              <td class="py-2 px-4 text-text-muted">{{ pin.function }}</td>
                            </tr>
                          }
                        </tbody>
                      </table>
                    </div>
                  }

                  @if (prod.pinout_info.wiring_notes && prod.pinout_info.wiring_notes.length > 0) {
                    <div class="p-3.5 rounded-lg bg-surface-elevated border border-border text-xs text-text-muted space-y-1.5">
                      <strong class="font-bold flex items-center gap-1.5 text-text-primary">
                        <svg class="w-4 h-4 text-primary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                        <span>{{ i18n.isRo() ? 'Recomandări de conectare:' : 'Wiring notes:' }}</span>
                      </strong>
                      <ul class="list-disc list-inside space-y-1 text-[11px]">
                        @for (note of prod.pinout_info.wiring_notes; track note) {
                          <li>{{ note }}</li>
                        }
                      </ul>
                    </div>
                  }
                </div>
              }
            </div>
          }

          @if (activeTab() === 'compatibility') {
            <div class="space-y-6">
              @let labEval = labProfileService.evaluateProductAgainstLab(prod);
              <app-ui-alert 
                [variant]="labEval.status === 'compatible' ? 'success' : 'warning'"
                [title]="i18n.isRo() ? ('Evaluare Profil Laborator (' + labProfileService.profile().name + ')') : ('My Lab Profile Evaluation (' + labProfileService.profile().name + ')')">
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <span>{{ i18n.isRo() ? labEval.messageRo : labEval.messageEn }}</span>
                  <button 
                    type="button" 
                    (click)="labProfileService.isDrawerOpen.set(true)"
                    class="underline whitespace-nowrap text-text-primary hover:opacity-80 font-medium text-xs">
                    {{ i18n.isRo() ? 'Configurare Profil Lab →' : 'Edit Lab Profile →' }}
                  </button>
                </div>
              </app-ui-alert>

              <div class="space-y-3">
                <h4 class="font-heading text-xs font-semibold text-text-primary">
                  {{ i18n.isRo() ? 'Sisteme de operare verificate (Works with)' : 'Verified Operating Systems' }}
                </h4>
                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                  @for (os of getWorksWith(prod); track os) {
                    <div class="p-2.5 rounded-lg bg-surface-elevated border border-border flex items-center gap-2 text-xs text-text-primary font-medium">
                      <svg class="w-3.5 h-3.5 text-accent shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
                      <span>{{ os }}</span>
                    </div>
                  }
                </div>
              </div>

              <div class="p-4 rounded-lg bg-surface-elevated border border-border space-y-2 text-xs">
                <div class="font-bold text-text-primary flex items-center gap-2">
                  <svg class="w-4 h-4 text-primary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                  <span>{{ i18n.isRo() ? 'Ghid de Alimentare & Răcire' : 'Power & Thermal Guidelines' }}</span>
                </div>
                <p class="text-text-muted leading-relaxed">
                  {{ i18n.isRo()
                    ? 'Pentru funcționare stabilă sub sarcină maximă, asigurați o sursă dedicată de alimentare conform specificațiilor tehnice. Nu alimentați module suplimentare pe linia GPIO dacă depășiți 1.2A continuu.'
                    : 'Ensure an adequate power supply meeting standard amperage requirements under peak thermal load. Do not draw more than 1.2A aggregate across GPIO 3.3V rail when using extension hats.' }}
                </p>
              </div>

              @if (prod.compatible_products && prod.compatible_products.length > 0) {
                <div class="pt-4 border-t border-border space-y-3">
                  <h4 class="font-heading text-xs font-semibold text-text-primary">
                    {{ i18n.isRo() ? 'Accesorii și module compatibile verificate' : 'Verified Compatible Accessories' }}
                  </h4>
                  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lenis-reveal-stagger is-revealed">
                    @for (comp of prod.compatible_products; track comp.id) {
                      <div class="spotlight-card lenis-velocity-card p-3 rounded-lg border border-border bg-surface-elevated flex items-center gap-3 hover:border-border-focus transition-all">
                        <img 
                          [src]="comp.image_url" 
                          [alt]="comp.name"
                          class="w-12 h-12 object-contain rounded p-1 bg-surface border border-border flex-shrink-0 lenis-parallax-image">
                        <div class="flex-1 min-w-0">
                          <h5 class="text-xs font-semibold text-text-primary truncate">
                            <a [routerLink]="['/produs', comp.slug]" class="hover:text-primary">
                              {{ comp.name }}
                            </a>
                          </h5>
                          <div class="text-xs font-bold text-text-primary mt-0.5 tabular-nums">
                            {{ comp.price_ron.toFixed(2) }} {{ i18n.currencyLabel() }}
                          </div>
                        </div>
                        <a [routerLink]="['/produs', comp.slug]"
                           class="px-2 py-1 rounded bg-surface border border-border hover:bg-surface-hover text-text-primary text-xs font-medium transition-colors flex-shrink-0">
                          {{ i18n.isRo() ? 'Vezi' : 'View' }}
                        </a>
                      </div>
                    }
                  </div>
                </div>
              }
            </div>
          }

          @if (activeTab() === 'documentation') {
            <div class="space-y-6">
              <div class="p-5 rounded-lg bg-surface-elevated border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div class="space-y-1">
                  <h4 class="font-heading text-sm font-bold text-text-primary flex items-center gap-2">
                    <svg class="w-4 h-4 text-primary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                    <span>{{ i18n.isRo() ? 'Fișă Tehnică Oficială de Producător' : 'Official Hardware Datasheet' }}</span>
                  </h4>
                  <p class="text-xs text-text-muted">
                    {{ i18n.isRo() 
                      ? 'Include diagramele schematice, consumul la frecvențe maxime, cerințele de semnal și conformitatea RoHS/CE.' 
                      : 'Includes schematic pinouts, thermal dissipation curves, signal timing, and RoHS/CE compliance.' }}
                  </p>
                </div>
                @if (prod.datasheet_url) {
                  <a 
                    [href]="prod.datasheet_url" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    class="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary hover:bg-primary-hover text-primary-contrast font-semibold text-xs transition-colors whitespace-nowrap shadow-xs">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                    </svg>
                    <span>{{ i18n.isRo() ? 'Descarcă Datasheet PDF' : 'Download PDF' }}</span>
                  </a>
                } @else {
                  <span class="text-xs text-text-muted">{{ i18n.isRo() ? 'Datasheet inclus la livrare' : 'Datasheet included in package' }}</span>
                }
              </div>

              <div class="p-4 rounded-lg bg-canvas-subtle border border-border text-xs space-y-3">
                <div class="text-primary font-bold uppercase font-heading">{{ i18n.isRo() ? 'GHID RAPID & DEPLOYMENT FIRMWARE' : 'QUICK START & FIRMWARE DEPLOYMENT' }}</div>
                <div class="text-text-muted leading-relaxed">
                  {{ i18n.isRo() 
                    ? 'Pentru scrierea imaginilor OS pe card SD sau NVMe, utilizați utilitarul CLI recomandat:' 
                    : 'To flash official OS images onto SD card or NVMe, use the recommended CLI utility:' }}
                </div>
                <div class="p-3 rounded bg-surface border border-border text-accent select-all text-[11px] font-semibold tabular-nums flex items-center justify-between gap-3">
                  <span class="break-all">curl -fsSL https://updates.vexera.ro/boot/install.sh | bash</span>
                  <button 
                    type="button" 
                    (click)="copyCode('curl -fsSL https://updates.vexera.ro/boot/install.sh | bash', i18n.isRo() ? 'Comandă CLI' : 'CLI Command')"
                    class="px-2.5 py-1 rounded bg-surface-elevated border border-border hover:bg-surface text-text-primary text-[10px] font-medium transition-colors flex items-center gap-1.5 shrink-0"
                    [title]="i18n.isRo() ? 'Copiază comanda' : 'Copy command'">
                    <svg class="w-3.5 h-3.5 text-accent shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"/>
                    </svg>
                    <span>{{ i18n.isRo() ? 'Copiază' : 'Copy' }}</span>
                  </button>
                </div>
                <div class="text-[11px] text-text-muted">
                  {{ i18n.isRo() 
                    ? 'Sunt validate checksums SHA256 pentru toate release-urile oficiale.' 
                    : 'SHA256 checksums are verified for all official releases.' }}
                </div>
              </div>
            </div>
          }

          @if (activeTab() === 'reviews') {
            <div class="space-y-6">
              <div class="p-5 rounded-lg bg-surface-elevated border border-border flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div class="flex items-center gap-4">
                  <div class="text-center px-4 py-2 rounded-lg bg-surface border border-border">
                    <div class="text-3xl font-bold text-text-primary tabular-nums">{{ prod.rating.toFixed(1) }}</div>
                    <div class="flex items-center justify-center gap-0.5 text-amber-500 mt-1">
                      <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                      <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                      <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                      <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                      <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                    </div>
                    <div class="text-[10px] text-text-muted mt-1 tabular-nums">{{ prod.review_count }} {{ i18n.isRo() ? 'opinii' : 'reviews' }}</div>
                  </div>
                  <div>
                    <h4 class="font-heading text-sm font-bold text-text-primary">
                      {{ i18n.isRo() ? 'Recenzii Verificate de Laborator & Clienți B2B' : 'Verified Engineering Reviews' }}
                    </h4>
                    <p class="text-xs text-text-muted mt-0.5">
                      {{ i18n.isRo() 
                        ? 'Toate recenziile includ context tehnic real (mediu de test, uptime și parametri de performanță).' 
                        : 'All reviews include test environment specs, verified purchase status, and measured metrics.' }}
                    </p>
                  </div>
                </div>

                <button 
                  type="button"
                  (click)="showReviewForm.set(!showReviewForm())"
                  class="px-4 py-2 rounded-lg bg-surface border border-border hover:bg-surface-hover text-text-primary text-xs font-medium transition-colors self-start md:self-center">
                  {{ showReviewForm() ? (i18n.isRo() ? 'Anulează' : 'Cancel') : (i18n.isRo() ? '+ Scrie Recenzie Tehnică' : '+ Write Bench Review') }}
                </button>
              </div>

              @if (showReviewForm()) {
                <div class="p-5 rounded-lg bg-surface-elevated border border-accent/40 space-y-4">
                  <h5 class="font-heading text-xs font-bold uppercase text-text-primary">
                    {{ i18n.isRo() ? 'Formular Bench Review' : 'Submit Lab Review' }}
                  </h5>
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label class="block text-text-muted mb-1">{{ i18n.isRo() ? 'Nume / Handle' : 'Name / Handle' }}</label>
                      <input type="text" placeholder="e.g. Radu M. (Sysadmin)" class="w-full px-3 py-2 rounded bg-surface border border-border text-text-primary focus:outline-none focus:border-accent">
                    </div>
                    <div>
                      <label class="block text-text-muted mb-1">{{ i18n.isRo() ? 'Mediu de test' : 'Test Environment' }}</label>
                      <input type="text" placeholder="e.g. Proxmox 8.2 / 10GbE SFP+" class="w-full px-3 py-2 rounded bg-surface border border-border text-text-primary focus:outline-none focus:border-accent">
                    </div>
                  </div>
                  <div>
                    <label class="block text-text-muted mb-1 text-xs">{{ i18n.isRo() ? 'Concluzie tehnică' : 'Bench findings' }}</label>
                    <textarea rows="3" placeholder="Parametri măsurați, stabilitate 24/7, compatibilitate PCIe/GPIO..." class="w-full px-3 py-2 rounded bg-surface border border-border text-text-primary focus:outline-none focus:border-accent text-xs"></textarea>
                  </div>
                  <button 
                    type="button" 
                    (click)="submitDemoReview()"
                    class="px-4 py-2 rounded-lg bg-primary hover:bg-primary-hover text-primary-contrast font-semibold text-xs transition-colors shadow-xs">
                    {{ i18n.isRo() ? 'Trimite Recenzia spre Validare' : 'Submit Review' }}
                  </button>
                </div>
              }

              <div class="space-y-3">
                @for (rev of getReviewsForProduct(prod); track rev.id) {
                  <div class="spotlight-card p-4 rounded-lg bg-surface-elevated border border-border space-y-2.5 transition-all">
                    <div class="flex flex-wrap items-center justify-between gap-2">
                      <div class="flex items-center gap-2">
                        <span class="font-bold text-xs text-text-primary">{{ rev.author }}</span>
                        <span class="text-border">•</span>
                        <span class="text-[11px] text-text-muted font-medium">{{ rev.role }}</span>
                        @if (rev.verifiedBuyer) {
                          <app-ui-badge variant="success">{{ i18n.isRo() ? 'Achiziție Verificată' : 'Verified Purchase' }}</app-ui-badge>
                        }
                      </div>
                      <div class="flex items-center gap-2 text-xs text-text-muted">
                        <div class="flex items-center gap-0.5 text-amber-500">
                          <svg class="w-3 h-3 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                          <svg class="w-3 h-3 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                          <svg class="w-3 h-3 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                          <svg class="w-3 h-3 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                          <svg class="w-3 h-3 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                        </div>
                        <span class="tabular-nums">{{ rev.date }}</span>
                      </div>
                    </div>

                    <div class="p-2 rounded bg-surface border border-border text-[11px] text-text-muted">
                      <span class="text-text-primary font-bold">Lab Setup:</span> {{ rev.labEnvironment }}
                    </div>

                    <h5 class="font-heading text-xs font-bold text-text-primary">{{ rev.title }}</h5>
                    <p class="text-xs text-text-muted leading-relaxed">
                      {{ i18n.isRo() ? rev.contentRo : rev.contentEn }}
                    </p>

                    @if (rev.benchMetrics && rev.benchMetrics.length > 0) {
                      <div class="flex flex-wrap gap-2 pt-1">
                        @for (m of rev.benchMetrics; track m.key) {
                          <span class="text-[10px] px-2 py-0.5 rounded bg-surface text-text-muted border border-border font-medium">
                            {{ m.key }}: <strong class="text-text-primary font-semibold">{{ m.value }}</strong>
                          </span>
                        }
                      </div>
                    }
                  </div>
                }
              </div>
            </div>
          }
        </section>

        <app-klarna-modal 
          [isOpen]="isKlarnaModalOpen()" 
          [amount]="prod.price_ron" 
          (close)="isKlarnaModalOpen.set(false)">
        </app-klarna-modal>

      </div>
    }
  `
})
export class ProductDetailComponent implements OnInit {
  route = inject(ActivatedRoute);
  router = inject(Router);
  productService = inject(ProductService);
  cartService = inject(CartService);
  compService = inject(ComparisonService);
  labProfileService = inject(LabProfileService);
  i18n = inject(TranslationService);
  uiFeedback = inject(UiFeedbackService);
  lenisService = inject(LenisService);
  wishlistService = inject(WishlistService);
  titleService = inject(Title);

  product = signal<Product | null>(null);
  loading = signal<boolean>(true);
  selectedQty = 1;
  activeTab = signal<'overview' | 'specifications' | 'compatibility' | 'documentation' | 'reviews'>('overview');
  showReviewForm = signal<boolean>(false);

  isJustAdded = signal<boolean>(false);
  activeImageIndex = signal<number>(0);
  isSwitchingImage = signal<boolean>(false);
  openAccordions = signal<string[]>(['power']);

  isKlarnaModalOpen = signal<boolean>(false);
  viewMode = signal<'photos' | '3d'>('photos');

  toggleAccordion(id: string) {
    this.openAccordions.update(list => 
      list.includes(id) ? list.filter(i => i !== id) : [...list, id]
    );
  }

  isAccordionOpen(id: string): boolean {
    return this.openAccordions().includes(id);
  }

  galleryImages = computed<string[]>(() => {
    const p = this.product();
    if (!p) return [];
    // Provide gallery views: main photo, perspective, schematic
    return [
      p.image_url,
      p.image_url,
      p.image_url
    ];
  });

  currentDisplayImage = computed<string>(() => {
    const list = this.galleryImages();
    const idx = this.activeImageIndex();
    return list[idx] || this.product()?.image_url || '';
  });

  selectGalleryImage(idx: number) {
    if (this.activeImageIndex() === idx) return;
    this.isSwitchingImage.set(true);
    setTimeout(() => {
      this.activeImageIndex.set(idx);
      this.isSwitchingImage.set(false);
    }, 140);
  }

  copyCode(code: string, label: string = 'Cod') {
    const msg = this.i18n.isRo() ? `${label} copiat` : `${label} copied`;
    this.uiFeedback.copyToClipboard(code, msg);
  }

  getSkillLevel(prod: Product): string {
    const s = prod.slug.toLowerCase();
    const isRo = this.i18n.isRo();
    if (s.includes('glasgow') || s.includes('fpga') || s.includes('proxmark') || s.includes('r640') || s.includes('starfive')) {
      return isRo ? 'Expert' : 'Expert';
    }
    if (s.includes('crs305') || s.includes('hba') || s.includes('mcx4')) {
      return isRo ? 'Avansat' : 'Advanced';
    }
    if (s.includes('flipper') || s.includes('pineapple') || s.includes('rb5009') || s.includes('rock5')) {
      return isRo ? 'Intermediar' : 'Intermediate';
    }
    return isRo ? 'Începător' : 'Beginner';
  }

  getWhyPoints(prod: Product): string[] {
    const isRo = this.i18n.isRo();
    const s = prod.slug.toLowerCase();
    if (s.includes('raspberry-pi-5')) {
      return isRo ? [
        'Procesor Broadcom BCM2712 Quad-Core Cortex-A76 @ 2.4GHz cu salt de 2.5x–3x performanță față de RPi 4.',
        'Magistrală PCIe 2.0/3.0 expusă pe conector FPC pentru SSD-uri NVMe ultra-rapide (>800 MB/s transfer).',
        'Port Ethernet Gigabit nativ cu suport complet PoE+ și 2 porturi USB 3.0 de 5Gbps.',
        'Ideal pentru micro-cluster k3s, nod Home Assistant dedicat sau server media 4K Plex/Jellyfin.'
      ] : [
        'Broadcom BCM2712 Quad-Core Cortex-A76 @ 2.4GHz CPU with 2.5x–3x performance jump over RPi 4.',
        'PCIe 2.0/3.0 bus exposed via FPC connector for ultra-fast NVMe storage (>800 MB/s).',
        'Native Gigabit Ethernet with full PoE+ header and two 5Gbps USB 3.0 ports.',
        'Perfect for k3s micro-clusters, Home Assistant, or 4K Plex/Jellyfin media nodes.'
      ];
    }
    if (s.includes('flipper-zero')) {
      return isRo ? [
        'Dispozitiv etalon autonom de buzunar pentru cercetare în radiofrecvență fără echipamente voluminoase.',
        'Transceiver Sub-1GHz TI CC1101 pentru captură, analiză și emulare comenzi radio 433MHz/868MHz.',
        'RFID 125kHz (EM4100/HID Prox) + NFC 13.56MHz (Mifare/NTAG/FeliCa) integrate într-o singură carcasă rezistentă.',
        'Pini GPIO 3.3V expuși pentru breadboard, analiză UART și emulare BadUSB prin DuckyScript.'
      ] : [
        'Pocket standalone research multi-tool for RF, access control, and hardware debugging.',
        'Sub-1GHz TI CC1101 transceiver for 433MHz/868MHz RF capture and replay.',
        'Integrated LF 125kHz RFID and HF 13.56MHz NFC with fast key dictionary cracking.',
        'Exposed 3.3V GPIO headers for direct breadboard prototyping and BadUSB keystroke injection.'
      ];
    }
    return isRo ? [
      'Echipament selectat și testat de ingineri de sistem pentru sarcini continue 24/7.',
      'Consum energetic optimizat pentru disipare termică eficientă și operare silențioasă.',
      'Compatibilitate certificată cu nucleul Linux Mainline și distribuții enterprise.'
    ] : [
      'Handpicked and verified by sysadmins for serious 24/7 lab duty.',
      'Power-optimized for silent 24/7 continuous uptime and efficient thermals.',
      'Certified compatibility with Mainline Linux kernels and enterprise distributions.'
    ];
  }

  getBestFor(prod: Product): string[] {
    const s = prod.slug.toLowerCase();
    if (s.includes('flipper') || s.includes('pineapple') || s.includes('pentest') || s.includes('proxmark') || s.includes('marauder') || s.includes('ducky')) {
      return ['Security Research', 'Wireless Audit', 'Hardware Hacking', 'Embedded Labs'];
    }
    if (s.includes('server') || s.includes('hba') || s.includes('dell') || s.includes('u2') || s.includes('25g')) {
      return ['Enterprise Datacenter', 'TrueNAS ZFS', 'Proxmox VE Virtualization', 'High-Density Storage'];
    }
    if (s.includes('router') || s.includes('switch') || s.includes('crs') || s.includes('sfp') || s.includes('mikrotik') || s.includes('unifi')) {
      return ['10GbE Homelab', 'VLAN Segmentation', 'OPNsense / pfSense', 'Core Networking'];
    }
    if (s.includes('sensor') || s.includes('bme') || s.includes('scd') || s.includes('iot') || s.includes('relay')) {
      return ['Home Assistant', 'IoT Telemetry', 'ESPHome', 'Industrial RS485'];
    }
    return ['Homelab', 'Docker / LXC', 'Kubernetes', 'Linux Development'];
  }

  getWorksWith(prod: Product): string[] {
    const s = prod.slug.toLowerCase();
    if (s.includes('flipper') || s.includes('pineapple') || s.includes('marauder') || s.includes('proxmark')) {
      return ['Kali Linux 2024.x', 'Parrot Security OS', 'PineappleOS', 'Ubuntu / Debian'];
    }
    if (s.includes('mikrotik')) {
      return ['RouterOS v7', 'SwOS', 'Winbox', 'Linux (VLAN 802.1Q)'];
    }
    return ['Proxmox VE 8.x', 'TrueNAS CORE/SCALE', 'Debian 12 Bookworm', 'Ubuntu Server 24.04', 'Kubernetes / K3s'];
  }

  getReviewsForProduct(prod: Product): EngineeringReview[] {
    return [
      {
        id: 'rev-1',
        author: 'Mihai T.',
        role: 'Senior DevOps / Homelab Architect',
        rating: 5,
        date: '2026-09-14',
        verifiedBuyer: true,
        labEnvironment: '3x Node k3s Cluster, 10GbE SFP+ Backplane, TrueNAS CORE ZFS',
        title: 'Stabilitate ireproșabilă în producție internă 24/7',
        contentRo: `Instalat și testat timp de peste 60 de zile fără niciun panic de kernel. Disiparea termică este excelentă chiar și în sarcină susținută de transfer I/O.`,
        contentEn: `Tested for over 60 days without any kernel panics. Thermal dissipation is outstanding even under sustained I/O workload.`,
        benchMetrics: [
          { key: 'Idle Draw', value: '4.8W' },
          { key: 'Peak Load', value: '18.4W' },
          { key: 'MTBF Bench', value: 'Pass' }
        ]
      },
      {
        id: 'rev-2',
        author: 'Alexandru D.',
        role: 'Embedded Systems Engineer',
        rating: 5,
        date: '2026-08-28',
        verifiedBuyer: true,
        labEnvironment: 'Debian 12 Mainline, Logic Analyzer Saleae 16-ch, UART 115200',
        title: 'Conformitate excelentă a semnalului pe pini și interfețe',
        contentRo: `Documentația pinout de pe Vexera corespunde 100% cu realitatea de pe placă. Nivelurile logice sunt curate, fără ringing sau zgomot parazit.`,
        contentEn: `Pinout documentation on Vexera matches the physical board 100%. Logic levels are clean without ringing or transient noise.`,
        benchMetrics: [
          { key: 'Voltage Jitter', value: '< 15mV' },
          { key: 'Kernel Ver', value: '6.6.21-lts' }
        ]
      }
    ];
  }

  submitDemoReview() {
    this.showReviewForm.set(false);
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const slug = params['slug'];
      const tabParam = params['tab'];
      
      let tab: 'overview' | 'specifications' | 'compatibility' | 'documentation' | 'reviews' = 'overview';
      if (tabParam) {
        const lower = tabParam.toLowerCase();
        if (lower === 'specificatii' || lower === 'specs' || lower === 'specifications') {
          tab = 'specifications';
        } else if (lower === 'compatibilitate' || lower === 'compatibility') {
          tab = 'compatibility';
        } else if (lower === 'documentatie' || lower === 'docs' || lower === 'documentation') {
          tab = 'documentation';
        } else if (lower === 'recenzii' || lower === 'reviews') {
          tab = 'reviews';
        }
      }
      this.activeTab.set(tab);

      if (slug) {
        if (!this.product() || this.product()?.slug !== slug) {
          this.loadProduct(slug);
        } else {
          this.updatePageTitle(this.product()!, tab);
        }
      }
    });
  }

  loadProduct(slug: string) {
    this.loading.set(true);
    this.selectedQty = 1;
    this.productService.getProduct(slug).subscribe({
      next: (prod) => {
        this.product.set(prod);
        this.loading.set(false);
        this.updatePageTitle(prod, this.activeTab());
        setTimeout(() => {
          this.lenisService.observeRevealElements();
          this.lenisService.resize();
        }, 80);
      },
      error: () => {
        this.product.set(null);
        this.loading.set(false);
      }
    });
  }

  updatePageTitle(prod: Product, tab: 'overview' | 'specifications' | 'compatibility' | 'documentation' | 'reviews') {
    const isRo = this.i18n.isRo();
    let tabLabel = '';
    switch (tab) {
      case 'specifications':
        tabLabel = isRo ? 'Specificații Tehnice' : 'Technical Specifications';
        break;
      case 'compatibility':
        tabLabel = isRo ? 'Compatibilitate Hardware' : 'Hardware Compatibility';
        break;
      case 'documentation':
        tabLabel = isRo ? 'Documentație & Pinout' : 'Documentation & Pinouts';
        break;
      case 'reviews':
        tabLabel = isRo ? 'Recenzii Inginerie' : 'Engineering Reviews';
        break;
      default:
        tabLabel = '';
    }
    const prodName = this.i18n.getProductName(prod);
    if (tabLabel) {
      this.titleService.setTitle(`${prodName} - ${tabLabel} | Vexera`);
    } else {
      this.titleService.setTitle(`${prodName} | Vexera Hardware`);
    }
  }

  increaseQty() {
    const p = this.product();
    if (p && this.selectedQty < p.stock) {
      this.selectedQty++;
    }
  }

  decreaseQty() {
    if (this.selectedQty > 1) {
      this.selectedQty--;
    }
  }

  addToCart() {
    const p = this.product();
    if (p && p.stock > 0) {
      this.cartService.addToCart(p, this.selectedQty);
      const isRo = this.i18n.isRo();
      this.uiFeedback.showToast({
        message: isRo 
          ? `${this.selectedQty > 1 ? this.selectedQty + 'x ' : ''}${p.name} adăugat în coș`
          : `${this.selectedQty > 1 ? this.selectedQty + 'x ' : ''}${p.name} added to cart`,
        type: 'success'
      });
      // Button state animation
      this.isJustAdded.set(true);
      setTimeout(() => this.isJustAdded.set(false), 1500);
    }
  }

  quickBuy() {
    this.addToCart();
    this.router.navigate(['/checkout']);
  }

  getSpecsArray(specs: any): { key: string; val: any }[] {
    if (!specs) return [];
    return Object.entries(specs).map(([key, val]) => ({ key, val }));
  }

  formatSpecKey(key: string): string {
    const isRo = this.i18n.isRo();
    const labels: Record<string, { ro: string; en: string }> = {
      operating_voltage: { ro: 'Tensiune de Lucru', en: 'Operating Voltage' },
      input_voltage: { ro: 'Tensiune Intrare', en: 'Input Voltage' },
      processor: { ro: 'Arhitectură / Procesor', en: 'CPU Architecture' },
      ram: { ro: 'Capacitate RAM', en: 'RAM Capacity' },
      ram_support: { ro: 'Suport Memorie RAM', en: 'RAM Support' },
      storage: { ro: 'Stocare Flash / NVMe', en: 'Storage / NVMe' },
      storage_support: { ro: 'Suport Discuri', en: 'Drive Support' },
      interfaces: { ro: 'Interfețe Digitale', en: 'Digital Interfaces' },
      network_interfaces: { ro: 'Porturi de Rețea', en: 'Network Interfaces' },
      ports: { ro: 'Porturi I/O', en: 'I/O Ports' },
      interface_bus: { ro: 'Magistrală Bus', en: 'Bus Interface' },
      controller: { ro: 'Controller Chipset', en: 'Controller Chipset' },
      power_consumption: { ro: 'Consum Putere', en: 'Power Draw' },
      dimensions: { ro: 'Dimensiuni Fizice', en: 'Physical Dimensions' },
      form_factor: { ro: 'Form Factor / Format', en: 'Form Factor' },
      connectivity: { ro: 'Conectivitate Wireless', en: 'Wireless Connectivity' },
      operating_ranges: { ro: 'Domeniu de Operare', en: 'Operating Range' },
      accuracy: { ro: 'Precizie Măsurare', en: 'Measurement Accuracy' },
      co2_range: { ro: 'Domeniu CO2 NDIR', en: 'CO2 NDIR Range' },
      additional_sensors: { ro: 'Senzori Suplimentari', en: 'Additional Sensors' },
      measuring_range: { ro: 'Distanță de Măsurare', en: 'Measuring Distance' },
      emitter: { ro: 'Emițător Optic', en: 'Optical Emitter' },
      response_time: { ro: 'Timp de Răspuns', en: 'Response Time' },
      contact_ratings: { ro: 'Curent / Tensiune Contacte', en: 'Contact Ratings' },
      isolation: { ro: 'Izolație Electrică', en: 'Electrical Isolation' },
      control_input: { ro: 'Tensiune Comandă', en: 'Control Input' },
      load_output: { ro: 'Sarcină Ieșire', en: 'Load Output' },
      switching_type: { ro: 'Tip Comutație', en: 'Switching Type' },
      efficiency: { ro: 'Eficiență Energetică', en: 'Power Efficiency' }
    };
    if (labels[key]) {
      return isRo ? labels[key].ro : labels[key].en;
    }
    return key.replace(/_/g, ' ');
  }

  formatSpecValue(val: any): string {
    if (Array.isArray(val)) {
      return val.join(', ');
    }
    return String(val);
  }
}
