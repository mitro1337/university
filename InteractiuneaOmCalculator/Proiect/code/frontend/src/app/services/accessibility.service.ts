import { Injectable, signal, effect } from '@angular/core';

export type FontScale = 'normal' | 'large' | 'extra_large';

interface A11yPreferences {
  fontScale: FontScale;
  highContrast: boolean;
  reducedMotion: boolean;
  keyboardHints: boolean;
}

const STORAGE_KEY = 'vexera_a11y_prefs';

@Injectable({
  providedIn: 'root'
})
export class AccessibilityService {
  public fontScale = signal<FontScale>('normal');
  public highContrast = signal<boolean>(false);
  public reducedMotion = signal<boolean>(false);
  public keyboardHints = signal<boolean>(true);
  public isOpen = signal<boolean>(false);

  constructor() {
    this.loadFromStorage();

    effect(() => {
      const prefs: A11yPreferences = {
        fontScale: this.fontScale(),
        highContrast: this.highContrast(),
        reducedMotion: this.reducedMotion(),
        keyboardHints: this.keyboardHints()
      };

      this.applyDomClasses(prefs);

      try {
        if (typeof window !== 'undefined' && window.localStorage) {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
        }
      } catch (e) {
        console.warn('Failed to save a11y preferences', e);
      }
    });
  }

  private loadFromStorage(): void {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
          const parsed: A11yPreferences = JSON.parse(raw);
          if (parsed.fontScale) this.fontScale.set(parsed.fontScale);
          if (typeof parsed.highContrast === 'boolean') this.highContrast.set(parsed.highContrast);
          if (typeof parsed.reducedMotion === 'boolean') this.reducedMotion.set(parsed.reducedMotion);
          if (typeof parsed.keyboardHints === 'boolean') this.keyboardHints.set(parsed.keyboardHints);
        }
      }
    } catch (e) {
      console.warn('Failed to load a11y preferences', e);
    }
  }

  private applyDomClasses(prefs: A11yPreferences): void {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;

    // Font scaling
    root.classList.remove('a11y-font-large', 'a11y-font-xl');
    if (prefs.fontScale === 'large') root.classList.add('a11y-font-large');
    if (prefs.fontScale === 'extra_large') root.classList.add('a11y-font-xl');

    // High contrast
    if (prefs.highContrast) {
      root.classList.add('a11y-high-contrast');
    } else {
      root.classList.remove('a11y-high-contrast');
    }

    // Reduced motion
    if (prefs.reducedMotion) {
      root.classList.add('a11y-reduced-motion');
    } else {
      root.classList.remove('a11y-reduced-motion');
    }
  }

  public openModal(): void {
    this.isOpen.set(true);
  }

  public closeModal(): void {
    this.isOpen.set(false);
  }

  public toggleHighContrast(): void {
    this.highContrast.update(v => !v);
  }

  public setFontScale(scale: FontScale): void {
    this.fontScale.set(scale);
  }

  public toggleReducedMotion(): void {
    this.reducedMotion.update(v => !v);
  }

  public toggleKeyboardHints(): void {
    this.keyboardHints.update(v => !v);
  }

  public resetDefaults(): void {
    this.fontScale.set('normal');
    this.highContrast.set(false);
    this.reducedMotion.set(false);
    this.keyboardHints.set(true);
  }
}
