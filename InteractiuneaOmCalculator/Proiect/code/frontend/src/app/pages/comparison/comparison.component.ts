import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ComparisonService } from '../../services/comparison.service';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';
import { TranslationService } from '../../services/translation.service';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { Product } from '../../models/product.model';
import { UiBadgeComponent } from '../../components/ui/ui-badge.component';
import { UiEmptyStateComponent } from '../../components/ui/ui-empty-state.component';

@Component({
  selector: 'app-comparison',
  standalone: true,
  imports: [RouterLink, TranslatePipe, UiBadgeComponent, UiEmptyStateComponent],
  template: `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-border">
        <div>
          <div class="flex items-center gap-2 mb-1">
            <h1 class="font-display text-2xl sm:text-3xl lg:text-4xl text-text-primary tracking-wide uppercase">
              {{ i18n.isRo() ? 'Comparator Tehnic Hardware' : 'Technical Hardware Comparison' }}
            </h1>
            <app-ui-badge variant="accent">{{ compService.count() }}/4</app-ui-badge>
          </div>
          <p class="text-xs text-text-muted">
            {{ i18n.isRo() 
              ? 'Analiză comparativă la nivel de magistrală, arhitectură, consum și suport de kernel Linux.' 
              : 'Side-by-side engineering matrix across CPU architecture, bus, thermals, and Linux support.' }}
          </p>
        </div>

        @if (compService.count() > 0) {
          <div class="flex flex-wrap items-center gap-3">
            <button 
              type="button" 
              (click)="highlightDifferences.set(!highlightDifferences())"
              class="px-3 py-1.5 rounded-lg border text-xs transition-colors flex items-center gap-1.5 font-medium"
              [class.bg-primary/10]="highlightDifferences()"
              [class.border-primary]="highlightDifferences()"
              [class.text-primary]="highlightDifferences()"
              [class.bg-surface]="!highlightDifferences()"
              [class.border-border]="!highlightDifferences()"
              [class.text-text-muted]="!highlightDifferences()">
              <svg class="w-3.5 h-3.5 text-primary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
              <span>{{ i18n.isRo() ? 'Evidențiază Diferențele' : 'Highlight Differences' }}</span>
            </button>

            <button 
              type="button" 
              (click)="compService.clear()"
              class="px-3 py-1.5 rounded-lg text-xs font-medium text-rose-400 hover:bg-rose-950/30 border border-rose-800/60 transition-colors">
              {{ i18n.isRo() ? 'Golește' : 'Clear All' }}
            </button>

            <a 
              routerLink="/produse" 
              class="px-3.5 py-1.5 rounded-lg bg-primary hover:bg-primary-hover text-primary-contrast text-xs font-semibold transition-colors">
              {{ i18n.isRo() ? '+ Adaugă din Catalog' : '+ Add from Catalog' }}
            </a>
          </div>
        }
      </div>

      @if (compService.count() === 0) {
        <app-ui-empty-state
          [title]="i18n.isRo() ? 'Niciun echipament selectat pentru comparație' : 'No hardware selected for comparison'"
          [description]="i18n.isRo() ? 'Adaugă componente din catalog sau folosește preset-urile de laborator de mai jos pentru a compara specificațiile tehnice.' : 'Add components from the catalog or load one of our verified lab benchmarks below to see side-by-side metrics.'">
          
          <div class="space-y-4">
            <a 
              routerLink="/produse" 
              class="inline-block px-5 py-2 rounded-lg bg-primary hover:bg-primary-hover text-primary-contrast text-xs font-semibold transition-colors">
              {{ i18n.isRo() ? 'Explorează Catalogul' : 'Browse Catalog' }}
            </a>

            <div class="flex flex-wrap items-center justify-center gap-2 pt-4 border-t border-border">
              <button 
                type="button" 
                (click)="loadPopularComparison('sbc')"
                class="px-3 py-1.5 rounded bg-surface border border-border hover:bg-surface-elevated text-text-primary text-xs font-medium transition-colors">
                RPi 5 vs Radxa Rock 5B (RK3588)
              </button>
              <button 
                type="button" 
                (click)="loadPopularComparison('security')"
                class="px-3 py-1.5 rounded bg-surface border border-border hover:bg-surface-elevated text-text-primary text-xs font-medium transition-colors">
                Flipper Zero vs Proxmark3 RDV4
              </button>
            </div>
          </div>
        </app-ui-empty-state>
      } @else {
        <div class="overflow-x-auto bg-surface rounded-xl border border-border shadow-xs transition-colors">
          <table class="w-full text-xs text-left border-collapse min-w-[720px]">
            
            <thead>
              <tr class="border-b border-border bg-surface-elevated">
                <th class="p-4 w-52 font-semibold text-xs text-text-muted">
                  {{ i18n.isRo() ? 'Parametru Tehnic' : 'Technical Parameter' }}
                </th>
                @for (prod of compService.items(); track prod.id) {
                  <th class="p-4 w-64 align-top border-l border-border">
                    <div class="flex flex-col items-center text-center space-y-3">
                      <div class="relative w-28 h-28 p-2 rounded-lg bg-canvas-subtle border border-border flex items-center justify-center">
                        <img [src]="prod.image_url" [alt]="i18n.getProductName(prod)" class="max-w-full max-h-full object-contain">
                        <button 
                          type="button" 
                          (click)="compService.removeProduct(prod.id)"
                          class="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-rose-900/80 hover:bg-rose-800 text-rose-200 border border-rose-700 flex items-center justify-center text-[10px] font-bold"
                          [title]="i18n.isRo() ? 'Elimină din comparație' : 'Remove from comparison'"
                          [attr.aria-label]="i18n.isRo() ? 'Elimină din comparație' : 'Remove from comparison'">
                          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"/></svg>
                        </button>
                      </div>

                      <div class="space-y-1">
                        <a [routerLink]="['/produs', prod.slug]" class="font-heading font-semibold text-text-primary hover:text-primary line-clamp-2">
                          {{ i18n.getProductName(prod) }}
                        </a>
                        <div class="text-[10px] text-text-muted">{{ prod.sku }}</div>
                      </div>

                      <div class="text-base font-bold text-text-primary tabular-nums">
                        {{ prod.price_ron.toFixed(2) }} <span class="text-xs font-normal text-text-muted">{{ i18n.currencyLabel() }}</span>
                      </div>

                      <button 
                        type="button" 
                        (click)="cartService.addToCart(prod)"
                        [disabled]="prod.stock <= 0"
                        class="w-full py-2 px-3 rounded-lg bg-primary hover:bg-primary-hover text-primary-contrast text-xs font-semibold transition-colors disabled:opacity-40 flex items-center justify-center gap-1.5">
                        <span>{{ 'btn_add_to_cart' | translate }}</span>
                      </button>
                    </div>
                  </th>
                }
              </tr>
            </thead>

            <tbody class="divide-y divide-border">
              
              <tr class="hover:bg-surface-elevated transition-colors">
                <td class="p-4 font-semibold text-xs text-text-muted">
                  {{ i18n.isRo() ? 'Subcategorie' : 'Subcategory' }}
                </td>
                @for (prod of compService.items(); track prod.id) {
                  <td class="p-4 border-l border-border text-text-primary">
                    {{ i18n.getSubcategoryName(prod.subcategory) }}
                  </td>
                }
              </tr>

              <tr class="hover:bg-surface-elevated transition-colors">
                <td class="p-4 font-semibold text-xs text-text-muted">
                  {{ i18n.isRo() ? 'Disponibilitate' : 'Availability' }}
                </td>
                @for (prod of compService.items(); track prod.id) {
                  <td class="p-4 border-l border-border">
                    @if (prod.stock > 5) {
                      <app-ui-badge variant="success">● {{ i18n.isRo() ? 'În stoc (' + prod.stock + ')' : 'In stock (' + prod.stock + ')' }}</app-ui-badge>
                    } @else if (prod.stock > 0) {
                      <app-ui-badge variant="warning">● {{ i18n.isRo() ? 'Stoc limitat (' + prod.stock + ')' : 'Low stock (' + prod.stock + ')' }}</app-ui-badge>
                    } @else {
                      <app-ui-badge variant="error">{{ 'badge_out_of_stock' | translate }}</app-ui-badge>
                    }
                  </td>
                }
              </tr>

              <tr class="hover:bg-surface-elevated transition-colors">
                <td class="p-4 font-semibold text-xs text-text-muted">
                  {{ i18n.isRo() ? 'Nivel Dificultate' : 'Skill Level' }}
                </td>
                @for (prod of compService.items(); track prod.id) {
                  <td class="p-4 border-l border-border">
                    <app-ui-badge variant="neutral">{{ getSkillLabel(prod) }}</app-ui-badge>
                  </td>
                }
              </tr>

              <tr 
                class="hover:bg-surface-elevated transition-colors"
                [class.bg-accent/5]="highlightDifferences() && areSpecsDifferent('processor')">
                <td class="p-4 font-semibold text-xs text-text-muted flex items-center justify-between">
                  <span>{{ i18n.isRo() ? 'Procesor & Arhitectură' : 'CPU & Architecture' }}</span>
                  @if (highlightDifferences() && areSpecsDifferent('processor')) {
                    <span class="text-[9px] text-accent font-semibold tracking-wider uppercase">DIFF</span>
                  }
                </td>
                @for (prod of compService.items(); track prod.id) {
                  <td class="p-4 border-l border-border text-xs text-text-primary">
                    {{ getSpec(prod, 'processor') || 'N/A' }}
                  </td>
                }
              </tr>

              <tr 
                class="hover:bg-surface-elevated transition-colors"
                [class.bg-accent/5]="highlightDifferences() && areSpecsDifferent('ram')">
                <td class="p-4 font-semibold text-xs text-text-muted flex items-center justify-between">
                  <span>{{ i18n.isRo() ? 'Memorie RAM' : 'RAM Capacity' }}</span>
                  @if (highlightDifferences() && areSpecsDifferent('ram')) {
                    <span class="text-[9px] text-accent font-semibold tracking-wider uppercase">DIFF</span>
                  }
                </td>
                @for (prod of compService.items(); track prod.id) {
                  <td class="p-4 border-l border-border text-xs text-text-primary tabular-nums">
                    {{ getSpec(prod, 'ram') || (i18n.isRo() ? 'Integrat / N/A' : 'Integrated / N/A') }}
                  </td>
                }
              </tr>

              <tr 
                class="hover:bg-surface-elevated transition-colors"
                [class.bg-accent/5]="highlightDifferences() && areSpecsDifferent('network_interfaces')">
                <td class="p-4 font-semibold text-xs text-text-muted flex items-center justify-between">
                  <span>{{ i18n.isRo() ? 'Porturi Rețea' : 'Network Interfaces' }}</span>
                  @if (highlightDifferences() && areSpecsDifferent('network_interfaces')) {
                    <span class="text-[9px] text-accent font-semibold tracking-wider uppercase">DIFF</span>
                  }
                </td>
                @for (prod of compService.items(); track prod.id) {
                  <td class="p-4 border-l border-border text-xs text-text-primary tabular-nums">
                    {{ formatNetworkSpecs(prod) }}
                  </td>
                }
              </tr>

              <tr class="hover:bg-surface-elevated transition-colors">
                <td class="p-4 font-semibold text-xs text-text-muted">
                  {{ i18n.isRo() ? 'Interfețe Digitale' : 'Digital Interfaces' }}
                </td>
                @for (prod of compService.items(); track prod.id) {
                  <td class="p-4 border-l border-border text-xs text-text-muted">
                    @let ifaces = getInterfaces(prod);
                    @if (ifaces && ifaces.length > 0) {
                      <div class="space-y-1">
                        @for (iface of ifaces.slice(0, 3); track iface) {
                          <div>• {{ iface }}</div>
                        }
                      </div>
                    } @else {
                      <span>{{ getSpec(prod, 'connectivity') || 'Standard' }}</span>
                    }
                  </td>
                }
              </tr>

              <tr class="hover:bg-surface-elevated transition-colors">
                <td class="p-4 font-semibold text-xs text-text-muted">
                  {{ i18n.isRo() ? 'Header GPIO' : 'GPIO Pinout' }}
                </td>
                @for (prod of compService.items(); track prod.id) {
                  <td class="p-4 border-l border-border text-xs text-text-primary tabular-nums">
                    @if (prod.pinout_info) {
                      <span>{{ prod.pinout_info.total_pins }} {{ i18n.isRo() ? 'Pini' : 'Pins' }} ({{ prod.pinout_info.logic_level }})</span>
                    } @else {
                      <span class="text-text-muted">{{ i18n.isRo() ? 'Fără pini expuși' : 'No exposed pins' }}</span>
                    }
                  </td>
                }
              </tr>

              <tr class="hover:bg-surface-elevated transition-colors">
                <td class="p-4 font-semibold text-xs text-text-muted">
                  {{ i18n.isRo() ? 'Suport Linux' : 'Linux Support' }}
                </td>
                @for (prod of compService.items(); track prod.id) {
                  <td class="p-4 border-l border-border text-xs text-accent font-semibold">
                    Mainline LTS (Debian/Ubuntu/Armbian)
                  </td>
                }
              </tr>

              <tr class="hover:bg-surface-elevated transition-colors">
                <td class="p-4 font-semibold text-xs text-text-muted">
                  {{ i18n.isRo() ? 'Consum Putere' : 'Power Draw' }}
                </td>
                @for (prod of compService.items(); track prod.id) {
                  <td class="p-4 border-l border-border text-xs text-text-muted tabular-nums">
                    {{ getSpec(prod, 'power_consumption') || (i18n.isRo() ? 'Optimizat 5V/12V' : 'Optimized 5V/12V') }}
                  </td>
                }
              </tr>

            </tbody>
          </table>
        </div>
      }

    </div>
  `
})
export class ComparisonComponent {
  compService = inject(ComparisonService);
  cartService = inject(CartService);
  productService = inject(ProductService);
  i18n = inject(TranslationService);

