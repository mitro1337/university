import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductService, ProductFilterParams } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { ComparisonService } from '../../services/comparison.service';
import { TranslationService } from '../../services/translation.service';
import { UiFeedbackService } from '../../services/ui-feedback.service';
import { LenisService } from '../../services/lenis.service';
import { WishlistService } from '../../services/wishlist.service';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { Category, Product } from '../../models/product.model';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [RouterLink, FormsModule, TranslatePipe],
  template: `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      <nav class="flex items-center gap-2 text-xs text-text-muted mb-4 font-medium" aria-label="Breadcrumb">
        <a routerLink="/" class="breadcrumb-interactive hover:text-text-primary">{{ i18n.isRo() ? 'Acasă' : 'Home' }}</a>
        <span class="text-text-muted">/</span>
        <a routerLink="/produse" (click)="resetFilters()" class="breadcrumb-interactive hover:text-text-primary">{{ 'catalog_title' | translate }}</a>
        @if (selectedCategory && currentCategoryObj(); as currentCat) {
          <span class="text-text-muted">/</span>
          <span class="text-text-primary font-semibold">{{ i18n.getCategoryName(currentCat.slug, currentCat.name) }}</span>
        }
      </nav>

      <div class="bg-surface-base rounded-xl border border-border p-5 sm:p-6 mb-6 shadow-sm">
        <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div class="flex items-center gap-2.5 mb-1.5">
              <h1 class="font-display text-2xl sm:text-3xl lg:text-4xl text-text-primary tracking-wide uppercase">
                {{ selectedCategory && currentCategoryObj() ? i18n.getCategoryName(currentCategoryObj()!.slug, currentCategoryObj()!.name) : ('catalog_title' | translate) }}
              </h1>
              <span class="px-2 py-0.5 rounded bg-surface-elevated text-text-muted text-xs font-semibold border border-border">
                {{ products().length }} {{ i18n.isRo() ? 'echipamente' : 'units' }}
              </span>
            </div>
            <p class="text-xs text-text-secondary max-w-2xl leading-relaxed">
              {{ selectedCategory && currentCategoryObj() ? i18n.getCategoryDescription(currentCategoryObj()!.slug, currentCategoryObj()!.description) : ('catalog_subtitle' | translate) }}
            </p>
          </div>

          <div class="flex flex-wrap items-center gap-3">
            
            <button 
              type="button" 
              (click)="mobileFiltersOpen.set(true)"
              class="lg:hidden px-3.5 py-2 rounded-md bg-surface-elevated text-text-primary text-xs font-bold border border-border flex items-center gap-1.5">
              <span>{{ i18n.isRo() ? 'Filtre' : 'Filters' }}</span>
              @if (activeFilterCount() > 0) {
                <span class="w-4 h-4 rounded-full bg-primary text-primary-contrast text-[10px] flex items-center justify-center font-bold">
                  {{ activeFilterCount() }}
                </span>
              }
            </button>

            <div class="inline-flex p-1 rounded-md bg-surface-sunken border border-border">
              <button 
                type="button" 
                (click)="viewMode.set('grid')"
                [class.bg-surface-elevated]="viewMode() === 'grid'"
                [class.text-text-primary]="viewMode() === 'grid'"
                [class.text-text-muted]="viewMode() !== 'grid'"
                class="px-2.5 py-1 rounded text-xs transition-colors"
                [title]="i18n.isRo() ? 'Afișare Grilă' : 'Grid View'">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>
                </svg>
              </button>
              <button 
                type="button" 
                (click)="viewMode.set('list')"
                [class.bg-surface-elevated]="viewMode() === 'list'"
                [class.text-text-primary]="viewMode() === 'list'"
                [class.text-text-muted]="viewMode() !== 'list'"
                class="px-2.5 py-1 rounded text-xs transition-colors"
                [title]="i18n.isRo() ? 'Afișare Listă Tehnică' : 'Technical List View'">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
                </svg>
              </button>
            </div>

            <div class="flex items-center gap-1.5 text-xs">
              <select 
                [(ngModel)]="selectedSort" 
                (change)="onSortChange()" 
                class="bg-surface-sunken border border-border text-text-primary rounded-md px-3 py-1.5 text-xs focus:outline-none focus:border-accent font-medium">
                <option value="featured">{{ 'sort_recommended' | translate }}</option>
                <option value="price_asc">{{ 'sort_price_asc' | translate }}</option>
                <option value="price_desc">{{ 'sort_price_desc' | translate }}</option>
                <option value="rating">{{ 'sort_rating' | translate }}</option>
                <option value="newest">{{ i18n.isRo() ? 'Cele mai noi' : 'Newest' }}</option>
              </select>
            </div>

          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        
        <aside data-lenis-parallax="0.02" class="filter-slide-panel hidden lg:block space-y-4 bg-surface-base rounded-xl border border-border-subtle p-5 shadow-panel sticky top-16">
          <div class="flex items-center justify-between border-b border-border-subtle pb-3">
            <span class="text-xs font-semibold text-text-primary flex items-center gap-1.5">
              <span>{{ i18n.isRo() ? 'Filtre Tehnice' : 'Technical Filters' }}</span>
            </span>
            @if (hasActiveFilters()) {
              <button 
                type="button" 
                (click)="resetFilters()" 
                class="text-xs text-accent hover:text-accent-hover font-medium underline">
                {{ 'filter_reset' | translate }}
              </button>
            }
          </div>

          <div class="space-y-1.5">
            <label class="text-xs font-medium text-text-secondary">
              {{ i18n.isRo() ? 'Căutare Nume / SKU' : 'Search Name / SKU' }}
            </label>
            <input 
              type="text" 
              [(ngModel)]="searchQuery" 
              (input)="applyFilters()" 
              placeholder="ex: RPI5, MS-01, RB5009..." 
              class="w-full bg-surface-sunken border border-border rounded-lg px-3 py-2 text-xs text-text-primary placeholder-text-muted focus:outline-none focus:border-accent">
          </div>

          <div class="space-y-1.5 pt-3 border-t border-border">
            <label class="text-xs font-medium text-text-secondary">{{ 'filter_categories' | translate }}</label>
            <div class="space-y-1 max-h-48 overflow-y-auto pr-1">
              <button 
                type="button"
                (click)="setCategory('')"
                [class.bg-accent]="!selectedCategory"
                [class.text-white]="!selectedCategory"
                [class.font-semibold]="!selectedCategory"
                [class.tab-active-spring]="!selectedCategory"
                [class.shadow-[0_0_10px_rgba(184,104,48,0.3)]]="!selectedCategory"
                [class.bg-surface-elevated]="selectedCategory"
                [class.text-text-secondary]="selectedCategory"
                class="w-full text-left px-2.5 py-1.5 rounded-md text-xs hover:text-text-primary hover:bg-surface-elevated active:scale-98 transition-all flex items-center justify-between">
                <span>{{ 'filter_all' | translate }}</span>
                <span class="text-[10px] tabular-nums" [class.text-white/80]="!selectedCategory" [class.text-text-muted]="selectedCategory">{{ totalAllProducts() }}</span>
              </button>
              @for (cat of categories(); track cat.id) {
                <button 
                  type="button"
                  (click)="setCategory(cat.slug)"
                  [class.bg-accent]="selectedCategory === cat.slug"
                  [class.text-white]="selectedCategory === cat.slug"
                  [class.font-semibold]="selectedCategory === cat.slug"
                  [class.tab-active-spring]="selectedCategory === cat.slug"
                  [class.shadow-[0_0_10px_rgba(184,104,48,0.3)]]="selectedCategory === cat.slug"
                  [class.bg-surface-elevated]="selectedCategory !== cat.slug"
                  [class.text-text-secondary]="selectedCategory !== cat.slug"
                  class="w-full text-left px-2.5 py-1.5 rounded-md text-xs hover:text-text-primary hover:bg-surface-elevated active:scale-98 transition-all flex items-center justify-between">
                  <span class="truncate pr-1">{{ i18n.getCategoryName(cat.slug, cat.name) }}</span>
                  <span class="text-[10px] tabular-nums" [class.text-white/80]="selectedCategory === cat.slug" [class.text-text-muted]="selectedCategory !== cat.slug">{{ cat.product_count || 12 }}</span>
                </button>
              }
            </div>
          </div>

          <div class="pt-3 border-t border-border">
            <label class="flex items-center gap-2 cursor-pointer text-xs text-text-primary font-medium">
              <input 
                type="checkbox" 
                [(ngModel)]="onlyInStock" 
                (change)="applyFilters()" 
                class="rounded border-border bg-surface-sunken text-primary focus:ring-0">
              <span>{{ 'filter_instock_only' | translate }}</span>
            </label>
          </div>

          <div class="space-y-1.5 pt-3 border-t border-border">
            <label class="text-xs font-medium text-text-secondary">
              {{ i18n.isRo() ? 'Arhitectură CPU' : 'CPU Architecture' }}
            </label>
            <div class="grid grid-cols-2 gap-1 text-[11px]">
              @for (arch of ['ARM64', 'x86_64', 'RISC-V', 'ESP32', 'FPGA']; track arch) {
                <button 
                  type="button"
                  (click)="toggleArchitecture(arch)"
                  [class.bg-primary]="selectedArchitecture === arch"
                  [class.text-primary-contrast]="selectedArchitecture === arch"
                  [class.font-semibold]="selectedArchitecture === arch"
                  [class.bg-surface-sunken]="selectedArchitecture !== arch"
                  [class.text-text-secondary]="selectedArchitecture !== arch"
                  class="px-2 py-1 rounded border border-border hover:border-border-focus transition-colors text-center font-medium">
                  {{ arch }}
                </button>
              }
            </div>
          </div>

          <div class="space-y-1.5 pt-3 border-t border-border">
            <label class="text-xs font-medium text-text-secondary">
              {{ i18n.isRo() ? 'Interfață / Protocol' : 'Interface / Bus' }}
            </label>
            <div class="flex flex-wrap gap-1 text-[10px]">
              @for (iface of ['10GbE', '25GbE', 'PCIe', 'I2C', 'SPI', 'UART', 'Wi-Fi', 'Zigbee', 'LoRaWAN']; track iface) {
                <button 
                  type="button"
                  (click)="toggleInterface(iface)"
                  [class.bg-primary]="selectedInterface === iface"
                  [class.text-primary-contrast]="selectedInterface === iface"
                  [class.font-semibold]="selectedInterface === iface"
                  [class.bg-surface-sunken]="selectedInterface !== iface"
                  [class.text-text-secondary]="selectedInterface !== iface"
                  class="px-2 py-0.5 rounded border border-border hover:border-border-focus transition-colors font-medium">
                  {{ iface }}
                </button>
              }
            </div>
          </div>

          <div class="space-y-1.5 pt-3 border-t border-border">
            <label class="text-xs font-medium text-text-secondary flex items-center justify-between">
              <span>{{ i18n.isRo() ? 'Suport OS / Linux' : 'OS & Kernel Support' }}</span>
              <span class="text-[10px] text-emerald-400 font-medium">Kernel 6.x+</span>
            </label>
            <div class="flex flex-wrap gap-1 text-[10px]">
              @for (os of ['Linux Mainline', 'Proxmox', 'TrueNAS', 'Kali Linux', 'Home Assistant', 'OpenWrt', 'Asahi Linux', 'GrapheneOS', 'Coreboot']; track os) {
                <button 
                  type="button"
                  (click)="toggleOs(os)"
                  [class.bg-primary]="selectedOs === os"
                  [class.text-primary-contrast]="selectedOs === os"
                  [class.font-semibold]="selectedOs === os"
                  [class.bg-surface-sunken]="selectedOs !== os"
                  [class.text-text-secondary]="selectedOs !== os"
                  class="px-2 py-0.5 rounded border border-border hover:border-border-focus transition-colors font-medium">
                  {{ os }}
                </button>
              }
            </div>
          </div>

          <div class="space-y-1.5 pt-3 border-t border-border">
            <label class="text-xs font-medium text-text-secondary">
              {{ i18n.isRo() ? 'Nivel Experiență' : 'Skill Level' }}
            </label>
            <div class="grid grid-cols-2 gap-1 text-[11px]">
              @for (lvl of ['Beginner', 'Intermediate', 'Advanced', 'Expert']; track lvl) {
                <button 
                  type="button"
                  (click)="toggleSkill(lvl)"
                  [class.bg-primary]="selectedSkill === lvl"
                  [class.text-primary-contrast]="selectedSkill === lvl"
                  [class.font-semibold]="selectedSkill === lvl"
                  [class.bg-surface-sunken]="selectedSkill !== lvl"
                  [class.text-text-secondary]="selectedSkill !== lvl"
                  class="px-2 py-1 rounded border border-border hover:border-border-focus transition-colors text-center font-medium">
                  {{ lvl }}
                </button>
              }
            </div>
          </div>

          <div class="space-y-1.5 pt-3 border-t border-border">
            <div class="flex items-center justify-between text-xs font-semibold text-text-primary">
              <span>{{ i18n.isRo() ? 'Preț Maxim:' : 'Max Price:' }}</span>
              <span class="text-text-primary font-bold tabular-nums">{{ maxPrice }} {{ i18n.currencyLabel() }}</span>
            </div>
            <input 
              type="range"
              min="10"
              max="8000"
              step="50"
              [(ngModel)]="maxPrice"
              (change)="applyFilters()"
              class="w-full accent-primary cursor-pointer">
            <div class="flex justify-between text-[10px] text-text-muted tabular-nums">
              <span>10 {{ i18n.currencyLabel() }}</span>
              <span>8000 {{ i18n.currencyLabel() }}</span>
            </div>
          </div>

        </aside>

        <main class="lg:col-span-3 space-y-4">
          
          <div class="flex flex-wrap items-center justify-between gap-3 text-xs bg-surface-base p-3.5 rounded-xl border border-border shadow-sm">
            <div class="flex items-center gap-2">
              <span class="text-text-primary font-bold tabular-nums">{{ products().length }}</span>
              <span class="text-text-muted">{{ 'products_found' | translate }}</span>
              @if (loading()) {
                <span class="text-primary animate-pulse text-[11px] font-medium">
                  {{ i18n.isRo() ? '[Se încarcă catalogul...]' : '[Loading catalog...]' }}
                </span>
              }
            </div>

            <div class="flex flex-wrap items-center gap-1.5">
              @if (selectedCategory) {
                <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-surface-elevated text-text-secondary border border-border text-[11px]">
                  Cat: {{ selectedCategory }}
                  <button (click)="setCategory('')" class="hover:text-rose-400 font-bold ml-0.5">×</button>
                </span>
              }
              @if (selectedArchitecture) {
                <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-surface-elevated text-text-secondary border border-border text-[11px]">
                  CPU: {{ selectedArchitecture }}
                  <button (click)="toggleArchitecture(selectedArchitecture)" class="hover:text-rose-400 font-bold ml-0.5">×</button>
                </span>
              }
              @if (selectedInterface) {
                <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-surface-elevated text-text-secondary border border-border text-[11px]">
                  Bus: {{ selectedInterface }}
                  <button (click)="toggleInterface(selectedInterface)" class="hover:text-rose-400 font-bold ml-0.5">×</button>
                </span>
              }
              @if (selectedOs) {
                <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-surface-elevated text-text-secondary border border-border text-[11px]">
                  OS: {{ selectedOs }}
                  <button (click)="toggleOs(selectedOs)" class="hover:text-rose-400 font-bold ml-0.5">×</button>
                </span>
              }
              @if (selectedSkill) {
                <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-surface-elevated text-text-secondary border border-border text-[11px]">
                  Skill: {{ selectedSkill }}
                  <button (click)="toggleSkill(selectedSkill)" class="hover:text-rose-400 font-bold ml-0.5">×</button>
                </span>
              }
              @if (hasActiveFilters()) {
                <button 
                  type="button" 
                  (click)="resetFilters()" 
                  class="text-[11px] text-accent hover:text-accent-hover font-semibold underline ml-1">
                  {{ i18n.isRo() ? 'Resetează tot' : 'Reset all' }}
                </button>
              }
            </div>
          </div>

          @if (loading()) {
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              @for (n of [1,2,3,4,5,6]; track n) {
                <div class="bg-surface-base rounded-xl border border-border p-4 space-y-3 shadow-xs">
                  <div class="aspect-square rounded-lg skeleton-shimmer"></div>
                  <div class="h-3 rounded w-1/3 skeleton-shimmer"></div>
                  <div class="h-4 rounded w-3/4 skeleton-shimmer"></div>
                  <div class="h-3 rounded w-1/2 skeleton-shimmer"></div>
                  <div class="pt-3 border-t border-border flex justify-between">
                    <div class="h-5 rounded w-1/4 skeleton-shimmer"></div>
                    <div class="h-7 rounded w-1/3 skeleton-shimmer"></div>
                  </div>
                </div>
              }
            </div>
          } @else if (products().length === 0) {
            <div class="bg-surface-base rounded-xl border border-border-subtle p-12 text-center space-y-4 shadow-panel">
              <div class="w-16 h-16 rounded-xl bg-surface-elevated flex items-center justify-center text-text-muted mx-auto border border-border-subtle">
                <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
              </div>
              <h3 class="text-base font-bold text-text-primary">
                {{ 'no_products_found' | translate }}
              </h3>
              <p class="text-xs text-text-muted max-w-sm mx-auto leading-relaxed">
                {{ i18n.isRo() ? 'Nu am găsit echipamente conform filtrelor selectate. Încearcă să resetezi căutarea sau filtrele.' : 'No hardware found matching selected filters. Try clearing your search or filter selections.' }}
              </p>
              <button 
                type="button" 
                (click)="resetFilters()" 
                class="px-5 py-2.5 rounded-md bg-accent hover:bg-accent-hover text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-xs">
                {{ 'filter_reset' | translate }}
              </button>
            </div>
          } @else {
            
            <div class="grid-fade-transition" [class.is-updating]="isTransitioningGrid()">
              @if (viewMode() === 'grid') {
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lenis-reveal-stagger is-revealed">
                  @for (prod of paginatedProducts(); track prod.id) {
                    <div class="product-card-hover spotlight-card lenis-reveal is-revealed lenis-velocity-card animate-card-enter bg-surface-base hover:bg-surface-elevated/40 border border-border hover:border-accent/40 rounded-xl p-4 flex flex-col justify-between transition-all group shadow-sm relative"
                         [style.transition-delay]="(($index % 6) * 35) + 'ms'">
                      
                      <button 
                        type="button"
                        (click)="$event.stopPropagation(); wishlistService.toggleWishlist(prod)"
                        [class.is-active]="wishlistService.isWishlisted(prod.id)"
                        class="heart-button absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-surface-base/85 backdrop-blur-xs border border-border flex items-center justify-center text-text-muted hover:text-rose-500 transition-colors shadow-xs"
                        [title]="wishlistService.isWishlisted(prod.id) ? (i18n.isRo() ? 'Elimină din favorite' : 'Remove from wishlist') : (i18n.isRo() ? 'Adaugă la favorite' : 'Add to wishlist')"
                        aria-label="Wishlist">
                        <svg class="w-4 h-4" [attr.fill]="wishlistService.isWishlisted(prod.id) ? 'currentColor' : 'none'" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                        </svg>
                      </button>

                      <div>
                        <a [routerLink]="['/produs', prod.slug]" class="product-image-container block relative aspect-square p-3 mb-3 bg-surface-sunken rounded-lg flex items-center justify-center overflow-hidden">
                          <img 
                            [src]="prod.image_url" 
                            [alt]="prod.name"
                            data-lenis-parallax="0.035"
                            class="lenis-parallax-image max-w-full max-h-full object-contain">
                          
                          @if (prod.badge) {
                            <span class="absolute top-2 left-2 text-[10px] font-medium px-2 py-0.5 rounded-md bg-surface-elevated/90 text-text-primary">
                              {{ prod.badge }}
                            </span>
                          }
                        </a>

                        <div class="flex items-center justify-between gap-2 text-[11px] text-text-secondary mb-1 min-w-0 pr-8">
                          <span class="font-medium truncate">{{ prod.subcategory }}</span>
                          <button 
                            type="button"
                            (click)="$event.stopPropagation(); uiFeedback.copyToClipboard(prod.sku, 'Cod SKU')"
                            [title]="i18n.isRo() ? 'Copiază codul SKU' : 'Copy SKU code'"
                            class="cursor-copy-interactive text-[10px] text-text-muted font-medium truncate tabular-nums px-1.5 py-0.5 rounded bg-surface-sunken border border-border inline-flex items-center gap-1 active:scale-95 flex-shrink-0">
                            <span>{{ prod.sku }}</span>
                            <svg class="w-2.5 h-2.5 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <rect x="8" y="8" width="12" height="12" rx="2" stroke-width="2"/>
                              <path d="M16 8V6a2 2 0 00-2-2H6a2 2 0 00-2 2v8a2 2 0 002 2h2" stroke-width="2"/>
                            </svg>
                          </button>
                        </div>

                        <h3 class="font-heading text-xs sm:text-sm font-semibold text-text-primary group-hover:text-accent transition-colors line-clamp-2 leading-snug min-h-[36px]">
                          <a [routerLink]="['/produs', prod.slug]" class="interactive-text-link">
                            {{ prod.name }}
                          </a>
                        </h3>

                        <div class="mt-2 flex flex-wrap gap-1">
                          <span class="text-[10px] font-medium px-1.5 py-0.5 rounded bg-surface-elevated text-text-secondary border border-border">
                            {{ getSkillLevel(prod) }}
                          </span>
                          @if (prod.technical_specs.operating_voltage; as volt) {
                            <span class="text-[10px] font-medium px-1.5 py-0.5 rounded bg-surface-elevated text-text-secondary border border-border">
                              {{ volt.split('(')[0] }}
                            </span>
                          }
                          @if (prod.technical_specs.interfaces?.[0]; as iface0) {
                            <span class="text-[10px] font-medium px-1.5 py-0.5 rounded bg-surface-elevated text-text-secondary border border-border">
                              {{ iface0 }}
                            </span>
                          }
                        </div>

                        <div class="mt-2.5 text-[11px] font-medium flex items-center gap-1.5">
                          @if (prod.stock > 5) {
                            <span class="text-emerald-400 flex items-center gap-1">
                              <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                              {{ i18n.isRo() ? 'În stoc (' + prod.stock + ' buc)' : 'In stock (' + prod.stock + ' pcs)' }}
                            </span>
                          } @else if (prod.stock > 0) {
                            <span class="text-amber-400 flex items-center gap-1">
                              <span class="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                              {{ i18n.isRo() ? 'Stoc limitat (' + prod.stock + ' buc)' : 'Low stock (' + prod.stock + ' pcs)' }}
                            </span>
                          } @else {
                            <span class="text-rose-400 flex items-center gap-1">
                              <span class="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                              {{ 'badge_out_of_stock' | translate }}
                            </span>
                          }
                        </div>
                      </div>

                      <div class="pt-3 mt-3 border-t border-border flex items-center justify-between gap-2">
                        <div>
                          <div class="text-sm sm:text-base font-bold text-text-primary tabular-nums leading-none">
                            {{ prod.price_ron.toFixed(2) }} <span class="text-xs font-medium text-text-muted">{{ i18n.currencyLabel() }}</span>
                          </div>
                          @if (prod.old_price_ron) {
                            <div class="text-[10px] text-text-muted line-through tabular-nums mt-0.5">
                              {{ prod.old_price_ron.toFixed(2) }} {{ i18n.currencyLabel() }}
                            </div>
                          }
                        </div>

                        <div class="flex items-center gap-1.5">
                          <button 
                            type="button"
                            (click)="compService.toggleProduct(prod)"
                            [class.bg-amber-900/40]="compService.isInComparison(prod.id)"
                            [class.text-amber-300]="compService.isInComparison(prod.id)"
                            [class.border-amber-600]="compService.isInComparison(prod.id)"
                            class="p-1.5 rounded-lg bg-surface-elevated hover:bg-surface text-text-secondary hover:text-text-primary active:scale-95 transition-all border border-border"
                            [title]="i18n.isRo() ? 'Compară' : 'Compare'">
                            <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                              <path stroke-linecap="round" stroke-linejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"/>
                            </svg>
                          </button>

                          <button 
                            type="button"
                            (click)="addToCartWithFeedback(prod)"
                            [disabled]="prod.stock <= 0"
                            [class.btn-added-state]="isJustAdded(prod.id)"
                            class="px-3 py-1.5 rounded-lg bg-accent hover:bg-accent-hover text-white text-xs font-semibold active:scale-95 transition-all disabled:opacity-30 shadow-xs flex items-center gap-1.5 min-w-[76px] justify-center">
                            @if (isJustAdded(prod.id)) {
                              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/>
                              </svg>
                              <span>{{ i18n.isRo() ? 'Adăugat' : 'Added' }}</span>
                            } @else {
                              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
                              </svg>
                              <span>{{ i18n.isRo() ? '+ Coș' : '+ Cart' }}</span>
                            }
                          </button>
                        </div>
                      </div>

                    </div>
                  }
                </div>
              } @else {
                <div class="bg-surface-base rounded-xl border border-border overflow-x-auto shadow-sm">
                  <table class="w-full text-xs text-left border-collapse min-w-[750px]">
                    <thead>
                      <tr class="border-b border-border bg-surface-sunken text-text-muted text-xs font-medium">
                        <th class="p-3 w-16">{{ i18n.isRo() ? 'Foto' : 'Photo' }}</th>
                        <th class="p-3">{{ i18n.isRo() ? 'Echipament & SKU' : 'Hardware & SKU' }}</th>
                        <th class="p-3">{{ i18n.isRo() ? 'Specificații / Magistrale' : 'Specs / Buses' }}</th>
                        <th class="p-3 w-28">{{ i18n.isRo() ? 'Stoc' : 'Stock' }}</th>
                        <th class="p-3 w-28 text-right">{{ i18n.isRo() ? 'Preț' : 'Price' }}</th>
                        <th class="p-3 w-32 text-center">{{ i18n.isRo() ? 'Acțiune' : 'Action' }}</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-border">
                      @for (prod of paginatedProducts(); track prod.id) {
                        <tr class="hover:bg-surface-elevated/40 transition-colors">
                          <td class="p-3">
                            <a [routerLink]="['/produs', prod.slug]" class="product-image-container w-10 h-10 bg-surface-sunken rounded border border-border flex items-center justify-center p-1 block">
                              <img [src]="prod.image_url" [alt]="prod.name" class="max-w-full max-h-full object-contain">
                            </a>
                          </td>
                          <td class="p-3">
                            <div class="text-[10px] text-text-muted">{{ prod.sku }} • {{ prod.subcategory }}</div>
                            <a [routerLink]="['/produs', prod.slug]" class="font-heading font-semibold text-text-primary hover:text-primary transition-colors">
                              {{ prod.name }}
                            </a>
                          </td>
                          <td class="p-3">
                            <div class="flex flex-wrap gap-1 text-[10px]">
                              @if (prod.technical_specs.processor; as proc) {
                                <span class="px-1.5 py-0.5 rounded bg-surface-elevated text-text-secondary border border-border">
                                  {{ proc.split('(')[0] }}
                                </span>
                              }
                              @if (prod.technical_specs.operating_voltage; as volt) {
                                <span class="px-1.5 py-0.5 rounded bg-surface-elevated text-text-secondary border border-border">
                                  {{ volt.split('(')[0] }}
                                </span>
                              }
                            </div>
                          </td>
                          <td class="p-3">
                            @if (prod.stock > 5) {
                              <span class="text-emerald-400 font-medium text-xs">● {{ prod.stock }} {{ i18n.isRo() ? 'buc' : 'pcs' }}</span>
                            } @else if (prod.stock > 0) {
                              <span class="text-amber-400 font-medium text-xs">● {{ prod.stock }} {{ i18n.isRo() ? 'buc' : 'pcs' }}</span>
                            } @else {
                              <span class="text-rose-400 text-xs font-medium">{{ i18n.isRo() ? 'Stoc epuizat' : 'Out of stock' }}</span>
                            }
                          </td>
                          <td class="p-3 text-right">
                            <div class="font-semibold text-text-primary tabular-nums text-sm">
                              {{ prod.price_ron.toFixed(2) }} {{ i18n.currencyLabel() }}
                            </div>
                          </td>
                          <td class="p-3 text-center">
                            <div class="flex items-center justify-center gap-1.5">
                              <button 
                                type="button" 
                                (click)="$event.stopPropagation(); wishlistService.toggleWishlist(prod)"
                                [class.is-active]="wishlistService.isWishlisted(prod.id)"
                                class="heart-button w-7 h-7 rounded-md bg-surface-elevated border border-border flex items-center justify-center text-text-muted hover:text-rose-500 transition-colors"
                                [attr.aria-label]="i18n.isRo() ? 'Favorite' : 'Wishlist'">
                                <svg class="w-3.5 h-3.5" [attr.fill]="wishlistService.isWishlisted(prod.id) ? 'currentColor' : 'none'" stroke="currentColor" viewBox="0 0 24 24">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                                </svg>
                              </button>
                              <button 
                                type="button" 
                                (click)="addToCartWithFeedback(prod)"
                                [disabled]="prod.stock <= 0"
                                [class.btn-added-state]="isJustAdded(prod.id)"
                                class="px-3 py-1.5 rounded-lg bg-accent hover:bg-accent-hover text-white font-semibold text-xs transition-colors disabled:opacity-30 flex items-center justify-center gap-1 min-w-[76px]">
                                @if (isJustAdded(prod.id)) {
                                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/>
                                  </svg>
                                  <span>{{ i18n.isRo() ? 'Adăugat' : 'Added' }}</span>
                                } @else {
                                  <span>{{ i18n.isRo() ? '+ Coș' : '+ Cart' }}</span>
                                }
                              </button>
                            </div>
                          </td>
                        </tr>
                      }
                    </tbody>
                  </table>
                </div>
              }

              @if (totalPages() > 1) {
                <div class="mt-8 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-border pt-4">
                  <div class="text-xs text-text-secondary">
                    {{ i18n.isRo() ? 'Pagina ' + currentPage() + ' din ' + totalPages() + ' (' + products().length + ' produse)' : 'Page ' + currentPage() + ' of ' + totalPages() + ' (' + products().length + ' products)' }}
                  </div>
                  <div class="flex items-center gap-1.5">
                    <button 
                      type="button" 
                      (click)="setPage(currentPage() - 1)"
                      [disabled]="currentPage() === 1"
                      class="pagination-btn px-2.5 py-1.5 rounded-md border border-border bg-surface-base text-text-primary text-xs disabled:opacity-40 disabled:cursor-not-allowed hover:bg-surface-elevated transition-colors"
                      [attr.aria-label]="i18n.isRo() ? 'Pagina precedentă' : 'Previous page'">
                      &larr;
                    </button>
                    @for (p of pagesArray(); track p) {
                      <button 
                        type="button" 
                        (click)="setPage(p)"
                        [class.is-active]="currentPage() === p"
                        class="pagination-btn px-3 py-1.5 rounded-md border border-border bg-surface-base text-text-primary text-xs font-semibold hover:bg-surface-elevated transition-all">
                        {{ p }}
                      </button>
                    }
                    <button 
                      type="button" 
                      (click)="setPage(currentPage() + 1)"
                      [disabled]="currentPage() === totalPages()"
                      class="pagination-btn px-2.5 py-1.5 rounded-md border border-border bg-surface-base text-text-primary text-xs disabled:opacity-40 disabled:cursor-not-allowed hover:bg-surface-elevated transition-colors"
                      [attr.aria-label]="i18n.isRo() ? 'Pagina următoare' : 'Next page'">
                      &rarr;
                    </button>
                  </div>
                </div>
              }
            </div>

          }

        </main>
      </div>

      @if (mobileFiltersOpen()) {
        <div class="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 drawer-backdrop-fade"
             (click)="mobileFiltersOpen.set(false)">
          <div data-lenis-prevent
               class="filter-slide-panel w-full sm:max-w-lg bg-surface-base border border-border rounded-t-2xl sm:rounded-xl max-h-[85vh] overflow-y-auto p-5 space-y-4 shadow-xl"
               (click)="$event.stopPropagation()">
            
            <div class="flex items-center justify-between pb-3 border-b border-border">
              <h3 class="font-heading font-semibold text-text-primary text-sm">{{ i18n.isRo() ? 'Filtre Tehnice Catalog' : 'Catalog Technical Filters' }}</h3>
              <button (click)="mobileFiltersOpen.set(false)" class="text-text-muted hover:text-text-primary p-1" [attr.aria-label]="i18n.isRo() ? 'Închide filtre' : 'Close filters'">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
              </button>
            </div>

            <div class="space-y-1">
              <div class="flex justify-between text-xs text-text-secondary">
                <span>{{ i18n.isRo() ? 'Preț Maxim:' : 'Max Price:' }}</span>
                <span class="font-bold text-text-primary tabular-nums">{{ maxPrice }} {{ i18n.currencyLabel() }}</span>
              </div>
              <input type="range" min="10" max="8000" step="50" [(ngModel)]="maxPrice" (change)="applyFilters()" class="w-full accent-primary">
            </div>

            <label class="flex items-center gap-2 text-xs text-text-primary">
              <input type="checkbox" [(ngModel)]="onlyInStock" (change)="applyFilters()" class="rounded bg-surface-sunken border-border text-primary">
              <span>{{ 'filter_instock_only' | translate }}</span>
            </label>

            <div class="space-y-1">
              <div class="text-[10px] text-text-muted uppercase font-medium">{{ i18n.isRo() ? 'Arhitectură CPU' : 'CPU Architecture' }}</div>
              <div class="grid grid-cols-2 gap-1 text-xs">
                @for (arch of ['ARM64', 'x86_64', 'RISC-V', 'ESP32', 'FPGA']; track arch) {
                  <button type="button" (click)="toggleArchitecture(arch)"
                          [class.bg-primary]="selectedArchitecture === arch"
                          [class.text-primary-contrast]="selectedArchitecture === arch"
                          class="p-1.5 rounded bg-surface-sunken border border-border text-text-secondary font-medium">
                    {{ arch }}
                  </button>
                }
              </div>
            </div>

            <div class="pt-3 border-t border-border flex gap-2">
              <button (click)="resetFilters(); mobileFiltersOpen.set(false)" class="w-1/2 py-2 rounded bg-surface-elevated text-xs font-semibold text-text-secondary hover:text-text-primary transition-colors">
                {{ i18n.isRo() ? 'Resetează' : 'Reset' }}
              </button>
              <button (click)="mobileFiltersOpen.set(false)" class="w-1/2 py-2 rounded bg-primary hover:bg-primary-hover text-primary-contrast text-xs font-semibold transition-colors">
                {{ i18n.isRo() ? 'Aplică Filtre' : 'Apply Filters' }}
              </button>
            </div>

          </div>
        </div>
      }

    </div>
  `
})
export class CatalogComponent implements OnInit {
  productService = inject(ProductService);
  cartService = inject(CartService);
  compService = inject(ComparisonService);
  i18n = inject(TranslationService);
  titleService = inject(Title);
  route = inject(ActivatedRoute);
  uiFeedback = inject(UiFeedbackService);
  lenisService = inject(LenisService);
  wishlistService = inject(WishlistService);

