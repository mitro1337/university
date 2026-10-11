import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { pool, initDatabase } from './db.js';
import { categoriesData, productsData } from './seed.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const corebootProducts = [
    {
    slug: 'lenovo-thinkpad-x230-coreboot-me-cleaner',
    name: 'Lenovo ThinkPad X230 (Intel Core i5-3320M, 16GB RAM, 512GB SSD) [Pre-Flashed Coreboot + SeaBIOS / me_cleaner]',
    sku: 'THINKPAD-X230-COREBOOT',
    mpn: '2325-X230-COREBOOT',
    category_id: 6,
    subcategory: 'Laptopturi Coreboot & Open Firmware',
    price_ron: 1349.99,
    old_price_ron: 1549.99,
    stock: 5,
    stock_status: 'in_stock',
    short_desc: 'Legendarul ThinkPad X230 cu Coreboot + SeaBIOS pre-instalat pe cipurile SPI fizice, Intel ME neutralizat complet și ecran IPS.',
    full_desc: 'ThinkPad X230 este simbolul securității hardware open-source. BIOS-ul proprietar Lenovo a fost înlocuit complet prin scriere hardware cu Coreboot open-source și payload SeaBIOS, eliminând orice whitelist Wi-Fi și deblocând viteza memoriei RAM la 1600/1866MHz. Modulul Intel Management Engine (ME) a fost neutralizat cu me_cleaner (peste 95% din firmware-ul ME eliminat), prevenind orice backdoor la nivel de procesor.',
    technical_specs: {
      architecture: 'x86_64',
      skill_level: 'Intermediate',
      processor: 'Intel Core i5-3320M Dual-Core / 4 Threads @ 2.60GHz (Turbo 3.30GHz, 3MB Cache)',
      ram: '16GB (2x8GB) DDR3L-1600MHz Dual Channel',
      storage: '512GB SATA 2.5" SSD de mare viteză + slot liber mSATA intern',
      display: '12.5" HD (1366 x 768) Premium IPS Unghiuri Largi de Vizualizare',
      firmware: 'Coreboot 4.22 + SeaBIOS Payload (Cipuri Winbond W25Q64 + W25Q32 rescrise)',
      intel_me_status: 'Neutralizat complet via me_cleaner (ROM sterilizat, fără acces rețea/ring -3)',
      battery: 'Baterie extinsă 6-celule 62Wh în stare excelentă',
      interfaces: ['2x USB 3.0', '1x USB 2.0 Always-On', 'Mini DisplayPort', 'VGA', 'Gigabit Ethernet Intel 82579LM', 'Slot ExpressCard 54mm', 'Cititor carduri SD'],
      linux_support: 'Compatibilitate 100% nativă fără drivere binare în Linux/BSD/Qubes OS',
      works_with_os: ['Qubes OS', 'Debian', 'Arch Linux', 'Tails OS', 'Void Linux', 'OpenBSD'],
      documentation_links: {
        datasheet: 'https://coreboot.org/status/board/lenovo/x230/',
        github: 'https://github.com/corna/me_cleaner'
      }
    },
    pinout_info: null,
    datasheet_url: 'https://coreboot.org/status/board/lenovo/x230/',
    image_url: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=800&q=80',
    badge: 'Coreboot Pre-Flashed',
    tags: ['niche', 'thinkpad', 'x230', 'coreboot', 'libreboot', 'me-cleaner', 'qubes-os', 'privacy'],
    rating: 4.99,
    review_count: 18,
    featured: true,
    compatible_with: ['kit-profesional-flashing-coreboot-pomona-5250', 'programator-eeprom-ch341a-v17-pro']
  },
  {
    slug: 'lenovo-thinkpad-t440p-coreboot-modular-quad-i7',
    name: 'Lenovo ThinkPad T440p Modular (Intel Core i7-4700MQ Quad-Core, 16GB RAM, 1080p IPS) [Coreboot Ready / Heads Tested]',
    sku: 'THINKPAD-T440P-COREBOOT',
    mpn: '20AN-T440P-MOD',
    category_id: 6,
    subcategory: 'Laptopturi Coreboot & Open Firmware',
    price_ron: 1699.99,
    old_price_ron: 1949.99,
    stock: 4,
    stock_status: 'in_stock',
    short_desc: 'Cel mai modular laptop ThinkPad: procesor socketat i7 Quad-Core 8-thread, ecran 1080p IPS nou, trackpad T450 cu butoane fizice și Coreboot.',
    full_desc: 'ThinkPad T440p este regele modularității: socket PGA946 cu procesor quad-core i7-4700MQ înlocuibil, suport pentru 3 unități de stocare simultane (2.5" SATA + M.2 2242 + UltraBay caddy) și acces instant la cele două cipuri SPI Flash (4MB + 8MB) direct sub capacul inferior cu 2 șuruburi. Vine cu trackpad-ul cu butoane fizice de T450 instalat și este complet validat pentru Coreboot și Heads tamper-evident firmware.',
    technical_specs: {
      architecture: 'x86_64 Socket PGA946',
      skill_level: 'Intermediate',
      processor: 'Intel Core i7-4700MQ Quad-Core / 8 Threads @ 2.40GHz (Turbo 3.40GHz, 6MB Cache)',
      ram: '16GB (2x8GB) DDR3L-1600 Dual Channel',
      storage: '512GB SSD SATA III 2.5" + suport suplimentar M.2 2242 SATA',
      display: '14.0" Full HD (1920 x 1080) IPS Mat Anti-Glare (Upgrade panou N140HCE-EN1)',
      trackpad_mod: 'Instalat Trackpad original T450 cu 3 butoane fizice pentru TrackPoint',
      firmware_status: 'Gata pregătit pentru Coreboot / Tianocore UEFI / Heads Payload (cipuri 12MB accesibile)',
      intel_me_status: 'me_cleaner compatibil (poate fi neutralizat în 5 minute)',
      interfaces: ['2x USB 3.0', '2x USB 2.0', 'Mini DisplayPort', 'VGA', 'Gigabit Ethernet', 'Slot UltraBay DVD/HDD', 'Slot SDXC'],
      linux_support: 'Certificat Linux 6.x, zero thermal throttling pe profil TLP',
      works_with_os: ['Coreboot + Heads', 'Qubes OS', 'Arch Linux', 'Fedora', 'Debian']
    },
    pinout_info: null,
    datasheet_url: 'https://coreboot.org/status/board/lenovo/t440p/',
    image_url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
    badge: 'Quad-Core i7 Modular',
    tags: ['niche', 'thinkpad', 't440p', 'coreboot', 'heads', 'modular', 'i7-quad', 'linux'],
    rating: 4.97,
    review_count: 14,
    featured: true,
    compatible_with: ['kit-profesional-flashing-coreboot-pomona-5250']
  },
  {
    slug: 'lenovo-thinkpad-x200-libreboot-ryf-certified',
    name: 'Lenovo ThinkPad X200 (Core 2 Duo P8600, 8GB RAM, SSD 256GB) [100% Libreboot Pre-Installed, FSF RYF Certified]',
    sku: 'THINKPAD-X200-LIBREBOOT',
    mpn: '7458-X200-LIBRE',
    category_id: 6,
    subcategory: 'Laptopturi Coreboot & Open Firmware',
    price_ron: 1199.99,
    old_price_ron: 1399.99,
    stock: 3,
    stock_status: 'in_stock',
    short_desc: 'Laptop cu 100% Free Software BIOS (Libreboot): zero blob-uri proprietare, fără Intel ME hardware, certificat FSF Respects Your Freedom.',
    full_desc: 'ThinkPad X200 este cel mai puternic laptop din lume capabil să ruleze Libreboot fără niciun microcod sau blob binar binar proprietar (fără Video BIOS proprietar, fără Intel Management Engine). Echipat cu cipulset GM45 și placă Wi-Fi Atheros cu firmware liber ath9k, reprezintă puritatea absolută a software-ului liber promovat de Richard Stallman și Free Software Foundation.',
    technical_specs: {
      architecture: 'x86_64',
      skill_level: 'Beginner',
      processor: 'Intel Core 2 Duo P8600 2.40GHz (3MB L2 Cache, 25W TDP)',
      ram: '8GB (2x4GB) DDR3 PC3-8500 (Maximul absolut suportat de chipsetul GM45)',
      storage: '256GB SATA SSD',
      display: '12.1" WXGA (1280 x 800) Mat LED Backlight',
      firmware: 'Libreboot Official Stable Release (GRUB Payload direct în Flash)',
      intel_me_status: 'Inexistent fizic / dezactivat din arhitectura chipsetului GM45',
      wifi: 'Atheros AR9285 802.11b/g/n (Driver liber ath9k în kernelul Linux)',
      keyboard: 'Clasică ThinkPad 7-row cu mecanism foarfecă original IBM-style',
      linux_support: '100% FSF Free Software (Trisquel, Guix, Debian-main, Parabola)',
      works_with_os: ['Trisquel GNU/Linux', 'GNU Guix System', 'Debian Libre', 'Devuan']
    },
    pinout_info: null,
    datasheet_url: 'https://libreboot.org/docs/hardware/x200.html',
    image_url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
    badge: '100% Free Software RYF',
    tags: ['niche', 'libreboot', 'fsf-ryf', 'x200', 'thinkpad', 'free-software', 'zero-blobs'],
    rating: 4.95,
    review_count: 8,
    featured: false,
    compatible_with: ['kit-profesional-flashing-coreboot-pomona-5250']
  },
  {
    slug: 'lenovo-thinkpad-t480-quad-core-privacy-coreboot-ready',
    name: 'Lenovo ThinkPad T480 (Intel Core i5-8350U Quad-Core, 32GB DDR4, 512GB NVMe) [Linux Privacy Edition - Coreboot Ready]',
    sku: 'THINKPAD-T480-PRIVACY',
    mpn: '20L5-T480-PRIVACY',
    category_id: 6,
    subcategory: 'Laptopturi Coreboot & Open Firmware',
    price_ron: 1899.99,
    old_price_ron: 2199.99,
    stock: 6,
    stock_status: 'in_stock',
    short_desc: 'Sfântul Graal al ThinkPad-urilor moderne de Linux: 4C/8T Gen8, 32GB RAM, două baterii PowerBridge, Thunderbolt 3 și cameră cu obturator ThinkShutter.',
    full_desc: 'ThinkPad T480 este considerat de comunitatea sysadmin și de securitate cel mai fiabil și versatil laptop modern de la Lenovo. Oferă 4 nuclee fizice și 8 fire de execuție la 15W TDP, două sloturi SODIMM de RAM (suport până la 64GB DDR4), două baterii independente cu comutare la cald PowerBridge, conector Thunderbolt 3 compatibil cu dock-uri eGPU și oblon fizic pentru cameră ThinkShutter.',
    technical_specs: {
      architecture: 'x86_64',
      skill_level: 'Intermediate',
      processor: 'Intel Core i5-8350U Quad-Core / 8 Threads @ 1.70GHz (Turbo 3.60GHz, 6MB Cache, vPro)',
      ram: '32GB (2x16GB) DDR4-2400MHz Dual Channel (extensibil la 64GB)',
      storage: '512GB M.2 2280 NVMe PCIe SSD',
      display: '14.0" Full HD (1920 x 1080) IPS Anti-Glare',
      battery_system: 'Dual Battery PowerBridge (1x Baterie internă 24Wh + 1x Baterie externă detașabilă 48Wh)',
      privacy_features: 'ThinkShutter slider mecanic pentru webcam + cititor de amprente match-on-chip',
      interfaces: ['1x Thunderbolt 3 (40Gbps)', '1x USB Type-C (USB-PD & DisplayPort)', '2x USB 3.1 Gen 1', 'HDMI 1.4b', 'Gigabit Ethernet RJ45 nativ', 'Cititor carduri SD'],
      firmware_status: 'Compatibil cu portul Coreboot comunitar / me_cleaner HAP bit disable',
      linux_support: 'Suport impecabil în orice distribuție Linux modernă (Kernel 6.x nativ)',
      works_with_os: ['Fedora Workstation', 'Debian', 'Arch Linux', 'Qubes OS', 'Ubuntu']
    },
    pinout_info: null,
    datasheet_url: 'https://psref.lenovo.com/syspool/Sys/PDF/ThinkPad/ThinkPad_T480/ThinkPad_T480_Spec.PDF',
    image_url: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80',
    badge: 'PowerBridge 32GB RAM',
    tags: ['niche', 'thinkpad', 't480', 'linux', 'quad-core', 'powerbridge', 'thunderbolt3', 'qubes-os'],
    rating: 4.98,
    review_count: 23,
    featured: true,
    compatible_with: ['crucial-32gb-2x16gb-ddr4-3200-sodimm-kit']
  },

    {
    slug: 'kit-profesional-flashing-coreboot-pomona-5250',
    name: 'Kit Profesional Flashing Coreboot / Libreboot (Programator CH341A v1.7 Fix 3.3V + Clește Original Pomona 5250 SOIC8)',
    sku: 'COREBOOT-FLASH-KIT-POMONA',
    mpn: 'KIT-CB-CH341A-POM5250',
    category_id: 6,
    subcategory: 'Unelte Flashing & Reverse Engineering',
    price_ron: 139.99,
    old_price_ron: 169.99,
    stock: 19,
    stock_status: 'in_stock',
    short_desc: 'Kitul definitiv pentru scrierea Coreboot/Libreboot: programator CH341A revizuit cu fix hardware la 3.3V și clește aurit Pomona 5250 fabricat în SUA.',
    full_desc: 'Programatoarele CH341A ieftine au un defect de fabrică periculos: alimentează cipurile de BIOS la 5V pe liniile de date, riscând să ardă definitiv placa de bază a ThinkPad-ului. Acest kit vine cu versiunea revizuită v1.7 ce livrează strict nivel logic de 3.3V pe toate liniile SPI și legendarul clește Pomona 5250 cu pini de contact placați cu aur ce nu alunecă de pe pinii minusculi SOIC-8 ai cipului de BIOS.',
    technical_specs: {
      voltage_fix: 'Modificare hardware garantată 3.3V Logic Level pe toți pinii (VCC, CS, CLK, MOSI, MISO, WP, HOLD)',
      clip_model: 'Pomona 5250 SOIC8 original (Fabricat în SUA, contacte berylium copper aurite)',
      supported_chips: 'Seriile SPI Flash 24xx / 25xx (Winbond W25Q32, W25Q64, W25Q128, Macronix MX25L, GigaDevice)',
      adapter_included: 'Adaptor 1.8V SPI pentru laptopuri noi cu cipuri de joasă tensiune',
      cables: 'Cabluri Dupont multifilare cu rezistență parazită < 0.2Ω pentru citire 100% fără bit flips',
      linux_support: 'flashrom nativ: `flashrom -p ch341a_spi -c "W25Q64.V" -r bios_backup.bin`',
      works_with_os: ['Linux (flashrom)', 'macOS (brew flashrom)', 'FreeBSD']
    },
    pinout_info: {
      pin_map: [
        { pin: 'Pin 1', name: 'CS (Chip Select)', function: 'Selectare cip SPI activ pe 0 logic' },
        { pin: 'Pin 2', name: 'MISO (DO)', function: 'Date ieșire din memoria Flash către programator' },
        { pin: 'Pin 3', name: 'WP# (Write Protect)', function: 'Tragere la 3.3V pentru a permite scrierea' },
        { pin: 'Pin 4', name: 'GND', function: 'Masă comună de referință' },
        { pin: 'Pin 5', name: 'MOSI (DI)', function: 'Date intrare din programator în memoria Flash' },
        { pin: 'Pin 6', name: 'CLK (Serial Clock)', function: 'Semnal de sincronizare ceas SPI' },
        { pin: 'Pin 7', name: 'HOLD#', function: 'Tragere la 3.3V pentru funcționare normală' },
        { pin: 'Pin 8', name: 'VCC (+3.3V)', function: 'Alimentare precisă 3.30V DC' }
      ]
    },
    datasheet_url: 'https://coreboot.org/docs/flash_tutorial/',
    image_url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    badge: '3.3V Hardware Fix',
    tags: ['niche', 'coreboot', 'libreboot', 'ch341a', 'pomona', 'soic8', 'flashrom', 'bios-flashing'],
    rating: 4.99,
    review_count: 29,
    featured: true,
    compatible_with: ['lenovo-thinkpad-x230-coreboot-me-cleaner', 'lenovo-thinkpad-t440p-coreboot-modular-quad-i7']
  },
  {
    slug: 'cleste-test-soic16-pomona-5252-cabluri',
    name: 'Clește Test SOIC16 Pomona 5252 + Cabluri Ecranate pentru Flashing BIOS SOIC-16',
    sku: 'POMONA-5252-SOIC16',
    mpn: 'POMONA-5252-KIT',
    category_id: 6,
    subcategory: 'Unelte Flashing & Reverse Engineering',
    price_ron: 89.99,
    old_price_ron: 109.99,
    stock: 12,
    stock_status: 'in_stock',
    short_desc: 'Clește original Pomona 5252 cu 16 contacte aurite pentru cipurile SPI Flash în capsulă lată SOIC-16 (ThinkPad T430, W530, Dell Latitude).',
    full_desc: 'Multe laptopuri clasice și servere enterprise utilizează cipuri SPI de 16 pini (SOIC-16 / SOP-16) în loc de SOIC-8. Cleștele Pomona 5252 rezolvă problema conectării fără a dezlipi cipul de pe placa de bază, asigurând o prindere fermă cu rezistență de contact minimă.',
    technical_specs: {
      clip_model: 'Pomona 5252 original cu 16 pini (SOP-16 / SOIC-16 Wide Body)',
      contacts: 'Cupru beriliu placat cu aur pur de 30 micropoli pentru conductivitate maximă',
      compatibility: 'Compatibil cu programatoarele CH341A, Bus Pirate, Raspberry Pi SPI',
      cables: 'Panglică 16 fire colorate cu mufe mamă Dupont de 2.54mm'
    },
    pinout_info: null,
    datasheet_url: 'https://www.pomonaelectronics.com/products/test-clips/soic-test-clip-16-pin',
    image_url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    badge: 'Pomona USA Original',
    tags: ['niche', 'pomona', 'soic16', 'coreboot', 'bios-flashing', 'flashrom'],
    rating: 4.93,
    review_count: 8,
    featured: false,
    compatible_with: ['kit-profesional-flashing-coreboot-pomona-5250']
  },
  {
    slug: 'cablu-dedicat-spi-flashing-raspberry-pi-coreboot',
    name: 'Cablu Dedicat SPI Flashing Raspberry Pi la SOIC8 (Coreboot / Heads / Flashrom Native)',
    sku: 'RPI-SPI-COREBOOT-CABLE',
    mpn: 'RPI-SPI-SOIC8-CB',
    category_id: 6,
    subcategory: 'Unelte Flashing & Reverse Engineering',
    price_ron: 49.99,
    old_price_ron: 59.99,
    stock: 25,
    stock_status: 'in_stock',
    short_desc: 'Cablu gata etichetat pentru conectarea directă a pinilor GPIO SPI de pe Raspberry Pi la cleștele SOIC8 fără bătăi de cap.',
    full_desc: 'Cea mai recomandată metodă de scriere Coreboot de către dezvoltatorii proiectului este folosirea unui Raspberry Pi 4 sau 5 ca programator hardware prin modulul Linux de kernel `linux_spi`. Acest cablu are pinii etichetați individual color-coded (SPI_CLK -> Pin 23, MOSI -> Pin 19, MISO -> Pin 21, CE0 -> Pin 24, 3V3 -> Pin 1, GND -> Pin 6), eliminând orice risc de conectare greșită.',
    technical_specs: {
      interfaces: 'Header 6-pin dedicat GPIO Raspberry Pi -> Conector 8-pin clește SOIC8 Pomona',
      resistors: 'Rezistențe de amortizare serie 100Ω integrate pe liniile CLK și MOSI pentru eliminarea reflexiilor de semnal la 10-25MHz',
      linux_support: '`flashrom -p linux_spi:dev=/dev/spidev0.0,spispeed=16000 -c "W25Q64.V" -w coreboot.rom`',
      compatibility: 'Raspberry Pi 3B+, 4B, 5, Zero 2W'
    },
    pinout_info: null,
    datasheet_url: 'https://www.flashrom.org/Raspberry_Pi',
    image_url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    badge: 'linux_spi Native',
    tags: ['niche', 'raspberry-pi', 'spi-flashing', 'coreboot', 'flashrom', 'soic8'],
    rating: 4.96,
    review_count: 17,
    featured: false,
    compatible_with: ['raspberry-pi-5-8gb', 'kit-profesional-flashing-coreboot-pomona-5250']
  }
];

