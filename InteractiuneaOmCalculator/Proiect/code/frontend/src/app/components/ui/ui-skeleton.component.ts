import { Component, input } from '@angular/core';

@Component({
  selector: 'app-ui-skeleton',
  standalone: true,
  template: `
    <div 
      [class]="customClass()"
      class="animate-pulse bg-slate-200 dark:bg-slate-800 rounded">
    </div>
  `
})
export class UiSkeletonComponent {
  customClass = input<string>('h-4 w-full');
}
