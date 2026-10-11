import { Component, input, output } from '@angular/core';

export type AlertVariant = 'info' | 'success' | 'warning' | 'error';

@Component({
  selector: 'app-ui-alert',
  standalone: true,
  template: `
    <div 
      [class]="alertClass()"
      class="p-3.5 rounded-lg border text-xs flex items-start gap-3 transition-colors"
      role="alert">
      
      <div class="flex-shrink-0 mt-0.5">
        @switch (variant()) {
          @case ('success') {
            <svg class="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
          }
          @case ('warning') {
            <svg class="w-4 h-4 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
          }
          @case ('error') {
            <svg class="w-4 h-4 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
          }
          @default {
            <svg class="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          }
        }
      </div>

      <div class="flex-1 min-w-0">
        @if (title()) {
          <h5 class="font-bold mb-0.5 leading-snug">{{ title() }}</h5>
        }
        <div class="opacity-90 leading-relaxed text-[11px]">
          <ng-content></ng-content>
        </div>
      </div>

      @if (dismissible()) {
        <button 
          type="button" 
          (click)="dismiss.emit()"
          class="flex-shrink-0 opacity-60 hover:opacity-100 p-1 text-xs"
          aria-label="Închide alerta">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
      }
    </div>
  `
})
export class UiAlertComponent {
  variant = input<AlertVariant>('info');
  title = input<string>('');
  dismissible = input<boolean>(false);
  dismiss = output<void>();

  alertClass(): string {
    switch (this.variant()) {
      case 'success':
        return 'bg-emerald-950/20 text-emerald-300 border-emerald-800/60 dark:bg-emerald-950/40 dark:border-emerald-800';
      case 'warning':
        return 'bg-amber-950/20 text-amber-300 border-amber-800/60 dark:bg-amber-950/40 dark:border-amber-800';
      case 'error':
        return 'bg-rose-950/20 text-rose-300 border-rose-800/60 dark:bg-rose-950/40 dark:border-rose-800';
      case 'info':
      default:
        return 'bg-blue-950/20 text-blue-300 border-blue-800/60 dark:bg-blue-950/40 dark:border-blue-800';
    }
  }
}
