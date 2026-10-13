import { Component, inject, signal, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { TranslationService } from '../../services/translation.service';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { OrderDetails } from '../../models/order.model';
import { UiBadgeComponent } from '../../components/ui/ui-badge.component';
import { ReceiptPrinter3dComponent } from '../../components/ui/receipt-printer-3d.component';

@Component({
  selector: 'app-order-confirmation',
  standalone: true,
  imports: [RouterLink, TranslatePipe, UiBadgeComponent, ReceiptPrinter3dComponent],
  template: `
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      @if (loading()) {
        <div class="p-16 text-center space-y-4">
          <div class="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p class="text-xs text-text-muted">
            {{ i18n.isRo() ? 'Se preiau detaliile comenzii...' : 'Loading order details...' }}
          </p>
        </div>
      } @else if (!order()) {
        <div class="p-12 text-center rounded-xl bg-surface border border-border shadow-xs space-y-4">
          <h2 class="font-heading text-base font-bold text-text-primary">
            {{ i18n.isRo() ? 'Comanda nu a putut fi găsită' : 'Order Not Found' }}
          </h2>
          <p class="text-xs text-text-muted">
            {{ i18n.isRo() ? 'Verifică numărul comenzii transmis în link.' : 'Please check the order number provided in the link.' }}
          </p>
          <a routerLink="/" class="inline-block px-5 py-2.5 rounded-lg bg-surface border border-border text-text-primary font-medium text-xs hover:bg-surface-elevated transition-colors">
            {{ i18n.isRo() ? 'Înapoi la Magazin' : 'Back to Store' }}
          </a>
        </div>
      } @else {
        @let ord = order()!;
        <div class="space-y-6">
          
          <!-- 3D Tactile POS Receipt Printer Experience -->
          <app-receipt-printer-3d [order]="ord"></app-receipt-printer-3d>

          <div class="p-6 sm:p-8 rounded-xl bg-surface border border-border shadow-xs space-y-4 text-center sm:text-left transition-colors">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
              <div class="flex items-center gap-4 justify-center sm:justify-start">
                <div class="w-12 h-12 rounded-lg bg-emerald-950/40 border border-emerald-800/80 flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
                </div>
                <div>
                  <div class="mb-1">
                    @if (ord.payment_method === 'klarna_bnpl') {
                      <app-ui-badge variant="mono">
                        <span class="text-[#FFB3C7] font-bold">Klarna Pay in 3</span> • {{ i18n.isRo() ? '0% Dobândă • Autorizat' : '0% Interest • Authorized' }}
                      </app-ui-badge>
                    } @else if (ord.status === 'paid') {
                      <app-ui-badge variant="success">{{ i18n.isRo() ? 'Plată Confirmată • Securizat' : 'Payment Confirmed • Secured' }}</app-ui-badge>
                    } @else if (ord.status === 'processing') {
                      <app-ui-badge variant="accent">{{ i18n.isRo() ? 'Comandă Preluată • Plată Ramburs' : 'Order Received • Cash on Delivery' }}</app-ui-badge>
                    } @else {
                      <app-ui-badge variant="neutral">Status: {{ ord.status }}</app-ui-badge>
                    }
                  </div>
                  <h1 class="font-display text-2xl sm:text-3xl uppercase tracking-wide text-text-primary">
                    {{ i18n.isRo() ? 'Mulțumim pentru comanda plasată!' : 'Thank you for your order!' }}
                  </h1>
                </div>
              </div>

              <div class="sm:text-right">
                <span class="text-[11px] text-text-muted uppercase font-semibold">
                  {{ i18n.isRo() ? 'Număr Comandă' : 'Order Number' }}
                </span>
                <div class="text-base font-bold text-accent tracking-wider tabular-nums">
                  {{ ord.order_number }}
                </div>
                <div class="text-[11px] text-text-muted">
                  {{ i18n.isRo() ? 'Data: ' : 'Date: ' }}{{ ord.created_at ? ord.created_at.slice(0, 10) : (i18n.isRo() ? 'Astăzi' : 'Today') }}
                </div>
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs">
              <div class="p-3.5 rounded-lg bg-surface-elevated border border-border">
                <div class="text-[11px] text-text-muted uppercase font-semibold">
                  {{ i18n.isRo() ? 'Curier & Expediere' : 'Courier & Shipping' }}
                </div>
                <div class="text-text-primary font-bold mt-0.5">Sameday Curier 24H</div>
                <div class="text-[10px] text-emerald-400 mt-1">AWB: 184910283401RO</div>
              </div>
              <div class="p-3.5 rounded-lg bg-surface-elevated border border-border">
                <div class="text-[11px] text-text-muted uppercase font-semibold">
                  {{ i18n.isRo() ? 'Destinatar' : 'Recipient' }}
                </div>
                <div class="text-text-primary font-bold mt-0.5 truncate">{{ ord.guest_name }}</div>
                <div class="text-[10px] text-text-muted mt-1 truncate">{{ ord.guest_email }}</div>
              </div>
              <div class="p-3.5 rounded-lg bg-surface-elevated border border-border">
                <div class="text-[11px] text-text-muted uppercase font-semibold">
                  {{ i18n.isRo() ? 'Tranzacție / Plată' : 'Transaction / Payment' }}
                </div>
                <div class="text-text-primary font-bold mt-0.5 truncate">
                  @if (ord.payment_method === 'klarna_bnpl') {
                    {{ i18n.isRo() ? 'Klarna (Rata 1/3 Achitată)' : 'Klarna (Payment 1/3 Settled)' }}
                  } @else if (ord.payment_method === 'stripe_card') {
                    {{ ord.netopia_transaction_id || (i18n.isRo() ? 'Confirmat Card' : 'Card Confirmed') }}
                  } @else {
                    {{ i18n.isRo() ? 'Plată la livrare (Ramburs)' : 'Cash on Delivery' }}
                  }
                </div>
                <div class="text-[10px] text-text-muted mt-1">
                  {{ ord.payment_method === 'klarna_bnpl' ? 'Klarna Bank AB • 0% DAE' : (ord.payment_method === 'stripe_card' ? (ord.netopia_auth_code ? 'Auth: ' + ord.netopia_auth_code : '3D-Secure Verified') : 'Sameday Logistics') }}
                </div>
              </div>
            </div>
          </div>

          <div class="p-6 rounded-xl bg-surface border border-border shadow-xs space-y-4 transition-colors">
            <h3 class="text-sm font-semibold text-text-primary border-b border-border pb-3">
              {{ i18n.isRo() ? 'Echipamente Comandate' : 'Ordered Components' }}
            </h3>

            <div class="divide-y divide-border">
              @for (item of ord.items; track item.id || item.product_id) {
                <div class="py-3 flex items-center justify-between gap-4 text-xs">
                  <div class="flex items-center gap-3 min-w-0">
                    <div class="w-12 h-12 rounded bg-canvas-subtle border border-border flex items-center justify-center p-0.5 flex-shrink-0">
                      <img [src]="item.image_url" 
                           [alt]="item.product_name"
                           class="w-full h-full object-contain">
                    </div>
                    <div class="min-w-0">
                      <div class="text-text-primary font-semibold truncate">{{ item.product_name }}</div>
                      <div class="text-[11px] text-text-muted tabular-nums">
                        SKU: {{ item.sku }} • {{ item.quantity }} × {{ item.unit_price_ron.toFixed(2) }} {{ i18n.currencyLabel() }}
                      </div>
                    </div>
                  </div>
                  <div class="text-right flex-shrink-0 font-bold text-text-primary tabular-nums">
                    {{ item.subtotal_ron.toFixed(2) }} {{ i18n.currencyLabel() }}
                  </div>
                </div>
              }
            </div>

            <div class="pt-4 border-t border-border space-y-1.5 text-xs">
              <div class="flex justify-between text-text-muted">
                <span>{{ 'summary_subtotal' | translate }}</span>
                <span class="text-text-primary tabular-nums font-semibold">{{ ord.subtotal_ron.toFixed(2) }} {{ i18n.currencyLabel() }}</span>
              </div>
              <div class="flex justify-between text-text-muted">
                <span>{{ 'summary_shipping' | translate }}</span>
                <span class="text-text-primary tabular-nums font-semibold">
                  {{ ord.shipping_ron === 0 ? ('shipping_free' | translate) : (ord.shipping_ron.toFixed(2) + ' ' + i18n.currencyLabel()) }}
                </span>
              </div>
              <div class="pt-2 border-t border-border flex justify-between text-sm font-bold text-text-primary">
                <span>{{ 'summary_total' | translate }}</span>
                <span class="text-text-primary tabular-nums text-lg font-bold">{{ ord.total_ron.toFixed(2) }} {{ i18n.currencyLabel() }}</span>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div class="p-6 rounded-xl bg-surface border border-border shadow-xs text-xs space-y-2 transition-colors">
              <h4 class="text-xs font-semibold text-text-primary mb-2">
                {{ i18n.isRo() ? 'Adresă de Livrare' : 'Shipping Address' }}
              </h4>
              <p class="text-text-primary font-semibold">{{ ord.guest_name }}</p>
              <p class="text-text-muted">{{ ord.shipping_address }}</p>
              <p class="text-text-muted">{{ ord.city }}, jud. {{ ord.county }}</p>
              <p class="text-text-muted tabular-nums">Tel: {{ ord.guest_phone }}</p>
              @if (ord.notes) {
                <p class="text-[11px] text-accent pt-1 italic">
                  {{ i18n.isRo() ? 'Instrucțiuni: ' : 'Notes: ' }}"{{ ord.notes }}"
                </p>
              }
            </div>

            <div class="p-6 rounded-xl bg-surface border border-border shadow-xs flex flex-col justify-between gap-4 transition-colors">
              <div>
                <h4 class="text-xs font-semibold text-text-primary mb-2">
                  {{ i18n.isRo() ? 'Acțiuni Rapide' : 'Quick Actions' }}
                </h4>
                <p class="text-xs text-text-muted leading-relaxed">
                  {{ i18n.isRo() 
                    ? 'Confirmarea a fost transmisă automat pe email. Poți salva sumarul comenzii în format PDF sau continua navigarea în catalog.' 
                    : 'A confirmation has been sent to your email. You can print receipt details or continue browsing the active hardware catalog.' }}
                </p>
              </div>

              <div class="flex flex-wrap items-center gap-3 pt-2 text-xs">
                <button 
                  type="button"
                  (click)="printOrder()"
                  class="px-4 py-2 rounded-lg bg-surface-elevated border border-border hover:bg-surface-hover text-text-primary font-medium transition-colors flex items-center gap-2">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/>
                  </svg>
                  <span>{{ i18n.isRo() ? 'Tipărește Sumarul' : 'Print Receipt' }}</span>
                </button>

                <a routerLink="/produse" 
                   class="px-4 py-2 rounded-lg bg-primary hover:bg-primary-hover text-primary-contrast font-medium transition-colors">
                  {{ 'cart_continue_btn' | translate }}
                </a>
              </div>
            </div>
          </div>

        </div>
      }

    </div>
  `
})
export class OrderConfirmationComponent implements OnInit {
  route = inject(ActivatedRoute);
  orderService = inject(OrderService);
  i18n = inject(TranslationService);

  order = signal<OrderDetails | null>(null);
  loading = signal<boolean>(true);

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const orderId = params['orderId'];
      if (orderId) {
        this.orderService.getOrder(orderId).subscribe({
          next: (ord) => {
            this.order.set(ord);
            this.loading.set(false);
          },
          error: () => {
            this.order.set(null);
            this.loading.set(false);
          }
        });
      } else {
        this.loading.set(false);
      }
    });
  }

  printOrder() {
    window.print();
  }
}
