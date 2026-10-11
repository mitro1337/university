import { Component, input } from '@angular/core';

@Component({
  selector: 'app-ui-empty-state',
  standalone: true,
  template: `
    <div class="py-12 px-4 text-center max-w-md mx-auto space-y-3">
      <div class="w-12 h-12 rounded-lg bg-surface-elevated border border-border flex items-center justify-center mx-auto text-text-muted">
        <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
        </svg>
      </div>
      <h4 class="text-sm font-bold text-text-primary">{{ title() }}</h4>
      @if (description()) {
        <p class="text-xs text-text-muted leading-relaxed">{{ description() }}</p>
      }
      <div class="pt-2">
        <ng-content></ng-content>
      </div>
    </div>
  `
})
export class UiEmptyStateComponent {
  icon = input<string>('');
  title = input<string>('Niciun element găsit');
  description = input<string>('');
}
