import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-privacy',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto transition-colors">
      <nav class="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-6">
        <a routerLink="/" class="hover:text-slate-900 dark:hover:text-white transition-colors">{{ i18n.isRo() ? 'Acasă' : 'Home' }}</a>
        <span>/</span>
        <span class="text-slate-900 dark:text-white font-medium">{{ i18n.isRo() ? 'Confidențialitate & GDPR' : 'Privacy & GDPR' }}</span>
      </nav>

      <div class="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xs mb-8 transition-colors">
        <div class="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
          <div>
            <div class="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-[11px] font-semibold text-emerald-700 dark:text-emerald-300 uppercase tracking-wide mb-2">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
              Regulamentul (UE) 2016/679 (GDPR)
            </div>
            <h1 class="font-display text-2xl sm:text-3xl uppercase tracking-wide text-slate-900 dark:text-white">
              Politica de Confidențialitate și Protecția Datelor
            </h1>
          </div>
          <div class="text-right text-xs text-slate-500 dark:text-slate-400">
            <div>Operator Date: S.C. VEXERA HARDWARE S.R.L.</div>
            <div class="text-[11px] text-blue-600 dark:text-blue-400 font-bold">DPO: dpo&#64;vexera.ro</div>
          </div>
        </div>

        <p class="mt-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          Protecția datelor dumneavoastră cu caracter personal este o prioritate fundamentală pentru <strong>S.C. VEXERA HARDWARE S.R.L.</strong>. 
          Această politică explică modul transparent în care colectăm, stocăm, prelucrăm și protejăm datele dumneavoastră atunci când 
          navigați, comandați sau interacționați cu platforma <strong>Vexera</strong> (<a href="https://vexera.ro" class="text-blue-600 dark:text-blue-400 underline">vexera.ro</a>), 
          în conformitate deplină cu <strong>Regulamentul General privind Protecția Datelor (UE) 2016/679 (GDPR)</strong> și Legea nr. 190/2018.
        </p>

        <div class="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800 flex flex-wrap gap-2 text-xs">
          <a href="/confidentialitate#operator" class="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors font-medium">
            1. Operator Date
          </a>
          <a href="/confidentialitate#categorii" class="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors font-medium">
            2. Date Colectate
          </a>
          <a href="/confidentialitate#scopuri" class="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors font-medium">
            3. Scopuri & Temeiuri
          </a>
          <a href="/confidentialitate#destinatari" class="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors font-medium">
            4. Destinatari (Curieri/Bănci)
          </a>
          <a href="/confidentialitate#retentie" class="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors font-medium">
            5. Perioadă Stocare
          </a>
          <a href="/confidentialitate#drepturi" class="px-2.5 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-200 dark:hover:bg-emerald-900 transition-colors font-bold">
            6. Drepturile Dumneavoastră
          </a>
          <a href="/confidentialitate#securitate" class="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors font-medium">
            7. Securitate TLS
          </a>
          <a href="/confidentialitate#cookies" class="px-2.5 py-1 rounded-lg bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-900 transition-colors font-bold">
            8. Module Cookie
          </a>
          <a href="/confidentialitate#anspdcp" class="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors font-medium">
            9. Plângere ANSPDCP
          </a>
        </div>
      </div>

      <div class="space-y-8 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">

        <section id="operator" class="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xs transition-colors scroll-mt-24">
          <div class="flex items-center gap-3 mb-4">
            <span class="w-7 h-7 rounded-lg bg-slate-900 dark:bg-slate-800 text-white flex items-center justify-center font-bold text-xs">1</span>
            <h2 class="font-heading text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              Operatorul de Date și Datele de Contact DPO
            </h2>
          </div>
          <p class="mb-3">
            Operatorul responsabil de prelucrarea datelor cu caracter personal în sensul GDPR este:
          </p>
          <div class="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800 text-xs space-y-1.5 tabular-nums">
            <div><strong class="text-slate-900 dark:text-white">Operator:</strong> S.C. VEXERA HARDWARE S.R.L.</div>
            <div><strong class="text-slate-900 dark:text-white">C.U.I.:</strong> RO48921045 | <strong class="text-slate-900 dark:text-white">Reg. Com.:</strong> J40/18294/2024</div>
            <div><strong class="text-slate-900 dark:text-white">Sediu Social:</strong> Splaiul Independenței nr. 319, Sector 6, București, România</div>
            <div><strong class="text-slate-900 dark:text-white">Responsabil cu Protecția Datelor (DPO):</strong> dpo&#64;vexera.ro</div>
            <div><strong class="text-slate-900 dark:text-white">E-mail General:</strong> contact&#64;vexera.ro | <strong class="text-slate-900 dark:text-white">Telefon:</strong> 0720 123 456</div>
          </div>
        </section>

        <section id="categorii" class="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xs transition-colors scroll-mt-24">
          <div class="flex items-center gap-3 mb-4">
            <span class="w-7 h-7 rounded-lg bg-slate-900 dark:bg-slate-800 text-white flex items-center justify-center font-bold text-xs">2</span>
            <h2 class="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              Categoriile de Date cu Caracter Personal Colectate
            </h2>
          </div>
          <p class="mb-3">
            În funcție de interacțiunea dumneavoastră cu magazinul online Vexera (navigare, comandă ca oaspete sau cont de client), prelucrăm:
          </p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
              <strong class="text-slate-900 dark:text-white block mb-1 font-bold">1. Date de identificare & contact:</strong>
              <p class="text-xs text-slate-600 dark:text-slate-400">
                Nume, prenume, adresă de e-mail, număr de telefon (necesar pentru notificări SMS curierat).
              </p>
            </div>
            <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
              <strong class="text-slate-900 dark:text-white block mb-1 font-bold">2. Date de livrare & facturare:</strong>
              <p class="text-xs text-slate-600 dark:text-slate-400">
                Adresă de livrare (județ, localitate, stradă, cod poștal), date de facturare (date companie sau CNP conform cerințelor fiscale ANAF e-Factura dacă se solicită).
              </p>
            </div>
            <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
              <strong class="text-slate-900 dark:text-white block mb-1 font-bold">3. Date privind comenzile & tranzacțiile:</strong>
              <p class="text-xs text-slate-600 dark:text-slate-400">
                Produse achiziționate, număr comandă, AWB expediere, status plată, istoric garanții și retururi. 
                <em>Nu stocăm date de card (număr, CVV) – acestea sunt procesate exclusiv și criptat de procesatorul de plăți licențiat PCI-DSS.</em>
              </p>
            </div>
            <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
              <strong class="text-slate-900 dark:text-white block mb-1 font-bold">4. Date tehnice de navigare:</strong>
              <p class="text-xs text-slate-600 dark:text-slate-400">
                Adresă IP anonimizată, tip browser, sistem de operare, identificator sesiune coș de cumpărături, preferințe temă (dark/light) și limbă (RO/EN).
              </p>
            </div>
          </div>
        </section>

        <section id="scopuri" class="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xs transition-colors scroll-mt-24">
          <div class="flex items-center gap-3 mb-4">
            <span class="w-7 h-7 rounded-lg bg-slate-900 dark:bg-slate-800 text-white flex items-center justify-center font-bold text-xs">3</span>
            <h2 class="font-heading text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              Scopurile și Temeiurile Juridice ale Prelucrării
            </h2>
          </div>
          <table class="w-full text-xs text-left border-collapse border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
            <thead class="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold uppercase tracking-wider">
              <tr>
                <th class="p-3 border-b border-slate-200 dark:border-slate-700">Scopul Prelucrării</th>
                <th class="p-3 border-b border-slate-200 dark:border-slate-700">Temei Legal (GDPR)</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
              <tr>
                <td class="p-3">Preluarea, validarea, facturarea și expedierea comenzilor plasate</td>
                <td class="p-3 text-emerald-600 dark:text-emerald-400 font-semibold">Art. 6 alin. (1) lit. (b) - Executarea contractului</td>
              </tr>
              <tr>
                <td class="p-3">Conformitatea cu legislația fiscală (emitere facturi, raportare ANAF RO e-Factura)</td>
                <td class="p-3 text-blue-600 dark:text-blue-400 font-semibold">Art. 6 alin. (1) lit. (c) - Obligație legală a operatorului</td>
              </tr>
              <tr>
                <td class="p-3">Soluționarea solicitărilor de service, garanție (24 luni) și retur (14 zile)</td>
                <td class="p-3 text-emerald-600 dark:text-emerald-400 font-semibold">Art. 6 alin. (1) lit. (b) & (c) - OUG 140/2021 & OUG 34/2014</td>
              </tr>
              <tr>
                <td class="p-3">Prevenirea fraudelor, securitatea platformei și apărarea drepturilor în instanță</td>
                <td class="p-3 text-amber-600 dark:text-amber-400 font-semibold">Art. 6 alin. (1) lit. (f) - Interes legitim al operatorului</td>
              </tr>
            </tbody>
          </table>
        </section>

        <section id="destinatari" class="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xs transition-colors scroll-mt-24">
          <div class="flex items-center gap-3 mb-4">
            <span class="w-7 h-7 rounded-lg bg-slate-900 dark:bg-slate-800 text-white flex items-center justify-center font-bold text-xs">4</span>
            <h2 class="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              Destinatarii Datelor cu Caracter Personal
            </h2>
          </div>
          <p class="mb-3">
            Nu vindem, nu închiriem și nu înstrăinăm datele dumneavoastră personale către terți în scopuri de marketing. 
            Datele sunt transmise strict partenerilor contractuali autorizați, exclusiv în măsura necesară livrării comenzii:
          </p>
          <ul class="list-disc pl-5 space-y-2">
            <li><strong>Companiile de Curierat Rapid:</strong> Sameday Courier (Delivery Solutions S.A.), Fan Courier Express S.R.L. – pentru preluarea adresei și livrarea fizică a coletelor / easybox.</li>
            <li><strong>Furnizori de Servicii de Plată Online:</strong> Instituții bancare și procesatori autorizați de Banca Națională a României (BNR) și licențiați PCI-DSS pentru procesarea sigură a plăților cu cardul.</li>
            <li><strong>Furnizori de Software & Cloud:</strong> Platforme securizate de facturare integrată RO e-Factura și baze de date cu centre de stocare pe teritoriul Uniunii Europene.</li>
            <li><strong>Autorități Publice:</strong> Agenția Națională de Administrare Fiscală (ANAF), ANPC sau instanțe judecătorești, exclusiv în baza unei cereri oficiale întemeiate pe lege.</li>
          </ul>
        </section>

        <section id="retentie" class="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xs transition-colors scroll-mt-24">
          <div class="flex items-center gap-3 mb-4">
            <span class="w-7 h-7 rounded-lg bg-slate-900 dark:bg-slate-800 text-white flex items-center justify-center font-bold text-xs">5</span>
            <h2 class="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              Perioada de Păstrare a Datelor
            </h2>
          </div>
          <ul class="list-disc pl-5 space-y-2">
            <li><strong>Date Financiar-Contabile (Facturi):</strong> Conform Legii Contabilității nr. 82/1991 și Codului Fiscal, facturile și documentele justificative de plată sunt păstrate pe o perioadă obligatorie de <strong>10 ani</strong>, începând cu data încheierii exercițiului financiar în cursul căruia au fost întocmite.</li>
            <li><strong>Date aferente Garanției Tehnice:</strong> Păstrate pe o perioadă de <strong>24 - 36 de luni</strong> pentru a asigura trasabilitatea pieselor de schimb și a reparațiilor în garanție.</li>
            <li><strong>Sesiuni Coș și Preferințe UI:</strong> Stocate temporar local în browserul dumneavoastră (localStorage / cookies de sesiune) până la ștergerea memoriei cache sau finalizarea comenzii.</li>
          </ul>
        </section>

        <section id="drepturi" class="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border-2 border-emerald-300 dark:border-emerald-800/80 shadow-xs transition-colors scroll-mt-24">
          <div class="flex items-center gap-3 mb-4">
            <span class="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">6</span>
            <h2 class="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>Drepturile Dumneavoastră Conform Regulamentului GDPR</span>
              <span class="text-xs px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold">Art. 15-22</span>
            </h2>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
              <strong class="text-slate-900 dark:text-white block font-bold mb-1">1. Dreptul de Acces (Art. 15):</strong>
              <p class="text-xs text-slate-600 dark:text-slate-400">Puteți solicita oricând o confirmare a faptului că datele vă sunt prelucrate și o copie gratuită a acestora.</p>
            </div>
            <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
              <strong class="text-slate-900 dark:text-white block font-bold mb-1">2. Dreptul la Rectificare (Art. 16):</strong>
              <p class="text-xs text-slate-600 dark:text-slate-400">Puteți solicita corectarea oricăror date inexacte (exemplu: adresă de livrare greșită, număr de telefon).</p>
            </div>
            <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
              <strong class="text-slate-900 dark:text-white block font-bold mb-1">3. Dreptul la Ștergere / Uitarea (Art. 17):</strong>
              <p class="text-xs text-slate-600 dark:text-slate-400">Puteți cere ștergerea datelor atunci când acestea nu mai sunt necesare scopurilor inițiale (cu excepția documentelor contabile obligatorii).</p>
            </div>
            <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
              <strong class="text-slate-900 dark:text-white block font-bold mb-1">4. Dreptul la Restricționare (Art. 18):</strong>
              <p class="text-xs text-slate-600 dark:text-slate-400">Puteți limita temporar prelucrarea datelor în timpul soluționării unei contestații privind exactitatea acestora.</p>
            </div>
            <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
              <strong class="text-slate-900 dark:text-white block font-bold mb-1">5. Dreptul la Portabilitate (Art. 20):</strong>
              <p class="text-xs text-slate-600 dark:text-slate-400">Puteți primi datele furnizate într-un format structurat, utilizat în mod curent și care poate fi citit automat (JSON/CSV).</p>
            </div>
            <div class="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
              <strong class="text-slate-900 dark:text-white block font-bold mb-1">6. Dreptul la Opoziție (Art. 21):</strong>
              <p class="text-xs text-slate-600 dark:text-slate-400">Vă puteți opune în orice moment prelucrării bazate pe interes legitim sau în scop de marketing direct.</p>
            </div>
          </div>

          <div class="mt-4 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs">
            <strong>Cum vă exercitați drepturile:</strong> Transmiteți o simplă cerere scrisă la adresa 
            <a href="mailto:dpo@vexera.ro" class="text-emerald-700 dark:text-emerald-300 font-bold underline">dpo&#64;vexera.ro</a>. 
            Vom răspunde în termen legal de cel mult <strong>30 de zile calendaristice</strong>, fără niciun cost din partea dumneavoastră.
          </div>
        </section>

        <section id="securitate" class="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xs transition-colors scroll-mt-24">
          <div class="flex items-center gap-3 mb-4">
            <span class="w-7 h-7 rounded-lg bg-slate-900 dark:bg-slate-800 text-white flex items-center justify-center font-bold text-xs">7</span>
            <h2 class="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              Măsuri Tehnice și Organizatorice de Securitate
            </h2>
          </div>
          <p class="mb-3">
            Vexera aplică măsuri avansate de securitate cibernetică pentru a garanta confidențialitatea și integritatea datelor dumneavoastră:
          </p>
          <ul class="list-disc pl-5 space-y-2 text-xs">
            <li><strong>Criptare în Tranzit:</strong> Toate comunicațiile dintre browserul dumneavoastră și serverele Vexera sunt securizate prin protocolul HTTPS / TLS 1.3 cu certificate digitale valide.</li>
            <li><strong>Izolare Acces:</strong> Accesul la baza de date de comenzi este restricționat strict pe bază de roluri (RBAC) pentru personalul autorizat din depozit și contabilitate.</li>
            <li><strong>Backup-uri Criptate:</strong> Backup-urile automate sunt stocate pe servere redundante situate în centre de date securizate pe teritoriul Uniunii Europene.</li>
          </ul>
        </section>

        <section id="cookies" class="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border-2 border-blue-300 dark:border-blue-800/80 shadow-xs transition-colors scroll-mt-24">
          <div class="flex items-center gap-3 mb-4">
            <span class="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs">8</span>
            <h2 class="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>Politica privind Modulele Cookie și Stocarea Locală</span>
              <span class="text-xs px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 font-bold">Directiva ePrivacy</span>
            </h2>
          </div>
          <p class="mb-3">
            Platforma Vexera utilizează tehnologii de stocare locală (cookie-uri și HTML5 localStorage) strict în scopul asigurării 
            funcționării corecte a magazinului online. Nu utilizăm scripturi intruzive de urmărire între site-uri terțe.
          </p>
          <table class="w-full text-xs text-left border-collapse border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden mb-4">
            <thead class="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold uppercase tracking-wider">
              <tr>
                <th class="p-3 border-b border-slate-200 dark:border-slate-700">Denumire Element</th>
                <th class="p-3 border-b border-slate-200 dark:border-slate-700">Tip / Scop</th>
                <th class="p-3 border-b border-slate-200 dark:border-slate-700">Durată</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 dark:divide-slate-800">
              <tr>
                <td class="p-3 font-bold text-slate-900 dark:text-white">vexera_cart</td>
                <td class="p-3">Esențial: Menține produsele adăugate în coș pe parcursul sesiunii</td>
                <td class="p-3">Sesiune / 30 zile</td>
              </tr>
              <tr>
                <td class="p-3 font-bold text-slate-900 dark:text-white">vexera_lang</td>
                <td class="p-3">Esențial: Reține selecția de limbă (Română sau Engleză)</td>
                <td class="p-3">Persistent (1 an)</td>
              </tr>
              <tr>
                <td class="p-3 font-bold text-slate-900 dark:text-white">vexera_theme</td>
                <td class="p-3">Esențial: Reține preferința pentru modul întunecat sau luminos</td>
                <td class="p-3">Persistent (1 an)</td>
              </tr>
            </tbody>
          </table>
          <p class="text-xs text-slate-500 dark:text-slate-400">
            Puteți șterge sau bloca oricând aceste elemente direct din setările de confidențialitate ale browserului dumneavoastră web.
          </p>
        </section>

        <section id="anspdcp" class="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xs transition-colors scroll-mt-24">
          <div class="flex items-center gap-3 mb-4">
            <span class="w-7 h-7 rounded-lg bg-slate-900 dark:bg-slate-800 text-white flex items-center justify-center font-bold text-xs">9</span>
            <h2 class="font-heading text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              Dreptul de a Depune o Plângere la Autoritatea Națională (ANSPDCP)
            </h2>
          </div>
          <p class="mb-3">
            În cazul în care considerați că prelucrarea datelor dumneavoastră încalcă prevederile Regulamentului GDPR și nu ați primit o rezolvare 
            satisfăcătoare din partea responsabilului nostru DPO, aveți dreptul legal de a depune o plângere la autoritatea de supraveghere competentă:
          </p>
          <div class="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800 text-xs space-y-1.5 tabular-nums">
            <div><strong class="text-slate-900 dark:text-white">Autoritate:</strong> Autoritatea Națională de Supraveghere a Prelucrării Datelor cu Caracter Personal (ANSPDCP)</div>
            <div><strong class="text-slate-900 dark:text-white">Adresă:</strong> B-dul G-ral. Gheorghe Magheru nr. 28-30, Sector 1, cod poștal 010336, București, România</div>
            <div><strong class="text-slate-900 dark:text-white">Telefon:</strong> +40.318.059.211 / +40.318.059.212</div>
            <div><strong class="text-slate-900 dark:text-white">E-mail:</strong> anspdcp&#64;dataprotection.ro</div>
            <div><strong class="text-slate-900 dark:text-white">Website Oficial:</strong> <a href="https://www.dataprotection.ro" target="_blank" rel="noopener noreferrer" class="text-blue-600 dark:text-blue-400 underline">www.dataprotection.ro</a></div>
          </div>
        </section>

      </div>

      <div class="mt-10 flex flex-wrap items-center justify-center gap-4 text-xs">
        <a routerLink="/" class="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white font-bold transition-all shadow-sm">
          {{ i18n.isRo() ? '← Înapoi la Magazin' : '← Back to Store' }}
        </a>
        <a routerLink="/termeni-si-conditii" class="px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold transition-all">
          {{ i18n.isRo() ? 'Vezi Termeni și Condiții →' : 'View Terms & Conditions →' }}
        </a>
      </div>
    </div>
  `
})
export class PrivacyComponent {
  i18n = inject(TranslationService);
}
