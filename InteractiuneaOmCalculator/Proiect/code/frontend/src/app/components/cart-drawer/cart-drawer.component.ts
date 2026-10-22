import { Component, inject, computed, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { TranslationService } from '../../services/translation.service';
import { CompatibilityService } from '../../services/compatibility.service';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { UiCompatibilityEngineComponent } from '../ui/ui-compatibility-engine.component';
import { UiBadgeComponent } from '../ui/ui-badge.component';

@Component({
  selector: 'app-cart-drawer',
  standalone: true,
  imports: [RouterLink, TranslatePipe, UiCompatibilityEngineComponent, UiBadgeComponent],
  template: `
    @if (cartService.isOpen()) {
      <div 
        class="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs drawer-backdrop-fade transition-opacity"
        (click)="cartService.closeCart()">
      </div>

      <aside 
        data-lenis-prevent
        class="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-surface border-l border-border shadow-2xl flex flex-col cart-drawer-slide"
        role="dialog" 
        aria-modal="true"
        [attr.aria-label]="'cart_drawer_title' | translate">
        
        <div class="p-4 border-b border-border flex items-center justify-between bg-surface">
          <div class="flex items-center gap-2.5">
            <div class="w-8 h-8 rounded-lg bg-surface-elevated border border-border flex items-center justify-center text-text-primary">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <div>
              <h2 class="text-sm font-semibold text-text-primary">
                {{ 'cart_drawer_title' | translate }}
              </h2>
              <span class="text-xs text-text-muted">
                {{ cartService.itemsCount() }} {{ i18n.isRo() ? (cartService.itemsCount() === 1 ? 'echipament' : 'echipamente') : (cartService.itemsCount() === 1 ? 'item' : 'items') }}
              </span>
            </div>
          </div>

          <button 
            type="button"
            (click)="cartService.closeCart()"
            class="p-1.5 rounded-lg text-text-muted hover:text-text-primary hover:bg-surface-elevated transition-colors"
            [attr.aria-label]="i18n.isRo() ? 'Închide coșul' : 'Close cart'">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div class="px-5 py-3 bg-surface-elevated border-b border-border">
          <div class="flex items-center justify-between text-xs mb-1.5">
            @if (cartService.isFreeShipping()) {
              <span class="text-accent font-medium flex items-center gap-1.5">
                <svg class="w-3.5 h-3.5 text-accent shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
                {{ 'free_shipping_unlocked' | translate }}
              </span>
            } @else {
              <span class="text-text-muted text-[11px]">
                {{ 'free_shipping_progress' | translate }} 
                <strong class="text-text-primary tabular-nums">{{ cartService.freeShippingRemaining().toFixed(2) }} {{ i18n.isRo() ? 'lei' : 'RON' }}</strong>
                {{ 'free_shipping_progress_tail' | translate }}
              </span>
            }
            <span class="text-[11px] text-text-muted tabular-nums">250.00 {{ i18n.isRo() ? 'lei' : 'RON' }}</span>
          </div>
          
          <div class="w-full h-1.5 bg-surface border border-border rounded-full overflow-hidden">
            <div 
              class="h-full bg-accent transition-all duration-300 rounded-full"
              [style.width.%]="Math.min(100, (cartService.subtotal() / 250) * 100)">
            </div>
          </div>
        </div>

        <div class="flex-1 overflow-y-auto p-4 space-y-3 bg-canvas-subtle">
          @if (cartService.items().length === 0) {
            <div class="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div class="w-14 h-14 rounded-xl bg-surface border border-border flex items-center justify-center text-text-muted">
                <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
                </svg>
              </div>
              <div>
                <h3 class="text-sm font-semibold text-text-primary">
                  {{ 'cart_empty_title' | translate }}
                </h3>
                <p class="text-xs text-text-muted mt-1 max-w-xs">
                  {{ 'cart_empty_desc' | translate }}
                </p>
              </div>
              <button 
                type="button"
                (click)="cartService.closeCart(); router.navigate(['/produse'])"
                class="px-4 py-2 rounded-lg bg-surface border border-border hover:bg-surface-elevated text-text-primary font-medium text-xs transition-colors">
                {{ 'catalog_title' | translate }}
              </button>
            </div>
          } @else {
            @for (item of cartService.items(); track item.product.id) {
              <div class="p-3 rounded-lg bg-surface border border-border flex gap-3 relative group hover:border-border-focus transition-colors">
                <div class="w-14 h-14 rounded bg-canvas-subtle border border-border flex items-center justify-center p-1 flex-shrink-0">
                  <img 
                    [src]="item.product.image_url" 
                    [alt]="item.product.name"
                    class="w-full h-full object-contain">
                </div>

                <div class="flex-1 min-w-0">
                  <div class="flex items-start justify-between gap-2">
                    <h4 class="text-xs font-semibold text-text-primary truncate">
                      <a [routerLink]="['/produs', item.product.slug]" (click)="cartService.closeCart()" class="hover:text-accent">
                        {{ item.product.name }}
                      </a>
                    </h4>
                    <button 
                      type="button"
                      (click)="cartService.removeFromCart(item.product.id)"
                      class="text-text-muted hover:text-rose-400 p-0.5 transition-colors"
                      [title]="i18n.isRo() ? 'Șterge produsul din coș' : 'Remove item from cart'">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>

                  <div class="flex items-center gap-2 mt-1">
                    <span class="text-[10px] text-text-muted tabular-nums">
                      SKU: {{ item.product.sku }}
                    </span>
                    @if (item.product.stock <= 5) {
                      <app-ui-badge variant="warning">
                        {{ i18n.isRo() ? 'Stoc: ' + item.product.stock : 'Stock: ' + item.product.stock }}
                      </app-ui-badge>
                    }
                  </div>

                  <div class="flex items-center justify-between mt-2 pt-2 border-t border-border">
                    <div class="flex items-center border border-border rounded bg-surface-elevated">
                      <button 
                        type="button"
                        (click)="updateQtyWithAnim(item.product.id, item.quantity - 1)"
                        class="w-6 h-6 flex items-center justify-center text-text-muted hover:text-text-primary transition-colors text-xs font-bold active:scale-90"
                        aria-label="Minus">
                        -
                      </button>
                      <span 
                        class="quantity-val-pop w-6 text-center text-xs font-bold text-text-primary tabular-nums"
                        [class.is-changing]="animatingQtyIds().includes(item.product.id)">
                        {{ item.quantity }}
                      </span>
                      <button 
                        type="button"
                        (click)="updateQtyWithAnim(item.product.id, item.quantity + 1)"
                        [disabled]="item.quantity >= item.product.stock"
                        class="w-6 h-6 flex items-center justify-center text-text-muted hover:text-text-primary disabled:opacity-30 transition-colors text-xs font-bold active:scale-90"
                        aria-label="Plus">
                        +
                      </button>
                    </div>

                    <div class="text-right">
                      <span class="text-xs font-bold text-text-primary tabular-nums">
                        {{ (item.product.price_ron * item.quantity).toFixed(2) }} {{ i18n.isRo() ? 'lei' : 'RON' }}
                      </span>
                      @if (item.quantity > 1) {
                        <div class="text-[10px] text-text-muted tabular-nums">
                          ({{ item.product.price_ron.toFixed(2) }} {{ i18n.isRo() ? 'lei/buc' : 'RON/pc' }})
                        </div>
                      }
                    </div>
                  </div>

                </div>
              </div>
            }
          }
        </div>

        @if (cartService.items().length > 1) {
          <div class="p-3 border-t border-border bg-surface">
            <app-ui-compatibility-engine 
              [result]="cartCompatibility()" 
              [compact]="true" 
              (addFix)="addFixToCart($event)">
            </app-ui-compatibility-engine>
          </div>
        }

        @if (cartService.items().length > 0) {
          <div class="p-4 border-t border-border bg-surface space-y-3 shadow-lg">
            <div class="space-y-1.5 text-xs">
              <div class="flex justify-between text-text-muted">
                <span>{{ 'cart_subtotal' | translate }}</span>
                <span class="text-text-primary tabular-nums font-semibold">{{ cartService.subtotal().toFixed(2) }} {{ i18n.isRo() ? 'lei' : 'RON' }}</span>
              </div>
              <div class="flex justify-between text-text-muted">
                <span>{{ 'cart_shipping' | translate }}</span>
                @if (cartService.isFreeShipping()) {
                  <span class="text-accent font-medium">{{ 'shipping_free' | translate }}</span>
                } @else {
                  <span class="text-text-primary tabular-nums font-semibold">{{ cartService.shippingEstimate().toFixed(2) }} {{ i18n.isRo() ? 'lei' : 'RON' }}</span>
                }
              </div>
              <div class="pt-2 border-t border-border flex justify-between text-sm font-semibold text-text-primary">
                <span>{{ 'cart_total_estimated' | translate }}</span>
                <span class="text-text-primary tabular-nums text-base font-bold">{{ cartService.total().toFixed(2) }} {{ i18n.isRo() ? 'lei' : 'RON' }}</span>
              </div>
              <div class="text-[10px] text-text-muted text-right">
                {{ 'summary_vat_note' | translate }}
              </div>

              <!-- Klarna Installment Pill in Cart Drawer -->
              <div class="p-2 rounded-lg bg-surface-elevated border border-[#FFB3C7]/40 flex items-center justify-between text-[11px]">
                <div class="flex items-center gap-1.5">
                  <span class="px-1.5 py-0.5 rounded bg-[#FFB3C7] text-black font-black text-[10px] tracking-tight">Klarna.</span>
                  <span class="text-text-primary font-medium">
                    {{ i18n.isRo() ? 'sau 3 rate de ' : 'or 3 installments of ' }}
                    <strong class="text-[#FFB3C7] tabular-nums font-bold">{{ (cartService.total() / 3).toFixed(2) }} {{ i18n.isRo() ? 'lei' : 'RON' }}</strong>
                  </span>
                </div>
                <span class="text-[#FFB3C7] text-[10px] font-semibold">{{ i18n.isRo() ? '0% dobândă' : '0% interest' }}</span>
              </div>
            </div>

            <button 
              type="button"
              (click)="goToCheckout()"
              class="w-full py-2.5 px-4 rounded-lg bg-accent hover:bg-accent-hover text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-xs transition-all">
              <span>{{ 'cart_checkout_btn' | translate }}</span>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
              </svg>
            </button>

            <div class="flex items-center justify-center gap-1.5 text-[11px] text-text-muted pt-1">
              <svg class="w-3.5 h-3.5 text-accent shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
              <span>{{ i18n.isRo() ? 'Garanție tehnică 24 luni • Retur 14 zile' : '24-month warranty • 14-day guaranteed returns' }}</span>
            </div>
          </div>
        }

      </aside>
    }
  `
})
export class CartDrawerComponent {
  cartService = inject(CartService);
  i18n = inject(TranslationService);
  router = inject(Router);
  compatService = inject(CompatibilityService);
  productService = inject(ProductService);
  Math = Math;

  cartProducts = computed(() => this.cartService.items().map(i => i.product));
  cartCompatibility = computed(() => this.compatService.evaluateCompatibility(this.cartProducts()));

  animatingQtyIds = signal<number[]>([]);

  updateQtyWithAnim(productId: number, newQty: number) {
    this.cartService.updateQuantity(productId, newQty);
    this.animatingQtyIds.update(ids => [...ids, productId]);
    setTimeout(() => {
      this.animatingQtyIds.update(ids => ids.filter(id => id !== productId));
    }, 240);
  }

  goToCheckout() {
    this.cartService.closeCart();
    this.router.navigate(['/checkout']);
  }

  addFixToCart(sku: string) {
    this.productService.getProducts({ limit: 120 }).subscribe((prods: Product[]) => {
      const match = prods.find((p: Product) => p.sku.toLowerCase() === sku.toLowerCase());
      if (match) {
        this.cartService.addToCart(match);
      }
    });
  }
}
