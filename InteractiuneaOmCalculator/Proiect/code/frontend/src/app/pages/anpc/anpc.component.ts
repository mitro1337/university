import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-anpc',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto transition-colors">
      <nav class="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-6">
        <a routerLink="/" class="hover:text-slate-900 dark:hover:text-white transition-colors">Acasă</a>
        <span>/</span>
        <span class="text-slate-900 dark:text-white font-medium">Protecția Consumatorilor (ANPC & SOL)</span>
      </nav>

      <div class="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xs mb-8 transition-colors">
        <div class="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
          <div>
            <div class="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-[11px] font-semibold text-blue-700 dark:text-blue-300 uppercase tracking-wide mb-2">
              <span class="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
              Ordinul ANPC nr. 449/2022 & Regulamentul (UE) nr. 524/2013
            </div>
            <h1 class="font-display text-2xl sm:text-3xl uppercase tracking-wide text-slate-900 dark:text-white">
              Protecția Consumatorilor & Soluționarea Litigiilor
            </h1>
          </div>
          <div class="text-right text-xs text-slate-500 dark:text-slate-400 tabular-nums">
            <div>Telefonul Consumatorului: <strong class="text-slate-900 dark:text-white">021 9551</strong></div>
            <div class="text-[11px] text-blue-600 dark:text-blue-400 font-bold">www.anpc.ro</div>
          </div>
        </div>

        <p class="mt-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          În conformitate cu legislația națională și europeană privind drepturile consumatorilor, 
          <strong>S.C. VEXERA HARDWARE S.R.L.</strong> garantează respectarea deplină a drepturilor cumpărătorilor persoane fizice. 
          Încurajăm soluționarea pe cale amiabilă a oricărei sesizări prin intermediul departamentului nostru de asistență tehnică 
          (<a href="mailto:suport@vexera.ro" class="text-blue-600 dark:text-blue-400 font-bold underline">suport&#64;vexera.ro</a>) 
          și punem la dispoziție căile oficiale de informare și sesizare către autorități.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        
        <div class="bg-gradient-to-br from-[#002b54] to-[#001f3d] rounded-2xl p-6 sm:p-7 text-white shadow-md border border-blue-900/40 flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between mb-4">
              <span class="text-[10px] font-bold tracking-wider px-2.5 py-1 rounded-md bg-white/10 border border-white/20 text-amber-300 uppercase">
                ANPC ROMÂNIA
              </span>
              <svg class="w-8 h-8 text-amber-300 opacity-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"/>
              </svg>
            </div>
            <h3 class="text-lg font-black tracking-wide leading-tight mb-2">
              Soluționarea Alternativă a Litigiilor (SAL)
            </h3>
            <p class="text-xs text-blue-100 leading-relaxed mb-6">
              Mecanism extrajudiciar de soluționare a litigiilor naționale și transfrontaliere, prin care consumatorii 
              pot propune sau impune o soluție rapidă și gratuită prin intermediul Direcției de Soluționare Alternativă a Litigiilor din cadrul ANPC.
            </p>
          </div>
          <a 
            href="https://anpc.ro/ce-este-sal/" 
            target="_blank" 
            rel="noopener noreferrer"
            class="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs tracking-wide transition-all shadow-sm">
            <span>Accesează Platforma Oficială SAL (anpc.ro)</span>
          </a>
        </div>

        <div class="bg-gradient-to-br from-[#00387a] to-[#002759] rounded-2xl p-6 sm:p-7 text-white shadow-md border border-blue-900/40 flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between mb-4">
              <span class="text-[10px] font-bold tracking-wider px-2.5 py-1 rounded-md bg-white/10 border border-white/20 text-amber-300 uppercase">
                COMISIA EUROPEANĂ
              </span>
              <svg class="w-8 h-8 text-amber-300 opacity-90" fill="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="4" r="1.3"/>
                <circle cx="16" cy="5.1" r="1.3"/>
                <circle cx="18.9" cy="8" r="1.3"/>
                <circle cx="20" cy="12" r="1.3"/>
                <circle cx="18.9" cy="16" r="1.3"/>
                <circle cx="16" cy="18.9" r="1.3"/>
                <circle cx="12" cy="20" r="1.3"/>
                <circle cx="8" cy="18.9" r="1.3"/>
                <circle cx="5.1" cy="16" r="1.3"/>
                <circle cx="4" cy="12" r="1.3"/>
                <circle cx="5.1" cy="8" r="1.3"/>
                <circle cx="8" cy="5.1" r="1.3"/>
              </svg>
            </div>
            <h3 class="text-lg font-black tracking-wide leading-tight mb-2">
              Soluționarea Online a Litigiilor (SOL / ODR)
            </h3>
            <p class="text-xs text-blue-100 leading-relaxed mb-6">
              Punctul unic de acces pus la dispoziție de Uniunea Europeană pentru consumatorii și comercianții care doresc să rezolve 
              disputele contractuale privind achizițiile online cu asistența unui organism neutru de soluționare a litigiilor.
            </p>
          </div>
          <a 
            href="https://ec.europa.eu/consumers/odr" 
            target="_blank" 
            rel="noopener noreferrer"
            class="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs tracking-wide transition-all shadow-sm">
            <span>Accesează Platforma Europeană SOL (ec.europa.eu)</span>
          </a>
        </div>

      </div>

      <div class="space-y-6 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
        
        <div class="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xs transition-colors">
          <h2 class="font-heading text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-blue-600"></span>
            Autoritatea Națională pentru Protecția Consumatorilor (ANPC)
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs mb-4 tabular-nums">
            <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1">
              <div><strong class="text-slate-900 dark:text-white">Website Oficial:</strong> <a href="https://anpc.ro" target="_blank" rel="noopener noreferrer" class="text-blue-600 dark:text-blue-400 underline">https://anpc.ro</a></div>
              <div><strong class="text-slate-900 dark:text-white">Telefonul Consumatorului:</strong> 021 9551 (linie telefonică națională)</div>
              <div><strong class="text-slate-900 dark:text-white">Adresă Centrală:</strong> Bulevardul Aviatorilor nr. 72, Sector 1, București</div>
            </div>
            <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1">
              <div><strong class="text-slate-900 dark:text-white">Comisariatul Regional București-Ilfov:</strong></div>
              <div>Str. Transilvaniei nr. 2, Sector 1, București</div>
              <div>Telefon: 021 310 6375 | E-mail: reclamatii.bucuresti&#64;anpc.ro</div>
            </div>
          </div>

          <div class="pt-3 flex flex-wrap gap-3">
            <a 
              href="https://anpc.ro/reclamatii-anpc/" 
              target="_blank" 
              rel="noopener noreferrer"
              class="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors">
              <span>Formular Oficial Reclamații ANPC</span>
            </a>
            <a 
              href="tel:0219551"
              class="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-900 dark:text-white font-bold text-xs transition-colors">
              <svg class="w-3.5 h-3.5 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
              <span>Sună la 021 9551</span>
            </a>
          </div>
        </div>

        <div class="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xs transition-colors">
          <h2 class="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
            Drepturile Legale Asigurate de Vexera Cumpărătorilor
          </h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
              <strong class="text-emerald-600 dark:text-emerald-400 font-bold block mb-1">1. Retur în 14 Zile Calendaristice (OUG 34/2014)</strong>
              <p class="text-slate-600 dark:text-slate-400">
                Dreptul de a returna orice produs fără penalități și fără motivare în 14 zile de la primire. Banii sunt restituiți integral.
              </p>
              <a routerLink="/termeni-si-conditii" fragment="retur" class="text-blue-600 dark:text-blue-400 font-bold hover:underline inline-block mt-2">
                Procedură de retur →
              </a>
            </div>
            <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
              <strong class="text-emerald-600 dark:text-emerald-400 font-bold block mb-1">2. Garanție de Conformitate 24 Luni (OUG 140/2021)</strong>
              <p class="text-slate-600 dark:text-slate-400">
                Reparare sau înlocuire gratuită în termen de maxim 15 zile calendaristice pentru orice defecțiune de fabricație.
              </p>
              <a routerLink="/termeni-si-conditii" fragment="garantie" class="text-blue-600 dark:text-blue-400 font-bold hover:underline inline-block mt-2">
                Detalii garanție hardware →
              </a>
            </div>
          </div>
        </div>

      </div>

      <div class="mt-10 text-center">
        <a routerLink="/" class="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white font-bold text-xs sm:text-sm transition-all shadow-sm">
          <span>← Înapoi la Magazin</span>
        </a>
      </div>
    </div>
  `
})
export class AnpcComponent {
  i18n = inject(TranslationService);
}
