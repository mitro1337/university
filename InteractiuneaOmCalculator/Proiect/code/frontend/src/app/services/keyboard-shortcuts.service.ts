import { Injectable, signal, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommandPaletteService } from './command-palette.service';
import { CartService } from './cart.service';
import { AccessibilityService } from './accessibility.service';

export interface ShortcutItem {
  key: string;
  descriptionRo: string;
  descriptionEn: string;
  category: 'nav' | 'actions' | 'tools';
}

@Injectable({
  providedIn: 'root'
})
export class KeyboardShortcutsService {
  private router = inject(Router);
  private paletteService = inject(CommandPaletteService);
  private cartService = inject(CartService);
  private a11yService = inject(AccessibilityService);

  public isModalOpen = signal<boolean>(false);

  public readonly shortcutsList: ShortcutItem[] = [
    { key: 'Cmd+K / Ctrl+K', descriptionRo: 'Bara de căutare și comenzi rapide', descriptionEn: 'Open Command Palette', category: 'nav' },
    { key: '/', descriptionRo: 'Căutare rapidă în catalog', descriptionEn: 'Focus Quick Search', category: 'nav' },
    { key: 'C', descriptionRo: 'Deschide sau închide coșul', descriptionEn: 'Toggle Shopping Cart Drawer', category: 'actions' },
    { key: 'B', descriptionRo: 'Deschide configuratorul de laborator', descriptionEn: 'Go to Build Your Lab', category: 'tools' },
    { key: 'R', descriptionRo: 'Deschide configuratorul de rack 19"', descriptionEn: 'Go to Visual Rack Builder', category: 'tools' },
    { key: 'P', descriptionRo: 'Deschide comparatorul de produse', descriptionEn: 'Go to Product Comparison', category: 'tools' },
    { key: 'A', descriptionRo: 'Deschide panoul de accesibilitate', descriptionEn: 'Open Accessibility Panel', category: 'actions' },
    { key: '?', descriptionRo: 'Afișează lista de scurtături', descriptionEn: 'Show Keyboard Shortcuts Modal', category: 'actions' },
    { key: 'ESC', descriptionRo: 'Închide fereastra modală activă', descriptionEn: 'Close Active Modal / Drawer', category: 'actions' }
  ];

  public initListener(): void {
    if (typeof window === 'undefined') return;

    window.addEventListener('keydown', (event: KeyboardEvent) => {
      const activeTag = (document.activeElement?.tagName || '').toLowerCase();
      const isInput = activeTag === 'input' || activeTag === 'textarea' || (document.activeElement as HTMLElement)?.isContentEditable;

      // Handle ESC anywhere
      if (event.key === 'Escape') {
        if (this.isModalOpen()) {
          this.isModalOpen.set(false);
          return;
        }
        if (this.paletteService.isOpen()) {
          this.paletteService.close();
          return;
        }
        if (this.cartService.isOpen()) {
          this.cartService.isOpen.set(false);
          return;
        }
        if (this.a11yService.isOpen()) {
          this.a11yService.closeModal();
          return;
        }
      }

      // Handle Cmd+K / Ctrl+K
      if ((event.metaKey || event.ctrlKey) && (event.key === 'k' || event.key === 'K')) {
        event.preventDefault();
        this.paletteService.toggle();
        return;
      }

      // If user is currently typing in an input field, do not trigger single letter shortcuts
      if (isInput) return;

      // Single-key shortcuts
      if (event.key === '?') {
        event.preventDefault();
        this.isModalOpen.update(v => !v);
      } else if (event.key === '/') {
        event.preventDefault();
        this.paletteService.open();
      } else if (event.key === 'c' || event.key === 'C') {
        event.preventDefault();
        this.cartService.isOpen.update(v => !v);
      } else if (event.key === 'b' || event.key === 'B') {
        event.preventDefault();
        this.router.navigate(['/build-your-lab']);
      } else if (event.key === 'r' || event.key === 'R') {
        event.preventDefault();
        this.router.navigate(['/build-your-lab'], { queryParams: { tab: 'rack' } });
      } else if (event.key === 'p' || event.key === 'P') {
        event.preventDefault();
        this.router.navigate(['/compara']);
      } else if (event.key === 'a' || event.key === 'A') {
        event.preventDefault();
        this.a11yService.openModal();
      }
    });
  }

  public openModal(): void {
    this.isModalOpen.set(true);
  }

  public closeModal(): void {
    this.isModalOpen.set(false);
  }
}
