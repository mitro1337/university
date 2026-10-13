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
        class="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-start justify-center pt-20 px-4"
        (click)="paletteService.close()">
        
        <div 
          class="w-full max-w-2xl bg-surface border border-border rounded-2xl shadow-3d-card overflow-hidden flex flex-col relative"
          data-lenis-prevent
          (click)="$event.stopPropagation()">
          
          <div class="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>

          <div class="p-4 border-b border-border flex items-center gap-3 bg-surface-elevated">
            <svg class="w-5 h-5 text-cyan-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input 
              #searchInput
              type="text"
              [(ngModel)]="searchQuery"
              (input)="onSearchChange()"
              (keydown)="onKeyDown($event)"
              [placeholder]="i18n.isRo() ? 'Caută componentă, cod SKU (ex: RPI5-8GB, X520-DA2, BME280) sau tag...' : 'Search hardware, SKU code (e.g. RPI5-8GB, X520-DA2, BME280) or tag...'"
              class="flex-1 bg-transparent border-0 text-text-primary placeholder-text-muted focus:outline-none focus:ring-0 text-sm font-sans"
              autofocus>
            <span class="kbd-badge">ESC</span>
          </div>

          <div class="px-4 py-2.5 border-b border-border bg-surface flex items-center gap-2 overflow-x-auto text-[11px]">
            <span class="text-text-muted font-bold font-mono">{{ i18n.isRo() ? 'Acțiuni:' : 'Quick:' }}</span>
            <button 
              type="button" 
              (click)="navigateTo('/build-your-lab')"
              class="btn-3d-secondary px-2.5 py-1 text-[11px] font-bold">
              Lab Builder
            </button>
            <button 
              type="button" 
              (click)="navigateTo('/build-your-lab', { tab: 'rack' })"
              class="btn-3d-secondary px-2.5 py-1 text-[11px] font-bold">
              Rack Builder
            </button>
            <button 
              type="button" 
              (click)="navigateTo('/compara')"
              class="btn-3d-secondary px-2.5 py-1 text-[11px] font-bold">
              {{ i18n.isRo() ? 'Comparator' : 'Compare' }}
            </button>
            <button 
              type="button" 
              (click)="openLabProfile()"
              class="btn-3d-secondary px-2.5 py-1 text-[11px] font-bold">
              {{ i18n.isRo() ? 'Profil laborator' : 'Lab Profile' }}
            </button>
            <button 
              type="button" 
              (click)="openA11y()"
              class="btn-3d-secondary px-2.5 py-1 text-[11px] font-bold">
              {{ i18n.isRo() ? 'Accesibilitate' : 'Accessibility' }}
            </button>
          </div>

          <div class="max-h-96 overflow-y-auto p-2 divide-y divide-border/60">
            @if (loading()) {
              <div class="p-6 text-center text-xs text-cyan-400 font-mono animate-pulse">
                {{ i18n.isRo() ? 'Se scanează catalogul tehnic...' : 'Scanning technical catalog...' }}
              </div>
            } @else if (results().length === 0) {
              <div class="p-8 text-center space-y-2">
                <p class="text-xs text-text-secondary font-medium font-sans">
                  {{ i18n.isRo() ? 'Nicio componentă găsită pentru "' + searchQuery + '".' : 'No components found for "' + searchQuery + '".' }}
                </p>
                <p class="text-[11px] text-text-muted font-sans">
                  {{ i18n.isRo() ? 'Încearcă termeni generici: SBC, ARM, Rețea, Senzor, 12V, I2C sau cod SKU.' : 'Try generic terms: SBC, ARM, Network, Sensor, 12V, I2C or SKU code.' }}
                </p>
              </div>
            } @else {
              @for (prod of results(); track prod.id; let idx = $index) {
                <div 
                  (click)="selectProduct(prod)"
                  [class.bg-surface-elevated]="idx === selectedIndex"
                  [class.border-cyan-500/40]="idx === selectedIndex"
                  class="p-2.5 rounded-xl hover:bg-surface-elevated cursor-pointer flex items-center justify-between gap-3 transition-colors group border border-transparent">
                  <div class="flex items-center gap-3 min-w-0">
                    <div class="w-10 h-10 rounded-lg bg-surface-sunken border border-border flex items-center justify-center p-0.5 flex-shrink-0 shadow-3d-sunken">
                      <img 
                        [src]="prod.image_url" 
                        [alt]="prod.name" 
                        class="w-full h-full object-contain">
                    </div>
                    <div class="min-w-0">
                      <div class="flex items-center gap-2">
                        <span class="text-xs font-bold text-text-primary group-hover:text-cyan-400 transition-colors truncate font-heading">
                          {{ prod.name }}
                        </span>
                        <span class="text-[10px] tabular-nums px-1.5 py-0.5 rounded bg-surface-sunken border border-border text-cyan-400 font-mono font-medium">
                          {{ prod.sku }}
                        </span>
                      </div>
                      <div class="text-[11px] text-text-muted truncate mt-0.5 font-sans">
                        {{ prod.short_desc }}
                      </div>
                    </div>
                  </div>

                  <div class="text-right flex-shrink-0">
                    <div class="text-xs font-black text-cyan-400 tabular-nums font-mono">
                      {{ prod.price_ron.toFixed(2) }} lei
                    </div>
                    <div class="text-[10px] flex items-center justify-end gap-1 font-mono font-semibold" [class.text-emerald-400]="prod.stock > 5" [class.text-amber-400]="prod.stock <= 5 && prod.stock > 0" [class.text-rose-400]="prod.stock <= 0">
                      @if (prod.stock > 5) {
                        <span class="led-indicator-3d" style="--led-color: #00ff9d; --led-glow: rgba(0,255,157,0.7);"></span>
                        <span>În stoc</span>
                      } @else if (prod.stock > 0) {
                        <span class="led-indicator-3d" style="--led-color: #ffb020; --led-glow: rgba(255,176,32,0.7);"></span>
                        <span>{{ prod.stock }} buc</span>
                      } @else {
                        <span class="led-indicator-3d" style="--led-color: #ff3366; --led-glow: rgba(255,51,102,0.7);"></span>
                        <span>Epuizat</span>
                      }
                    </div>
                  </div>
                </div>
              }
            }
          </div>

          <div class="p-3 border-t border-border bg-surface-elevated flex items-center justify-between text-[11px] text-text-muted font-mono">
            <div class="flex items-center gap-3">
              <span class="flex items-center gap-1"><span class="kbd-badge">↑↓</span> Navigare</span>
              <span class="flex items-center gap-1"><span class="kbd-badge">↵</span> Deschide</span>
              <span class="flex items-center gap-1"><span class="kbd-badge">ESC</span> Închide</span>
            </div>
            <div class="text-cyan-400 font-bold tracking-wider text-[10px] flex items-center gap-1.5">
              <span class="led-indicator-3d" style="--led-color: #00d2ff; --led-glow: rgba(0,210,255,0.7);"></span>
              <span>VEXERA 3D PALETTE</span>
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
