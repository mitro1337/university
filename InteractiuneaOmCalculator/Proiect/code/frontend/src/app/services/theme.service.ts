import { Injectable, signal, computed } from '@angular/core';

export type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  readonly theme = signal<Theme>(this.getInitialTheme());
  readonly isDark = computed(() => this.theme() === 'dark');

  constructor() {
    this.applyTheme(this.theme());
  }

  private getInitialTheme(): Theme {
    if (typeof window !== 'undefined' && window.localStorage) {
      const saved = window.localStorage.getItem('vexera_theme');
      if (saved === 'dark' || saved === 'light') {
        return saved;
      }
    }
    return 'dark';
  }

  public toggleTheme(): void {
    const next: Theme = this.theme() === 'dark' ? 'light' : 'dark';
    this.setTheme(next);
  }

  public setTheme(newTheme: Theme): void {
    this.theme.set(newTheme);
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem('vexera_theme', newTheme);
    }
    this.applyTheme(newTheme);
  }

  private applyTheme(t: Theme): void {
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      if (t === 'dark') {
        root.classList.add('dark');
        root.classList.remove('light');
        root.style.colorScheme = 'dark';
      } else {
        root.classList.remove('dark');
        root.classList.add('light');
        root.style.colorScheme = 'light';
      }
    }
  }
}
