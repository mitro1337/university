# Vexera - Platformă E-Commerce Homelab, IT&C & IoT

Platformă modernă de comerț electronic nișată pe echipamente de rețea, enterprise servers, single-board computers (SBC), IoT industrial, module de securitate cibernetică și componente homelab. Proiectul pune accent pe principiile de **Interacțiune Om-Calculator (HCI)**, accesibilitate (WCAG 2.1 AA) și ergonomie cognitivă.

---

## 1. Arhitectură și Tehnologii

- **Frontend:**
  - Angular 20 (Standalone Components, Signals, Zoneless reactivity)
  - Tailwind CSS + Design tokens custom (paletă espresso dark `#0c0907` / cupru `#b86830`)
  - Lenis Smooth Scrolling (accelerație inerțială fluidă, detectare viteză, parallax)
  - GSAP & Microinteracțiuni dinamice (tilt 3D, scramble text, crossfade galerii)
  - Suport bilingv complet (Română / Engleză) prin `TranslationService` (i18n)
  - Modul complet de accesibilitate: scalare font, contrast ridicat, mod fără animații (`prefers-reduced-motion`)

- **Backend:**
  - Node.js & TypeScript cu Express REST API
  - Bază de date relațională MySQL (catalog produse, comenzi, recenzii, stocuri)
  - Integrare gateway plăți Netopia Payments (Sandbox / IPN Webhooks asincrone) + Stripe Simulator
  - Endpoints complete pentru căutare fațetată, filtrare avansată, verificare compatibilitate și checkout

---

## 2. Funcționalități Cheie HCI

1. **Căutare Globală & Paletă de Comenzi (`Ctrl+K` / `Cmd+K`):** Permite navigarea instantanee între pagini și căutarea rapidă a oricărui SKU sau produs.
2. **Filtrare Tehnică Fațetată:** Filtre dinamice după categorie, arhitectură, nivel de tensiune, interfață de comunicare și stoc live.
3. **Constructor Interactiv Rack 19" (Lab Builder):** Configurator vizual pentru echipamente 1U, 2U, 4U cu calcul dinamic al consumului energetic (W) și adâncimii carcasei.
4. **Mini-Coș Lateral (Slide-over Drawer):** Permite modificarea cantităților și vizualizarea subtotalului fără a părăsi fluxul de navigare.
5. **Panou de Scurtături de Tastatură (`?`):** Navigare accelerată dedicată utilizatorilor tehnici și sysadminilor.
6. **Panou Accesibilitate (`A11Y`):** Reglare dimensiune text (Normal, Mare, Foarte mare), contrast ridicat și dezactivare animații.

---

## 3. Structura Proiectului

```
code/
├── backend/                  # Server Node.js Express + TypeScript
│   ├── src/
│   │   ├── index.ts          # Server entry point & rute REST
│   │   ├── db.ts             # Conexiune MySQL & inițializare tabele
│   │   ├── seed.ts           # Script populare catalog complet (180+ produse)
│   │   ├── routes/           # Rute API (produse, comenzi, plăți, recenzii)
│   │   └── types.ts          # Definiții de tipuri backend
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example          # Configurație variabile de mediu
├── frontend/                 # Aplicație Angular 20 Standalone
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/   # Navbar, footer, cart drawer, modals, command palette
│   │   │   ├── pages/        # Home, Catalog, Product Detail, Checkout, Lab Builder etc.
│   │   │   ├── services/     # Cart, Products, i18n, A11y, Lenis, Rack Builder
│   │   │   └── models/       # Modele de date TypeScript
│   │   ├── public/images/    # Asset-uri și imagini produse transparente
│   │   └── styles.scss       # Stiluri globale, variabile de temă și animații
│   ├── angular.json
│   ├── package.json
│   └── tailwind.config.js
├── scripts/                  # Scripturi utilitare procesare date & catalog
├── all_products.json         # Dataset complet produse
├── package.json              # Root orchestration scripts
└── README.md
```

---

## 4. Ghid de Instalare și Rulare

### Cerințe de Sistem
- Node.js >= 20.x
- npm >= 10.x
- Server MySQL (ex. MySQL Server local, XAMPP sau Docker)

### Pasul 1: Clonare și Instalare Dependințe

Din folderul rădăcină `code`:

```bash
# Instalare dependințe root, backend și frontend
npm install
npm --prefix backend install
npm --prefix frontend install
```

### Pasul 2: Configurare Bază de Date MySQL

1. Creați o bază de date în MySQL:
```sql
CREATE DATABASE homelab_ecommerce CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

2. Configurați fișierul `.env` în `backend/`:
```bash
cp backend/.env.example backend/.env
```
*(Verificați credențialele `DB_USER` și `DB_PASSWORD` conform mediului dumneavoastră local).*

3. Populați baza de date cu catalogul complet de peste 180 de produse tehnice:
```bash
cd backend
npm run seed
cd ..
```

### Pasul 3: Rularea Aplicației

Puteți porni atât backend-ul cât și frontend-ul simultan din rădăcina proiectului:

```bash
npm run dev
```

Sau rulați-le în terminale separate:

- **Backend (Port 3001):**
  ```bash
  cd backend
  npm run dev
  ```

- **Frontend (Port 4200):**
  ```bash
  cd frontend
  npm start
  ```

Aplicația este accesibilă la adresa: `http://localhost:4200`
API-ul backend răspunde la: `http://localhost:3001/api`

---

## 5. Scripturi Disponibile

| Comandă | Descriere |
|---|---|
| `npm run dev` | Pornește simultan backend-ul (`3001`) și frontend-ul (`4200`) |
| `npm run build` | Compilează atât backend-ul (TypeScript) cât și bundle-ul de producție Angular |
| `npm --prefix frontend run build` | Compilează exclusiv aplicația Angular |
| `npm --prefix backend run seed` | Reinițializează tabelele și repopulează baza de date MySQL |