  highlightDifferences = signal<boolean>(false);

  getSkillLabel(prod: Product): string {
    const isRo = this.i18n.isRo();
    const slug = prod.slug.toLowerCase();
    if (slug.includes('flipper') || slug.includes('pineapple') || slug.includes('rb5009')) return isRo ? 'Intermediar' : 'Intermediate';
    if (slug.includes('glasgow') || slug.includes('fpga') || slug.includes('proxmark') || slug.includes('r640')) return isRo ? 'Expert' : 'Expert';
    if (slug.includes('rock5') || slug.includes('hba') || slug.includes('crs305')) return isRo ? 'Avansat' : 'Advanced';
    return isRo ? 'Începător' : 'Beginner';
  }

  getSpec(prod: Product, key: string): any {
    return prod.technical_specs ? prod.technical_specs[key] : null;
  }

  getInterfaces(prod: Product): string[] | null {
    const ifaces = prod.technical_specs?.['interfaces'];
    return Array.isArray(ifaces) ? ifaces : null;
  }

  formatNetworkSpecs(prod: Product): string {
    const specs = prod.technical_specs;
    if (!specs) return 'N/A';
    const net = specs['network_interfaces'];
    if (net) {
      return Array.isArray(net) ? net.join(', ') : String(net);
    }
    const ports = specs['ports'];
    if (ports) return String(ports);
    return 'Gigabit RJ45 / Standard';
  }

  areSpecsDifferent(key: string): boolean {
    const items = this.compService.items();
    if (items.length <= 1) return false;
    const firstVal = JSON.stringify(items[0].technical_specs?.[key] || '');
    return items.some(item => JSON.stringify(item.technical_specs?.[key] || '') !== firstVal);
  }

  loadPopularComparison(type: 'sbc' | 'security') {
    if (type === 'sbc') {
      this.productService.getProduct('raspberry-pi-5-8gb').subscribe((p1: Product) => {
        if (p1) this.compService.addProduct(p1);
        this.productService.getProduct('radxa-rock-5-model-b-16gb-rk3588').subscribe((p2: Product) => {
          if (p2) this.compService.addProduct(p2);
        });
      });
    } else {
      this.productService.getProduct('flipper-zero-portable-multi-tool').subscribe((p1: Product) => {
        if (p1) this.compService.addProduct(p1);
        this.productService.getProduct('proxmark3-rdv401-research-kit').subscribe((p2: Product) => {
          if (p2) this.compService.addProduct(p2);
        });
      });
    }
  }
}
