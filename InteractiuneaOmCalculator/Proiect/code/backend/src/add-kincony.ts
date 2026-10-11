import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { pool, initDatabase } from './db.js';
import { categoriesData, productsData } from './seed.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const kinconyProduct = {
  slug: 'kincony-kc868-a16-esp32-din-rail-smart-home-controller',
  name: 'Placă Automatizare Industrială & Smart Home KinCony KC868-A16 (ESP32, 16 Relee, 16 DI Optoizolate, LAN Ethernet, RS485)',
  sku: 'KINCONY-KC868-A16-ESP32',
  mpn: 'KC868-A16',
  category_id: 3,
  subcategory: 'Smart Home & Building Automation',
  price_ron: 389.99,
  old_price_ron: 449.99,
  stock: 11,
  stock_status: 'in_stock',
  short_desc: 'Controler PLC open-source montabil pe șină DIN cu ESP32, 16 ieșiri pe relee (10A), 16 intrări digitale optoizolate, Ethernet RJ45 LAN, RS485 și integrare nativă ESPHome / Home Assistant.',
  full_desc: 'KinCony KC868-A16 este nucleul de vis pentru tabloul electric smart home sau proiecte industriale. Înlocuiește PLC-urile proprietare scumpe oferind libertate software completă: rulează ESPHome, Tasmota sau firmware C++ Arduino direct integrat în Home Assistant pe Ethernet fără dependență de Wi-Fi. Echipat cu 16 relee de putere, 16 intrări cu optocuploare pentru întrerupătoare de perete sau senzori inductivi, 4 intrări analogice 0-5V/4-20mA, port RS485 Modbus și ceas de timp real RTC cu baterie backup.',
  technical_specs: {
    mcu: 'Espressif ESP32-WROOM-32E Dual-Core Xtensa LX6 @ 240MHz (4MB Flash, 520KB SRAM)',
    skill_level: 'Intermediate',
    outputs: '16x Relee electromagnetice independente (250V AC / 10A sau 30V DC / 10A, contacte NO/COM)',
    digital_inputs: '16x Intrări digitale optoizolate galvanic (compatibile contact uscat, 12V/24V semnal industrial)',
    analog_inputs: '4x Intrări analogice (0-5V sau 4-20mA configurabile prin jumperi)',
    networking: 'Ethernet LAN RJ45 10/100M cu cip LAN8720 + Wi-Fi 2.4GHz 802.11b/g/n + Bluetooth 4.2 BLE',
    industrial_bus: 'Port serial RS485 cu rezistență de terminare 120Ω integrată pentru senzori Modbus RTU',
    rtc: 'Ceas hardware în timp real DS1307 cu lăcaș baterie CR1220 pentru acțiuni programate offline',
    power_supply: 'Alimentare 12V DC industrială prin bloc de borne cu șurub (< 18W consum maxim cu toate releele active)',
    mounting: 'Carcasă ignifugă montabilă direct pe șină DIN industrială standard 35mm (lățime 215mm)',
    firmware_support: 'ESPHome (configurare YAML 1-click), Tasmota, Arduino IDE, MicroPython, Home Assistant Auto-Discovery',
    works_with_os: ['ESPHome', 'Home Assistant', 'Tasmota', 'Node-RED', 'OpenHAB', 'MQTT Broker']
  },
  pinout_info: {
    ethernet: 'LAN8720 PHY conectat pe GPIO19/GPIO21/GPIO22/GPIO25/GPIO26/GPIO27',
    rs485: 'UART2 (TX: GPIO14, RX: GPIO15, DE/RE automat)',
    i2c: 'SDA: GPIO4, SCL: GPIO5 (DS1307 RTC + PCF8574 I/O Expanders)',
    analog: 'GPIO34 (ADC1), GPIO35 (ADC2), GPIO36 (ADC3), GPIO39 (ADC4)',
    relays: 'Controlate prin expansoare I2C PCF8574T cu stare reținută la reboot'
  },
  datasheet_url: 'https://www.kincony.com/esp32-16-channel-relay-board-kc868-a16.html',
  image_url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
  badge: 'DIN-Rail PLC ESP32',
  tags: ['iot', 'smart-home', 'kincony', 'esp32', 'esphome', 'relee', 'din-rail', 'home-assistant', 'plc', 'modbus'],
  rating: 4.98,
  review_count: 23,
  featured: true,
  compatible_with: ['shelly-pro-4pm-releu-4-canale-din-rail-lan-wifi', 'home-assistant-yellow-hub-cm4-zigbee-matter-poe']
};

async function addKincony() {
  console.log('Adding KinCony KC868-A16...');
  const existingSlugs = new Set(productsData.map(p => p.slug));
  let allUpdated = [...productsData];
  if (!existingSlugs.has(kinconyProduct.slug)) {
    allUpdated.push(kinconyProduct);
  }
  console.log(`Total products will be: ${allUpdated.length}`);

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
  console.log('Updated seed.ts written with 180 products.');

  await initDatabase();
  const conn = await pool.getConnection();
  try {
    const prod = kinconyProduct;
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
    console.log('KinCony upserted into MySQL!');
  } finally {
    conn.release();
  }
}

addKincony().then(() => {
  console.log('KinCony addition completed successfully.');
  process.exit(0);
}).catch(err => {
  console.error('Error adding KinCony:', err);
  process.exit(1);
});
