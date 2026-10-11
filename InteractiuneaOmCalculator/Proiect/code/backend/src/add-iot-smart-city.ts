import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { pool, initDatabase } from './db.js';
import { categoriesData, productsData } from './seed.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const iotSmartProducts = [
    {
    slug: 'rakwireless-rak7268v2-wisgate-edge-lite-2-lorawan-gateway',
    name: 'RAKwireless RAK7268V2 WisGate Edge Lite 2 (8-Channel LoRaWAN Gateway SX1302 cu PoE)',
    sku: 'RAK7268V2-LORAWAN-GW',
    mpn: 'RAK7268C-EU868',
    category_id: 3,
    subcategory: 'Smart City & LoRaWAN',
    price_ron: 799.99,
    old_price_ron: 899.99,
    stock: 7,
    stock_status: 'in_stock',
    short_desc: 'Gateway industrial de interior cu 8 canale LoRaWAN bazat pe cipul Semtech SX1302, alimentare PoE, Wi-Fi și server intern ChirpStack.',
    full_desc: 'RAK7268V2 WisGate Edge Lite 2 este nodul central ideal pentru proiecte Smart City, clădiri de birouri și monitorizarea campusurilor. Cu un cip receptor SX1302 capabil să proceseze simultan pachete de la mii de senzori pe o rază de până la 15 km în câmp deschis, integrează sistemul de operare WisGateOS 2 bazat pe OpenWrt și permite rutarea locală prin ChirpStack sau în cloud către The Things Network (TTN).',
    technical_specs: {
      architecture: 'MIPS MediaTek MT7628 + Semtech SX1302 LoRa Concentrator',
      skill_level: 'Intermediate',
      channels: '8 canale LoRaWAN simultane (Banda europeană EU868: 863-870 MHz)',
      connectivity: 'Ethernet RJ45 10/100M cu suport PoE 802.3af + Wi-Fi 2.4GHz b/g/n',
      internal_network_server: 'Server ChirpStack V4 integrat pe dispozitiv (funcționează complet offline fără cloud)',
      packet_forwarders: 'Semtech Packet Forwarder, Basics Station, ChirpStack Gateway Bridge',
      operating_voltage: '12V DC Jack sau 48V PoE 802.3af (Splitter inclus)',
      power_consumption: '< 5W',
      linux_support: 'WisGateOS 2 (bazat pe OpenWrt Linux cu acces root SSH)',
      works_with_os: ['WisGateOS', 'The Things Network (TTN)', 'ChirpStack', 'AWS IoT Core for LoRaWAN']
    },
    pinout_info: null,
    datasheet_url: 'https://docs.rakwireless.com/product-categories/wisgate/rak7268v2/',
    image_url: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80',
    badge: 'Smart City Gateway',
    tags: ['iot', 'smart-city', 'lorawan', 'gateway', 'sx1302', 'chirpstack', 'ttn'],
    rating: 4.97,
    review_count: 12,
    featured: true,
    compatible_with: ['heltec-wifi-lora-32-v3-esp32s3-sx1262', 'lilygo-t-beam-esp32-lora-868-gps-neo6m']
  },
  {
    slug: 'seeed-sensecap-s2100-lorawan-data-logger-ip66',
    name: 'Seeed Studio SenseCAP S2100 LoRaWAN Data Logger & Hub (Baterie 19Ah, IP66 Exterior)',
    sku: 'SENSECAP-S2100-HUB',
    mpn: '114992984',
    category_id: 3,
    subcategory: 'Smart City & LoRaWAN',
    price_ron: 349.99,
    old_price_ron: 399.99,
    stock: 15,
    stock_status: 'in_stock',
    short_desc: 'Data logger universal de exterior IP66 cu autonomie de până la 10 ani pe baterie pentru conectarea oricărui senzor industrial RS485/Modbus sau analogic la rețeaua LoRaWAN.',
    full_desc: 'SenseCAP S2100 rezolvă provocarea digitalizării senzorilor industriali din orașele inteligente și agricultură. Acceptă semnale de intrare Modbus RTU RS485, 0-10V, 4-20mA și impulsuri de debitmetru, transmițând datele criptat prin LoRaWAN la kilometri distanță, alimentat exclusiv dintr-o baterie internă Li-SOCl2 de 19Ah inclusă.',
    technical_specs: {
      interfaces: 'RS485 Modbus RTU, 0-10V analogic, 4-20mA buclă de curent, intrare GPIO/Pulse counter',
      sensor_power_output: 'Livrează 12V DC sau 5V DC direct către senzorul extern doar în momentul citirii',
      lorawan_class: 'LoRaWAN Class A (Banda EU868, putere emisie +16dBm)',
      battery: 'Baterie internă litiu D-Cell ER34615 3.6V / 19.000mAh (Până la 10 ani autonomie la transmisie la 1 oră)',
      enclosure: 'Carcasă ermetică IP66 rezistentă la UV, intemperii și temperaturi -40°C ... +85°C',
      configuration: 'Bluetooth Low Energy din aplicație dedicată Android / iOS',
      linux_support: 'Decodoare oficiale JavaScript/Python pentru TTN și ChirpStack'
    },
    pinout_info: null,
    datasheet_url: 'https://www.seeedstudio.com/SenseCAP-S2100-LoRaWAN-Data-Logger-p-5389.html',
    image_url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    badge: '10 Ani Baterie IP66',
    tags: ['iot', 'smart-city', 'lorawan', 'modbus', 'data-logger', 'industrial-iot', 'sensors'],
    rating: 4.93,
    review_count: 14,
    featured: false,
    compatible_with: ['rakwireless-rak7268v2-wisgate-edge-lite-2-lorawan-gateway']
  },
  {
    slug: 'senzor-calitate-aer-exterior-smart-city-pm-gaze-rs485-ip65',
    name: 'Senzor Calitate Aer Exterior Smart City (PM2.5 / PM10 / NO2 / CO / SO2, RS485 Modbus, IP65)',
    sku: 'SMARTCITY-AQ-RS485-IP65',
    mpn: 'SCAQ-PRO-RS485',
    category_id: 3,
    subcategory: 'Smart City & Mediu',
    price_ron: 489.99,
    old_price_ron: 569.99,
    stock: 8,
    stock_status: 'in_stock',
    short_desc: 'Stație compactă de monitorizare a aerului urban în carcasă cu protecție solară anti-radiație, senzor laser de particule și celule electrochimice de gaze.',
    full_desc: 'Conceput pentru rețelele de monitorizare ambientală urbană din Smart Cities, acest senzor all-in-one măsoară concentrația de pulberi în suspensie (PM2.5 și PM10) prin difracție laser și gazele poluante de trafic (NO2, CO, SO2) prin senzori electrochimici de mare sensibilitate, raportând datele continuu prin protocolul industrial Modbus RTU pe magistrala RS485.',
    technical_specs: {
      measured_parameters: 'PM2.5 (0-1000 µg/m³), PM10 (0-1000 µg/m³), NO2 (0-20 ppm), CO (0-100 ppm), Temperatură (-40...+80°C), Umiditate (0-100%)',
      interface: 'RS485 Modbus RTU (Adresă programabilă 1-247, baud rate 9600 bps)',
      operating_voltage: '9V - 24V DC',
      enclosure: 'Ecran lamelar multi-strat anti-radiație solară cu protecție IP65',
      linux_support: 'Integrare directă prin noduri Node-RED, Python Modbus și Home Assistant',
      works_with_os: ['Home Assistant', 'Node-RED', 'ThingsBoard IoT Platform']
    },
    pinout_info: null,
    datasheet_url: 'https://www.seeedstudio.com/',
    image_url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    badge: 'Smart City Poluare',
    tags: ['iot', 'smart-city', 'calitate-aer', 'pm25', 'pm10', 'modbus', 'rs485', 'poluare'],
    rating: 4.89,
    review_count: 9,
    featured: false,
    compatible_with: ['seeed-sensecap-s2100-lorawan-data-logger-ip66', 'convertor-industrial-rs485-la-ttl-uart']
  },
  {
    slug: 'senzor-radar-microunde-trafic-viteza-vehicule-24ghz-modbus',
    name: 'Senzor Radar Microunde Monitorizare Trafic și Viteză Vehicule Smart City (24GHz, Modbus/UART)',
    sku: 'SMARTCITY-TRAFFIC-RADAR-24G',
    mpn: 'RADAR-TF24-PRO',
    category_id: 3,
    subcategory: 'Smart City & Trafic',
    price_ron: 599.99,
    old_price_ron: 689.99,
    stock: 6,
    stock_status: 'in_stock',
    short_desc: 'Senzor radar Doppler 24GHz de exterior pentru detecția fluxului de vehicule, clasificare trafic și măsurare viteză până la 100 de metri.',
    full_desc: 'Componentă esențială pentru intersecțiile inteligente și parcările Smart City. Emite semnale radar în banda 24GHz fără a fi afectat de ploaie, ceață, întuneric sau praf, raportând instantaneu prezența vehiculelor, viteza lor exactă (1-250 km/h) și direcția de deplasare (apropiere/depărtare).',
    technical_specs: {
      technology: '24GHz FMCW / Doppler Radar',
      detection_range: 'Până la 100 de metri distanță pentru autovehicule',
      speed_range: '1 km/h – 250 km/h (acuratețe ±1 km/h)',
      interfaces: ['RS485 Modbus RTU', 'UART 3.3V', 'Ieșire releu trigger depășire viteză'],
      operating_voltage: '12V DC (9-24V DC)',
      power_consumption: '< 1.8W',
      enclosure: 'IP67 etanș pentru montaj pe stâlpi stradali sau pasaje',
      linux_support: 'Pachete ROS2 / Python pentru analiză în timp real a traficului'
    },
    pinout_info: null,
    datasheet_url: 'https://www.seeedstudio.com/',
    image_url: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80',
    badge: 'Radar Trafic 24GHz',
    tags: ['iot', 'smart-city', 'radar', 'trafic', 'viteza', 'modbus', 'senzori-exterior'],
    rating: 4.95,
    review_count: 7,
    featured: false,
    compatible_with: ['convertor-industrial-rs485-la-ttl-uart']
  },
  {
    slug: 'controler-inteligent-iluminat-public-lorawan-nema-dali',
    name: 'Controler Inteligent Iluminat Public Smart City LoRaWAN NEMA (IP66, Fotocelulă & DALI/0-10V)',
    sku: 'SMARTCITY-STREETLIGHT-NEMA',
    mpn: 'SLC-NEMA-EU868',
    category_id: 3,
    subcategory: 'Smart City & Energie',
    price_ron: 269.99,
    old_price_ron: 319.99,
    stock: 14,
    stock_status: 'in_stock',
    short_desc: 'Nod de telegestiune pentru stâlpi de iluminat cu soclu standard ANSI C136.41 NEMA 7-pin, dimming DALI/0-10V și măsurare consum energie.',
    full_desc: 'Permite municipalităților să reducă factura energetică a iluminatului public cu peste 40%. Se instalează prin simplă răsucire pe soclul NEMA existent al lămpii stradale LED, oferind control individual al intensității luminoase conform orarelor sau senzorului crepuscular integrat, raportând automat lămpile defecte prin rețeaua LoRaWAN.',
    technical_specs: {
      socket_type: 'Standard internațional ANSI C136.41 NEMA 7-pin Twist-Lock',
      communication: 'LoRaWAN Class C (Banda EU868, transmisie bidirecțională în timp real)',
      dimming_support: 'Interfață duală DALI 2.0 și semnal analogic 0-10V PWM',
      power_metering: 'Măsurare precisă Tensiune (V), Curent (A), Putere Activă (W), Energie (kWh) și Factor de Putere (Cos φ)',
      photocell: 'Senzor crepuscular optic integrat pentru comutare de urgență în caz de lipsă rețea',
      operating_voltage: '100-277V AC 50/60Hz',
      enclosure: 'IP66 rezistent la UV extrem și descărcări electrice până la 10kV',
      linux_support: 'Integrare platforme Smart City ThingsBoard, Home Assistant'
    },
    pinout_info: null,
    datasheet_url: 'https://lora-alliance.org/',
    image_url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    badge: 'NEMA 7-Pin LoRaWAN',
    tags: ['iot', 'smart-city', 'iluminat-public', 'lorawan', 'nema', 'dali', 'energie'],
    rating: 4.91,
    review_count: 11,
    featured: false,
    compatible_with: ['rakwireless-rak7268v2-wisgate-edge-lite-2-lorawan-gateway']
  },
  {
    slug: 'contor-inteligent-apa-smart-city-lorawan-ultrasonic-dn20',
    name: 'Contor Inteligent de Apă Smart City LoRaWAN Ultrasonic (DN20, IP68 Submersibil)',
    sku: 'SMARTCITY-WATERMETER-DN20',
    mpn: 'WM-US-DN20-EU868',
    category_id: 3,
    subcategory: 'Smart City & Utilități',
    price_ron: 389.99,
    old_price_ron: 449.99,
    stock: 10,
    stock_status: 'in_stock',
    short_desc: 'Debitmetru de apă ultrasonic fără componente mecanice în mișcare, cu emițător radio LoRaWAN, baterie 10 ani și detectare scurgeri/avarii.',
    full_desc: 'Digitalizează complet rețelele de distribuție a apei potabile. Tehnologia cu ultrasunete măsoară chiar și cele mai mici scurgeri de picături fără a suferi de uzură mecanică în timp, raportând zilnic indexul de consum, temperatura apei și alarme de conductă spartă sau curgere inversă prin LoRaWAN.',
    technical_specs: {
      pipe_diameter: 'DN20 (Filet 3/4" exterior, debit nominal Q3 = 2.5 m³/h)',
      measurement_principle: 'Tranzit ultrasonic (Fără rotor mecanic, insensibil la impurități/nisip)',
      communication: 'LoRaWAN Class A (EU868)',
      leak_detection: 'Detectare curgere continuă anormală (țeavă spartă sau toaletă curgând), curgere inversă, golire conductă',
      battery: 'Baterie Litiu 3.6V integrată de înaltă anduranță (Durată de viață 10+ ani)',
      protection_class: 'IP68 complet submersibil (poate funcționa inundat în căminul de apă la 1 metru adâncime)',
      linux_support: 'Decodoare pachete JavaScript/Payload formate pentru TTN/ChirpStack'
    },
    pinout_info: null,
    datasheet_url: 'https://lora-alliance.org/',
    image_url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
    badge: 'Ultrasonic IP68',
    tags: ['iot', 'smart-city', 'contor-apa', 'lorawan', 'ultrasonic', 'utilitati', 'submersibil'],
    rating: 4.96,
    review_count: 8,
    featured: false,
    compatible_with: ['rakwireless-rak7268v2-wisgate-edge-lite-2-lorawan-gateway']
  },

    {
    slug: 'home-assistant-yellow-hub-cm4-zigbee-matter-poe',
    name: 'Home Assistant Yellow Hub (Raspberry Pi CM4, Zigbee 3.0, Thread & Matter Integrat, PoE)',
    sku: 'NABUCASA-HA-YELLOW',
    mpn: 'HA-YELLOW-POE',
    category_id: 3,
    subcategory: 'Smart Home Hubs',
    price_ron: 899.99,
    old_price_ron: 999.99,
    stock: 9,
    stock_status: 'in_stock',
    short_desc: 'Hub-ul Smart Home oficial creat de Nabu Casa: radio intern Silicon Labs Matter/Thread/Zigbee, slot M.2 NVMe și alimentare Gigabit PoE.',
    full_desc: 'Home Assistant Yellow este platforma de referință a întregului univers Smart Home local și privat. Proiectat special de echipa fondatoare Home Assistant, integrează direct cipul radio multiprotocol Silicon Labs MGM210P capabil să ruleze simultan Zigbee 3.0 și Thread/Matter, un slot M.2 M-Key pentru SSD-uri NVMe ultra-rapide și alimentare directă prin cablul de rețea PoE.',
    technical_specs: {
      processor_module: 'Raspberry Pi Compute Module 4 (CM4) Quad-core A72 @ 1.5GHz, 2GB RAM, 16GB eMMC',
      multiprotocol_radio: 'Silicon Labs MGM210P intern (Zigbee 3.0, Thread, Matter cu antenă ceramică + conector IPEX)',
      storage_expansion: 'Slot M.2 2280 NVMe PCIe 2.0 (stocare baze de date istorice pe SSD)',
      networking: 'Gigabit Ethernet cu alimentare Power-over-Ethernet (PoE 802.3at) integrată',
      interfaces: ['2x USB 2.0 Type-A', 'Port USB-C de depanare serială', 'DAC audio stereo de înaltă fidelitate'],
      operating_system: 'Home Assistant OS oficial pre-instalat (gata de configurare în 60 secunde)',
      works_with_os: ['Home Assistant OS', 'Matter', 'Thread', 'Zigbee Home Automation (ZHA)']
    },
    pinout_info: null,
    datasheet_url: 'https://yellow.home-assistant.io/',
    image_url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
    badge: 'Oficial Nabu Casa',
    tags: ['iot', 'smart-home', 'home-assistant', 'yellow', 'matter', 'thread', 'zigbee', 'poe'],
    rating: 4.99,
    review_count: 36,
    featured: true,
    compatible_with: ['raspberry-pi-compute-module-4-8gb-emmc-wifi', 'shelly-plus-1pm-smart-relay-power-metering']
  },
  {
    slug: 'shelly-pro-4pm-4-channel-din-rail-smart-switch-lan-color-screen',
    name: 'Shelly Pro 4PM — 4-Channel DIN Rail Smart Switch cu Ecran Color & LAN Ethernet',
    sku: 'SHELLY-PRO-4PM-DIN',
    mpn: 'SPSW-004PE16EU',
    category_id: 3,
    subcategory: 'Smart Home & Tablouri Electrice',
    price_ron: 429.99,
    old_price_ron: 489.99,
    stock: 12,
    stock_status: 'in_stock',
    short_desc: 'Comutator profesional inteligent pentru tablou electric pe șină DIN: 4 canale de 16A (total 40A), măsurare consum pe fiecare canal, ecran color și port LAN RJ45.',
    full_desc: 'Standardul profesional pentru automatizarea locuințelor și birourilor direct din tabloul electric general. Cu conectivitate prin cablu Ethernet LAN pentru fiabilitate absolută fără interferențe Wi-Fi, măsoară consumul în timp real pe 4 circuite independente de 16A și afișează puterea instantanee pe ecranul color integrat de 1.8 inci.',
    technical_specs: {
      mounting: 'Montaj standard pe șină DIN (ocupa 3 module DIN în tablou)',
      channels: '4 canale independente de comutare (16A maxim per canal, curent total combinat 40A)',
      connectivity: 'Port Ethernet RJ45 10/100M nativ + Wi-Fi 802.11 b/g/n + Bluetooth 4.2',
      power_metering: 'Măsurare separată pe fiecare canal a puterii active (W), tensiunii (V) și curentului (A)',
      display: 'Ecran color TFT 1.8" pentru navigare, diagnoză și consum live cu butoane de control',
      safety: 'Protecție la supratemperatură, supratensiune, supracurent și detectare arc electric',
      linux_support: 'Home Assistant Native Integration, MQTT local securizat TLS, scripting mJS intern'
    },
    pinout_info: null,
    datasheet_url: 'https://www.shelly.com/en/products/shop/shelly-pro-4-pm',
    image_url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
    badge: '4x 16A DIN Rail LAN',
    tags: ['iot', 'smart-home', 'shelly', 'tablou-electric', 'din-rail', 'lan', 'power-metering'],
    rating: 4.98,
    review_count: 22,
    featured: true,
    compatible_with: ['home-assistant-yellow-hub-cm4-zigbee-matter-poe']
  },
  {
    slug: 'vana-inteligenta-motorizata-apa-gaz-zigbee-inchidere-automata',
    name: 'Vană Inteligentă Motorizată de Apă / Gaz cu Închidere Automată la Inundație (Zigbee 3.0)',
    sku: 'SMARTHOME-VALVE-ZIGBEE',
    mpn: 'ZIGBEE-VALVE-01',
    category_id: 3,
    subcategory: 'Smart Home Siguranță',
    price_ron: 179.99,
    old_price_ron: 209.99,
    stock: 16,
    stock_status: 'in_stock',
    short_desc: 'Robinet motorizat de înalt cuplu ce se instalează peste robinetul existent fără modificarea instalației; închide apa în 5 secunde la inundație.',
    full_desc: 'Sistemul de siguranță esențial pentru orice casă inteligentă. Se montează peste maneta oricărui robinet cu bilă de 1/2", 3/4" sau 1" existent pe țeavă. Cuplat în automatizările Home Assistant cu senzorii de inundație, închide automat coloana de apă în sub 7 secunde de la detectarea primei picături, prevenind daune de mii de euro.',
    technical_specs: {
      communication: 'Protocol standard Zigbee 3.0 (compatibil ZHA, Zigbee2MQTT, Tuya)',
      torque: 'Cuplu mecanic puternic de 30-60 kg.cm (rotește chiar și robinete înțepenite)',
      close_time: 'Timp de acționare completă închidere/deschidere: 5 - 8 secunde',
      manual_override: 'Inel de eliberare mecanică pentru acționare manuală în caz de pană totală de curent',
      operating_voltage: '12V DC / 1A (Alimentator 230V inclus în pachet)',
      linux_support: 'Recunoscut instantaneu în Home Assistant via Zigbee2MQTT / ZHA'
    },
    pinout_info: null,
    datasheet_url: 'https://www.zigbee2mqtt.io/',
    image_url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
    badge: 'Anti-Inundație Automat',
    tags: ['iot', 'smart-home', 'siguranta', 'vana-apa', 'zigbee', 'anti-inundatie', 'home-assistant'],
    rating: 4.94,
    review_count: 27,
    featured: false,
    compatible_with: ['sonoff-zigbee-3-0-usb-dongle-plus-e', 'home-assistant-yellow-hub-cm4-zigbee-matter-poe']
  },
  {
    slug: 'aqara-fp2-mmwave-radar-presence-sensor',
    name: 'Senzor Prezență Umană mmWave Aqara FP2 (Radar 60GHz Multi-Zone, Detecție Căderi & Lumină)',
    sku: 'AQARA-FP2-MMWAVE-SENSOR',
    mpn: 'PS-S02D',
    category_id: 3,
    subcategory: 'Smart Home & Senzori Prezență',
    price_ron: 389.99,
    old_price_ron: 439.99,
    stock: 14,
    stock_status: 'in_stock',
    short_desc: 'Senzor radar milimetric 60GHz cu cartografiere spațială: împarte camera în până la 30 de zone independente și detectează căderile persoanelor.',
    full_desc: 'Aqara FP2 revoluționează automatizările rezidențiale. Un singur senzor montat pe perete poate monitoriza o încăpere de 40 mp împărțită în zone separate (ex: zona patului, biroului, canapelei), aprinzând luminile doar acolo unde te afli și detectând prezența statică la nivel de respirație prin radar milimetric de 60GHz.',
    technical_specs: {
      radar_frequency: '60GHz mmWave radar cu lățime de bandă mare',
      detection_capabilities: 'Poziționare multi-persoană simultană (până la 5 persoane), până la 30 de zone configurabile, detecție căderi la sol',
      coverage_area: 'Până la 40 m² (unghi orizontal 120°, rază 8 metri)',
      connectivity: 'Wi-Fi 802.11 b/g/n 2.4GHz + Bluetooth 4.2',
      extra_sensors: 'Senzor de luminanță ambientală integrat (lux)',
      integrations: 'Apple HomeKit, Home Assistant (integrare locală HomeKit Controller), Google Home, Alexa',
      operating_voltage: '5V USB Type-C (cablu 2m inclus)'
    },
    pinout_info: null,
    datasheet_url: 'https://www.aqara.com/en/product/presence-sensor-fp2/',
    image_url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    badge: 'Multi-Zone mmWave 60G',
    tags: ['iot', 'smart-home', 'aqara', 'mmwave', 'prezenta', 'radar', 'homekit', 'home-assistant'],
    rating: 4.96,
    review_count: 33,
    featured: true,
    compatible_with: ['home-assistant-yellow-hub-cm4-zigbee-matter-poe']
  },
  {
    slug: 'cap-termostatic-inteligent-calorifer-zigbee-trv-pid',
    name: 'Cap Termostatic Inteligent pentru Calorifer Zigbee 3.0 (Ecran LED, Control PID, Home Assistant)',
    sku: 'SMARTHOME-TRV-ZIGBEE',
    mpn: 'TRV-ZB-01',
    category_id: 3,
    subcategory: 'Smart Home Climatizare',
    price_ron: 159.99,
    old_price_ron: 189.99,
    stock: 24,
    stock_status: 'in_stock',
    short_desc: 'Robinet termostatic inteligent cu motoraș silențios pas-cu-pas, ecran LED curbat rotativ, detectare geam deschis și reglaj fin PID.',
    full_desc: 'Optimizează încălzirea camerei cu o precizie de 0.5°C. Comunică direct prin Zigbee 3.0 cu Home Assistant, permițând calibrarea temperaturii din senzori externi de cameră, programe zilnice de confort și închiderea automată a caloriferului la deschiderea ferestrelor pentru o economie substanțială la facturile termice.',
    technical_specs: {
      communication: 'Zigbee 3.0 (compatibil 100% Zigbee2MQTT și ZHA)',
      valve_compatibility: 'Filet standard M30 x 1.5mm + include adaptoare Danfoss RA/RAV/RAVL, Caleffi și Giacomini',
      temperature_range: '5°C – 35°C (precizie setare 0.5°C)',
      features: 'Algoritm auto-adaptiv PID, funcție decalcifiere săptămânală valvă, protecție îngheț, blocare copii',
      power_supply: '2x Baterii AA 1.5V (Autonomie până la 1.5 ani)',
      linux_support: 'Expune complet setpoint, local temperature, pi_heating_demand în Home Assistant'
    },
    pinout_info: null,
    datasheet_url: 'https://www.zigbee2mqtt.io/',
    image_url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
    badge: 'Control Termic PID',
    tags: ['iot', 'smart-home', 'climatizare', 'termostat', 'trv', 'zigbee', 'calorifer', 'economie-energie'],
    rating: 4.88,
    review_count: 19,
    featured: false,
    compatible_with: ['sonoff-zigbee-3-0-usb-dongle-plus-e', 'home-assistant-yellow-hub-cm4-zigbee-matter-poe']
  },

    {
    slug: 'gateway-industrial-modbus-rtu-rs485-la-mqtt-ethernet-waveshare',
    name: 'Gateway Industrial Modbus RTU / RS485 la MQTT & Ethernet (Șină DIN, Izolare 2.5kV)',
    sku: 'WAVESHARE-MODBUS-MQTT-GW',
    mpn: 'WS-20162',
    category_id: 3,
    subcategory: 'Industrial IoT & Modbus',
    price_ron: 219.99,
    old_price_ron: 259.99,
    stock: 18,
    stock_status: 'in_stock',
    short_desc: 'Convertor profesional bidirecțional pe șină DIN: citește registre Modbus RTU de la contoare/invertoare și publică automat JSON pe MQTT prin Ethernet.',
    full_desc: 'Puntea de legătură ideală între echipamentele industriale grele (invertoare solare fotovoltaice Huawei/Growatt, contoare trifazate Eastron SDM, pompe industriale) și platformele moderne de date (Home Assistant, InfluxDB, Grafana, Node-RED). Convertește automat registrele într-un format curat JSON transmis securizat prin Ethernet către brokerul MQTT.',
    technical_specs: {
      processor: '32-bit ARM Cortex-M7 de înaltă frecvență',
      network: 'Ethernet 10/100M Auto-MDIX cu conector RJ45',
      serial_port: 'RS485 industrial cu izolare galvanică completă 2.5kV și protecție ESD 15kV',
      protocols: 'Modbus RTU la Modbus TCP, MQTT Client (suport autentificare și TLS), HTTP POST, TCP/UDP Server',
      mounting: 'Carcasă ignifugă montabilă pe șină DIN de 35mm',
      operating_voltage: '9V - 36V DC via terminal cu șurub industrial',
      linux_support: 'Compatibil cu orice broker MQTT (Mosquitto pe Linux, Home Assistant MQTT)'
    },
    pinout_info: null,
    datasheet_url: 'https://www.waveshare.com/wiki/RS485_TO_ETH_(B)',
    image_url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    badge: 'Izolare 2.5kV Modbus',
    tags: ['iot', 'industrial-iot', 'modbus', 'mqtt', 'rs485', 'ethernet', 'din-rail', 'solar-inverter'],
    rating: 4.96,
    review_count: 21,
    featured: true,
    compatible_with: ['senzor-calitate-aer-exterior-smart-city-pm-gaze-rs485-ip65']
  },
  {
    slug: 'senzor-industrial-umiditate-temperatura-sol-ec-npk-rs485-ip68',
    name: 'Senzor Industrial Umiditate, Temperatură și Conductivitate Sol (Soil Moisture / EC) RS485 Modbus',
    sku: 'AGRIIOT-SOIL-EC-TEMP-RS485',
    mpn: 'SOIL-EC-MODBUS-316L',
    category_id: 3,
    subcategory: 'AgriTech & Environmental IoT',
    price_ron: 199.99,
    old_price_ron: 239.99,
    stock: 20,
    stock_status: 'in_stock',
    short_desc: 'Sondă din oțel inoxidabil 316L cu rășină epoxidică IP68 pentru agricultură de precizie și irigații automate: măsoară umiditatea solului, temperatura și salinitatea.',
    full_desc: 'Proiectat pentru îngropare pe termen lung direct în sol, în sere, livezi sau gazon. Trei ace masive din inox 316L rezistente la coroziune măsoară dielectricul solului (umiditate volumetrică VWC 0-100%), conductivitatea electrică EC (salinitate și nivel de fertilizare) și temperatura, comunicând robust prin Modbus RS485 pe cabluri de până la 100 de metri.',
    technical_specs: {
      measured_parameters: 'Umiditate sol VWC (0 - 100%, acuratețe ±2%), Conductivitate electrică EC (0 - 20.000 µs/cm), Temperatură sol (-40°C la +80°C)',
      probe_material: '3 electrozi din oțel inoxidabil 316L de calitate medicală',
      protection: 'IP68 etanșat în rășină epoxidică neagră de înaltă densitate (rezistă la îngheț și îngrășăminte chimice)',
      interface: 'RS485 Modbus RTU standard (adrese și parametri configurabili)',
      operating_voltage: '4.5V - 30V DC (Consum redus: ~15mA)',
      cable_length: 'Cablu ecranat flexibil de 2.0 metri (extensibil)',
      linux_support: 'Biblioteci gata făcute Python Modbus / ESPHome pentru irigații automate'
    },
    pinout_info: null,
    datasheet_url: 'https://www.seeedstudio.com/',
    image_url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    badge: 'Inox 316L IP68',
    tags: ['iot', 'agritech', 'sol', 'umiditate-sol', 'ec-salinitate', 'modbus', 'rs485', 'irigatii'],
    rating: 4.93,
    review_count: 15,
    featured: false,
    compatible_with: ['gateway-industrial-modbus-rtu-rs485-la-mqtt-ethernet-waveshare']
  },
  {
    slug: 'statie-meteo-ultrasonica-7-in-1-modbus-rs485-sdi12',
    name: 'Stație Meteo Ultrasonică Industrială 7-în-1 (Vânt Ultrasonic, Direcție, Precipitații, Temp, Umid, Pres, Solar)',
    sku: 'SMARTCITY-WEATHER-7IN1',
    mpn: 'WTH-US7-MODBUS',
    category_id: 3,
    subcategory: 'Smart City & Mediu',
    price_ron: 1499.99,
    old_price_ron: 1699.99,
    stock: 5,
    stock_status: 'in_stock',
    short_desc: 'Stație meteo all-in-one fără piese în mișcare (anemometru ultrasonic), imună la uzură mecanică, cu ieșire Modbus RS485 pentru Smart City și parcuri fotovoltaice.',
    full_desc: 'Spre deosebire de stațiile meteo cu cupe mecanice care îngheață iarna sau se blochează din cauza păsărilor, această stație profesională măsoară viteza și direcția vântului prin diferența de timp a impulsurilor ultrasonice pe 4 axe. Integrează de asemenea senzor optic de ploaie, radiație solară globală, presiune barometrică, temperatură și umiditate.',
    technical_specs: {
      sensors_integrated: 'Viteză vânt ultrasonică (0-60 m/s), Direcție vânt (0-360°), Precipitații optice, Radiație solară (0-2000 W/m²), Presiune barometrică (300-1100 hPa), Temperatură (-40...+85°C), Umiditate relativă (0-100%)',
      measurement_principle: 'Tranzit ultrasonic (Fără piese în mișcare mecanică, zero mentenanță periodică)',
      interfaces: 'RS485 Modbus RTU + suport SDI-12 pentru data loggere hidrologice',
      operating_voltage: '12V - 24V DC',
      enclosure: 'Corp masiv din policarbonat cu protecție UV și încălzire internă anti-îngheț automată',
      linux_support: 'WeeWX Weather Software, Home Assistant, Node-RED nativ'
    },
    pinout_info: null,
    datasheet_url: 'https://weewx.com/',
    image_url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
    badge: 'Anemometru Ultrasonic',
    tags: ['iot', 'smart-city', 'statie-meteo', 'ultrasonic', 'vant', 'modbus', 'solar-energy', 'weewx'],
    rating: 4.98,
    review_count: 6,
    featured: true,
    compatible_with: ['gateway-industrial-modbus-rtu-rs485-la-mqtt-ethernet-waveshare']
  },
  {
    slug: 'tracker-gps-active-smart-city-lorawan-accelerometru-ip68',
    name: 'Tracker GPS/GLONASS Industrial de Active Smart City cu Rețea LoRaWAN (IP68, Baterie 5400mAh)',
    sku: 'SMARTCITY-GPS-ASSET-TRACKER',
    mpn: 'OYS-LORA-TRACK-IP68',
    category_id: 3,
    subcategory: 'Smart City & Logistică',
    price_ron: 299.99,
    old_price_ron: 349.99,
    stock: 16,
    stock_status: 'in_stock',
    short_desc: 'Dispozitiv de localizare prin satelit pentru containere de deșeuri municipale, utilaje și flote de biciclete: transmite poziția prin LoRaWAN fără cartelă GSM.',
    full_desc: 'Elimină abonamentele lunare GSM pentru monitorizarea flotelor și activelor orașului. Utilizează rețeaua gratuită sau privată LoRaWAN pentru a transmite coordonatele geografice precise. Accelerometrul 3D intern detectează mișcarea sau bascularea containerului de deșeuri, trezind dispozitivul din modul de somn adânc de ultra-redus consum.',
    technical_specs: {
      positioning: 'GNSS multi-constelație (GPS, GLONASS, Galileo, BeiDou) cu antenă internă ceramică de mare câștig',
      communication: 'LoRaWAN Class A (Banda EU868, adaptiv data rate ADR)',
      motion_sensor: 'Accelerometru 3 axe cu detecție mișcare, vibrații, răsturnare și alertă furt',
      battery: 'Baterie internă litiu Li-SOCl2 5400mAh (Până la 5 ani autonomie cu 2 fix-uri GPS pe zi)',
      enclosure: 'Carcasă ranforsată din fibră de sticlă și policarbonat, etanșeitate completă IP68 / IK08 antivandal',
      linux_support: 'Traccar GPS tracking server compatibil, decodoare TTN / ChirpStack'
    },
    pinout_info: null,
    datasheet_url: 'https://www.traccar.org/',
    image_url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
    badge: 'Zero Abonament GSM',
    tags: ['iot', 'smart-city', 'gps-tracker', 'lorawan', 'asset-tracking', 'flote', 'traccar'],
    rating: 4.92,
    review_count: 14,
    featured: false,
    compatible_with: ['rakwireless-rak7268v2-wisgate-edge-lite-2-lorawan-gateway']
  }
];

export async function addIoTSmartProducts() {
  console.log('Adding IoT products...');

  const existingSlugs = new Set(productsData.map(p => p.slug));
  const newItems = iotSmartProducts.filter(p => !existingSlugs.has(p.slug));

  const allUpdated = [...productsData, ...newItems];
  console.log(`Updated total products count: ${allUpdated.length} (Adding ${newItems.length} IoT items)`);

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
    console.log(`Successfully upserted ${newItems.length} Smart Home & Smart City IoT items into MySQL!`);
  } finally {
    conn.release();
  }
}

addIoTSmartProducts().then(() => {
  console.log('Done!');
  process.exit(0);
}).catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