export async function addCorebootProducts() {
  console.log('Adding Coreboot hardware...');

  const existingSlugs = new Set(productsData.map(p => p.slug));
  const newItems = corebootProducts.filter(p => !existingSlugs.has(p.slug));

  const allUpdated = [...productsData, ...newItems];
  console.log(`Updated total products count: ${allUpdated.length} (Adding ${newItems.length} Coreboot items)`);

  // Write to seed.ts
  const seedFilePath = path.join(__dirname, 'seed.ts');
  const fileContent = `import { pool, initDatabase } from './db.js';

export const categoriesData = ${JSON.stringify(categoriesData, null, 2)};

export const productsData = ${JSON.stringify(allUpdated, null, 2)};

export async function seedDatabase() {
  console.log('Seeding categories and extended products catalog...');
  const conn = await pool.getConnection();
  try {
    for (const cat of categoriesData) {
      await conn.query(
        \`INSERT INTO categories (id, slug, name, icon, description, sort_order)
         VALUES (?, ?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE
           name = VALUES(name),
           icon = VALUES(icon),
           description = VALUES(description),
           sort_order = VALUES(sort_order)\`,
        [cat.id, cat.slug, cat.name, cat.icon, cat.description, cat.sort_order]
      );
    }
    console.log(\`Seeded/Updated \${categoriesData.length} categories.\`);

    for (const prod of productsData) {
      await conn.query(
        \`INSERT INTO products (
          slug, name, sku, mpn, category_id, subcategory, price_ron, old_price_ron,
          stock, stock_status, short_desc, full_desc, technical_specs, pinout_info,
          datasheet_url, image_url, badge, tags, rating, review_count, featured, compatible_with
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
          name = VALUES(name),
          sku = VALUES(sku),
          mpn = VALUES(mpn),
          category_id = VALUES(category_id),
          subcategory = VALUES(subcategory),
          price_ron = VALUES(price_ron),
          old_price_ron = VALUES(old_price_ron),
          stock = VALUES(stock),
          stock_status = VALUES(stock_status),
          short_desc = VALUES(short_desc),
          full_desc = VALUES(full_desc),
          technical_specs = VALUES(technical_specs),
          pinout_info = VALUES(pinout_info),
          datasheet_url = VALUES(datasheet_url),
          image_url = VALUES(image_url),
          badge = VALUES(badge),
          tags = VALUES(tags),
          rating = VALUES(rating),
          review_count = VALUES(review_count),
          featured = VALUES(featured),
          compatible_with = VALUES(compatible_with)\`,
        [
          prod.slug,
          prod.name,
          prod.sku,
          prod.mpn || null,
          prod.category_id,
          prod.subcategory,
          prod.price_ron,
          prod.old_price_ron || null,
          prod.stock,
          prod.stock_status,
          prod.short_desc,
          prod.full_desc,
          JSON.stringify(prod.technical_specs),
          prod.pinout_info ? JSON.stringify(prod.pinout_info) : null,
          prod.datasheet_url || null,
          prod.image_url,
          prod.badge || null,
          JSON.stringify(prod.tags),
          prod.rating,
          prod.review_count,
          prod.featured ? 1 : 0,
          prod.compatible_with ? JSON.stringify(prod.compatible_with) : null
        ]
      );
    }
    console.log(\`Successfully seeded/updated \${productsData.length} products.\`);
  } finally {
    conn.release();
  }
}

if (process.argv[1] && process.argv[1].endsWith('seed.ts')) {
  initDatabase()
    .then(() => seedDatabase())
    .then(() => {
      console.log('Database seeding finished.');
      process.exit(0);
    })
    .catch((err) => {
      console.error('Seeding error:', err);
      process.exit(1);
    });
}
`;

  fs.writeFileSync(seedFilePath, fileContent, 'utf-8');
  console.log('Updated seed.ts written.');

  // Upsert into MySQL
  await initDatabase();
  const conn = await pool.getConnection();
  try {
    for (const prod of newItems) {
      await conn.query(
        `INSERT INTO products (
          slug, name, sku, mpn, category_id, subcategory, price_ron, old_price_ron,
          stock, stock_status, short_desc, full_desc, technical_specs, pinout_info,
          datasheet_url, image_url, badge, tags, rating, review_count, featured, compatible_with
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
          name = VALUES(name),
          sku = VALUES(sku),
          mpn = VALUES(mpn),
          category_id = VALUES(category_id),
          subcategory = VALUES(subcategory),
          price_ron = VALUES(price_ron),
          old_price_ron = VALUES(old_price_ron),
          stock = VALUES(stock),
          stock_status = VALUES(stock_status),
          short_desc = VALUES(short_desc),
          full_desc = VALUES(full_desc),
          technical_specs = VALUES(technical_specs),
          pinout_info = VALUES(pinout_info),
          datasheet_url = VALUES(datasheet_url),
          image_url = VALUES(image_url),
          badge = VALUES(badge),
          tags = VALUES(tags),
          rating = VALUES(rating),
          review_count = VALUES(review_count),
          featured = VALUES(featured),
          compatible_with = VALUES(compatible_with)`,
        [
          prod.slug,
          prod.name,
          prod.sku,
          prod.mpn || null,
          prod.category_id,
          prod.subcategory,
          prod.price_ron,
          prod.old_price_ron || null,
          prod.stock,
          prod.stock_status,
          prod.short_desc,
          prod.full_desc,
          JSON.stringify(prod.technical_specs),
          prod.pinout_info ? JSON.stringify(prod.pinout_info) : null,
          prod.datasheet_url || null,
          prod.image_url,
          prod.badge || null,
          JSON.stringify(prod.tags),
          prod.rating,
          prod.review_count,
          prod.featured ? 1 : 0,
          prod.compatible_with ? JSON.stringify(prod.compatible_with) : null
        ]
      );
    }
    console.log(`Successfully upserted ${newItems.length} Coreboot items into MySQL!`);
  } finally {
    conn.release();
  }
}

addCorebootProducts().then(() => {
  console.log('Done!');
  process.exit(0);
}).catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
