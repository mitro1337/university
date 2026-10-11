import { Component, inject } from '@angular/core';
import { UiFeedbackService } from '../../services/ui-feedback.service';
import { LenisService } from '../../services/lenis.service';

@Component({
  selector: 'app-ui-feedback-overlay',
  standalone: true,
  template: `
    <div 
      class="fixed top-0 left-0 right-0 h-[2.5px] z-50 pointer-events-none bg-surface-sunken/40"
      aria-hidden="true">
      <div 
        class="h-full bg-gradient-to-r from-accent via-accent-hover to-accent transition-all duration-75 shadow-[0_0_8px_rgba(184,104,48,0.5)]"
        [style.width.%]="uiFeedback.scrollProgress()">
      </div>
    </div>

    @if (uiFeedback.showBackToTop()) {
      <button
        type="button"
        (click)="uiFeedback.scrollToTop()"
        aria-label="Înapoi la începutul paginii"
        class="fixed bottom-6 right-6 z-40 p-2.5 rounded-full bg-surface-elevated/95 backdrop-blur-md border border-border hover:border-accent text-text-secondary hover:text-accent shadow-overlay transition-all duration-200 transform hover:-translate-y-1 active:scale-95 flex items-center gap-1.5 text-xs font-semibold group">
        <svg class="w-4 h-4 transform group-hover:-translate-y-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18"/>
        </svg>
        <span class="text-[11px] font-medium hidden sm:inline pr-1">Sus</span>
      </button>
    }

    @if (lenisService.isScrolling() && lenisService.velocity() !== 0) {
      <div 
        class="fixed bottom-20 right-6 z-40 hidden md:flex items-center gap-2 px-2.5 py-1 rounded-full bg-surface-elevated/90 backdrop-blur-md border border-border shadow-md text-[10px] text-text-secondary pointer-events-none animate-fade-in-up">
        <span class="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"></span>
        <span class="tabular-nums font-sans">{{ getVelocityDisplay() }} px/s</span>
      </div>
    }

    <aside 
      class="fixed bottom-6 left-6 z-50 flex flex-col gap-2 max-w-sm pointer-events-none"
      aria-live="polite"
      aria-label="Notificări de sistem">
      @for (toast of uiFeedback.toasts(); track toast.id) {
        <div 
          class="pointer-events-auto bg-surface-elevated/95 backdrop-blur-md border border-border shadow-overlay px-3.5 py-2.5 rounded-xl flex items-center gap-2.5 text-xs text-text-primary animate-fade-in-up transition-all">
          <div class="w-5 h-5 rounded-md bg-surface-sunken border border-border flex items-center justify-center text-accent flex-shrink-0">
            @if (toast.type === 'copy') {
              <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <rect x="8" y="8" width="12" height="12" rx="2" />
                <path d="M16 8V6a2 2 0 00-2-2H6a2 2 0 00-2 2v8a2 2 0 002 2h2" />
              </svg>
            } @else if (toast.type === 'success') {
              <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            } @else {
              <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="9"/>
                <path stroke-linecap="round" d="M12 8v4m0 4h.01"/>
              </svg>
            }
          </div>
          <span class="font-medium text-text-primary">{{ toast.message }}</span>
          <button 
            type="button" 
            (click)="uiFeedback.dismissToast(toast.id)"
            class="ml-auto text-text-muted hover:text-text-primary p-0.5"
            aria-label="Închide">
            <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
      }
    </aside>
  `
})
export class UiFeedbackOverlayComponent {
  uiFeedback = inject(UiFeedbackService);
  lenisService = inject(LenisService);

  getVelocityDisplay(): string {
    return Math.abs(this.lenisService.velocity()).toFixed(0);
  }
}
