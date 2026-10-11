import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { pool, initDatabase } from './db.js';
import { categoriesData, productsData } from './seed.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper for psychological charm pricing: always ends in .99
// E.g. 250 -> 249.99, 469 -> 468.99, 100 -> 99.99, 15 -> 14.99, 25.5 -> 24.99
function charmPrice(val: number): number {
  const floor = Math.floor(val);
  if (floor === val) {
    return Number((val - 0.01).toFixed(2));
  } else {
    return Number((floor + 0.99).toFixed(2));
  }
}

function charmOldPrice(val: number | null | undefined, currentPrice: number): number | null {
  if (!val) return null;
  let res = charmPrice(val);
  if (res <= currentPrice) {
    res = Number((Math.ceil(currentPrice) + 29.99).toFixed(2));
  }
  return res;
}

// 42 Brand New Hardware Products covering all requested niches
export const additionalProducts: any[] = [
    {
    slug: 'raspberry-pi-compute-module-4-8gb-emmc-wifi',
    name: 'Raspberry Pi Compute Module 4 (CM4) - 8GB RAM, 32GB eMMC, Wi-Fi & BT',
    sku: 'RPI-CM4-8G32GW',
    mpn: 'CM4108032',
    category_id: 1,
    subcategory: 'SBC ARM',
    price_ron: 489.99,
    old_price_ron: 539.99,
    stock: 18,
    stock_status: 'in_stock',
    short_desc: 'Modul de calcul industrial BCM2711 Quad-Core A72 @ 1.5GHz, 8GB LPDDR4, 32GB eMMC și conectivitate wireless dual-band.',
    full_desc: 'Raspberry Pi Compute Module 4 valorifică puterea de calcul a Raspberry Pi 4 într-un format compact pentru integrare în plăci carrier industriale, clustere homelab tip Blade sau echipamente IoT robuste. Dispune de interfață PCIe 2.0 x1 dedicată pentru extensii NVMe sau plăci de rețea.',
    technical_specs: {
      architecture: 'ARM64',
      skill_level: 'Advanced',
      processor: 'Broadcom BCM2711 Quad-core Cortex-A76 @ 1.5GHz',
      ram: '8GB LPDDR4-3200 SDRAM',
      storage: '32GB eMMC Flash de înaltă anduranță',
      interfaces: ['PCIe 2.0 x1', 'Gigabit Ethernet PHY', '2x HDMI 2.0', '2x MIPI DSI', '2x MIPI CSI-2', '28x GPIO'],
      power_consumption: '4.5W tipic',
      operating_voltage: '5V DC via carrier board',
      linux_support: 'Mainline Kernel 6.6+ & Raspberry Pi OS',
      works_with_os: ['Raspberry Pi OS', 'Ubuntu Server', 'Debian', 'Alpine Linux'],
      documentation_links: {
        datasheet: 'https://datasheets.raspberrypi.com/cm4/cm4-datasheet.pdf',
        pinout: 'https://datasheets.raspberrypi.com/cm4/cm4-pinout.pdf'
      }
    },
    pinout_info: {
      pin_map: [
        { pin: 'Hirose DF40 Pin 1', name: 'GND', function: 'Ground referință masă' },
        { pin: 'Hirose DF40 Pin 3', name: 'PCIE_TX_P', function: 'PCIe 2.0 x1 Transmit Pozitiv' },
        { pin: 'Hirose DF40 Pin 5', name: 'PCIE_TX_N', function: 'PCIe 2.0 x1 Transmit Negativ' }
      ]
    },
    datasheet_url: 'https://datasheets.raspberrypi.com/cm4/cm4-datasheet.pdf',
    image_url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    badge: 'Popular Compute',
    tags: ['sbc', 'arm64', 'cm4', 'industrial', 'pcie', 'cluster'],
    rating: 4.95,
    review_count: 14,
    featured: true,
    compatible_with: ['raspberry-pi-5-8gb', 'sursa-raspberry-pi-27w-usb-c']
  },
  {
    slug: 'banana-pi-bpi-r3-wifi-6-router-sbc',
    name: 'Banana Pi BPI-R3 Wi-Fi 6 Router Board (MediaTek MT7986A, 2x 2.5G SFP)',
    sku: 'BPI-R3-ROUTER',
    mpn: 'BPI-R3-MT7986',
    category_id: 1,
    subcategory: 'SBC ARM & Networking',
    price_ron: 589.99,
    old_price_ron: 649.99,
    stock: 9,
    stock_status: 'in_stock',
    short_desc: 'SBC de rețea enterprise cu procesor Filogic 830 Quad A53 @ 2.0GHz, 2x porturi SFP 2.5G, 5x Gigabit RJ45 și Wi-Fi 6 4x4.',
    full_desc: 'Banana Pi BPI-R3 este placa ideală pentru construirea unui router custom hardware OpenWrt de foarte mare viteză. Cu 2 sloturi SFP pentru fibră optică sau module DAC de 2.5GbE, 5 porturi Ethernet RJ45 Gigabit și suport integrat Wi-Fi 6 AX6000 dual-band, suportă hardware packet steering și wire-guard VPN de mare debit.',
    technical_specs: {
      architecture: 'ARM64',
      skill_level: 'Intermediate',
      processor: 'MediaTek MT7986A (Filogic 830) Quad-Core ARM Cortex-A53 @ 2.0GHz',
      ram: '2GB DDR4',
      storage: '8GB eMMC Flash onboard + Slot MicroSD + Slot M.2 NVMe PCIe x2',
      interfaces: ['2x 2.5G SFP cage', '5x Gigabit Ethernet (1 WAN + 4 LAN)', '1x USB 3.0', 'Slot M.2 B-Key 5G', 'Slot M.2 M-Key NVMe'],
      operating_voltage: '12V DC / 3A (Jack 5.5x2.1mm)',
      power_consumption: '8W idle, 22W sub sarcină Wi-Fi maximă',
      linux_support: 'OpenWrt Official Snapshot / Linux Mainline 6.x',
      works_with_os: ['OpenWrt', 'Debian', 'Armbian'],
      documentation_links: {
        datasheet: 'https://wiki.banana-pi.org/Banana_Pi_BPI-R3',
        github: 'https://github.com/BPI-SBC/BPI-R3-OPENWRT-V21.02'
      }
    },
    datasheet_url: 'https://wiki.banana-pi.org/Banana_Pi_BPI-R3',
    image_url: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80',
    badge: 'OpenWrt Flagship',
    tags: ['router', 'openwrt', 'sfp', 'wifi6', 'networking', 'sbc'],
    rating: 4.88,
    review_count: 9,
    featured: true,
    compatible_with: ['transceiver-sfp-10gbase-t-copper', 'cablu-dac-10g-sfp-1m']
  },
  {
    slug: 'radxa-zero-3w-4gb-quad-core-wifi6',
    name: 'Radxa Zero 3W (4GB RAM, Quad-Core Cortex-A35, Wi-Fi 6 & BT 5.4)',
    sku: 'RADXA-ZERO-3W-4G',
    mpn: 'RADXA-Z3W-4GB',
    category_id: 1,
    subcategory: 'SBC ARM',
    price_ron: 179.99,
    old_price_ron: 199.99,
    stock: 22,
    stock_status: 'in_stock',
    short_desc: 'SBC ultra-compact în format Raspberry Pi Zero cu procesor Rockchip RK3566, 4GB RAM LPDDR4 și Wi-Fi 6.',
    full_desc: 'Radxa Zero 3W oferă o performanță de 4x mai mare decât un Raspberry Pi Zero 2W clasic, integrând 4GB de RAM LPDDR4, procesor RK3566 pe 64 de biți și conectivitate wireless de generație nouă Wi-Fi 6 cu antenă ceramică onboard și conector IPEX extern.',
    technical_specs: {
      architecture: 'ARM64',
      skill_level: 'Beginner',
      processor: 'Rockchip RK3566 Quad-core ARM Cortex-A35 @ 1.6GHz + NPU 0.8 TOPS',
      ram: '4GB LPDDR4',
      storage: 'MicroSD slot (suport eMMC opțional)',
      interfaces: ['Micro HDMI 1080p60', '1x USB 3.0 Type-C OTG', '1x USB 2.0 Type-C Power', '40-pin GPIO'],
      operating_voltage: '5V DC via USB-C (5V/2A)',
      power_consumption: '1.2W idle, 4W max load',
      linux_support: 'Debian 11/12, Ubuntu, Armbian 6.x',
      works_with_os: ['Debian', 'Ubuntu', 'Armbian', 'DietPi']
    },
    datasheet_url: 'https://radxa.com/products/zeros/zero3w',
    image_url: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80',
    badge: 'Compact Power',
    tags: ['sbc', 'arm64', 'radxa', 'wifi6', 'iot', 'portable'],
    rating: 4.82,
    review_count: 11,
    featured: false
  },
  {
    slug: 'libre-computer-aml-s905x-cc-le-potato-2gb',
    name: 'Libre Computer AML-S905X-CC (Le Potato) - 2GB RAM 4K HDR',
    sku: 'LC-LE-POTATO-2GB',
    mpn: 'AML-S905X-CC-2GB',
    category_id: 1,
    subcategory: 'SBC ARM',
    price_ron: 199.99,
    old_price_ron: 229.99,
    stock: 15,
    stock_status: 'in_stock',
    short_desc: 'SBC open-source cu suport nativ Mainline Linux Kernel 6.x, decodare hardware 4K HDR și compatibilitate cu accesorii Raspberry Pi.',
    full_desc: 'Le Potato este un SBC proiectat cu filozofia open-source în minte, având suport upstream direct în kernel-ul Linux mainline și U-Boot. Ideal pentru proiecte unde stabilitatea kernelului și eliminarea driverelor binare proprietare sunt primordiale.',
    technical_specs: {
      architecture: 'ARM64',
      skill_level: 'Beginner',
      processor: 'Amlogic S905X Quad-core Cortex-A53 @ 1.5GHz',
      ram: '2GB DDR3',
      storage: 'Slot MicroSD UHS + eMMC 5.x interface',
      interfaces: ['Fast Ethernet 100M', '4x USB 2.0', 'HDMI 2.0 4K60', '40-pin Raspberry Pi GPIO', 'S/PDIF Optical'],
      operating_voltage: '5V DC via Micro-USB',
      power_consumption: '2W idle, 5W load',
      linux_support: '100% Upstream Linux Kernel (6.6+ Mainline)',
      works_with_os: ['Debian', 'Ubuntu', 'Armbian', 'CoreELEC']
    },
    datasheet_url: 'https://libre.computer/products/aml-s905x-cc/',
    image_url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
    badge: '100% Mainline',
    tags: ['sbc', 'arm64', 'mainline', 'open-source', 'media-server'],
    rating: 4.79,
    review_count: 8,
    featured: false
  },
  {
    slug: 'pine64-quartz64-model-a-8gb-rk3566',
    name: 'Pine64 Quartz64 Model A (8GB RAM, Rockchip RK3566, PCIe x1 Slot)',
    sku: 'PINE64-QUARTZ64-A-8G',
    mpn: 'QUARTZ64-A-8GB',
    category_id: 1,
    subcategory: 'SBC ARM',
    price_ron: 399.99,
    old_price_ron: 449.99,
    stock: 12,
    stock_status: 'in_stock',
    short_desc: 'SBC hacker-friendly cu slot fizic deschis PCIe 2.0 x1, port SATA 3.0 nativ, 8GB RAM și suport e-Ink display.',
    full_desc: 'Pine64 Quartz64 Model A oferă o conectivitate unică pentru un SBC sub 400 de lei: un slot PCIe 2.0 x1 mecanic deschis ce acceptă direct plăci grafice, controllere SATA sau plăci de rețea Intel/Mellanox, alături de un port nativ SATA 6Gbps și conector e-Ink.',
    technical_specs: {
      architecture: 'ARM64',
      skill_level: 'Intermediate',
      processor: 'Rockchip RK3566 Quad A55 64-bit @ 1.8GHz + 0.8 TOPS NPU',
      ram: '8GB LPDDR4',
      storage: 'MicroSD slot + socket eMMC + 1x SATA 3.0 (cu header alimentare)',
      interfaces: ['Slot PCIe 2.0 x1 mecanic deschis', 'Gigabit Ethernet', '1x USB 3.0', '3x USB 2.0', 'HDMI 2.0', 'e-Paper interface'],
      operating_voltage: '12V DC (Jack baril 5.5x2.1mm)',
      power_consumption: '3W idle, 9W sub sarcină maximă',
      linux_support: 'Linux Mainline 6.x (suport comunitar activ)',
      works_with_os: ['Debian', 'Manjaro ARM', 'Armbian', 'FreeBSD']
    },
    datasheet_url: 'https://wiki.pine64.org/wiki/Quartz64',
    image_url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
    badge: 'PCIe Expansibil',
    tags: ['sbc', 'arm64', 'pcie', 'pine64', 'sata', 'homelab'],
    rating: 4.85,
    review_count: 13,
    featured: false
  },

    {
    slug: 'apple-ipod-touch-7th-gen-a10-linux-dev',
    name: 'Apple iPod touch (7th Gen) 32GB — A10 Fusion Linux Dev Platform',
    sku: 'APPLE-IPOD-TOUCH-7-A10',
    mpn: 'MVHV2LL/A-LAB',
    category_id: 6,
    subcategory: 'Apple Hardware Linux',
    price_ron: 349.99,
    old_price_ron: 399.99,
    stock: 7,
    stock_status: 'in_stock',
    short_desc: 'Dispozitiv ultra-subțire A10 Fusion exploatabil via checkm8 pentru rulare kernel Linux 6.x / postmarketOS fără baterie umflată.',
    full_desc: 'iPod touch generația a 7-a este cel mai compact dispozitiv Apple dotat cu procesorul quad-core A10 Fusion pe 64 de biți. Nefiind legat de modem celular baseband, oferă o platformă curată și sigură pentru bootarea distribuțiilor Linux ARM64 (postmarketOS, Debian) direct prin exploit-ul de bootrom tethered checkm8.',
    technical_specs: {
      architecture: 'ARM64 (Apple A10)',
      skill_level: 'Expert',
      processor: 'Apple A10 Fusion Quad-core (2x Hurricane + 2x Zephyr @ 2.34GHz)',
      ram: '2GB LPDDR4',
      storage: '32GB Apple NVMe Flash',
      interfaces: ['Lightning (D+/D- USB 2.0 & UART Debug)', 'Wi-Fi 802.11ac', 'Bluetooth 4.1', 'Display Retina 4" 1136x640'],
      operating_voltage: '5V USB via Lightning',
      power_consumption: '0.4W idle, 2.5W max CPU load',
      linux_support: 'Linux Mainline branch (A10 SoC checkm8 payload)',
      works_with_os: ['postmarketOS', 'Alpine Linux', 'Debian chroot', 'iOS 15.8 Legacy']
    },
    datasheet_url: 'https://postmarketos.org/wiki/device:apple-ipod7',
    image_url: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80',
    badge: 'Linux Pocket Node',
    tags: ['niche', 'apple-linux', 'checkm8', 'a10', 'postmarketos', 'arm64'],
    rating: 4.89,
    review_count: 6,
    featured: true
  },
  {
    slug: 'apple-iphone-7-plus-128gb-a10-linux-testbed',
    name: 'Apple iPhone 7 Plus 128GB — A10 Fusion Linux Platform (Refurbished)',
    sku: 'APPLE-IPHONE-7PLUS-A10',
    mpn: 'MN4M2LL/A-LAB',
    category_id: 6,
    subcategory: 'Apple Hardware Linux',
    price_ron: 499.99,
    old_price_ron: 579.99,
    stock: 8,
    stock_status: 'in_stock',
    short_desc: 'Platformă de dezvoltare Linux A10 Fusion cu ecran 5.5" 1080p, 3GB RAM și 128GB spațiu pentru compilare nativă.',
    full_desc: 'iPhone 7 Plus oferă 3GB de RAM LPDDR4 (cu 50% mai mult decât iPhone 7 standard), făcându-l capabil să compileze pachete C/Rust direct pe dispozitiv sub postmarketOS. Exploit-ul checkm8 permite injectarea u-boot și inițializarea framebuffer-ului la rezoluție nativă 1920x1080.',
    technical_specs: {
      architecture: 'ARM64 (Apple A10)',
      skill_level: 'Expert',
      processor: 'Apple A10 Fusion Quad-core 64-bit @ 2.34GHz',
      ram: '3GB LPDDR4',
      storage: '128GB NVMe Storage intern',
      interfaces: ['Lightning Connector cu suport DCSD serial cable', 'Wi-Fi 802.11a/b/g/n/ac', 'Display 5.5" 1080p'],
      operating_voltage: '5V DC via Lightning',
      power_consumption: '0.8W idle, 3.8W max load',
      linux_support: 'Mainline Linux Kernel adaptat checkm8',
      works_with_os: ['postmarketOS', 'Debian Linux', 'PongoOS']
    },
    datasheet_url: 'https://github.com/checkra1n/PongoOS',
    image_url: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=800&q=80',
    badge: '3GB RAM A10',
    tags: ['niche', 'apple-linux', 'checkm8', 'a10', 'arm64', 'security'],
    rating: 4.88,
    review_count: 5,
    featured: false
  },
  {
    slug: 'apple-tv-4k-1st-gen-a10x-headless-node',
    name: 'Apple TV 4K (1st Gen) 64GB — Apple A10X Fusion 6-Core Headless Node',
    sku: 'APPLE-TV-4K-A10X',
    mpn: 'MP7P2LL/A-LAB',
    category_id: 6,
    subcategory: 'Apple Hardware Linux',
    price_ron: 449.99,
    old_price_ron: 519.99,
    stock: 5,
    stock_status: 'in_stock',
    short_desc: 'Dispozitiv A10X Fusion cu 6 nuclee CPU (3x Hurricane + 3x Zephyr), Gigabit Ethernet nativ și ieșire HDMI 2.0a 4K.',
    full_desc: 'Apple TV 4K prima generație ascunde un procesor A10X extrem de puternic (cu 6 nuclee de procesare și GPU cu 12 nuclee), alături de un port Gigabit Ethernet nativ. Cu un breakout Lightning de debug intern sau exploatare prin DFU, oferă performanțe impresionante de nod headless de calcul.',
    technical_specs: {
      architecture: 'ARM64 (Apple A10X)',
      skill_level: 'Expert',
      processor: 'Apple A10X Fusion 6-Core (3x Hurricane @ 2.38GHz + 3x Zephyr)',
      ram: '3GB LPDDR4',
      storage: '64GB Apple NVMe Solid State',
      interfaces: ['Gigabit Ethernet RJ45', 'HDMI 2.0a', 'Wi-Fi 802.11ac MIMO', 'Sursă alimentare integrată 230V'],
      operating_voltage: '100-240V AC intern',
      power_consumption: '2.5W idle, 9W sub încărcare completă 6-core',
      linux_support: 'PongoOS & checkm8 payload research',
      works_with_os: ['PongoOS', 'Custom Linux Kernel', 'tvOS 17 Legacy']
    },
    datasheet_url: 'https://theapplewiki.com/wiki/Apple_TV_4K_(1st_generation)',
    image_url: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80',
    badge: '6-Core A10X',
    tags: ['niche', 'apple-linux', 'a10x', 'gigabit', 'checkm8', 'headless'],
    rating: 4.92,
    review_count: 4,
    featured: false
  },
  {
    slug: 'milkv-mars-riscv-sbc-8gb-ram',
    name: 'Milk-V Mars Quad-Core 64-bit RISC-V SBC (8GB RAM, JH7110)',
    sku: 'MILKV-MARS-8GB',
    mpn: 'MILKV-MARS-8G',
    category_id: 6,
    subcategory: 'Hardware RISC-V',
    price_ron: 379.99,
    old_price_ron: 429.99,
    stock: 14,
    stock_status: 'in_stock',
    short_desc: 'SBC RISC-V în format de card de credit compatibil mecanic cu accesorii Raspberry Pi, 8GB RAM și Gigabit Ethernet.',
    full_desc: 'Milk-V Mars aduce arhitectura RISC-V la un nivel de maturitate remarcabil. Echipat cu procesorul StarFive JH7110 Quad-Core U74 @ 1.5GHz, oferă suport direct pentru distribuțiile Debian RISC-V, Fedora și Ubuntu, având conector PCIe M.2 E-Key pentru carduri wireless și 40 de pini GPIO.',
    technical_specs: {
      architecture: 'RISC-V (RV64GC)',
      skill_level: 'Intermediate',
      processor: 'StarFive JH7110 Quad-Core 64-bit RISC-V SiFive U74 @ 1.5GHz + Imagination BXE-4-32 GPU',
      ram: '8GB LPDDR4',
      storage: 'Slot MicroSD UHS-I + Socket modul eMMC',
      interfaces: ['Gigabit Ethernet RJ45 (suport PoE HAT)', '3x USB 3.0', '1x USB 2.0', 'HDMI 2.0 4K', 'M.2 E-Key Wi-Fi', '40-pin GPIO'],
      operating_voltage: '5V DC via USB-C (3A)',
      power_consumption: '2.5W idle, 7W max load',
      linux_support: 'Upstream Linux Kernel 6.6+ & Debian RISC-V Port',
      works_with_os: ['Debian RISC-V', 'Ubuntu RISC-V', 'Fedora', 'FreeBSD']
    },
    datasheet_url: 'https://milkv.io/mars',
    image_url: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=800&q=80',
    badge: 'RISC-V 8GB',
    tags: ['niche', 'risc-v', 'sbc', 'open-architecture', 'linux-mainline'],
    rating: 4.86,
    review_count: 8,
    featured: true
  },
  {
    slug: 'lichee-pi-4a-th1520-quad-riscv-16gb',
    name: 'Sipeed Lichee Pi 4A (TH1520 Quad-Core RISC-V 16GB RAM + 128GB eMMC)',
    sku: 'LICHEE-PI-4A-16G',
    mpn: 'SIPEED-LPI4A-16G',
    category_id: 6,
    subcategory: 'Hardware RISC-V',
    price_ron: 899.99,
    old_price_ron: 999.99,
    stock: 6,
    stock_status: 'in_stock',
    short_desc: 'Cel mai puternic SBC RISC-V: T-Head TH1520 Quad-Core C910 @ 1.85GHz, 16GB RAM LPDDR4X, NPU 4 TOPS și 2x Gigabit Ethernet.',
    full_desc: 'Lichee Pi 4A este primul computer pe o singură placă capabil să rivalizeze cu Raspberry Pi 4 în performanța CPU pe arhitectură RISC-V. Cu 16GB de memorie RAM, 128GB stocare internă de mare viteză și accelerare AI NPU de 4 TOPS, este stația supremă pentru dezvoltare software și portare kernel pe RISC-V.',
    technical_specs: {
      architecture: 'RISC-V (RV64GCV)',
      skill_level: 'Expert',
      processor: 'Alibaba T-Head TH1520 Quad-Core XuanTie C910 @ 1.85GHz cu extensii Vector 0.7.1 + 4 TOPS NPU',
      ram: '16GB LPDDR4X 3733Mbps',
      storage: '128GB eMMC 5.1 Flash intern + slot MicroSD',
      interfaces: ['2x Gigabit Ethernet RJ45', '4x USB 3.0 Type-A', 'HDMI 2.0 4K30', 'MIPI DSI + CSI', 'Audio Jack 3.5mm'],
      operating_voltage: '5V DC / 4A via USB Type-C',
      power_consumption: '4W idle, 14W sarcină maximă NPU+CPU',
      linux_support: 'Debian 12 RISC-V, OpenEuler, Android 13',
      works_with_os: ['Debian 12', 'openEuler', 'Android 13 RISC-V']
    },
    datasheet_url: 'https://wiki.sipeed.com/hardware/en/lichee/th1520/lp4a.html',
    image_url: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=800&q=80',
    badge: '16GB RISC-V Monster',
    tags: ['niche', 'risc-v', 'th1520', 'ai-npu', 'high-performance'],
    rating: 4.94,
    review_count: 5,
    featured: false
  },
  {
    slug: 'wch-ch32v003-riscv-dev-kit-10pk',
    name: 'WCH CH32V003 RISC-V Development Kit (10x Plăci + WCH-LinkE Debugger)',
    sku: 'WCH-CH32V003-KIT-10PK',
    mpn: 'WCH-CH32V003F4P6-KIT',
    category_id: 6,
    subcategory: 'Hardware RISC-V',
    price_ron: 59.99,
    old_price_ron: 79.99,
    stock: 35,
    stock_status: 'in_stock',
    short_desc: 'Kit de 10 plăcuțe microcontroler RISC-V 32-bit la 48MHz + programator WCH-LinkE pentru prototipare masivă la cost redus.',
    full_desc: 'CH32V003 este faimosul microcontroler RISC-V de sub 10 cenți. Acest kit include 10 module de dezvoltare cu pini gata lipiți și programatorul oficial WCH-LinkE cu suport SDI 1-wire debug, compatibil cu toolchain-ul GCC open-source și PlatformIO.',
    technical_specs: {
      architecture: 'RISC-V (RV32EC)',
      skill_level: 'Beginner',
      processor: 'WCH QingKe 32-bit RISC-V Core @ 48MHz',
      ram: '2KB SRAM',
      storage: '16KB Flash memorie program',
      interfaces: ['1x USART', '1x I2C', '1x SPI', '8x Canale ADC 10-bit', '18x GPIO'],
      operating_voltage: '3.3V / 5.0V DC',
      power_consumption: '< 10mA activ',
      linux_support: 'Compatibil cu toolchain GCC/GDB pe Linux & macOS',
      works_with_os: ['Bare-metal C/Assembly', 'FreeRTOS']
    },
    datasheet_url: 'http://www.wch-ic.com/products/CH32V003.html',
    image_url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    badge: 'Super Valoare',
    tags: ['niche', 'risc-v', 'microcontroller', 'wch', 'embedded', 'low-cost'],
    rating: 4.83,
    review_count: 19,
    featured: false
  },
  {
    slug: 'tang-nano-9k-gowin-fpga-hdmi-kit',
    name: 'Tang Nano 9K Gowin FPGA Development Board cu HDMI & USB-JTAG',
    sku: 'TANG-NANO-9K',
    mpn: 'SIPEED-TANG-NANO-9K',
    category_id: 6,
    subcategory: 'FPGA & Reconfigurable',
    price_ron: 149.99,
    old_price_ron: 179.99,
    stock: 20,
    stock_status: 'in_stock',
    short_desc: 'Placă FPGA compactă cu 8640 LUT-uri, port HDMI nativ, 64Mbit PSRAM și programator USB-JTAG integrat.',
    full_desc: 'Tang Nano 9K este platforma ideală pentru învățarea Verilog/VHDL și emularea consolelor retro (NES, GameBoy, ZX Spectrum) sau a microarhitecturilor RISC-V. Dispune de conector HDMI direct, slot card TF și programator BL616 onboard prin USB Type-C.',
    technical_specs: {
      architecture: 'FPGA (Gowin GW1NR-9)',
      skill_level: 'Intermediate',
      processor: 'Gowin GW1NR-LV9QN88P (8640 LUT4, 6480 Flip-Flop, 468Kbits Block SRAM)',
      ram: '64Mbit PSRAM încorporată',
      storage: 'Slot MicroSD + Flash SPI 32Mbit onboard',
      interfaces: ['Ieșire video digitală HDMI standard', 'USB Type-C (JTAG & UART)', 'Conector 40-pin RGB LCD', '36x I/O user pins'],
      operating_voltage: '5V DC via USB-C',
      power_consumption: '1.5W tipic',
      linux_support: 'Gowin EDA pe Linux & Yosys/Apycula open-source flow',
      works_with_os: ['Hardware sintetizat direct (Verilog/VHDL)']
    },
    datasheet_url: 'https://wiki.sipeed.com/hardware/en/tang/Tang-Nano-9K/Nano-9K.html',
    image_url: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&w=800&q=80',
    badge: 'FPGA Best Buy',
    tags: ['niche', 'fpga', 'gowin', 'hdmi', 'verilog', 'retro-gaming'],
    rating: 4.87,
    review_count: 14,
    featured: true
  },
  {
    slug: 'lattice-icestick-ice40hx1k-open-source-fpga',
    name: 'Lattice iCEstick iCE40HX-1K USB FPGA Kit (100% Open-Source Toolchain)',
    sku: 'LATTICE-ICESTICK-1K',
    mpn: 'ICE40HX1K-STICK-EVN',
    category_id: 6,
    subcategory: 'FPGA & Reconfigurable',
    price_ron: 269.99,
    old_price_ron: 299.99,
    stock: 8,
    stock_status: 'in_stock',
    short_desc: 'Dongle USB FPGA compatibil 100% cu toolchain-ul complet deschis Yosys, nextpnr și IceStorm.',
    full_desc: 'Lattice iCEstick este standardul de aur pentru dezvoltarea FPGA fără licențe software proprietare greoaie. Folosind instrumentele Project IceStorm, sinteza și rutarea bitstream-ului se execută în sub 2 secunde direct din terminalul Linux.',
    technical_specs: {
      architecture: 'FPGA (Lattice iCE40)',
      skill_level: 'Intermediate',
      processor: 'Lattice iCE40HX-1K-TQ144 (1280 Logic Cells, 64 Kbits Block RAM)',
      ram: 'Block RAM intern',
      storage: '32Mbit SPI Flash pentru bitstream permanent',
      interfaces: ['USB 2.0 Type-A Direct', '2x Digilent Pmod 2x6 conectori', 'Transceiver infraroșu IrDA', '5x User LEDs'],
      operating_voltage: '5V direct din portul USB',
      power_consumption: '0.3W ultra-low power',
      linux_support: 'Yosys, NextPNR, IcePack (Debian/Ubuntu/Arch/macOS native)',
      works_with_os: ['Sinteză Verilog deschisă']
    },
    datasheet_url: 'https://www.latticesemi.com/icestick',
    image_url: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&w=800&q=80',
    badge: '100% Open Toolchain',
    tags: ['niche', 'fpga', 'ice40', 'yosys', 'open-source-silicon'],
    rating: 4.88,
    review_count: 7,
    featured: false
  },
  {
    slug: 'digilent-basys-3-artix-7-fpga-trainer-board',
    name: 'Digilent Basys 3 Artix-7 FPGA Trainer Board (Xilinx XC7A35T)',
    sku: 'DIGILENT-BASYS3-A7',
    mpn: '410-183-BASYS3',
    category_id: 6,
    subcategory: 'FPGA & Reconfigurable',
    price_ron: 1299.99,
    old_price_ron: 1449.99,
    stock: 5,
    stock_status: 'in_stock',
    short_desc: 'Placă academică Xilinx Artix-7 cu 33.280 celule logice, ieșire VGA, 16 comutatoare, afișaj 7 segmente și Vivado WebPACK.',
    full_desc: 'Digilent Basys 3 este concepută pentru studenți și ingineri care vor să creeze propriile procesoare (MIPS, RISC-V) sau acceleratoare hardware pe arhitectura Xilinx 7-Series. Oferă un set generos de comutatoare, butoane, ieșire VGA și port USB-HID host.',
    technical_specs: {
      architecture: 'FPGA (Xilinx Artix-7)',
      skill_level: 'Advanced',
      processor: 'Xilinx Artix-7 XC7A35T-1CPG236C (33,280 celule logice, 90 felii DSP, 1,800 Kbits BRAM)',
      ram: 'Block RAM intern + Suport USB Flash drive',
      storage: '16MByte Quad-SPI Flash onboard',
      interfaces: ['VGA 12-bit DAC', 'USB-HID Host (tastatură/mouse)', 'USB-JTAG integrat', '4x Conectori Pmod 12-pin', '16 comutatoare + 16 LED-uri'],
      operating_voltage: '5V DC via USB sau sursă externă',
      power_consumption: '2W - 5W în funcție de design',
      linux_support: 'AMD Xilinx Vivado ML Standard (Linux x86_64)',
      works_with_os: ['VHDL / Verilog / SystemVerilog']
    },
    datasheet_url: 'https://digilent.com/reference/programmable-logic/basys-3/reference-manual',
    image_url: 'https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=800&q=80',
    badge: 'Xilinx Artix-7',
    tags: ['niche', 'fpga', 'xilinx', 'artix7', 'vivado', 'hardware-accel'],
    rating: 4.95,
    review_count: 6,
    featured: false
  },
  {
    slug: 'beaglebone-black-rev-c-ti-am3358-real-time',
    name: 'BeagleBone Black Rev C (TI Sitara AM3358 1GHz, U-Boot, 2x PRU Co-Processors)',
    sku: 'BEAGLEBONE-BLACK-REVC',
    mpn: 'BB-BBLK-000C',
    category_id: 6,
    subcategory: 'OS Development & Embedded',
    price_ron: 349.99,
    old_price_ron: 389.99,
    stock: 14,
    stock_status: 'in_stock',
    short_desc: 'SBC de referință pentru dezvoltarea kernel-ului Linux și sisteme deterministe cu 2 unități PRU în timp real de 200MHz.',
    full_desc: 'BeagleBone Black este platforma prin excelență pe care învață viitorii ingineri de Linux kernel și drivere de dispozitiv. Cu acces facil la consola serială, bootloader U-Boot configurabil dinamic și două nuclee PRU de timp real, este de neînlocuit în automatizările industriale.',
    technical_specs: {
      architecture: 'ARMv7-A (32-bit Cortex-A8)',
      skill_level: 'Intermediate',
      processor: 'TI Sitara AM3358BZCZ100 Cortex-A8 @ 1GHz + 2x 32-bit PRU-ICSS @ 200MHz',
      ram: '512MB DDR3L-800',
      storage: '4GB eMMC onboard + slot MicroSD',
      interfaces: ['Fast Ethernet 100M', 'Micro HDMI', 'USB 2.0 Host', 'Mini USB Client (alimentare & rețea virtuală)', '2x Headere 46-pin Cape'],
      operating_voltage: '5V DC via Mini-USB sau Jack baril 5V/2A',
      power_consumption: '1.8W idle, 4W max',
      linux_support: 'Linux Mainline 6.x & Debian BeagleBoard Images',
      works_with_os: ['Debian', 'FreeRTOS pe PRU', 'Buildroot', 'Yocto Project']
    },
    datasheet_url: 'https://beagleboard.org/black',
    image_url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    badge: 'OS Dev Classic',
    tags: ['niche', 'os-dev', 'beaglebone', 'u-boot', 'pru', 'realtime'],
    rating: 4.88,
    review_count: 12,
    featured: true
  },
  {
    slug: 'raspberry-pi-debug-probe-cmsis-dap-uart',
    name: 'Raspberry Pi Debug Probe (CMSIS-DAP + UART USB Debugger Kit)',
    sku: 'RPI-DEBUG-PROBE-KIT',
    mpn: 'SC0916',
    category_id: 6,
    subcategory: 'OS Development & Embedded',
    price_ron: 69.99,
    old_price_ron: 84.99,
    stock: 25,
    stock_status: 'in_stock',
    short_desc: 'Sondă oficială hardware de debug all-in-one: interfață SWD CMSIS-DAP și punte USB-la-UART serială independentă.',
    full_desc: 'Raspberry Pi Debug Probe rezolvă frustrarea depanării microcontrolerelor ARM Cortex-M. Conține o sondă SWD standardizată CMSIS-DAP susținută de OpenOCD și o consolă serială UART USB conectabilă la headerele de debug de pe Raspberry Pi 5 și Pico.',
    technical_specs: {
      architecture: 'Universal ARM Debug',
      skill_level: 'Beginner',
      processor: 'Raspberry Pi RP2040 Dual-core',
      interfaces: ['Port SWD (conector JST-SH 3-pin)', 'Port UART (conector JST-SH 3-pin)', 'Conector Micro-USB'],
      operating_voltage: '5V DC via USB (suportă ținte 3.3V logic)',
      power_consumption: '< 0.5W',
      linux_support: 'Driverless sub Linux, macOS și Windows (USB CDC & HID)',
      works_with_os: ['OpenOCD', 'GDB', 'picoprobe', 'VS Code Cortex-Debug']
    },
    datasheet_url: 'https://datasheets.raspberrypi.com/debug-probe/debug-probe-product-brief.pdf',
    image_url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    badge: 'Esențial Debug',
    tags: ['niche', 'os-dev', 'debugger', 'swd', 'uart', 'openocd'],
    rating: 4.93,
    review_count: 16,
    featured: false
  },
  {
    slug: 'segger-jlink-edu-mini-debug-probe',
    name: 'SEGGER J-Link EDU Mini Debug Probe (Cortex-M SWD/JTAG)',
    sku: 'SEGGER-JLINK-EDU-MINI',
    mpn: '8.08.91-EDU-MINI',
    category_id: 6,
    subcategory: 'OS Development & Embedded',
    price_ron: 199.99,
    old_price_ron: 239.99,
    stock: 10,
    stock_status: 'in_stock',
    short_desc: 'Sondă profesională originală SEGGER J-Link pentru studenți și entuziaști: breakpoint-uri nelimitate în Flash și GDB Server.',
    full_desc: 'J-Link EDU Mini este standardul industrial de viteză și stabilitate în depanarea microcontrolerelor ARM Cortex-M0/M3/M4/M7/M33. Permite viteze de descărcare în Flash de până la 200 KByte/s și analiză prin utilitarele oficiale SEGGER Ozone și SystemView.',
    technical_specs: {
      architecture: 'Universal ARM Cortex-M Debug',
      skill_level: 'Advanced',
      processor: 'Hardware original SEGGER',
      interfaces: ['Header JTAG/SWD 9-pin (0.05" pitch)', 'Port Micro-USB'],
      operating_voltage: '3.3V target voltage logic',
      power_consumption: '< 0.3W',
      linux_support: 'SEGGER J-Link Software and Documentation Pack pe Linux/macOS',
      works_with_os: ['GDB Server', 'SEGGER Ozone', 'Eclipse', 'IAR', 'Keil']
    },
    datasheet_url: 'https://www.segger.com/products/debug-probes/j-link/models/j-link-edu-mini/',
    image_url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
    badge: 'Pro Debugger',
    tags: ['niche', 'os-dev', 'segger', 'jlink', 'swd', 'firmware'],
    rating: 4.97,
    review_count: 11,
    featured: false
  },
  {
    slug: 'dslogic-plus-16ch-400mhz-usb-logic-analyzer',
    name: 'DSLogic Plus 16-Channel 400MHz USB Logic Analyzer (Carcasă CNC Aluminiu)',
    sku: 'DSLOGIC-PLUS-16CH',
    mpn: 'DSLOGIC-PLUS-16',
    category_id: 6,
    subcategory: 'Reverse Engineering',
    price_ron: 699.99,
    old_price_ron: 799.99,
    stock: 9,
    stock_status: 'in_stock',
    short_desc: 'Analizor logic profesional cu memorie buffer 256Mbit DDR, eșantionare 400MHz și decodare protocoale SPI/I2C/UART/CAN/USB.',
    full_desc: 'DSLogic Plus oferă capabilități de laborator de inginerie inversă pe birou. Spre deosebire de clonele ieftine pe USB, conține 256Mbit de memorie hardware dedicată ce previne pierderea pachetelor la eșantionare de mare viteză și cabluri ecranate cu masă individuală pe fiecare fir.',
    technical_specs: {
      architecture: 'Logic Analyzer Hardware',
      skill_level: 'Advanced',
      interfaces: ['16 canale logice digitale', 'Conector USB Type-C High-Speed', '16x sonde ecranate cu clești'],
      sampling_rate: '400MHz pe 4 canale, 200MHz pe 8 canale, 100MHz pe 16 canale',
      memory: '256Mbit DDR SDRAM hardware buffer',
      voltage_threshold: 'Praguri de tensiune reglabile software: 0V - 5V (rezoluție 0.1V)',
      linux_support: 'Software DSView nativ pe Linux (AppImage / DEB) & suport Sigrok/PulseView',
      works_with_os: ['DSView', 'Sigrok PulseView']
    },
    datasheet_url: 'https://www.dreamsourcelab.com/product/dslogic-series/',
    image_url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    badge: '400MHz Sampling',
    tags: ['niche', 'reverse-engineering', 'logic-analyzer', 'protocols', 'hardware-hacking'],
    rating: 4.96,
    review_count: 8,
    featured: true
  },
  {
    slug: 'total-phase-beagle-usb-480-protocol-analyzer',
    name: 'Total Phase Beagle USB 480 Protocol Analyzer (Captură USB 2.0 480Mbps)',
    sku: 'TOTALPHASE-BEAGLE-480',
    mpn: 'TP320510',
    category_id: 6,
    subcategory: 'Reverse Engineering',
    price_ron: 3299.99,
    old_price_ron: 3699.99,
    stock: 3,
    stock_status: 'in_stock',
    short_desc: 'Analizor de protocol de referință industrială pentru captură și decodare în timp real a magistralelor High-Speed USB 480Mbps.',
    full_desc: 'Total Phase Beagle USB 480 este instrumentul definitiv pentru depanarea și ingineria inversă a dispozitivelor și driverelor USB. Monitorizează non-intruziv traficul USB la viteze Low, Full și High-Speed, oferind decodare live a claselor HID, Mass Storage, CDC și a transferurilor izocrone audio/video.',
    technical_specs: {
      architecture: 'Protocol Analyzer Industrial',
      skill_level: 'Expert',
      interfaces: ['Port USB 2.0 In-Line (Host & Device)', 'Port analizor USB High-Speed către PC', 'Conector I/O digital de declanșare'],
      buffer: '64MB memorie circulară internă de captură',
      precision: 'Rezolvare timestamp la nivel de 16.7 nanosecunde',
      operating_voltage: 'Alimentat exclusiv din portul USB al PC-ului',
      linux_support: 'Data Center Software pentru Linux x86_64 și macOS',
      works_with_os: ['Total Phase Data Center', 'Wireshark via pcap']
    },
    datasheet_url: 'https://www.totalphase.com/products/beagle-usb480/',
    image_url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
    badge: 'Lab Grade Protocol',
    tags: ['niche', 'reverse-engineering', 'usb-analyzer', 'datacenter', 'protocols'],
    rating: 5.0,
    review_count: 3,
    featured: false
  },
  {
    slug: 'canable-2-pro-isolated-usb-can-fd-adapter',
    name: 'CANable 2.0 Pro USB-to-CAN / CAN-FD Analyzer (Izolare Galvanică 2.5kV)',
    sku: 'CANABLE-2-PRO-ISOLATED',
    mpn: 'CANABLE-V2-PRO',
    category_id: 6,
    subcategory: 'Reverse Engineering',
    price_ron: 199.99,
    old_price_ron: 239.99,
    stock: 16,
    stock_status: 'in_stock',
    short_desc: 'Adaptor USB la CAN 2.0A/B și CAN-FD de mare viteză cu izolare galvanică 2.5kV și suport SocketCAN nativ în kernelul Linux.',
    full_desc: 'CANable 2.0 Pro utilizează un microcontroler STM32G4 de generație nouă și un transceiver CAN-FD izolat galvanic. Suportă rate de transfer de până la 5 Mbps pe CAN-FD și este recunoscut instantaneu ca interfață de rețea `can0` sub Linux fără a necesita drivere speciale.',
    technical_specs: {
      architecture: 'CAN Bus & Automotive',
      skill_level: 'Intermediate',
      processor: 'STM32G431 32-bit Cortex-M4 @ 170MHz',
      interfaces: ['Terminal cu șurub 3-pin (CAN_H, CAN_L, GND)', 'Port USB Type-C', 'Comutator rezistență terminare 120Ω'],
      isolation: '2.5kV izolare galvanică completă protecție PC',
      bitrate: 'Până la 1 Mbps CAN clasic și 5 Mbps CAN-FD',
      linux_support: 'Nativ în Linux SocketCAN (compatibil can-utils, SavvyCAN, Wireshark)',
      works_with_os: ['Linux (SocketCAN)', 'SavvyCAN pe Linux/macOS']
    },
    datasheet_url: 'https://canable.io/',
    image_url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    badge: 'SocketCAN Nativ',
    tags: ['niche', 'reverse-engineering', 'can-bus', 'can-fd', 'automotive', 'socketcan'],
    rating: 4.91,
    review_count: 14,
    featured: false
  },
  {
    slug: 'limesdr-mini-2-0-full-duplex-sdr-transceiver',
    name: 'LimeSDR Mini 2.0 Full-Duplex RF Software Defined Radio Transceiver',
    sku: 'LIMESDR-MINI-20',
    mpn: 'LMS7002M-MINI2',
    category_id: 6,
    subcategory: 'Software Defined Radio (SDR)',
    price_ron: 1999.99,
    old_price_ron: 2249.99,
    stock: 4,
    stock_status: 'in_stock',
    short_desc: 'SDR Full-Duplex profesional pe scară largă: 10MHz - 3.5GHz, lățime de bandă 30.72MHz, transceiver FPRF LMS7002M + FPGA Lattice ECP5.',
    full_desc: 'LimeSDR Mini 2.0 este instrumentul suprem pentru cercetare radio bidirecțională, permițând transmisie și recepție simultană (Full-Duplex). Ideal pentru crearea de stații de bază celulare 4G/5G private cu srsRAN, comunicații satelitare și audit radio complet.',
    technical_specs: {
      architecture: 'SDR Full-Duplex Transceiver',
      skill_level: 'Expert',
      frequency_range: '10 MHz – 3.5 GHz',
      bandwidth: 'Până la 30.72 MHz lățime de bandă RF',
      fpga: 'Lattice ECP5 (LFE5U-40F)',
      rf_transceiver: 'Lime Microsystems LMS7002M FPRF',
      interfaces: ['Port USB 3.0 Type-A', '2x Conectori SMA (1x Tx, 1x Rx)'],
      power_consumption: '4W tipic via USB 3.0',
      linux_support: 'LimeSuite, GNU Radio, Gqrx, srsRAN pe Linux & macOS',
      works_with_os: ['GNU Radio', 'SDR#', 'srsRAN', 'Gqrx']
    },
    datasheet_url: 'https://limemicro.com/products/boards/limesdr-mini-2-0/',
    image_url: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80',
    badge: 'Full-Duplex 3.5GHz',
    tags: ['niche', 'sdr', 'rf', 'limesdr', 'gnuradio', '5g-cellular'],
    rating: 4.97,
    review_count: 5,
    featured: true
  },
  {
    slug: 'heltec-wifi-lora-32-v3-esp32s3-sx1262',
    name: 'Heltec WiFi LoRa 32 V3 (ESP32-S3 + SX1262 LoRa 868MHz + 0.96" OLED)',
    sku: 'HELTEC-LORA32-V3-868',
    mpn: 'HTIT-WB32LA-V3',
    category_id: 6,
    subcategory: 'Software Defined Radio & LoRa',
    price_ron: 119.99,
    old_price_ron: 139.99,
    stock: 28,
    stock_status: 'in_stock',
    short_desc: 'Nod LoRa de lungă distanță cu ESP32-S3 dual-core, radio Semtech SX1262 868MHz (+22dBm), ecran OLED și suport nativ Meshtastic.',
    full_desc: 'Heltec LoRa 32 V3 este cea mai populară placă de dezvoltare pentru crearea rețelelor mesh descentralizate Meshtastic. Combină procesorul ESP32-S3 cu suport Wi-Fi și Bluetooth 5.0 cu cel mai performant cip radio LoRa SX1262 și un display OLED integrat.',
    technical_specs: {
      architecture: 'ESP32-S3 + Semtech SX1262',
      skill_level: 'Beginner',
      processor: 'Xtensa 32-bit LX7 Dual-Core @ 240MHz + 8MB Flash',
      rf_frequency: 'Banda ISM europeană 863-870 MHz (suport +22dBm output)',
      interfaces: ['Display 0.96" OLED monocrom I2C', 'Conector antenă IPEX/U.FL (antenă inclusă)', 'Port USB-C', 'Conector baterie Li-Po 3.7V'],
      operating_voltage: '5V USB-C sau baterie Li-Po',
      power_consumption: 'Somn adânc: 10µA | Transmisie radio: 120mA',
      linux_support: 'Flasher web Meshtastic & PlatformIO direct pe Linux',
      works_with_os: ['Meshtastic Firmware', 'ESPHome', 'Arduino IDE']
    },
    datasheet_url: 'https://resource.heltec.cn/download/WiFi_LoRa_32_V3',
    image_url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    badge: 'Meshtastic Native',
    tags: ['niche', 'lora', 'meshtastic', 'esp32-s3', 'rf', 'off-grid'],
    rating: 4.91,
    review_count: 22,
    featured: false
  },
  {
    slug: 'lilygo-t-beam-esp32-lora-868-gps-neo6m',
    name: 'LilyGO T-Beam ESP32 LoRa 868MHz + GPS NEO-6M (Meshtastic Node Portabil)',
    sku: 'LILYGO-TBEAM-GPS-868',
    mpn: 'T-BEAM-V1.2-868',
    category_id: 6,
    subcategory: 'Software Defined Radio & LoRa',
    price_ron: 189.99,
    old_price_ron: 219.99,
    stock: 14,
    stock_status: 'in_stock',
    short_desc: 'Nod portabil autonom cu receptor GPS u-blox, radio LoRa SX1262, soclu baterie 18650 și management avansat AXP2101.',
    full_desc: 'LilyGO T-Beam este soluția completă de comunicații off-grid și geolocalizare fără rețea celulară. Transmite coordonatele GPS criptate pe frecvența 868MHz către alți utilizatori din rețeaua Meshtastic, funcționând zile întregi pe un singur acumulator 18650.',
    technical_specs: {
      architecture: 'ESP32 Dual-Core + GPS',
      skill_level: 'Intermediate',
      processor: 'ESP32 Dual-Core @ 240MHz + 4MB Flash + 8MB PSRAM',
      gps_module: 'u-blox NEO-6M cu antenă ceramică patch activă dedicată',
      lora_chip: 'Semtech SX1262 868MHz',
      power_management: 'PMU AXP2101 cu încărcare inteligentă 18650',
      interfaces: ['Soclu acumulator 18650 pe spate', 'Conector antenă SMA mamă', 'Port USB-C', 'Header I2C pentru ecran'],
      operating_voltage: '3.7V Li-Ion 18650 sau 5V USB-C',
      power_consumption: 'Mod GPS fix + LoRa ascultare: ~65mA',
      linux_support: 'Flasher Meshtastic CLI pe Linux/macOS',
      works_with_os: ['Meshtastic OS', 'Paxcounter']
    },
    datasheet_url: 'https://github.com/Xinyuan-LilyGO/LilyGO-T-Beam',
    image_url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
    badge: 'GPS + LoRa Node',
    tags: ['niche', 'lora', 'meshtastic', 'gps', 'esp32', 'emergency-radio'],
    rating: 4.89,
    review_count: 15,
    featured: false
  },
  {
    slug: 'coral-m2-dual-edge-tpu-8tops-ekey',
    name: 'Google Coral M.2 Accelerator with Dual Edge TPU (8 TOPS, M.2 E-Key)',
    sku: 'CORAL-M2-DUAL-EDGETPU',
    mpn: 'G650-06076-01',
    category_id: 6,
    subcategory: 'Compute Accelerators',
    price_ron: 299.99,
    old_price_ron: 349.99,
    stock: 11,
    stock_status: 'in_stock',
    short_desc: 'Accelerator AI dublu cu 2x cipuri Google Edge TPU (8 TOPS total la doar 4W) în format compact M.2 2230 E-Key.',
    full_desc: 'Google Coral Dual Edge TPU integrează două coprocesoare de inferență ML independente pe un singur card M.2. Fiecare TPU rulează la 4 TOPS și consumă doar 2W, fiind acceleratorul preferat pentru sisteme Frigate NVR capabile să detecteze zeci de stream-uri video 4K simultan.',
    technical_specs: {
      architecture: 'Google Edge TPU ASIC',
      skill_level: 'Intermediate',
      performance: '8 TOPS total (2x 4 TOPS @ 2W per cip)',
      form_factor: 'M.2 2230 E-Key (necesită suport dual PCIe lane pe slotul M.2)',
      interface: '2x PCIe Gen2 x1 independente',
      power_consumption: '4W la sarcină maximă dublă',
      operating_voltage: '3.3V DC via slot M.2',
      linux_support: 'Driver Gasket și libedgetpu oficial Debian/Ubuntu',
      works_with_os: ['Debian', 'Ubuntu', 'Proxmox VE (passthrough PCIe)', 'Frigate NVR']
    },
    datasheet_url: 'https://coral.ai/products/m2-accelerator-dual-edgetpu/',
    image_url: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=800&q=80',
    badge: '8 TOPS Frigate',
    tags: ['niche', 'edge-tpu', 'coral', 'ai-inference', 'frigate', 'nvr'],
    rating: 4.95,
    review_count: 18,
    featured: true
  },
  {
    slug: 'raspberry-pi-ai-hat-plus-26-tops-hailo8',
    name: 'Raspberry Pi AI HAT+ 26 TOPS (Modul Hailo-8 M.2 Integrat)',
    sku: 'RPI-AI-HAT-PLUS-26TOPS',
    mpn: 'SC1204',
    category_id: 6,
    subcategory: 'Compute Accelerators',
    price_ron: 499.99,
    old_price_ron: 559.99,
    stock: 13,
    stock_status: 'in_stock',
    short_desc: 'Placă HAT oficială pentru Raspberry Pi 5 cu accelerator Hailo-8 de 26 TOPS pentru modele mari de viziune computerizată și LLM.',
    full_desc: 'Raspberry Pi AI HAT+ aduce puterea inferenței AI profesionale pe Raspberry Pi 5. Cu 26 de TOPS asigurate de cipul Hailo-8 conectat prin magistrala PCIe 3.0, procesează modele YOLOv8 la peste 100 FPS în timp real direct din suita Raspberry Pi Camera.',
    technical_specs: {
      architecture: 'Hailo-8 Neural Processing Architecture',
      skill_level: 'Intermediate',
      performance: '26 TOPS (Tera-Operations Per Second)',
      interface: 'PCIe 3.0 x1 via conector FPC 16-pin Raspberry Pi 5',
      form_factor: 'Standard HAT+ cu decupaj pentru ventilator activ',
      power_consumption: '5W maxim la 26 TOPS',
      linux_support: 'HailoRT integrat nativ în apt pe Raspberry Pi OS',
      works_with_os: ['Raspberry Pi OS Bookworm', 'Ubuntu 24.04 ARM64']
    },
    datasheet_url: 'https://datasheets.raspberrypi.com/ai-hat/ai-hat-plus-product-brief.pdf',
    image_url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    badge: '26 TOPS Official',
    tags: ['niche', 'hailo-8', 'ai-accelerator', 'raspberry-pi-5', 'neural-network'],
    rating: 4.98,
    review_count: 10,
    featured: true
  },
  {
    slug: 'intel-neural-compute-stick-2-myriad-x-refurb',
    name: 'Intel Neural Compute Stick 2 (Myriad X VPU Edge AI - Refurbished Lab)',
    sku: 'INTEL-NCS2-REFURB',
    mpn: 'NCSM2485.DK-LAB',
    category_id: 6,
    subcategory: 'Compute Accelerators',
    price_ron: 289.99,
    old_price_ron: 349.99,
    stock: 7,
    stock_status: 'in_stock',
    short_desc: 'Stick USB 3.0 de accelerare deep learning bazat pe procesorul vizual Intel Movidius Myriad X și OpenVINO.',
    full_desc: 'Intel NCS 2 este acceleratorul USB clasic pentru inferență rapidă a rețelelor neurale convoluționale pe dispozitive fără slot PCIe sau GPU dedicat. Compatibil cu toolkit-ul OpenVINO, permite rularea detectoarelor de obiecte pe orice Mini PC sau Raspberry Pi.',
    technical_specs: {
      architecture: 'Intel Movidius Myriad X VPU',
      skill_level: 'Intermediate',
      processor: '16x SHAVE vector cores + Neural Compute Engine hardware',
      interface: 'USB 3.0 Type-A High-Speed',
      power_consumption: '1.5W - 2.5W',
      operating_voltage: '5V direct din portul USB',
      linux_support: 'Intel OpenVINO Toolkit pe Linux x86_64 și ARM64',
      works_with_os: ['Ubuntu Linux', 'Debian', 'Raspberry Pi OS']
    },
    datasheet_url: 'https://www.intel.com/content/www/us/en/developer/tools/neural-compute-stick/overview.html',
    image_url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
    badge: 'OpenVINO VPU',
    tags: ['niche', 'intel', 'myriad-x', 'ai-accelerator', 'openvino', 'usb-ai'],
    rating: 4.77,
    review_count: 6,
    featured: false
  },

    {
    slug: 'hak5-shark-jack-automated-pentest-tool',
    name: 'Hak5 Shark Jack — Automated Portable Ethernet Pentest Tool',
    sku: 'HAK5-SHARK-JACK',
    mpn: 'HAK5-SJ-V1',
    category_id: 7,
    subcategory: 'Network Security & Pentest',
    price_ron: 399.99,
    old_price_ron: 449.99,
    stock: 8,
    stock_status: 'in_stock',
    short_desc: 'Unealtă de audit rețea de buzunar: conectezi mufa RJ45, rulează Nmap în 15 secunde și salvează raportul pe stocarea internă.',
    full_desc: 'Hak5 Shark Jack este dedicat auditurilor fizice rapide autorizate de securitate a rețelelor. Dotat cu un sistem Linux independent, baterie internă Li-Po reîncărcabilă și comutator de payload-uri, efectuează scanări stealth de porturi și exfiltrare automată a datelor de telemetrie.',
    technical_specs: {
      architecture: 'MIPS Embedded Linux',
      skill_level: 'Intermediate',
      processor: 'MediaTek MT7688 SoC',
      ram: '64MB DDR2',
      storage: 'Stocare Flash integrată pentru scripturi DuckyScript și loguri',
      interfaces: ['Mufă RJ45 Ethernet tată', 'Port USB-C pentru încărcare și consolă SSH', 'LED RGB status', 'Comutator fizic de mod'],
      battery: 'Acumulator Li-Po integrat (15-20 minute autonomie activă)',
      linux_support: 'OpenWrt-based custom OS Hak5',
      works_with_os: ['Firmware nativ Hak5 SharkJack', 'SSH Linux Client']
    },
    datasheet_url: 'https://shop.hak5.org/products/shark-jack',
    image_url: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80',
    badge: 'Hak5 Rapid Audit',
    tags: ['cybersecurity', 'hak5', 'pentest', 'network-security', 'nmap', 'stealth'],
    rating: 4.92,
    review_count: 9,
    featured: true
  },
  {
    slug: 'hak5-plunder-bug-lan-tap-pocket-sniffer',
    name: 'Hak5 Plunder Bug LAN TAP Pocket Sniffer (Captură Pasivă USB-C)',
    sku: 'HAK5-PLUNDER-BUG',
    mpn: 'HAK5-PB-V1',
    category_id: 7,
    subcategory: 'Network Security & Pentest',
    price_ron: 349.99,
    old_price_ron: 399.99,
    stock: 12,
    stock_status: 'in_stock',
    short_desc: 'TAP hardware de rețea Gigabit ultra-compact: inserezi între două echipamente și capturezi tot traficul în Wireshark prin USB-C.',
    full_desc: 'Hak5 Plunder Bug este visul oricărui analist de securitate și sysadmin. Se introduce inline între orice switch și dispozitiv fără a întrerupe conexiunea Ethernet și emite o copie exactă a tuturor pachetelor către portul USB-C, gata de analiză în Wireshark sau tcpdump.',
    technical_specs: {
      architecture: 'Hardware Network TAP',
      skill_level: 'Intermediate',
      ports: '2x Porturi RJ45 Gigabit Ethernet 10/100/1000Base-T (Pass-Through)',
      capture_interface: '1x Port USB Type-C High-Speed',
      stealth_mode: 'Complet invizibil pe rețea în modul pasiv (fără adresă IP sau MAC expus)',
      power_consumption: '< 1.5W via USB-C',
      linux_support: 'Apare ca placă de rețea USB standard sub Linux/macOS/Android',
      works_with_os: ['Wireshark', 'tcpdump', 'Android Root App Hak5']
    },
    datasheet_url: 'https://shop.hak5.org/products/plunder-bug',
    image_url: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80',
    badge: 'Gigabit TAP',
    tags: ['cybersecurity', 'hak5', 'lan-tap', 'wireshark', 'packet-capture', 'network'],
    rating: 4.94,
    review_count: 11,
    featured: false
  },
  {
    slug: 'flipper-zero-wifi-devboard-esp32s2-marauder',
    name: 'Flipper Zero Wi-Fi Devboard (ESP32-S2 Marauder Pre-Configurat)',
    sku: 'FLIPPER-WIFI-DEVBOARD',
    mpn: 'FZ-DEVBOARD-WIFI',
    category_id: 7,
    subcategory: 'Wireless & RF Security',
    price_ron: 229.99,
    old_price_ron: 269.99,
    stock: 20,
    stock_status: 'in_stock',
    short_desc: 'Modul oficial de extensie Wi-Fi pentru Flipper Zero cu cip ESP32-S2, compatibil Black Magic Debug și firmware Marauder.',
    full_desc: 'Placa de dezvoltare Wi-Fi se montează direct pe headerul GPIO al Flipper Zero, extinzând capabilitățile dispozitivului către rețelele wireless 802.11 b/g/n. Permite scanarea pachetelor beacon, detectarea atacurilor de deautentificare și depanarea wireless via GDB.',
    technical_specs: {
      architecture: 'ESP32-S2 Wireless',
      skill_level: 'Intermediate',
      processor: 'Espressif ESP32-S2FN4R2 32-bit LX7 @ 240MHz',
      interfaces: ['Header tată GPIO Flipper Zero', 'Port USB Type-C independent', 'Puncte de testare SWD'],
      operating_voltage: 'Alimentat din bateria Flipper Zero sau extern via USB-C',
      firmware_options: ['Black Magic Debug Probe', 'ESP32 Marauder Wi-Fi Pentest'],
      linux_support: 'Flasher esptool nativ pe Linux & macOS',
      works_with_os: ['Flipper Zero OS', 'Marauder CLI']
    },
    datasheet_url: 'https://docs.flipper.net/development/hardware/wifi-debugger-module',
    image_url: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80',
    badge: 'Flipper Add-on',
    tags: ['cybersecurity', 'flipper-zero', 'wifi', 'marauder', 'esp32-s2', 'rf'],
    rating: 4.96,
    review_count: 32,
    featured: true
  },
  {
    slug: 'flipper-zero-video-game-module-rp2040-dvi',
    name: 'Flipper Zero Video Game Module (RP2040 + Ieșire Video DVI + Senzor IMU)',
    sku: 'FLIPPER-VGM-RP2040',
    mpn: 'FZ-VGM-01',
    category_id: 7,
    subcategory: 'Hardware Research & Modding',
    price_ron: 299.99,
    old_price_ron: 349.99,
    stock: 14,
    stock_status: 'in_stock',
    short_desc: 'Modul RP2040 cu ieșire digitală video DVI către monitor, senzor inerțial IMU cu 6 axe și port USB-C programabil.',
    full_desc: 'Video Game Module transformă Flipper Zero într-o consolă portabilă cu ieșire directă pe monitor sau televizor via mufa DVI/HDMI. Conține un senzor giroscop/accelerometru cu 6 axe TDK și un microcontroler Raspberry Pi RP2040 gata de reprogramare în C/C++.',
    technical_specs: {
      architecture: 'Raspberry Pi RP2040 Microcontroller',
      skill_level: 'Beginner',
      processor: 'Raspberry Pi RP2040 Dual-Core Cortex-M0+ @ 133MHz',
      imu_sensor: 'TDK InvenSense ICM-42688-P 6-axis Gyroscope & Accelerometer',
      interfaces: ['Port video digital DVI-D / HDMI', 'Port USB-C', 'Conector GPIO Flipper Zero'],
      operating_voltage: '3.3V / 5V via Flipper Zero',
      power_consumption: '0.8W activ cu ieșire video 720p',
      linux_support: 'Suport complet Raspberry Pi Pico C/C++ SDK',
      works_with_os: ['Flipper Zero OS', 'Pico SDK Bare-metal']
    },
    datasheet_url: 'https://docs.flipper.net/video-game-module',
    image_url: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80',
    badge: 'HDMI Video Out',
    tags: ['cybersecurity', 'flipper-zero', 'rp2040', 'dvi', 'imu', 'gaming'],
    rating: 4.93,
    review_count: 14,
    featured: false
  },
  {
    slug: 'yard-stick-one-sub-1ghz-wireless-transceiver',
    name: 'Yard Stick One Sub-1GHz Wireless Transceiver (Great Scott Gadgets)',
    sku: 'GSG-YARD-STICK-ONE',
    mpn: 'YARDSTICK1-GSG',
    category_id: 7,
    subcategory: 'Wireless & RF Security',
    price_ron: 599.99,
    old_price_ron: 679.99,
    stock: 6,
    stock_status: 'in_stock',
    short_desc: 'Dongle USB radio Sub-1GHz cu amplificator +20dBm pentru cercetare protocoale ISM (300-348MHz, 391-464MHz, 782-928MHz).',
    full_desc: 'Creat de Michael Ossmann (Great Scott Gadgets), Yard Stick One este proiectat special pentru transmiterea și interceptarea pachetelor radio digitale pe frecvențe sub-gigahertz. Cu firmware RfCat pre-instalat, permite automatizarea auditului sistemelor de alarmă și barierelor în Python.',
    technical_specs: {
      architecture: 'Texas Instruments CC1111 Wireless SoC',
      skill_level: 'Advanced',
      frequencies: 'Banda 1: 300-348 MHz | Banda 2: 391-464 MHz | Banda 3: 782-928 MHz',
      tx_power: 'Amplificator hardware intern până la +20dBm (100mW)',
      modulations: 'ASK, OOK, 2-FSK, 4-FSK, GFSK, MSK',
      interfaces: ['Conector SMA mamă 50Ω pentru antenă', 'Port USB Type-A tată'],
      operating_voltage: '5V direct din USB',
      linux_support: 'Biblioteca RfCat pe Python 3 sub Linux și macOS',
      works_with_os: ['RfCat Python Library', 'Universal Radio Hacker']
    },
    datasheet_url: 'https://greatscottgadgets.com/yardstickone/',
    image_url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
    badge: 'Great Scott Gadgets',
    tags: ['cybersecurity', 'rf', 'sub-1ghz', 'yardstick', 'rfcat', 'wireless-audit'],
    rating: 4.97,
    review_count: 7,
    featured: false
  },

    {
    slug: 'dell-poweredge-r640-1u-2x-xeon-silver-64gb-ecc-refurb',
    name: 'Server Rack 1U Dell PowerEdge R640 Refurbished (2x Xeon Silver 4210, 64GB DDR4 ECC, 8x SFF, iDRAC9)',
    sku: 'DELL-R640-1U-REFURB',
    mpn: 'PE-R640-8SFF-LAB',
    category_id: 5,
    subcategory: 'Servere Rackmount',
    price_ron: 4999.99,
    old_price_ron: 5799.99,
    stock: 4,
    stock_status: 'in_stock',
    short_desc: 'Server enterprise 1U cu 2x procesoare Intel Xeon Silver 4210 (20 nuclee / 40 fire de execuție), 64GB ECC Reg, 8 sertare 2.5" și iDRAC9 Enterprise.',
    full_desc: 'Dell PowerEdge R640 este coloana vertebrală a centrelor de date moderne. Formatul său compact 1U oferă o densitate masivă de calcul cu două socket-uri LGA3647, controller RAID PERC H730P cu baterie de cache, management iDRAC9 Enterprise cu HTML5 KVM complet și două surse de alimentare redundante Titanium de 750W.',
    technical_specs: {
      architecture: 'x86_64 Dual Socket LGA3647',
      skill_level: 'Expert',
      processor: '2x Intel Xeon Silver 4210 (10C/20T @ 2.2GHz, Turbo 3.2GHz, 13.75MB Cache fiecare) = 20C / 40T',
      ram: '64GB DDR4-2933 MHz ECC Registered RDIMM (extensibil la 1.5TB în 24 sloturi)',
      storage_bays: '8x Sertare 2.5" SFF SAS/SATA/NVMe Hot-Plug (tăvițe incluse)',
      raid_controller: 'Dell PERC H730P 2GB NV Cache (suport RAID 0, 1, 5, 6, 10, 50, 60 sau HBA passthrough)',
      network: 'Placă rNDC Dell Broadcom Quad-Port (2x 10GbE SFP+ + 2x 1GbE RJ45)',
      remote_management: 'iDRAC9 Enterprise cu licență dedicată (KVM virtual HTML5, Remote Media, Power Cap)',
      power_supplies: '2x 750W Titanium Hot-Plug Redundante 80 PLUS',
      form_factor: 'Rackmount 19" 1U (Șine ReadyRails originale incluse)',
      operating_voltage: '100-240V AC Redundant',
      linux_support: 'Certificat Proxmox VE 8.x, VMware ESXi 7/8, TrueNAS SCALE, RHEL/Debian',
      works_with_os: ['Proxmox VE', 'TrueNAS SCALE', 'VMware ESXi', 'Ubuntu Server', 'Debian']
    },
    datasheet_url: 'https://i.dell.com/sites/csdocuments/Shared-Content_data-Sheets_Documents/en/poweredge-r640-spec-sheet.pdf',
    image_url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
    badge: 'Enterprise 1U Flagship',
    tags: ['enterprise', 'server', 'dell', 'xeon', 'proxmox', '10gbe', 'idrac9', 'rack1u'],
    rating: 4.99,
    review_count: 7,
    featured: true
  },
  {
    slug: 'dell-poweredge-r740-2u-2x-xeon-gold-128gb-ecc-refurb',
    name: 'Server Rack 2U Dell PowerEdge R740 Refurbished (2x Xeon Gold 6138, 128GB DDR4 ECC, 16x SFF)',
    sku: 'DELL-R740-2U-REFURB',
    mpn: 'PE-R740-16SFF-LAB',
    category_id: 5,
    subcategory: 'Servere Rackmount',
    price_ron: 7899.99,
    old_price_ron: 8999.99,
    stock: 3,
    stock_status: 'in_stock',
    short_desc: 'Monster de virtualizare 2U: 2x Xeon Gold 6138 (40 nuclee / 80 thread-uri), 128GB ECC Reg, 16x lăcașuri 2.5", surse duble 1100W.',
    full_desc: 'Dell PowerEdge R740 oferă un echilibru impecabil între capacitatea de stocare, numărul de sloturi PCIe pentru acceleratoare grafice sau plăci 25G/100G și o putere brută de 40 nuclee fizice Xeon Gold. Ideal pentru noduri masive Ceph, clustere de calcul Kubernetes și virtualizare VMware/Proxmox.',
    technical_specs: {
      architecture: 'x86_64 Dual Socket LGA3647',
      skill_level: 'Expert',
      processor: '2x Intel Xeon Gold 6138 (20C/40T @ 2.0GHz, Turbo 3.7GHz, 27.5MB Cache per CPU) = 40 Cores / 80 Threads',
      ram: '128GB DDR4-2666 MHz ECC Registered RDIMM (extensibil la 3TB)',
      storage_bays: '16x Lăcașuri 2.5" SFF SAS-12G/SATA-6G Hot-Plug',
      expansion_slots: '8x Sloturi PCIe Gen3 (suport până la 3x GPU-uri dublu-slot de 300W)',
      network: 'Intel X520/I350 rNDC Daughter Card (2x 10GbE SFP+ + 2x 1GbE RJ45)',
      remote_management: 'iDRAC9 Enterprise cu port dedicat gigabit',
      power_supplies: '2x 1100W Platinum Hot-Plug Redundante',
      form_factor: 'Rackmount 19" 2U (Șine glisante incluse)',
      operating_voltage: '100-240V AC Redundant',
      linux_support: 'Proxmox VE, ESXi, TrueNAS SCALE, Ceph, Kubernetes',
      works_with_os: ['Proxmox VE', 'TrueNAS SCALE', 'ESXi 8.0', 'CentOS Stream', 'Ubuntu Server']
    },
    datasheet_url: 'https://i.dell.com/sites/csdocuments/Shared-Content_data-Sheets_Documents/en/poweredge-r740-spec-sheet.pdf',
    image_url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
    badge: '40 Cores / 80 Threads',
    tags: ['enterprise', 'server', 'dell', 'xeon-gold', 'virtualization', 'ceph', 'rack2u'],
    rating: 5.0,
    review_count: 5,
    featured: true
  },
  {
    slug: 'dell-optiplex-7070-micro-tiny-pc-i5-16gb-nvme',
    name: 'Dell OptiPlex 7070 Micro Tiny PC (Intel Core i5-9500T 6-Core, 16GB RAM, 512GB NVMe - Proxmox Node)',
    sku: 'DELL-OPTIPLEX-7070-MFF',
    mpn: 'OPTIPLEX-7070-MFF-LAB',
    category_id: 5,
    subcategory: 'Mini PC & Thin Clients',
    price_ron: 1199.99,
    old_price_ron: 1399.99,
    stock: 12,
    stock_status: 'in_stock',
    short_desc: 'Nod de homelab silențios și eficient energetic de doar 1 Litru: 6 nuclee native i5, 16GB DDR4, slot M.2 NVMe și consum mediu de sub 12W.',
    full_desc: 'Dell OptiPlex Micro 7070 este alegerea numărul 1 pentru arhitectura modernă de micro-clustere Proxmox VE „TinyMiniMicro”. Consumul redus la priză combinat cu un procesor hexacore cu 6 fire de execuție la 35W TDP și suport pentru două unități de stocare îl fac un nod de încredere.',
    technical_specs: {
      architecture: 'x86_64',
      skill_level: 'Beginner',
      processor: 'Intel Core i5-9500T 6 Cores / 6 Threads @ 2.2GHz (Turbo 3.7GHz, 9MB Cache, 35W TDP)',
      ram: '16GB DDR4-2666 MHz SODIMM (extensibil la 64GB în 2 sloturi)',
      storage: '512GB M.2 PCIe 3.0 x4 NVMe SSD + Conector intern SATA 2.5" liber',
      interfaces: ['Intel I219-LM Gigabit Ethernet', '2x DisplayPort 1.2 4K60', '1x USB 3.1 Gen2 Type-C', '5x USB 3.1 Type-A'],
      operating_voltage: '19.5V DC (Alimentator Dell 65W original inclus)',
      power_consumption: '8W idle, 32W sarcină maximă completă',
      dimensions: '182 x 178 x 36 mm (Volum 1 Litru)',
      linux_support: '100% suport Linux fără drivere externe',
      works_with_os: ['Proxmox VE', 'Debian', 'Ubuntu Server', 'TrueNAS SCALE', 'ESXi']
    },
    datasheet_url: 'https://i.dell.com/sites/csdocuments/Shared-Content_data-Sheets_Documents/en/optiplex-7070-spec-sheet.pdf',
    image_url: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80',
    badge: 'Proxmox Tiny Node',
    tags: ['enterprise', 'mini-pc', 'dell', 'proxmox', 'homelab', 'low-power', 'tinyminimicro'],
    rating: 4.93,
    review_count: 15,
    featured: true
  },
  {
    slug: 'nvidia-tesla-t4-16gb-gddr6-pcie-passive-gpu-refurb',
    name: 'NVIDIA Tesla T4 16GB GDDR6 PCIe 3.0 x16 Passive GPU (AI Inference & vGPU Lab - Refurbished)',
    sku: 'NVIDIA-TESLA-T4-16GB',
    mpn: 'TESLA-T4-16G-LAB',
    category_id: 5,
    subcategory: 'Acceleratoare Grafice & AI',
    price_ron: 3499.99,
    old_price_ron: 3999.99,
    stock: 5,
    stock_status: 'in_stock',
    short_desc: 'Accelerator AI enterprise de 70W: 2560 nuclee CUDA, 320 nuclee Tensor, 16GB GDDR6 ECC VRAM fără conector separat de alimentare PCIe.',
    full_desc: 'NVIDIA Tesla T4 este placa grafică favorită a utilizatorilor de servere 1U/2U și Proxmox vGPU. Datorită consumului de doar 70W alimentat exclusiv din slotul PCIe x16, nu necesită cabluri de alimentare suplimentare, oferind 16GB de memorie video ECC pentru rularea modelelor de limbaj (Ollama, vLLM) și transcodare video 4K.',
    technical_specs: {
      architecture: 'NVIDIA Turing GPU (TU104)',
      skill_level: 'Expert',
      cuda_cores: '2560 nuclee CUDA + 320 Tensor Cores (Turing)',
      vram: '16GB GDDR6 cu corecție a erorilor ECC pe magistrală de 256-bit (320 GB/s lățime de bandă)',
      interface: 'PCIe 3.0 x16 profil redus / profil complet',
      cooling: 'Răcire pasivă pentru servere cu flux de aer forțat (opțional kit ventilator 50mm pentru carcase desktop)',
      power_consumption: '70W TDP (alimentare 100% din slotul PCIe)',
      vgpu_support: 'Suport oficial NVIDIA GRID vGPU (partiționare VRAM între VM-uri)',
      linux_support: 'NVIDIA Enterprise Linux Drivers & CUDA Toolkit',
      works_with_os: ['Proxmox VE (vGPU unlock / passthrough)', 'Ubuntu Server', 'Debian']
    },
    datasheet_url: 'https://www.nvidia.com/en-us/data-center/tesla-t4/',
    image_url: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=800&q=80',
    badge: '70W AI vGPU',
    tags: ['enterprise', 'nvidia', 'tesla-t4', 'ai-inference', 'ollama', 'vgpu', 'cuda'],
    rating: 4.97,
    review_count: 8,
    featured: true
  },

    {
    slug: 'seagate-exos-x18-16tb-enterprise-sata-hdd',
    name: 'Seagate Exos X18 16TB Enterprise SATA 3.5" HDD 7200RPM 256MB Cache (ST16000NM000J)',
    sku: 'SEAGATE-EXOS-X18-16TB',
    mpn: 'ST16000NM000J',
    category_id: 2,
    subcategory: 'Storage & HDD Homelab',
    price_ron: 1199.99,
    old_price_ron: 1349.99,
    stock: 16,
    stock_status: 'in_stock',
    short_desc: 'Hard disk enterprise cu heliu sigilat de 16TB formatat: 7200 RPM, 256MB cache, 2.5 milioane ore MTBF și anduranță 550TB/an.',
    full_desc: 'Seagate Exos X18 este etalonul fiabilității pentru stocarea ZFS în servere TrueNAS și Unraid. Tehnologia Helium reduce fricțiunea internă și consumul de energie, permițând viteze de transfer susținute de peste 260 MB/s în mod silențios.',
    technical_specs: {
      capacity: '16TB (16.000 GB)',
      form_factor: '3.5" HDD standard',
      interface: 'SATA 6 Gb/s',
      spindle_speed: '7200 RPM',
      cache: '256MB Multisegmented DRAM Cache',
      technology: 'CMR (Conventional Magnetic Recording) + Heliu sigilat ermetic',
      workload_rating: '550 TB/an (5x mai mare decât hard disk-urile desktop)',
      mtbf: '2.500.000 ore',
      power_consumption: '5.3W idle, 8.8W operare susținută',
      linux_support: 'Nativ sub ZFS, mdadm, Btrfs, ext4',
      works_with_os: ['TrueNAS SCALE', 'Unraid', 'Proxmox VE', 'Linux']
    },
    datasheet_url: 'https://www.seagate.com/files/www-content/datasheets/pdfs/exos-x18-channel-DS2049-2-2007US-en_US.pdf',
    image_url: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=800&q=80',
    badge: '16TB Helium CMR',
    tags: ['homelab', 'storage', 'hdd', 'zfs', 'truenas', '16tb', 'seagate'],
    rating: 4.95,
    review_count: 21,
    featured: true
  },
  {
    slug: 'wd-red-plus-8tb-nas-hdd-cmr-5640rpm',
    name: 'Western Digital Red Plus 8TB NAS HDD 3.5" CMR 5640RPM 256MB Cache (WD80EFPX)',
    sku: 'WD-RED-PLUS-8TB-CMR',
    mpn: 'WD80EFPX',
    category_id: 2,
    subcategory: 'Storage & HDD Homelab',
    price_ron: 849.99,
    old_price_ron: 949.99,
    stock: 14,
    stock_status: 'in_stock',
    short_desc: 'Hard disk silențios dedicat NAS de 8TB cu tehnologie garantată CMR: 5640 RPM, compatibil 24/7 cu până la 8 sertare.',
    full_desc: 'Western Digital Red Plus este alegerea clasică a utilizatorilor de homelab care își țin serverul de stocare în birou sau sufragerie. Turația de 5640 RPM oferă un nivel de zgomot extrem de redus, fără a sacrifica performanța necesară pentru matrici RAID-Z2.',
    technical_specs: {
      capacity: '8TB (8.000 GB)',
      form_factor: '3.5" HDD',
      interface: 'SATA 6 Gb/s',
      recording_technology: 'CMR (Conventional Magnetic Recording - 100% sigur pentru ZFS resilvering)',
      spindle_speed: '5640 RPM (funcționare ultra-silențioasă)',
      cache: '256MB',
      power_consumption: '3.4W idle, 5.2W operare',
      linux_support: 'Compatibil cu toate distribuțiile NAS Linux și FreeBSD',
      works_with_os: ['TrueNAS', 'Synology DSM', 'QNAP QTS', 'Proxmox VE']
    },
    datasheet_url: 'https://www.westerndigital.com/products/internal-drives/wd-red-plus-sata-3-5-hdd',
    image_url: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=800&q=80',
    badge: 'Silențios CMR',
    tags: ['homelab', 'storage', 'hdd', 'nas', 'wd-red', 'cmr', 'truenas'],
    rating: 4.88,
    review_count: 17,
    featured: false
  },
  {
    slug: 'crucial-32gb-2x16gb-ddr4-3200-sodimm-kit',
    name: 'Crucial 32GB (2x16GB) DDR4 3200MHz CL22 SODIMM Kit (Upgrade RAM Homelab)',
    sku: 'CRUCIAL-DDR4-32GB-KIT',
    mpn: 'CT2K16G4SFRA32A',
    category_id: 2,
    subcategory: 'Memorie RAM Homelab',
    price_ron: 299.99,
    old_price_ron: 349.99,
    stock: 26,
    stock_status: 'in_stock',
    short_desc: 'Kit dual channel de 32GB (2x 16GB) DDR4 SODIMM la 1.2V pentru Minisforum MS-01, noduri Intel N100 și Dell OptiPlex Micro.',
    full_desc: 'Memoria RAM este resursa numărul 1 epuizată în orice homelab Proxmox. Acest kit de 32GB Crucial garantează stabilitate de 100% la tensiunea standard de 1.2V JEDEC, fără a necesita configurări XMP/DOCP în BIOS.',
    technical_specs: {
      capacity: '32GB Kit (2x module de 16GB)',
      type: 'DDR4-3200 PC4-25600 260-Pin Non-ECC SODIMM',
      timings: 'CL22 (22-22-22)',
      voltage: '1.2V Standard JEDEC',
      compatibility: 'Minisforum MS-01, Mini PC N100, Dell Micro, Lenovo Tiny, HP Mini, QNAP/Synology SODIMM',
      linux_support: 'Recunoscut nativ la frecvența completă 3200MHz fără profil XMP'
    },
    datasheet_url: 'https://www.crucial.com/memory/ddr4/ct2k16g4sfra32a',
    image_url: 'https://images.unsplash.com/photo-1562975871-2244243a3d56?auto=format&fit=crop&w=800&q=80',
    badge: 'Homelab RAM Staple',
    tags: ['homelab', 'ram', 'sodimm', 'ddr4', 'upgrade', 'proxmox'],
    rating: 4.96,
    review_count: 28,
    featured: false
  },
  {
    slug: 'patch-panel-19-inch-1u-24-porturi-keystone-ecranat',
    name: 'Panou Patch Panel 19" 1U 24 Porturi Ecranate Cat6A Keystone cu Suport Cablu',
    sku: 'PATCH-PANEL-19-1U-24P',
    mpn: 'PP-19-1U-24K-STP',
    category_id: 2,
    subcategory: 'Accesorii Rack 19"',
    price_ron: 149.99,
    old_price_ron: 179.99,
    stock: 20,
    stock_status: 'in_stock',
    short_desc: 'Panou patch metalic SPCC 1U pentru rack de 19" cu 24 de porturi modulare Keystone și bară posterioară de degrevare mecanică.',
    full_desc: 'Esențial pentru un rack de homelab curat și profesional. Rama metalică ecranată acceptă orice conector modular standard Keystone: RJ45 Cat6/Cat6A, cuple LC fibră optică duplex, HDMI sau USB-C passthrough.',
    technical_specs: {
      form_factor: 'Rack 19" standard, înălțime 1U',
      ports: '24 porturi modulare standard Keystone',
      material: 'Oțel SPCC laminat la rece de 1.5mm, vopsit electrostatic negru mat',
      features: 'Bară posterioară de susținere și prindere cu bride a cablurilor + fir de împământare inclus',
      compatibility: 'Module Keystone UTP / FTP / STP, LC Fibră, HDMI'
    },
    image_url: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80',
    badge: 'Rack 19" 1U',
    tags: ['homelab', 'rack', 'patch-panel', 'keystone', 'networking', 'cable-management'],
    rating: 4.92,
    review_count: 14,
    featured: false
  },
  {
    slug: 'pdu-rackmount-19-inch-1u-8-prize-schuko-protectie',
    name: 'Unitate PDU Rackmount 19" 1U cu 8 Prize Schuko, Întrerupător și Protecție Supratensiune',
    sku: 'PDU-19-1U-8-SCHUKO',
    mpn: 'PDU-19-1U-8SK-SW',
    category_id: 2,
    subcategory: 'Alimentare & PDU Rack',
    price_ron: 129.99,
    old_price_ron: 159.99,
    stock: 22,
    stock_status: 'in_stock',
    short_desc: 'Bloc de distribuție a alimentării (PDU) 1U din profil de aluminiu robust cu 8 prize Schuko la 45°, sarcină 16A / 3680W.',
    full_desc: 'Unitatea PDU Rack 19" 1U oferă distribuție sigură și fiabilă a energiei electrice pentru echipamentele din dulapul de homelab. Carcasa din aluminiu rigid rezistă la torsiune, iar prizele orientate la 45° permit conectarea alimentatoarelor masive fără a bloca prizele adiacente.',
    technical_specs: {
      form_factor: 'Montare în rack de 19", înălțime 1U (urechi de montaj incluse)',
      outlets: '8x Prize Schuko CEE 7/4 orientate ergonomic la 45°',
      rating: '16A / 250V AC (Putere maximă admisă: 3680 Watt)',
      protection: 'Modul de protecție la supratensiune integrat (SPD) + Întrerupător basculant cu capac de protecție transparent',
      cable: 'Cablu flexibil H05VV-F 3G1.5mm² lungime 2.0 metri cu ștecher Schuko turnat'
    },
    image_url: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80',
    badge: '16A Heavy Duty',
    tags: ['homelab', 'pdu', 'rack', 'alimentare', 'schuko', 'protectie-supratensiune'],
    rating: 4.95,
    review_count: 19,
    featured: false
  },

    {
    slug: 'shelly-plus-1pm-smart-relay-power-metering',
    name: 'Shelly Plus 1PM — Releu Inteligent Wi-Fi & Bluetooth cu Măsurare Consum Energie',
    sku: 'SHELLY-PLUS-1PM',
    mpn: 'SNSW-001P16EU',
    category_id: 3,
    subcategory: 'Relee Inteligente & Smart Home',
    price_ron: 79.99,
    old_price_ron: 94.99,
    stock: 35,
    stock_status: 'in_stock',
    short_desc: 'Releu inteligent de 16A cu procesor ESP32 intern, măsurare exactă a puterii active (W/kWh), protecție la supratemperatură și integrare MQTT.',
    full_desc: 'Shelly Plus 1PM este releul favorit al comunității Home Assistant. Se instalează discret în doza de aparat sau tabloul electric, raportând în timp real consumul energetic în wați al serverelor, aerului condiționat sau electrocasnicelor, cu suport local REST API și MQTT fără a depinde de cloud.',
    technical_specs: {
      processor: 'Espressif ESP32 160MHz intern',
      connectivity: 'Wi-Fi 802.11 b/g/n + Bluetooth 4.2 pentru împerechere rapidă',
      capacity: 'Până la 16A / 3840W sarcină rezistivă',
      power_metering: 'Măsurare consum instantaneu în Wați și energie acumulată în kWh',
      safety: 'Protecție automată hardware la supratemperatură și supratensiune',
      operating_voltage: '110-240V AC sau 24-30V DC',
      linux_support: 'Home Assistant Native Integration (Zero-Conf local), MQTT, ESPHome/Tasmota flashable'
    },
    datasheet_url: 'https://www.shelly.com/en/products/shop/shelly-plus-1-pm',
    image_url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
    badge: 'Home Assistant Native',
    tags: ['iot', 'shelly', 'power-monitoring', 'home-assistant', 'mqtt', 'esp32'],
    rating: 4.96,
    review_count: 42,
    featured: true
  },
  {
    slug: 'hilink-hlk-ld2410c-24ghz-mmwave-presence-radar',
    name: 'Hi-Link HLK-LD2410C 24GHz mmWave Human Presence Radar Sensor (Bluetooth & UART)',
    sku: 'HILINK-LD2410C-RADAR',
    mpn: 'HLK-LD2410C-BT',
    category_id: 3,
    subcategory: 'Senzori Prezență & Mișcare',
    price_ron: 39.99,
    old_price_ron: 49.99,
    stock: 40,
    stock_status: 'in_stock',
    short_desc: 'Senzor radar milimetric 24GHz FMCW: detectează prezența umană statică (respirație la birou sau somn) până la 6 metri distanță.',
    full_desc: 'Adio stingere a luminilor în timp ce lucrezi nemișcat la birou! Spre deosebire de senzorii PIR clasici care necesită mișcare fizică mare, radarul mmWave HLK-LD2410C măsoară micro-mișcările cutiei toracice, trimițând starea instantaneu prin UART sau pin digital OUT către ESPHome.',
    technical_specs: {
      technology: '24GHz FMCW Radar milimetric cu antenă integrată pe PCB',
      detection_range: 'Până la 6 metri distanță, unghi de acoperire 60°',
      interfaces: ['UART Serial (115200 bps)', 'Pin OUT nivel logic 3.3V', 'Bluetooth Low Energy pentru calibrare mobilă'],
      operating_voltage: '5V DC (consum mediu ~79mA)',
      features: 'Porți de distanță configurabile independent (sensibilitate separată pentru mișcare și prezență statică)',
      linux_support: 'Componentă oficială nativă în ESPHome (ld2410)'
    },
    datasheet_url: 'https://www.hlktech.net/index.php?id=1095',
    image_url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    badge: 'Micro-Motion Radar',
    tags: ['iot', 'radar', 'mmwave', 'presence', 'esphome', 'home-assistant', 'sensors'],
    rating: 4.92,
    review_count: 27,
    featured: false
  }
];

