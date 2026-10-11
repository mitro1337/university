import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommandPaletteService {
  public isOpen = signal<boolean>(false);

  constructor() {
    if (typeof window !== 'undefined') {
      window.addEventListener('keydown', (e: KeyboardEvent) => {
        if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
          e.preventDefault();
          this.toggle();
        } else if (e.key === 'Escape' && this.isOpen()) {
          this.close();
        }
      });
    }
  }

  public open(): void {
    this.isOpen.set(true);
  }

  public close(): void {
    this.isOpen.set(false);
  }

  public toggle(): void {
    this.isOpen.update(v => !v);
  }
}
