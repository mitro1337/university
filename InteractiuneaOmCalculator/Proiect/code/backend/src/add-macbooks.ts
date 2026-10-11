import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { pool, initDatabase } from './db.js';
import { categoriesData, productsData } from './seed.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const macbookProducts = [
  {
    slug: 'apple-macbook-air-13-m1-asahi-linux',
    name: 'Apple MacBook Air 13" M1 (16GB RAM, 512GB SSD) [Asahi Linux Gold Tier - Fedora Remix]',
    sku: 'APPLE-MBA-M1-16G-ASAHI',
    mpn: 'MGN63LL/A-ASAHI',
    category_id: 6,
    subcategory: 'Apple Hardware Linux',
    price_ron: 3499.99,
    old_price_ron: 3999.99,
    stock: 6,
    stock_status: 'in_stock',
    short_desc: 'Laptop ultraportabil fanless cu procesor Apple Silicon M1, 16GB memorie unificată și suport Gold Tier în Fedora Asahi Linux Remix.',
    full_desc: 'MacBook Air M1 reprezintă standardul de aur pentru Asahi Linux. Datorită răcirii pasive complet silențioase, eficienței energetice extraordinare și maturității driverelor dezvoltate de echipa Asahi Linux, rulează nativ kernelul Linux 6.x cu accelerare grafică completă OpenGL 4.6 și Vulkan 1.3, Wi-Fi, Bluetooth, tastatură, touchpad multitouch și autonomie de până la 16 ore.',
    technical_specs: {
      architecture: 'ARM64 (Apple Silicon M1)',
      skill_level: 'Intermediate',
      processor: 'Apple M1 (4x Firestorm @ 3.2GHz + 4x Icestorm @ 2.06GHz) + 7/8-core Apple GPU',
      ram: '16GB Unified Memory LPDDR4X-4266 (Lățime de bandă 68 GB/s)',
      storage: '512GB Apple NVMe Flash (Driver NVMe Apple ANS2 nativ în Linux)',
      display: '13.3" Retina Display (2560 x 1600), 400 nits, DCI-P3',
      battery: 'Baterie 49.9Wh (Până la 16 ore de autonomie sub Fedora Asahi Linux)',
      ports: '2x Thunderbolt 3 / USB4 Type-C (suport DisplayPort extern și încărcare USB-PD), Jack 3.5mm',
      audio: 'Difuzoare stereo cu suport DSP activ în PipeWire pentru protecție acustică',
      linux_support: 'Fedora Asahi Linux Remix (Gold Tier - Nativ U-Boot / m1n1)',
      works_with_os: ['Fedora Asahi Remix', 'Arch Linux ARM Asahi', 'Debian ARM64', 'macOS Dual-Boot'],
      documentation_links: {
        datasheet: 'https://asahilinux.org/about/',
        github: 'https://github.com/AsahiLinux'
      }
    },
    pinout_info: null,
    datasheet_url: 'https://asahilinux.org/fedora/',
    image_url: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=800&q=80',
    badge: 'Asahi Gold Tier',
    tags: ['niche', 'apple-silicon', 'm1', 'asahi-linux', 'macbook-air', 'arm64', 'fedora-asahi'],
    rating: 4.98,
    review_count: 14,
    featured: true,
    compatible_with: ['sursa-raspberry-pi-27w-usb-c']
  },
  {
    slug: 'apple-macbook-pro-13-m1-asahi-linux',
    name: 'Apple MacBook Pro 13" M1 (16GB RAM, 512GB SSD) [Asahi Linux Gold Tier - Ventilator Activ]',
    sku: 'APPLE-MBP13-M1-16G-ASAHI',
    mpn: 'MYD82LL/A-ASAHI',
    category_id: 6,
    subcategory: 'Apple Hardware Linux',
    price_ron: 3899.99,
    old_price_ron: 4499.99,
    stock: 5,
    stock_status: 'in_stock',
    short_desc: 'Laptop Apple Silicon M1 cu răcire activă prin ventilator, 16GB RAM unificată, Touch Bar suportat în Linux și anduranță susținută.',
    full_desc: 'MacBook Pro 13" M1 oferă avantajul unui ventilator activ pentru sarcini de compilare îndelungate fără thermal throttling (Rust, Linux Kernel, C++). Asahi Linux include driver dedicat pentru Touch Bar (afișează tastele funcționale F1-F12 sau statistici de sistem) și suport complet pentru senzorii termici Apple SMC.',
    technical_specs: {
      architecture: 'ARM64 (Apple Silicon M1)',
      skill_level: 'Intermediate',
      processor: 'Apple M1 (4x Firestorm @ 3.2GHz + 4x Icestorm) + 8-core Apple GPU',
      ram: '16GB Unified Memory LPDDR4X-4266',
      storage: '512GB Apple NVMe Flash',
      cooling: 'Ventilator activ intern (permite 100% CPU load susținut indefinit)',
      touch_bar: 'Suportat în Linux via tiny-dfr (afișează taste F-keys dinamice)',
      ports: '2x Thunderbolt 3 / USB4, Jack audio 3.5mm',
      battery: 'Baterie 58.2Wh (Până la 18 ore de autonomie)',
      linux_support: 'Fedora Asahi Remix Gold Tier',
      works_with_os: ['Fedora Asahi Remix', 'Arch Linux ARM', 'macOS Dual-Boot'],
      documentation_links: {
        datasheet: 'https://asahilinux.org/about/',
        github: 'https://github.com/AsahiLinux/tiny-dfr'
      }
    },
    pinout_info: null,
    datasheet_url: 'https://asahilinux.org/fedora/',
    image_url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
    badge: 'Răcire Activă M1',
    tags: ['niche', 'apple-silicon', 'm1', 'macbook-pro', 'asahi-linux', 'touchbar', 'arm64'],
    rating: 4.96,
    review_count: 11,
    featured: false,
    compatible_with: []
  },
  {
    slug: 'apple-macbook-air-13-m2-asahi-linux',
    name: 'Apple MacBook Air 13.6" M2 (16GB RAM, 512GB SSD) [Asahi Linux Certified - MagSafe 3]',
    sku: 'APPLE-MBA-M2-16G-ASAHI',
    mpn: 'MLY33LL/A-ASAHI',
    category_id: 6,
    subcategory: 'Apple Hardware Linux',
    price_ron: 4799.99,
    old_price_ron: 5499.99,
    stock: 7,
    stock_status: 'in_stock',
    short_desc: 'Design modern cu MagSafe 3, procesor M2 (Avalanche/Blizzard), ecran Liquid Retina 13.6" și suport complet Fedora Asahi Linux.',
    full_desc: 'MacBook Air M2 aduce un salt de 18% în performanța procesorului cu nucleele Avalanche/Blizzard și un GPU cu 10 nuclee suportat prin driverul Honeykrisp Vulkan 1.3. Portul de încărcare magnetic MagSafe 3 eliberează ambele porturi USB4/Thunderbolt pentru periferice de laborator și monitoare externe.',
    technical_specs: {
      architecture: 'ARM64 (Apple Silicon M2)',
      skill_level: 'Intermediate',
      processor: 'Apple M2 (4x Avalanche @ 3.49GHz + 4x Blizzard @ 2.42GHz) + 10-core GPU',
      ram: '16GB Unified Memory LPDDR5-6400 (Lățime de bandă 100 GB/s)',
      storage: '512GB Apple NVMe Flash',
      display: '13.6" Liquid Retina (2560 x 1664), 500 nits, True Tone',
      charging: 'Port dedicat MagSafe 3 (LED de stare suportat în Linux)',
      ports: '2x Thunderbolt / USB4, Port MagSafe 3, Jack 3.5mm',
      battery: 'Baterie 52.6Wh (Până la 17 ore autonomie)',
      linux_support: 'Fedora Asahi Linux Remix (Kernel 6.x cu driver GPU Honeykrisp)',
      works_with_os: ['Fedora Asahi Remix', 'Ubuntu Asahi', 'macOS Dual-Boot'],
      documentation_links: {
        datasheet: 'https://asahilinux.org/fedora/',
        github: 'https://github.com/AsahiLinux'
      }
    },
    pinout_info: null,
    datasheet_url: 'https://asahilinux.org/fedora/',
    image_url: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=800&q=80',
    badge: 'M2 MagSafe 3',
    tags: ['niche', 'apple-silicon', 'm2', 'macbook-air', 'asahi-linux', 'magsafe', 'arm64'],
    rating: 4.97,
    review_count: 16,
    featured: true,
    compatible_with: []
  },
  {
    slug: 'apple-macbook-pro-14-m2-pro-asahi-linux',
    name: 'Apple MacBook Pro 14" M2 Pro (16GB RAM, 512GB SSD) [Asahi Linux Edge - 120Hz ProMotion & HDMI]',
    sku: 'APPLE-MBP14-M2PRO-ASAHI',
    mpn: 'MPHE3LL/A-ASAHI',
    category_id: 6,
    subcategory: 'Apple Hardware Linux',
    price_ron: 6999.99,
    old_price_ron: 7899.99,
    stock: 4,
    stock_status: 'in_stock',
    short_desc: 'Stație de lucru portabilă M2 Pro cu 10 nuclee CPU, 16 nuclee GPU, ecran Liquid Retina XDR Mini-LED 120Hz ProMotion și HDMI nativ.',
    full_desc: 'MacBook Pro 14" M2 Pro este cel mai performant laptop ARM64 pentru dezvoltatorii de Linux. Cu 10 nuclee CPU pe lățime de bandă a memoriei de 200 GB/s, ecran Mini-LED cu rată de reîmprospătare dinamică 120Hz ProMotion suportat impecabil în Wayland, 3 porturi Thunderbolt 4, slot card SDXC și ieșire HDMI 2.1.',
    technical_specs: {
      architecture: 'ARM64 (Apple Silicon M2 Pro)',
      skill_level: 'Advanced',
      processor: 'Apple M2 Pro (6x nuclee performanță Avalanche + 4x nuclee eficiență Blizzard) + 16-core GPU',
      ram: '16GB Unified Memory LPDDR5-6400 (Lățime de bandă 200 GB/s)',
      storage: '512GB Apple NVMe Flash de mare viteză',
      display: '14.2" Liquid Retina XDR Mini-LED (3024 x 1964), 120Hz ProMotion, 1000 nits susținut XDR',
      ports: '3x Thunderbolt 4 (USB-C), 1x HDMI 2.1, 1x Slot card SDXC, 1x MagSafe 3, Jack 3.5mm',
      cooling: 'Sistem dublu de ventilatoare cu cameră de vapori',
      battery: 'Baterie 70Wh (Încărcare rapidă 96W USB-PD / MagSafe)',
      linux_support: 'Fedora Asahi Linux Remix (suport ProMotion 120Hz sub Wayland, Vulkan 1.3)',
      works_with_os: ['Fedora Asahi Remix', 'Arch ARM', 'macOS Dual-Boot'],
      documentation_links: {
        datasheet: 'https://asahilinux.org/fedora/',
        github: 'https://github.com/AsahiLinux'
      }
    },
    pinout_info: null,
    datasheet_url: 'https://asahilinux.org/fedora/',
    image_url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
    badge: '120Hz ProMotion Mini-LED',
    tags: ['niche', 'apple-silicon', 'm2-pro', 'macbook-pro', 'asahi-linux', '120hz', 'vulkan', 'arm64'],
    rating: 5.0,
    review_count: 9,
    featured: true,
    compatible_with: []
  }
];

export async function addMacbooks() {
  console.log('Adding Apple hardware...');

  const existingSlugs = new Set(productsData.map(p => p.slug));
  const newItems = macbookProducts.filter(p => !existingSlugs.has(p.slug));

  const allUpdated = [...productsData, ...newItems];
  console.log(`Updated total products count: ${allUpdated.length} (Adding ${newItems.length} MacBooks)`);

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
    console.log(`Successfully upserted ${newItems.length} MacBooks into MySQL!`);
  } finally {
    conn.release();
  }
}

addMacbooks().then(() => {
  console.log('Done!');
  process.exit(0);
}).catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
