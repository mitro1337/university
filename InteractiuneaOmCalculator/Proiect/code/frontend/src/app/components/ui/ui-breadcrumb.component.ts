import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

export interface BreadcrumbItem {
  label: string;
  url?: string;
}

@Component({
  selector: 'app-ui-breadcrumb',
  standalone: true,
  imports: [RouterLink],
  template: `
    <nav class="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-6 font-medium" aria-label="Breadcrumb">
      <a routerLink="/" class="hover:text-slate-900 dark:hover:text-white transition-colors">
        Acasă
      </a>
      @for (item of items(); track item.label; let last = $last) {
        <span class="text-slate-400 dark:text-slate-600 select-none">/</span>
        @if (!last && item.url) {
          <a [routerLink]="item.url" class="hover:text-slate-900 dark:hover:text-white transition-colors truncate max-w-[200px]">
            {{ item.label }}
          </a>
        } @else {
          <span class="text-slate-900 dark:text-slate-200 font-semibold truncate max-w-[260px]">
            {{ item.label }}
          </span>
        }
      }
    </nav>
  `
})
export class UiBreadcrumbComponent {
  items = input<BreadcrumbItem[]>([]);
}
