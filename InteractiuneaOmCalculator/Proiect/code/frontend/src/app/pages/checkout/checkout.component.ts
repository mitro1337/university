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
      
      <nav class="flex items-center gap-2 text-xs text-text-muted mb-6 font-medium" aria-label="Breadcrumb">
        <a routerLink="/" class="breadcrumb-interactive hover:text-text-primary transition-colors">{{ i18n.isRo() ? 'Acasă' : 'Home' }}</a>
        <span class="text-text-muted">/</span>
        <a routerLink="/produse" class="breadcrumb-interactive hover:text-text-primary transition-colors">{{ 'catalog_title' | translate }}</a>
        <span class="text-text-muted">/</span>
        <span class="text-text-primary font-bold">{{ 'checkout_title' | translate }}</span>
      </nav>

      <div class="mb-8">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-elevated border border-border text-xs text-text-secondary mb-2.5 shadow-xs font-mono">
          <span class="led-indicator-3d" style="--led-color: #00ff9d; --led-glow: rgba(0,255,157,0.7);"></span>
          {{ 'checkout_guest_badge' | translate }}
        </div>
        <h1 class="font-heading font-black text-2xl sm:text-3xl uppercase tracking-wider text-text-primary">
          {{ 'checkout_title' | translate }}
        </h1>
        <p class="text-xs text-text-secondary mt-1 font-sans">
          {{ 'checkout_subtitle' | translate }}
        </p>
      </div>

      @if (cartService.items().length === 0) {
        <div class="p-12 text-center rounded-2xl bg-surface border border-border shadow-3d-card space-y-4 max-w-lg mx-auto transition-colors">
          <div class="w-16 h-16 rounded-2xl bg-surface-sunken border border-border mx-auto flex items-center justify-center text-cyan-400 shadow-3d-sunken">
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
            </svg>
          </div>
          <h2 class="text-lg font-bold text-text-primary font-heading">{{ 'cart_empty_title' | translate }}</h2>
          <p class="text-xs text-text-muted leading-relaxed font-sans">{{ 'cart_empty_desc' | translate }}</p>
          <a routerLink="/produse" class="btn-3d-primary inline-flex text-xs">
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

            <div class="p-6 rounded-2xl bg-surface border border-border shadow-3d-card space-y-5 backdrop-blur-md">
              <div class="flex items-center gap-3 border-b border-border pb-3">
                <span class="w-6 h-6 rounded-lg bg-cyan-400 text-[#03101e] font-black text-xs flex items-center justify-center shadow-3d-btn font-mono">
                  1
                </span>
                <h2 class="text-sm font-bold text-text-primary font-heading tracking-wide uppercase">
                  {{ 'step_1_title' | translate }}
                </h2>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div class="space-y-1 sm:col-span-2">
                  <label class="text-text-secondary font-bold">{{ 'field_name' | translate }}</label>
                  <input 
                    type="text" 
                    [(ngModel)]="formData.guestName" 
                    placeholder="ex: Bogdan Ionescu (DevOps Engineer)"
                    class="w-full bg-surface-sunken border border-border rounded-xl px-3.5 py-2.5 text-text-primary placeholder-text-muted focus:outline-none focus:border-cyan-400 text-xs shadow-3d-sunken font-sans">
                </div>

                <div class="space-y-1">
                  <label class="text-text-secondary font-bold">{{ 'field_email' | translate }}</label>
                  <input 
                    type="email" 
                    [(ngModel)]="formData.guestEmail" 
                    placeholder="bogdan.ionescu@lab.local"
                    class="w-full bg-surface-sunken border border-border rounded-xl px-3.5 py-2.5 text-text-primary placeholder-text-muted focus:outline-none focus:border-cyan-400 text-xs shadow-3d-sunken font-sans">
                </div>

                <div class="space-y-1">
                  <label class="text-text-secondary font-bold">{{ 'field_phone' | translate }}</label>
                  <input 
                    type="tel" 
                    [(ngModel)]="formData.guestPhone" 
                    placeholder="0740 123 456"
                    class="w-full bg-surface-sunken border border-border rounded-xl px-3.5 py-2.5 text-text-primary placeholder-text-muted focus:outline-none focus:border-cyan-400 text-xs tabular-nums shadow-3d-sunken font-mono">
                </div>
              </div>

              <div class="pt-4 border-t border-border space-y-3">
                <label class="text-xs font-bold text-text-primary flex items-center gap-2">
                  <span class="led-indicator-3d" style="--led-color: #00d2ff; --led-glow: rgba(0,210,255,0.7);"></span>
                  <span>{{ 'delivery_select_title' | translate }}</span>
                </label>
                
                <div class="space-y-2.5">
                  <label 
                    class="p-4 rounded-xl border-2 cursor-pointer flex items-center justify-between transition-all"
                    [class.border-cyan-400]="formData.deliveryMethod === 'curier_sameday'"
                    [class.bg-surface-elevated]="formData.deliveryMethod === 'curier_sameday'"
                    [class.shadow-[0_3px_0_#02668c,0_0_15px_rgba(0,210,255,0.2)]]="formData.deliveryMethod === 'curier_sameday'"
                    [class.translate-y-[-1px]]="formData.deliveryMethod === 'curier_sameday'"
                    [class.border-border]="formData.deliveryMethod !== 'curier_sameday'"
                    [class.bg-surface]="formData.deliveryMethod !== 'curier_sameday'">
                    <div class="flex items-center gap-3">
                      <input 
                        type="radio" 
                        name="deliveryMethod" 
                        value="curier_sameday" 
                        [(ngModel)]="formData.deliveryMethod"
                        (change)="onDeliveryChange()"
                        class="text-cyan-400 focus:ring-cyan-400">
                      <div>
                        <div class="text-xs font-bold text-text-primary font-heading">{{ 'delivery_sameday' | translate }}</div>
                        <div class="text-[11px] text-text-muted font-sans">{{ 'delivery_sameday_sub' | translate }}</div>
                      </div>
                    </div>
                    <span class="text-xs tabular-nums font-mono font-bold" [class.text-emerald-400]="cartService.isFreeShipping()" [class.text-cyan-400]="!cartService.isFreeShipping()">
                      {{ cartService.isFreeShipping() ? ('shipping_free' | translate) : '19.00 lei' }}
                    </span>
                  </label>

                  <label 
                    class="p-4 rounded-xl border-2 cursor-pointer flex items-center justify-between transition-all"
                    [class.border-cyan-400]="formData.deliveryMethod === 'easybox'"
                    [class.bg-surface-elevated]="formData.deliveryMethod === 'easybox'"
                    [class.shadow-[0_3px_0_#02668c,0_0_15px_rgba(0,210,255,0.2)]]="formData.deliveryMethod === 'easybox'"
                    [class.translate-y-[-1px]]="formData.deliveryMethod === 'easybox'"
                    [class.border-border]="formData.deliveryMethod !== 'easybox'"
                    [class.bg-surface]="formData.deliveryMethod !== 'easybox'">
                    <div class="flex items-center gap-3">
                      <input 
                        type="radio" 
                        name="deliveryMethod" 
                        value="easybox" 
                        [(ngModel)]="formData.deliveryMethod"
                        (change)="onDeliveryChange()"
                        class="text-cyan-400 focus:ring-cyan-400">
                      <div>
                        <div class="text-xs font-bold text-text-primary font-heading">{{ 'delivery_easybox' | translate }}</div>
                        <div class="text-[11px] text-text-muted font-sans">{{ 'delivery_easybox_sub' | translate }}</div>
                      </div>
                    </div>
                    <span class="text-xs tabular-nums font-mono font-bold" [class.text-emerald-400]="cartService.isFreeShipping()" [class.text-cyan-400]="!cartService.isFreeShipping()">
                      {{ cartService.isFreeShipping() ? ('shipping_free' | translate) : '14.00 lei' }}
                    </span>
                  </label>

                  <label 
                    class="p-4 rounded-xl border-2 cursor-pointer flex items-center justify-between transition-all"
                    [class.border-cyan-400]="formData.deliveryMethod === 'ridicare_bucuresti'"
                    [class.bg-surface-elevated]="formData.deliveryMethod === 'ridicare_bucuresti'"
                    [class.shadow-[0_3px_0_#02668c,0_0_15px_rgba(0,210,255,0.2)]]="formData.deliveryMethod === 'ridicare_bucuresti'"
                    [class.translate-y-[-1px]]="formData.deliveryMethod === 'ridicare_bucuresti'"
                    [class.border-border]="formData.deliveryMethod !== 'ridicare_bucuresti'"
                    [class.bg-surface]="formData.deliveryMethod !== 'ridicare_bucuresti'">
                    <div class="flex items-center gap-3">
                      <input 
                        type="radio" 
                        name="deliveryMethod" 
                        value="ridicare_bucuresti" 
                        [(ngModel)]="formData.deliveryMethod"
                        (change)="onDeliveryChange()"
                        class="text-cyan-400 focus:ring-cyan-400">
                      <div>
                        <div class="text-xs font-bold text-text-primary font-heading">{{ 'delivery_warehouse' | translate }}</div>
                        <div class="text-[11px] text-text-muted font-sans">{{ 'delivery_warehouse_sub' | translate }}</div>
                      </div>
                    </div>
                    <span class="text-xs font-bold text-emerald-400 font-mono">
                      {{ 'shipping_free' | translate }}
                    </span>
                  </label>
                </div>
              </div>

              <div class="pt-4 border-t border-border grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div class="space-y-1 sm:col-span-2">
                  <label class="text-text-secondary font-bold">{{ 'field_address' | translate }}</label>
                  <input 
                    type="text" 
                    [(ngModel)]="formData.shippingAddress" 
                    placeholder="ex: Bd. Tudor Vladimirescu nr. 22, Bl. R12, Ap. 45"
                    class="w-full bg-surface-sunken border border-border rounded-xl px-3.5 py-2.5 text-text-primary placeholder-text-muted focus:outline-none focus:border-cyan-400 text-xs shadow-3d-sunken font-sans">
                </div>

                <div class="space-y-1">
                  <label class="text-text-secondary font-bold">{{ 'field_county' | translate }}</label>
                  <select 
                    [(ngModel)]="formData.county"
                    class="w-full bg-surface-sunken border border-border rounded-xl px-3.5 py-2.5 text-text-primary focus:outline-none focus:border-cyan-400 text-xs shadow-3d-sunken font-sans">
                    <option value="" disabled>{{ i18n.isRo() ? 'Selectează județul...' : 'Select county...' }}</option>
                    @for (c of romanianCounties; track c) {
                      <option [value]="c">{{ c }}</option>
                    }
                  </select>
                </div>

                <div class="space-y-1">
                  <label class="text-text-secondary font-bold">{{ 'field_city' | translate }}</label>
                  <input 
                    type="text" 
                    [(ngModel)]="formData.city" 
                    placeholder="ex: București, Cluj-Napoca..."
                    class="w-full bg-surface-sunken border border-border rounded-xl px-3.5 py-2.5 text-text-primary placeholder-text-muted focus:outline-none focus:border-cyan-400 text-xs shadow-3d-sunken font-sans">
                </div>

                <div class="space-y-1 sm:col-span-2">
                  <label class="text-text-secondary font-bold">{{ 'field_notes' | translate }}</label>
                  <input 
                    type="text" 
                    [(ngModel)]="formData.notes" 
                    placeholder="ex: Sună la interfon 45 sau predare recepție datacenter"
                    class="w-full bg-surface-sunken border border-border rounded-xl px-3.5 py-2.5 text-text-primary placeholder-text-muted focus:outline-none focus:border-cyan-400 text-xs shadow-3d-sunken font-sans">
                </div>
              </div>
            </div>

            <div class="p-6 rounded-2xl bg-surface border border-border shadow-3d-card space-y-5 backdrop-blur-md">
              <div class="flex items-center gap-3 border-b border-border pb-3">
                <span class="w-6 h-6 rounded-lg bg-cyan-400 text-[#03101e] font-black text-xs flex items-center justify-center shadow-3d-btn font-mono">
                  2
                </span>
                <h2 class="text-sm font-bold text-text-primary font-heading tracking-wide uppercase">
                  {{ 'step_2_title' | translate }}
                </h2>
              </div>

              <div class="space-y-3">
                <!-- Klarna Buy Now Pay Later Option -->
                <label 
                  class="p-4 rounded-2xl border-2 cursor-pointer block transition-all"
                  [class.border-[#FFB3C7]]="formData.paymentMethod === 'klarna_bnpl'"
                  [class.bg-[#fff5f8]/5]="formData.paymentMethod === 'klarna_bnpl'"
                  [class.shadow-[0_4px_0_#992d4c,0_0_20px_rgba(255,179,199,0.3)]]="formData.paymentMethod === 'klarna_bnpl'"
                  [class.translate-y-[-2px]]="formData.paymentMethod === 'klarna_bnpl'"
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
                          <span class="px-2 py-0.5 rounded-md bg-[#FFB3C7] text-black font-black text-[11px] tracking-tight shadow-xs">Klarna.</span>
                          <span class="font-heading">{{ i18n.isRo() ? 'Cumpără acum, plătește mai târziu' : 'Buy Now, Pay Later' }}</span>
                          <span class="text-[10px] px-2 py-0.5 rounded-full bg-[#FFB3C7]/20 text-[#FFB3C7] border border-[#FFB3C7]/40 font-mono font-bold">
                            0% Dobândă
                          </span>
                        </div>
                        <p class="text-[11px] text-text-muted mt-1 leading-relaxed font-sans">
                          {{ i18n.isRo() 
                            ? 'Plătește în 3 rate fără dobândă de ' + (finalTotal() / 3).toFixed(2) + ' lei sau amână plata cu 30 de zile. Fără comisioane.' 
                            : 'Pay in 3 interest-free installments of ' + (finalTotal() / 3).toFixed(2) + ' lei or in 30 days. No fees.' }}
                        </p>
                      </div>
                    </div>
                  </div>

                  @if (formData.paymentMethod === 'klarna_bnpl') {
                    <div class="mt-3 pt-3 border-t border-border/80 space-y-2.5">
                      <div class="text-[11px] font-bold text-text-primary font-heading">
                        {{ i18n.isRo() ? 'Alege planul tău de plată Klarna:' : 'Select your Klarna plan:' }}
                      </div>

                      <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        <label 
                          class="p-3 rounded-xl border cursor-pointer flex items-center justify-between transition-all"
                          [class.border-[#FFB3C7]]="formData.klarnaPlan === 'pay_in_3'"
                          [class.bg-surface-elevated]="formData.klarnaPlan === 'pay_in_3'"
                          [class.shadow-[0_2px_0_#992d4c]]="formData.klarnaPlan === 'pay_in_3'"
                          [class.border-border]="formData.klarnaPlan !== 'pay_in_3'">
                          <div class="flex items-center gap-2">
                            <input 
                              type="radio" 
                              name="klarnaPlan" 
                              value="pay_in_3" 
                              [(ngModel)]="formData.klarnaPlan"
                              class="text-[#FFB3C7] focus:ring-[#FFB3C7]">
                            <span class="font-bold text-text-primary">3 Rate fără dobândă</span>
                          </div>
                          <span class="text-[#FFB3C7] font-mono font-black tabular-nums">{{ (finalTotal() / 3).toFixed(2) }} lei</span>
                        </label>

                        <label 
                          class="p-3 rounded-xl border cursor-pointer flex items-center justify-between transition-all"
                          [class.border-[#FFB3C7]]="formData.klarnaPlan === 'pay_in_30_days'"
                          [class.bg-surface-elevated]="formData.klarnaPlan === 'pay_in_30_days'"
                          [class.shadow-[0_2px_0_#992d4c]]="formData.klarnaPlan === 'pay_in_30_days'"
                          [class.border-border]="formData.klarnaPlan !== 'pay_in_30_days'">
                          <div class="flex items-center gap-2">
                            <input 
                              type="radio" 
                              name="klarnaPlan" 
                              value="pay_in_30_days" 
                              [(ngModel)]="formData.klarnaPlan"
                              class="text-[#FFB3C7] focus:ring-[#FFB3C7]">
                            <span class="font-bold text-text-primary">Plătește în 30 zile</span>
                          </div>
                          <span class="text-text-muted font-mono font-bold">0 lei azi</span>
                        </label>
                      </div>

                      <div class="p-2.5 rounded-xl bg-surface-elevated border border-border text-[11px] text-text-muted flex items-center gap-2 shadow-3d-sunken">
                        <svg class="w-3.5 h-3.5 text-emerald-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                        </svg>
                        <span>{{ i18n.isRo() ? 'Aprobare instantanee pe loc la pasul următor prin autorizare securizată Klarna.' : 'Instant soft check with secure authorization.' }}</span>
                      </div>
                    </div>
                  }
                </label>

                <label 
                  class="p-4 rounded-xl border cursor-pointer block transition-all"
                  [class.border-cyan-400]="formData.paymentMethod === 'stripe_card'"
                  [class.bg-surface-elevated]="formData.paymentMethod === 'stripe_card'"
                  [class.shadow-[0_3px_0_#02668c,0_0_15px_rgba(0,210,255,0.2)]]="formData.paymentMethod === 'stripe_card'"
                  [class.translate-y-[-1px]]="formData.paymentMethod === 'stripe_card'"
                  [class.border-border]="formData.paymentMethod !== 'stripe_card'"
                  [class.bg-surface]="formData.paymentMethod !== 'stripe_card'">
                  <div class="flex items-start justify-between gap-3">
                    <div class="flex items-center gap-3">
                      <input 
                        type="radio" 
                        name="paymentMethod" 
                        value="stripe_card" 
                        [(ngModel)]="formData.paymentMethod"
                        class="text-cyan-400 focus:ring-cyan-400 mt-0.5">
                      <div>
                        <div class="text-xs font-bold text-text-primary flex items-center gap-2 font-heading">
                          <span>{{ 'pay_stripe_title' | translate }}</span>
                          <app-ui-badge variant="accent">{{ 'pay_stripe_badge' | translate }}</app-ui-badge>
                        </div>
                        <p class="text-[11px] text-text-muted mt-1 leading-relaxed font-sans">
                          {{ 'pay_stripe_desc' | translate }}
                        </p>
                      </div>
                    </div>
                  </div>

                  @if (formData.paymentMethod === 'stripe_card') {
                    <div class="mt-3 pt-3 border-t border-border text-[11px] text-text-muted flex items-center gap-2">
                      <svg class="w-3.5 h-3.5 text-cyan-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                      <span>{{ 'pay_stripe_simulator_hint' | translate }}</span>
                    </div>
                  }
                </label>

                <label 
                  class="p-4 rounded-xl border cursor-pointer block transition-all"
                  [class.border-cyan-400]="formData.paymentMethod === 'cash_on_delivery'"
                  [class.bg-surface-elevated]="formData.paymentMethod === 'cash_on_delivery'"
                  [class.shadow-[0_3px_0_#02668c]]="formData.paymentMethod === 'cash_on_delivery'"
                  [class.translate-y-[-1px]]="formData.paymentMethod === 'cash_on_delivery'"
                  [class.border-border]="formData.paymentMethod !== 'cash_on_delivery'"
                  [class.bg-surface]="formData.paymentMethod !== 'cash_on_delivery'">
                  <div class="flex items-center gap-3">
                    <input 
                      type="radio" 
                      name="paymentMethod" 
                      value="cash_on_delivery" 
                      [(ngModel)]="formData.paymentMethod"
                      class="text-cyan-400 focus:ring-cyan-400">
                    <div>
                      <div class="text-xs font-bold text-text-primary font-heading">{{ 'pay_cod_title' | translate }}</div>
                      <div class="text-[11px] text-text-muted font-sans">{{ 'pay_cod_desc' | translate }}</div>
                    </div>
                  </div>
                </label>
              </div>
            </div>

          </div>

          <div class="lg:col-span-5 space-y-6">
            <div class="p-6 rounded-2xl bg-surface border border-border shadow-3d-card space-y-5 sticky top-24 relative overflow-hidden backdrop-blur-md">
              <div class="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"></div>
              
              <div class="flex items-center justify-between border-b border-border pb-3">
                <h3 class="text-xs font-bold text-text-primary font-heading uppercase tracking-wider">
                  {{ 'summary_title' | translate }} ({{ cartService.itemsCount() }} {{ i18n.isRo() ? 'echipamente' : 'items' }})
                </h3>
                <a routerLink="/produse" class="text-xs text-cyan-400 hover:text-cyan-300 font-bold underline transition-colors">
                  {{ 'summary_modify' | translate }}
                </a>
              </div>

              <div class="max-h-60 overflow-y-auto space-y-3 pr-1 divide-y border-border">
                @for (item of cartService.items(); track item.product.id) {
                  <div class="pt-2 first:pt-0 flex items-center justify-between gap-3 text-xs">
                    <div class="flex items-center gap-2.5 min-w-0">
                      <div class="w-10 h-10 rounded-lg bg-surface-sunken border border-border flex items-center justify-center p-0.5 flex-shrink-0 shadow-3d-sunken">
                        <img [src]="item.product.image_url" [alt]="item.product.name" class="w-full h-full object-contain">
                      </div>
                      <div class="min-w-0">
                        <div class="text-text-primary truncate font-bold font-heading">{{ item.product.name }}</div>
                        <div class="text-[11px] text-text-muted tabular-nums font-mono">{{ item.quantity }} × {{ item.product.price_ron.toFixed(2) }} lei</div>
                      </div>
                    </div>
                    <div class="text-cyan-400 font-mono font-bold tabular-nums flex-shrink-0">
                      {{ (item.product.price_ron * item.quantity).toFixed(2) }} lei
                    </div>
                  </div>
                }
              </div>

              <div class="space-y-2 pt-3 border-t border-border text-xs">
                <div class="flex justify-between text-text-muted font-sans">
                  <span>{{ 'summary_subtotal' | translate }}</span>
                  <span class="text-text-primary tabular-nums font-mono font-bold">{{ cartService.subtotal().toFixed(2) }} lei</span>
                </div>
                
                <div class="flex justify-between text-text-muted font-sans">
                  <span>{{ 'summary_shipping' | translate }}</span>
                  @if (shippingCost() === 0) {
                    <span class="text-emerald-400 font-mono font-bold">{{ 'shipping_free' | translate }}</span>
                  } @else {
                    <span class="text-text-primary tabular-nums font-mono font-bold">{{ shippingCost().toFixed(2) }} lei</span>
                  }
                </div>

                <div class="pt-3 border-t border-border flex justify-between text-sm font-bold text-text-primary">
                  <span class="font-heading uppercase tracking-wide">{{ 'summary_total' | translate }}</span>
                  <span class="text-cyan-400 tabular-nums text-xl font-mono font-black">{{ finalTotal().toFixed(2) }} lei</span>
                </div>

                <div class="text-[10px] text-text-muted text-right font-sans">
                  {{ 'summary_vat_note' | translate }}
                </div>
              </div>

              <button 
                type="button"
                (click)="submitOrder()"
                [disabled]="submitting()"
                class="btn-3d-primary w-full py-3.5 px-4 rounded-xl text-xs font-heading font-bold tracking-wider uppercase flex items-center justify-center gap-2">
                @if (submitting()) {
                  <div class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>{{ 'btn_generating' | translate }}</span>
                } @else if (formData.paymentMethod === 'klarna_bnpl') {
                  <span class="flex items-center gap-1.5 font-bold">
                    <span class="px-2 py-0.5 rounded bg-[#FFB3C7] text-black font-black text-[10px] tracking-tight">Klarna.</span>
                    <span>Plătește prin Klarna (3 rate) →</span>
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
