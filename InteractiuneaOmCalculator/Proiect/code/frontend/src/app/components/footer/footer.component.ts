import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslationService } from '../../services/translation.service';
import { LabProfileService } from '../../services/lab-profile.service';
import { KeyboardShortcutsService } from '../../services/keyboard-shortcuts.service';
import { AccessibilityService } from '../../services/accessibility.service';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, TranslatePipe],
  template: `
    <footer class="bg-surface border-t border-border text-text-muted text-xs mt-20 transition-colors">
      
      <div class="border-b border-border bg-surface-elevated py-6 transition-colors">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-xs font-semibold text-text-muted text-center mb-4">
            {{ i18n.isRo() ? 'Ecosisteme & Producători Hardware Suportați' : 'Supported Hardware Ecosystems & Vendors' }}
          </div>
          <div class="flex flex-wrap items-center justify-center gap-6 md:gap-12 opacity-80 text-xs font-semibold text-text-muted tracking-wide">
            <span>ARDUINO</span>
            <span>RASPBERRY PI</span>
            <span>ESPRESSIF (ESP32)</span>
            <span>MIKROTIK</span>
            <span>UBIQUITI</span>
            <span>NVIDIA JETSON</span>
            <span>INTEL NETWORKING</span>
            <span>SONOFF / EWEELINK</span>
            <span>SENSIRION</span>
          </div>
        </div>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          
          <div class="space-y-3">
            <div class="flex items-center gap-2">
              <div class="w-7 h-7 rounded-lg bg-primary text-primary-contrast flex items-center justify-center font-bold text-xs shadow-xs">
                <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
              </div>
              <span class="font-bold text-lg text-text-primary tracking-tight">Vexera</span>
            </div>
            <p class="text-xs text-text-muted leading-relaxed">
              {{ 'footer_about' | translate }}
            </p>
            
            <div class="pt-2 space-y-1 text-[11px] text-text-muted">
              <div class="font-semibold text-text-primary">S.C. VEXERA HARDWARE S.R.L.</div>
              <div>C.U.I.: RO48921045 | Reg. Com.: J40/18294/2024</div>
              <div>Capital social: 45.000 RON</div>
              <div>Sediu: Splaiul Independenței nr. 319, Sec. 6, București</div>
              <div>Hub Logistic: Șos. Fabrica de Glucoză nr. 15, Sec. 2</div>
            </div>

            <div class="pt-2 text-xs text-text-primary tabular-nums">
              <span class="text-text-muted">Tel:</span> <a href="tel:0720123456" class="hover:underline">0720 123 456</a> <span class="text-border mx-1.5">•</span> <span class="text-text-muted">Email:</span> <a href="mailto:contact@vexera.ro" class="hover:underline">contact&#64;vexera.ro</a>
            </div>
          </div>

          <div>
            <h4 class="text-text-primary font-semibold text-xs mb-3 flex items-center gap-1.5">
              <span class="w-1.5 h-1.5 rounded-full bg-accent"></span>
              {{ 'footer_categories' | translate }}
            </h4>
            <ul class="space-y-2 text-xs">
              <li>
                <a [routerLink]="['/categorie', 'sbc-microcontrollers']" class="hover:text-text-primary transition-colors">
                  {{ 'cat_sbc' | translate }}
                </a>
              </li>
              <li>
                <a [routerLink]="['/categorie', 'homelab-networking']" class="hover:text-text-primary transition-colors">
                  {{ 'cat_homelab' | translate }}
                </a>
              </li>
              <li>
                <a [routerLink]="['/categorie', 'sensors-iot']" class="hover:text-text-primary transition-colors">
                  {{ 'cat_sensors' | translate }}
                </a>
              </li>
              <li>
                <a [routerLink]="['/categorie', 'enterprise-hardware']" class="hover:text-text-primary transition-colors">
                  {{ 'cat_enterprise' | translate }}
                </a>
              </li>
              <li>
                <a [routerLink]="['/categorie', 'niche-hardware']" class="hover:text-text-primary transition-colors">
                  {{ 'cat_niche' | translate }}
                </a>
              </li>
              <li>
                <a [routerLink]="['/categorie', 'cybersecurity-research']" class="hover:text-text-primary transition-colors">
                  {{ 'cat_cybersecurity' | translate }}
                </a>
              </li>
              <li>
                <a [routerLink]="['/categorie', 'power-accessories']" class="hover:text-text-primary transition-colors">
                  {{ 'cat_power' | translate }}
                </a>
              </li>
              <li class="pt-1">
                <a routerLink="/produse" class="text-text-primary font-bold hover:underline">
                  {{ i18n.isRo() ? 'Toate cele 180 de echipamente →' : 'All 180 hardware products →' }}
                </a>
              </li>
            </ul>

            <h4 class="text-text-primary font-semibold text-xs mt-5 mb-2.5 flex items-center gap-1.5">
              <span class="w-1.5 h-1.5 rounded-full bg-accent"></span>
              {{ i18n.isRo() ? 'Configuratoare & Unelte' : 'Lab Tools & Builders' }}
            </h4>
            <ul class="space-y-1.5 text-xs">
              <li>
                <a routerLink="/build-your-lab" class="hover:text-text-primary transition-colors">
                  Build Your Lab
                </a>
              </li>
              <li>
                <a [routerLink]="['/build-your-lab']" [queryParams]="{ tab: 'rack' }" class="hover:text-text-primary transition-colors">
                  Visual 19" Rack Builder
                </a>
              </li>
              <li>
                <a routerLink="/compara" class="hover:text-text-primary transition-colors">
                  {{ i18n.isRo() ? 'Comparator Tehnic' : 'Hardware Comparison' }}
                </a>
              </li>
              <li>
                <button type="button" (click)="labProfileService.isDrawerOpen.set(true)" class="hover:text-text-primary transition-colors text-left cursor-pointer">
                  {{ i18n.isRo() ? 'Profil laborator' : 'My Lab Profile' }}
                </button>
              </li>
              <li>
                <button type="button" (click)="shortcutsService.openModal()" class="hover:text-text-primary transition-colors text-left cursor-pointer">
                  {{ i18n.isRo() ? 'Scurtături de tastatură' : 'Keyboard Shortcuts' }}
                </button>
              </li>
              <li>
                <button type="button" (click)="a11yService.openModal()" class="hover:text-text-primary transition-colors text-left cursor-pointer">
                  {{ i18n.isRo() ? 'Accesibilitate' : 'Accessibility' }}
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 class="text-text-primary font-semibold text-xs mb-3 flex items-center gap-1.5">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              {{ i18n.isRo() ? 'Drepturile Consumatorului & Legislație' : 'Consumer Rights & EU Compliance' }}
            </h4>
            <ul class="space-y-2 text-xs">
              <li class="flex items-start gap-2">
                <svg class="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
                <div>
                  <a [routerLink]="['/termeni-si-conditii']" fragment="retur" class="hover:underline">
                    <strong class="text-text-primary hover:text-accent transition-colors">{{ i18n.isRo() ? 'Retur Garantat 14 Zile' : '14-Day Return Right' }}</strong>
                  </a>
                  <p class="text-[11px] text-text-muted">
                    {{ i18n.isRo() ? 'Conform O.U.G. nr. 34/2014 pentru persoane fizice' : 'Under EU Directive 2011/83/EU' }}
                  </p>
                </div>
              </li>
              <li class="flex items-start gap-2">
                <svg class="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
                <div>
                  <a [routerLink]="['/termeni-si-conditii']" fragment="garantie" class="hover:underline">
                    <strong class="text-text-primary hover:text-accent transition-colors">{{ i18n.isRo() ? 'Garanție Tehnică 24 Luni' : '24-Month Legal Warranty' }}</strong>
                  </a>
                  <p class="text-[11px] text-text-muted">
                    {{ i18n.isRo() ? 'Conform O.U.G. nr. 140/2021 privind vânzarea bunurilor' : 'Under EU Directive 2019/771' }}
                  </p>
                </div>
              </li>
              <li class="flex items-start gap-2">
                <svg class="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
                <div>
                  <a routerLink="/confidentialitate" class="hover:underline">
                    <strong class="text-text-primary hover:text-accent transition-colors">{{ i18n.isRo() ? 'Confidențialitate & GDPR' : 'Data Privacy & GDPR' }}</strong>
                  </a>
                  <p class="text-[11px] text-text-muted">
                    {{ i18n.isRo() ? 'Conform Regulamentului (UE) 2016/679' : 'Compliant with EU Regulation 2016/679' }}
                  </p>
                </div>
              </li>
              <li class="flex items-start gap-2">
                <svg class="w-3.5 h-3.5 text-amber-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
                <div>
                  <a [routerLink]="['/termeni-si-conditii']" fragment="deee" class="hover:underline">
                    <strong class="text-text-primary hover:text-accent transition-colors">{{ i18n.isRo() ? 'Reciclare DEEE / WEEE' : 'WEEE Recycling' }}</strong>
                  </a>
                  <p class="text-[11px] text-text-muted">
                    {{ i18n.isRo() ? 'Colectare gratuită 1:1 conform O.U.G. nr. 5/2015' : 'Direct collection under EU WEEE Directive' }}
                  </p>
                </div>
              </li>
            </ul>
          </div>

          <div class="space-y-4">
            <h4 class="text-text-primary font-semibold text-xs flex items-center gap-1.5">
              <span class="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
              {{ i18n.isRo() ? 'Soluționare Litigii (ANPC)' : 'Dispute Resolution (ANPC & EU)' }}
            </h4>
            <p class="text-[11px] text-text-muted leading-relaxed">
              {{ i18n.isRo() ? 'Conform Ordinului ANPC nr. 449/2022 și Regulamentului (UE) nr. 524/2013, punem la dispoziție link-urile oficiale către procedurile de soluționare a litigiilor:' : 'In compliance with ANPC Order 449/2022 and EU Regulation 524/2013, official dispute resolution links are provided below:' }}
            </p>

            <a 
              href="https://anpc.ro/ce-este-sal/" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="block group rounded-xl overflow-hidden border border-border hover:border-accent transition-all shadow-xs bg-[#003366] text-white p-3">
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded bg-white/10 flex items-center justify-center flex-shrink-0 border border-border/40">
                  <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"/>
                  </svg>
                </div>
                <div>
                  <div class="text-[9px] font-bold tracking-wider text-amber-300 uppercase">ANPC ROMÂNIA</div>
                  <div class="text-[11px] font-bold leading-tight tracking-wide">
                    SOLUȚIONAREA ALTERNATIVĂ A LITIGIILOR (SAL)
                  </div>
                  <div class="text-[9px] text-blue-200 mt-0.5 group-hover:underline">
                    anpc.ro/ce-este-sal
                  </div>
                </div>
              </div>
            </a>

            <a 
              href="https://ec.europa.eu/consumers/odr" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="block group rounded-xl overflow-hidden border border-border hover:border-accent transition-all shadow-xs bg-[#004494] text-white p-3">
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded bg-white/10 flex items-center justify-center flex-shrink-0 border border-border/40">
                  <svg class="w-5 h-5 text-amber-300" fill="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="4" r="1.2"/>
                    <circle cx="16" cy="5.1" r="1.2"/>
                    <circle cx="18.9" cy="8" r="1.2"/>
                    <circle cx="20" cy="12" r="1.2"/>
                    <circle cx="18.9" cy="16" r="1.2"/>
                    <circle cx="16" cy="18.9" r="1.2"/>
                    <circle cx="12" cy="20" r="1.2"/>
                    <circle cx="8" cy="18.9" r="1.2"/>
                    <circle cx="5.1" cy="16" r="1.2"/>
                    <circle cx="4" cy="12" r="1.2"/>
                    <circle cx="5.1" cy="8" r="1.2"/>
                    <circle cx="8" cy="5.1" r="1.2"/>
                  </svg>
                </div>
                <div>
                  <div class="text-[9px] font-bold tracking-wider text-amber-300 uppercase">COMISIA EUROPEANĂ</div>
                  <div class="text-[11px] font-bold leading-tight tracking-wide">
                    SOLUȚIONAREA ONLINE A LITIGIILOR (SOL / ODR)
                  </div>
                  <div class="text-[9px] text-blue-200 mt-0.5 group-hover:underline">
                    ec.europa.eu/consumers/odr
                  </div>
                </div>
              </div>
            </a>

            <div class="text-[10px] text-text-muted flex flex-wrap items-center justify-between gap-2 pt-1">
              <span>{{ i18n.isRo() ? 'Telefon:' : 'Phone:' }} <a href="tel:0219551" class="font-bold text-text-primary hover:underline">021 9551</a></span>
              <div class="flex items-center gap-2">
                <a routerLink="/anpc" class="text-accent font-bold hover:underline">
                  {{ i18n.isRo() ? 'Ghid ANPC' : 'ANPC Guide' }}
                </a>
                <span>•</span>
                <a href="https://anpc.ro" target="_blank" rel="noopener noreferrer" class="text-accent hover:underline">
                  anpc.ro
                </a>
              </div>
            </div>

          </div>

        </div>

        <div class="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-text-muted">
          <div>
            © 2026 S.C. VEXERA HARDWARE S.R.L. {{ 'footer_rights' | translate }} {{ i18n.isRo() ? 'Înregistrat la Registrul Comerțului sub nr. J40/18294/2024.' : 'Registered in the Commercial Register under no. J40/18294/2024.' }}
          </div>
          <div class="flex flex-wrap items-center justify-center gap-3 font-medium">
            <a routerLink="/termeni-si-conditii" class="hover:text-text-primary hover:underline transition-colors">
              {{ i18n.isRo() ? 'Termeni și Condiții' : 'Terms & Conditions' }}
            </a>
            <span>•</span>
            <a routerLink="/confidentialitate" class="hover:text-text-primary hover:underline transition-colors">
              {{ i18n.isRo() ? 'Confidențialitate GDPR' : 'Privacy GDPR' }}
            </a>
            <span>•</span>
            <a routerLink="/politica-cookies" class="hover:text-text-primary hover:underline transition-colors">
              {{ i18n.isRo() ? 'Politica Cookies' : 'Cookie Policy' }}
            </a>
            <span>•</span>
            <a routerLink="/anpc" class="hover:text-text-primary hover:underline transition-colors">
              ANPC
            </a>
            <span>•</span>
            <a href="https://anpc.ro/ce-este-sal/" target="_blank" rel="noopener noreferrer" class="hover:text-text-primary hover:underline transition-colors">
              ANPC - SAL
            </a>
            <span>•</span>
            <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" class="hover:text-text-primary hover:underline transition-colors">
              Comisia Europeană - SOL
            </a>
          </div>
        </div>
      </div>

    </footer>
  `
})
export class FooterComponent {
  i18n = inject(TranslationService);
  labProfileService = inject(LabProfileService);
  shortcutsService = inject(KeyboardShortcutsService);
  a11yService = inject(AccessibilityService);
}