  categories = signal<Category[]>([]);
  products = signal<Product[]>([]);
  loading = signal<boolean>(false);
  viewMode = signal<'grid' | 'list'>('grid');
  mobileFiltersOpen = signal<boolean>(false);

  // Micro-interactions state
  justAddedProductIds = signal<number[]>([]);
  isTransitioningGrid = signal<boolean>(false);

  // Pagination state
  currentPage = signal<number>(1);
  pageSize = 12;

  totalPages = computed(() => Math.ceil(this.products().length / this.pageSize) || 1);

  paginatedProducts = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize;
    return this.products().slice(start, start + this.pageSize);
  });

  pagesArray = computed(() => {
    const total = this.totalPages();
    const cur = this.currentPage();
    const delta = 2;
    const range: number[] = [];
    for (let i = Math.max(1, cur - delta); i <= Math.min(total, cur + delta); i++) {
      range.push(i);
    }
    return range;
  });

  isJustAdded(id: number): boolean {
    return this.justAddedProductIds().includes(id);
  }

  addToCartWithFeedback(prod: Product) {
    this.cartService.addToCart(prod);
    this.justAddedProductIds.update(ids => [...ids, prod.id]);
    setTimeout(() => {
      this.justAddedProductIds.update(ids => ids.filter(id => id !== prod.id));
    }, 1800);
    this.uiFeedback.showToast(this.i18n.isRo() ? `${prod.name} adăugat în coș` : `${prod.name} added to cart`, 'success');
  }

  setPage(page: number) {
    if (page < 1 || page > this.totalPages() || page === this.currentPage()) return;
    this.isTransitioningGrid.set(true);
    setTimeout(() => {
      this.currentPage.set(page);
      this.isTransitioningGrid.set(false);
      this.lenisService.scrollTo('main', { offset: -80 });
      setTimeout(() => {
        this.lenisService.observeRevealElements();
      }, 50);
    }, 150);
  }

  onSortChange() {
    this.isTransitioningGrid.set(true);
    setTimeout(() => {
      this.applyFilters();
      this.isTransitioningGrid.set(false);
    }, 150);
  }

  searchQuery = '';
  selectedCategory = '';
  selectedVoltage = '';
  selectedInterface = '';
  selectedArchitecture = '';
  selectedSkill = '';
  selectedOs = '';
  onlyInStock = false;
  maxPrice = 8000;
  selectedSort: 'featured' | 'price_asc' | 'price_desc' | 'rating' | 'newest' = 'featured';

  currentCategoryObj = computed(() => {
    return this.categories().find(c => c.slug === this.selectedCategory);
  });

  totalAllProducts = computed(() => {
    const total = this.categories().reduce((sum, c) => sum + (Number(c.product_count) || 0), 0);
    return total > 0 ? total : 180;
  });

  activeFilterCount = computed(() => {
    let count = 0;
    if (this.searchQuery) count++;
    if (this.selectedCategory) count++;
    if (this.selectedArchitecture) count++;
    if (this.selectedInterface) count++;
    if (this.selectedOs) count++;
    if (this.selectedSkill) count++;
    if (this.onlyInStock) count++;
    if (this.maxPrice < 8000) count++;
    return count;
  });

  getSkillLevel(prod: Product): string {
    const s = prod.slug.toLowerCase();
    if (s.includes('flipper') || s.includes('pineapple') || s.includes('rb5009') || s.includes('rock5')) return 'Intermediate';
    if (s.includes('glasgow') || s.includes('fpga') || s.includes('proxmark') || s.includes('r640') || s.includes('starfive')) return 'Expert';
    if (s.includes('crs305') || s.includes('hba') || s.includes('mcx4')) return 'Advanced';
    return 'Beginner';
  }

  updateCatalogTitle() {
    const isRo = this.i18n.isRo();
    const cat = this.currentCategoryObj();
    if (cat) {
      this.titleService.setTitle(`${cat.name} | Catalog Vexera`);
    } else if (this.searchQuery) {
      this.titleService.setTitle(`Căutare: ${this.searchQuery} | Vexera`);
    } else {
      this.titleService.setTitle(isRo ? 'Catalog Echipamente Hardware & Homelab | Vexera' : 'Hardware & Homelab Catalog | Vexera');
    }
  }

  ngOnInit() {
    this.productService.getCategories().subscribe(cats => {
      this.categories.set(cats);
      this.updateCatalogTitle();
    });

    this.route.params.subscribe(params => {
      if (params['categorySlug']) {
        this.selectedCategory = params['categorySlug'];
        this.applyFilters();
      }
    });

    this.route.queryParams.subscribe(params => {
      if (params['category']) {
        this.selectedCategory = params['category'];
      }
      if (params['search']) {
        this.searchQuery = params['search'];
      }
      this.applyFilters();
    });
  }

  applyFilters() {
    this.loading.set(true);
    this.currentPage.set(1);

    const filter: ProductFilterParams = {
      search: this.searchQuery.trim() || undefined,
      category: this.selectedCategory || undefined,
      voltage: this.selectedVoltage || undefined,
      interface: this.selectedInterface || undefined,
      inStock: this.onlyInStock ? true : undefined,
      maxPrice: this.maxPrice < 8000 ? this.maxPrice : undefined,
      sortBy: this.selectedSort,
      limit: 120
    };

    this.productService.getProducts(filter).subscribe({
      next: (prods) => {
        let list = prods;
        if (this.selectedArchitecture) {
          const arch = this.selectedArchitecture.toLowerCase();
          list = list.filter(p => {
            const specs = JSON.stringify(p.technical_specs || {}).toLowerCase();
            const name = p.name.toLowerCase();
            const tags = JSON.stringify(p.tags || []).toLowerCase();
            return specs.includes(arch) || name.includes(arch) || tags.includes(arch);
          });
        }
        if (this.selectedSkill) {
          list = list.filter(p => this.getSkillLevel(p) === this.selectedSkill);
        }
        if (this.selectedOs) {
          const osTarget = this.selectedOs.toLowerCase();
          list = list.filter(p => {
            const specs = JSON.stringify(p.technical_specs || {}).toLowerCase();
            const tags = JSON.stringify(p.tags || []).toLowerCase();
            const name = p.name.toLowerCase();
            const desc = (p.full_desc || '').toLowerCase();
            return specs.includes(osTarget) || tags.includes(osTarget) || name.includes(osTarget) || desc.includes(osTarget);
          });
        }
        this.products.set(list);
        this.loading.set(false);
        this.updateCatalogTitle();
        setTimeout(() => {
          this.lenisService.observeRevealElements();
          this.lenisService.resize();
        }, 60);
      },
      error: () => this.loading.set(false)
    });
  }

  setCategory(cat: string) {
    this.selectedCategory = cat;
    this.applyFilters();
  }

  toggleVoltage(volt: string) {
    this.selectedVoltage = this.selectedVoltage === volt ? '' : volt;
    this.applyFilters();
  }

  toggleInterface(iface: string) {
    this.selectedInterface = this.selectedInterface === iface ? '' : iface;
    this.applyFilters();
  }

  toggleArchitecture(arch: string) {
    this.selectedArchitecture = this.selectedArchitecture === arch ? '' : arch;
    this.applyFilters();
  }

  toggleSkill(lvl: string) {
    this.selectedSkill = this.selectedSkill === lvl ? '' : lvl;
    this.applyFilters();
  }

  toggleOs(os: string) {
    this.selectedOs = this.selectedOs === os ? '' : os;
    this.applyFilters();
  }

  hasActiveFilters(): boolean {
    return this.activeFilterCount() > 0;
  }

  resetFilters() {
    this.searchQuery = '';
    this.selectedCategory = '';
    this.selectedVoltage = '';
    this.selectedInterface = '';
    this.selectedArchitecture = '';
    this.selectedSkill = '';
    this.selectedOs = '';
    this.onlyInStock = false;
    this.maxPrice = 8000;
    this.selectedSort = 'featured';
    this.applyFilters();
  }
}
