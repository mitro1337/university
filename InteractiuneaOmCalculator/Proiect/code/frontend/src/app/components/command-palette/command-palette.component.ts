import { Component, inject, signal, effect, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommandPaletteService } from '../../services/command-palette.service';
import { ProductService } from '../../services/product.service';
import { AccessibilityService } from '../../services/accessibility.service';
import { LabProfileService } from '../../services/lab-profile.service';
import { TranslationService } from '../../services/translation.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-command-palette',
  standalone: true,
  imports: [FormsModule],
  template: `
    @if (paletteService.isOpen()) {
      <div 
        class="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-start justify-center pt-20 px-4"
        (click)="paletteService.close()">
        
        <div 
          class="w-full max-w-2xl bg-surface border border-border rounded-2xl shadow-overlay overflow-hidden flex flex-col"
          data-lenis-prevent
          (click)="$event.stopPropagation()">
          
          <div class="p-4 border-b border-border flex items-center gap-3 bg-surface-elevated">
            <svg class="w-5 h-5 text-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input 
              #searchInput
              type="text"
              [(ngModel)]="searchQuery"
              (input)="onSearchChange()"
              (keydown)="onKeyDown($event)"
              [placeholder]="i18n.isRo() ? 'Caută componentă, cod SKU (ex: RPI5-8GB, X520-DA2, BME280) sau tag...' : 'Search hardware, SKU code (e.g. RPI5-8GB, X520-DA2, BME280) or tag...'"
              class="flex-1 bg-transparent border-0 text-text-primary placeholder-text-muted focus:outline-none focus:ring-0 text-sm"
              autofocus>
            <kbd class="px-2 py-0.5 rounded text-[10px] bg-surface-sunken border border-border text-text-muted shadow-xs font-medium">
              ESC
            </kbd>
          </div>

          <div class="px-4 py-2 border-b border-border bg-surface flex items-center gap-2 overflow-x-auto text-[11px]">
            <span class="text-text-muted font-medium">{{ i18n.isRo() ? 'Acțiuni rapide:' : 'Quick actions:' }}</span>
            <button 
              type="button" 
              (click)="navigateTo('/build-your-lab')"
              class="px-2.5 py-1 rounded-md bg-surface-sunken hover:bg-surface-elevated text-text-secondary hover:text-text-primary font-semibold border border-border transition-colors">
              Lab Builder
            </button>
            <button 
              type="button" 
              (click)="navigateTo('/build-your-lab', { tab: 'rack' })"
              class="px-2.5 py-1 rounded-md bg-surface-sunken hover:bg-surface-elevated text-text-secondary hover:text-text-primary font-semibold border border-border transition-colors">
              Rack Builder
            </button>
            <button 
              type="button" 
              (click)="navigateTo('/compara')"
              class="px-2.5 py-1 rounded-md bg-surface-sunken hover:bg-surface-elevated text-text-secondary hover:text-text-primary font-semibold border border-border transition-colors">
              {{ i18n.isRo() ? 'Comparator' : 'Compare' }}
            </button>
            <button 
              type="button" 
              (click)="openLabProfile()"
              class="px-2.5 py-1 rounded-md bg-surface-sunken hover:bg-surface-elevated text-text-secondary hover:text-text-primary font-semibold border border-border transition-colors">
              {{ i18n.isRo() ? 'Profil laborator' : 'Lab Profile' }}
            </button>
            <button 
              type="button" 
              (click)="openA11y()"
              class="px-2.5 py-1 rounded-md bg-surface-sunken hover:bg-surface-elevated text-text-secondary hover:text-text-primary font-semibold border border-border transition-colors">
              {{ i18n.isRo() ? 'Accesibilitate' : 'Accessibility' }}
            </button>
          </div>

          <div class="max-h-96 overflow-y-auto p-2 divide-y divide-border">
            @if (loading()) {
              <div class="p-6 text-center text-xs text-text-muted">
                {{ i18n.isRo() ? 'Se caută în catalogul tehnic...' : 'Searching technical catalog...' }}
              </div>
            } @else if (results().length === 0) {
              <div class="p-8 text-center space-y-2">
                <p class="text-xs text-text-secondary font-medium">
                  {{ i18n.isRo() ? 'Nicio componentă găsită pentru "' + searchQuery + '".' : 'No components found for "' + searchQuery + '".' }}
                </p>
                <p class="text-[11px] text-text-muted">
                  {{ i18n.isRo() ? 'Încearcă termeni generici: SBC, ARM, Rețea, Senzor, 12V, I2C sau cod SKU.' : 'Try generic terms: SBC, ARM, Network, Sensor, 12V, I2C or SKU code.' }}
                </p>
              </div>
            } @else {
              @for (prod of results(); track prod.id; let idx = $index) {
                <div 
                  (click)="selectProduct(prod)"
                  [class.bg-surface-elevated]="idx === selectedIndex"
                  class="p-2.5 rounded-xl hover:bg-surface-elevated cursor-pointer flex items-center justify-between gap-3 transition-colors group">
                  <div class="flex items-center gap-3 min-w-0">
                    <div class="w-10 h-10 rounded-lg bg-surface-sunken border border-border flex items-center justify-center p-0.5 flex-shrink-0">
                      <img 
                        [src]="prod.image_url" 
                        [alt]="i18n.getProductName(prod)" 
                        class="w-full h-full object-contain">
                    </div>
                    <div class="min-w-0">
                      <div class="flex items-center gap-2">
                        <span class="text-xs font-bold text-text-primary group-hover:text-accent transition-colors truncate">
                          {{ i18n.getProductName(prod) }}
                        </span>
                        <span class="text-[10px] tabular-nums px-1.5 py-0.5 rounded bg-surface-sunken border border-border text-text-muted font-medium">
                          {{ prod.sku }}
                        </span>
                      </div>
                      <div class="text-[11px] text-text-muted truncate mt-0.5">
                        {{ i18n.getProductShortDesc(prod) }}
                      </div>
                    </div>
                  </div>

                  <div class="text-right flex-shrink-0">
                    <div class="text-xs font-bold text-accent tabular-nums">
                      {{ prod.price_ron.toFixed(2) }} {{ i18n.currencyLabel() }}
                    </div>
                    <div class="text-[10px]" [class.text-accent]="prod.stock > 5" [class.text-amber-400]="prod.stock <= 5">
                      {{ prod.stock > 0 ? (prod.stock <= 5 ? (prod.stock + (i18n.isRo() ? ' buc (critic)' : ' pcs (low)')) : (i18n.isRo() ? 'În stoc' : 'In stock')) : (i18n.isRo() ? 'Epuizat' : 'Out of stock') }}
                    </div>
                  </div>
                </div>
              }
            }
          </div>

          <div class="p-3 border-t border-border bg-surface-elevated flex items-center justify-between text-[11px] text-text-muted">
            <div class="flex items-center gap-3">
              <span>{{ i18n.isRo() ? '↑↓ Navigare' : '↑↓ Navigate' }}</span>
              <span>{{ i18n.isRo() ? '↵ Deschide' : '↵ Open' }}</span>
              <span>{{ i18n.isRo() ? 'ESC Închide' : 'ESC Close' }}</span>
            </div>
            <div class="text-accent font-bold tracking-wider text-[10px]">
              VEXERA PALETTE Cmd+K / Ctrl+K
            </div>
          </div>

        </div>

      </div>
    }
  `
})
export class CommandPaletteComponent {
  paletteService = inject(CommandPaletteService);
  productService = inject(ProductService);
  a11yService = inject(AccessibilityService);
  labProfileService = inject(LabProfileService);
  i18n = inject(TranslationService);
  router = inject(Router);

