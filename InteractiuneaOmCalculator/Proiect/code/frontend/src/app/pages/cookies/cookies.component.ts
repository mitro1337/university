import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-cookies',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto transition-colors">
      <nav class="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-6">
        <a routerLink="/" class="hover:text-slate-900 dark:hover:text-white transition-colors">{{ i18n.isRo() ? 'Acasă' : 'Home' }}</a>
        <span>/</span>
        <span class="text-slate-900 dark:text-white font-medium">{{ i18n.isRo() ? 'Politica privind Modulele Cookie' : 'Cookie Policy' }}</span>
      </nav>

      <div class="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xs mb-8 transition-colors">
        <div class="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
          <div>
            <div class="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-[11px] font-semibold text-blue-700 dark:text-blue-300 uppercase tracking-wide mb-2">
              <span class="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
              Directiva ePrivacy (2002/58/CE) & Legea 506/2004
            </div>
            <h1 class="font-display text-2xl sm:text-3xl uppercase tracking-wide text-slate-900 dark:text-white">
              Politica privind Modulele Cookie și Tehnologiile Similare
            </h1>
          </div>
          <div class="text-right text-xs text-slate-500 dark:text-slate-400">
            <div>S.C. VEXERA HARDWARE S.R.L.</div>
            <div class="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold">Confidențialitate Garantată</div>
          </div>
        </div>

        <p class="mt-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          Platforma <strong>Vexera</strong> (<a href="https://vexera.ro" class="text-blue-600 dark:text-blue-400 underline">vexera.ro</a>) 
          folosește tehnologii de stocare locală (cookies și localStorage) strict pentru buna funcționare tehnică a magazinului, menținerea coșului de cumpărături, 
          memorarea preferințelor de afișare (Dark Mode / Light Mode) și selectarea limbii (Română / Engleză). 
          <strong>Nu utilizăm cookie-uri terțe de urmărire publicitară (ad-tracking) intruzivă.</strong>
        </p>
      </div>

      <div class="space-y-6 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
        <div class="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xs transition-colors">
          <h2 class="font-heading text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
            1. Cookie-uri și Tehnologii Strict Necesare (Esențiale)
          </h2>
          <p class="mb-4 text-xs text-slate-600 dark:text-slate-400">
            Aceste fișiere sunt indispensabile pentru navigarea pe site și utilizarea funcționalităților sale de bază, precum adăugarea produselor în coș și finalizarea comenzilor. Fără acestea, serviciile solicitate nu pot fi furnizate.
          </p>
          <table class="w-full text-xs text-left border-collapse border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden mb-4">
            <thead class="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold uppercase tracking-wider">
              <tr>
                <th class="p-3 border-b border-slate-200 dark:border-slate-700">Cheie Identificator</th>
                <th class="p-3 border-b border-slate-200 dark:border-slate-700">Tip / Tehnologie</th>
                <th class="p-3 border-b border-slate-200 dark:border-slate-700">Scop</th>
                <th class="p-3 border-b border-slate-200 dark:border-slate-700">Durată Stocare</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
              <tr>
                <td class="p-3 font-bold text-slate-900 dark:text-white">vexera_cart</td>
                <td class="p-3 font-sans">Local Storage</td>
                <td class="p-3 font-sans">Reține articolele adăugate în coșul de cumpărături</td>
                <td class="p-3">30 zile</td>
              </tr>
              <tr>
                <td class="p-3 font-bold text-slate-900 dark:text-white">vexera_lang</td>
                <td class="p-3 font-sans">Local Storage</td>
                <td class="p-3 font-sans">Memorează limba selectată (ro / en)</td>
                <td class="p-3">1 an</td>
              </tr>
              <tr>
                <td class="p-3 font-bold text-slate-900 dark:text-white">vexera_theme</td>
                <td class="p-3 font-sans">Local Storage</td>
                <td class="p-3 font-sans">Memorează preferința Dark Mode / Light Mode</td>
                <td class="p-3">1 an</td>
              </tr>
              <tr>
                <td class="p-3 font-bold text-slate-900 dark:text-white">vexera_session</td>
                <td class="p-3 font-sans">Cookie Sesiune HTTP-Only</td>
                <td class="p-3 font-sans">Menținerea securizată a sesiunii de checkout</td>
                <td class="p-3">Durata sesiunii</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xs transition-colors">
          <h2 class="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-blue-600"></span>
            2. Cum Puteți Controla și Șterge Cookie-urile
          </h2>
          <p class="mb-3 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Puteți seta browserul dumneavoastră să refuze sau să șteargă toate cookie-urile sau să vă alerteze atunci când sunt trimise cookie-uri. 
            Instrucțiuni specifice sunt disponibile în secțiunea de setări a browserului dumneavoastră:
          </p>
          <ul class="list-disc pl-5 space-y-1 text-xs text-slate-600 dark:text-slate-400">
            <li>Google Chrome: Setări → Confidențialitate și securitate → Module cookie și alte date privind site-urile</li>
            <li>Mozilla Firefox: Opțiuni → Confidențialitate și securitate → Cookie-uri și date de site</li>
            <li>Apple Safari: Preferințe → Confidențialitate → Gestionați datele site-urilor</li>
            <li>Microsoft Edge: Setări → Permisiuni pentru site-uri → Cookie-uri și date stocate</li>
          </ul>
        </div>
      </div>

      <div class="mt-10 flex flex-wrap items-center justify-center gap-4 text-xs">
        <a routerLink="/" class="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white font-bold transition-all shadow-sm">
          {{ i18n.isRo() ? '← Înapoi la Magazin' : '← Back to Store' }}
        </a>
        <a routerLink="/confidentialitate" class="px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold transition-all">
          {{ i18n.isRo() ? 'Politica de Confidențialitate & GDPR →' : 'Privacy Policy & GDPR →' }}
        </a>
      </div>
    </div>
  `
})
export class CookiePolicyComponent {
  i18n = inject(TranslationService);
}
