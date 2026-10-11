import mysql from 'mysql2/promise';

async function main() {
  const conn = await mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    database: 'homelab_ecommerce'
  });

  console.log('Connected to MySQL. Adding Cybersecurity & Security Research category...');

    const cat = {
    id: 7,
    slug: 'cybersecurity-research',
    name: 'Cybersecurity & Security Research',
    icon: 'shield',
    description: 'Echipamente pentru audit de securitate autorizat și cercetare hardware: Flipper Zero, ecosistem Hak5 (WiFi Pineapple, LAN Turtle, Packet Squirrel, Rubber Ducky), unelte RFID/NFC (Proxmark3, ChameleonUltra), plăci ESP32 Marauder/Bruce, adaptoare monitor mode și TAP-uri hardware de rețea.',
    sort_order: 7
  };

  await conn.query(`
    INSERT INTO categories (id, slug, name, icon, description, sort_order)
    VALUES (?, ?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE
      name = VALUES(name),
      icon = VALUES(icon),
      description = VALUES(description),
      sort_order = VALUES(sort_order)
  `, [cat.id, cat.slug, cat.name, cat.icon, cat.description, cat.sort_order]);

  console.log('Category inserted/updated.');

    const products = [
    {
      slug: 'flipper-zero-portable-multi-tool',
      name: 'Flipper Zero Multi-Tool Device (Sub-1GHz, RFID, NFC, IR, GPIO & BadUSB)',
      sku: 'SEC-FLP-ZERO-01',
      mpn: 'FLIP-ZERO-R04',
      category_id: 7,
      subcategory: 'Wireless & RF Pentesting',
      price_ron: 1190.00,
      old_price_ron: 1350.00,
      stock: 12,
      stock_status: 'in_stock',
      short_desc: 'Instrument portabil autonom pentru audit de securitate: transceiver Sub-1GHz CC1101, cititor/emulator RFID 125kHz & NFC 13.56MHz, infraroșu, pini GPIO 3.3V și emulare BadUSB.',
      full_desc: 'Flipper Zero este dispozitivul etalon de buzunar pentru cercetare în radiofrecvență, control acces și sisteme încorporate. Dispune de ecran monocrom LCD 1.4" cu iluminare portocalie lizibil în lumina soarelui, baterie Li-Po 2100 mAh cu autonomie de până la 7 zile, slot MicroSD pentru stocare dicționare/semnale și interfață USB-C pentru conectare la aplicațiile de desktop și smartphone via Bluetooth BLE.',
      technical_specs: {
        processor: 'STM32WB55RG Dual-Core ARM Cortex-M4 (64MHz) + Cortex-M0+ (32MHz pentru stack radio)',
        radio_sub_1ghz: 'Transceiver TI CC1101 cu antenă integrată (benzi 315MHz, 433MHz, 868MHz, 915MHz)',
        rfid_nfc: 'RFID 125kHz (EM-4100, HID Prox, Indala) + NFC 13.56MHz (ISO-14443A/B, NXP Mifare, FeliCa)',
        interfaces: ['Slot card MicroSD (până la 64GB)', '18 pini GPIO 3.3V toleranți 5V', 'USB Type-C 2.0', 'Transceiver Infraroșu (TX/RX 800-950nm)'],
        battery: 'Acumulator Li-Po 2100 mAh reîncărcabil prin USB-C'
      },
      pinout_info: {
        total_pins: 18,
        logic_level: '3.3V (tolerant 5V pe majoritatea pinilor)',
        pin_map: [
          { pin: 'Pin 1', name: 'VCC 5V', function: 'Ieșire alimentare 5V DC (max 1000mA cu modul activ)' },
          { pin: 'Pin 8', name: 'GND', function: 'Masă electrică' },
          { pin: 'Pin 9', name: '3V3', function: 'Ieșire stabilizată 3.3V DC (max 500mA)' },
          { pin: 'Pin 13', name: 'USART TX', function: 'Transmisie serială UART (implicit 115200 baud)' },
          { pin: 'Pin 14', name: 'USART RX', function: 'Recepție serială UART' },
          { pin: 'Pin 15', name: 'SWCLK', function: 'Ceas programare SWD' },
          { pin: 'Pin 16', name: 'SWDIO', function: 'Date programare SWD' }
        ],
        wiring_notes: [
          'Pinii GPIO sunt compatibili cu module externe precum WiFi Dev Board (ESP32-S2), plăci NRF24L01 sau senzori de mediu.',
          'Dispune de protecție la supracurent și supratensiune pe pinii I/O.'
        ]
      },
      datasheet_url: 'https://docs.flipper.net/',
      image_url: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&auto=format&fit=crop&q=80',
      badge: 'Multi-Tool RF',
      tags: ['Flipper Zero', 'Sub-1GHz', 'RFID 125kHz', 'NFC 13.56MHz', 'BadUSB', 'Pentesting', 'CC1101'],
      rating: 4.98,
      review_count: 58,
      featured: 1,
      compatible_with: ['chameleon-ultra-pocket-rfid-nfc-emulator', 'pachet-10x-carduri-taguri-t5577-mifare-magic']
    },
    {
      slug: 'hak5-wifi-pineapple-mark-vii',
      name: 'Hak5 WiFi Pineapple Mark VII (Dual-Band 2.4/5GHz Enterprise Wireless Audit)',
      sku: 'SEC-HK5-PINE-MK7',
      mpn: 'WP-MK7-STD',
      category_id: 7,
      subcategory: 'Network Security & Hak5',
      price_ron: 890.00,
      old_price_ron: 990.00,
      stock: 8,
      stock_status: 'in_stock',
      short_desc: 'Platformă etalon pentru audit wireless 802.11 b/g/n/ac: detecție dispozitive rogue, captură pachete WPA/WPA2/WPA3, monitorizare spectru RF și suită PineAP via interfață web dedicată.',
      full_desc: 'WiFi Pineapple Mark VII de la Hak5 este liderul recunoscut internațional în testarea de penetrare wireless și conformitate defensivă pentru rețele Wi-Fi. Echipat cu 3 radiouri Wi-Fi independente (un radio dedicat exclusiv monitorizării și capturii, plus două radiouri cu antene de mare câștig), oferă o perspectivă fără precedent asupra ecosistemului wireless al organizației.',
      technical_specs: {
        processor: 'Mediatek MT7628 SoC MIPS @ 580MHz + 256MB RAM',
        radios: '3x Radiouri Wi-Fi independente (suport complet 2.4GHz și 5GHz cu mod monitor nativ)',
        interfaces: ['3x Conectori antenă RP-SMA (antene de mare câștig incluse)', '1x Port USB Type-C (date și alimentare)', '1x Port USB 2.0 Host pentru stick-uri 4G/LTE sau storage', '1x Slot card MicroSD'],
        os_support: 'Sistem de operare Hak5 PineappleOS bazat pe Linux OpenWrt'
      },
      pinout_info: null,
      datasheet_url: 'https://docs.hak5.org/wifi-pineapple/',
      image_url: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&auto=format&fit=crop&q=80',
      badge: 'Hak5 Official',
      tags: ['Hak5', 'WiFi Pineapple', 'PineAP', 'Wireless Audit', '802.11ac', 'Red Team', 'WPA3'],
      rating: 4.96,
      review_count: 32,
      featured: 1,
      compatible_with: ['hak5-lan-turtle-network-implant', 'hak5-packet-squirrel-ethernet-tap']
    },
    {
      slug: 'hak5-usb-rubber-ducky-v3',
      name: 'Hak5 USB Rubber Ducky (DuckyScript 3.0 Keystroke Injection & BadUSB)',
      sku: 'SEC-HK5-DUCKY-03',
      mpn: 'RD-V3-USB',
      category_id: 7,
      subcategory: 'USB Security & Hotplug',
      price_ron: 390.00,
      old_price_ron: 440.00,
      stock: 15,
      stock_status: 'in_stock',
      short_desc: 'Dispozitivul original de simulare atac hotplug keystroke: procesor ARM 32-bit Cortex, stocare MicroSD, comutator de profiluri hardware și limbaj de scriptare DuckyScript 3.0.',
      full_desc: 'USB Rubber Ducky pare o memorie USB obișnuită, însă este recunoscut instantaneu de orice calculator ca tastatură umană de încredere (HID). Versiunea V3 introduce DuckyScript 3.0 complet turing (variabile, instrucțiuni if/else, bucle while, funcții, exfiltrare date prin LED-urile CapsLock) și buton de armare rapidă.',
      technical_specs: {
        processor: 'Microcontroller 32-bit ARM Cortex @ 96MHz',
        storage: 'Slot card MicroSD (card MicroSD inclus)',
        interfaces: ['Conector USB Type-A (carcasă neagră discretă)', 'Buton mecanic de armare/dezarmare rapidă', 'LED multicolor RGB de stare'],
        compatibility: 'Windows, macOS, Linux, ChromeOS, Android (fără instalare de drivere)'
      },
      pinout_info: null,
      datasheet_url: 'https://docs.hak5.org/usb-rubber-ducky/',
      image_url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80',
      badge: 'DuckyScript 3.0',
      tags: ['Hak5', 'USB Rubber Ducky', 'Hotplug Attack', 'BadUSB', 'DuckyScript', 'Red Team'],
      rating: 4.97,
      review_count: 41,
      featured: 1,
      compatible_with: ['tester-detector-cabluri-malitioase-omg']
    },
    {
      slug: 'hak5-lan-turtle-network-implant',
      name: 'Hak5 LAN Turtle (Covert Systems Management & Network Implant)',
      sku: 'SEC-HK5-TURTLE-01',
      mpn: 'LT-V1-NET',
      category_id: 7,
      subcategory: 'Network Security & Hak5',
      price_ron: 420.00,
      old_price_ron: 470.00,
      stock: 10,
      stock_status: 'in_stock',
      short_desc: 'Dispozitiv de acces la distanță și man-in-the-middle mascat într-un adaptor USB-to-Ethernet: shell reverse SSH, monitorizare trafic pachete și OpenWrt integrat.',
      full_desc: 'LAN Turtle este o unealtă de administrare de sistem și pentesting acoperită care oferă acces la distanță într-o rețea locală prin tunel SSH / OpenVPN, monitorizează traficul de rețea și execută module automate direct la conectarea fizică între PC și priza de rețea.',
      technical_specs: {
        processor: 'Atheros AR9331 SoC @ 400MHz, 64MB DDR2 RAM, 16MB Flash',
        interfaces: ['1x Conector USB-A gazdă', '1x Port RJ45 Ethernet 10/100 Mbps', 'Meniu grafic interactiv prin consolă SSH'],
        features: ['Auto-execuție module Hak5', 'Bypass gateway', 'DNS Spoofing', 'Reverse Shell over SSH']
      },
      pinout_info: null,
      datasheet_url: 'https://docs.hak5.org/lan-turtle/',
      image_url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&auto=format&fit=crop&q=80',
      badge: 'Hak5 Implant',
      tags: ['Hak5', 'LAN Turtle', 'Network Implant', 'OpenWrt', 'MITM', 'Reverse SSH', 'Red Team'],
      rating: 4.92,
      review_count: 18,
      featured: 0,
      compatible_with: ['hak5-wifi-pineapple-mark-vii', 'hak5-packet-squirrel-ethernet-tap']
    },
    {
      slug: 'hak5-packet-squirrel-ethernet-tap',
      name: 'Hak5 Packet Squirrel (Hardware Ethernet TAP & Packet Capture)',
      sku: 'SEC-HK5-SQUIRREL-01',
      mpn: 'PS-V1-TAP`',
      category_id: 7,
      subcategory: 'Network Security & Hak5',
      price_ron: 460.00,
      old_price_ron: 510.00,
      stock: 9,
      stock_status: 'in_stock',
      short_desc: 'Instrument hardware multi-funcțional Ethernet TAP: captură pachete tcpdump direct pe stick USB, VPN transparent și redirecționare de trafic prin comutator cu 4 poziții.',
      full_desc: 'Packet Squirrel se instalează direct pe cablul de rețea Ethernet și funcționează ca un switch transparent pasiv sau ca router de analiză. Cu o simplă comutare a selectorului mecanic pe pozițiile 1, 2, 3 sau 4, pornește automat capturi PCAP pe medii de stocare USB, stabilește tuneluri OpenVPN sau execută scripturi de securitate.',
      technical_specs: {
        processor: 'Atheros MIPS CPU @ 400MHz, 64MB RAM',
        interfaces: ['2x Porturi Ethernet RJ45 10/100 (In/Out inline passthrough)', '1x Port USB 2.0 Host pentru salvare fișiere PCAP', '1x Port Micro-USB pentru alimentare 5V', 'Selector mecanic cu 4 moduri de funcționare', 'LED RGB programabil'],
        os: 'Sistem dedicat OpenWrt Hak5'
      },
      pinout_info: null,
      datasheet_url: 'https://docs.hak5.org/packet-squirrel/',
      image_url: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&auto=format&fit=crop&q=80',
      badge: 'Hardware TAP',
      tags: ['Hak5', 'Packet Squirrel', 'Network TAP', 'tcpdump', 'PCAP', 'Ethernet Audit'],
      rating: 4.94,
      review_count: 15,
      featured: 0,
      compatible_with: ['dual-gigabit-hardware-network-tap']
    },
    {
      slug: 'esp32-marauder-v6-pocket-board',
      name: 'ESP32 Marauder v6 Pocket Pentest Board (Ecran TFT Touch 2.8", Antenă Externă SMA)',
      sku: 'SEC-ESP-MRD-V6',
      mpn: 'MRD-ESP32-V6',
      category_id: 7,
      subcategory: 'Wireless & RF Pentesting',
      price_ron: 290.00,
      old_price_ron: 340.00,
      stock: 18,
      stock_status: 'in_stock',
      short_desc: 'Platformă portabilă firmware Marauder pentru analiză de protocol Wi-Fi (scanare beacon, deautentificare, captură PMKID) și Bluetooth BLE (detectare AirTags/Flippers).',
      full_desc: 'ESP32 Marauder v6 este o suită de audit wireless autonomă într-o carcasă printată 3D cu ecran tactil color TFT de 2.8". Include slot MicroSD pentru salvarea fișierelor PCAP compatibile Wireshark și baterie Li-Ion internă cu circuit de încărcare USB-C.',
      technical_specs: {
        processor: 'ESP32-WROOM-32D Dual-Core 32-bit @ 240MHz',
        display: '2.8" TFT Touchscreen color rezoluție 320x240 (controller ILI9341 + XPT2046)',
        wireless: 'Wi-Fi 802.11 b/g/n + Bluetooth 4.2 BR/EDR & BLE',
        interfaces: ['Conector antenă externă SMA cu antenă 3dBi inclusă', 'Slot card MicroSD (FAT32)', 'Port USB-C de date și încărcare'],
        battery: 'Acumulator reîncărcabil 18650 Li-Ion integrat'
      },
      pinout_info: null,
      datasheet_url: 'https://github.com/justcallmekoko/ESP32Marauder',
      image_url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80',
      badge: 'Marauder v6',
      tags: ['ESP32 Marauder', 'Wi-Fi Analysis', 'BLE', 'PMKID', 'Deauth Detection', 'TFT Touch'],
      rating: 4.89,
      review_count: 27,
      featured: 1,
      compatible_with: ['bruce-esp32-s3-multi-tool-board', 'alfa-network-awus036acm-monitor-mode-adapter']
    },
    {
      slug: 'bruce-esp32-s3-multi-tool-board',
      name: 'Bruce ESP32-S3 Multi-Tool Dev Board (Sub-GHz CC1101 + Wi-Fi/BLE + MicroSD)',
      sku: 'SEC-ESP-BRUCE-S3',
      mpn: 'BRUCE-S3-LAB',
      category_id: 7,
      subcategory: 'Wireless & RF Pentesting',
      price_ron: 349.00,
      old_price_ron: 390.00,
      stock: 14,
      stock_status: 'in_stock',
      short_desc: 'Placă dedicată rulării firmware-ului Bruce pe ESP32-S3: transceiver Sub-1GHz CC1101 cu antenă telescopică SMA, ecran color IPS, suport BadUSB și audit wireless.',
      full_desc: 'Firmware-ul Bruce extinde capabilitățile plăcilor bazate pe ESP32-S3 către audit RF avansat. Datorită suportului nativ USB OTG pe ESP32-S3, placa poate rula scripturi BadUSB rapide, emula tastaturi/mouse-uri și interacționa cu semnale radio Sub-1GHz (300-928MHz) via modulul integrat CC1101.',
      technical_specs: {
        processor: 'ESP32-S3 Dual-Core Xtensa LX7 @ 240MHz cu suport instrucțiuni vectoriale AI',
        rf_transceiver: 'Texas Instruments CC1101 Sub-1GHz (315/433/868/915 MHz)',
        interfaces: ['Port USB-C nativ (suport BadUSB HID)', 'Port USB-C secundar de depanare UART', 'Slot MicroSD', 'Conector antenă SMA'],
        display: 'Ecran color IPS 1.9" cu unghiuri largi de vizualizare'
      },
      pinout_info: null,
      datasheet_url: 'https://github.com/pr3y/Bruce',
      image_url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80',
      badge: 'Bruce Firmware',
      tags: ['Bruce', 'ESP32-S3', 'Sub-1GHz', 'CC1101', 'BadUSB', 'Marauder', 'Wireless'],
      rating: 4.91,
      review_count: 19,
      featured: 0,
      compatible_with: ['flipper-zero-portable-multi-tool']
    },
    {
      slug: 'proxmark3-rdv401-research-kit',
      name: 'Proxmark3 RDV4.01 Research Kit (Dual-Band LF 125kHz & HF 13.56MHz + Chameleon)',
      sku: 'SEC-PRX-MK3-RDV4',
      mpn: 'PM3-RDV4.01-KIT',
      category_id: 7,
      subcategory: 'RFID / NFC Research',
      price_ron: 1450.00,
      old_price_ron: 1620.00,
      stock: 6,
      stock_status: 'in_stock',
      short_desc: 'Standardul suprem în cercetarea RFID/NFC: sniffing, clonare, emulare și decriptare carduri contactless (Mifare Classic, Desfire, HID Prox, iClass, T5577) cu antene modulare acordate.',
      full_desc: 'Proxmark3 RDV4.01 este proiectat special pentru laboratoare de testare a securității fizice și cercetători hardware. Folosește un FPGA Xilinx Spartan-II pentru demodularea semnalelor RF brute și un microcontroler ARM Cortex-M4. Suportă firmware-ul open-source Iceman (RRG), cu comenzi avansate de atac asupra cheilor de criptare Crypto1 din cipurile Mifare.',
      technical_specs: {
        processor: 'ARM Cortex-M4 (AT91SAM7S512) + FPGA Xilinx Spartan-II',
        antennas: 'Antene modulare ultra-acordate: antenă duală LF (125/134kHz cu factor Q ridicat) + antenă HF (13.56MHz)',
        supported_tags: 'LF: HID Prox, Indala, EM4100, AWID, T5577, Hitag; HF: Mifare Classic 1K/4K, Ultralight, DESFire, iClass, ISO14443A/B, ISO15693',
        interfaces: ['Port USB-C', 'Slot conector de baterie modulară Blueshark']
      },
      pinout_info: null,
      datasheet_url: 'https://github.com/RfidResearchGroup/proxmark3',
      image_url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&auto=format&fit=crop&q=80',
      badge: 'RFID Gold Standard',
      tags: ['Proxmark3', 'RDV4', 'RFID', 'NFC', 'Mifare', 'HID Prox', 'Hardware Hacking'],
      rating: 4.99,
      review_count: 36,
      featured: 1,
      compatible_with: ['pachet-10x-carduri-taguri-t5577-mifare-magic', 'chameleon-ultra-pocket-rfid-nfc-emulator']
    },
    {
      slug: 'chameleon-ultra-pocket-rfid-nfc-emulator',
      name: 'ChameleonUltra Pocket RFID/NFC Emulator & Reader (Bluetooth 5.0 + USB-C)',
      sku: 'SEC-CHM-ULTRA-01',
      mpn: 'CHM-ULTRA-BT',
      category_id: 7,
      subcategory: 'RFID / NFC Research',
      price_ron: 580.00,
      old_price_ron: 650.00,
      stock: 11,
      stock_status: 'in_stock',
      short_desc: 'Emulator hardware de buzunar de înaltă precizie cu Bluetooth: reține și emulează simultan până la 8 sloturi LF și 8 sloturi HF, decriptează chei Mifare și se controlează prin app mobil.',
      full_desc: 'ChameleonUltra este cel mai mic și mai precis emulator RFID/NFC activ din lume. Permite simularea perfectă a temporizării (anti-collision timing) pentru cititoare securizate, extragerea automată a cheilor Mifare prin atacuri nested/darkside și sincronizarea profilurilor de card prin aplicația open-source iOS și Android.',
      technical_specs: {
        processor: 'Nordic nRF52840 SoC (Bluetooth 5.0 LE + USB 2.0 nativ)',
        storage: '8 sloturi independente de carduri HF (13.56MHz) + 8 sloturi LF (125kHz)',
        emulation: 'Mifare Classic, Mifare Ultralight, NTAG213/215/216, EM4100, T5577, HID Prox',
        battery: 'Baterie internă reîncărcabilă Li-Po 90mAh (săptămâni de emulare continuă)'
      },
      pinout_info: null,
      datasheet_url: 'https://github.com/RfidResearchGroup/ChameleonUltra',
      image_url: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=600&auto=format&fit=crop&q=80',
      badge: '8-Slot Emulator',
      tags: ['ChameleonUltra', 'RFID', 'NFC Emulator', 'Bluetooth', 'Mifare Classic', 'T5577'],
      rating: 4.95,
      review_count: 22,
      featured: 0,
      compatible_with: ['proxmark3-rdv401-research-kit', 'flipper-zero-portable-multi-tool']
    },
    {
      slug: 'alfa-network-awus036acm-monitor-mode-adapter',
      name: 'Adaptor Wi-Fi Alfa Network AWUS036ACM 802.11ac 1200Mbps (Dual Antenă 5dBi, Monitor Mode & Injection)',
      sku: 'SEC-ALF-036ACM',
      mpn: 'AWUS036ACM',
      category_id: 7,
      subcategory: 'Wireless & RF Pentesting',
      price_ron: 249.00,
      old_price_ron: 280.00,
      stock: 25,
      stock_status: 'in_stock',
      short_desc: 'Adaptor Wi-Fi USB 3.0 etalon pentru Kali Linux / Parrot OS bazat pe chipset Mediatek MT7612U: suport nativ în nucleul Linux pentru mod monitor, injecție de pachete și benzi 2.4GHz + 5GHz.',
      full_desc: 'Alfa AWUS036ACM este placa de rețea Wi-Fi preferată a specialiștilor în securitate datorită driverului `mt76` integrat direct în nucleul Linux oficial (fără compilare manuală de module dkms). Suportă rate de transfer AC1200 (300Mbps pe 2.4GHz + 867Mbps pe 5GHz) și vine cu două antene dipol de 5dBi cu conectori RP-SMA.',
      technical_specs: {
        chipset: 'MediaTek MT7612U (driver nativ kernel Linux mainline mt76)',
        frequencies: 'Dual Band 2.4 GHz & 5 GHz (802.11a/b/g/n/ac)',
        interfaces: ['Port USB 3.0 Type-A', '2x Conectori RP-SMA mamă cu antene omnidirecționale 5dBi detașabile'],
        features: ['Mod Monitor nativ', 'Injecție pachete (Packet Injection)', 'Suport mod AP']
      },
      pinout_info: null,
      datasheet_url: 'https://files.alfa.com.tw/files/datasheet/AWUS036ACM.pdf',
      image_url: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&auto=format&fit=crop&q=80',
      badge: 'Kali Monitor Mode',
      tags: ['Alfa Network', 'Kali Linux', 'Monitor Mode', 'Packet Injection', 'MT7612U', 'Wi-Fi 5'],
      rating: 4.97,
      review_count: 49,
      featured: 1,
      compatible_with: ['hak5-wifi-pineapple-mark-vii', 'esp32-marauder-v6-pocket-board']
    },
    {
      slug: 'bus-pirate-v5-hardware-hacking-tool',
      name: 'Bus Pirate v5 Hardware Hacking Multi-Tool (I2C/SPI/UART/1-Wire, Terminal VT100, Ecran Color)',
      sku: 'SEC-BUS-PIRATE-V5',
      mpn: 'BP-V5-REV10',
      category_id: 7,
      subcategory: 'Hardware Hacking & Embedded',
      price_ron: 290.00,
      old_price_ron: 330.00,
      stock: 16,
      stock_status: 'in_stock',
      short_desc: 'Instrument universal open-source pentru comunicare directă cu cipurile de pe plăci: surse de tensiune programabile 0.8V - 5V, sonde logice, decodor de protocoale și conectori cu blocare automată.',
      full_desc: 'Bus Pirate v5 este un instrument indispensabil de laborator hardware creat de Dangerous Prototypes. Echipat cu procesor dual-core Raspberry Pi RP2040, ecran LCD color de înaltă rezoluție și sursă de laborator integrată cu limitare de curent, permite trimiterea de comenzi I2C, SPI, UART, 1-Wire, MIDI sau JTAG direct dintr-un terminal serial obișnuit.',
      technical_specs: {
        processor: 'Raspberry Pi RP2040 Dual-Core ARM Cortex-M0+ @ 133MHz',
        voltage_supply: 'Sursă de tensiune reglabilă digital 0.8V - 5.0V (curent până la 400mA)',
        interfaces: ['8 pini multifuncționali I/O cu LED-uri RGB indicatoare', 'Ecran color IPS 240x135', 'Port USB-C nativ'],
        protocols: ['I2C', 'SPI', 'UART', '1-Wire', 'CAN', 'SWD', 'JTAG', 'MIDI', 'Bitbang']
      },
      pinout_info: {
        total_pins: 10,
        logic_level: '0.8V - 5.0V programabil',
        wiring_notes: ['Fiecare pin are un LED RGB asociat care își schimbă culoarea în funcție de nivelul logic (High = verde, Low = albastru, Tensiune = roșu).']
      },
      datasheet_url: 'https://buspirate.com/',
      image_url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80',
      badge: 'Hardware Multi-Tool',
      tags: ['Bus Pirate', 'I2C', 'SPI', 'UART', 'Hardware Hacking', 'Dangerous Prototypes'],
      rating: 4.96,
      review_count: 31,
      featured: 1,
      compatible_with: ['glasgow-interface-explorer-hardware-tool', 'analizor-logic-usb-16-canale-100mhz']
    },
    {
      slug: 'glasgow-interface-explorer-hardware-tool',
      name: 'Glasgow Interface Explorer Hardware Tool (FPGA iCE40 + Interfețe Digitale Universale)',
      sku: 'SEC-GLS-EXPLORER-01',
      mpn: 'GLASGOW-REV-C',
      category_id: 7,
      subcategory: 'Hardware Hacking & Embedded',
      price_ron: 790.00,
      old_price_ron: 880.00,
      stock: 7,
      stock_status: 'in_stock',
      short_desc: 'Platformă de explorare și inginerie inversă hardware bazată pe FPGA Lattice iCE40: configurează dinamic transceivere pentru orice protocol digital nestandard (SPI, JTAG, SWD, UART, I2C, bus-uri proprietare).',
      full_desc: 'Glasgow este un instrument revoluționar open-source care elimină limitările procesoarelor clasice prin sinteza on-the-fly de blocuri logice FPGA. Poate citi memorii flash la viteze maxime, emula controlere necunoscute și decoda protocoale industriale asincrone folosind unelte Python native.',
      technical_specs: {
        processor: 'Lattice iCE40HX8K FPGA + Cypress FX2 High-Speed USB',
        io_channels: '16 canale I/O digitale de mare viteză cu translație independentă de tensiune de la 1.8V la 5.0V',
        power_output: 'Sursă integrată programabilă independentă pentru fiecare banc de 8 pini',
        protection: 'Limitare de curent pe fiecare canal și protecție ESD avansată'
      },
      pinout_info: null,
      datasheet_url: 'https://glasgowembedded.org/',
      image_url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80',
      badge: 'FPGA Protocol Explorer',
      tags: ['Glasgow', 'FPGA', 'Hardware Hacking', 'Reverse Engineering', 'Digital Protocol'],
      rating: 4.98,
      review_count: 12,
      featured: 0,
      compatible_with: ['bus-pirate-v5-hardware-hacking-tool']
    },
    {
      slug: 'analizor-logic-usb-16-canale-100mhz',
      name: 'Analizor Logic USB 16 Canale 100MHz (Compatibil Sigrok / PulseView / Saleae Logic Software)',
      sku: 'SEC-LOG-16CH-100M',
      mpn: 'LA-16CH-100MHZ',
      category_id: 7,
      subcategory: 'Hardware Hacking & Embedded',
      price_ron: 199.00,
      old_price_ron: 230.00,
      stock: 22,
      stock_status: 'in_stock',
      short_desc: 'Analizor logic digital pe 16 canale independente la 100MHz cu carcasă de aluminiu ecranată și sonde cu micro-clești: decodare automată protocoale SPI, I2C, UART, CAN, USB 1.1 și JTAG în timp real.',
      full_desc: 'Acest analizor logic compact pe USB este un instrument esențial pentru orice banc de lucru de inginerie inversă sau dezvoltare de firmware. Funcționează cu software-ul gratuit și open-source PulseView / Sigrok, oferind decodificatoare automate pentru peste 100 de protocoale industriale și digitale.',
      technical_specs: {
        channels: '16 canale logice digitale simultane',
        sampling_rate: 'Până la 100 MSPS (eșantioane pe secundă)',
        input_voltage: 'Compatibil cu logică 1.8V, 2.5V, 3.3V și 5.0V CMOS/TTL',
        interfaces: ['Conector panglică 20-pin', 'Port USB Type-B / Type-C către PC']
      },
      pinout_info: null,
      datasheet_url: 'https://sigrok.org/wiki/Supported_hardware',
      image_url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80',
      badge: '100MHz 16-CH',
      tags: ['Logic Analyzer', '100MHz', 'Sigrok', 'PulseView', 'Hardware Debug', 'Protocol Analyzer'],
      rating: 4.93,
      review_count: 38,
      featured: 0,
      compatible_with: ['bus-pirate-v5-hardware-hacking-tool']
    },
    {
      slug: 'dual-gigabit-hardware-network-tap',
      name: 'Dual Gigabit Hardware Network TAP (Passive 10/100/1000Base-T Packet Capture / Plunder Bug Style)',
      sku: 'SEC-NET-TAP-1G',
      mpn: 'NET-TAP-GIGABIT',
      category_id: 7,
      subcategory: 'Network Security & Hak5',
      price_ron: 340.00,
      old_price_ron: 390.00,
      stock: 13,
      stock_status: 'in_stock',
      short_desc: 'TAP de rețea hardware pasiv pentru interceptarea fără alterare a traficului Gigabit Ethernet (full-duplex RX/TX pe porturi separate de monitorizare) pentru Wireshark / Zeek / Suricata.',
      full_desc: 'Spre deosebire de port-mirroring-ul bazat pe switch-uri software care poate pierde pachete în sarcini mari, acest TAP hardware reproduce fizic 100% din traficul ce trece pe fir fără a introduce latență, jitter sau riscuri de injectare de pachete în rețeaua monitorizată.',
      technical_specs: {
        speed: '10/100/1000 Base-T Gigabit Ethernet',
        ports: ['2x Porturi de rețea inline passthrough (J1 și J2)', '2x Porturi de monitorizare RX / TX (Tap A și Tap B)'],
        power: 'Alimentare 5V via USB-C cu protecție la cădere (traficul continuă să curgă chiar și fără alimentare pe circuit pasiv)'
      },
      pinout_info: null,
      datasheet_url: 'https://en.wikipedia.org/wiki/Network_tap',
      image_url: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&auto=format&fit=crop&q=80',
      badge: 'Passive Sniffer',
      tags: ['Network TAP', 'Gigabit Ethernet', 'Wireshark', 'Packet Capture', 'Passive Sniffer'],
      rating: 4.91,
      review_count: 14,
      featured: 0,
      compatible_with: ['hak5-packet-squirrel-ethernet-tap']
    },
    {
      slug: 'tester-detector-cabluri-malitioase-omg',
      name: 'Tester & Detector de Cabluri Malițioase C-to-C (O.MG Cable Tester / Hardware Interceptor Detector)',
      sku: 'SEC-CAB-TEST-OMG',
      mpn: 'CAB-DETECTOR-V2',
      category_id: 7,
      subcategory: 'USB Security & Hotplug',
      price_ron: 179.00,
      old_price_ron: 210.00,
      stock: 19,
      stock_status: 'in_stock',
      short_desc: 'Dispozitiv de securitate pentru laborator ce detectează implanturile hardware ascunse în cabluri USB-C/Lightning (cipuri Wi-Fi spion, payload-uri BadUSB ascunse în conector), testând integritatea pinilor CC/VBUS.',
      full_desc: 'Cablurile malițioase moderne (precum O.MG Cable sau USBNinja) conțin microprocesoare și module Wi-Fi ascunse în carcasa mufei USB. Acest detector măsoară rezistența, continuitatea și impedanța fiecărui pin intern pentru a identifica imediat cablurile modificate înainte de conectarea lor pe computere sensibile.',
      technical_specs: {
        interfaces: ['Intrare USB Type-C', 'Ieșire USB Type-C', 'Soclu Lightning', 'Port Micro-USB'],
        display: 'Matrice de LED-uri de diagnostic pe fiecare linie de semnal (GND, TX/RX, CC, VBUS, D+/D-)',
        power: 'Baterie internă tip pastilă CR2032 sau alimentare externă 5V'
      },
      pinout_info: null,
      datasheet_url: 'https://o.mg.lol/',
      image_url: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&auto=format&fit=crop&q=80',
      badge: 'Anti-Implant',
      tags: ['O.MG Cable Detector', 'Malicious Cable', 'Hardware Implant', 'USB Security', 'BadUSB'],
      rating: 4.94,
      review_count: 17,
      featured: 0,
      compatible_with: ['hak5-usb-rubber-ducky-v3']
    },
    {
      slug: 'pachet-10x-carduri-taguri-t5577-mifare-magic',
      name: 'Pachet 10x Carduri & Taguri Dual-Frequency T5577 (125kHz Re-writable) + Mifare Magic Gen2 (13.56MHz UID Changeable)',
      sku: 'SEC-RFID-TAG-PACK10',
      mpn: 'RFID-TEST-DUAL10',
      category_id: 7,
      subcategory: 'RFID / NFC Research',
      price_ron: 75.00,
      old_price_ron: 90.00,
      stock: 40,
      stock_status: 'in_stock',
      short_desc: 'Set esențial de test pentru laboratorul RFID/NFC: 5 carduri cu cip Atmel T5577 (rescriibile pentru clonare EM4100 / HID Prox) și 5 taguri Mifare Classic 1K cu bloc 0 (UID) direct inscriptibil fără backdoor-uri blocate.',
      full_desc: 'Kitul ideal de consumabile pentru experimente cu Flipper Zero sau Proxmark3. Cardurile T5577 pot emula orice cip de joasă frecvență de 125kHz, în timp ce tagurile Mifare Magic Gen2 (CUID) suportă rescrierea sectorului 0 cu comenzi standard de scriere ISO14443A, ocolind sistemele anti-clonare care blochează tagurile Gen1.',
      technical_specs: {
        contents: ['5x Carduri albe PVC T5577 (125kHz LF, 330 biți EEPROM)', '5x Brelocuri RFID albastre Mifare Classic 1K Magic Gen2 (13.56MHz HF, UID modificabil)'],
        compatibility: '100% compatibile cu Flipper Zero, Proxmark3, ChameleonUltra, ACR122U'
      },
      pinout_info: null,
      datasheet_url: 'https://lab401.com/',
      image_url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&auto=format&fit=crop&q=80',
      badge: 'Lab Test Pack',
      tags: ['RFID Tags', 'T5577', 'Mifare Magic Gen2', 'UID Changeable', 'Proxmark3', 'Test Lab'],
      rating: 4.98,
      review_count: 52,
      featured: 0,
      compatible_with: ['proxmark3-rdv401-research-kit', 'flipper-zero-portable-multi-tool']
    }
  ];

  console.log(`Inserting ${products.length} cybersecurity products...`);

  for (const p of products) {
    await conn.query(`
      INSERT INTO products (
        slug, name, sku, mpn, category_id, subcategory,
        price_ron, old_price_ron, stock, stock_status,
        short_desc, full_desc, technical_specs, pinout_info,
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
        compatible_with = VALUES(compatible_with)
    `, [
      p.slug,
      p.name,
      p.sku,
      p.mpn,
      p.category_id,
      p.subcategory,
      p.price_ron,
      p.old_price_ron,
      p.stock,
      p.stock_status,
      p.short_desc,
      p.full_desc,
      JSON.stringify(p.technical_specs),
      p.pinout_info ? JSON.stringify(p.pinout_info) : null,
      p.datasheet_url,
      p.image_url,
      p.badge,
      JSON.stringify(p.tags),
      p.rating,
      p.review_count,
      p.featured,
      JSON.stringify(p.compatible_with)
    ]);
  }

  const [totalRows] = await conn.query('SELECT COUNT(*) as cnt FROM products');
  console.log('Total products in database now:', totalRows[0].cnt);

  const [catRows] = await conn.query(`
    SELECT c.id, c.name, COUNT(p.id) as count
    FROM categories c
    LEFT JOIN products p ON c.id = p.category_id
    GROUP BY c.id
    ORDER BY c.sort_order
  `);
  console.log('Categories breakdown:', catRows);

  await conn.end();
}

main().catch(console.error);
