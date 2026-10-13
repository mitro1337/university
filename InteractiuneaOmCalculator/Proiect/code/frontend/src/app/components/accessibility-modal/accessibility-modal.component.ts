import { Component, inject } from '@angular/core';
import { AccessibilityService, FontScale } from '../../services/accessibility.service';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-accessibility-modal',
  standalone: true,
  template: `
    @if (a11yService.isOpen()) {
      <div 
        class="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4"
        (click)="a11yService.closeModal()">
        
        <div 
          class="w-full max-w-md bg-surface border border-border rounded-2xl shadow-overlay overflow-hidden transition-colors"
          data-lenis-prevent
          (click)="$event.stopPropagation()">
          
          <div class="px-6 py-4 border-b border-border flex items-center justify-between bg-surface-elevated">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-lg bg-surface-sunken border border-border flex items-center justify-center text-accent">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <h3 class="text-sm font-bold text-text-primary">
                  {{ i18n.isRo() ? 'Accesibilitate' : 'Accessibility Preferences' }}
                </h3>
                <p class="text-[11px] text-text-muted">
                  {{ i18n.isRo() ? 'Personalizează contrastul, dimensiunea textului și animațiile' : 'Customize contrast, typography scale, and motion' }}
                </p>
              </div>
            </div>
            
            <button 
              type="button" 
              (click)="a11yService.closeModal()"
              [attr.aria-label]="i18n.isRo() ? 'Închide' : 'Close'"
              class="w-8 h-8 rounded-lg flex items-center justify-center text-text-muted hover:text-text-primary hover:bg-surface-sunken transition-colors">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          </div>

          <div class="p-6 space-y-6">
            
            <div>
              <label class="block text-xs font-bold text-text-primary mb-2">
                {{ i18n.isRo() ? 'Dimensiune text' : 'Text Scaling' }}
              </label>
              <div class="grid grid-cols-3 gap-2">
                <button 
                  type="button"
                  (click)="a11yService.setFontScale('normal')"
                  [class.bg-accent]="a11yService.fontScale() === 'normal'"
                  [class.text-white]="a11yService.fontScale() === 'normal'"
                  [class.border-accent]="a11yService.fontScale() === 'normal'"
                  [class.bg-surface-sunken]="a11yService.fontScale() !== 'normal'"
                  [class.text-text-secondary]="a11yService.fontScale() !== 'normal'"
                  [class.border-border]="a11yService.fontScale() !== 'normal'"
                  class="py-2.5 px-3 rounded-xl text-xs font-semibold border transition-colors text-center hover:border-accent">
                  100% ({{ i18n.isRo() ? 'Normal' : 'Normal' }})
                </button>
                <button 
                  type="button"
                  (click)="a11yService.setFontScale('large')"
                  [class.bg-accent]="a11yService.fontScale() === 'large'"
                  [class.text-white]="a11yService.fontScale() === 'large'"
                  [class.border-accent]="a11yService.fontScale() === 'large'"
                  [class.bg-surface-sunken]="a11yService.fontScale() !== 'large'"
                  [class.text-text-secondary]="a11yService.fontScale() !== 'large'"
                  [class.border-border]="a11yService.fontScale() !== 'large'"
                  class="py-2.5 px-3 rounded-xl text-xs font-semibold border transition-colors text-center hover:border-accent">
                  115% ({{ i18n.isRo() ? 'Mare' : 'Large' }})
                </button>
                <button 
                  type="button"
                  (click)="a11yService.setFontScale('extra_large')"
                  [class.bg-accent]="a11yService.fontScale() === 'extra_large'"
                  [class.text-white]="a11yService.fontScale() === 'extra_large'"
                  [class.border-accent]="a11yService.fontScale() === 'extra_large'"
                  [class.bg-surface-sunken]="a11yService.fontScale() !== 'extra_large'"
                  [class.text-text-secondary]="a11yService.fontScale() !== 'extra_large'"
                  [class.border-border]="a11yService.fontScale() !== 'extra_large'"
                  class="py-2.5 px-3 rounded-xl text-xs font-semibold border transition-colors text-center hover:border-accent">
                  130% (XL)
                </button>
              </div>
            </div>

            <div class="flex items-center justify-between p-3.5 rounded-xl bg-surface-elevated border border-border">
              <div>
                <div class="text-xs font-bold text-text-primary">
                  {{ i18n.isRo() ? 'Contrast ridicat' : 'High Contrast Mode' }}
                </div>
                <div class="text-[11px] text-text-muted mt-0.5">
                  {{ i18n.isRo() ? 'Contururi accentuate și contrast maxim pentru lizibilitate sporită' : 'Sharpened borders and maximum readable contrast' }}
                </div>
              </div>
              <button 
                type="button"
                (click)="a11yService.toggleHighContrast()"
                [class.bg-accent]="a11yService.highContrast()"
                [class.bg-surface-sunken]="!a11yService.highContrast()"
                [attr.aria-label]="i18n.isRo() ? 'Comută contrastul ridicat' : 'Toggle high contrast'"
                class="w-12 h-6 rounded-full relative transition-colors p-0.5 border border-border flex items-center">
                <span 
                  [class.translate-x-6]="a11yService.highContrast()"
                  [class.translate-x-0]="!a11yService.highContrast()"
                  class="block w-5 h-5 rounded-full bg-text-primary shadow-xs transition-transform transform">
                </span>
              </button>
            </div>

            <div class="flex items-center justify-between p-3.5 rounded-xl bg-surface-elevated border border-border">
              <div>
                <div class="text-xs font-bold text-text-primary">
                  {{ i18n.isRo() ? 'Reducere animații' : 'Reduced Motion' }}
                </div>
                <div class="text-[11px] text-text-muted mt-0.5">
                  {{ i18n.isRo() ? 'Dezactivează efectele dinamice și tranzițiile pentru confort vizual' : 'Disables transitions and motion effects' }}
                </div>
              </div>
              <button 
                type="button"
                (click)="a11yService.toggleReducedMotion()"
                [class.bg-accent]="a11yService.reducedMotion()"
                [class.bg-surface-sunken]="!a11yService.reducedMotion()"
                [attr.aria-label]="i18n.isRo() ? 'Comută reducerea animațiilor' : 'Toggle reduced motion'"
                class="w-12 h-6 rounded-full relative transition-colors p-0.5 border border-border flex items-center">
                <span 
                  [class.translate-x-6]="a11yService.reducedMotion()"
                  [class.translate-x-0]="!a11yService.reducedMotion()"
                  class="block w-5 h-5 rounded-full bg-text-primary shadow-xs transition-transform transform">
                </span>
              </button>
            </div>

            <div class="pt-2 text-center">
              <button 
                type="button" 
                (click)="a11yService.resetDefaults()"
                class="text-xs text-text-muted hover:text-accent underline font-medium transition-colors">
                {{ i18n.isRo() ? 'Resetează preferințele implicite' : 'Reset to default preferences' }}
              </button>
            </div>

          </div>

        </div>
      </div>
    }
  `
})
export class AccessibilityModalComponent {
  a11yService = inject(AccessibilityService);
  i18n = inject(TranslationService);
}
