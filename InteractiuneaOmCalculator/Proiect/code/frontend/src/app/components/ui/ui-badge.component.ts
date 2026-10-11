import { Component, input } from '@angular/core';

export type BadgeVariant = 'neutral' | 'accent' | 'success' | 'warning' | 'error' | 'mono';

@Component({
  selector: 'app-ui-badge',
  standalone: true,
  template: `
    <span 
      [class]="badgeClass()"
      class="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[11px] font-semibold tracking-wide border transition-colors select-none">
      <ng-content></ng-content>
    </span>
  `
})
export class UiBadgeComponent {
  variant = input<BadgeVariant>('neutral');

  badgeClass(): string {
    switch (this.variant()) {
      case 'accent':
        return 'bg-blue-950/40 text-blue-400 border-blue-800/80 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-700/80';
      case 'success':
        return 'bg-emerald-950/40 text-emerald-400 border-emerald-800/80 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-700/80';
      case 'warning':
        return 'bg-amber-950/40 text-amber-400 border-amber-800/80 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-700/80';
      case 'error':
        return 'bg-rose-950/40 text-rose-400 border-rose-800/80 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-700/80';
      case 'mono':
        return 'bg-slate-100 text-slate-800 border-slate-300 dark:bg-slate-800/80 dark:text-slate-200 dark:border-slate-700 text-[10px] tabular-nums font-medium';
      case 'neutral':
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800/60 dark:text-slate-300 dark:border-slate-700';
    }
  }
}
