import { Component, inject, signal, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-stripe-gateway',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="min-h-screen bg-[#f8fafc] text-slate-900 py-12 px-4 sm:px-6 font-sans">
      <div class="max-w-xl mx-auto space-y-6">
        
        <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-lg">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <rect x="4" y="4" width="16" height="16" rx="2" stroke-width="2"/>
                <rect x="9" y="9" width="6" height="6" stroke-width="2"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 15h3M1 9h3M1 15h3"/>
              </svg>
            </div>
            <div>
              <div class="flex items-center gap-2">
                <span class="font-extrabold text-base text-slate-900 tracking-tight">Vexera</span>
                <span class="text-[11px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                  Stripe Checkout
                </span>
              </div>
              <div class="text-xs text-slate-500">
                Poartă de Plată Securizată 256-bit SSL
              </div>
            </div>
          </div>

          <div class="sm:text-right border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100">
            <div class="text-[11px] text-slate-400 uppercase font-semibold">Total de plată</div>
            <div class="text-2xl font-black text-slate-900 tabular-nums">
              {{ amount() }} <span class="text-sm font-bold text-slate-600">lei</span>
            </div>
            <div class="text-[11px] text-slate-400 tabular-nums">Comandă: {{ orderId() }}</div>
          </div>
        </div>

        <div class="bg-slate-100 border border-slate-200 rounded-xl p-4 text-xs space-y-2 text-slate-800">
          <div class="font-semibold flex items-center gap-1.5 text-slate-800">
            <svg class="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <span>Mediu de Test Stripe • Selectează un scenariu de card:</span>
          </div>
          <div class="flex flex-wrap gap-2 pt-1 text-[11px]">
            <button 
              type="button"
              (click)="fillTestCard('visa_success')"
              class="px-2.5 py-1.5 rounded-lg bg-white border border-slate-300 hover:bg-slate-50 text-slate-900 font-medium transition-colors shadow-xs">
              Visa Test (Plată Reușită)
            </button>
            <button 
              type="button"
              (click)="fillTestCard('mastercard_3ds')"
              class="px-2.5 py-1.5 rounded-lg bg-white border border-slate-300 hover:bg-slate-50 text-slate-900 font-medium transition-colors shadow-xs">
              Mastercard 3DS (Autentificare Bancară)
            </button>
            <button 
              type="button"
              (click)="fillTestCard('card_declined')"
              class="px-2.5 py-1.5 rounded-lg bg-white border border-red-200 hover:bg-red-50 text-red-700 font-medium transition-colors shadow-xs">
              Card Refuzat (Fonduri Insuficiente)
            </button>
          </div>
        </div>

        <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8 space-y-6">
          
          <div>
            <div class="text-[11px] uppercase font-bold text-slate-400 mb-2">Plată Rapidă 1-Click</div>
            <button 
              type="button"
              (click)="payWithApplePay()"
              [disabled]="processing()"
              class="w-full py-2.5 px-4 rounded-xl bg-black hover:bg-slate-800 text-white font-medium text-xs flex items-center justify-center gap-2 transition-colors">
              <span class="font-bold text-sm">Pay</span>
              <span class="text-slate-400 text-xs">/ Google Pay</span>
            </button>
          </div>

          <div class="relative flex items-center justify-center">
            <div class="border-t border-slate-200 w-full"></div>
            <span class="bg-white px-3 text-[11px] text-slate-400 font-medium uppercase absolute">sau introdu datele cardului</span>
          </div>

          @if (paymentError()) {
            <div class="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs space-y-1">
              <strong class="font-bold flex items-center gap-1.5">
                <svg class="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                Plată Nereușită:
              </strong>
              <p>{{ paymentError() }}</p>
            </div>
          }

          <form (ngSubmit)="initiateAuthorization()" class="space-y-4 text-xs">
            <div class="space-y-1">
              <label class="text-slate-700 font-semibold">Nume și Prenume Posesor Card</label>
              <input 
                type="text" 
                [(ngModel)]="cardholderName" 
                name="cardholderName"
                placeholder="ex: Bogdan Ionescu"
                class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:bg-white focus:outline-none focus:border-slate-800 text-xs">
            </div>

            <div class="space-y-1">
              <div class="flex items-center justify-between">
                <label class="text-slate-700 font-semibold">Număr Card</label>
                <div class="flex items-center gap-1.5 text-slate-400">
                  <span class="text-[10px] font-bold text-blue-700">VISA</span>
                  <span class="text-[10px] font-bold text-red-600">MC</span>
                  <span class="text-[10px] font-bold text-slate-600">REVOLUT</span>
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
                  class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:bg-white focus:outline-none focus:border-slate-800 text-xs tracking-wider tabular-nums">
                <svg class="w-5 h-5 text-slate-400 absolute right-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <rect x="2" y="5" width="20" height="14" rx="2" stroke-width="1.5"/>
                  <line x1="2" y1="10" x2="22" y2="10" stroke-width="1.5"/>
                </svg>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div class="space-y-1">
                <label class="text-slate-700 font-semibold">Data Expirării</label>
                <input 
                  type="text" 
                  [(ngModel)]="expiry" 
                  name="expiry"
                  maxlength="5"
                  placeholder="LL / AA"
                  class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:bg-white focus:outline-none focus:border-slate-800 text-xs text-center tabular-nums">
              </div>

              <div class="space-y-1">
                <label class="text-slate-700 font-semibold">CVC / Cod Securitate</label>
                <input 
                  type="password" 
                  [(ngModel)]="cvv" 
                  name="cvv"
                  maxlength="4"
                  placeholder="•••"
                  class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:bg-white focus:outline-none focus:border-slate-800 text-xs text-center tracking-widest tabular-nums">
              </div>
            </div>

            <div class="pt-2">
              <button 
                type="submit"
                [disabled]="processing()"
                class="w-full py-3.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-all flex items-center justify-center gap-2 disabled:opacity-50">
                @if (processing()) {
                  <div class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Se procesează plata...</span>
                } @else {
                  <svg class="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                  </svg>
                  <span>Plătește în Siguranță {{ amount() }} lei</span>
                }
              </button>
            </div>
          </form>

          <div class="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between text-[11px] text-slate-400">
            <span>Powered by Stripe Payments</span>
            <span>Certificat PCI-DSS Level 1</span>
          </div>
        </div>

        @if (show3DSModal()) {
          <div class="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div class="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-md w-full p-6 space-y-5">
              <div class="flex items-center justify-between border-b border-slate-100 pb-3">
                <div class="flex items-center gap-2">
                  <div class="w-8 h-8 rounded-lg bg-slate-900 text-white font-bold flex items-center justify-center text-xs">
                    3DS
                  </div>
                  <div>
                    <h3 class="text-sm font-bold text-slate-900">Autentificare Securizată 3D-Secure</h3>
                    <div class="text-[11px] text-slate-500">Validare tranzacție bancară</div>
                  </div>
                </div>
                <span class="text-xs font-bold text-slate-900">{{ amount() }} lei</span>
              </div>

              <div class="space-y-3 text-xs text-slate-600">
                <p>
                  Pentru siguranța contului tău, autorizează plata de <strong>{{ amount() }} lei</strong> către <strong>CircuitLab</strong>.
                </p>

                <div class="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1 text-[11px]">
                  <div>Comerciant: <strong>CircuitLab</strong></div>
                  <div>Data: <strong>{{ currentDate }}</strong></div>
                  <div>Card: <strong>•••• •••• •••• {{ cardLast4() }}</strong></div>
                </div>

                <div class="space-y-1.5 pt-1">
                  <label class="font-bold text-slate-700">Cod Securitate SMS / Notificare bancă:</label>
                  <input 
                    type="text" 
                    [(ngModel)]="smsCode" 
                    placeholder="123456" 
                    class="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2 text-center text-sm tracking-widest tabular-nums font-bold text-slate-900 focus:outline-none focus:border-slate-800">
                  <div class="text-[10px] text-slate-400 text-center">
                    (Codul de test 123456 este completat automat)
                  </div>
                </div>
              </div>

              <div class="flex items-center gap-3 pt-2">
                <button 
                  type="button"
                  (click)="cancel3DS()"
                  class="flex-1 py-2.5 px-4 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs transition-colors">
                  Renunță
                </button>
                <button 
                  type="button"
                  (click)="confirm3DS()"
                  [disabled]="authenticating3DS()"
                  class="flex-1 py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors shadow-sm flex items-center justify-center gap-2">
                  @if (authenticating3DS()) {
                    <div class="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Se validează...</span>
                  } @else {
                    <span>Autorizează Plata</span>
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
  currentDate = new Date().toLocaleDateString('ro-RO');

  cardLast4() {
    const raw = this.cardNumber.replace(/\s+/g, '');
    return raw.slice(-4) || '4242';
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.orderId.set(params['orderId'] || 'CLB-DEMO');
      this.amount.set(params['amount'] ? Number(params['amount']).toFixed(2) : '469.00');
      this.pi.set(params['pi'] || '');
    });
  }

  fillTestCard(type: 'visa_success' | 'mastercard_3ds' | 'card_declined') {
    this.paymentError.set(null);
    if (type === 'visa_success') {
      this.cardNumber = '4242 4242 4242 4242';
      this.cardholderName = 'Bogdan Ionescu';
      this.expiry = '12/28';
      this.cvv = '424';
    } else if (type === 'mastercard_3ds') {
      this.cardNumber = '4000 0000 0000 3220';
      this.cardholderName = 'Andrei Popescu';
      this.expiry = '09/27';
      this.cvv = '555';
    } else {
      this.cardNumber = '4000 0000 0000 0002';
      this.cardholderName = 'Test Card Refuzat';
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
          this.paymentError.set(err.error?.error || 'Eroare la procesarea plății Apple Pay');
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
          errorMessage: 'Tranzacție refuzată de banca emitentă: Fonduri insuficiente.'
        }).subscribe({
          next: () => {
            this.paymentError.set('Cardul a fost refuzat: Fonduri insuficiente sau limită depășită.');
          },
          error: (err) => {
            this.paymentError.set(err.error?.error || 'Eroare la procesarea plății');
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
    this.paymentError.set('Autentificarea 3D-Secure a fost anulată.');
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
        this.paymentError.set(err.error?.error || 'Eroare la autorizarea plății');
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
        this.paymentError.set(err.error?.error || 'Eroare la validarea 3D-Secure.');
      }
    });
  }
}
