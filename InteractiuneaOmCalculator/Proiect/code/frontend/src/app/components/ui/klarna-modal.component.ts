import { Component, input, output, signal, computed, inject } from '@angular/core';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-klarna-modal',
  standalone: true,
  template: `
    @if (isOpen()) {
      <div 
        class="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4"
        (click)="close.emit()"
        role="dialog"
        aria-modal="true">
        
        <div 
          class="bg-surface border border-[#FFB3C7]/40 rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden"
          (click)="$event.stopPropagation()">
          
          <div class="absolute -top-16 -right-16 w-36 h-36 bg-[#FFB3C7]/15 rounded-full blur-2xl pointer-events-none"></div>

          <div class="flex items-start justify-between gap-4 border-b border-border pb-4">
            <div class="flex items-center gap-3">
              <div class="w-12 h-8 rounded-lg bg-[#FFB3C7] text-black font-black text-lg flex items-center justify-center tracking-tighter px-2 select-none shadow-xs">
                Klarna.
              </div>
              <div>
                <h3 class="text-base font-bold text-text-primary">
                  {{ i18n.isRo() ? 'Cumpără acum, plătește în 3 rate' : 'Buy now, pay in 3 installments' }}
                </h3>
                <p class="text-xs text-text-muted">
                  {{ i18n.isRo() ? '0% dobândă • Fără costuri ascunse' : '0% interest • No hidden fees' }}
                </p>
              </div>
            </div>

            <button 
              type="button"
              (click)="close.emit()"
              class="w-8 h-8 rounded-lg text-text-muted hover:text-text-primary hover:bg-surface-elevated flex items-center justify-center transition-colors">
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>

          <div class="p-4 rounded-xl bg-surface-elevated border border-border space-y-2">
            <div class="flex justify-between items-baseline text-xs">
              <span class="text-text-muted">{{ i18n.isRo() ? 'Valoare totală produs / comandă:' : 'Total value:' }}</span>
              <span class="text-text-primary font-bold tabular-nums text-sm">{{ amount() }} lei</span>
            </div>
            <div class="flex justify-between items-baseline text-xs">
              <span class="text-[#FFB3C7] font-semibold">{{ i18n.isRo() ? 'Rată lunară (3 tranșe egale):' : 'Monthly installment:' }}</span>
              <span class="text-[#FFB3C7] font-black text-base tabular-nums">{{ installmentAmount() }} lei / lună</span>
            </div>
          </div>

          <div class="space-y-3">
            <h4 class="text-xs font-semibold uppercase tracking-wider text-text-muted">
              {{ i18n.isRo() ? 'Grafic de plată transparent' : 'Payment schedule' }}
            </h4>

            <div class="space-y-2.5">
              <div class="flex items-center justify-between p-3 rounded-lg bg-surface-elevated border border-border">
                <div class="flex items-center gap-3">
                  <div class="w-6 h-6 rounded-full bg-[#FFB3C7] text-black font-bold text-xs flex items-center justify-center">
                    1
                  </div>
                  <div>
                    <div class="text-xs font-semibold text-text-primary">
                      {{ i18n.isRo() ? 'Azi la plasarea comenzii' : 'Today when placing order' }}
                    </div>
                    <div class="text-[11px] text-text-muted">
                      {{ i18n.isRo() ? 'Prima tranșă reținută automat' : 'First charge processed instantly' }}
                    </div>
                  </div>
                </div>
                <span class="text-xs font-bold text-text-primary tabular-nums">{{ installmentAmount() }} lei</span>
              </div>

              <div class="flex items-center justify-between p-3 rounded-lg bg-surface-elevated border border-border">
                <div class="flex items-center gap-3">
                  <div class="w-6 h-6 rounded-full bg-surface border border-border text-text-primary font-bold text-xs flex items-center justify-center">
                    2
                  </div>
                  <div>
                    <div class="text-xs font-semibold text-text-primary">
                      {{ i18n.isRo() ? 'Peste 30 de zile' : 'In 30 days' }}
                    </div>
                    <div class="text-[11px] text-text-muted">
                      {{ dateInDays(30) }}
                    </div>
                  </div>
                </div>
                <span class="text-xs font-bold text-text-primary tabular-nums">{{ installmentAmount() }} lei</span>
              </div>

              <div class="flex items-center justify-between p-3 rounded-lg bg-surface-elevated border border-border">
                <div class="flex items-center gap-3">
                  <div class="w-6 h-6 rounded-full bg-surface border border-border text-text-primary font-bold text-xs flex items-center justify-center">
                    3
                  </div>
                  <div>
                    <div class="text-xs font-semibold text-text-primary">
                      {{ i18n.isRo() ? 'Peste 60 de zile' : 'In 60 days' }}
                    </div>
                    <div class="text-[11px] text-text-muted">
                      {{ dateInDays(60) }}
                    </div>
                  </div>
                </div>
                <span class="text-xs font-bold text-text-primary tabular-nums">{{ lastInstallmentAmount() }} lei</span>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
            <div class="p-3 rounded-lg bg-surface-elevated border border-border flex items-start gap-2.5">
              <svg class="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
              </svg>
              <div>
                <strong class="text-text-primary block font-semibold">{{ i18n.isRo() ? '0% Dobândă Garantată' : '0% Interest Guaranteed' }}</strong>
                <span class="text-text-muted text-[11px]">{{ i18n.isRo() ? 'Nu plătești niciun ban în plus față de prețul afișat.' : 'Pay strictly the displayed retail price, nothing more.' }}</span>
              </div>
            </div>

            <div class="p-3 rounded-lg bg-surface-elevated border border-border flex items-start gap-2.5">
              <svg class="w-4 h-4 text-[#FFB3C7] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
              </svg>
              <div>
                <strong class="text-text-primary block font-semibold">{{ i18n.isRo() ? 'Protecția Cumpărătorului' : 'Buyer Protection' }}</strong>
                <span class="text-text-muted text-[11px]">{{ i18n.isRo() ? 'Ești asigurat integral până la recepția fizică a coletului.' : 'Full refund coverage until package receipt and inspection.' }}</span>
              </div>
            </div>
          </div>

          <div class="pt-2">
            <button 
              type="button"
              (click)="close.emit()"
              class="w-full py-3 px-4 rounded-xl bg-[#FFB3C7] hover:bg-[#ffa0b8] text-black font-bold text-xs transition-colors shadow-xs">
              {{ i18n.isRo() ? 'Am Înțeles • Continuă Cumpărăturile' : 'Got it • Continue Shopping' }}
            </button>
          </div>

        </div>
      </div>
    }
  `
})
export class KlarnaModalComponent {
  isOpen = input<boolean>(false);
  amount = input<number>(0);
  close = output<void>();

  i18n = inject(TranslationService);

  installmentAmount = computed(() => {
    return +(this.amount() / 3).toFixed(2);
  });

  lastInstallmentAmount = computed(() => {
    const total = this.amount();
    const inst = +(total / 3).toFixed(2);
    return +(total - (inst * 2)).toFixed(2);
  });

  dateInDays(days: number): string {
    const d = new Date(Date.now() + days * 24 * 60 * 60 * 1000);
    return d.toLocaleDateString(this.i18n.isRo() ? 'ro-RO' : 'en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  }
}
