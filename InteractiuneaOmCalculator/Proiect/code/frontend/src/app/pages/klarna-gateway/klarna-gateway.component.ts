import { Component, inject, signal, OnInit, computed } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../services/order.service';
import { PaymentStamper3dComponent } from '../../components/ui/payment-stamper-3d.component';

@Component({
  selector: 'app-klarna-gateway',
  standalone: true,
  imports: [CommonModule, FormsModule, PaymentStamper3dComponent],
  template: `
    <div class="min-h-screen bg-[#faf5f6] text-slate-900 py-12 px-4 sm:px-6 font-sans">
      <div class="max-w-xl mx-auto space-y-6">
        
        <!-- Klarna Branded Header -->
        <div class="bg-white rounded-3xl shadow-sm border border-[#ffd3df] p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div class="flex items-center gap-3.5">
            <div class="w-14 h-9 rounded-xl bg-[#FFB3C7] text-black font-black text-xl flex items-center justify-center tracking-tighter px-2 select-none shadow-xs">
              Klarna.
            </div>
            <div>
              <div class="flex items-center gap-2">
                <span class="font-bold text-base text-slate-900">Vexera Checkout</span>
                <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#fff0f4] text-[#b82a4d] border border-[#ffb3c7]">
                  0% Dobândă
                </span>
              </div>
              <div class="text-xs text-slate-500">
                Plătește în 3 rate fără costuri suplimentare
              </div>
            </div>
          </div>

          <div class="sm:text-right border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100">
            <div class="text-[11px] text-slate-400 uppercase font-semibold">Total de plată</div>
            <div class="text-2xl font-black text-slate-900 tabular-nums">
              {{ totalAmount() }} <span class="text-sm font-bold text-slate-600">lei</span>
            </div>
            <div class="text-[11px] text-slate-400 tabular-nums">Comandă: {{ orderId() }}</div>
          </div>
        </div>

        <!-- 3-Installments Schedule Banner -->
        <div class="bg-white rounded-2xl border border-[#ffd3df] p-5 shadow-xs space-y-3">
          <div class="flex items-center justify-between text-xs font-semibold text-slate-700">
            <span>Grafic de rambursare Klarna:</span>
            <span class="text-[#b82a4d] font-bold">3 rate × {{ installmentAmount() }} lei</span>
          </div>

          <div class="grid grid-cols-3 gap-2.5 text-center text-xs">
            <div class="p-3 rounded-xl bg-[#fff0f4] border border-[#ffb3c7]">
              <span class="text-[10px] uppercase font-bold text-[#b82a4d] block">Azi (Rata 1)</span>
              <strong class="text-sm font-extrabold text-slate-900 tabular-nums block mt-0.5">{{ installmentAmount() }} lei</strong>
              <span class="text-[9px] text-emerald-600 font-bold">Autorizare instant</span>
            </div>

            <div class="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span class="text-[10px] uppercase font-bold text-slate-500 block">+30 Zile (Rata 2)</span>
              <strong class="text-sm font-extrabold text-slate-900 tabular-nums block mt-0.5">{{ installmentAmount() }} lei</strong>
              <span class="text-[9px] text-slate-400">{{ dueDate(30) }}</span>
            </div>

            <div class="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span class="text-[10px] uppercase font-bold text-slate-500 block">+60 Zile (Rata 3)</span>
              <strong class="text-sm font-extrabold text-slate-900 tabular-nums block mt-0.5">{{ installmentAmount() }} lei</strong>
              <span class="text-[9px] text-slate-400">{{ dueDate(60) }}</span>
            </div>
          </div>
        </div>

        <!-- Step-by-Step Interactive Flow -->
        @if (currentStep() === 'verify') {
          <div class="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 sm:p-8 space-y-5">
            
            <div class="space-y-1">
              <h2 class="text-base font-bold text-slate-900">
                Verificare Identitate Klarna (SMS)
              </h2>
              <p class="text-xs text-slate-500">
                Am transmis un cod securizat din 6 cifre pe numărul tău de telefon.
              </p>
            </div>

            <div class="space-y-3">
              <div class="flex items-center gap-2">
                <input 
                  type="text" 
                  [(ngModel)]="smsCode" 
                  maxlength="6"
                  placeholder="ex: 784291"
                  class="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-center text-lg font-mono font-bold tracking-widest text-slate-900 focus:outline-none focus:border-[#FFB3C7] focus:ring-2 focus:ring-[#FFB3C7]/40">
                
                <button 
                  type="button"
                  (click)="fillTestCode()"
                  class="px-3.5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-300 text-xs font-semibold text-slate-800 transition-colors whitespace-nowrap cursor-pointer">
                  Cod Test
                </button>
              </div>

              <button 
                type="button"
                (click)="verifyCode()"
                [disabled]="smsCode.length < 4 || isProcessing()"
                class="w-full py-3.5 px-4 rounded-xl bg-[#FFB3C7] hover:bg-[#ffa0b8] text-black font-extrabold text-xs uppercase tracking-wider transition-all disabled:opacity-40 flex items-center justify-center gap-2 shadow-sm cursor-pointer active:scale-98">
                @if (isProcessing()) {
                  <div class="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                  <span>Verificare autorizare...</span>
                } @else {
                  <span>Aprobă & Continuă spre Plată →</span>
                }
              </button>
            </div>

            <div class="pt-3 border-t border-slate-100 flex items-center justify-center gap-2 text-[11px] text-slate-400">
              <svg class="w-3.5 h-3.5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
              </svg>
              <span>Protecție avansată a datelor • Klarna Bank AB (publ)</span>
            </div>

          </div>
        } @else if (currentStep() === 'approval') {
          <div class="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 sm:p-8 space-y-6">
            
            <div class="text-center space-y-2">
              <div class="w-12 h-12 rounded-full bg-[#fff0f4] text-[#b82a4d] border border-[#ffb3c7] mx-auto flex items-center justify-center">
                <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
                </svg>
              </div>
              <h2 class="text-lg font-black text-slate-900">
                Eligibilitate Klarna Confirmată!
              </h2>
              <p class="text-xs text-slate-500 max-w-sm mx-auto">
                Aprobare instantanee pe loc. Te rugăm să ștampilezi acordul digital mai jos pentru finalizare.
              </p>
            </div>

            <!-- Tactile 3D Payment Stamper Integration -->
            <app-payment-stamper-3d
              [defaultStatus]="'KLARNA APROBAT'"
              [autoStamp]="true"
              (stamped)="onStamped()">
            </app-payment-stamper-3d>

            @if (stampApplied()) {
              <div class="pt-3">
                <button 
                  type="button"
                  (click)="completeOrder()"
                  class="w-full py-3.5 px-4 rounded-xl bg-black hover:bg-slate-800 text-white font-extrabold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer animate-bounce">
                  <span>Finalizează Comanda & Vezi Bonul 3D →</span>
                </button>
              </div>
            }

          </div>
        }

      </div>
    </div>
  `
})
export class KlarnaGatewayComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private orderService = inject(OrderService);

  orderId = signal<string>('VEX-2026-0042');
  totalAmount = signal<number>(849.00);
  plan = signal<string>('pay_in_3');

  currentStep = signal<'verify' | 'approval'>('verify');
  smsCode: string = '';
  isProcessing = signal<boolean>(false);
  stampApplied = signal<boolean>(false);

  installmentAmount = computed(() => {
    return +(this.totalAmount() / 3).toFixed(2);
  });

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['orderId']) this.orderId.set(params['orderId']);
      if (params['amount']) this.totalAmount.set(parseFloat(params['amount']) || 849.00);
      if (params['plan']) this.plan.set(params['plan']);
    });
  }

  dueDate(days: number): string {
    const d = new Date(Date.now() + days * 24 * 60 * 60 * 1000);
    return d.toLocaleDateString('ro-RO', { day: 'numeric', month: 'short' });
  }

  fillTestCode() {
    this.smsCode = '784291';
  }

  verifyCode() {
    this.isProcessing.set(true);
    setTimeout(() => {
      this.isProcessing.set(false);
      this.currentStep.set('approval');
    }, 700);
  }

  onStamped() {
    this.stampApplied.set(true);
  }

  completeOrder() {
    const orderNum = this.orderId();
    this.orderService.confirmKlarnaPayment({
      orderNumber: orderNum,
      status: 'authorized',
      plan: this.plan()
    }).subscribe(() => {
      this.router.navigate(['/checkout/confirmare'], { queryParams: { orderId: orderNum } });
    });
  }
}
