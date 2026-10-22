import { Component, input, output, signal, OnInit, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import confetti from 'canvas-confetti';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-payment-stamper-3d',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="relative w-full max-w-md mx-auto my-6 select-none stamper-scene">
      
      <!-- 3D Physical Electronic Stamper Device Chassis -->
      <div 
        class="stamper-chassis relative z-30 mx-auto rounded-3xl bg-gradient-to-b from-[#242b38] via-[#1a202c] to-[#121620] border-2 border-slate-700/80 p-6 shadow-2xl transition-all duration-300"
        [class.is-stamping]="isStamping()"
        [class.is-stamped]="isStamped()">
        
        <!-- Top Status Indicator & Power LED -->
        <div class="flex items-center justify-between mb-4 pb-2 border-b border-slate-800">
          <div class="flex items-center gap-2">
            <span class="text-[11px] font-heading font-bold tracking-widest uppercase" [style.color]="selectedColor().hex">
              {{ currentStatus() }}
            </span>
          </div>

          <div class="flex items-center gap-2">
            <div 
              class="w-3 h-3 rounded-full transition-all duration-300 shadow-md"
              [style.background-color]="selectedColor().hex"
              [class.animate-pulse]="isStamping()">
            </div>
            <span class="text-[10px] font-medium text-slate-400">READY</span>
          </div>
        </div>

        <!-- 3D Cylindrical Rolling Drums Window (Day / Month / Year) -->
        <div class="relative bg-black/60 rounded-2xl p-4 border border-slate-800 shadow-inner overflow-hidden my-3">
          
          <!-- Optical highlight glare -->
          <div class="absolute inset-x-0 top-0 h-4 bg-gradient-to-b from-white/10 to-transparent pointer-events-none"></div>

          <div class="grid grid-cols-3 gap-3 text-center">
            
            <!-- Drum 1: Day -->
            <div class="drum-column">
              <span class="text-[9px] uppercase font-bold tracking-wider text-slate-500 block mb-1">{{ i18n.isRo() ? 'ZIUA' : 'DAY' }}</span>
              <div class="drum-cylinder relative h-16 overflow-hidden rounded-xl bg-slate-900 border border-slate-800 flex flex-col items-center justify-center">
                <span class="text-xs text-slate-600 select-none">{{ (selectedDay() - 1 + 31) % 31 || 31 }}</span>
                <span class="text-xl font-heading font-black text-white select-none drum-active-num tabular-nums">{{ selectedDay() }}</span>
                <span class="text-xs text-slate-600 select-none">{{ (selectedDay() % 31) + 1 }}</span>
              </div>
            </div>

            <!-- Drum 2: Month -->
            <div class="drum-column">
              <span class="text-[9px] uppercase font-bold tracking-wider text-slate-500 block mb-1">{{ i18n.isRo() ? 'LUNA' : 'MONTH' }}</span>
              <div class="drum-cylinder relative h-16 overflow-hidden rounded-xl bg-slate-900 border border-slate-800 flex flex-col items-center justify-center">
                <span class="text-xs text-slate-600 select-none">{{ prevMonth() }}</span>
                <span class="text-lg font-heading font-black text-white select-none uppercase drum-active-num">{{ selectedMonth() }}</span>
                <span class="text-xs text-slate-600 select-none">{{ nextMonth() }}</span>
              </div>
            </div>

            <!-- Drum 3: Year -->
            <div class="drum-column">
              <span class="text-[9px] uppercase font-bold tracking-wider text-slate-500 block mb-1">{{ i18n.isRo() ? 'ANUL' : 'YEAR' }}</span>
              <div class="drum-cylinder relative h-16 overflow-hidden rounded-xl bg-slate-900 border border-slate-800 flex flex-col items-center justify-center">
                <span class="text-xs text-slate-600 select-none">{{ selectedYear() - 1 }}</span>
                <span class="text-lg font-heading font-black text-white select-none drum-active-num tabular-nums">{{ selectedYear() }}</span>
                <span class="text-xs text-slate-600 select-none">{{ selectedYear() + 1 }}</span>
              </div>
            </div>

          </div>

          <!-- Horizontal Highlight Track -->
          <div class="absolute inset-x-2 top-1/2 -translate-y-1/2 h-8 border-t border-b border-accent/40 pointer-events-none rounded bg-accent/10"></div>
        </div>

        <!-- Status Mode Pills -->
        <div class="flex flex-wrap items-center justify-center gap-1.5 pt-1 mb-4">
          @for (s of currentStatusOptions(); track s) {
            <button 
              type="button"
              (click)="setStatus(s)"
              [class.bg-white]="currentStatus() === s"
              [class.text-black]="currentStatus() === s"
              [class.bg-slate-800]="currentStatus() !== s"
              [class.text-slate-300]="currentStatus() !== s"
              class="px-2.5 py-1 rounded-full text-[10px] font-bold transition-all border border-slate-700/80 hover:border-slate-500 cursor-pointer active:scale-95">
              {{ s }}
            </button>
          }
        </div>

        <!-- Color Palette Dots & Action Button -->
        <div class="flex items-center justify-between gap-3 pt-3 border-t border-slate-800">
          <div class="flex items-center gap-2">
            @for (c of colorOptions; track c.name) {
              <button 
                type="button"
                (click)="setColor(c)"
                class="w-5 h-5 rounded-full transition-transform cursor-pointer relative"
                [style.background-color]="c.hex"
                [class.ring-2]="selectedColor().name === c.name"
                [class.ring-white]="selectedColor().name === c.name"
                [class.scale-110]="selectedColor().name === c.name"
                [title]="c.name">
              </button>
            }
          </div>

          <button 
            type="button"
            (click)="executeStamp()"
            [disabled]="isStamping()"
            class="px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider text-black transition-all flex items-center gap-2 shadow-lg hover:brightness-110 active:scale-95 disabled:opacity-50 cursor-pointer"
            [style.background-color]="selectedColor().hex">
            <svg class="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
            </svg>
            <span>{{ isStamped() ? (i18n.isRo() ? 'Re-Ștampilează' : 'Re-Stamp') : (i18n.isRo() ? 'Aprobă & Ștampilează' : 'Approve & Stamp') }}</span>
          </button>
        </div>

      </div>

      <!-- Target Invoice Document Section Receiving the Rubber Stamp -->
      <div class="relative z-10 -mt-3 mx-4 p-6 rounded-2xl bg-slate-900 border border-slate-700 text-center space-y-3 shadow-xl">
        <div class="text-[11px] font-bold text-slate-400">
          {{ i18n.isRo() ? 'DOCUMENT DE VERIFICARE COMANDĂ // VEXERA SECURE' : 'ORDER VERIFICATION DOCUMENT // VEXERA SECURE' }}
        </div>

        <!-- The 3D Ink Stamp Impression -->
        <div class="h-20 flex items-center justify-center relative">
          @if (isStamped()) {
            <div 
              class="stamp-impression inline-block px-6 py-2.5 rounded-xl border-4 font-heading font-black tracking-widest uppercase transition-all"
              [style.color]="selectedColor().hex"
              [style.border-color]="selectedColor().hex"
              [style.box-shadow]="'0 0 20px ' + selectedColor().hex + '40'">
              <div class="text-sm sm:text-base leading-none mb-1">
                {{ currentStatus() }}
              </div>
              <div class="text-[10px] tracking-widest text-slate-300">
                {{ selectedDay() }} {{ selectedMonth() }} {{ selectedYear() }} // {{ i18n.isRo() ? '0% DOBÂNDĂ' : '0% INTEREST' }}
              </div>
            </div>
          } @else {
            <div class="text-xs text-slate-400 border border-dashed border-slate-700 rounded-lg p-3">
              {{ i18n.isRo() ? '[ Așteaptă aplicarea sigiliului fizic de aprobare ]' : '[ Awaiting digital verification stamp ]' }}
            </div>
          }
        </div>
      </div>

    </div>
  `,
  styles: [`
    .stamper-scene {
      perspective: 1200px;
    }
    .stamper-chassis {
      transform-style: preserve-3d;
      transition: transform 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    .stamper-chassis.is-stamping {
      animation: slamDown 0.45s cubic-bezier(0.1, 0.9, 0.2, 1) forwards;
    }
    @keyframes slamDown {
      0% {
        transform: translateY(0) scale(1);
      }
      30% {
        transform: translateY(-24px) scale(1.05) rotateX(8deg);
      }
      65% {
        transform: translateY(18px) scale(0.96) rotateX(-4deg);
      }
      100% {
        transform: translateY(0) scale(1);
      }
    }
    .stamp-impression {
      animation: stampAppearance 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
      transform: rotate(-3deg);
    }
    @keyframes stampAppearance {
      0% {
        transform: scale(2.2) rotate(-8deg);
        opacity: 0;
      }
      100% {
        transform: scale(1) rotate(-3deg);
        opacity: 0.95;
      }
    }
    .drum-cylinder {
      box-shadow: inset 0 8px 10px -5px rgba(0,0,0,0.8), inset 0 -8px 10px -5px rgba(0,0,0,0.8);
    }
    .drum-active-num {
      text-shadow: 0 0 10px rgba(255, 255, 255, 0.6);
    }
  `]
})
export class PaymentStamper3dComponent implements OnInit {
  i18n = inject(TranslationService);

  defaultStatus = input<string>('');
  autoStamp = input<boolean>(true);
  stamped = output<{ status: string; date: string }>();

  isStamping = signal<boolean>(false);
  isStamped = signal<boolean>(false);

  currentStatusOptions = computed(() => 
    this.i18n.isRo() 
      ? ['KLARNA APROBAT', 'ACHITAT', 'SECURIZAT 256-BIT', 'CONFIRMAT'] 
      : ['KLARNA APPROVED', 'PAID', '256-BIT SECURE', 'CONFIRMED']
  );
  currentStatus = signal<string>('');

  colorOptions = [
    { name: 'Klarna Coral Pink', hex: '#FFB3C7' },
    { name: 'Signal Orange', hex: '#FF6B2B' },
    { name: 'Safety Amber', hex: '#F59E0B' },
    { name: 'Titanium White', hex: '#F8F9FA' }
  ];
  selectedColor = signal(this.colorOptions[1]);

  // Calendar dates
  now = new Date();
  months = computed(() => 
    this.i18n.isRo() 
      ? ['IAN', 'FEB', 'MAR', 'APR', 'MAI', 'IUN', 'IUL', 'AUG', 'SEP', 'OCT', 'NOI', 'DEC'] 
      : ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
  );

  selectedDay = signal<number>(this.now.getDate());
  selectedMonthIndex = signal<number>(this.now.getMonth());
  selectedMonth = computed(() => this.months()[this.selectedMonthIndex()]);
  selectedYear = signal<number>(this.now.getFullYear());

  prevMonth = computed(() => {
    const list = this.months();
    return list[(this.selectedMonthIndex() - 1 + 12) % 12];
  });

  nextMonth = computed(() => {
    const list = this.months();
    return list[(this.selectedMonthIndex() + 1) % 12];
  });

  ngOnInit() {
    if (this.defaultStatus()) {
      this.currentStatus.set(this.defaultStatus());
    } else {
      this.currentStatus.set(this.i18n.isRo() ? 'KLARNA APROBAT' : 'KLARNA APPROVED');
    }
    if (this.autoStamp()) {
      setTimeout(() => {
        this.executeStamp();
      }, 500);
    }
  }

  setStatus(status: string) {
    this.currentStatus.set(status);
  }

  setColor(color: { name: string; hex: string }) {
    this.selectedColor.set(color);
  }

  executeStamp() {
    this.isStamping.set(true);
    this.playMechanicalStampSound();

    setTimeout(() => {
      this.isStamping.set(false);
      this.isStamped.set(true);
      this.fireConfetti();
      this.stamped.emit({
        status: this.currentStatus(),
        date: `${this.selectedDay()} ${this.selectedMonth()} ${this.selectedYear()}`
      });
    }, 450);
  }

  private fireConfetti() {
    try {
      confetti({
        particleCount: 45,
        spread: 60,
        origin: { y: 0.75 },
        colors: [this.selectedColor().hex, '#FFFFFF', '#06B6D4']
      });
    } catch {}
  }

  private playMechanicalStampSound() {
    if (typeof window === 'undefined') return;
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();

      // Sharp mechanical clack followed by low thud
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(320, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(45, ctx.currentTime + 0.12);

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.16);
    } catch {}
  }
}