  @ViewChild('searchInput') searchInputRef?: ElementRef<HTMLInputElement>;

  searchQuery = '';
  results = signal<Product[]>([]);
  loading = signal<boolean>(false);
  selectedIndex = 0;

  constructor() {
    effect(() => {
      if (this.paletteService.isOpen()) {
        this.selectedIndex = 0;
        this.searchQuery = '';
        this.loadInitialResults();
        setTimeout(() => {
          this.searchInputRef?.nativeElement.focus();
        }, 50);
      }
    });
  }

  loadInitialResults() {
    this.loading.set(true);
    this.productService.getProducts({ limit: 8, sortBy: 'featured' }).subscribe({
      next: (prods) => {
        this.results.set(prods);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }

  onSearchChange() {
    this.selectedIndex = 0;
    if (!this.searchQuery.trim()) {
      this.loadInitialResults();
      return;
    }

    this.loading.set(true);
    this.productService.getProducts({ search: this.searchQuery, limit: 8 }).subscribe({
      next: (prods) => {
        this.results.set(prods);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }

  setQuickSearch(term: string) {
    this.searchQuery = term;
    this.onSearchChange();
  }

  onKeyDown(event: KeyboardEvent) {
    const list = this.results();
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.selectedIndex = (this.selectedIndex + 1) % (list.length || 1);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.selectedIndex = (this.selectedIndex - 1 + list.length) % (list.length || 1);
    } else if (event.key === 'Enter') {
      event.preventDefault();
      if (list[this.selectedIndex]) {
        this.selectProduct(list[this.selectedIndex]);
      }
    }
  }

  selectProduct(prod: Product) {
    this.paletteService.close();
    this.router.navigate(['/produs', prod.slug]);
  }

  navigateTo(path: string, queryParams?: any) {
    this.paletteService.close();
    this.router.navigate([path], { queryParams });
  }

  openLabProfile() {
    this.paletteService.close();
    this.labProfileService.isDrawerOpen.set(true);
  }

  openA11y() {
    this.paletteService.close();
    this.a11yService.openModal();
  }
}
