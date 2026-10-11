import { Component, input, output, inject } from '@angular/core';
import { CompatibilityResult, CompatibilityIssue } from '../../models/lab-builder.model';
import { TranslationService } from '../../services/translation.service';
import { UiBadgeComponent } from './ui-badge.component';

@Component({
  selector: 'app-ui-compatibility-engine',
  standalone: true,
  imports: [UiBadgeComponent],
  template: `
    @if (result(); as res) {
      <div 
        class="rounded-xl border transition-colors overflow-hidden"
        [class.bg-surface-elevated]="!compact()"
        [class.bg-surface]="compact()"
        [class.border-border]="res.isFullyCompatible"
        [class.border-amber-800/80]="!res.isFullyCompatible && res.score >= 70"
        [class.border-rose-800/80]="res.score < 70">

        <div class="p-4 flex flex-wrap items-center justify-between gap-3 border-b border-border/60">
          <div class="flex items-center gap-3">
            <div 
              class="px-2.5 py-1 rounded font-bold text-xs flex items-center gap-1.5 tabular-nums border"
              [class.bg-emerald-50]="res.score >= 90"
              [class.dark:bg-emerald-950/60]="res.score >= 90"
              [class.text-emerald-700]="res.score >= 90"
              [class.dark:text-emerald-400]="res.score >= 90"
              [class.border-emerald-200]="res.score >= 90"
              [class.dark:border-emerald-800/80]="res.score >= 90"
              [class.bg-amber-50]="res.score >= 70 && res.score < 90"
              [class.dark:bg-amber-950/60]="res.score >= 70 && res.score < 90"
              [class.text-amber-800]="res.score >= 70 && res.score < 90"
              [class.dark:text-amber-400]="res.score >= 70 && res.score < 90"
              [class.border-amber-200]="res.score >= 70 && res.score < 90"
              [class.dark:border-amber-800/80]="res.score >= 70 && res.score < 90"
              [class.bg-rose-50]="res.score < 70"
              [class.dark:bg-rose-950/60]="res.score < 70"
              [class.text-rose-800]="res.score < 70"
              [class.dark:text-rose-400]="res.score < 70"
              [class.border-rose-200]="res.score < 70"
              [class.dark:border-rose-800/80]="res.score < 70">
              <span class="inline-flex items-center">
                @if (res.score >= 90) {
                  <svg class="w-3.5 h-3.5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
                } @else if (res.score >= 70) {
                  <svg class="w-3.5 h-3.5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
                } @else {
                  <svg class="w-3.5 h-3.5 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
                }
              </span>
              <span>Compatibility: {{ res.score }}%</span>
            </div>

            <span class="text-xs font-semibold text-text-primary">
              @if (res.score >= 90) {
                {{ i18n.isRo() ? 'Configurație Verificată' : 'Verified Compatible' }}
              } @else if (res.score >= 70) {
                {{ i18n.isRo() ? 'Necesită Atenție / Adaptor' : 'Advisory / Requires Adapter' }}
              } @else {
                {{ i18n.isRo() ? 'Conflict Hardware Detectat' : 'Hardware Conflict Detected' }}
              }
            </span>
          </div>

          <div class="flex items-center gap-2 text-[11px] text-text-muted">
            @if (res.issues.length > 0) {
              <span class="text-amber-600 dark:text-amber-400 font-semibold">{{ res.issues.length }} {{ i18n.isRo() ? 'avize tehnice' : 'advisories' }}</span>
            } @else {
              <span class="text-emerald-600 dark:text-emerald-400 font-semibold">0 {{ i18n.isRo() ? 'conflicte' : 'conflicts' }}</span>
            }
          </div>
        </div>

        @if (res.issues.length > 0) {
          <div class="p-4 space-y-3">
            @for (issue of res.issues; track issue.title) {
              <div 
                class="p-3.5 rounded-lg border text-xs space-y-2 transition-colors"
                [class.bg-amber-50]="issue.severity === 'warning'"
                [class.dark:bg-amber-950/30]="issue.severity === 'warning'"
                [class.border-amber-200]="issue.severity === 'warning'"
                [class.dark:border-amber-800/60]="issue.severity === 'warning'"
                [class.text-amber-900]="issue.severity === 'warning'"
                [class.dark:text-amber-200]="issue.severity === 'warning'"
                [class.bg-rose-50]="issue.severity === 'error'"
                [class.dark:bg-rose-950/30]="issue.severity === 'error'"
                [class.border-rose-200]="issue.severity === 'error'"
                [class.dark:border-rose-800/60]="issue.severity === 'error'"
                [class.text-rose-900]="issue.severity === 'error'"
                [class.dark:text-rose-200]="issue.severity === 'error'"
                [class.bg-blue-50]="issue.severity === 'info'"
                [class.dark:bg-blue-950/30]="issue.severity === 'info'"
                [class.border-blue-200]="issue.severity === 'info'"
                [class.dark:border-blue-800/60]="issue.severity === 'info'"
                [class.text-blue-950]="issue.severity === 'info'"
                [class.dark:text-blue-200]="issue.severity === 'info'">
                
                <div class="flex items-center justify-between gap-2">
                  <div class="flex items-center gap-2 font-bold">
                    <span class="inline-flex items-center">
                      @if (issue.severity === 'error') {
                        <svg class="w-3.5 h-3.5 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
                      } @else if (issue.severity === 'warning') {
                        <svg class="w-3.5 h-3.5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
                      } @else {
                        <svg class="w-3.5 h-3.5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                      }
                    </span>
                    <span>{{ i18n.isRo() ? issue.title : issue.titleEn }}</span>
                  </div>
                  <app-ui-badge [variant]="issue.severity === 'error' ? 'error' : (issue.severity === 'warning' ? 'warning' : 'accent')">
                    {{ issue.severity.toUpperCase() }}
                  </app-ui-badge>
                </div>

                <p class="text-[11px] opacity-90 leading-relaxed font-sans">
                  {{ i18n.isRo() ? issue.message : issue.messageEn }}
                </p>

                @if (issue.suggestedFixSku) {
                  <div class="pt-2 flex items-center justify-between gap-2 border-t border-border/40">
                    <span class="text-[10px] text-text-muted">
                      {{ i18n.isRo() ? 'Soluție recomandată:' : 'Recommended fix:' }} {{ issue.suggestedFixName }}
                    </span>
                    <button 
                      type="button"
                      (click)="onAddFix(issue.suggestedFixSku)"
                      class="px-2.5 py-1 rounded bg-primary hover:bg-primary-hover text-primary-contrast font-medium text-[10px] uppercase tracking-wider transition-colors">
                      + {{ i18n.isRo() ? 'Adaugă în Configurație' : 'Add Fix to Setup' }}
                    </button>
                  </div>
                }
              </div>
            }
          </div>
        }

        @if (!compact() && res.positiveMatches.length > 0) {
          <div class="px-4 pb-4 space-y-2">
            <div class="text-[11px] uppercase text-text-muted font-medium">
              {{ i18n.isRo() ? 'Validări Interoperabilitate Hardware' : 'Verified Hardware Interoperability' }}
            </div>
            <div class="space-y-1.5">
              @for (match of (i18n.isRo() ? res.positiveMatches : res.positiveMatchesEn); track match) {
                <div class="flex items-start gap-2 text-xs text-emerald-700 dark:text-emerald-400">
                  <svg class="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
                  <span class="text-text-secondary font-sans text-[11px]">{{ match }}</span>
                </div>
              }
            </div>
          </div>
        }

      </div>
    }
  `
})
export class UiCompatibilityEngineComponent {
  i18n = inject(TranslationService);

  result = input<CompatibilityResult | null>(null);
  compact = input<boolean>(false);
  addFix = output<string>();

  onAddFix(sku: string) {
    this.addFix.emit(sku);
  }
}
