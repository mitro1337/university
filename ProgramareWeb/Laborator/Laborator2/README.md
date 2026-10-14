# Laborator 2: DHTML - Lucrul cu foi de stiluri in cascada (CSS)

Acest director contine rezolvarea integrala a cerintelor din fisa de laborator pentru **Laborator 2: DHTML**.

---

## Cerinte din Modul de Lucru

### 1. Se vor verifica cele trei modalitati de precizare a stilului
- **Stil Inline (in cadrul unui element HTML):**
  - Fisier: `stil_inline.html`
  - Utilizarea atributului `style="..."` atasat direct tag-urilor HTML (`<p style="font-size: 20pt; color: #0000FF">`).
- **Stil Intern (in antetul documentului):**
  - Fisier: `stil_intern.html`
  - Utilizarea elementului `<style type="text/css">` in interiorul sectiunii `<head>`.
- **Stil Extern (intr-un fisier separat):**
  - Fisier: `stil_extern.html` + `css3.css`
  - Legarea foii de stil externe prin elementul `<link rel="stylesheet" type="text/css" href="css3.css"/>`.
- **Tabel comparativ si sinteza:**
  - Fisier: `modalitati_stil.html`
  - Pune in paralel cele trei abordari, analizand specificitatea, sfera de aplicare, performanta cache si recomandarile practice.

---

### 2. Se vor studia mostenirea si rezolvarea conflictelor in cadrul stilurilor
- **Mostenirea proprietatilor (Overriding Inheritance):**
  - Fisier: `mostenire.html`
  - Ilustreaza transmiterea ierarhica a proprietatilor prin arborele DOM (de la `<body>` la `<ul/ol>`, `<li>`, `<p>`).
  - Implementeaza exact schema de culori din laborator: verde (baza mostenita), albastru, rosu, alb si galben.
- **Rezolvarea conflictelor si selectori avansati:**
  - Fisier: `conflicte.html`
  - Detaliaza cei 5 pasi ai algoritmului de cascadare:
    1. Determinarea tuturor regulilor aplicabile;
    2. Prioritatea regulilor marcate cu `!important`;
    3. Originea foii de stil (autor > utilizator > navigator);
    4. Specificitatea selectorului (`Inline (1,0,0,0) > ID (0,1,0,0) > Clasa (0,0,1,0) > Tip (0,0,0,1)`);
    5. Ordinea specificarii in document (regula de la final suprascrie regula anterioara).
  - Exemplifica toti selectorii din fisa de laborator:
    - Selector bazat pe tipul elementelor: `H1`, `H1, H2`;
    - Selector bazat pe clasa: `.IMPORTANT`;
    - Selector bazat pe ID: `#COPYRIGHT`;
    - Selector contextual: `LI P`, `TABLE .SMALL P`;
    - Pseudoclase si pseudoelemente: `A:LINK`, `A:HOVER`, `A:ACTIVE`, `A:VISITED`, `P.INITIAL:FIRST-LETTER`, `P.INITIAL:FIRST-LINE`;
    - Combinarea tipurilor de selectori: `TABLE P.INITIAL:FIRST-LETTER`.

---

### 3. Se va crea un meniu orizontal si unul vertical
- **Meniu Orizontal:**
  - Fisier: `meniu_orizontal.html`
  - Urmeaza pas cu pas evolutia descrisa in breviar:
    - Pasul 1: Lista `<ul>` neformatata;
    - Pasul 2: Eliminarea marcatorilor (`list-style-type: none; margin: 0; padding: 0;`);
    - Pasul 3: Dispunere orizontala cu `display: inline;`;
    - Pasul 4: Eliminare subliniere si colorare cu `text-decoration: none; color: red;`;
    - Pasul 5: Adaugare efect hover cu `#meniu a:hover { color: yellow; }`;
    - Extensie: Meniu orizontal modern cu flexbox si stare activa.
- **Meniu Vertical:**
  - Fisier: `meniu_vertical.html`
  - Implementeaza `display: block;` pe etichetele `<a>` pentru a face intreg randul clickabil, bordura accentuata pe stanga, deplasare la hover si varianta moderna Dark Sidebar.
- **Macheta Integrata (Layout complet):**
  - Fisier: `meniuri.html`
  - Integreaza meniul orizontal in antet (`<header>`) si meniul vertical in bara laterala (`<aside>`).
- **Paginile legate de meniuri:**
  - `produse.html` - Catalog de produse demonstrativ
  - `despre-firma.html` - Prezentare firma si laborator
  - `contact.html` - Formular de contact stilizat

---

## Mod de Utilizare

Pentru a vizualiza laboratorul:
1. Deschideti fisierul `index.html` in orice navigator web modern (Chrome, Firefox, Safari, Edge).
2. Navigati prin exercitii folosind panoul de bord sau bara superioara de navigare.
