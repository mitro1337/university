import { Component, inject } from '@angular/core';
import { KeyboardShortcutsService } from '../../services/keyboard-shortcuts.service';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-keyboard-shortcuts-modal',
  standalone: true,
  template: `
    @if (shortcutsService.isModalOpen()) {
      <div 
        class="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
        (click)="shortcutsService.closeModal()">
        
        <div 
          class="w-full max-w-lg bg-surface border border-border rounded-2xl shadow-3d-card overflow-hidden transition-colors relative"
          data-lenis-prevent
          (click)="$event.stopPropagation()">
          
          <div class="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>

          <div class="px-6 py-4 border-b border-border flex items-center justify-between bg-surface-elevated">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-lg bg-surface-sunken border border-border flex items-center justify-center text-cyan-400 shadow-3d-sunken">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <rect x="2" y="5" width="20" height="14" rx="2" stroke-width="2"/>
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 9h.01M10 9h.01M14 9h.01M18 9h.01M6 13h.01M18 13h.01M9 15h6"/>
                </svg>
              </div>
              <div>
                <h3 class="text-sm font-bold text-text-primary font-heading uppercase tracking-wide">
                  {{ i18n.isRo() ? 'Scurtături de tastatură' : 'Keyboard Shortcuts' }}
                </h3>
                <p class="text-[11px] text-text-muted font-sans">
                  {{ i18n.isRo() ? 'Navighează rapid prin interfață folosind tastatura' : 'Navigate quickly using keyboard shortcuts' }}
                </p>
              </div>
            </div>
            
            <button 
              type="button" 
              (click)="shortcutsService.closeModal()"
              aria-label="Închide"
              class="w-8 h-8 rounded-lg flex items-center justify-center text-text-muted hover:text-text-primary hover:bg-surface-sunken transition-colors">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          </div>

          <div class="p-6 divide-y divide-border/60 space-y-3">
            @for (sc of shortcutsService.shortcutsList; track sc.key) {
              <div class="flex items-center justify-between pt-3 first:pt-0">
                <span class="text-xs text-text-secondary font-medium font-sans">
                  {{ i18n.isRo() ? sc.descriptionRo : sc.descriptionEn }}
                </span>
                <span class="kbd-badge">
                  {{ sc.key }}
                </span>
              </div>
            }
          </div>

          <div class="px-6 py-3 bg-surface-elevated border-t border-border text-center text-[11px] text-text-muted font-mono flex items-center justify-center gap-1.5">
            <span class="led-indicator-3d" style="--led-color: #00d2ff; --led-glow: rgba(0,210,255,0.7);"></span>
            <span>{{ i18n.isRo() ? 'Apasă ESC oricând pentru a închide această fereastră.' : 'Press ESC anytime to dismiss this modal.' }}</span>
          </div>

        </div>
      </div>
    }
  `
})
export class KeyboardShortcutsModalComponent {
  shortcutsService = inject(KeyboardShortcutsService);
  i18n = inject(TranslationService);
}
