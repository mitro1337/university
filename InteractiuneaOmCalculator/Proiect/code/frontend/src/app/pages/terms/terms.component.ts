import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-terms',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto transition-colors">
      <nav class="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-6">
        <a routerLink="/" class="hover:text-slate-900 dark:hover:text-white transition-colors">{{ i18n.isRo() ? 'Acasă' : 'Home' }}</a>
        <span>/</span>
        <span class="text-slate-900 dark:text-white font-medium">{{ i18n.isRo() ? 'Termeni și Condiții' : 'Terms & Conditions' }}</span>
      </nav>

      <div class="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xs mb-8 transition-colors">
        <div class="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
          <div>
            <div class="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-[11px] font-semibold text-blue-700 dark:text-blue-300 uppercase tracking-wide mb-2">
              <span class="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse"></span>
              Document Oficial • Actualizat Octombrie 2026
            </div>
            <h1 class="font-display text-2xl sm:text-3xl uppercase tracking-wide text-slate-900 dark:text-white">
              Termeni și Condiții de Utilizare și Vânzare
            </h1>
          </div>
          <div class="text-right text-xs text-slate-500 dark:text-slate-400">
            <div>S.C. VEXERA HARDWARE S.R.L.</div>
            <div class="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold">Conform OUG 34/2014 & OUG 140/2021</div>
          </div>
        </div>

        <p class="mt-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          Prezentul document reglementează termenii și condițiile de utilizare a platformei de comerț electronic 
          <strong>Vexera</strong> (<a href="https://vexera.ro" class="text-blue-600 dark:text-blue-400 underline">vexera.ro</a>) 
          și condițiile generale de vânzare a echipamentelor electronice, componentelor homelab, plăcilor de dezvoltare (SBC), 
          microcontrolerelor, senzorilor și accesoriilor hardware comercializate de către <strong>S.C. VEXERA HARDWARE S.R.L.</strong>.
        </p>

        <div class="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800 flex flex-wrap gap-2 text-xs">
          <a href="/termeni-si-conditii#identificare" class="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors font-medium">
            1. Date Identificare
          </a>
          <a href="/termeni-si-conditii#definitii" class="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors font-medium">
            2. Definiții
          </a>
          <a href="/termeni-si-conditii#produse" class="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors font-medium">
            3. Echipamente & ESD
          </a>
          <a href="/termeni-si-conditii#preturi" class="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors font-medium">
            4. Prețuri & Facturare
          </a>
          <a href="/termeni-si-conditii#livrare" class="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors font-medium">
            5. Livrare
          </a>
          <a href="/termeni-si-conditii#retur" class="px-2.5 py-1 rounded-lg bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 hover:bg-amber-200 dark:hover:bg-amber-900 transition-colors font-bold">
            6. Retur 14 Zile (OUG 34)
          </a>
          <a href="/termeni-si-conditii#garantie" class="px-2.5 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-200 dark:hover:bg-emerald-900 transition-colors font-bold">
            7. Garanție 24 Luni (OUG 140)
          </a>
          <a href="/termeni-si-conditii#gdpr" class="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors font-medium">
            8. GDPR
          </a>
          <a href="/termeni-si-conditii#deee" class="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors font-medium">
            9. DEEE / Reciclare
          </a>
          <a href="/termeni-si-conditii#litigii" class="px-2.5 py-1 rounded-lg bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-900 transition-colors font-bold">
            10. Litigii ANPC (SAL/SOL)
          </a>
        </div>
      </div>

      <div class="space-y-8 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">

        <section id="identificare" class="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xs transition-colors scroll-mt-24">
          <div class="flex items-center gap-3 mb-4">
            <span class="w-7 h-7 rounded-lg bg-slate-900 dark:bg-slate-800 text-white flex items-center justify-center font-bold text-xs">1</span>
            <h2 class="font-heading text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              Datele de Identificare ale Vânzătorului
            </h2>
          </div>
          <p class="mb-4">
            Compania care deține, administrează și vinde echipamente prin intermediul platformei Vexera este:
          </p>
          <div class="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800 text-xs space-y-1.5 tabular-nums">
            <div><strong class="text-slate-900 dark:text-white">Denumire oficială:</strong> S.C. VEXERA HARDWARE S.R.L.</div>
            <div><strong class="text-slate-900 dark:text-white">Cod Unic de Înregistrare (C.U.I.):</strong> RO48921045 (înregistrat în scopuri de TVA)</div>
            <div><strong class="text-slate-900 dark:text-white">Număr de ordine Registrul Comerțului:</strong> J40/18294/2024</div>
            <div><strong class="text-slate-900 dark:text-white">Capital social subscris și vărsat:</strong> 45.000 RON</div>
            <div><strong class="text-slate-900 dark:text-white">Sediu social:</strong> Splaiul Independenței nr. 319, Sector 6, București, România</div>
            <div><strong class="text-slate-900 dark:text-white">Hub Logistic & Depozit central:</strong> Șos. Fabrica de Glucoză nr. 15, Sector 2, București</div>
            <div><strong class="text-slate-900 dark:text-white">Telefon Relații Clienți / Suport Tehnic:</strong> 0720 123 456 (Luni - Vineri: 09:00 - 18:00)</div>
            <div><strong class="text-slate-900 dark:text-white">E-mail contact general:</strong> contact&#64;vexera.ro | Suport tehnic: suport&#64;vexera.ro</div>
          </div>
        </section>

        <section id="definitii" class="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xs transition-colors scroll-mt-24">
          <div class="flex items-center gap-3 mb-4">
            <span class="w-7 h-7 rounded-lg bg-slate-900 dark:bg-slate-800 text-white flex items-center justify-center font-bold text-xs">2</span>
            <h2 class="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              Definiții și Domeniu de Aplicare
            </h2>
          </div>
          <ul class="list-disc pl-5 space-y-2">
            <li><strong>Vânzător:</strong> S.C. VEXERA HARDWARE S.R.L.</li>
            <li><strong>Cumpărător / Consumator:</strong> Orice persoană fizică ce acționează în scopuri din afara activității sale comerciale, industriale sau profesionale și care plasează o comandă pe platforma Vexera.</li>
            <li><strong>Client B2B:</strong> Orice persoană juridică, societate comercială, PFA, instituție de cercetare sau învățământ ce achiziționează echipamente în baza unei facturi fiscale cu CUI.</li>
            <li><strong>Contract la distanță:</strong> Contractul încheiat între Vânzător și Cumpărător fără prezența fizică simultană a părților, în conformitate cu O.U.G. nr. 34/2014. Contractul se consideră încheiat în momentul transmiterii confirmării electronice de expediere a comenzii.</li>
            <li><strong>Echipamente Hardware:</strong> Produsele electronice, modulele de calcul SBC (Single Board Computer), microcontrolerele, transceiverele optice, cablurile DAC/AOC, senzorii digitali/analogici și sursele de alimentare comercializate pe site.</li>
          </ul>
        </section>

        <section id="produse" class="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xs transition-colors scroll-mt-24">
          <div class="flex items-center gap-3 mb-4">
            <span class="w-7 h-7 rounded-lg bg-slate-900 dark:bg-slate-800 text-white flex items-center justify-center font-bold text-xs">3</span>
            <h2 class="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              Caracteristicile Produselor și Manipulare Specifică (ESD & Niveluri de Tensiune)
            </h2>
          </div>
          <p class="mb-3">
            Toate produsele comercializate de Vexera sunt 100% originale, noi, sigilate și achiziționate prin canale oficiale de distribuție 
            (producători direcți precum Raspberry Pi Foundation, Arduino, Espressif Systems, MikroTik, Ubiquiti, Sensirion etc.).
          </p>
          <div class="bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 p-4 rounded-xl text-amber-900 dark:text-amber-200 mb-4">
            <strong class="font-bold flex items-center gap-2 mb-1 text-xs uppercase tracking-wide">
              <svg class="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
              <span>Avertisment Tehnic privind Manipularea Componentelor Electronice Sensibile (ESD):</span>
            </strong>
            <p class="text-xs leading-relaxed">
              Plăcile de dezvoltare fără carcasă (barebone SBC, module ESP32, senzori cu pini expuși) sunt dispozitive sensibile la descărcări electrostatice (ESD). 
              Cumpărătorul are responsabilitatea de a asigura împământarea adecvată, verificarea polarității alimentării și respectarea nivelurilor logice de tensiune 
              (exemplu: pinii GPIO pe ESP32 și Raspberry Pi tolerează maxim 3.3V, iar aplicarea unei tensiuni de 5V pe aceștia duce la arderea definitivă a procesorului, 
              ceea ce anulează garanția din cauză de utilizare improprie).
            </p>
          </div>
          <p class="text-xs text-slate-500 dark:text-slate-400">
            Fotografiile produselor au caracter informativ și redau cu fidelitate modelul real. Specificațiile tehnice, pinout-ul și consumul energetic 
            sunt preluate direct din datasheet-urile producătorilor oficiali.
          </p>
        </section>

        <section id="preturi" class="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xs transition-colors scroll-mt-24">
          <div class="flex items-center gap-3 mb-4">
            <span class="w-7 h-7 rounded-lg bg-slate-900 dark:bg-slate-800 text-white flex items-center justify-center font-bold text-xs">4</span>
            <h2 class="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              Prețuri, Facturare și Modalități de Plată
            </h2>
          </div>
          <ul class="list-disc pl-5 space-y-2 mb-4">
            <li>Toate prețurile afișate pe platforma Vexera sunt exprimate în <strong>Lei (RON)</strong> și includ <strong>Taxa pe Valoarea Adăugată (TVA 19%)</strong> în conformitate cu Codul Fiscal român.</li>
            <li>Costul transportului este evidențiat separat în coșul de cumpărături înainte de finalizarea comenzii. Comenzile cu valoare mai mare de <strong>350 RON</strong> beneficiază de transport gratuit.</li>
            <li>Vânzătorul emite factură fiscală electronică pentru fiecare comandă plasată, transmisă pe adresa de e-mail furnizată și transmisă în sistemul național <strong>RO e-Factura</strong> (ANAF) conform legislației în vigoare.</li>
            <li>Plata se poate efectua:
              <ul class="list-circle pl-5 mt-1 space-y-1">
                <li><strong>Plată Online cu Card Bancar:</strong> Prin procesator securizat cu autentificare 3D-Secure 2.0 (Visa, Mastercard, Apple Pay, Google Pay).</li>
                <li><strong>Plată Ramburs la Curier:</strong> Achitată numerar sau cu cardul la agentul de curierat în momentul predării coletului.</li>
                <li><strong>Transfer Bancar (Ordin de Plată - B2B):</strong> În baza unei facturi proforme emise automat pentru persoane juridice.</li>
              </ul>
            </li>
          </ul>
        </section>

        <section id="livrare" class="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xs transition-colors scroll-mt-24">
          <div class="flex items-center gap-3 mb-4">
            <span class="w-7 h-7 rounded-lg bg-slate-900 dark:bg-slate-800 text-white flex items-center justify-center font-bold text-xs">5</span>
            <h2 class="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              Livrare, Transport și Recepția Coletelor
            </h2>
          </div>
          <p class="mb-3">
            Expedierile se efectuează exclusiv prin curierat rapid (Sameday Courier, Fan Courier sau rețeaua Easybox / locker) pe întreg teritoriul României:
          </p>
          <ul class="list-disc pl-5 space-y-2 mb-3">
            <li>Comenzile plasate în zilele lucrătoare până la ora <strong>15:30</strong> sunt predate curierului în aceeași zi lucrătoare, cu termen estimat de livrare de <strong>24 - 48 de ore</strong>.</li>
            <li>Fiecare colet conține ambalaj de protecție cu bule de aer și pungă antistatică ESD pentru componentele active.</li>
            <li><strong>Recepția coletului:</strong> Cumpărătorul are dreptul și recomandarea de a verifica integritatea ambalajului exterior la momentul primirii. În cazul în care pachetul prezintă urme vizibile de strivire sau deteriorare severă, se solicită întocmirea unui proces-verbal de constatare împreună cu agentul de curierat.</li>
          </ul>
        </section>

        <section id="retur" class="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border-2 border-amber-300 dark:border-amber-800/80 shadow-xs transition-colors scroll-mt-24">
          <div class="flex items-center gap-3 mb-4">
            <span class="w-7 h-7 rounded-lg bg-amber-500 text-white flex items-center justify-center font-bold text-xs">6</span>
            <h2 class="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>Dreptul Legal de Retragere (Retur în 14 Zile)</span>
              <span class="text-xs px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 font-bold">O.U.G. nr. 34/2014</span>
            </h2>
          </div>
          <p class="mb-3">
            Conform Ordonanței de Urgență a Guvernului nr. 34/2014 privind drepturile consumatorilor în cadrul contractelor încheiate cu profesioniștii, 
            <strong>Cumpărătorul persoană fizică are dreptul de a se retrage din contract în termen de 14 zile calendaristice</strong>, 
            fără a fi nevoit să justifice decizia de retragere și fără a suporta alte costuri decât costul direct de returnare a produselor.
          </p>

          <div class="space-y-3 pt-2">
            <div>
              <strong class="text-slate-900 dark:text-white">Procedura de Retur:</strong>
              <p class="mt-1">
                Pentru a exercita dreptul de retragere, Cumpărătorul transmite o notificare neechivocă către Vexera prin e-mail la 
                <a href="mailto:retur@vexera.ro" class="text-blue-600 dark:text-blue-400 font-bold underline">retur&#64;vexera.ro</a> 
                sau prin formularul de retur disponibil pe site, specificând numărul comenzii și codul produsului.
              </p>
            </div>

            <div>
              <strong class="text-slate-900 dark:text-white">Condiții Specifice pentru Echipamente Electronice:</strong>
              <ul class="list-disc pl-5 mt-1 space-y-1 text-slate-600 dark:text-slate-300">
                <li>Produsul returnat trebuie să fie în aceeași stare în care a fost livrat, cu ambalajul original complet, toate accesoriile, cablurile și foliile de protecție intacte.</li>
                <li>Componentele electronice ambalate în pungi antistatice ESD nu trebuie să prezinte urme de lipire (soldering), pini îndoiți sau arși, cablaje tăiate ori firmware modificat ireversibil.</li>
                <li>Conform art. 14 alin. (3) din O.U.G. 34/2014, consumatorul este responsabil pentru diminuarea valorii produselor care rezultă din manipulări, altele decât cele necesare pentru determinarea naturii, caracteristicilor și funcționării produselor.</li>
              </ul>
            </div>

            <div>
              <strong class="text-slate-900 dark:text-white">Rambursarea Sumelor:</strong>
              <p class="mt-1">
                Vânzătorul rambursează toate sumele primite drept plată, inclusiv costurile inițiale de livrare standard, în cel mult 
                <strong>14 zile calendaristice</strong> de la data la care a recepționat și verificat bunurile returnate în depozitul central. 
                Rambursarea se efectuează folosind aceeași modalitate de plată ca și cea folosită inițial (credit pe card bancar sau transfer în cont IBAN).
              </p>
            </div>
          </div>
        </section>

        <section id="garantie" class="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border-2 border-emerald-300 dark:border-emerald-800/80 shadow-xs transition-colors scroll-mt-24">
          <div class="flex items-center gap-3 mb-4">
            <span class="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">7</span>
            <h2 class="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>Garanția Legală de Conformitate (24 Luni)</span>
              <span class="text-xs px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold">O.U.G. nr. 140/2021</span>
            </h2>
          </div>
          <p class="mb-3">
            Toate produsele vândute către consumatori (persoane fizice) beneficiază de <strong>garanția legală de conformitate de 24 de luni</strong> 
            în conformitate cu prevederile Ordonanței de Urgență a Guvernului nr. 140/2021 privind anumite aspecte referitoare la contractele de vânzare de bunuri 
            (transpunerea Directivei Europene 2019/771).
          </p>
          <ul class="list-disc pl-5 space-y-2 mb-3">
            <li>Pentru persoanele juridice (clienți B2B / companii), perioada de garanție comercială este de <strong>12 luni</strong> de la data achiziției.</li>
            <li>În cazul constatării unei lipse de conformitate din fabricație, consumatorul are dreptul la aducerea în conformitate a bunului prin <strong>reparare sau înlocuire gratuită</strong>, fără niciun cost suplimentar.</li>
            <li>Termenul de soluționare a unei cereri de garanție este de maxim <strong>15 zile calendaristice</strong> de la recepția echipamentului în unitatea de service Vexera.</li>
            <li><strong>Situații neacoperite de garanție:</strong> defecte cauzate de șocuri mecanice, supratensiuni pe liniile de date/alimentare, alimentare la polaritate inversă, descărcări electrostatice produse prin nepurtarea brățării ESD la montaj sau scurtcircuite accidentale provocate pe pinii GPIO în timpul testării.</li>
          </ul>
        </section>

        <section id="gdpr" class="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xs transition-colors scroll-mt-24">
          <div class="flex items-center gap-3 mb-4">
            <span class="w-7 h-7 rounded-lg bg-slate-900 dark:bg-slate-800 text-white flex items-center justify-center font-bold text-xs">8</span>
            <h2 class="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              Prelucrarea Datelor cu Caracter Personal (GDPR)
            </h2>
          </div>
          <p class="mb-3">
            S.C. VEXERA HARDWARE S.R.L. prelucrează datele cu caracter personal cu respectarea strictă a 
            <strong>Regulamentului (UE) 2016/679 (GDPR)</strong>. Colectăm exclusiv datele necesare pentru preluarea, facturarea fiscală, 
            expedierea coletelor și acordarea garanției tehnice.
          </p>
          <p class="mb-4">
            Pentru informații detaliate privind categoriile de date prelucrate, temeiurile legale, dreptul de acces, rectificare și ștergere, 
            vă rugăm să consultați pagina noastră dedicată:
          </p>
          <a routerLink="/confidentialitate" class="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 font-bold hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors">
            <span>Citește Politica Completă de Confidențialitate & GDPR</span>
            <span>→</span>
          </a>
        </section>

        <section id="deee" class="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xs transition-colors scroll-mt-24">
          <div class="flex items-center gap-3 mb-4">
            <span class="w-7 h-7 rounded-lg bg-amber-600 text-white flex items-center justify-center font-bold text-xs">9</span>
            <h2 class="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              Deșeuri de Echipamente Electrice și Electronice (DEEE / WEEE)
            </h2>
          </div>
          <p class="mb-3">
            În conformitate cu prevederile <strong>Ordonanței de Urgență a Guvernului nr. 5/2015</strong> privind deșeurile de echipamente electrice și electronice (DEEE), 
            simbolul tomberonului barat aplicat pe produse indică faptul că echipamentele electrice și electronice nu trebuie aruncate împreună cu deșeurile menajere municipale.
          </p>
          <p class="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            La achiziționarea unui echipament hardware nou de la Vexera, cumpărătorul poate preda gratuit un deșeu DEEE echivalent, 
            în sistem <strong>1:1</strong> (la nivel de tipologie similară), la punctul nostru logistic din București sau prin predare la centrele autorizate de colectare.
          </p>
        </section>

        <section id="litigii" class="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border-2 border-blue-300 dark:border-blue-800/80 shadow-xs transition-colors scroll-mt-24">
          <div class="flex items-center gap-3 mb-4">
            <span class="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs">10</span>
            <h2 class="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              Sesizări, Reclamații, ANPC și Soluționarea Litigiilor (SAL & SOL)
            </h2>
          </div>
          <p class="mb-4">
            Încurajăm rezolvarea pe cale amiabilă a oricărei neînțelegeri apărute între Cumpărător și Vânzător. Echipa noastră de suport tehnic 
            este disponibilă la adresa <a href="mailto:suport@vexera.ro" class="text-blue-600 dark:text-blue-400 font-bold underline">suport&#64;vexera.ro</a> 
            pentru soluționarea rapidă a oricărui incident în cel mult 24-48 de ore lucrătoare.
          </p>

          <p class="mb-4 text-xs">
            În conformitate cu <strong>Ordinul ANPC nr. 449/2022</strong> și <strong>Regulamentul (UE) nr. 524/2013</strong>, 
            punem la dispoziția consumatorilor informațiile și link-urile directe către mecanismele extrajudiciare de soluționare:
          </p>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <a 
              href="https://anpc.ro/ce-este-sal/" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="block p-4 rounded-xl bg-[#003366] text-white hover:bg-[#00264d] transition-all shadow-xs border border-white/10 group">
              <div class="text-[10px] text-amber-300 font-bold uppercase tracking-wider">Mecanism Oficial ANPC</div>
              <div class="text-sm font-extrabold mt-1">Soluționarea Alternativă a Litigiilor (SAL)</div>
              <p class="text-xs text-blue-100 mt-2 leading-relaxed">
                Platforma dedicată rezolvării disputelor comerciale prin mediatori și comisii ANPC fără instanță judecătorească.
              </p>
              <div class="text-[11px] text-amber-300 font-bold mt-3 group-hover:underline flex items-center gap-1">
                Accesează anpc.ro/ce-este-sal
              </div>
            </a>

            <a 
              href="https://ec.europa.eu/consumers/odr" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="block p-4 rounded-xl bg-[#004494] text-white hover:bg-[#003373] transition-all shadow-xs border border-white/10 group">
              <div class="text-[10px] text-amber-300 font-bold uppercase tracking-wider">Comisia Europeană</div>
              <div class="text-sm font-extrabold mt-1">Soluționarea Online a Litigiilor (SOL / ODR)</div>
              <p class="text-xs text-blue-100 mt-2 leading-relaxed">
                Instrumentul digital al Uniunii Europene pentru consumatorii care fac achiziții online transfrontaliere și naționale.
              </p>
              <div class="text-[11px] text-amber-300 font-bold mt-3 group-hover:underline flex items-center gap-1">
                Accesează ec.europa.eu/consumers/odr
              </div>
            </a>
          </div>

          <div class="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div>
              Autoritatea Națională pentru Protecția Consumatorilor (ANPC):
              <a href="https://anpc.ro" target="_blank" rel="noopener noreferrer" class="font-bold text-blue-600 dark:text-blue-400 underline ml-1">
                anpc.ro
              </a>
            </div>
            <div>
              Telefonul Consumatorului: <strong class="text-slate-900 dark:text-white font-bold">021 9551</strong>
            </div>
            <a routerLink="/anpc" class="font-bold text-blue-600 dark:text-blue-400 hover:underline">
              Ghid Detaliat Drepturi ANPC →
            </a>
          </div>
        </section>

      </div>

      <div class="mt-10 text-center">
        <a routerLink="/" class="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white font-bold text-xs sm:text-sm transition-all shadow-sm">
          <span>{{ i18n.isRo() ? '← Înapoi la Magazin' : '← Back to Store' }}</span>
        </a>
      </div>
    </div>
  `
})
export class TermsComponent {
  i18n = inject(TranslationService);
}
