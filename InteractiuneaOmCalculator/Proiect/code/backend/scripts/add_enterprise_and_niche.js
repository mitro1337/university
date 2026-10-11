import mysql from 'mysql2/promise';

async function main() {
  const conn = await mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    database: 'homelab_ecommerce'
  });

  console.log('Connected to MySQL. Adding categories...');

    const categories = [
    {
      id: 5,
      slug: 'enterprise-hardware',
      name: 'Infrastructură Enterprise & Datacenter',
      icon: 'database',
      description: 'Servere rackmount 1U/2U, plăci de rețea 25G/40G/100G Mellanox, controllere SAS HBA IT-Mode ZFS, SSD-uri Enterprise U.2 PLP și unități PDU administrate.',
      sort_order: 5
    },
    {
      id: 6,
      slug: 'niche-hardware',
      name: 'Hardware Nișat & Cercetare / Lab',
      icon: 'terminal',
      description: 'Dispozitive Apple legacy (A10/A10X) pentru Linux & checkm8, SBC-uri RK3588, plăci RISC-V, kituri FPGA, unelte de reverse engineering, sonde JTAG/SWD și module Software Defined Radio (SDR).',
      sort_order: 6
    }
  ];

  for (const cat of categories) {
    await conn.query(`
      INSERT INTO categories (id, slug, name, icon, description, sort_order)
      VALUES (?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        name = VALUES(name),
        icon = VALUES(icon),
        description = VALUES(description),
        sort_order = VALUES(sort_order)
    `, [cat.id, cat.slug, cat.name, cat.icon, cat.description, cat.sort_order]);
  }
  console.log('Categories updated successfully.');

    const products = [
        {
      slug: 'server-rack-1u-supermicro-epyc-7302p',
      name: 'Server Rack 1U Supermicro SuperServer (AMD EPYC 7302P 16C/32T, 64GB DDR4 ECC, 4x 3.5" Hot-Swap)',
      sku: 'SRV-SM-EPYC16',
      mpn: 'SYS-1014S-WTRT',
      category_id: 5,
      subcategory: 'Servere Datacenter',
      price_ron: 5890.00,
      old_price_ron: 6250.00,
      stock: 6,
      stock_status: 'in_stock',
      short_desc: 'Platformă rackmount 1U enterprise optimizată pentru noduri de virtualizare Proxmox VE / Ceph, procesor 16-Core EPYC Milan/Rome, IPMI dedicat și surse 500W redundante.',
      full_desc: 'Supermicro SuperServer 1014S oferă o densitate remarcabilă de calcul pentru infrastructuri de cloud privat și homelaburi avansate. Echipat cu socket SP3 compatibil AMD EPYC 7002/7003, 8 sloturi DIMM cu suport memorie ECC Registered până la 2TB și 4 sertare frontale 3.5" SAS/SATA hot-swap. Include consolă IPMI 2.0 cu KVM over IP și HTML5 dedicat.',
      technical_specs: {
        processor: 'AMD EPYC 7302P 16 Nuclee / 32 Fire de execuție @ 3.0GHz (Boost 3.3GHz, 128MB L3 Cache)',
        ram: '64GB (2x 32GB) DDR4-3200MHz ECC Registered RDIMM (suport până la 2TB)',
        storage: '4x Baie 3.5"/2.5" Hot-Swap SAS/SATA + 2x slot M.2 NVMe PCIe 4.0 x4 pe placă',
        interfaces: ['2x 10GbE Base-T RJ45 (Intel X550-AT2)', '1x Port RJ45 IPMI dedicat', '2x USB 3.0 spate', '1x VGA', '1x PCIe 4.0 x16 Full-Height'],
        form_factor: '1U Rackmount 19" (adâncime 650 mm)',
        power_consumption: 'Surse redundante 2x 500W 80 PLUS Platinum (1+1)',
        operating_voltage: '100-240V AC 50/60Hz redundant'
      },
      pinout_info: null,
      datasheet_url: 'https://www.supermicro.com/en/products/system/1U/1014/SYS-1014S-WTRT.cfm',
      image_url: 'https://gomagcdn.ro/domains/robofun.ro/files/product/large/supermicro-superserver-1u-rackmount-amd-epyc-7302p-64gb-ecc-192830.jpg',
      badge: 'Enterprise Flagship',
      tags: ['Supermicro', 'AMD EPYC', '1U Server', 'ECC RAM', 'IPMI', 'Datacenter', 'Proxmox'],
      rating: 4.98,
      review_count: 14,
      featured: 1,
      compatible_with: ['mellanox-connectx-5-25gbe-sfp28', 'lsi-broadcom-sas-9300-8i-it-mode', 'kioxia-cd6-r-384tb-u2-nvme-ssd']
    },
    {
      slug: 'mellanox-connectx-5-25gbe-sfp28',
      name: 'Placă de Rețea Mellanox ConnectX-5 Dual-Port 25GbE SFP28 PCIe 3.0 x8 (MCX512A-ACAT)',
      sku: 'NIC-MLX-CX5-25G',
      mpn: 'MCX512A-ACAT',
      category_id: 5,
      subcategory: 'Rețelistică Datacenter',
      price_ron: 1190.00,
      old_price_ron: 1350.00,
      stock: 18,
      stock_status: 'in_stock',
      short_desc: 'Placă PCIe dual-port 25GbE SFP28 cu accelerare hardware RoCE v2 (RDMA over Converged Ethernet), transferuri cu latență sub-microsecundă și suport SR-IOV.',
      full_desc: 'NVIDIA Mellanox ConnectX-5 EN oferă o lățime de bandă cumulată de până la 50Gb/s și o rată de procesare de până la 75 de milioane de pachete pe secundă. Ideală pentru cluster Ceph, iSCSI/NVMe-oF cu viteză extremă și noduri de virtualizare Proxmox / Kubernetes.',
      technical_specs: {
        interfaces: ['2x Slot SFP28 25GbE (compatibil și cu module 10GbE SFP+)', 'Interfață PCIe 3.0 / 4.0 x8 (form factor Low Profile / Full Height)'],
        protocols: ['RoCE v2 RDMA', 'NVMe-oF', 'SR-IOV (până la 1024 Virtual Functions)', 'DPDK', 'VXLAN / NVGRE offload'],
        power_consumption: 'Consum mediu: 9.7W (răcire pasivă cu radiator server)',
        operating_voltage: '12V DC direct din slotul PCIe'
      },
      pinout_info: null,
      datasheet_url: 'https://network.nvidia.com/files/doc-resources/pb-connectx-5-en-card.pdf',
      image_url: 'https://gomagcdn.ro/domains/robofun.ro/files/product/large/mellanox-connectx-5-dual-port-25gbe-sfp28-pcie-mcx512a-acat-481920.jpg',
      badge: '25GbE RDMA',
      tags: ['Mellanox', 'ConnectX-5', '25GbE', 'SFP28', 'RDMA', 'RoCE', 'Ceph'],
      rating: 4.95,
      review_count: 28,
      featured: 1,
      compatible_with: ['server-rack-1u-supermicro-epyc-7302p', 'mikrotik-ccr2004-1g-12s-plus-2xs']
    },
    {
      slug: 'mellanox-connectx-4-100gbe-qsfp28',
      name: 'Placă de Rețea Mellanox ConnectX-4 Dual-Port 100GbE QSFP28 PCIe 3.0 x16 (MCX415A-CCAT)',
      sku: 'NIC-MLX-CX4-100G',
      mpn: 'MCX415A-CCAT',
      category_id: 5,
      subcategory: 'Rețelistică Datacenter',
      price_ron: 1850.00,
      old_price_ron: 2100.00,
      stock: 8,
      stock_status: 'in_stock',
      short_desc: 'Placă PCIe dual-port 100 Gigabit QSFP28 pentru backbone de storage SAN, noduri de calcul HPC și clustere AI de înaltă performanță.',
      full_desc: 'Mellanox ConnectX-4 permite conexiuni de 100Gb/s per port prin conectori QSFP28. Oferă offload hardware complet pentru protocoale de overlay (VXLAN, GENEVE) și suport nativ pentru kernel Linux, Proxmox VE, FreeBSD și ESXi.',
      technical_specs: {
        interfaces: ['2x Slot QSFP28 100GbE (suport cabluri DAC 100G, transceivere optice și breakout 4x25G)', 'Interfață PCIe 3.0 x16'],
        protocols: ['RoCE v2', 'GPUDirect RDMA', 'Overlay Networks Offloading', 'Overlay Gateway', 'DPDK'],
        power_consumption: 'Consum maxim: 18.2W'
      },
      pinout_info: null,
      datasheet_url: 'https://network.nvidia.com/files/doc-resources/pb-connectx-4-en-card.pdf',
      image_url: 'https://gomagcdn.ro/domains/robofun.ro/files/product/large/mellanox-connectx-4-dual-port-100gbe-qsfp28-pcie-mcx415a-ccat-718290.jpg',
      badge: '100GbE Backbone',
      tags: ['Mellanox', '100GbE', 'QSFP28', 'ConnectX-4', 'HPC', 'Datacenter'],
      rating: 4.90,
      review_count: 11,
      featured: 0,
      compatible_with: ['server-rack-1u-supermicro-epyc-7302p']
    },
    {
      slug: 'mikrotik-ccr2004-1g-12s-plus-2xs',
      name: 'Switch & Router MikroTik Cloud Core Router CCR2004-1G-12S+2XS (12x 10G SFP+, 2x 25G SFP28)',
      sku: 'NET-MTK-CCR2004',
      mpn: 'CCR2004-1G-12S+2XS',
      category_id: 5,
      subcategory: 'Rețelistică Datacenter',
      price_ron: 3190.00,
      old_price_ron: 3450.00,
      stock: 12,
      stock_status: 'in_stock',
      short_desc: 'Router enterprise montabil în rack 1U cu procesor quad-core Annapurna Labs Alpine v2, 12 sloturi 10G SFP+, 2 sloturi 25G SFP28 și alimentare duală redundantă.',
      full_desc: 'CCR2004-1G-12S+2XS este un router de mare densitate destinat rețelelor enterprise și furnizorilor de servicii. Fiecare port dispune de conexiune dedicată full-duplex fără bottleneck. Rulează sistemul RouterOS v7 cu licență Level 6 completă.',
      technical_specs: {
        processor: 'Annapurna Labs Alpine AL32400 Quad-Core ARMv8 64-bit @ 1.7GHz',
        ram: '4GB DDR4 RAM',
        interfaces: ['12x Slot SFP+ 10Gbps', '2x Slot SFP28 25Gbps', '1x Port Gigabit Ethernet RJ45', '1x Port serial de consolă RJ45'],
        form_factor: '1U Rackmount 19" (urechi de rack incluse)',
        power_consumption: 'Surse duale redundante interne AC 100-240V (consum maxim: 49W)'
      },
      pinout_info: null,
      datasheet_url: 'https://i.mt.lv/cdn/rb_files/CCR2004-1G-12S_2XS-200508125133.pdf',
      image_url: 'https://i.mt.lv/cdn/rb_images/1922_hi_res.png',
      badge: 'Datacenter Router',
      tags: ['MikroTik', 'CCR2004', '25G SFP28', '10G SFP+', 'RouterOS v7', 'BGP'],
      rating: 4.96,
      review_count: 22,
      featured: 1,
      compatible_with: ['mellanox-connectx-5-25gbe-sfp28', 'server-rack-1u-supermicro-epyc-7302p']
    },
    {
      slug: 'lsi-broadcom-sas-9300-8i-it-mode',
      name: 'Host Bus Adapter (HBA) LSI Broadcom SAS 9300-8i 12Gbps 8-Port PCIe 3.0 [Flashed IT Mode ZFS]',
      sku: 'HBA-LSI-9300-IT',
      mpn: '03-25600-01B',
      category_id: 5,
      subcategory: 'Storage Enterprise',
      price_ron: 649.00,
      old_price_ron: 720.00,
      stock: 15,
      stock_status: 'in_stock',
      short_desc: 'Controller SAS3 12Gb/s direct passthrough (Initiator Target Mode) cu firmware oficial Avago/Broadcom P16, esențial pentru TrueNAS SCALE, ZFS pools și unRAID.',
      full_desc: 'LSI SAS 9300-8i este standardul de aur în comunitatea ZFS și Homelab pentru atașarea directă a HDD-urilor și SSD-urilor fără strat intermediar RAID hardware. Echipat cu controllerul LSI SAS3008 Fusion-MPT 2.5 și 2 porturi interne mini-SAS HD SFF-8643, controlează până la 1024 de discuri non-RAID prin expandere SAS.',
      technical_specs: {
        processor: 'LSI SAS3008 Fusion-MPT 2.5 Controller',
        interfaces: ['2x Conectori interni Mini-SAS HD (SFF-8643)', 'Interfață PCIe 3.0 x8'],
        protocols: ['12Gb/s SAS-3', '6Gb/s SATA-III', 'IT Mode nativ (Direct Passthrough JBOD)'],
        power_consumption: 'Consum tipic: 13W'
      },
      pinout_info: null,
      datasheet_url: 'https://docs.broadcom.com/doc/12353331',
      image_url: 'https://gomagcdn.ro/domains/robofun.ro/files/product/large/lsi-broadcom-sas-9300-8i-12gbps-8-port-hba-it-mode-zfs-819203.jpg',
      badge: 'ZFS Passthrough',
      tags: ['LSI', 'Broadcom', 'HBA', 'IT Mode', 'ZFS', 'TrueNAS', 'SAS3'],
      rating: 4.97,
      review_count: 36,
      featured: 1,
      compatible_with: ['server-rack-1u-supermicro-epyc-7302p']
    },
    {
      slug: 'kioxia-cd6-r-384tb-u2-nvme-ssd',
      name: 'SSD Enterprise Kioxia CD6-R 3.84TB U.2 NVMe PCIe 4.0 x4 (KCD61RUL3T84, 1 DWPD, Power Loss Protection)',
      sku: 'SSD-KIO-3840-U2',
      mpn: 'KCD61RUL3T84',
      category_id: 5,
      subcategory: 'Storage Enterprise',
      price_ron: 2290.00,
      old_price_ron: 2500.00,
      stock: 10,
      stock_status: 'in_stock',
      short_desc: 'SSD NVMe U.2 enterprise de clasă datacenter cu condensatori hardware de protecție la căderea tensiunii (PLP), latență constantă deterministă și anduranță 1 DWPD.',
      full_desc: 'Kioxia CD6-R oferă performanțe de transfer de până la 6.200 MB/s la citire și 1.000.000 IOPS aleatorii. Condensatorii fizici integrati garantează salvarea cache-ului DRAM pe flash NAND în fracțiuni de secundă în caz de pană bruscă de curent, eliminând coruperea bazelor de date și a pool-urilor ZFS.',
      technical_specs: {
        storage: 'Capacitate: 3.84TB 3D BiCS FLASH TLC',
        interfaces: ['U.2 (SFF-8639) PCIe 4.0 x4, compatibil NVMe 1.4'],
        performance: 'Citire secvențială: 6.200 MB/s | Scriere: 4.000 MB/s | IOPS citire 4K: 1.000.000',
        endurance: '1 DWPD (Drive Writes Per Day) timp de 5 ani (peste 7.000 TBW)',
        form_factor: '2.5 inch, grosime 15mm'
      },
      pinout_info: null,
      datasheet_url: 'https://business.kioxia.com/en-jp/buy/cd6-r-series.html',
      image_url: 'https://gomagcdn.ro/domains/robofun.ro/files/product/large/kioxia-cd6-r-3-84tb-u2-nvme-pcie-4-datacenter-ssd-plp-319204.jpg',
      badge: 'Enterprise PLP',
      tags: ['Kioxia', 'U.2 NVMe', 'Datacenter SSD', 'PLP', 'PCIe 4.0', 'ZFS'],
      rating: 4.92,
      review_count: 9,
      featured: 0,
      compatible_with: ['server-rack-1u-supermicro-epyc-7302p']
    },
    {
      slug: 'eaton-epdu-g3-managed-16a',
      name: 'PDU Rackmount Administrat Eaton ePDU G3 Managed 16A (8x C13 + 2x C19, Monitorizare per Priză)',
      sku: 'PDU-EAT-G3-M16',
      mpn: 'EMAB04',
      category_id: 5,
      subcategory: 'Alimentare & PDU',
      price_ron: 1680.00,
      old_price_ron: 1850.00,
      stock: 7,
      stock_status: 'in_stock',
      short_desc: 'Unitate inteligentă de distribuție a energiei electrice pentru rack de servere cu măsurare precisă clasa 1 (±1%) și pornire/oprire la distanță pentru fiecare priză via SNMP v3 / Web.',
      full_desc: 'Eaton ePDU G3 Managed oferă control absolut asupra alimentării echipamentelor din rack. Permite reboot la distanță al nodurilor blocate, secvențiere de pornire pentru a preveni căderea disjunctoarelor din cauza curenților de pornire (inrush current) și alertare prin e-mail/SNMP.',
      technical_specs: {
        interfaces: ['8x Priză IEC-320-C13 securizate cu blocator mecanic', '2x Priză IEC-320-C19', '1x Port RJ45 Gigabit Ethernet de management', '1x Port senzor de temperatură/umiditate'],
        operating_voltage: '200-240V AC 50/60Hz (curent nominal 16A, conector IEC 60309 sau C20)',
        form_factor: 'Montabil 1U orizontal sau 0U vertical în rack 19"'
      },
      pinout_info: null,
      datasheet_url: 'https://www.eaton.com/content/dam/eaton/products/backup-power-ups-surge-it-power-distribution/it-power-distribution/eaton-epdu-g3-managed-brochure.pdf',
      image_url: 'https://gomagcdn.ro/domains/robofun.ro/files/product/large/eaton-epdu-g3-managed-16a-0u-1u-c13-c19-snmp-910284.jpg',
      badge: 'Smart PDU',
      tags: ['Eaton', 'ePDU', 'Managed PDU', 'SNMP', 'Rack 19inch', 'Datacenter'],
      rating: 4.89,
      review_count: 8,
      featured: 0,
      compatible_with: ['server-rack-1u-supermicro-epyc-7302p', 'mikrotik-ccr2004-1g-12s-plus-2xs']
    },
    {
      slug: 'raritan-dominion-kx-iii-8-port-kvm-ip',
      name: 'Consolă KVM over IP Raritan Dominion KX III (8 Porturi Server Cat5, Acces BIOS Web HTML5)',
      sku: 'KVM-RAR-KX3-8',
      mpn: 'DKX3-108',
      category_id: 5,
      subcategory: 'Management Datacenter',
      price_ron: 3850.00,
      old_price_ron: 4200.00,
      stock: 4,
      stock_status: 'in_stock',
      short_desc: 'Switch KVM IP enterprise de nivel militar pentru administrare out-of-band la nivel de BIOS cu client web 100% HTML5 fără Java, streaming 1080p la 30fps și suport Virtual Media.',
      full_desc: 'Raritan Dominion KX III este utilizat în centrele de date pentru acces out-of-band complet la servere chiar și atunci când sistemul de operare nu pornește sau placa de rețea nu are drivere. Permite maparea unui fișier ISO de pe laptopul tehnicianului direct în server ca unitate optică virtuală pentru instalare de la distanță.',
      technical_specs: {
        interfaces: ['8x Porturi RJ45 pentru dongle-uri CIM Cat5 (VGA/USB/HDMI)', '2x Porturi Gigabit Ethernet redundante (failover)', '1x Port modem out-of-band', 'Alimentare duală AC'],
        performance: 'Video digital 1920x1080 @ 30fps cu compresie hardware DVI/VGA',
        form_factor: '1U Rackmount 19"'
      },
      pinout_info: null,
      datasheet_url: 'https://www.raritan.com/products/kvm-serial-consoles/kvm-over-ip-switches/dominion-kx-iii',
      image_url: 'https://gomagcdn.ro/domains/robofun.ro/files/product/large/raritan-dominion-kx-iii-8-port-kvm-over-ip-html5-bios-619283.jpg',
      badge: 'Out-of-Band',
      tags: ['Raritan', 'KVM over IP', 'Dominion KX', 'Out-of-Band', 'Datacenter', 'HTML5'],
      rating: 4.94,
      review_count: 6,
      featured: 0,
      compatible_with: ['server-rack-1u-supermicro-epyc-7302p']
    },

            {
      slug: 'apple-iphone-7-a10-fusion-linux-dev-node',
      name: 'Apple iPhone 7 (A10 Fusion) 32GB Black [Ready for Linux / checkm8 / postmarketOS]',
      sku: 'DEV-APL-IP7-A10',
      mpn: 'A1778-LINUX-DEV',
      category_id: 6,
      subcategory: 'Apple Linux (A10)',
      price_ron: 389.00,
      old_price_ron: 440.00,
      stock: 14,
      stock_status: 'in_stock',
      short_desc: 'Dispozitiv A10 Fusion cu bootrom exploatabil permanent prin checkm8, testat pentru Project Sandcastle, postmarketOS și bootare directă de kernel Linux mainline 6.x.',
      full_desc: 'Datorită vulnerabilității iremediabile din BootROM (checkm8), cipul Apple A10 Fusion (4-core, 2 Hurricane + 2 Zephyr) reprezintă o platformă remarcabilă și ultra-eficientă pentru rularea sistemelor Linux pe arhitectură ARM64. Dispozitivul este recondiționat, cu ecran 4.7" Retina intact, baterie verificată (>85% capacitate) și port Lightning cu mod DFU complet operațional.',
      technical_specs: {
        processor: 'Apple A10 Fusion Quad-Core 64-bit ARMv8 @ 2.34GHz',
        ram: '2GB LPDDR4',
        storage: '32GB NVMe intern (partiționabil pentru rădăcină Linux)',
        interfaces: ['Port Lightning cu suport serial UART via cablu DCSD / conector special', 'Wi-Fi 802.11ac dual-band', 'Bluetooth 4.2'],
        display: '4.7" IPS Retina 1334x750',
        operating_voltage: 'Alimentare 5V 1A Lightning sau baterie internă Li-Ion 1960 mAh'
      },
      pinout_info: {
        total_pins: 8,
        logic_level: '3.3V UART (via accesorii debug)',
        pin_map: [
          { pin: 'Pin 1', name: 'GND', function: 'Masă electrică' },
          { pin: 'Pin 2', name: 'L0p (DP)', function: 'USB D+ / UART TX (în mod debug serial)' },
          { pin: 'Pin 3', name: 'L0n (DM)', function: 'USB D- / UART RX (în mod debug serial)' },
          { pin: 'Pin 4', name: 'ID0', function: 'Detecție accesoriu' },
          { pin: 'Pin 5', name: 'PWR', function: 'Alimentare 5V DC' }
        ],
        wiring_notes: [
          'Pentru activarea consolei seriale UART este recomandat un cablu DCSD Alex sau sonde hardware de tip Tigard.',
          'Pornirea Linux se realizează din modul DFU rulând `checkra1n -c` sau payload-ul custom `pongoOS` cu argumente de boot `boot-args="console=tty0"`.',
          'Suportă distribuția postmarketOS cu interfață Phosh sau Alpine Linux minimal headless.'
        ]
      },
      datasheet_url: 'https://postmarketos.org/wiki/apple-iphone-7',
      image_url: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=600&auto=format&fit=crop&q=80',
      badge: 'checkm8 Ready',
      tags: ['Apple', 'iPhone 7', 'A10 Fusion', 'checkm8', 'postmarketOS', 'Linux ARM64', 'OS Dev'],
      rating: 4.88,
      review_count: 19,
      featured: 1,
      compatible_with: ['tigard-multi-protocol-hardware-debug-probe', 'black-magic-probe-v2-3-swd-jtag']
    },
    {
      slug: 'apple-ipad-6th-gen-a10-linux-workstation',
      name: 'Apple iPad 6th Gen 9.7" (A10 Fusion, 2GB RAM) [checkm8 Linux Node / USB Host]',
      sku: 'DEV-APL-IPAD6-A10',
      mpn: 'A1893-DEV',
      category_id: 6,
      subcategory: 'Apple Linux (A10)',
      price_ron: 649.00,
      old_price_ron: 720.00,
      stock: 9,
      stock_status: 'in_stock',
      short_desc: 'Platformă de dezvoltare A10 Fusion cu ecran generos 9.7" Retina 2048x1536, compatibilă checkm8, capabilă de mod USB Host (tastatură/mouse/Ethernet) sub kernel Linux.',
      full_desc: 'iPad 6 (2018) este ultimul model de iPad cu ecran clasic și buton Home ce conține procesorul A10 vulnerabil prin checkm8. Cu adaptorul Lightning to USB 3 Camera Adapter, oferă port USB-A host complet sub Linux pentru tastaturi fizice, adaptoare Gigabit Ethernet și stick-uri de memorie.',
      technical_specs: {
        processor: 'Apple A10 Fusion Quad-Core 64-bit @ 2.34GHz',
        ram: '2GB LPDDR4 SDRAM',
        storage: '32GB NVMe intern',
        display: '9.7" Retina IPS 2048x1536 (264 ppi)',
        connectivity: 'Wi-Fi 802.11a/b/g/n/ac dual band (2.4GHz + 5GHz), Bluetooth 4.2'
      },
      pinout_info: null,
      datasheet_url: 'https://wiki.postmarketos.org/wiki/Apple_iPad_6th_generation_(apple-ipad6)',
      image_url: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&auto=format&fit=crop&q=80',
      badge: 'Linux Tablet',
      tags: ['Apple', 'iPad 6', 'A10 Fusion', 'checkm8', 'Linux', 'postmarketOS'],
      rating: 4.91,
      review_count: 12,
      featured: 0,
      compatible_with: ['apple-iphone-7-a10-fusion-linux-dev-node']
    },
    {
      slug: 'apple-ipad-pro-105-a10x-fusion-6-core',
      name: 'Apple iPad Pro 10.5" (A10X Fusion 6-Core, 4GB RAM) [checkm8 A10X High-Perf Linux]',
      sku: 'DEV-APL-IPRO-A10X',
      mpn: 'A1701-A10X-DEV',
      category_id: 6,
      subcategory: 'Apple Linux (A10X)',
      price_ron: 890.00,
      old_price_ron: 990.00,
      stock: 6,
      stock_status: 'in_stock',
      short_desc: 'Sistem de calcul de înaltă performanță A10X Fusion 6-Core (3 Hurricane + 3 Zephyr, 12-core GPU), 4GB LPDDR4 și ecran ProMotion 120Hz cu suport bootrom checkm8.',
      full_desc: 'Subcategoria A10X reprezintă apogeul puterii de calcul exploatabile prin checkm8 fără semnături Apple. Cu 4GB RAM LPDDR4 și 6 nuclee active, iPad Pro 10.5 oferă dublul performanței lui A10 simplu, permițând compilarea nativă de pachete Debian/Alpine direct pe dispozitiv.',
      technical_specs: {
        processor: 'Apple A10X Fusion 6-Core (3 nuclee performanță Hurricane + 3 eficiență Zephyr) @ 2.38GHz',
        ram: '4GB LPDDR4 RAM',
        storage: '64GB NVMe Flash',
        display: '10.5" True Tone ProMotion 120Hz (2224x1668)',
        interfaces: ['Port Lightning (USB 3.0 Host capabil)', 'Smart Connector lateral (3 pini)']
      },
      pinout_info: null,
      datasheet_url: 'https://wiki.postmarketos.org/wiki/Apple_iPad_Pro_10.5-inch_(apple-ipad7)',
      image_url: 'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=600&auto=format&fit=crop&q=80',
      badge: 'A10X 6-Core Flagship',
      tags: ['Apple', 'A10X Fusion', 'iPad Pro', 'checkm8', 'Linux ARM64', '120Hz'],
      rating: 4.97,
      review_count: 8,
      featured: 1,
      compatible_with: ['apple-iphone-7-a10-fusion-linux-dev-node']
    },

        {
      slug: 'orange-pi-5-plus-16gb-rk3588',
      name: 'Orange Pi 5 Plus 16GB RAM (Rockchip RK3588 8-Core, 2x 2.5GbE, NPU 6 TOPS)',
      sku: 'SBC-OPI-5P-16G',
      mpn: 'OPI-5PLUS-16GB',
      category_id: 6,
      subcategory: 'SBC Speciale',
      price_ron: 749.00,
      old_price_ron: 799.00,
      stock: 16,
      stock_status: 'in_stock',
      short_desc: 'SBC de performanță extremă cu SoC octa-core Rockchip RK3588 (4x A76 + 4x A55), 16GB RAM, 2 porturi 2.5GbE LAN, 2 ieșiri HDMI 8K și slot M.2 NVMe PCIe 3.0 x4.',
      full_desc: 'Orange Pi 5 Plus depășește orice SBC convențional prin conectivitatea sa abundentă: două porturi Ethernet 2.5G Realtek RTL8125BG, slot M.2 M-Key pentru SSD NVMe 2280 la viteze de până la 2000 MB/s, slot M.2 E-Key pentru card Wi-Fi 6E, intrare HDMI Rx 4K și NPU integrat de 6 TOPS pentru inteligență artificială locală.',
      technical_specs: {
        processor: 'Rockchip RK3588 Octa-core 64-bit (4x Cortex-A76 @ 2.4GHz + 4x Cortex-A55 @ 1.8GHz)',
        ram: '16GB LPDDR4/4x 2133MHz',
        npu: '6 TOPS NPU integrat (INT4/INT8/INT16/FP16)',
        interfaces: ['2x 2.5GbE RJ45', '2x HDMI 2.1 Out (8K60p)', '1x HDMI 2.0 In (4K60p)', '1x M.2 M-Key PCIe 3.0 x4 2280', '1x M.2 E-Key PCIe 2.0', '2x USB 3.0', '2x USB 2.0', '1x USB-C DisplayPort', '40-Pin GPIO'],
        operating_voltage: '5V DC via USB-C (recomandat 5V/4A sau sursă PD)'
      },
      pinout_info: {
        total_pins: 40,
        gpio_count: 28,
        logic_level: '3.3V LVCMOS',
        wiring_notes: ['Compatibil cu distribuțiile Ubuntu 22.04/24.04, Debian 12 și Armbian cu kernel mainline 6.x.']
      },
      datasheet_url: 'http://www.orangepi.org/html/hardWare/computerAndMicrocontrollers/details/Orange-Pi-5-Plus.html',
      image_url: 'https://gomagcdn.ro/domains/robofun.ro/files/product/large/orange-pi-5-plus-16gb-rockchip-rk3588-8-core-921443.jpg',
      badge: 'Dual 2.5G & 8K',
      tags: ['Orange Pi', 'RK3588', 'SBC', '2.5GbE', 'NPU', 'PCIe 3.0', 'Armbian'],
      rating: 4.94,
      review_count: 23,
      featured: 1,
      compatible_with: ['google-coral-usb-accelerator-edge-tpu', 'hailo-8-m2-ai-acceleration-module']
    },
    {
      slug: 'radxa-rock-5b-8gb-rk3588',
      name: 'Radxa Rock 5B 8GB RAM (Rockchip RK3588, Dual 8K HDMI, 2.5GbE, M.2 M-Key)',
      sku: 'SBC-RDX-R5B-8G',
      mpn: 'ROCK-5B-8GB',
      category_id: 6,
      subcategory: 'SBC Speciale',
      price_ron: 689.00,
      old_price_ron: 749.00,
      stock: 11,
      stock_status: 'in_stock',
      short_desc: 'Placă de calcul cu arhitectură ARM64 RK3588, factor de formă Pico-ITX, slot M.2 NVMe cu 4 benzi PCIe 3.0 și suport excelent pentru virtualizare KVM și containere Docker.',
      full_desc: 'Radxa Rock 5B este unul dintre cele mai robuste SBC-uri industriale bazate pe RK3588. Suportă memorie eMMC 5.1 modulară, alimentare USB-PD 9V-20V, butoane hardware Power/Recovery/Maskrom și conector dedicat de baterie RTC.',
      technical_specs: {
        processor: 'Rockchip RK3588 Octa-core @ 2.4GHz + GPU Mali G610 MP4',
        ram: '8GB LPDDR4x 64-bit',
        interfaces: ['1x 2.5GbE RJ45 cu suport PoE', '2x HDMI Out 8K60p + 1x HDMI In 4K', 'M.2 M-Key 2280 PCIe 3.0 x4', '4x USB (2x 3.0, 2x 2.0)', '40-Pin GPIO'],
        operating_voltage: 'USB Type-C PD 2.0 (9V/2A, 12V/2A, 15V/2A, 20V/2A)'
      },
      pinout_info: null,
      datasheet_url: 'https://docs.radxa.com/rock5/rock5b',
      image_url: 'https://gomagcdn.ro/domains/robofun.ro/files/product/large/radxa-rock-5b-8gb-rk3588-812391.jpg',
      badge: 'Pico-ITX ARM',
      tags: ['Radxa', 'Rock 5B', 'RK3588', 'SBC ARM', '8K', 'USB-PD'],
      rating: 4.90,
      review_count: 15,
      featured: 0,
      compatible_with: ['orange-pi-5-plus-16gb-rk3588']
    },
    {
      slug: 'khadas-vim4-8gb-lpddr4x-sbc',
      name: 'Khadas VIM4 8GB LPDDR4X (Amlogic A311D2, Wi-Fi 6, Gigabit, HDMI In 4K)',
      sku: 'SBC-KHD-VIM4-8G',
      mpn: 'KVIM4-8GB',
      category_id: 6,
      subcategory: 'SBC Speciale',
      price_ron: 889.00,
      old_price_ron: 950.00,
      stock: 8,
      stock_status: 'in_stock',
      short_desc: 'SBC compact de calitate premium cu procesor octa-core Amlogic A311D2 (4x A73 + 4x A53), port dedicat Micro-HDMI Input 4K, Wi-Fi 6 MIMO și sistem de operare OOWOW integrat.',
      full_desc: 'Khadas VIM4 se remarcă prin sistemul inovator OOWOW, care permite instalarea oricărei distribuții Linux direct din cloud fără a scrie un card microSD pe calculator. Ideal pentru procesare video în timp real, digital signage și noduri multimedia IoT.',
      technical_specs: {
        processor: 'Amlogic A311D2 Octa-Core (4x Cortex-A73 @ 2.2GHz + 4x Cortex-A53 @ 2.0GHz)',
        ram: '8GB LPDDR4X @ 2112MHz',
        storage: '32GB eMMC 5.1 Flash integrat pe placă',
        interfaces: ['1x HDMI 2.1 Out (4K60p)', '1x Micro-HDMI In (4K30p)', '1x Gigabit Ethernet RJ45', 'Wi-Fi 6 (AP6275S 2T2R)', 'Bluetooth 5.3', '40-Pin GPIO']
      },
      pinout_info: null,
      datasheet_url: 'https://docs.khadas.com/products/sbc/vim4/start',
      image_url: 'https://gomagcdn.ro/domains/robofun.ro/files/product/large/khadas-vim4-active-cooling-kit-amlogic-a311d2-941012.jpg',
      badge: 'HDMI In & Wi-Fi 6',
      tags: ['Khadas', 'VIM4', 'Amlogic', 'HDMI In', 'Wi-Fi 6', 'OOWOW'],
      rating: 4.88,
      review_count: 7,
      featured: 0,
      compatible_with: ['orange-pi-5-plus-16gb-rk3588']
    },

        {
      slug: 'starfive-visionfive-2-risc-v-sbc-8gb',
      name: 'StarFive VisionFive 2 (Quad-Core RISC-V JH7110, 8GB RAM, 2x Gigabit Ethernet)',
      sku: 'SBC-STF-VF2-8G',
      mpn: 'VF7110-8GB',
      category_id: 6,
      subcategory: 'Hardware RISC-V',
      price_ron: 489.00,
      old_price_ron: 539.00,
      stock: 17,
      stock_status: 'in_stock',
      short_desc: 'Primul SBC RISC-V accesibil de înaltă performanță cu procesor StarFive JH7110 Quad-Core 64-bit RV64GC @ 1.5GHz, GPU 3D Imagination BXE-4-32 și slot M.2 NVMe.',
      full_desc: 'VisionFive 2 aduce arhitectura RISC-V cu set complet de instrucțiuni deschise (RV64GC) în lumea desktop și homelab. Dispune de suport complet pentru Debian, Arch Linux RISC-V, Fedora și FreeBSD. Este echipat cu slot M.2 NVMe PCIe 2.0 x1, ieșire HDMI 4K30p, interfețe MIPI DSI/CSI și pini GPIO compatibili 40-pin Raspberry Pi.',
      technical_specs: {
        processor: 'StarFive JH7110 Quad-Core 64-bit RISC-V RV64GC @ 1.5GHz (2MB L2 Cache)',
        ram: '8GB LPDDR4 SDRAM',
        storage: 'Slot MicroSD, flash QSPI NOR 16MB pentru bootloader U-Boot, slot M.2 M-Key PCIe 2.0 x1',
        interfaces: ['2x Gigabit Ethernet RJ45 (YT8531C)', '1x HDMI 2.0 (4K30p)', '4x USB 3.0', '40-Pin GPIO'],
        operating_voltage: '5V DC via USB-C (recomandat 3A+)'
      },
      pinout_info: {
        total_pins: 40,
        gpio_count: 28,
        logic_level: '3.3V LVCMOS',
        pin_map: [
          { pin: 'Pin 8', name: 'UART TX', function: 'Consolă serială RISC-V (115200 baud)' },
          { pin: 'Pin 10', name: 'UART RX', function: 'Consolă serială RISC-V (115200 baud)' },
          { pin: 'Pin 6', name: 'GND', function: 'Masă' }
        ],
        wiring_notes: ['Pentru depanarea bootloader-ului U-Boot și a kernelului Linux este recomandat un adaptor USB-UART conectat la pinii 8 și 10.']
      },
      datasheet_url: 'https://doc-en.rvspace.org/VisionFive2/PDF/VisionFive2_Datasheet.pdf',
      image_url: 'https://gomagcdn.ro/domains/robofun.ro/files/product/large/starfive-visionfive-2-risc-v-sbc-8gb-ram-819203.jpg',
      badge: 'Pure RISC-V 64',
      tags: ['RISC-V', 'StarFive', 'VisionFive 2', 'RV64GC', 'Open Source ISA', 'Debian'],
      rating: 4.89,
      review_count: 21,
      featured: 1,
      compatible_with: ['milkv-duo-risc-v-64mb-sbc', 'tigard-multi-protocol-hardware-debug-probe']
    },
    {
      slug: 'milkv-duo-risc-v-64mb-sbc',
      name: 'Milk-V Duo 64MB RISC-V SBC (CV1800B Dual RV64 @ 1GHz, Linux Ready)',
      sku: 'SBC-MLK-DUO-64',
      mpn: 'MILKV-DUO-64MB',
      category_id: 6,
      subcategory: 'Hardware RISC-V',
      price_ron: 59.00,
      old_price_ron: 69.00,
      stock: 45,
      stock_status: 'in_stock',
      short_desc: 'Micro-calculator RISC-V ultra-accesibil cu cip Sophgo CV1800B Dual-Core 64-bit @ 1GHz, capabil să booteze Linux complet în mai puțin de 2 secunde la un consum sub 1W.',
      full_desc: 'Milk-V Duo are dimensiunea unei plăci Raspberry Pi Pico, însă rulează o distribuție Linux completă cu conexiune Ethernet-over-USB RNDIS. Dispune de un al doilea nucleu RISC-V dedicat sarcinilor de timp real (FreeRTOS) și un accelerator TPU integrat de 0.5 TOPS.',
      technical_specs: {
        processor: 'Sophgo CV1800B Dual RV64 (1GHz nucleu primar Linux + 700MHz nucleu secundar RTOS)',
        ram: '64MB SIP DRAM integrat',
        storage: 'Slot MicroSD pentru sistem de fișiere rootfs',
        interfaces: ['USB Type-C (alimentare + conexiune rețea virtuală RNDIS)', 'Conector 10/100M Ethernet via pini', 'Camera CSI 16-pin MIPI', '26x Pini I/O multifuncționali'],
        operating_voltage: '5V DC via USB-C'
      },
      pinout_info: {
        total_pins: 40,
        logic_level: '3.3V',
        wiring_notes: ['Bootează direct din MicroSD. La conectare prin cablu USB-C, calculatorul recunoaște un port de rețea USB prin care vă conectați via SSH pe 192.168.42.1.']
      },
      datasheet_url: 'https://milkv.io/docs/duo/overview',
      image_url: 'https://gomagcdn.ro/domains/robofun.ro/files/product/large/milkv-duo-cv1800b-risc-v-micro-sbc-64mb-718293.jpg',
      badge: 'Linux sub 60 lei',
      tags: ['Milk-V', 'RISC-V', 'Linux', 'Micro-SBC', 'Sophgo', 'IoT'],
      rating: 4.87,
      review_count: 31,
      featured: 0,
      compatible_with: ['starfive-visionfive-2-risc-v-sbc-8gb']
    },

        {
      slug: 'sipeed-tang-primer-20k-fpga-kit',
      name: 'Sipeed Tang Primer 20K FPGA Kit (Gowin GW2A-LV18PG256C8, 20K LUT, Core + Dock)',
      sku: 'DEV-FPG-TANG-20K',
      mpn: 'TANG-PRIMER-20K-KIT',
      category_id: 6,
      subcategory: 'FPGA & Reconfigurable',
      price_ron: 349.00,
      old_price_ron: 389.00,
      stock: 18,
      stock_status: 'in_stock',
      short_desc: 'Kit FPGA versatil cu 20.736 elemente logice (LUT4), 128MB DDR3 onboard, ieșire video HDMI, slot PMOD și USB-JTAG integrat: creează propriul tău procesor RISC-V de la zero.',
      full_desc: 'Tang Primer 20K este platforma perfectă pentru pasionații de arhitectură de calculatoare (Computer Architecture), sinteză Verilog/VHDL și rularea de core-uri deschise precum NEORV32, PicoRV32 sau acceleratoare neurale. Include modulul central SODIMM și placa suport Primer Dock cu ieșire HDMI, conector de cameră DVP și interfețe PMOD.',
      technical_specs: {
        processor: 'Gowin GW2A-LV18PG256C8 FPGA (20.736 LUT4, 15.552 Flip-Flop, 828Kbit Block RAM, 48 multiplicatoare DSP 18x18)',
        ram: '128MB (1Gbit) DDR3 SDRAM @ 800Mbps',
        interfaces: ['Port HDMI digital', 'Slot card MicroSD', 'USB-C JTAG/UART programmer', '4x Conectori PMOD industriali', 'Slot cameră DVP'],
        operating_voltage: '5V DC via USB-C'
      },
      pinout_info: {
        total_pins: 48,
        logic_level: '3.3V comutabil (PMOD I/O)',
        wiring_notes: ['Programabil prin suita oficială Gowin EDA sau uneltele open-source Yosys + nextpnr (Apycula project).']
      },
      datasheet_url: 'https://wiki.sipeed.com/hardware/en/tang/tang-primer-20k/primer-20k.html',
      image_url: 'https://gomagcdn.ro/domains/robofun.ro/files/product/large/sipeed-tang-primer-20k-gowin-fpga-dock-kit-519284.jpg',
      badge: 'Build Your Own CPU',
      tags: ['FPGA', 'Gowin', 'Sipeed', 'Tang Primer', 'Build Your CPU', 'Verilog', 'RISC-V'],
      rating: 4.95,
      review_count: 17,
      featured: 1,
      compatible_with: ['digilent-pynq-z2-xilinx-zynq-board', 'tigard-multi-protocol-hardware-debug-probe']
    },
    {
      slug: 'digilent-pynq-z2-xilinx-zynq-board',
      name: 'Digilent PYNQ-Z2 Development Board (Xilinx Zynq-7000 SoC Dual ARM + FPGA Fabric)',
      sku: 'DEV-FPG-PYNQ-Z2',
      mpn: '410-379',
      category_id: 6,
      subcategory: 'FPGA & Reconfigurable',
      price_ron: 1190.00,
      old_price_ron: 1290.00,
      stock: 7,
      stock_status: 'in_stock',
      short_desc: 'Platformă de calcul reconfigurabil hibrid cu procesor dual-core ARM Cortex-A9 și matrice FPGA Xilinx Artix-7, programabilă direct în limbajul Python prin Jupyter Notebooks.',
      full_desc: 'PYNQ-Z2 revoluționează dezvoltarea pe FPGA prin combinarea vitezei hardware cu flexibilitatea Python. Suprafața FPGA găzduiește overlay-uri hardware accelerate (procesare semnal audio, procesare imagine HDMI 1080p, filtre convoluționale), controlate prin librării Python native fără recompilare continuă de bitstream-uri.',
      technical_specs: {
        processor: 'Xilinx Zynq-7000 (XC7Z020-1CLG400C): Dual ARM Cortex-A9 @ 650MHz + Matrice Artix-7 (13.300 slice-uri logice, 53.200 LUT, 220 multiplicatoare DSP)',
        ram: '512MB DDR3 @ 1050Mbps',
        storage: 'Slot MicroSD, 16MB Quad-SPI Flash',
        interfaces: ['HDMI In & HDMI Out 1080p', 'Gigabit Ethernet RJ45', 'USB 2.0 Host', 'Conectori Arduino Shield & Raspberry Pi Header', '2x Conectori Pmod'],
        operating_voltage: '7V - 15V DC via mufă jack sau 5V USB'
      },
      pinout_info: null,
      datasheet_url: 'https://digilent.com/reference/programmable-logic/pynq-z2/reference-manual',
      image_url: 'https://gomagcdn.ro/domains/robofun.ro/files/product/large/pynq-z2-xilinx-zynq-7000-soc-development-board-319203.jpg',
      badge: 'Python on FPGA',
      tags: ['PYNQ', 'Xilinx', 'Zynq', 'FPGA', 'Python', 'Accelerator', 'DSP'],
      rating: 4.96,
      review_count: 10,
      featured: 0,
      compatible_with: ['sipeed-tang-primer-20k-fpga-kit']
    },

        {
      slug: 'tigard-multi-protocol-hardware-debug-probe',
      name: 'Tigard Multi-Protocol Hardware Debug Probe (FTDI FT2232H, UART/JTAG/SWD/SPI/I2C)',
      sku: 'REV-TGD-PROBE-01',
      mpn: 'TIGARD-V1.1',
      category_id: 6,
      subcategory: 'OS Dev & Reverse Engineering',
      price_ron: 249.00,
      old_price_ron: 279.00,
      stock: 22,
      stock_status: 'in_stock',
      short_desc: 'Sondă avansată de reverse engineering și depanare firmware cu comutator de nivel logic 1.8V / 2.5V / 3.3V / 5.0V, protecție ESD și compatibilitate OpenOCD, Flashrom, UrJTAG.',
      full_desc: 'Proiectată special pentru inginerii de reverse engineering și dezvoltatorii de sisteme de operare low-level, Tigard elimină haosul firelor jumper și pericolele distrugerii cipurilor prin mismatch de tensiune. Fiecare interfață (UART, JTAG, SPI, I2C) are antet dedicat etichetat clar și leduri de activitate.',
      technical_specs: {
        processor: 'FTDI FT2232H Hi-Speed USB 2.0 (480Mbps)',
        logic_level: 'Comutator hardware: 1.8V, 2.5V, 3.3V, 5.0V sau referință externă VTarget',
        interfaces: ['Port UART de mare viteză (până la 12 Mbaud)', 'Port JTAG/SWD pentru OpenOCD', 'Port SPI pentru Flashrom', 'Port I2C', 'Port USB-C de conectare la PC'],
        protections: 'Diode TVS de protecție la descărcări electrostatice ESD pe fiecare linie de semnal'
      },
      pinout_info: {
        total_pins: 24,
        pin_map: [
          { pin: 'JTAG VTgt', name: 'VTarget', function: 'Tensiune referință țintă' },
          { pin: 'JTAG TMS', name: 'TMS / SWDIO', function: 'Test Mode Select / SWD Data' },
          { pin: 'JTAG TCK', name: 'TCK / SWCLK', function: 'Test Clock / SWD Clock' },
          { pin: 'JTAG TDI', name: 'TDI', function: 'Test Data In' },
          { pin: 'JTAG TDO', name: 'TDO / SWO', function: 'Test Data Out' }
        ],
        wiring_notes: ['Funcționează fără drivere suplimentare pe Linux prin librăriile libftdi / OpenOCD.']
      },
      datasheet_url: 'https://github.com/tigard-tools/tigard',
      image_url: 'https://gomagcdn.ro/domains/robofun.ro/files/product/large/tigard-hardware-hacking-multi-protocol-debug-probe-192031.jpg',
      badge: 'Reverse Engineering Gold',
      tags: ['Tigard', 'JTAG', 'SWD', 'UART', 'Reverse Engineering', 'OpenOCD', 'Hardware Hacking'],
      rating: 4.98,
      review_count: 27,
      featured: 1,
      compatible_with: ['black-magic-probe-v2-3-swd-jtag', 'programator-eeprom-ch341a-v17-pro']
    },
    {
      slug: 'black-magic-probe-v2-3-swd-jtag',
      name: 'Black Magic Probe v2.3 Native SWD/JTAG Debugger (GDB Server Onboard)',
      sku: 'DEV-BMP-PROBE-23',
      mpn: 'BMP-V2.3-NATIVE',
      category_id: 6,
      subcategory: 'OS Dev & Reverse Engineering',
      price_ron: 289.00,
      old_price_ron: 320.00,
      stock: 14,
      stock_status: 'in_stock',
      short_desc: 'Debugger JTAG/SWD autonom care implementează serverul GDB direct în hardware, permițând conectarea directă din `gdb target extended-remote` fără software intermediar.',
      full_desc: 'Spre deosebire de sondele tradiționale care depind de un server software complex (OpenOCD, J-Link server), Black Magic Probe traduce comenzile GDB direct în semnale electrice pe firul SWD/JTAG. Recunoaște automat microcontrolere ARM Cortex-M0/M3/M4/M7, Cortex-A și procesoare RISC-V.',
      technical_specs: {
        processor: 'STM32F103 High-Density USB Microcontroller',
        interfaces: ['Conector standard 10-pin 0.05" Cortex Debug', 'Conector serial UART passthrough integrat', 'Port USB-C'],
        compatibility: 'ARM Cortex-M, Cortex-A, RISC-V RV32/RV64',
        operating_voltage: '1.7V - 5.0V target sensing cu translatoare de nivel bidirecționale'
      },
      pinout_info: null,
      datasheet_url: 'https://black-magic.org/',
      image_url: 'https://gomagcdn.ro/domains/robofun.ro/files/product/large/black-magic-probe-v2-3-swd-jtag-debugger-gdb-server-410293.jpg',
      badge: 'GDB Server On-Chip',
      tags: ['Black Magic Probe', 'SWD', 'JTAG', 'GDB', 'OS Dev', 'Cortex-M', 'Bare Metal'],
      rating: 4.93,
      review_count: 14,
      featured: 0,
      compatible_with: ['tigard-multi-protocol-hardware-debug-probe']
    },
    {
      slug: 'programator-eeprom-ch341a-v17-pro',
      name: 'Kit Programator EEPROM/SPI Flash CH341A v1.7 Pro (Clește Test SOIC8 + Adaptor 1.8V)',
      sku: 'REV-CH341-PRO-KIT',
      mpn: 'CH341A-V1.7-KIT',
      category_id: 6,
      subcategory: 'OS Dev & Reverse Engineering',
      price_ron: 69.00,
      old_price_ron: 79.00,
      stock: 35,
      stock_status: 'in_stock',
      short_desc: 'Kit de deblocare și citire firmware SPI Flash 24/25 Series cu comutator de tensiune real 3.3V/5V/1.8V (fără bug-ul de supratensiune de 5V al versiunilor ieftine) și clește SOIC8.',
      full_desc: 'Versiunea 1.7 Pro rezolvă definitiv celebra problemă a plăcilor CH341A clasice care aplicau 5V pe cipurile de 3.3V. Include clește de test SOIC8/SOP8 pentru citirea și rescrierea cipurilor BIOS/Flash direct pe placa de bază, fără dezlipire.',
      technical_specs: {
        interfaces: ['Soclu ZIF 16-pini pentru cipuri DIP/SOIC', 'Clește de testare cablu panglică SOIC8', 'Adaptor adaptor de nivel logic 1.8V inclus pentru cipuri moderne', 'Conector USB-A'],
        compatibility: 'Toate cipurile SPI Flash 25xx și EEPROM 24xx (Winbond, Macronix, Micron, GigaDevice)'
      },
      pinout_info: null,
      datasheet_url: 'https://www.flashrom.org/supported_hardware/CH341A_3.3V_fix.html',
      image_url: 'https://gomagcdn.ro/domains/robofun.ro/files/product/large/programator-eeprom-spi-flash-ch341a-v1-7-pro-cleste-soic8-718290.jpg',
      badge: 'Fixed 3.3V/1.8V',
      tags: ['EEPROM', 'CH341A', 'BIOS', 'SPI Flash', 'Reverse Engineering', 'Flashrom'],
      rating: 4.86,
      review_count: 48,
      featured: 0,
      compatible_with: ['tigard-multi-protocol-hardware-debug-probe']
    },

        {
      slug: 'hackrf-one-sdr-transceiver-kit',
      name: 'HackRF One 1MHz - 6GHz SDR Transceiver (Carcasă Aluminiu + Antene + Cablu SMA)',
      sku: 'SDR-GSG-HRF-KIT',
      mpn: 'HACKRF-ONE-R9',
      category_id: 6,
      subcategory: 'Software Defined Radio',
      price_ron: 890.00,
      old_price_ron: 990.00,
      stock: 13,
      stock_status: 'in_stock',
      short_desc: 'Platformă radio definită prin software (SDR) semi-duplex cu lățime de bandă uriașă de la 1MHz la 6GHz, eșantionare 20 MSPS, compatibilă GNU Radio, SDR# și analizoare spectrale.',
      full_desc: 'HackRF One proiectat de Great Scott Gadgets este instrumentul suprem pentru cercetare în radiofrecvență, securitate wireless și analiză de spectru. Poate atât recepționa, cât și transmite semnale radio de la benzile AM/FM, HAM radio, GSM, GPS, Wi-Fi și Bluetooth până la banda de 6GHz.',
      technical_specs: {
        frequency_range: '1 MHz până la 6 GHz',
        bandwidth: 'Până la 20 MHz (20 MSPS eșantioane I/Q)',
        interfaces: ['Conector antenă SMA mamă (cu alimentare internă Bias-T 3.3V 50mA)', 'Conector SMA Clock In & Clock Out pentru sincronizare', 'Port Micro-USB de date/alimentare'],
        power_consumption: 'Alimentat exclusiv via USB (5V DC)'
      },
      pinout_info: null,
      datasheet_url: 'https://greatscottgadgets.com/hackrf/one/',
      image_url: 'https://gomagcdn.ro/domains/robofun.ro/files/product/large/hackrf-one-software-defined-radio-1mhz-6ghz-transceiver-912034.jpg',
      badge: '1MHz - 6GHz Full RF',
      tags: ['HackRF One', 'SDR', 'Radio', 'Transceiver', 'GNU Radio', 'RF', 'Wireless Security'],
      rating: 4.97,
      review_count: 24,
      featured: 1,
      compatible_with: ['rtl-sdr-blog-v4-dongle-tcxo-kit']
    },
    {
      slug: 'rtl-sdr-blog-v4-dongle-tcxo-kit',
      name: 'RTL-SDR Blog V4 Dongle SDR Receiver cu TCXO 1PPM + Kit Antene Dipol Polivalente',
      sku: 'SDR-RTL-BLOG-V4',
      mpn: 'RTL-SDR-V4-KIT',
      category_id: 6,
      subcategory: 'Software Defined Radio',
      price_ron: 219.00,
      old_price_ron: 249.00,
      stock: 29,
      stock_status: 'in_stock',
      short_desc: 'Receptor radio pe USB cu tuner modern Rafael Micro R828D, oscilator termocompensat TCXO 1 PPM, filtrare HF directă fără convertor upconvertor și carcasă de aluminiu ecranată.',
      full_desc: 'Generația V4 a apreciatului RTL-SDR Blog aduce o recepție substanțial îmbunătățită în banda undelor scurte (HF: 500kHz - 28MHz) datorită circuitului integrat de upconverter intern, precum și ecranare termică superioară. Include kitul complet cu bază magnetică și două brațe telescopice dipol.',
      technical_specs: {
        frequency_range: '500 kHz până la 1.75 GHz',
        stability: 'Oscilator TCXO 1 PPM (deviație termică insesizabilă)',
        interfaces: ['Conector antenă SMA mamă de 50 ohmi', 'Port USB 2.0 ecranat'],
        bandwidth: 'Până la 2.4 MHz eșantionare stabilă'
      },
      pinout_info: null,
      datasheet_url: 'https://www.rtl-sdr.com/rtl-sdr-blog-v4-users-guide/',
      image_url: 'https://gomagcdn.ro/domains/robofun.ro/files/product/large/rtl-sdr-blog-v4-r828d-tcxo-1ppm-software-defined-radio-829103.jpg',
      badge: 'Best Value SDR',
      tags: ['RTL-SDR', 'SDR', 'TCXO', 'ADS-B', 'Receptor Radio', 'HF Receiver'],
      rating: 4.96,
      review_count: 53,
      featured: 0,
      compatible_with: ['hackrf-one-sdr-transceiver-kit']
    },

        {
      slug: 'google-coral-usb-accelerator-edge-tpu',
      name: 'Google Coral USB Accelerator (Edge TPU Coprocessor 4 TOPS, USB 3.0 Type-C)',
      sku: 'ACC-GGL-CORAL-USB',
      mpn: 'G950-01456-01',
      category_id: 6,
      subcategory: 'Acceleratoare AI & Compute',
      price_ron: 389.00,
      old_price_ron: 429.00,
      stock: 21,
      stock_status: 'in_stock',
      short_desc: 'Coprocesor dedicat de inferență neuronală Edge TPU conectabil pe USB 3.0, capabil de 4 TOPS la un consum de doar 2W (0.5W/TOPS). Ideal pentru Frigate NVR și Home Assistant.',
      full_desc: 'Google Coral USB Accelerator permite adăugarea inferenței rapide de modele machine learning (TensorFlow Lite) pe orice mini PC, server homelab sau Raspberry Pi. Poate rula modele complexe de recunoaștere a obiectelor (MobileNet SSD, YOLO) la peste 100 de cadre pe secundă cu încărcare aproape zero pe procesorul gazdă.',
      technical_specs: {
        processor: 'Google Edge TPU ASIC (4 TOPS INT8 @ 2W)',
        interfaces: ['USB 3.0 Type-C (cablu USB-C la USB-A inclus)'],
        compatibility: 'Linux (Debian, Ubuntu, Raspberry Pi OS), Windows 10/11, macOS',
        form_factor: 'Modul compact cu carcasă de aluminiu pentru disipare pasivă (65 x 30 mm)'
      },
      pinout_info: null,
      datasheet_url: 'https://coral.ai/docs/accelerator/datasheet/',
      image_url: 'https://gomagcdn.ro/domains/robofun.ro/files/product/large/coral-usb-accelerator-google-edge-tpu-4-tops-629104.jpg',
      badge: 'Frigate NVR Essential',
      tags: ['Google Coral', 'TPU', 'Edge AI', 'TensorFlow Lite', 'Frigate', 'NVR', 'Homelab'],
      rating: 4.97,
      review_count: 45,
      featured: 1,
      compatible_with: ['orange-pi-5-plus-16gb-rk3588', 'hailo-8-m2-ai-acceleration-module']
    },
    {
      slug: 'hailo-8-m2-ai-acceleration-module',
      name: 'Hailo-8 M.2 AI Acceleration Module (Key M 2280 PCIe 3.0 x4, 26 TOPS @ 2.5W)',
      sku: 'ACC-HLO-8-M2-26T',
      mpn: 'HABP28NENK0',
      category_id: 6,
      subcategory: 'Acceleratoare AI & Compute',
      price_ron: 990.00,
      old_price_ron: 1100.00,
      stock: 9,
      stock_status: 'in_stock',
      short_desc: 'Modul de inferență AI extremă în format M.2 NVMe capabil de 26 TOPS pentru procesare video multi-canal în timp real la o eficiență de neegalat de 10.4 TOPS/W.',
      full_desc: 'Hailo-8 depășește cu mult performanța altor acceleratoare Edge prin arhitectura sa bazată pe dataflow controlat de memorie. Poate procesa simultan până la 16 stream-uri video HD la rezoluție completă pentru clasificare, detecție și estimare de poziție cu latență sub 5ms.',
      technical_specs: {
        processor: 'Hailo-8 AI Processor (26 TOPS @ eficiență tipică 2.5W)',
        interfaces: ['M.2 Key M 2280 PCIe Gen3 x4 (compatibil cu sloturi standard de SSD NVMe)'],
        software_support: 'Hailo TAPPAS, HailoRT driver nativ Linux, plugin-uri GStreamer, suport TensorFlow & ONNX',
        power_consumption: 'Consum mediu: 2.5W | Maxim: 4.5W'
      },
      pinout_info: null,
      datasheet_url: 'https://hailo.ai/products/ai-accelerators/hailo-8-m2-module/',
      image_url: 'https://gomagcdn.ro/domains/robofun.ro/files/product/large/hailo-8-m2-ai-acceleration-module-key-m-26-tops-910283.jpg',
      badge: '26 TOPS AI Beast',
      tags: ['Hailo-8', 'M.2', 'AI Accelerator', '26 TOPS', 'Vision AI', 'Computer Vision'],
      rating: 4.94,
      review_count: 8,
      featured: 0,
      compatible_with: ['orange-pi-5-plus-16gb-rk3588', 'radxa-rock-5b-8gb-rk3588']
    }
  ];

  console.log(`Adding ${products.length} new products (Enterprise & Niche)...`);

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
  console.log('Total products now in database:', totalRows[0].cnt);

  const [catRows] = await conn.query(`
    SELECT c.name, COUNT(p.id) as count
    FROM categories c
    LEFT JOIN products p ON c.id = p.category_id
    GROUP BY c.id
    ORDER BY c.sort_order
  `);
  console.log('Categories breakdown:', catRows);

  await conn.end();
}

main().catch(console.error);
