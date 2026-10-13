import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../../services/order.service';
import { TranslationService } from '../../services/translation.service';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { OrderDetails } from '../../models/order.model';
import { UiBadgeComponent } from '../../components/ui/ui-badge.component';

@Component({
  selector: 'app-order-tracking',
  standalone: true,
  imports: [RouterLink, FormsModule, TranslatePipe, UiBadgeComponent],
  template: `
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      <nav class="flex items-center gap-2 text-xs text-text-muted mb-6" aria-label="Breadcrumb">
        <a routerLink="/" class="hover:text-text-primary transition-colors">{{ i18n.isRo() ? 'Acasă' : 'Home' }}</a>
        <span class="text-border">/</span>
        <span class="text-text-primary">{{ 'track_order_top' | translate }}</span>
      </nav>

      <div class="text-center max-w-xl mx-auto space-y-3 mb-10">
        <h1 class="font-display text-2xl sm:text-3xl uppercase tracking-wide text-text-primary">
          {{ 'track_heading' | translate }}
        </h1>
        <p class="text-xs text-text-muted">
          {{ 'track_subheading' | translate }}
        </p>

        <div class="pt-4 flex gap-2">
          <input 
            type="text" 
            [(ngModel)]="searchOrderNumber"
            (keydown.enter)="trackOrder()"
            placeholder="ex: VEX-261008-9621"
            class="flex-1 bg-surface border border-border rounded-lg px-4 py-2.5 text-text-primary placeholder-text-muted text-xs tabular-nums focus:outline-none focus:border-accent shadow-xs">
          <button 
            type="button"
            (click)="trackOrder()"
            [disabled]="loading()"
            class="px-5 py-2.5 rounded-lg bg-accent hover:bg-accent-hover text-white font-medium text-xs transition-colors disabled:opacity-50 shadow-xs">
            {{ loading() ? (i18n.isRo() ? 'Căutare...' : 'Searching...') : ('track_btn' | translate) }}
          </button>
        </div>

        @if (errorMsg()) {
          <div class="p-3 rounded-lg bg-rose-950/20 border border-rose-800/60 text-rose-300 text-xs">
            {{ errorMsg() }}
          </div>
        }
      </div>

      @if (order()) {
        @let ord = order()!;
        <div class="p-6 rounded-xl bg-surface border border-border shadow-xs space-y-6 transition-colors">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
            <div>
              <span class="text-xs text-text-muted font-medium">
                {{ i18n.isRo() ? 'Comandă găsită' : 'Order found' }}
              </span>
              <h2 class="font-heading text-base font-bold text-accent tabular-nums">{{ ord.order_number }}</h2>
            </div>
            
            <div>
              @if (ord.status === 'paid') {
                <app-ui-badge variant="success">{{ i18n.isRo() ? '● Plată Confirmată • În Pregătire' : '● Payment Confirmed • Processing' }}</app-ui-badge>
              } @else {
                <app-ui-badge variant="neutral">● {{ ord.status }}</app-ui-badge>
              }
            </div>
          </div>

          <div class="grid grid-cols-4 gap-2 text-center text-xs">
            <div class="p-2.5 rounded-lg bg-surface-elevated border border-emerald-800/80 text-emerald-400">
              <div class="font-bold">{{ 'track_step_1' | translate }}</div>
              <div class="text-[10px] opacity-80">{{ 'track_step_1_sub' | translate }}</div>
            </div>
            <div class="p-2.5 rounded-lg bg-surface-elevated border border-emerald-800/80 text-emerald-400">
              <div class="font-bold">{{ 'track_step_2' | translate }}</div>
              <div class="text-[10px] opacity-80">{{ 'track_step_2_sub' | translate }}</div>
            </div>
            <div class="p-2.5 rounded-lg bg-surface border border-border text-text-muted">
              <div class="font-medium">{{ 'track_step_3' | translate }}</div>
              <div class="text-[10px] opacity-80">{{ 'track_step_3_sub' | translate }}</div>
            </div>
            <div class="p-2.5 rounded-lg bg-surface border border-border text-text-muted">
              <div class="font-medium">{{ 'track_step_4' | translate }}</div>
              <div class="text-[10px] opacity-80">{{ 'track_step_4_sub' | translate }}</div>
            </div>
          </div>

          <div class="p-4 rounded-lg bg-surface-elevated border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
            <div class="space-y-1">
              <div class="text-text-muted">{{ i18n.isRo() ? 'Curier partener:' : 'Partner courier:' }} <strong class="text-text-primary">Sameday Courier 24H</strong></div>
              <div class="text-text-muted">{{ i18n.isRo() ? 'Cod AWB:' : 'Tracking / AWB code:' }} <strong class="text-accent tabular-nums">184910283401RO</strong></div>
            </div>
            <a 
              href="https://sameday.ro" 
              target="_blank" 
              rel="noopener noreferrer"
              class="px-3.5 py-1.5 rounded bg-surface border border-border hover:bg-surface-hover text-text-primary font-medium text-xs transition-colors self-start sm:self-center">
              {{ i18n.isRo() ? 'Deschide pe Sameday.ro' : 'Open on Sameday.ro' }}
            </a>
          </div>

          <div class="space-y-2 pt-2">
            <h4 class="text-xs font-semibold text-text-primary">{{ i18n.isRo() ? 'Echipamente în colet' : 'Package items' }}</h4>
            <div class="divide-y divide-border">
              @for (item of ord.items; track item.id || item.product_id) {
                <div class="py-2.5 flex items-center justify-between gap-4 text-xs">
                  <div class="truncate text-text-primary font-medium">
                    {{ item.product_name }}
                  </div>
                  <div class="text-text-muted flex-shrink-0 tabular-nums">
                    {{ item.quantity }} {{ i18n.isRo() ? 'buc' : 'pcs' }} • {{ item.subtotal_ron.toFixed(2) }} {{ i18n.currencyLabel() }}
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
      }

    </div>
  `
})
export class OrderTrackingComponent {
  orderService = inject(OrderService);
  i18n = inject(TranslationService);

  searchOrderNumber = '';
  order = signal<OrderDetails | null>(null);
  loading = signal<boolean>(false);
  errorMsg = signal<string | null>(null);

  trackOrder() {
    if (!this.searchOrderNumber.trim()) return;
    this.loading.set(true);
    this.errorMsg.set(null);
    this.order.set(null);

    this.orderService.getOrder(this.searchOrderNumber.trim()).subscribe({
      next: (ord) => {
        this.order.set(ord);
        this.loading.set(false);
      },
      error: () => {
        this.errorMsg.set(this.i18n.isRo() ? 'Comanda nu a fost găsită. Verifică numărul comenzii (ex: VEX-...)' : 'Order not found. Please check order number format.');
        this.loading.set(false);
      }
    });
  }
}
