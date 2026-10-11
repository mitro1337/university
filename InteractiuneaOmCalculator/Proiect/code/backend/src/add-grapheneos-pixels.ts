import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { pool, initDatabase } from './db.js';
import { categoriesData, productsData } from './seed.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const pixelProducts = [
  {
    slug: 'google-pixel-8-pro-128gb-grapheneos-hardened',
    name: 'Google Pixel 8 Pro 128GB Obsidian [GrapheneOS Pre-Installed & Verified Boot Re-Locked]',
    sku: 'PIXEL8-PRO-GRAPHENE-128G',
    mpn: 'GC3VE-GRAPHENE-PRO',
    category_id: 6,
    subcategory: 'GrapheneOS & Hardened Mobile Security',
    price_ron: 3499.99,
    old_price_ron: 3999.99,
    stock: 5,
    stock_status: 'in_stock',
    short_desc: 'Smartphone de securitate maximă cu GrapheneOS pre-instalat, cheie AVB proprie înscrisă în hardware, MTE activ și coprocesor Titan M2.',
    full_desc: 'Google Pixel 8 Pro cu GrapheneOS reprezintă vârful securității mobile globale. Bootloader-ul este re-blocat hardware cu cheia criptografică unică GrapheneOS pentru a asigura starea Green Verified Boot. Datorită arhitecturii Armv9 a procesorului Google Tensor G3, beneficiază de MTE (Hardware Memory Tagging Extension) activat nativ, anihilând atacurile de tip memory corruption (Buffer Overflow, Use-After-Free). Zero telemetrie Google, izolator sandbox pentru Google Play Services și protecție hardware Titan M2 împotriva atacurilor brute-force.',
    technical_specs: {
      architecture: 'ARMv9 64-bit cu Hardware MTE',
      skill_level: 'Intermediate',
      processor: 'Google Tensor G3 (9-core CPU: 1x Cortex-X3 + 4x Cortex-A715 + 4x Cortex-A510)',
      security_chip: 'Titan M2 dedicated hardware security element (Common Criteria EAL6+)',
      memory_safety: 'Hardware Memory Tagging Extension (MTE) forțat la nivel de sistem și aplicații',
      ram: '12GB LPDDR5X',
      storage: '128GB UFS 3.1 Flash',
      display: '6.7" Super Actua LTPO OLED (1344 x 2992), 1-120Hz dinamic, 2400 nits peak',
      firmware_status: 'GrapheneOS Official Release (Bootloader Re-Locked cu AVB Custom Root of Trust)',
      privacy_features: 'Toggles hardware pentru Senzori și Rețea per aplicație, Auto-Reboot timer la inactivitate, dezactivare automată port USB la blocare ecran',
      network: 'Dual SIM (1x Nano-SIM fizic + 1x eSIM), 5G Sub-6/mmWave, Wi-Fi 7, Bluetooth 5.3, UWB',
      battery: '5050mAh cu încărcare rapidă 30W USB-PD 3.0 și wireless Qi',
      linux_support: 'Kernel Linux 6.1 cu patch-uri de securitate GrapheneOS și izolator seccomp întărit',
      works_with_os: ['GrapheneOS', 'Sandboxed Google Play Services (fără privilegii de sistem)', 'AOSP Pur']
    },
    pinout_info: null,
    datasheet_url: 'https://grapheneos.org/features',
    image_url: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80',
    badge: 'Hardware MTE & Titan M2',
    tags: ['niche', 'grapheneos', 'google-pixel', 'pixel-8-pro', 'security', 'privacy', 'titan-m2', 'mte'],
    rating: 5.0,
    review_count: 24,
    featured: true,
    compatible_with: []
  },
  {
    slug: 'google-pixel-8-128gb-grapheneos-hardened',
    name: 'Google Pixel 8 128GB Obsidian [GrapheneOS Pre-Installed & Verified Boot Re-Locked]',
    sku: 'PIXEL8-GRAPHENE-128G',
    mpn: 'G9BQD-GRAPHENE',
    category_id: 6,
    subcategory: 'GrapheneOS & Hardened Mobile Security',
    price_ron: 2799.99,
    old_price_ron: 3199.99,
    stock: 7,
    stock_status: 'in_stock',
    short_desc: 'Format compact de 6.2" cu Tensor G3, protecție avansată MTE hardware, GrapheneOS pre-configurat și chei AVB semnate.',
    full_desc: 'Google Pixel 8 oferă același nivel militar de securitate MTE și Titan M2 ca versiunea Pro, dar într-un corp compact și manevrabil de 6.2 inci. Cu GrapheneOS pre-instalat și bootloader re-blocat, oferă protecție completă împotriva spyware-ului de tip Pegasus/Predator, alocator de memorie întărit hardened_malloc și actualizări de securitate direct din depozitele oficiale.',
    technical_specs: {
      architecture: 'ARMv9 64-bit cu Hardware MTE',
      skill_level: 'Intermediate',
      processor: 'Google Tensor G3 (9-core) + Titan M2 Security Co-Processor',
      security_chip: 'Titan M2 EAL6+ tamper-resistant element',
      ram: '8GB LPDDR5X',
      storage: '128GB UFS 3.1',
      display: '6.2" Actua OLED (1080 x 2400), 60-120Hz, 2000 nits peak',
      firmware_status: 'GrapheneOS Official Stable (Verificare criptografică AVB completă)',
      privacy_features: 'Auditor app integrat (atestare hardware periodică), comutatoare permisiuni senzori/clipboard, mac address randomization avansată',
      network: 'Nano-SIM + eSIM, Wi-Fi 7, 5G, Bluetooth 5.3',
      battery: '4575mAh, autonomie excelentă fără serviciile de fundal Google',
      linux_support: 'Android Open Source Project întărit cu kernel Linux 6.1 LTS',
      works_with_os: ['GrapheneOS Official']
    },
    pinout_info: null,
    datasheet_url: 'https://grapheneos.org/faq#supported-devices',
    image_url: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80',
    badge: 'Compact Flagship MTE',
    tags: ['niche', 'grapheneos', 'google-pixel', 'pixel-8', 'privacy', 'titan-m2', 'security'],
    rating: 4.98,
    review_count: 19,
    featured: true,
    compatible_with: []
  },
  {
    slug: 'google-pixel-7a-128gb-grapheneos-privacy-phone',
    name: 'Google Pixel 7a 128GB Charcoal [GrapheneOS Pre-Installed & Re-Locked Bootloader]',
    sku: 'PIXEL7A-GRAPHENE-128G',
    mpn: 'GWKK3-GRAPHENE-7A',
    category_id: 6,
    subcategory: 'GrapheneOS & Hardened Mobile Security',
    price_ron: 1799.99,
    old_price_ron: 2099.99,
    stock: 9,
    stock_status: 'in_stock',
    short_desc: 'Cel mai popular telefon de privacy pentru jurnaliști și cercetători: Tensor G2, Titan M2, 8GB RAM și GrapheneOS gata de utilizare.',
    full_desc: 'Google Pixel 7a este campionul raportului securitate/preț. Dotat cu procesorul Tensor G2 și coprocesorul de securitate Titan M2, rulează GrapheneOS cu fluiditate desăvârșită. Vine cu sistemul de operare gata instalat, cheile criptografice înscrise în cipul TPM și bootloader-ul re-blocat pentru securitate fizică totală împotriva furtului de date.',
    technical_specs: {
      architecture: 'ARMv8.2-A 64-bit',
      skill_level: 'Beginner',
      processor: 'Google Tensor G2 (Octa-Core: 2x Cortex-X1 + 2x Cortex-A78 + 4x Cortex-A55)',
      security_chip: 'Titan M2 EAL6+ Hardware Security Module',
      ram: '8GB LPDDR5',
      storage: '128GB UFS 3.1',
      display: '6.1" OLED FHD+ (1080 x 2400) 90Hz',
      firmware_status: 'GrapheneOS Official Stable (Green Verified Boot)',
      privacy_features: 'Vanadium hardened browser (izolare strictă site-uri), tastatură fără acces la rețea, camera app securizată',
      network: 'Nano-SIM + eSIM Dual SIM, 5G, Wi-Fi 6E, Bluetooth 5.3',
      battery: '4385mAh (autonomie de până la 2 zile datorită eliminării Google Play Services din fundal)',
      linux_support: 'Linux Kernel 5.10 LTS adaptat GrapheneOS',
      works_with_os: ['GrapheneOS', 'F-Droid', 'Aurora Store']
    },
    pinout_info: null,
    datasheet_url: 'https://grapheneos.org/install/web',
    image_url: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80',
    badge: 'Sweet Spot Privacy',
    tags: ['niche', 'grapheneos', 'google-pixel', 'pixel-7a', 'privacy-phone', 'titan-m2', 'journalist'],
    rating: 4.96,
    review_count: 31,
    featured: true,
    compatible_with: []
  },
  {
    slug: 'google-pixel-6a-128gb-grapheneos-burner-phone',
    name: 'Google Pixel 6a 128GB Charcoal [GrapheneOS Pre-Installed - Burner / Field Unit]',
    sku: 'PIXEL6A-GRAPHENE-128G',
    mpn: 'GX7AS-GRAPHENE-6A',
    category_id: 6,
    subcategory: 'GrapheneOS & Hardened Mobile Security',
    price_ron: 1299.99,
    old_price_ron: 1499.99,
    stock: 8,
    stock_status: 'in_stock',
    short_desc: 'Dispozitiv de securitate accesibil pentru misiuni de teren sau telefon secundar dedicat: Tensor G1, Titan M2 și bootloader blocat.',
    full_desc: 'Pixel 6a este soluția optimă pentru un dispozitiv dedicat de conferințe, călătorii internaționale riscante sau nod mobil de comunicații securizate (Signal, Briar, Session). Oferă protecția hardware a cipului Titan M2 și alocatorul de memorie hardened_malloc la un preț imbatabil.',
    technical_specs: {
      architecture: 'ARMv8.2-A 64-bit',
      skill_level: 'Beginner',
      processor: 'Google Tensor G1 Octa-core + Titan M2 Hardware Security Chip',
      security_chip: 'Titan M2 EAL6+ Crypto Engine',
      ram: '6GB LPDDR5',
      storage: '128GB UFS 3.1',
      display: '6.1" OLED FHD+ (1080 x 2400) 60Hz',
      firmware_status: 'GrapheneOS Official Stable (Bootloader Re-Locked)',
      privacy_features: 'Profiluri de utilizator complet izolate (separare muncă / personal / anonim), fără acces ID publicitar',
      network: 'Nano-SIM + eSIM, 5G, Wi-Fi 6E, Bluetooth 5.2',
      battery: '4410mAh',
      linux_support: 'Linux Kernel 5.10 LTS GrapheneOS',
      works_with_os: ['GrapheneOS']
    },
    pinout_info: null,
    datasheet_url: 'https://grapheneos.org/',
    image_url: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80',
    badge: 'Budget Privacy Field Node',
    tags: ['niche', 'grapheneos', 'google-pixel', 'pixel-6a', 'field-unit', 'privacy', 'burner'],
    rating: 4.93,
    review_count: 15,
    featured: false,
    compatible_with: []
  }
];

export async function addGrapheneOSPixels() {
  console.log('Adding Pixel hardware...');

  const existingSlugs = new Set(productsData.map(p => p.slug));
  const newItems = pixelProducts.filter(p => !existingSlugs.has(p.slug));

  const allUpdated = [...productsData, ...newItems];
  console.log(`Updated total products count: ${allUpdated.length} (Adding ${newItems.length} Google Pixel devices)`);

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
    console.log(`Successfully upserted ${newItems.length} Google Pixel devices into MySQL!`);
  } finally {
    conn.release();
  }
}

addGrapheneOSPixels().then(() => {
  console.log('Done!');
  process.exit(0);
}).catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
