import { Component, inject, signal, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-netopia-gateway',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="min-h-screen bg-[#f8fafc] text-slate-800 py-12 px-4 sm:px-6 font-sans">
      <div class="max-w-2xl mx-auto space-y-6">
        
        <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 rounded-xl bg-[#001738] text-white flex items-center justify-center font-bold text-xl tracking-tighter">
              N
            </div>
            <div>
              <div class="flex items-center gap-2">
                <span class="font-extrabold text-lg text-[#001738] tracking-tight">NETOPIA</span>
                <span class="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300">
                  PAYMENTS 3D-SECURE
                </span>
              </div>
              <div class="text-xs text-slate-500">
                Poartă de Plată Securizată pentru <strong class="text-slate-700">KILOWATT LABS SRL</strong>
              </div>
            </div>
          </div>

          <div class="sm:text-right border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100">
            <div class="text-xs text-slate-500 uppercase">Sumă de plată</div>
            <div class="text-2xl font-black text-slate-900 tabular-nums">
              {{ amount() }} <span class="text-sm font-bold text-slate-600">RON</span>
            </div>
            <div class="text-[11px] tabular-nums text-slate-400">Comandă: {{ orderId() }}</div>
          </div>
        </div>

        <div class="bg-blue-50 border border-blue-200 rounded-xl p-4 text-xs space-y-2 text-blue-900">
          <div class="font-bold flex items-center gap-1.5 text-blue-800">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <span>Mediu de Test Netopia Sandbox • Selectează un scenariu de card:</span>
          </div>
          <div class="flex flex-wrap gap-2 pt-1 text-[11px]">
            <button 
              type="button"
              (click)="fillTestCard('visa_success')"
              class="px-2.5 py-1.5 rounded-lg bg-white border border-blue-300 hover:bg-blue-100 text-blue-950 font-medium transition-colors shadow-xs">
              Visa 3DS (Plată Reușită)
            </button>
            <button 
              type="button"
              (click)="fillTestCard('mastercard_success')"
              class="px-2.5 py-1.5 rounded-lg bg-white border border-blue-300 hover:bg-blue-100 text-blue-950 font-medium transition-colors shadow-xs">
              Mastercard BT (Plată Reușită)
            </button>
            <button 
              type="button"
              (click)="fillTestCard('insufficient_funds')"
              class="px-2.5 py-1.5 rounded-lg bg-white border border-red-200 hover:bg-red-50 text-red-700 font-medium transition-colors shadow-xs">
              Card Refuzat (Fonduri Insuficiente)
            </button>
          </div>
        </div>

        <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8 space-y-6">
          <div class="flex items-center justify-between border-b border-slate-100 pb-4">
            <h2 class="text-sm font-bold text-slate-800 uppercase tracking-wide">
              Introduceți Datele Cardului Bancar
            </h2>
            <div class="flex items-center gap-2">
              <span class="text-xs font-bold text-blue-800 italic">VISA</span>
              <span class="text-xs font-bold text-red-600">mastercard</span>
            </div>
          </div>

          @if (paymentError()) {
            <div class="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs space-y-1">
              <strong class="font-bold flex items-center gap-1.5">
                <svg class="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                Tranzacție Neautorizată:
              </strong>
              <p>{{ paymentError() }}</p>
            </div>
          }

          <form (ngSubmit)="initiateAuthorization()" class="space-y-4 text-xs">
            <div class="space-y-1">
              <label class="text-slate-600 font-semibold uppercase text-[11px]">Nume și Prenume Posesor Card</label>
              <input 
                type="text" 
                [(ngModel)]="cardholderName" 
                name="cardholderName"
                placeholder="ex: BOGDAN IONESCU"
                class="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-slate-900 focus:bg-white focus:outline-none focus:border-blue-600 text-sm">
            </div>

            <div class="space-y-1">
              <label class="text-slate-600 font-semibold uppercase text-[11px]">Număr Card (16 cifre)</label>
              <div class="relative">
                <input 
                  type="text" 
                  [(ngModel)]="cardNumber" 
                  name="cardNumber"
                  (input)="formatCardNumber()"
                  maxlength="19"
                  placeholder="4000 0000 0000 4242"
                  class="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-slate-900 focus:bg-white focus:outline-none focus:border-blue-600 text-sm tracking-wider tabular-nums">
                <svg class="w-5 h-5 text-slate-400 absolute right-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
                </svg>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div class="space-y-1">
                <label class="text-slate-600 font-semibold uppercase text-[11px]">Data Expirării</label>
                <input 
                  type="text" 
                  [(ngModel)]="expiry" 
                  name="expiry"
                  maxlength="5"
                  placeholder="LL / AA (ex: 12/28)"
                  class="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-slate-900 focus:bg-white focus:outline-none focus:border-blue-600 text-sm text-center tabular-nums">
              </div>

              <div class="space-y-1">
                <label class="text-slate-600 font-semibold uppercase text-[11px]">Cod Securitate (CVV2)</label>
                <input 
                  type="password" 
                  [(ngModel)]="cvv" 
                  name="cvv"
                  maxlength="4"
                  placeholder="•••"
                  class="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-slate-900 focus:bg-white focus:outline-none focus:border-blue-600 text-sm text-center tracking-widest tabular-nums">
              </div>
            </div>

            <div class="pt-4">
              <button 
                type="submit"
                [disabled]="processing()"
                class="w-full py-3.5 px-4 rounded-xl bg-[#001738] hover:bg-[#002456] text-white font-bold text-sm tracking-wider shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50">
                @if (processing()) {
                  <div class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Se conectează la banca emitentă...</span>
                } @else {
                  <svg class="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                  </svg>
                  <span>Plătește în Siguranță {{ amount() }} RON</span>
                }
              </button>
            </div>
          </form>

          <div class="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between text-[11px] text-slate-400">
            <span>Conexiune criptată TLS 1.3 / AES-256</span>
            <span>Certificat PCI-DSS Nivel 1</span>
          </div>
        </div>

        @if (show3DSModal()) {
          <div class="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div class="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-md w-full p-6 space-y-5 animate-scale-up">
              <div class="flex items-center justify-between border-b border-slate-100 pb-3">
                <div class="flex items-center gap-2">
                  <span class="w-8 h-8 rounded-lg bg-amber-500 text-white font-bold flex items-center justify-center text-xs">
                    BT
                  </span>
                  <div>
                    <h3 class="text-sm font-bold text-slate-900">Banca Transilvania 3D-Secure</h3>
                    <div class="text-[11px] text-slate-500">Autorizare Tranzacție Electronică</div>
                  </div>
                </div>
                <span class="text-xs font-bold text-slate-700 tabular-nums">{{ amount() }} RON</span>
              </div>

              <div class="space-y-3 text-xs text-slate-600">
                <p>
                  Pentru siguranța contului dumneavoastră, autorizați plata de <strong>{{ amount() }} RON</strong> către comerciantul <strong>KILOWATT LABS SRL</strong>.
                </p>

                <div class="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1 text-[11px] tabular-nums">
                  <div>Comerciant: <strong>KILOWATT LABS SRL</strong></div>
                  <div>Data: <strong>{{ currentDate }}</strong></div>
                  <div>Card: <strong>•••• •••• •••• {{ cardLast4() }}</strong></div>
                </div>

                <div class="space-y-2 pt-2">
                  <label class="font-bold text-slate-700">Cod Unic SMS / Push Notification:</label>
                  <input 
                    type="text" 
                    [(ngModel)]="smsCode" 
                    placeholder="123456" 
                    class="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2 text-center text-base tracking-widest font-bold text-slate-900 focus:outline-none focus:border-blue-600 tabular-nums">
                  <div class="text-[10px] text-slate-400 text-center">
                    (Pentru simulare, codul 123456 este completat automat)
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
                  class="flex-1 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors shadow-sm flex items-center justify-center gap-2">
                  @if (authenticating3DS()) {
                    <div class="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Se confirmă...</span>
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
export class NetopiaGatewayComponent implements OnInit {
  route = inject(ActivatedRoute);
  router = inject(Router);
  orderService = inject(OrderService);

  orderId = signal<string>('');
  amount = signal<string>('0.00');
  token = signal<string>('');

  cardholderName = 'BOGDAN IONESCU';
  cardNumber = '4000 0000 0000 4242';
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
      this.orderId.set(params['orderId'] || 'KWT-2026-DEMO');
      this.amount.set(params['amount'] ? Number(params['amount']).toFixed(2) : '469.00');
      this.token.set(params['token'] || '');
    });
  }

  fillTestCard(type: 'visa_success' | 'mastercard_success' | 'insufficient_funds') {
    this.paymentError.set(null);
    if (type === 'visa_success') {
      this.cardNumber = '4000 0000 0000 4242';
      this.cardholderName = 'BOGDAN IONESCU';
      this.expiry = '12/28';
      this.cvv = '424';
    } else if (type === 'mastercard_success') {
      this.cardNumber = '5100 0000 0000 5555';
      this.cardholderName = 'ANDREI POPESCU';
      this.expiry = '09/27';
      this.cvv = '555';
    } else {
      this.cardNumber = '4000 0000 0000 0002';
      this.cardholderName = 'TEST CARD REFUZAT';
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

  initiateAuthorization() {
    this.paymentError.set(null);
    this.processing.set(true);

    setTimeout(() => {
      this.processing.set(false);
      const cleanNum = this.cardNumber.replace(/\s+/g, '');

      if (cleanNum.endsWith('0002')) {
                this.orderService.simulateNetopiaCallback(this.orderId(), 'rejected', '0002', 'Banca Transilvania').subscribe({
          next: () => {
            this.paymentError.set('Tranzacție respinsă de banca emitentă: Fonduri insuficiente sau limită depășită.');
          },
          error: (err) => {
            this.paymentError.set(err.error?.error || 'Eroare la procesarea plății');
          }
        });
      } else {
                this.show3DSModal.set(true);
      }
    }, 800);
  }

  cancel3DS() {
    this.show3DSModal.set(false);
    this.paymentError.set('Autentificarea 3D-Secure a fost anulată de către utilizator.');
  }

  confirm3DS() {
    this.authenticating3DS.set(true);

    const last4 = this.cardLast4();
    const bank = last4.startsWith('5') ? 'ING Bank România' : 'Banca Transilvania';

    this.orderService.simulateNetopiaCallback(this.orderId(), 'confirmed', last4, bank).subscribe({
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
