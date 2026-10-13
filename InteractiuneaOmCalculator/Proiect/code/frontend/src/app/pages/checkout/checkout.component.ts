import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';
import { TranslationService } from '../../services/translation.service';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { CheckoutRequest } from '../../models/order.model';
import { UiBadgeComponent } from '../../components/ui/ui-badge.component';
import { UiAlertComponent } from '../../components/ui/ui-alert.component';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [RouterLink, FormsModule, TranslatePipe, UiBadgeComponent, UiAlertComponent],
  template: `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      <nav class="flex items-center gap-2 text-xs text-text-muted mb-6" aria-label="Breadcrumb">
        <a routerLink="/" class="hover:text-text-primary transition-colors">{{ i18n.isRo() ? 'Acasă' : 'Home' }}</a>
        <span class="text-border">/</span>
        <a routerLink="/produse" class="hover:text-text-primary transition-colors">{{ 'catalog_title' | translate }}</a>
        <span class="text-border">/</span>
        <span class="text-text-primary font-medium">{{ 'checkout_title' | translate }}</span>
      </nav>

      <div class="mb-8">
        <div class="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-surface border border-border text-xs text-text-muted mb-2">
          <span class="text-emerald-400">●</span>
          {{ 'checkout_guest_badge' | translate }}
        </div>
        <h1 class="font-display text-2xl sm:text-3xl uppercase tracking-wide text-text-primary">
          {{ 'checkout_title' | translate }}
        </h1>
        <p class="text-xs text-text-muted mt-1">
          {{ 'checkout_subtitle' | translate }}
        </p>
      </div>

      @if (cartService.items().length === 0) {
        <div class="p-12 text-center rounded-xl bg-surface border border-border shadow-xs space-y-4 max-w-lg mx-auto transition-colors">
          <div class="w-14 h-14 rounded-xl bg-canvas-subtle border border-border mx-auto flex items-center justify-center text-text-muted">
            <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
            </svg>
          </div>
          <h2 class="text-base font-bold text-text-primary">{{ 'cart_empty_title' | translate }}</h2>
          <p class="text-xs text-text-muted">{{ 'cart_empty_desc' | translate }}</p>
          <a routerLink="/produse" class="inline-block px-5 py-2.5 rounded-lg bg-accent hover:bg-accent-hover text-white font-medium text-xs transition-colors shadow-xs">
            {{ 'catalog_title' | translate }}
          </a>
        </div>
      } @else {
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <div class="lg:col-span-7 space-y-6">
            
            @if (errorMessage()) {
              <app-ui-alert variant="error" [title]="i18n.isRo() ? 'Eroare la validare' : 'Validation Error'">
                {{ errorMessage() }}
              </app-ui-alert>
            }

            <div class="p-6 rounded-xl bg-surface border border-border shadow-xs space-y-5 transition-colors">
              <div class="flex items-center gap-2.5 border-b border-border pb-3">
                <span class="w-5 h-5 rounded-full bg-accent text-white font-bold text-xs flex items-center justify-center">
                  1
                </span>
                <h2 class="text-sm font-semibold text-text-primary">
                  {{ 'step_1_title' | translate }}
                </h2>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div class="space-y-1 sm:col-span-2">
                  <label class="text-text-muted font-medium">{{ 'field_name' | translate }}</label>
                  <input 
                    type="text" 
                    [(ngModel)]="formData.guestName" 
                    placeholder="ex: Bogdan Ionescu (DevOps Engineer)"
                    class="w-full bg-surface-elevated border border-border rounded-lg px-3 py-2 text-text-primary placeholder-text-muted focus:outline-none focus:border-accent text-xs">
                </div>

                <div class="space-y-1">
                  <label class="text-text-muted font-medium">{{ 'field_email' | translate }}</label>
                  <input 
                    type="email" 
                    [(ngModel)]="formData.guestEmail" 
                    placeholder="bogdan.ionescu@lab.local"
                    class="w-full bg-surface-elevated border border-border rounded-lg px-3 py-2 text-text-primary placeholder-text-muted focus:outline-none focus:border-accent text-xs">
                </div>

                <div class="space-y-1">
                  <label class="text-text-muted font-medium">{{ 'field_phone' | translate }}</label>
                  <input 
                    type="tel" 
                    [(ngModel)]="formData.guestPhone" 
                    placeholder="0740 123 456"
                    class="w-full bg-surface-elevated border border-border rounded-lg px-3 py-2 text-text-primary placeholder-text-muted focus:outline-none focus:border-accent text-xs tabular-nums">
                </div>
              </div>

              <div class="pt-4 border-t border-border space-y-3">
                <label class="text-xs text-text-muted font-semibold">
                  {{ 'delivery_select_title' | translate }}
                </label>
                
                <div class="space-y-2">
                  <label 
                    class="p-3.5 rounded-lg border cursor-pointer flex items-center justify-between transition-colors"
                    [class.border-accent]="formData.deliveryMethod === 'curier_sameday'"
                    [class.bg-surface-elevated]="formData.deliveryMethod === 'curier_sameday'"
                    [class.border-border]="formData.deliveryMethod !== 'curier_sameday'"
                    [class.bg-surface]="formData.deliveryMethod !== 'curier_sameday'">
                    <div class="flex items-center gap-3">
                      <input 
                        type="radio" 
                        name="deliveryMethod" 
                        value="curier_sameday" 
                        [(ngModel)]="formData.deliveryMethod"
                        (change)="onDeliveryChange()"
                        class="text-accent focus:ring-accent">
                      <div>
                        <div class="text-xs font-semibold text-text-primary">{{ 'delivery_sameday' | translate }}</div>
                        <div class="text-[11px] text-text-muted">{{ 'delivery_sameday_sub' | translate }}</div>
                      </div>
                    </div>
                    <span class="text-xs tabular-nums font-semibold" [class.text-emerald-400]="cartService.isFreeShipping()" [class.text-text-primary]="!cartService.isFreeShipping()">
                      {{ cartService.isFreeShipping() ? ('shipping_free' | translate) : ('19.00 ' + i18n.currencyLabel()) }}
                    </span>
                  </label>

                  <label 
                    class="p-3.5 rounded-lg border cursor-pointer flex items-center justify-between transition-colors"
                    [class.border-accent]="formData.deliveryMethod === 'easybox'"
                    [class.bg-surface-elevated]="formData.deliveryMethod === 'easybox'"
                    [class.border-border]="formData.deliveryMethod !== 'easybox'"
                    [class.bg-surface]="formData.deliveryMethod !== 'easybox'">
                    <div class="flex items-center gap-3">
                      <input 
                        type="radio" 
                        name="deliveryMethod" 
                        value="easybox" 
                        [(ngModel)]="formData.deliveryMethod"
                        (change)="onDeliveryChange()"
                        class="text-accent focus:ring-accent">
                      <div>
                        <div class="text-xs font-semibold text-text-primary">{{ 'delivery_easybox' | translate }}</div>
                        <div class="text-[11px] text-text-muted">{{ 'delivery_easybox_sub' | translate }}</div>
                      </div>
                    </div>
                    <span class="text-xs tabular-nums font-semibold" [class.text-emerald-400]="cartService.isFreeShipping()" [class.text-text-primary]="!cartService.isFreeShipping()">
                      {{ cartService.isFreeShipping() ? ('shipping_free' | translate) : ('14.00 ' + i18n.currencyLabel()) }}
                    </span>
                  </label>

                  <label 
                    class="p-3.5 rounded-lg border cursor-pointer flex items-center justify-between transition-colors"
                    [class.border-accent]="formData.deliveryMethod === 'ridicare_bucuresti'"
                    [class.bg-surface-elevated]="formData.deliveryMethod === 'ridicare_bucuresti'"
                    [class.border-border]="formData.deliveryMethod !== 'ridicare_bucuresti'"
                    [class.bg-surface]="formData.deliveryMethod !== 'ridicare_bucuresti'">
                    <div class="flex items-center gap-3">
                      <input 
                        type="radio" 
                        name="deliveryMethod" 
                        value="ridicare_bucuresti" 
                        [(ngModel)]="formData.deliveryMethod"
                        (change)="onDeliveryChange()"
                        class="text-accent focus:ring-accent">
                      <div>
                        <div class="text-xs font-semibold text-text-primary">{{ 'delivery_warehouse' | translate }}</div>
                        <div class="text-[11px] text-text-muted">{{ 'delivery_warehouse_sub' | translate }}</div>
                      </div>
                    </div>
                    <span class="text-xs font-semibold text-emerald-400">
                      {{ 'shipping_free' | translate }}
                    </span>
                  </label>
                </div>
              </div>

              <div class="pt-4 border-t border-border grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div class="space-y-1 sm:col-span-2">
                  <label class="text-text-muted font-medium">{{ 'field_address' | translate }}</label>
                  <input 
                    type="text" 
                    [(ngModel)]="formData.shippingAddress" 
                    placeholder="ex: Bd. Tudor Vladimirescu nr. 22, Bl. R12, Ap. 45"
                    class="w-full bg-surface-elevated border border-border rounded-lg px-3 py-2 text-text-primary placeholder-text-muted focus:outline-none focus:border-accent text-xs">
                </div>

                <div class="space-y-1">
                  <label class="text-text-muted font-medium">{{ 'field_county' | translate }}</label>
                  <select 
                    [(ngModel)]="formData.county"
                    class="w-full bg-surface-elevated border border-border rounded-lg px-3 py-2 text-text-primary focus:outline-none focus:border-accent text-xs">
                    <option value="" disabled>{{ i18n.isRo() ? 'Selectează județul...' : 'Select county...' }}</option>
                    @for (c of romanianCounties; track c) {
                      <option [value]="c">{{ c }}</option>
                    }
                  </select>
                </div>

                <div class="space-y-1">
                  <label class="text-text-muted font-medium">{{ 'field_city' | translate }}</label>
                  <input 
                    type="text" 
                    [(ngModel)]="formData.city" 
                    placeholder="ex: București, Cluj-Napoca..."
                    class="w-full bg-surface-elevated border border-border rounded-lg px-3 py-2 text-text-primary placeholder-text-muted focus:outline-none focus:border-accent text-xs">
                </div>

                <div class="space-y-1 sm:col-span-2">
                  <label class="text-text-muted font-medium">{{ 'field_notes' | translate }}</label>
                  <input 
                    type="text" 
                    [(ngModel)]="formData.notes" 
                    placeholder="ex: Sună la interfon 45 sau predare recepție datacenter"
                    class="w-full bg-surface-elevated border border-border rounded-lg px-3 py-2 text-text-primary placeholder-text-muted focus:outline-none focus:border-accent text-xs">
                </div>
              </div>
            </div>

            <div class="p-6 rounded-xl bg-surface border border-border shadow-xs space-y-5 transition-colors">
              <div class="flex items-center gap-2.5 border-b border-border pb-3">
                <span class="w-5 h-5 rounded-full bg-accent text-white font-bold text-xs flex items-center justify-center">
                  2
                </span>
                <h2 class="text-sm font-semibold text-text-primary">
                  {{ 'step_2_title' | translate }}
                </h2>
              </div>

              <div class="space-y-3">
                <!-- Klarna Buy Now Pay Later Option -->
                <label 
                  class="p-4 rounded-xl border-2 cursor-pointer block transition-all"
                  [class.border-[#FFB3C7]]="formData.paymentMethod === 'klarna_bnpl'"
                  [class.bg-[#fff5f8]/5]="formData.paymentMethod === 'klarna_bnpl'"
                  [class.shadow-md]="formData.paymentMethod === 'klarna_bnpl'"
                  [class.border-border]="formData.paymentMethod !== 'klarna_bnpl'"
                  [class.bg-surface]="formData.paymentMethod !== 'klarna_bnpl'">
                  <div class="flex items-start justify-between gap-3">
                    <div class="flex items-center gap-3">
                      <input 
                        type="radio" 
                        name="paymentMethod" 
                        value="klarna_bnpl" 
                        [(ngModel)]="formData.paymentMethod"
                        class="text-[#FFB3C7] focus:ring-[#FFB3C7] mt-0.5">
                      <div>
                        <div class="text-xs font-bold text-text-primary flex items-center gap-2">
                          <span class="px-1.5 py-0.5 rounded bg-[#FFB3C7] text-black font-black text-[11px] tracking-tight">Klarna.</span>
                          <span>{{ i18n.isRo() ? 'Cumpără acum, plătește mai târziu' : 'Buy Now, Pay Later' }}</span>
                          <span class="text-[10px] px-2 py-0.5 rounded-full bg-[#FFB3C7]/20 text-[#FFB3C7] border border-[#FFB3C7]/40 font-bold">
                            {{ i18n.isRo() ? '0% Dobândă' : '0% Interest' }}
                          </span>
                        </div>
                        <p class="text-[11px] text-text-muted mt-1 leading-relaxed">
                          {{ i18n.isRo() 
                            ? 'Plătește în 3 rate fără dobândă de ' + (finalTotal() / 3).toFixed(2) + ' ' + i18n.currencyLabel() + ' sau amână plata cu 30 de zile. Fără comisioane.' 
                            : 'Pay in 3 interest-free installments of ' + (finalTotal() / 3).toFixed(2) + ' ' + i18n.currencyLabel() + ' or in 30 days. No fees.' }}
                        </p>
                      </div>
                    </div>
                  </div>

                  @if (formData.paymentMethod === 'klarna_bnpl') {
                    <div class="mt-3 pt-3 border-t border-border space-y-2.5">
                      <div class="text-[11px] font-semibold text-text-primary">
                        {{ i18n.isRo() ? 'Alege planul tău de plată Klarna:' : 'Select your Klarna plan:' }}
                      </div>

                      <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        <label 
                          class="p-2.5 rounded-lg border cursor-pointer flex items-center justify-between"
                          [class.border-[#FFB3C7]]="formData.klarnaPlan === 'pay_in_3'"
                          [class.bg-surface-elevated]="formData.klarnaPlan === 'pay_in_3'"
                          [class.border-border]="formData.klarnaPlan !== 'pay_in_3'">
                          <div class="flex items-center gap-2">
                            <input 
                              type="radio" 
                              name="klarnaPlan" 
                              value="pay_in_3" 
                              [(ngModel)]="formData.klarnaPlan"
                              class="text-[#FFB3C7] focus:ring-[#FFB3C7]">
                            <span class="font-medium text-text-primary">{{ i18n.isRo() ? '3 Rate fără dobândă' : '3 Interest-free installments' }}</span>
                          </div>
                          <span class="text-[#FFB3C7] font-bold tabular-nums">{{ (finalTotal() / 3).toFixed(2) }} {{ i18n.currencyLabel() }}</span>
                        </label>

                        <label 
                          class="p-2.5 rounded-lg border cursor-pointer flex items-center justify-between"
                          [class.border-[#FFB3C7]]="formData.klarnaPlan === 'pay_in_30_days'"
                          [class.bg-surface-elevated]="formData.klarnaPlan === 'pay_in_30_days'"
                          [class.border-border]="formData.klarnaPlan !== 'pay_in_30_days'">
                          <div class="flex items-center gap-2">
                            <input 
                              type="radio" 
                              name="klarnaPlan" 
                              value="pay_in_30_days" 
                              [(ngModel)]="formData.klarnaPlan"
                              class="text-[#FFB3C7] focus:ring-[#FFB3C7]">
                            <span class="font-medium text-text-primary">{{ i18n.isRo() ? 'Plătește în 30 zile' : 'Pay in 30 days' }}</span>
                          </div>
                          <span class="text-text-muted font-bold">{{ i18n.isRo() ? '0 lei azi' : '0 ' + i18n.currencyLabel() + ' today' }}</span>
                        </label>
                      </div>

                      <div class="p-2.5 rounded-lg bg-surface-elevated border border-border text-[11px] text-text-muted flex items-center gap-2">
                        <svg class="w-3.5 h-3.5 text-emerald-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                        </svg>
                        <span>{{ i18n.isRo() ? 'Aprobare instantanee pe loc la următorul pas prin SMS securizat.' : 'Instant soft check with secure SMS verification.' }}</span>
                      </div>
                    </div>
                  }
                </label>

                <label 
                  class="p-4 rounded-lg border cursor-pointer block transition-colors"
                  [class.border-accent]="formData.paymentMethod === 'stripe_card'"
                  [class.bg-surface-elevated]="formData.paymentMethod === 'stripe_card'"
                  [class.border-border]="formData.paymentMethod !== 'stripe_card'"
                  [class.bg-surface]="formData.paymentMethod !== 'stripe_card'">
                  <div class="flex items-start justify-between gap-3">
                    <div class="flex items-center gap-3">
                      <input 
                        type="radio" 
                        name="paymentMethod" 
                        value="stripe_card" 
                        [(ngModel)]="formData.paymentMethod"
                        class="text-accent focus:ring-accent mt-0.5">
                      <div>
                        <div class="text-xs font-semibold text-text-primary flex items-center gap-2">
                          <span>{{ 'pay_stripe_title' | translate }}</span>
                          <app-ui-badge variant="accent">{{ 'pay_stripe_badge' | translate }}</app-ui-badge>
                        </div>
                        <p class="text-[11px] text-text-muted mt-1 leading-relaxed">
                          {{ 'pay_stripe_desc' | translate }}
                        </p>
                      </div>
                    </div>
                  </div>

                  @if (formData.paymentMethod === 'stripe_card') {
                    <div class="mt-3 pt-3 border-t border-border text-[11px] text-text-muted flex items-center gap-2">
                      <svg class="w-3.5 h-3.5 text-accent shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                      <span>{{ 'pay_stripe_simulator_hint' | translate }}</span>
                    </div>
                  }
                </label>

                <label 
                  class="p-4 rounded-lg border cursor-pointer block transition-colors"
                  [class.border-accent]="formData.paymentMethod === 'cash_on_delivery'"
                  [class.bg-surface-elevated]="formData.paymentMethod === 'cash_on_delivery'"
                  [class.border-border]="formData.paymentMethod !== 'cash_on_delivery'"
                  [class.bg-surface]="formData.paymentMethod !== 'cash_on_delivery'">
                  <div class="flex items-center gap-3">
                    <input 
                      type="radio" 
                      name="paymentMethod" 
                      value="cash_on_delivery" 
                      [(ngModel)]="formData.paymentMethod"
                      class="text-accent focus:ring-accent">
                    <div>
                      <div class="text-xs font-semibold text-text-primary">{{ 'pay_cod_title' | translate }}</div>
                      <div class="text-[11px] text-text-muted">{{ 'pay_cod_desc' | translate }}</div>
                    </div>
                  </div>
                </label>
              </div>
            </div>

          </div>

          <div class="lg:col-span-5 space-y-6">
            <div class="p-6 rounded-xl bg-surface border border-border shadow-xs space-y-5 sticky top-24 transition-colors">
              <div class="flex items-center justify-between border-b border-border pb-3">
                <h3 class="text-xs font-semibold text-text-primary">
                  {{ 'summary_title' | translate }} ({{ cartService.itemsCount() }} {{ i18n.isRo() ? 'echipamente' : 'items' }})
                </h3>
                <a routerLink="/produse" class="text-xs text-accent hover:underline">
                  {{ 'summary_modify' | translate }}
                </a>
              </div>

              <div class="max-h-60 overflow-y-auto space-y-3 pr-1 divide-y border-border">
                @for (item of cartService.items(); track item.product.id) {
                  <div class="pt-2 first:pt-0 flex items-center justify-between gap-3 text-xs">
                    <div class="flex items-center gap-2.5 min-w-0">
                      <div class="w-10 h-10 rounded bg-canvas-subtle border border-border flex items-center justify-center p-0.5 flex-shrink-0">
                        <img [src]="item.product.image_url" [alt]="item.product.name" class="w-full h-full object-contain">
                      </div>
                      <div class="min-w-0">
                        <div class="text-text-primary truncate font-semibold">{{ item.product.name }}</div>
                        <div class="text-[11px] text-text-muted tabular-nums">{{ item.quantity }} × {{ item.product.price_ron.toFixed(2) }} {{ i18n.currencyLabel() }}</div>
                      </div>
                    </div>
                    <div class="text-text-primary font-bold tabular-nums flex-shrink-0">
                      {{ (item.product.price_ron * item.quantity).toFixed(2) }} {{ i18n.currencyLabel() }}
                    </div>
                  </div>
                }
              </div>

              <div class="space-y-2 pt-3 border-t border-border text-xs">
                <div class="flex justify-between text-text-muted">
                  <span>{{ 'summary_subtotal' | translate }}</span>
                  <span class="text-text-primary tabular-nums font-semibold">{{ cartService.subtotal().toFixed(2) }} {{ i18n.currencyLabel() }}</span>
                </div>
                
                <div class="flex justify-between text-text-muted">
                  <span>{{ 'summary_shipping' | translate }}</span>
                  @if (shippingCost() === 0) {
                    <span class="text-emerald-400 font-medium">{{ 'shipping_free' | translate }}</span>
                  } @else {
                    <span class="text-text-primary tabular-nums font-semibold">{{ shippingCost().toFixed(2) }} {{ i18n.currencyLabel() }}</span>
                  }
                </div>

                <div class="pt-3 border-t border-border flex justify-between text-sm font-semibold text-text-primary">
                  <span>{{ 'summary_total' | translate }}</span>
                  <span class="text-text-primary tabular-nums text-lg font-bold">{{ finalTotal().toFixed(2) }} {{ i18n.currencyLabel() }}</span>
                </div>

                <div class="text-[10px] text-text-muted text-right">
                  {{ 'summary_vat_note' | translate }}
                </div>
              </div>

              <button 
                type="button"
                (click)="submitOrder()"
                [disabled]="submitting()"
                class="w-full py-3 px-4 rounded-lg bg-accent hover:bg-accent-hover text-white font-semibold text-xs shadow-xs transition-all disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2">
                @if (submitting()) {
                  <div class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>{{ 'btn_generating' | translate }}</span>
                } @else if (formData.paymentMethod === 'klarna_bnpl') {
                  <span class="flex items-center gap-1.5 font-bold">
                    <span class="px-1.5 py-0.5 rounded bg-[#FFB3C7] text-black font-black text-[10px] tracking-tight">Klarna.</span>
                    <span>{{ i18n.isRo() ? 'Plătește prin Klarna (3 rate) →' : 'Pay with Klarna (3 installments) →' }}</span>
                  </span>
                } @else if (formData.paymentMethod === 'stripe_card') {
                  <span>{{ 'btn_pay_stripe' | translate }}</span>
                } @else {
                  <span>{{ 'btn_place_cod' | translate }}</span>
                }
              </button>

              <div class="text-[11px] text-text-muted text-center leading-relaxed">
                {{ i18n.isRo() ? 'Prin plasarea comenzii, declari că accepți' : 'By placing the order, you agree to our' }}
                <a routerLink="/termeni-si-conditii" target="_blank" class="underline font-semibold text-text-primary hover:text-accent">
                  {{ i18n.isRo() ? 'Termenii și Condițiile' : 'Terms & Conditions' }}
                </a>
                {{ i18n.isRo() ? 'și' : 'and' }}
                <a routerLink="/confidentialitate" target="_blank" class="underline font-semibold text-text-primary hover:text-accent">
                  {{ i18n.isRo() ? 'Politica de Confidențialitate (GDPR)' : 'Privacy Policy (GDPR)' }}
                </a>.
              </div>

              <div class="p-3.5 rounded-lg bg-surface-elevated border border-border text-[11px] text-text-muted space-y-1.5">
                <div class="flex items-center gap-2 text-text-primary font-semibold">
                  <svg class="w-3.5 h-3.5 text-emerald-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
                  <span>{{ 'security_guarantee_title' | translate }}</span>
                </div>
                <p>
                  {{ 'security_guarantee_desc' | translate }}
                </p>
              </div>

            </div>
          </div>

        </div>
      }

    </div>
  `
})
export class CheckoutComponent {
  cartService = inject(CartService);
  orderService = inject(OrderService);
  i18n = inject(TranslationService);
  router = inject(Router);

