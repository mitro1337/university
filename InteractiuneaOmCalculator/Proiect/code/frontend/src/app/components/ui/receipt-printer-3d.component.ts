import { Component, input, signal, OnInit, OnDestroy, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderDetails } from '../../models/order.model';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-receipt-printer-3d',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="relative w-full max-w-md mx-auto my-6 select-none perspective-container">
      
      <!-- POS Machine 3D Chassis Top -->
      <div class="relative z-20 rounded-2xl bg-gradient-to-b from-[#1e232e] via-[#151922] to-[#0d1017] p-5 border border-slate-700/60 shadow-2xl overflow-hidden printer-bezel">
        <div class="flex items-center justify-between mb-3 border-b border-slate-800/80 pb-2.5">
          <div class="flex items-center gap-2.5">
            <div class="w-3 h-3 rounded-full border border-cyan-400/30 flex items-center justify-center">
              <span 
                class="w-1.5 h-1.5 rounded-full transition-all duration-300"
                [class.bg-cyan-400]="isPrinting()"
                [class.animate-ping]="isPrinting()"
                [class.bg-emerald-400]="!isPrinting() && isPrinted()"
                [class.bg-amber-400]="!isPrinting() && !isPrinted()">
              </span>
            </div>
            <span class="font-mono text-[10px] tracking-widest text-slate-300 font-bold uppercase">
              VEX-THERMAL POS // PRN-80
            </span>
          </div>

          <div class="flex items-center gap-2">
            <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400">
              {{ isPrinting() ? 'PRINTING...' : 'ONLINE' }}
            </span>
            <button 
              type="button"
              (click)="triggerPrintAnimation()"
              [disabled]="isPrinting()"
              class="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 border border-slate-600 text-white font-mono text-[10px] transition-all flex items-center gap-1 active:scale-95 disabled:opacity-40 cursor-pointer"
              title="Replay printing animation">
              <svg class="w-3 h-3" [class.animate-spin]="isPrinting()" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
              </svg>
              <span>Replay</span>
            </button>
          </div>
        </div>

        <div class="flex items-center justify-between text-[11px] text-slate-400 font-mono mb-2">
          <span>STATUS: {{ order()?.status?.toUpperCase() || 'PAID' }}</span>
          <span>ORD: {{ order()?.order_number || 'VEX-2026-X' }}</span>
        </div>

        <!-- Dispenser Slot Mouth with Metal Bevel -->
        <div class="relative w-full h-3.5 bg-black rounded-sm border-t border-b border-slate-950 shadow-inner overflow-hidden flex items-center justify-center">
          <div class="w-full h-[1px] bg-cyan-500/20 shadow-[0_0_8px_rgba(6,182,212,0.5)]"></div>
          <div class="absolute inset-x-2 top-0 h-[2px] bg-slate-800/80"></div>
        </div>
      </div>

      <!-- Thermal Paper Receipt Rolling Out -->
      <div 
        class="receipt-paper-wrapper relative mx-auto z-10 transition-all duration-700 ease-out origin-top"
        [class.is-collapsed]="!isPrinted() && !isPrinting()"
        [class.is-printing]="isPrinting()"
        [class.is-torn]="isTorn()">
        
        <div class="receipt-paper bg-[#fcfdfa] text-slate-900 font-mono p-6 sm:p-7 shadow-2xl border-x border-slate-300 rounded-b-xs relative">
          
          <!-- Subtle Paper Texture & Top Shadow -->
          <div class="absolute inset-x-0 top-0 h-4 bg-gradient-to-b from-black/25 to-transparent pointer-events-none"></div>

          <!-- Header -->
          <div class="text-center space-y-1 border-b border-dashed border-slate-400 pb-4 mb-4">
            <div class="font-extrabold text-sm tracking-wider uppercase text-slate-950">
              * VEXERA CYBERSTORE *
            </div>
            <div class="text-[10px] text-slate-600">
              HARDWARE PENTEST & HOMELAB RO
            </div>
            <div class="text-[9px] text-slate-500">
              BUCHAREST DATACENTER HUB // CIF: RO48920192
            </div>
            <div class="text-[10px] font-bold text-slate-800 pt-1">
              FISCAL RECEIPT / NOTĂ LIVRARE
            </div>
          </div>

          <!-- Order Metadata -->
          <div class="text-[10px] space-y-1 border-b border-dashed border-slate-400 pb-3 mb-3 text-slate-700">
            <div class="flex justify-between">
              <span>ORDER NO:</span>
              <strong class="text-slate-950 font-bold">{{ order()?.order_number || 'VEX-2026-0042' }}</strong>
            </div>
            <div class="flex justify-between">
              <span>DATE / TIME:</span>
              <span>{{ printDate() }}</span>
            </div>
            <div class="flex justify-between">
              <span>CLIENT:</span>
              <span class="truncate max-w-[170px] text-right font-medium">{{ order()?.guest_name || 'Anonymous Engineer' }}</span>
            </div>
            <div class="flex justify-between">
              <span>DISPATCH:</span>
              <span>{{ order()?.delivery_method === 'easybox' ? 'SAMEDAY EASYBOX' : 'SAMEDAY 24H COURIER' }}</span>
            </div>
          </div>

              <!-- Klarna Special BNPL Schedule Highlight -->
              @if (isKlarna()) {
                <div class="p-2.5 rounded bg-[#fff0f4] border border-[#FFB3C7] my-3 space-y-1.5 text-[10px]">
                  <div class="flex items-center justify-between text-black font-extrabold">
                    <span class="px-1.5 py-0.5 rounded bg-[#FFB3C7] text-[9px] tracking-tight">Klarna.</span>
                    <span class="text-[10px] text-[#e04369]">BUY NOW, PAY LATER (3x)</span>
                  </div>
                  <div class="divide-y divide-[#ffd3df] pt-1">
                    <div class="flex justify-between py-0.5 text-emerald-700 font-bold">
                      <span>{{ i18n.isRo() ? '[✓] RATA 1/3 (ACHITAT AZI):' : '[✓] INSTALLMENT 1/3 (PAID TODAY):' }}</span>
                      <span>{{ klarnaInstallment(1) }} {{ i18n.currencyLabel().toUpperCase() }}</span>
                    </div>
                    <div class="flex justify-between py-0.5 text-slate-600">
                      <span>{{ i18n.isRo() ? '[ ] RATA 2/3 (+30 ZILE):' : '[ ] INSTALLMENT 2/3 (+30 DAYS):' }}</span>
                      <span>{{ klarnaInstallment(2) }} {{ i18n.currencyLabel().toUpperCase() }}</span>
                    </div>
                    <div class="flex justify-between py-0.5 text-slate-600">
                      <span>{{ i18n.isRo() ? '[ ] RATA 3/3 (+60 ZILE):' : '[ ] INSTALLMENT 3/3 (+60 DAYS):' }}</span>
                      <span>{{ klarnaInstallment(3) }} {{ i18n.currencyLabel().toUpperCase() }}</span>
                    </div>
                  </div>
                  <div class="text-[9px] text-[#b82a4d] text-center font-bold tracking-tight pt-0.5">
                    {{ i18n.isRo() ? '0% DOBÂNDĂ • COST TOTAL FINANȚARE: 0.00 ' + i18n.currencyLabel().toUpperCase() : '0% INTEREST • TOTAL FINANCING COST: 0.00 ' + i18n.currencyLabel().toUpperCase() }}
                  </div>
                </div>
              }

              <!-- Items Table -->
              <div class="text-[10px] space-y-2 border-b border-dashed border-slate-400 pb-3 mb-3">
                <div class="flex justify-between text-[9px] font-bold text-slate-500 uppercase">
                  <span>{{ i18n.isRo() ? 'DESCRIERE' : 'DESCRIPTION' }}</span>
                  <span>{{ i18n.isRo() ? 'SUMĂ' : 'AMOUNT' }}</span>
                </div>
                @for (item of itemsList(); track $index) {
                  <div class="flex justify-between items-start gap-2">
                    <div class="min-w-0">
                      <div class="truncate text-slate-900 font-medium">{{ item.name }}</div>
                      <div class="text-[9px] text-slate-500">{{ item.qty }}x @ {{ item.unitPrice.toFixed(2) }} {{ i18n.currencyLabel() }}</div>
                    </div>
                    <span class="font-bold text-slate-950 tabular-nums shrink-0">{{ item.total.toFixed(2) }}</span>
                  </div>
                }
              </div>

              <!-- Total Calculation -->
              <div class="text-[10px] space-y-1 font-bold text-slate-900 border-b border-dashed border-slate-400 pb-3 mb-3">
                <div class="flex justify-between font-normal text-slate-600">
                  <span>{{ i18n.isRo() ? 'SUBTOTAL NET:' : 'NET SUBTOTAL:' }}</span>
                  <span class="tabular-nums">{{ (order()?.subtotal_ron || 0).toFixed(2) }} {{ i18n.currencyLabel().toUpperCase() }}</span>
                </div>
                <div class="flex justify-between font-normal text-slate-600">
                  <span>{{ i18n.isRo() ? 'TRANSPORT / EXPEDIERE:' : 'SHIPPING / DELIVERY:' }}</span>
                  <span class="tabular-nums">{{ (order()?.shipping_ron || 0).toFixed(2) }} {{ i18n.currencyLabel().toUpperCase() }}</span>
                </div>
                <div class="flex justify-between font-normal text-slate-600">
                  <span>{{ i18n.isRo() ? 'TVA (19% INCLUS):' : 'VAT (19% INCLUDED):' }}</span>
                  <span class="tabular-nums">{{ ((order()?.total_ron || 0) * 0.19 / 1.19).toFixed(2) }} {{ i18n.currencyLabel().toUpperCase() }}</span>
                </div>
                <div class="flex justify-between text-xs font-black pt-1 text-slate-950">
                  <span>{{ i18n.isRo() ? 'TOTAL GENERAL:' : 'GRAND TOTAL:' }}</span>
                  <span class="text-sm tabular-nums">{{ (order()?.total_ron || 0).toFixed(2) }} {{ i18n.currencyLabel().toUpperCase() }}</span>
                </div>
              </div>

          <!-- Barcode SVG -->
          <div class="text-center pt-2 pb-1 space-y-1">
            <div class="flex items-center justify-center gap-[2px] h-10 px-4 overflow-hidden">
              @for (bar of barcodeBars; track $index) {
                <div 
                  class="bg-slate-950 h-full"
                  [style.width.px]="bar.w"
                  [style.opacity]="bar.space ? 0 : 1">
                </div>
              }
            </div>
            <div class="text-[9px] font-mono tracking-widest text-slate-700">
              * {{ order()?.order_number || 'VEX-2026-0042' }} *
            </div>
          </div>

          <!-- Zigzag Tear Edge -->
          <div class="absolute -bottom-2 inset-x-0 h-2 flex overflow-hidden">
            <div class="w-full h-full bg-repeat-x zigzag-edge"></div>
          </div>

        </div>

        <!-- Receipt Action Controls -->
        <div class="flex items-center justify-center gap-2 pt-4">
          <button 
            type="button"
            (click)="printPhysical()"
            class="px-3 py-1.5 rounded-lg bg-surface border border-border hover:bg-surface-elevated text-text-primary text-xs font-medium transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer">
            <svg class="w-3.5 h-3.5 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/>
            </svg>
            <span>{{ i18n.isRo() ? 'Printează Chitanță' : 'Print Receipt' }}</span>
          </button>

          <button 
            type="button"
            (click)="toggleTear()"
            class="px-3 py-1.5 rounded-lg bg-surface border border-border hover:bg-surface-elevated text-text-primary text-xs font-medium transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer">
            <svg class="w-3.5 h-3.5 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0-5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z"/>
            </svg>
            <span>{{ isTorn() ? (i18n.isRo() ? 'Reatașează' : 'Reattach') : (i18n.isRo() ? 'Rupe Bonul' : 'Tear Receipt') }}</span>
          </button>
        </div>

      </div>

    </div>
  `,
  styles: [`
    .perspective-container {
      perspective: 1000px;
    }
    .printer-bezel {
      box-shadow: 0 12px 35px -8px rgba(0, 0, 0, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.1);
    }
    .receipt-paper-wrapper {
      transform-style: preserve-3d;
      transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .receipt-paper-wrapper.is-collapsed {
      transform: translateY(-85%) scaleY(0.1);
      opacity: 0;
      pointer-events: none;
    }
    .receipt-paper-wrapper.is-printing {
      animation: feedPaper 2.4s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
    }
    .receipt-paper-wrapper.is-torn {
      transform: translateY(22px) rotate(2deg) scale(0.98);
      filter: drop-shadow(0 15px 25px rgba(0,0,0,0.35));
    }
    @keyframes feedPaper {
      0% {
        transform: translateY(-90%) scaleY(0.2);
        opacity: 0.3;
      }
      25% {
        transform: translateY(-60%) scaleY(0.5);
        opacity: 0.8;
      }
      60% {
        transform: translateY(-20%) scaleY(0.85);
        opacity: 1;
      }
      100% {
        transform: translateY(0%) scaleY(1);
        opacity: 1;
      }
    }
    .zigzag-edge {
      background-image: radial-gradient(circle, transparent, transparent 3px, #fcfdfa 3.5px, #fcfdfa 4px, transparent 4.5px);
      background-size: 8px 8px;
    }
  `]
})
export class ReceiptPrinter3dComponent implements OnInit, OnDestroy {
  order = input<OrderDetails | null>(null);
  i18n = inject(TranslationService);

  isPrinting = signal<boolean>(false);
  isPrinted = signal<boolean>(false);
  isTorn = signal<boolean>(false);

  // Procedural barcode patterns
  barcodeBars = [
    { w: 2, space: false }, { w: 1, space: true }, { w: 3, space: false }, { w: 2, space: true },
    { w: 1, space: false }, { w: 1, space: true }, { w: 4, space: false }, { w: 1, space: true },
    { w: 2, space: false }, { w: 2, space: true }, { w: 3, space: false }, { w: 1, space: true },
    { w: 1, space: false }, { w: 2, space: true }, { w: 2, space: false }, { w: 3, space: true },
    { w: 4, space: false }, { w: 1, space: true }, { w: 2, space: false }, { w: 2, space: true },
    { w: 3, space: false }, { w: 1, space: true }, { w: 1, space: false }, { w: 2, space: true },
    { w: 2, space: false }, { w: 1, space: true }, { w: 3, space: false }, { w: 2, space: true }
  ];

  isKlarna = computed(() => {
    const ord = this.order();
    return ord?.payment_method === 'klarna_bnpl';
  });

  itemsList = computed(() => {
    const ord = this.order();
    if (!ord || !ord.items || ord.items.length === 0) {
      return [
        { name: 'HackRF One SDR Transceiver', qty: 1, unitPrice: 849.00, total: 849.00 }
      ];
    }
    return ord.items.map(it => ({
      name: it.product_name,
      qty: it.quantity,
      unitPrice: it.unit_price_ron,
      total: it.subtotal_ron
    }));
  });

  printDate(): string {
    const d = new Date();
    return d.toISOString().slice(0, 10) + ' ' + d.toLocaleTimeString('ro-RO', { hour: '2-digit', minute: '2-digit' });
  }

  klarnaInstallment(num: number): string {
    const total = this.order()?.total_ron || 849;
    const inst = +(total / 3).toFixed(2);
    if (num === 3) {
      return (total - (inst * 2)).toFixed(2);
    }
    return inst.toFixed(2);
  }

  ngOnInit() {
    // Automatically trigger printing animation once loaded
    setTimeout(() => {
      this.triggerPrintAnimation();
    }, 400);
  }

  ngOnDestroy() {}

  triggerPrintAnimation() {
    this.isPrinting.set(true);
    this.isTorn.set(false);
    this.playPrinterSound();

    setTimeout(() => {
      this.isPrinting.set(false);
      this.isPrinted.set(true);
    }, 2400);
  }

  toggleTear() {
    this.isTorn.update(v => !v);
  }

  printPhysical() {
    if (typeof window !== 'undefined') {
      window.print();
    }
  }

  private playPrinterSound() {
    if (typeof window === 'undefined') return;
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();

      // Mechanical stepper motor clicks simulation
      const clicks = 8;
      for (let i = 0; i < clicks; i++) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(140 + (i % 2) * 40, ctx.currentTime + i * 0.28);
        gain.gain.setValueAtTime(0.04, ctx.currentTime + i * 0.28);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.28 + 0.08);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + i * 0.28);
        osc.stop(ctx.currentTime + i * 0.28 + 0.09);
      }
    } catch {}
  }
}
