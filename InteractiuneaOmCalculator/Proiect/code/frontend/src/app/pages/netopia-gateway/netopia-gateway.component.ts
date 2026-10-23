import { Component, inject, signal, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../../services/order.service';
import { TranslationService } from '../../services/translation.service';
import { AudioFeedbackService } from '../../services/audio-feedback.service';

@Component({
  selector: 'app-netopia-gateway',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="min-h-screen bg-canvas text-text-primary py-12 px-4 sm:px-6 font-sans">
      <div class="max-w-xl mx-auto space-y-6">
        
        <!-- Netopia Header Card -->
        <div class="bg-surface rounded-2xl shadow-sm border border-border p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-[#001738] text-white flex items-center justify-center font-bold text-lg tracking-tighter shadow-xs border border-blue-900/40">
              N
            </div>
            <div>
              <div class="flex items-center gap-2">
                <span class="font-extrabold text-base text-text-primary tracking-tight">NETOPIA</span>
                <span class="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-950/40 text-emerald-400 border border-emerald-800/40">
                  PAYMENTS 3D-SECURE
                </span>
              </div>
              <div class="text-xs text-text-muted">
                {{ i18n.isRo() ? 'Poartă de Plată Securizată pentru' : 'Secure Payment Gateway for' }} <strong class="text-text-primary">S.C. VEXERA HARDWARE S.R.L.</strong>
              </div>
            </div>
          </div>

          <div class="sm:text-right border-t sm:border-t-0 pt-3 sm:pt-0 border-border">
            <div class="text-[11px] text-text-muted uppercase font-semibold">{{ i18n.isRo() ? 'Sumă de plată' : 'Amount due' }}</div>
            <div class="text-2xl font-black text-text-primary tabular-nums">
              {{ amount() }} <span class="text-sm font-bold text-text-muted">{{ i18n.currencyLabel() }}</span>
            </div>
            <div class="text-[11px] tabular-nums text-text-muted">{{ i18n.isRo() ? 'Comandă:' : 'Order:' }} {{ orderId() }}</div>
          </div>
        </div>

        <!-- Sandbox Scenario Box -->
        <div class="bg-surface-elevated border border-border rounded-xl p-4 text-xs space-y-2 text-text-secondary">
          <div class="font-semibold flex items-center gap-1.5 text-text-primary">
            <svg class="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <span>{{ i18n.isRo() ? 'Mediu de Test Netopia Sandbox • Selectează un scenariu de card:' : 'Netopia Sandbox Test Environment • Select card scenario:' }}</span>
          </div>
          <div class="flex flex-wrap gap-2 pt-1 text-[11px]">
            <button 
              type="button"
              (click)="fillTestCard('visa_success')"
              class="px-2.5 py-1.5 rounded-lg bg-surface border border-border hover:bg-surface-sunken text-text-primary font-medium transition-colors shadow-2xs cursor-pointer">
              {{ i18n.isRo() ? 'Visa 3DS (Plată Reușită)' : 'Visa 3DS (Successful Payment)' }}
            </button>
            <button 
              type="button"
              (click)="fillTestCard('mastercard_success')"
              class="px-2.5 py-1.5 rounded-lg bg-surface border border-border hover:bg-surface-sunken text-text-primary font-medium transition-colors shadow-2xs cursor-pointer">
              {{ i18n.isRo() ? 'Mastercard BT (Plată Reușită)' : 'Mastercard BT (Successful Payment)' }}
            </button>
            <button 
              type="button"
              (click)="fillTestCard('insufficient_funds')"
              class="px-2.5 py-1.5 rounded-lg bg-surface border border-rose-800/40 hover:bg-rose-950/20 text-rose-400 font-medium transition-colors shadow-2xs cursor-pointer">
              {{ i18n.isRo() ? 'Card Refuzat (Fonduri Insuficiente)' : 'Card Declined (Insufficient Funds)' }}
            </button>
          </div>
        </div>

        <!-- Main Payment Form Card -->
        <div class="bg-surface rounded-2xl shadow-sm border border-border p-6 sm:p-8 space-y-6">
          <div class="flex items-center justify-between border-b border-border pb-4">
            <h2 class="text-xs font-bold text-text-primary uppercase tracking-wide">
              {{ i18n.isRo() ? 'Introduceți Datele Cardului Bancar' : 'Enter Card Payment Details' }}
            </h2>
            <div class="flex items-center gap-2">
              <span class="text-xs font-bold text-accent italic">VISA</span>
              <span class="text-xs font-bold text-amber-500">mastercard</span>
            </div>
          </div>

          @if (paymentError()) {
            <div class="p-4 rounded-xl bg-rose-950/20 border border-rose-800/60 text-rose-300 text-xs space-y-1">
              <strong class="font-bold flex items-center gap-1.5 text-rose-200">
                <svg class="w-4 h-4 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                {{ i18n.isRo() ? 'Tranzacție Neautorizată:' : 'Transaction Declined:' }}
              </strong>
              <p>{{ paymentError() }}</p>
            </div>
          }

          <form (ngSubmit)="initiateAuthorization()" class="space-y-4 text-xs">
            <div class="space-y-1">
              <label class="text-text-secondary font-semibold uppercase text-[10px] tracking-wider">
                {{ i18n.isRo() ? 'Nume și Prenume Posesor Card' : 'Cardholder Full Name' }}
              </label>
              <input 
                type="text" 
                [(ngModel)]="cardholderName" 
                name="cardholderName"
                [placeholder]="i18n.isRo() ? 'ex: BOGDAN IONESCU' : 'e.g.: BOGDAN IONESCU'"
                class="w-full bg-surface-sunken border border-border rounded-xl px-3.5 py-2.5 text-text-primary focus:bg-surface focus:outline-none focus:border-accent text-xs">
            </div>

            <div class="space-y-1">
              <label class="text-text-secondary font-semibold uppercase text-[10px] tracking-wider">
                {{ i18n.isRo() ? 'Număr Card (16 cifre)' : 'Card Number (16 digits)' }}
              </label>
              <div class="relative">
                <input 
                  type="text" 
                  [(ngModel)]="cardNumber" 
                  name="cardNumber"
                  (input)="formatCardNumber()"
                  maxlength="19"
                  placeholder="4000 0000 0000 4242"
                  class="w-full bg-surface-sunken border border-border rounded-xl px-3.5 py-2.5 text-text-primary focus:bg-surface focus:outline-none focus:border-accent text-xs tracking-wider tabular-nums">
                <svg class="w-5 h-5 text-text-muted absolute right-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <rect x="2" y="5" width="20" height="14" rx="2" stroke-width="1.5"/>
                  <line x1="2" y1="10" x2="22" y2="10" stroke-width="1.5"/>
                </svg>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div class="space-y-1">
                <label class="text-text-secondary font-semibold uppercase text-[10px] tracking-wider">
                  {{ i18n.isRo() ? 'Data Expirării' : 'Expiry Date' }}
                </label>
                <input 
                  type="text" 
                  [(ngModel)]="expiry" 
                  name="expiry"
                  maxlength="5"
                  [placeholder]="i18n.isRo() ? 'LL / AA (ex: 12/28)' : 'MM / YY (e.g. 12/28)'"
                  class="w-full bg-surface-sunken border border-border rounded-xl px-3.5 py-2.5 text-text-primary focus:bg-surface focus:outline-none focus:border-accent text-xs text-center tabular-nums">
              </div>

              <div class="space-y-1">
                <label class="text-text-secondary font-semibold uppercase text-[10px] tracking-wider">
                  {{ i18n.isRo() ? 'Cod Securitate (CVV2)' : 'Security Code (CVV2)' }}
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
                  <span>{{ i18n.isRo() ? 'Se conectează la banca emitentă...' : 'Connecting to issuing bank...' }}</span>
                } @else {
                  <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                  </svg>
                  <span>{{ i18n.isRo() ? 'Plătește în Siguranță ' + amount() + ' ' + i18n.currencyLabel() : 'Pay Securely ' + amount() + ' ' + i18n.currencyLabel() }}</span>
                }
              </button>
            </div>
          </form>

          <div class="pt-4 border-t border-border flex flex-wrap items-center justify-between text-[11px] text-text-muted">
            <span>{{ i18n.isRo() ? 'Conexiune criptată TLS 1.3 / AES-256' : 'TLS 1.3 / AES-256 Encrypted Connection' }}</span>
            <span>{{ i18n.isRo() ? 'Certificat PCI-DSS Nivel 1' : 'PCI-DSS Level 1 Certified' }}</span>
          </div>
        </div>

        <!-- 3D-Secure Modal -->
        @if (show3DSModal()) {
          <div class="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div class="bg-surface rounded-2xl shadow-2xl border border-border max-w-md w-full p-6 space-y-5">
              <div class="flex items-center justify-between border-b border-border pb-3">
                <div class="flex items-center gap-2">
                  <span class="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30 font-bold flex items-center justify-center text-xs">
                    BT
                  </span>
                  <div>
                    <h3 class="text-sm font-bold text-text-primary">Banca Transilvania 3D-Secure</h3>
                    <div class="text-[11px] text-text-muted">
                      {{ i18n.isRo() ? 'Autorizare Tranzacție Electronică' : 'Electronic Transaction Authorization' }}
                    </div>
                  </div>
                </div>
                <span class="text-xs font-bold text-text-primary tabular-nums">{{ amount() }} {{ i18n.currencyLabel() }}</span>
              </div>

              <div class="space-y-3 text-xs text-text-secondary">
                <p>
                  {{ i18n.isRo() ? 'Pentru siguranța contului dumneavoastră, autorizați plata de ' + amount() + ' ' + i18n.currencyLabel() + ' către comerciantul S.C. VEXERA HARDWARE S.R.L.' : 'For your security, please authorize the payment of ' + amount() + ' ' + i18n.currencyLabel() + ' to merchant S.C. VEXERA HARDWARE S.R.L.' }}
                </p>

                <div class="p-3 bg-surface-sunken rounded-xl border border-border space-y-1 text-[11px] tabular-nums">
                  <div>{{ i18n.isRo() ? 'Comerciant:' : 'Merchant:' }} <strong class="text-text-primary">S.C. VEXERA HARDWARE S.R.L.</strong></div>
                  <div>{{ i18n.isRo() ? 'Data:' : 'Date:' }} <strong class="text-text-primary">{{ getCurrentFormattedDate() }}</strong></div>
                  <div>Card: <strong class="text-text-primary">•••• •••• •••• {{ cardLast4() }}</strong></div>
                </div>

                <div class="space-y-1.5 pt-1">
                  <label class="font-bold text-text-primary">
                    {{ i18n.isRo() ? 'Cod Unic SMS / Push Notification:' : 'One-Time SMS Code / Push Notification:' }}
                  </label>
                  <input 
                    type="text" 
                    [(ngModel)]="smsCode" 
                    placeholder="123456" 
                    class="w-full bg-surface-sunken border border-border rounded-xl px-4 py-2 text-center text-sm tracking-widest tabular-nums font-bold text-text-primary focus:outline-none focus:border-accent">
                  <div class="text-[10px] text-text-muted text-center">
                    {{ i18n.isRo() ? '(Pentru simulare, codul 123456 este completat automat)' : '(For simulation, code 123456 is pre-filled)' }}
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
                    <span>{{ i18n.isRo() ? 'Se confirmă...' : 'Confirming...' }}</span>
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
export class NetopiaGatewayComponent implements OnInit {
  route = inject(ActivatedRoute);
  router = inject(Router);
  orderService = inject(OrderService);
  i18n = inject(TranslationService);
  audio = inject(AudioFeedbackService);

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

  getCurrentFormattedDate(): string {
    return new Date().toLocaleDateString(this.i18n.isRo() ? 'ro-RO' : 'en-US');
  }

  cardLast4() {
    const raw = this.cardNumber.replace(/\s+/g, '');
    return raw.slice(-4) || '4242';
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.orderId.set(params['orderId'] || 'VEX-2026-DEMO');
      this.amount.set(params['amount'] ? Number(params['amount']).toFixed(2) : '469.00');
      this.token.set(params['token'] || '');
    });
  }

  fillTestCard(type: 'visa_success' | 'mastercard_success' | 'insufficient_funds') {
    this.audio.play('click');
    this.paymentError.set(null);
    if (type === 'visa_success') {
      this.cardNumber = '4000 0000 0000 4242';
      this.cardholderName = this.i18n.isRo() ? 'BOGDAN IONESCU' : 'JOHN MILLER';
      this.expiry = '12/28';
      this.cvv = '424';
    } else if (type === 'mastercard_success') {
      this.cardNumber = '5100 0000 0000 5555';
      this.cardholderName = this.i18n.isRo() ? 'ANDREI POPESCU' : 'ANDREW TAYLOR';
      this.expiry = '09/27';
      this.cvv = '555';
    } else {
      this.cardNumber = '4000 0000 0000 0002';
      this.cardholderName = this.i18n.isRo() ? 'TEST CARD REFUZAT' : 'DECLINED TEST CARD';
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
    this.audio.play('switch');
    this.paymentError.set(null);
    this.processing.set(true);

    setTimeout(() => {
      this.processing.set(false);
      const cleanNum = this.cardNumber.replace(/\s+/g, '');

      if (cleanNum.endsWith('0002')) {
        this.audio.play('beep');
        this.orderService.simulateNetopiaCallback(this.orderId(), 'rejected', '0002', 'Banca Transilvania').subscribe({
          next: () => {
            this.paymentError.set(
              this.i18n.isRo() 
                ? 'Tranzacție respinsă de banca emitentă: Fonduri insuficiente sau limită depășită.' 
                : 'Transaction declined by issuing bank: Insufficient funds or card limit exceeded.'
            );
          },
          error: (err) => {
            this.paymentError.set(err.error?.error || (this.i18n.isRo() ? 'Eroare la procesarea plății' : 'Error processing payment'));
          }
        });
      } else {
        this.audio.play('mount');
        this.show3DSModal.set(true);
      }
    }, 800);
  }

  cancel3DS() {
    this.audio.play('beep');
    this.show3DSModal.set(false);
    this.paymentError.set(
      this.i18n.isRo() 
        ? 'Autentificarea 3D-Secure a fost anulată de către utilizator.' 
        : '3D-Secure authentication was cancelled by user.'
    );
  }

  confirm3DS() {
    this.audio.play('click');
    this.authenticating3DS.set(true);

    const last4 = this.cardLast4();
    const bank = last4.startsWith('5') ? 'ING Bank România' : 'Banca Transilvania';

    this.orderService.simulateNetopiaCallback(this.orderId(), 'confirmed', last4, bank).subscribe({
      next: () => {
        this.audio.play('stamp');
        this.authenticating3DS.set(false);
        this.show3DSModal.set(false);
        this.router.navigate(['/checkout/confirmare'], { queryParams: { orderId: this.orderId() } });
      },
      error: (err) => {
        this.audio.play('beep');
        this.authenticating3DS.set(false);
        this.show3DSModal.set(false);
        this.paymentError.set(err.error?.error || (this.i18n.isRo() ? 'Eroare la validarea 3D-Secure.' : 'Error validating 3D-Secure.'));
      }
    });
  }
}