  submitting = signal<boolean>(false);
  errorMessage = signal<string | null>(null);

  romanianCounties = [
    'București', 'Alba', 'Arad', 'Argeș', 'Bacău', 'Bihor', 'Bistrița-Năsăud', 'Botoșani',
    'Brașov', 'Brăila', 'Buzău', 'Caraș-Severin', 'Călărași', 'Cluj', 'Constanța', 'Covasna',
    'Dâmbovița', 'Dolj', 'Galați', 'Giurgiu', 'Gorj', 'Harghita', 'Hunedoara', 'Ialomița',
    'Iași', 'Ilfov', 'Maramureș', 'Mehedinți', 'Mureș', 'Neamț', 'Olt', 'Prahova',
    'Satu Mare', 'Sălaj', 'Sibiu', 'Suceava', 'Teleorman', 'Timiș', 'Tulcea', 'Vaslui',
    'Vâlcea', 'Vrancea'
  ];

  formData = {
    guestName: '',
    guestEmail: '',
    guestPhone: '',
    shippingAddress: '',
    city: '',
    county: 'București',
    postalCode: '',
    deliveryMethod: 'curier_sameday' as 'curier_sameday' | 'easybox' | 'ridicare_bucuresti',
    paymentMethod: 'klarna_bnpl' as 'klarna_bnpl' | 'stripe_card' | 'cash_on_delivery',
    klarnaPlan: 'pay_in_3' as 'pay_in_3' | 'pay_in_30_days' | 'financing',
    notes: ''
  };