export async function expandAndSeed() {
  console.log('Updating catalog pricing...');

    const updatedExisting = productsData.map(p => {
    const newPrice = charmPrice(p.price_ron);
    const newOldPrice = charmOldPrice(p.old_price_ron, newPrice);
    return {
      ...p,
      price_ron: newPrice,
      old_price_ron: newOldPrice
    };
  });

    const processedNew = additionalProducts.map(p => {
    const newPrice = charmPrice(p.price_ron);
    const newOldPrice = charmOldPrice(p.old_price_ron, newPrice);
    return {
      ...p,
      price_ron: newPrice,
      old_price_ron: newOldPrice
    };
  });

  // Check for any slug duplicates
  const existingSlugs = new Set(updatedExisting.map(p => p.slug));
  const uniqueNew = processedNew.filter(p => !existingSlugs.has(p.slug));

  const allCombinedProducts = [...updatedExisting, ...uniqueNew];
  console.log(`Total combined products: ${allCombinedProducts.length} (Existing: ${updatedExisting.length}, Added New: ${uniqueNew.length})`);

  // Verify all prices end in .99
  let invalidPrices = 0;
  for (const p of allCombinedProducts) {
    const priceStr = p.price_ron.toFixed(2);
    if (!priceStr.endsWith('.99')) {
      console.warn(`Warning: Product ${p.slug} has price ${p.price_ron} which does not end in .99`);
      invalidPrices++;
    }
  }
  if (invalidPrices === 0) {
    console.log('[VERIFIED] 100% of products have verified charm pricing ending strictly in .99!');
  }

    const seedFilePath = path.join(__dirname, 'seed.ts');
  const fileContent = `import { pool, initDatabase } from './db.js';

export const categoriesData = ${JSON.stringify(categoriesData, null, 2)};

export const productsData = ${JSON.stringify(allCombinedProducts, null, 2)};

export async function seedDatabase() {
  console.log('Seeding categories and extended products catalog...');
  const conn = await pool.getConnection();
  try {
    // Upsert Categories
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

    // Upsert Products
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
  console.log('Wrote updated seed.ts file successfully.');

    await initDatabase();
  const conn = await pool.getConnection();
  try {
    for (const prod of allCombinedProducts) {
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
    console.log(`Successfully migrated and upserted all ${allCombinedProducts.length} products into MySQL!`);
  } finally {
    conn.release();
  }
}

expandAndSeed().then(() => {
  console.log('All done!');
  process.exit(0);
}).catch(err => {
  console.error('Error during expansion:', err);
  process.exit(1);
});
