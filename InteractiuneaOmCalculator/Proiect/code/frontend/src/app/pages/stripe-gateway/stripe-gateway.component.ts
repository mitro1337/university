import { Component, inject, signal, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../../services/order.service';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-stripe-gateway',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="min-h-screen bg-canvas text-text-primary py-12 px-4 sm:px-6 font-sans">
      <div class="max-w-xl mx-auto space-y-6">
        
        <div class="bg-surface rounded-2xl shadow-sm border border-border p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-accent text-white flex items-center justify-center font-bold text-lg shadow-xs">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <rect x="4" y="4" width="16" height="16" rx="2" stroke-width="2"/>
                <rect x="9" y="9" width="6" height="6" stroke-width="2"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 15h3M1 9h3M1 15h3"/>
              </svg>
            </div>
            <div>
              <div class="flex items-center gap-2">
                <span class="font-extrabold text-base text-text-primary tracking-tight">Vexera</span>
                <span class="text-[11px] font-semibold px-2 py-0.5 rounded bg-surface-elevated text-text-secondary border border-border">
                  Stripe Checkout
                </span>
              </div>
              <div class="text-xs text-text-muted">
                {{ i18n.isRo() ? 'Poartă de Plată Securizată 256-bit SSL' : 'Secure 256-bit SSL Payment Gateway' }}
              </div>
            </div>
          </div>

          <div class="sm:text-right border-t sm:border-t-0 pt-3 sm:pt-0 border-border">
            <div class="text-[11px] text-text-muted uppercase font-semibold">{{ i18n.isRo() ? 'Total de plată' : 'Total due' }}</div>
            <div class="text-2xl font-black text-text-primary tabular-nums">
              {{ amount() }} <span class="text-sm font-bold text-text-muted">{{ i18n.currencyLabel() }}</span>
            </div>
            <div class="text-[11px] text-text-muted tabular-nums">{{ i18n.isRo() ? 'Comandă:' : 'Order:' }} {{ orderId() }}</div>
          </div>
        </div>

        <div class="bg-surface-elevated border border-border rounded-xl p-4 text-xs space-y-2 text-text-secondary">
          <div class="font-semibold flex items-center gap-1.5 text-text-primary">
            <svg class="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <span>{{ i18n.isRo() ? 'Mediu de Test Stripe • Selectează un scenariu de card:' : 'Stripe Sandbox Test Environment • Select card scenario:' }}</span>
          </div>
          <div class="flex flex-wrap gap-2 pt-1 text-[11px]">
            <button 
              type="button"
              (click)="fillTestCard('visa_success')"
              class="px-2.5 py-1.5 rounded-lg bg-surface border border-border hover:bg-surface-sunken text-text-primary font-medium transition-colors shadow-2xs">
              {{ i18n.isRo() ? 'Visa Test (Plată Reușită)' : 'Visa Test (Successful Payment)' }}
            </button>
            <button 
              type="button"
              (click)="fillTestCard('mastercard_3ds')"
              class="px-2.5 py-1.5 rounded-lg bg-surface border border-border hover:bg-surface-sunken text-text-primary font-medium transition-colors shadow-2xs">
              {{ i18n.isRo() ? 'Mastercard 3DS (Autentificare Bancară)' : 'Mastercard 3DS (Bank Auth)' }}
            </button>
            <button 
              type="button"
              (click)="fillTestCard('card_declined')"
              class="px-2.5 py-1.5 rounded-lg bg-surface border border-rose-800/40 hover:bg-rose-950/20 text-rose-400 font-medium transition-colors shadow-2xs">
              {{ i18n.isRo() ? 'Card Refuzat (Fonduri Insuficiente)' : 'Card Declined (Insufficient Funds)' }}
            </button>
          </div>
        </div>

        <div class="bg-surface rounded-2xl shadow-sm border border-border p-6 sm:p-8 space-y-6">
          
          <div>
            <div class="text-[11px] uppercase font-bold text-text-muted mb-2">
              {{ i18n.isRo() ? 'Plată Rapidă 1-Click' : '1-Click Express Checkout' }}
            </div>
            <button 
              type="button"
              (click)="payWithApplePay()"
              [disabled]="processing()"
              class="w-full py-2.5 px-4 rounded-xl bg-surface-elevated hover:bg-surface-sunken border border-border text-text-primary font-medium text-xs flex items-center justify-center gap-2 transition-colors">
              <span class="font-bold text-sm">Pay</span>
              <span class="text-text-muted text-xs">/ Google Pay</span>
            </button>
          </div>

          <div class="relative flex items-center justify-center">
            <div class="border-t border-border w-full"></div>
            <span class="bg-surface px-3 text-[11px] text-text-muted font-medium uppercase absolute">
              {{ i18n.isRo() ? 'sau introdu datele cardului' : 'or enter card details' }}
            </span>
          </div>

          @if (paymentError()) {
            <div class="p-4 rounded-xl bg-rose-950/20 border border-rose-800/60 text-rose-300 text-xs space-y-1">
              <strong class="font-bold flex items-center gap-1.5 text-rose-200">
                <svg class="w-4 h-4 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                {{ i18n.isRo() ? 'Plată Nereușită:' : 'Payment Failed:' }}
              </strong>
              <p>{{ paymentError() }}</p>
            </div>
          }

          <form (ngSubmit)="initiateAuthorization()" class="space-y-4 text-xs">
            <div class="space-y-1">
              <label class="text-text-secondary font-semibold">
                {{ i18n.isRo() ? 'Nume și Prenume Posesor Card' : 'Cardholder Full Name' }}
              </label>
              <input 
                type="text" 
                [(ngModel)]="cardholderName" 
                name="cardholderName"
                placeholder="ex: Bogdan Ionescu"
                class="w-full bg-surface-sunken border border-border rounded-xl px-3.5 py-2.5 text-text-primary focus:bg-surface focus:outline-none focus:border-accent text-xs">
            </div>

            <div class="space-y-1">
              <div class="flex items-center justify-between">
                <label class="text-text-secondary font-semibold">
                  {{ i18n.isRo() ? 'Număr Card' : 'Card Number' }}
                </label>
                <div class="flex items-center gap-1.5 text-text-muted">
                  <span class="text-[10px] font-bold text-accent">VISA</span>
                  <span class="text-[10px] font-bold text-amber-500">MC</span>
                  <span class="text-[10px] font-bold text-text-secondary">REVOLUT</span>
                </div>
              </div>
              <div class="relative">
                <input 
                  type="text" 
                  [(ngModel)]="cardNumber" 
                  name="cardNumber"
                  (input)="formatCardNumber()"
                  maxlength="19"
                  placeholder="4242 4242 4242 4242"
                  class="w-full bg-surface-sunken border border-border rounded-xl px-3.5 py-2.5 text-text-primary focus:bg-surface focus:outline-none focus:border-accent text-xs tracking-wider tabular-nums">
                <svg class="w-5 h-5 text-text-muted absolute right-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <rect x="2" y="5" width="20" height="14" rx="2" stroke-width="1.5"/>
                  <line x1="2" y1="10" x2="22" y2="10" stroke-width="1.5"/>
                </svg>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div class="space-y-1">
                <label class="text-text-secondary font-semibold">
                  {{ i18n.isRo() ? 'Data Expirării' : 'Expiry Date' }}
                </label>
                <input 
                  type="text" 
                  [(ngModel)]="expiry" 
                  name="expiry"
                  maxlength="5"
                  placeholder="MM / YY"
                  class="w-full bg-surface-sunken border border-border rounded-xl px-3.5 py-2.5 text-text-primary focus:bg-surface focus:outline-none focus:border-accent text-xs text-center tabular-nums">
              </div>

              <div class="space-y-1">
                <label class="text-text-secondary font-semibold">
                  {{ i18n.isRo() ? 'CVC / Cod Securitate' : 'CVC / Security Code' }}
                </label>
                <input 
                  type="password" 
                  [(ngModel)]="cvv" 
                  name="cvv"
                  maxlength="4"
                  placeholder="•••"
                  class="w-full bg-surface-sunken border border-border rounded-xl px-3.5 py-2.5 text-text-primary focus:bg-surface focus:outline-none focus:border-accent text-xs text-center tracking-widest tabular-nums">
              </div>
            </div>

            <div class="pt-2">
              <button 
                type="submit"
                [disabled]="processing()"
                class="w-full py-3.5 px-4 rounded-xl bg-accent hover:bg-accent-hover text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer">
                @if (processing()) {
                  <div class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>{{ i18n.isRo() ? 'Se procesează plata...' : 'Processing payment...' }}</span>
                } @else {
                  <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                  </svg>
                  <span>{{ i18n.isRo() ? 'Plătește în Siguranță ' + amount() + ' ' + i18n.currencyLabel() : 'Pay Securely ' + amount() + ' ' + i18n.currencyLabel() }}</span>
                }
              </button>
            </div>
          </form>

          <div class="pt-4 border-t border-border flex flex-wrap items-center justify-between text-[11px] text-text-muted">
            <span>Powered by Stripe Payments</span>
            <span>Certificat PCI-DSS Level 1</span>
          </div>
        </div>

        @if (show3DSModal()) {
          <div class="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div class="bg-surface rounded-2xl shadow-2xl border border-border max-w-md w-full p-6 space-y-5">
              <div class="flex items-center justify-between border-b border-border pb-3">
                <div class="flex items-center gap-2">
                  <div class="w-8 h-8 rounded-lg bg-surface-elevated text-accent font-bold flex items-center justify-center text-xs border border-border">
                    3DS
                  </div>
                  <div>
                    <h3 class="text-sm font-bold text-text-primary">
                      {{ i18n.isRo() ? 'Autentificare Securizată 3D-Secure' : '3D-Secure Bank Authentication' }}
                    </h3>
                    <div class="text-[11px] text-text-muted">
                      {{ i18n.isRo() ? 'Validare tranzacție bancară' : 'Bank transaction verification' }}
                    </div>
                  </div>
                </div>
                <span class="text-xs font-bold text-text-primary tabular-nums">{{ amount() }} {{ i18n.currencyLabel() }}</span>
              </div>

              <div class="space-y-3 text-xs text-text-secondary">
                <p>
                  {{ i18n.isRo() ? 'Pentru siguranța contului tău, autorizează plata de ' + amount() + ' ' + i18n.currencyLabel() + ' către Vexera.' : 'For your security, please authorize the payment of ' + amount() + ' ' + i18n.currencyLabel() + ' to Vexera.' }}
                </p>

                <div class="p-3 bg-surface-sunken rounded-xl border border-border space-y-1 text-[11px]">
                  <div>{{ i18n.isRo() ? 'Comerciant:' : 'Merchant:' }} <strong class="text-text-primary">Vexera</strong></div>
                  <div>{{ i18n.isRo() ? 'Data:' : 'Date:' }} <strong class="text-text-primary">{{ getCurrentFormattedDate() }}</strong></div>
                  <div>Card: <strong class="text-text-primary">•••• •••• •••• {{ cardLast4() }}</strong></div>
                </div>

                <div class="space-y-1.5 pt-1">
                  <label class="font-bold text-text-primary">
                    {{ i18n.isRo() ? 'Cod Securitate SMS / Notificare bancă:' : 'SMS Security Code / Bank Push Notification:' }}
                  </label>
                  <input 
                    type="text" 
                    [(ngModel)]="smsCode" 
                    placeholder="123456" 
                    class="w-full bg-surface-sunken border border-border rounded-xl px-4 py-2 text-center text-sm tracking-widest tabular-nums font-bold text-text-primary focus:outline-none focus:border-accent">
                  <div class="text-[10px] text-text-muted text-center">
                    {{ i18n.isRo() ? '(Codul de test 123456 este completat automat)' : '(Test code 123456 is pre-filled)' }}
                  </div>
                </div>
              </div>

              <div class="flex items-center gap-3 pt-2">
                <button 
                  type="button"
                  (click)="cancel3DS()"
                  class="flex-1 py-2.5 px-4 rounded-xl border border-border hover:bg-surface-elevated text-text-secondary font-bold text-xs transition-colors cursor-pointer">
                  {{ i18n.isRo() ? 'Renunță' : 'Cancel' }}
                </button>
                <button 
                  type="button"
                  (click)="confirm3DS()"
                  [disabled]="authenticating3DS()"
                  class="flex-1 py-2.5 px-4 rounded-xl bg-accent hover:bg-accent-hover text-white font-bold text-xs transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer">
                  @if (authenticating3DS()) {
                    <div class="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>{{ i18n.isRo() ? 'Se validează...' : 'Validating...' }}</span>
                  } @else {
                    <span>{{ i18n.isRo() ? 'Autorizează Plata' : 'Authorize Payment' }}</span>
                  }
                </button>
              </div>

            </div>
          </div>
        }

      </div>
    </div>
  `
})
export class StripeGatewayComponent implements OnInit {
  route = inject(ActivatedRoute);
  router = inject(Router);
  orderService = inject(OrderService);
  i18n = inject(TranslationService);

  orderId = signal<string>('');
  amount = signal<string>('0.00');
  pi = signal<string>('');

  cardholderName = 'Bogdan Ionescu';
  cardNumber = '4242 4242 4242 4242';
  expiry = '12/28';
  cvv = '123';
  smsCode = '123456';

  processing = signal<boolean>(false);
  show3DSModal = signal<boolean>(false);
  authenticating3DS = signal<boolean>(false);
  paymentError = signal<string | null>(null);

  getCurrentFormattedDate(): string {
    return new Date().toLocaleDateString(this.i18n.isRo() ? 'ro-RO' : 'en-US');
  }

  cardLast4() {
    const raw = this.cardNumber.replace(/\s+/g, '');
    return raw.slice(-4) || '4242';
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.orderId.set(params['orderId'] || 'VEX-DEMO');
      this.amount.set(params['amount'] ? Number(params['amount']).toFixed(2) : '469.00');
      this.pi.set(params['pi'] || '');
    });
  }

  fillTestCard(type: 'visa_success' | 'mastercard_3ds' | 'card_declined') {
    this.paymentError.set(null);
    if (type === 'visa_success') {
      this.cardNumber = '4242 4242 4242 4242';
      this.cardholderName = this.i18n.isRo() ? 'Bogdan Ionescu' : 'John Miller';
      this.expiry = '12/28';
      this.cvv = '424';
    } else if (type === 'mastercard_3ds') {
      this.cardNumber = '4000 0000 0000 3220';
      this.cardholderName = this.i18n.isRo() ? 'Andrei Popescu' : 'Andrew Parker';
      this.expiry = '09/27';
      this.cvv = '555';
    } else {
      this.cardNumber = '4000 0000 0000 0002';
      this.cardholderName = this.i18n.isRo() ? 'Test Card Refuzat' : 'Test Card Declined';
      this.expiry = '05/25';
      this.cvv = '002';
    }
  }

  formatCardNumber() {
    let raw = this.cardNumber.replace(/\D/g, '');
    let formatted = '';
    for (let i = 0; i < raw.length; i++) {
      if (i > 0 && i % 4 === 0) formatted += ' ';
      formatted += raw[i];
    }
    this.cardNumber = formatted;
  }

  payWithApplePay() {
    this.processing.set(true);
    setTimeout(() => {
      this.orderService.confirmStripePayment({
        orderNumber: this.orderId(),
        paymentIntentId: this.pi() || `pi_test_${Date.now()}`,
        status: 'succeeded',
        cardLast4: '8888',
        cardBrand: 'Apple Pay'
      }).subscribe({
        next: () => {
          this.processing.set(false);
          this.router.navigate(['/checkout/confirmare'], { queryParams: { orderId: this.orderId() } });
        },
        error: (err) => {
          this.processing.set(false);
          this.paymentError.set(err.error?.error || (this.i18n.isRo() ? 'Eroare la procesarea plății Apple Pay' : 'Error processing Apple Pay payment'));
        }
      });
    }, 1000);
  }

  initiateAuthorization() {
    this.paymentError.set(null);
    this.processing.set(true);

    setTimeout(() => {
      this.processing.set(false);
      const cleanNum = this.cardNumber.replace(/\s+/g, '');

      if (cleanNum.endsWith('0002')) {
        this.orderService.confirmStripePayment({
          orderNumber: this.orderId(),
          paymentIntentId: this.pi() || `pi_test_${Date.now()}`,
          status: 'failed',
          cardLast4: '0002',
          errorMessage: this.i18n.isRo() ? 'Tranzacție refuzată de banca emitentă: Fonduri insuficiente.' : 'Transaction declined by issuer bank: Insufficient funds.'
        }).subscribe({
          next: () => {
            this.paymentError.set(this.i18n.isRo() ? 'Cardul a fost refuzat: Fonduri insuficiente sau limită depășită.' : 'Card declined: Insufficient funds or card limit exceeded.');
          },
          error: (err) => {
            this.paymentError.set(err.error?.error || (this.i18n.isRo() ? 'Eroare la procesarea plății' : 'Payment processing error'));
          }
        });
      } else if (cleanNum.endsWith('3220')) {
        this.show3DSModal.set(true);
      } else {
        this.confirmPaymentDirectly();
      }
    }, 700);
  }

  cancel3DS() {
    this.show3DSModal.set(false);
    this.paymentError.set(this.i18n.isRo() ? 'Autentificarea 3D-Secure a fost anulată.' : '3D-Secure authentication was cancelled.');
  }

  confirmPaymentDirectly() {
    this.processing.set(true);
    const last4 = this.cardLast4();
    this.orderService.confirmStripePayment({
      orderNumber: this.orderId(),
      paymentIntentId: this.pi() || `pi_test_${Date.now()}`,
      status: 'succeeded',
      cardLast4: last4,
      cardBrand: last4.startsWith('4') ? 'Visa' : 'Mastercard'
    }).subscribe({
      next: () => {
        this.processing.set(false);
        this.router.navigate(['/checkout/confirmare'], { queryParams: { orderId: this.orderId() } });
      },
      error: (err) => {
        this.processing.set(false);
        this.paymentError.set(err.error?.error || (this.i18n.isRo() ? 'Eroare la autorizarea plății' : 'Payment authorization error'));
      }
    });
  }

  confirm3DS() {
    this.authenticating3DS.set(true);
    const last4 = this.cardLast4();

    this.orderService.confirmStripePayment({
      orderNumber: this.orderId(),
      paymentIntentId: this.pi() || `pi_test_${Date.now()}`,
      status: 'succeeded',
      cardLast4: last4,
      cardBrand: 'Mastercard 3DS'
    }).subscribe({
      next: () => {
        this.authenticating3DS.set(false);
        this.show3DSModal.set(false);
        this.router.navigate(['/checkout/confirmare'], { queryParams: { orderId: this.orderId() } });
      },
      error: (err) => {
        this.authenticating3DS.set(false);
        this.show3DSModal.set(false);
        this.paymentError.set(err.error?.error || (this.i18n.isRo() ? 'Eroare la validarea 3D-Secure.' : 'Error validating 3D-Secure.'));
      }
    });
  }
}