  shippingCost(): number {
    if (this.formData.deliveryMethod === 'ridicare_bucuresti') return 0;
    if (this.cartService.isFreeShipping()) return 0;
    if (this.formData.deliveryMethod === 'easybox') return 14.00;
    return 19.00;
  }

  finalTotal(): number {
    return this.cartService.subtotal() + this.shippingCost();
  }

  onDeliveryChange() {
    // triggers recalculation
  }

  submitOrder() {
    this.errorMessage.set(null);
    const isRo = this.i18n.isRo();

    // Form validation
    if (!this.formData.guestName.trim()) {
      this.errorMessage.set(isRo ? 'Te rugăm să introduci numele și prenumele destinatarului.' : 'Please enter the full recipient name.');
      return;
    }
    if (!this.formData.guestEmail.trim() || !this.formData.guestEmail.includes('@')) {
      this.errorMessage.set(isRo ? 'Te rugăm să introduci o adresă de email validă.' : 'Please enter a valid email address.');
      return;
    }
    if (!this.formData.guestPhone.trim() || this.formData.guestPhone.length < 10) {
      this.errorMessage.set(isRo ? 'Te rugăm să introduci un număr de telefon valid pentru notificarea curierului.' : 'Please enter a valid phone number for SMS delivery.');
      return;
    }
    if (!this.formData.shippingAddress.trim()) {
      this.errorMessage.set(isRo ? 'Te rugăm să introduci adresa completă de livrare.' : 'Please enter the complete shipping address.');
      return;
    }
    if (!this.formData.city.trim()) {
      this.errorMessage.set(isRo ? 'Te rugăm să introduci orașul sau localitatea.' : 'Please enter the city or town.');
      return;
    }

    const items = this.cartService.items().map(it => ({
      productId: it.product.id,
      quantity: it.quantity
    }));

    if (items.length === 0) {
      this.errorMessage.set(isRo ? 'Coșul este gol.' : 'The cart is empty.');
      return;
    }

    const payload: CheckoutRequest = {
      ...this.formData,
      items
    };

    this.submitting.set(true);

    this.orderService.submitOrder(payload).subscribe({
      next: (res) => {
        this.submitting.set(false);
        this.cartService.clearCart();

        if (res.paymentMethod === 'klarna_bnpl') {
          const url = res.klarna?.paymentUrl || `/checkout/klarna-gateway?orderId=${res.orderNumber}&amount=${this.finalTotal()}&plan=${this.formData.klarnaPlan}`;
          this.router.navigateByUrl(url);
        } else if (res.paymentMethod === 'stripe_card' && res.stripe?.paymentUrl) {
          this.router.navigateByUrl(res.stripe.paymentUrl);
        } else if (res.redirectUrl) {
          this.router.navigateByUrl(res.redirectUrl);
        } else {
          this.router.navigate(['/checkout/confirmare'], { queryParams: { orderId: res.orderNumber } });
        }
      },
      error: (err) => {
        this.submitting.set(false);
        this.errorMessage.set(err.error?.error || (isRo ? 'A apărut o problemă la procesarea comenzii. Verifică stocul.' : 'Order processing error. Please verify stock availability.'));
      }
    });
  }
}
