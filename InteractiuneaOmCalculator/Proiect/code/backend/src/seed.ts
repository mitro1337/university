import { pool, initDatabase } from './db.js';

export const categoriesData = [
  {
    "id": 1,
    "slug": "sbc-microcontrollers",
    "name": "Plăci de Dezvoltare & SBC",
    "icon": "cpu",
    "description": "Calculatoare pe o singură placă (SBC), microcontrolere avansate ARM/RISC-V, plăci Edge AI, module ESP32 Wi-Fi 6 / Zigbee și Arduino.",
    "sort_order": 1
  },
  {
    "id": 2,
    "slug": "homelab-networking",
    "name": "Homelab & Echipamente Rețea",
    "icon": "server",
    "description": "Noduri Mini PC Proxmox, plăci de rețea 10G/25G SFP28, gateway-uri UniFi, switch-uri MikroTik, transceivere optice și cabinete rack.",
    "sort_order": 2
  },
  {
    "id": 3,
    "slug": "sensors-iot",
    "name": "Senzori & Module IoT",
    "icon": "activity",
    "description": "Gateway-uri Home Assistant, coordonatoare Zigbee 3.0, senzori de calitate aer CO2 NDIR/VOC, telemetrie laser ToF, relee SSR și module industriale RS485.",
    "sort_order": 3
  },
  {
    "id": 4,
    "slug": "power-accessories",
    "name": "Alimentare, Răcire & Conectică",
    "icon": "zap",
    "description": "Surse industriale Mean Well, surse USB-PD 27W, UPS-uri rackmount, ventilatoare 1U server, regulatoare DC-DC Pololu, injectoare PoE și cabluri Cat6.",
    "sort_order": 4
  },
  {
    "id": 5,
    "slug": "enterprise-hardware",
    "name": "Infrastructură Enterprise & Datacenter",
    "icon": "database",
    "description": "Servere rackmount 1U/2U, plăci de rețea 25G/40G/100G Mellanox, controllere SAS HBA IT-Mode ZFS, SSD-uri Enterprise U.2 PLP și unități PDU administrate.",
    "sort_order": 5
  },
  {
    "id": 6,
    "slug": "niche-hardware",
    "name": "Hardware Nișat & Cercetare / Lab",
    "icon": "terminal",
    "description": "Dispozitive Apple legacy (A10/A10X) pentru Linux & checkm8, SBC-uri RK3588, plăci RISC-V, kituri FPGA, unelte de reverse engineering, sonde JTAG/SWD și module Software Defined Radio (SDR).",
    "sort_order": 6
  },
  {
    "id": 7,
    "slug": "cybersecurity-research",
    "name": "Cybersecurity & Security Research",
    "icon": "shield",
    "description": "Echipamente pentru audit de securitate autorizat și cercetare hardware: Flipper Zero, ecosistem Hak5 (WiFi Pineapple, LAN Turtle, Packet Squirrel, Rubber Ducky), unelte RFID/NFC (Proxmark3, ChameleonUltra), plăci ESP32 Marauder/Bruce, adaptoare monitor mode și TAP-uri hardware de rețea.",
    "sort_order": 7
  }
];

export const productsData = [
  {
    "slug": "raspberry-pi-5-8gb",
    "name": "Raspberry Pi 5 Model B - 8GB RAM LPDDR4X",
    "sku": "RPI5-8GB-EU",
    "mpn": "SC1112",
    "category_id": 1,
    "subcategory": "SBC ARM",
    "price_ron": 468.99,
    "old_price_ron": 498.99,
    "stock": 24,
    "stock_status": "in_stock",
    "short_desc": "SBC de generație nouă cu procesor Broadcom BCM2712 Quad-core Cortex-A76 @ 2.4GHz, interfață PCIe 2.0 x1 și suport dublu 4K60p.",
    "full_desc": "Raspberry Pi 5 introduce o performanță de procesare de până la 3x mai mare față de generația anterioară. Echipat cu controllerul dedicat I/O RP1 produs intern de Raspberry Pi, oferă performanțe USB 3.0 accelerate, lățime de bandă PCIe 2.0 pentru SSD-uri NVMe și porturi duble MIPI pentru camere/display-uri. Ideal pentru noduri de cluster Kubernetes, servere homelab, gateway-uri IoT și stații de lucru compacte.",
    "technical_specs": {
      "ram": "8GB LPDDR4X-4267 SDRAM",
      "storage": "Slot MicroSD UHS-I; PCIe 2.0 x1 expus via conector FPC 16-pin (suport M.2 NVMe HAT)",
      "processor": "Broadcom BCM2712 Quad-core ARM Cortex-A76 64-bit @ 2.4GHz cu criptare ARMv8",
      "dimensions": "88 x 56 x 17 mm",
      "interfaces": [
        "2x USB 3.0 (5Gbps)",
        "2x USB 2.0",
        "2x micro-HDMI 4K60p",
        "PCIe 2.0 x1",
        "40-Pin GPIO",
        "Gigabit Ethernet PoE+"
      ],
      "form_factor": "Standard Raspberry Pi B",
      "operating_voltage": "5.1V DC via USB-C (recomandat 27W PD)",
      "power_consumption": "Idle: 2.7W | Sarcină maximă: 12W"
    },
    "pinout_info": {
      "pin_map": [
        {
          "pin": "Pin 1",
          "name": "3V3 PWR",
          "function": "Ieșire alimentare 3.3V DC (max 500mA)"
        },
        {
          "pin": "Pin 2",
          "name": "5V PWR",
          "function": "Intrare/Ieșire 5V directă din sursă"
        },
        {
          "pin": "Pin 3",
          "name": "GPIO 2 (SDA1)",
          "function": "I2C Bus 1 Data (pull-up 1.8kΩ la 3.3V)"
        },
        {
          "pin": "Pin 5",
          "name": "GPIO 3 (SCL1)",
          "function": "I2C Bus 1 Clock (pull-up 1.8kΩ la 3.3V)"
        },
        {
          "pin": "Pin 6",
          "name": "GND",
          "function": "Masă electrică"
        },
        {
          "pin": "Pin 8",
          "name": "GPIO 14 (TXD0)",
          "function": "UART0 Transmit (port serial implicit)"
        },
        {
          "pin": "Pin 10",
          "name": "GPIO 15 (RXD0)",
          "function": "UART0 Receive (port serial implicit)"
        }
      ],
      "gpio_count": 28,
      "total_pins": 40,
      "logic_level": "3.3V LVCMOS (non-tolerat 5V)",
      "wiring_notes": [
        "Toți pinii GPIO funcționează la nivel logic de 3.3V. Aplicarea unei tensiuni de 5V direct pe pin va deteriora permanent procesorul.",
        "Pentru bootare de pe SSD NVMe de mare viteză este necesară activarea flagului `dtparam=pciex1` în /boot/firmware/config.txt."
      ]
    },
    "datasheet_url": "https://datasheets.raspberrypi.com/rpi5/raspberry-pi-5-product-brief.pdf",
    "image_url": "https://gomagcdn.ro/domains/robofun.ro/files/product/medium/raspberry-pi-rpi5-8gb-single-863297.jpg",
    "badge": "Top Vânzări",
    "tags": [
      "Raspberry Pi",
      "SBC",
      "ARM Cortex-A76",
      "PCIe 2.0",
      "Kubernetes",
      "Homelab"
    ],
    "rating": 4.95,
    "review_count": 42,
    "featured": true,
    "compatible_with": [
      "cooler-activ-oficial-raspberry-pi-5",
      "sursa-raspberry-pi-27w-usb-c",
      "panou-rack-1u-4x-raspberry-pi"
    ]
  },
  {
    "slug": "raspberry-pi-5-4gb",
    "name": "Raspberry Pi 5 Model B - 4GB RAM LPDDR4X",
    "sku": "RPI5-4GB-EU",
    "mpn": "SC1111",
    "category_id": 1,
    "subcategory": "SBC ARM",
    "price_ron": 378.99,
    "old_price_ron": 409.99,
    "stock": 18,
    "stock_status": "in_stock",
    "short_desc": "Varianta optimă ca raport performanță/preț a Raspberry Pi 5, cu 4GB LPDDR4X, procesor Quad-core Cortex-A76 @ 2.4GHz și PCIe 2.0.",
    "full_desc": "Raspberry Pi 5 4GB oferă aceeași arhitectură de vârf Broadcom BCM2712 cu 4 nuclee Cortex-A76 la 2.4GHz, suport dual display 4K60p și conector PCIe pentru stocare ultrarapidă. Este alegerea perfectă pentru gateway-uri Home Assistant, ad-blockere Pi-hole, servere VPN WireGuard și proiecte de laborator unde 4GB de RAM sunt suficienți.",
    "technical_specs": {
      "ram": "4GB LPDDR4X-4267 SDRAM",
      "storage": "MicroSD UHS-I; PCIe 2.0 x1 expus",
      "processor": "Broadcom BCM2712 Quad-core ARM Cortex-A76 @ 2.4GHz",
      "dimensions": "88 x 56 x 17 mm",
      "interfaces": [
        "2x USB 3.0",
        "2x USB 2.0",
        "2x micro-HDMI 4K60",
        "PCIe 2.0 x1",
        "Gigabit Ethernet"
      ],
      "form_factor": "Standard Raspberry Pi B",
      "operating_voltage": "5.1V DC via USB-C (27W PD recomandat)",
      "power_consumption": "Idle: 2.5W | Sarcină: 11W"
    },
    "pinout_info": null,
    "datasheet_url": "https://datasheets.raspberrypi.com/rpi5/raspberry-pi-5-product-brief.pdf",
    "image_url": "https://gomagcdn.ro/domains/robofun.ro/files/product/medium/placa-raspberry-pi-4-model-b-4gb-copie-3095-2839.jpg",
    "badge": "Raport Optim",
    "tags": [
      "Raspberry Pi",
      "SBC",
      "ARM",
      "PCIe",
      "Home Assistant",
      "IoT"
    ],
    "rating": 4.9,
    "review_count": 28,
    "featured": false,
    "compatible_with": [
      "cooler-activ-oficial-raspberry-pi-5",
      "sursa-raspberry-pi-27w-usb-c"
    ]
  },
  {
    "slug": "nvidia-jetson-orin-nano-8gb-dev-kit",
    "name": "NVIDIA Jetson Orin Nano Developer Kit 8GB - 40 TOPS AI",
    "sku": "NV-ORIN-NANO-8GB",
    "mpn": "945-13766-0000-000",
    "category_id": 1,
    "subcategory": "Plăci Edge AI",
    "price_ron": 2449.99,
    "old_price_ron": 2689.99,
    "stock": 7,
    "stock_status": "in_stock",
    "short_desc": "Platformă revoluționară de Edge AI cu 40 TOPS putere de calcul AI, GPU Ampere cu 1024 nuclee CUDA, 32 Tensor Cores și 8GB LPDDR5.",
    "full_desc": "NVIDIA Jetson Orin Nano Developer Kit stabilește un nou standard de performanță pentru aplicațiile de inteligență artificială la margine de rețea. Cu 40 TOPS de calcul AI și o eficiență energetică reglabilă între 7W și 15W, accelerează rețele neuronale complexe pentru viziune computațională (YOLOv8, detecție obiecte în timp real), inferență LLM locală și robotică autonomă. Suportă NVIDIA JetPack SDK complet cu CUDA, cuDNN și TensorRT.",
    "technical_specs": {
      "cpu": "6-core ARM Cortex-A78AE v8.2 64-bit @ 1.5GHz",
      "gpu": "NVIDIA Ampere cu 1024 nuclee CUDA și 32 Tensor Cores",
      "ram": "8GB 128-bit LPDDR5 @ 68 GB/s",
      "display": "DisplayPort 1.2 (+MST)",
      "storage": "Slot dublu M.2 Key M (PCIe Gen3 x4 și x2 NVMe)",
      "dimensions": "100 x 79 x 21 mm",
      "video_input": "2x conectori MIPI CSI-2 22-pin pentru camere",
      "connectivity": "Gigabit Ethernet RJ45, slot M.2 Key E pentru Wi-Fi/BT",
      "ai_performance": "40 TOPS (sparse) / 20 TOPS (dense)",
      "power_consumption": "Selectabil între 7W și 15W (jack DC 9V-20V)"
    },
    "pinout_info": null,
    "datasheet_url": "https://developer.nvidia.com/embedded/jetson-orin-nano",
    "image_url": "https://gomagcdn.ro/domains/robofun.ro/files/product/large/nvidia-jetson-orin-nano-8gb-development-kit-044019.jpg",
    "badge": "40 TOPS Edge AI",
    "tags": [
      "NVIDIA",
      "Jetson",
      "Edge AI",
      "Ampere",
      "CUDA",
      "TensorRT",
      "Vision AI"
    ],
    "rating": 4.98,
    "review_count": 19,
    "featured": true,
    "compatible_with": [
      "sursa-industriala-mean-well-12v-12-5a",
      "cablu-patch-cord-cat6-utp-cupru-3m"
    ]
  },
  {
    "slug": "arduino-giga-r1-wifi",
    "name": "Arduino GIGA R1 WiFi - Dual-Core Cortex-M7/M4 + USB Host",
    "sku": "ARD-GIGA-R1",
    "mpn": "ABX00063",
    "category_id": 1,
    "subcategory": "Plăci Arduino & ARM Cortex",
    "price_ron": 344.99,
    "old_price_ron": 374.99,
    "stock": 12,
    "stock_status": "in_stock",
    "short_desc": "Cea mai puternică placă Arduino: procesor STM32H747XI Dual-Core (Cortex-M7 @ 480MHz + Cortex-M4 @ 240MHz), 76 GPIO și mufă USB-A Host.",
    "full_desc": "Arduino GIGA R1 WiFi este destinat creatorilor și inginerilor care au nevoie de putere extremă de calcul în formatul clasic Arduino Mega. Nucleul Cortex-M7 rulează algoritmi grei sau interfețe grafice, în timp ce nucleul Cortex-M4 gestionează în timp real comunicația și senzorii. Dispune de modul Wi-Fi/Bluetooth Murata 1DX, conector dedicat pentru camere ArduCam, intrare jack audio 3.5mm și mufă USB-A pentru tastaturi, memorii flash sau periferice HID.",
    "technical_specs": {
      "ram": "1MB RAM intern + 8MB SDRAM extern",
      "storage": "2MB Flash intern + 16MB QSPI Flash extern",
      "processor": "STMicroelectronics STM32H747XI Dual-core (Cortex-M7 @ 480MHz + Cortex-M4 @ 240MHz)",
      "interfaces": [
        "76x Digital I/O (12x PWM)",
        "12x Analog In",
        "2x DAC 12-bit",
        "4x UART",
        "3x I2C",
        "2x SPI",
        "1x CAN Bus",
        "USB Host Type-A"
      ],
      "audio_camera": "Jack Audio 3.5mm + conector cameră 20-pin",
      "connectivity": "Wi-Fi 802.11 b/g/n + Bluetooth 5.1 BLE",
      "input_voltage": "6V - 24V DC via Vin / jack alimentare",
      "operating_voltage": "3.3V Logic Level"
    },
    "pinout_info": null,
    "datasheet_url": "https://docs.arduino.cc/hardware/giga-r1-wifi",
    "image_url": "https://gomagcdn.ro/domains/robofun.ro/files/product/large/arduino-giga-r1-wifi-200944.jpeg",
    "badge": "Flagship Arduino",
    "tags": [
      "Arduino",
      "STM32",
      "Dual-Core",
      "Cortex-M7",
      "USB Host",
      "Wi-Fi"
    ],
    "rating": 4.92,
    "review_count": 14,
    "featured": true,
    "compatible_with": [
      "senzor-calitate-aer-bme680-voc",
      "senzor-calitate-aer-co2-scd41-ndir"
    ]
  },
  {
    "slug": "arduino-uno-r4-wifi",
    "name": "Arduino Uno R4 WiFi (Renesas RA4M1 + ESP32-S3 Cloud)",
    "sku": "ARD-UNO-R4-WIFI",
    "mpn": "ABX00087",
    "category_id": 1,
    "subcategory": "Plăci Arduino & ARM Cortex",
    "price_ron": 134.99,
    "old_price_ron": 149.99,
    "stock": 35,
    "stock_status": "in_stock",
    "short_desc": "Evoluția modernă a clasicului UNO cu procesor ARM Cortex-M4 la 48MHz, matrice de LED-uri 12x8 integrată, Wi-Fi/Bluetooth și canal CAN Bus.",
    "full_desc": "Arduino Uno R4 WiFi combină robustețea legendară a ecosistemului 5V UNO cu arhitectura ARM pe 32 de biți a procesorului Renesas RA4M1. Dispune de un coprocesor secundar ESP32-S3 pentru conectivitate cloud securizată, un DAC pe 12 biți, amplificator operațional integrat, protecție hardware la scurtcircuit și o matrice frontală cu 96 de LED-uri adresabile roșii pentru afișarea textelor și a animațiilor.",
    "technical_specs": {
      "ram": "32 KB SRAM",
      "storage": "256 KB Flash + 8 KB Data Flash",
      "processor": "Renesas RA4M1 (ARM Cortex-M4) tactat la 48 MHz",
      "interfaces": [
        "14x Digital I/O (6x PWM)",
        "6x Analog In (14-bit ADC)",
        "1x DAC 12-bit",
        "1x CAN Bus",
        "1x I2C Qwiic",
        "1x SPI"
      ],
      "form_factor": "Arduino UNO Standard R3 footprint",
      "connectivity": "Wi-Fi 802.11 b/g/n + BLE via ESP32-S3",
      "input_voltage": "6V - 24V DC prin mufa jack de alimentare",
      "operating_voltage": "5V DC Logic Level (Compatibil 100% cu shield-uri clasice UNO)"
    },
    "pinout_info": null,
    "datasheet_url": "https://docs.arduino.cc/resources/datasheets/ABX00087-datasheet.pdf",
    "image_url": "https://gomagcdn.ro/domains/robofun.ro/files/product/large/arduino-uno-r3-661539.webp",
    "badge": "Original Arduino",
    "tags": [
      "Arduino",
      "ARM Cortex-M4",
      "5V Logic",
      "CAN Bus",
      "Matrice LED"
    ],
    "rating": 4.9,
    "review_count": 24,
    "featured": false,
    "compatible_with": [
      "senzor-boscli-bme280-i2c",
      "breadboard-830-puncte-alimentare",
      "set-cabluri-dupont-120-buc"
    ]
  },
  {
    "slug": "arduino-mega-2560-r3",
    "name": "Arduino Mega 2560 R3 (ATmega2560 + ATmega16U2)",
    "sku": "ARD-MEGA-2560-R3",
    "mpn": "A000067",
    "category_id": 1,
    "subcategory": "Plăci Arduino & ARM Cortex",
    "price_ron": 88.99,
    "old_price_ron": 104.99,
    "stock": 29,
    "stock_status": "in_stock",
    "short_desc": "Placă masivă de dezvoltare cu 54 de pini digitali I/O, 16 intrări analogice, 4 porturi seriale UART hardware și memorie extinsă de 256KB.",
    "full_desc": "Arduino Mega 2560 R3 este alegerea clasică și extrem de fiabilă pentru imprimante 3D (RAMPS 1.4), roboți compuși și automatizări industriale cu zeci de senzori și relee. Dispune de procesorul ATmega2560 la 16MHz alimentat la 5V nativ, 4 porturi hardware UART independente și rezistență ridicată la zgomot electromagnetic.",
    "technical_specs": {
      "memory": "256 KB Flash (8KB bootloader), 8 KB SRAM, 4 KB EEPROM",
      "interfaces": [
        "54x Digital I/O (15x PWM)",
        "16x Analog In",
        "4x UART hardware",
        "1x SPI",
        "1x I2C"
      ],
      "input_voltage": "7V - 12V DC recomandat (maxim 20V)",
      "current_per_pin": "20 mA DC per pin I/O",
      "microcontroller": "ATmega2560 @ 16 MHz",
      "operating_voltage": "5V DC Logic Level"
    },
    "pinout_info": null,
    "datasheet_url": "https://docs.arduino.cc/hardware/mega-2560-rev3",
    "image_url": "https://gomagcdn.ro/domains/robofun.ro/files/product/medium/similar-arduino-mega-2560-r3-atmega2560-atmega16u2-placa-de-dezvoltare-compatibila-cu-arduino-cablu-805463.png",
    "badge": "54 Pini I/O",
    "tags": [
      "Arduino",
      "ATmega2560",
      "Robotică",
      "5V Logic",
      "RAMPS",
      "Automatizări"
    ],
    "rating": 4.88,
    "review_count": 31,
    "featured": false,
    "compatible_with": [
      "modul-4-relee-5v-optocuplate",
      "breadboard-830-puncte-alimentare"
    ]
  },
  {
    "slug": "raspberry-pi-pico-2-rp2350",
    "name": "Raspberry Pi Pico 2 - Dual-Core ARM Cortex-M33 / RISC-V Hazard3",
    "sku": "RPI-PICO-2",
    "mpn": "SC1631",
    "category_id": 1,
    "subcategory": "Microcontrolere ARM / RISC-V",
    "price_ron": 28.99,
    "old_price_ron": null,
    "stock": 48,
    "stock_status": "in_stock",
    "short_desc": "Noul siliciu RP2350 cu arhitectură comutabilă Dual Cortex-M33 / Dual Hazard3 RISC-V @ 150MHz, 520KB SRAM și securitate TrustZone.",
    "full_desc": "Raspberry Pi Pico 2 oferă un salt tehnologic masiv: utilizatorul poate alege la pornire fie două nuclee ARM Cortex-M33 la 150 MHz cu FPU, fie două nuclee RISC-V Hazard3 open-source. Dispune de securitate hardware avansată (Arm TrustZone, boot securizat semnat, SHA-256 accelerator), 520KB memorie SRAM și celebrele blocuri periferice programabile PIO (Programmable I/O).",
    "technical_specs": {
      "ram": "520 KB SRAM în 10 bănci independente",
      "storage": "4 MB QSPI Flash extern pe placă",
      "processor": "RP2350 dual core la alegere: 2x ARM Cortex-M33 @ 150MHz sau 2x RISC-V Hazard3",
      "dimensions": "51 x 21 mm",
      "interfaces": [
        "26x GPIO multifuncționale",
        "3x intrări analogice ADC 12-bit",
        "2x UART",
        "2x SPI",
        "2x I2C",
        "16x canale PWM",
        "3x blocuri PIO (12 state machines)"
      ],
      "operating_voltage": "1.8V - 5.5V DC (LDO intern cu ieșire 3.3V)",
      "power_consumption": "Sleep: 1.1 mA | Rulare tipică: 18 mA"
    },
    "pinout_info": null,
    "datasheet_url": "https://datasheets.raspberrypi.com/pico/pico-2-datasheet.pdf",
    "image_url": "https://gomagcdn.ro/domains/robofun.ro/files/product/medium/microcontroller-raspberry-pi-pico-rp2040-1-3242-9303.jpg",
    "badge": "Nou Siliciu RP2350",
    "tags": [
      "RP2350",
      "RISC-V",
      "Cortex-M33",
      "Pico 2",
      "TrustZone",
      "MicroPython"
    ],
    "rating": 4.96,
    "review_count": 17,
    "featured": true,
    "compatible_with": [
      "breadboard-830-puncte-alimentare",
      "senzor-boscli-bme280-i2c"
    ]
  },
  {
    "slug": "sparkfun-esp32-c6-thing-plus",
    "name": "SparkFun Thing Plus - ESP32-C6 Wi-Fi 6, BLE 5, Zigbee & Matter",
    "sku": "SF-THING-ESP32C6",
    "mpn": "WRL-22925",
    "category_id": 1,
    "subcategory": "Microcontrolere Zigbee & Matter",
    "price_ron": 77.99,
    "old_price_ron": 88.99,
    "stock": 21,
    "stock_status": "in_stock",
    "short_desc": "Microcontroler de ultimă generație RISC-V 160MHz cu suport complet Wi-Fi 6 (802.11ax), Bluetooth 5 LE, Zigbee 3.0 și Thread / Matter.",
    "full_desc": "SparkFun Thing Plus ESP32-C6 este puntea ideală către viitorul standardelor IoT unificate prin Matter și Thread. Bazat pe nucleul RISC-V Espressif la 160MHz, suportă moduri de economisire avansată a energiei pentru senzori pe baterie. Include conector Qwiic / STEMMA QT pentru conectare plug-and-play la senzori I2C fără lipituri, circuit de încărcare baterie LiPo și conector USB-C.",
    "technical_specs": {
      "ram": "512 KB SRAM + 16 KB Low-Power SRAM",
      "storage": "8 MB SPI Flash",
      "processor": "Espressif ESP32-C6 Single-Core RISC-V 32-bit @ 160 MHz",
      "interfaces": [
        "23x GPIO",
        "Qwiic I2C connector",
        "ADC 12-bit",
        "SPI",
        "UART",
        "PWM"
      ],
      "form_factor": "Feather footprint",
      "power_circuit": "Încărcător integrat MCP73831 pentru celule LiPo 3.7V",
      "wireless_protocols": "Wi-Fi 6 (2.4 GHz 802.11ax/b/g/n), Bluetooth 5 LE, IEEE 802.15.4 (Zigbee 3.0 & Thread)"
    },
    "pinout_info": null,
    "datasheet_url": "https://www.espressif.com/sites/default/files/documentation/esp32-c6_datasheet_en.pdf",
    "image_url": "https://gomagcdn.ro/domains/robofun.ro/files/product/large/a42aba49-bd2d-444b-8ab1-f9a2a3fb07ef-785937-6656-802000.jpg",
    "badge": "Wi-Fi 6 & Thread",
    "tags": [
      "ESP32-C6",
      "RISC-V",
      "Wi-Fi 6",
      "Zigbee",
      "Thread",
      "Matter",
      "Qwiic"
    ],
    "rating": 4.91,
    "review_count": 11,
    "featured": true,
    "compatible_with": [
      "senzor-calitate-aer-co2-scd41-ndir",
      "senzor-calitate-aer-bme680-voc"
    ]
  },
  {
    "slug": "adafruit-feather-esp32-s3-stemma",
    "name": "Adafruit Feather ESP32-S3 STEMMA QT - 8MB Flash Type-C",
    "sku": "ADA-FEATHER-ESP32S3",
    "mpn": "5477",
    "category_id": 1,
    "subcategory": "Microcontrolere Wi-Fi & BT",
    "price_ron": 83.99,
    "old_price_ron": 91.99,
    "stock": 19,
    "stock_status": "in_stock",
    "short_desc": "Placă Feather profesională cu ESP32-S3 Dual-Core Xtensa LX7 la 240MHz cu instrucțiuni vectoriale pentru Machine Learning la margine.",
    "full_desc": "Adafruit Feather ESP32-S3 oferă o integrare excepțională pentru proiecte avansate de IoT și inferență AI mică (TinyML). Dispune de suport USB nativ (poate emula tastaturi, mouse-uri sau drive-uri MIDI/MSC), conector STEMMA QT / Qwiic pentru senzori I2C, un LED RGB NeoPixel integrat și circuit de gestionare a energiei cu comutare automată USB/Baterie LiPo.",
    "technical_specs": {
      "ram": "512 KB SRAM intern",
      "power": "Conector JST-PH 2-pin pentru baterie LiPo cu monitor de tensiune",
      "storage": "8 MB Flash SPI",
      "processor": "ESP32-S3 Dual-Core Xtensa 32-bit LX7 @ 240 MHz cu instrucțiuni vectoriale",
      "interfaces": [
        "21x GPIO",
        "STEMMA QT I2C",
        "ADC 12-bit",
        "DAC",
        "Capacitive Touch",
        "USB OTG nativ"
      ],
      "connectivity": "Wi-Fi 802.11 b/g/n + Bluetooth 5 LE"
    },
    "pinout_info": null,
    "datasheet_url": "https://learn.adafruit.com/adafruit-esp32-s3-feather",
    "image_url": "https://gomagcdn.ro/domains/robofun.ro/files/product/large/adafruit-esp32-s3-feather-cu-stemma-qt-qwiic-8mb-flash-fara-psram-457182.jpg",
    "badge": "TinyML Ready",
    "tags": [
      "Adafruit",
      "ESP32-S3",
      "STEMMA QT",
      "Feather",
      "TinyML",
      "USB OTG"
    ],
    "rating": 4.89,
    "review_count": 16,
    "featured": false,
    "compatible_with": [
      "adafruit-can-bus-featherwing-mcp2515",
      "senzor-calitate-aer-bme680-voc"
    ]
  },
  {
    "slug": "esp32-s3-devkitc-1-n16r8",
    "name": "Modul ESP32-S3-DevKitC-1 N16R8 (16MB Flash, 8MB PSRAM)",
    "sku": "ESP32-S3-N16R8",
    "mpn": "ESP32-S3-WROOM-1-N16R8",
    "category_id": 1,
    "subcategory": "Microcontrolere Wi-Fi & BT",
    "price_ron": 41.99,
    "old_price_ron": 48.99,
    "stock": 65,
    "stock_status": "in_stock",
    "short_desc": "Vârf de gamă pentru microcontrolere Wi-Fi/BLE: Dual Core 240MHz cu instrucțiuni vectoriale AI, 16MB Octal Flash și 8MB Octal PSRAM.",
    "full_desc": "ESP32-S3-DevKitC-1 N16R8 este placa de dezvoltare supremă din gama Espressif pentru procesare locală de semnale audio, recunoaștere vocală offline, interfețe grafice complexe LVGL și gateway-uri Home Assistant avansate. Datorită celor 8MB de PSRAM ultra-rapid pe bus Octal SPI, elimină complet erorile de tip Out-Of-Memory în proiecte mari de MicroPython sau C++.",
    "technical_specs": {
      "ram": "512 KB SRAM intern + 8MB Octal PSRAM de mare viteză",
      "storage": "16MB Octal SPI Flash",
      "processor": "Espressif Xtensa 32-bit LX7 Dual-Core tactat la 240 MHz",
      "interfaces": [
        "45x GPIO expuse",
        "2x USB Type-C (1x UART/Prog + 1x USB OTG nativ)",
        "14x canale tactile capacitive",
        "ADC 12-bit SAR",
        "2x I2C",
        "4x SPI",
        "3x UART",
        "LCD Interface"
      ],
      "connectivity": "Wi-Fi 802.11 b/g/n (până la 150 Mbps) + Bluetooth 5 (LE) & Mesh",
      "ai_acceleration": "Instrucțiuni vectoriale dedicate pentru accelerarea rețelelor neuronale TinyML",
      "operating_voltage": "3.3V DC (alimentare 5V via conector dublu Type-C)"
    },
    "pinout_info": null,
    "datasheet_url": "https://www.espressif.com/sites/default/files/documentation/esp32-s3-wroom-1_wroom-1u_datasheet_en.pdf",
    "image_url": "https://gomagcdn.ro/domains/robofun.ro/files/product/large/adafruit-esp32-s3-feather-cu-stemma-qt-qwiic-8mb-flash-fara-psram-337586.jpg",
    "badge": "16MB Flash + 8MB PSRAM",
    "tags": [
      "ESP32-S3",
      "Octal PSRAM",
      "TinyML",
      "Home Assistant",
      "Wi-Fi",
      "BLE 5"
    ],
    "rating": 4.92,
    "review_count": 38,
    "featured": true,
    "compatible_with": [
      "senzor-calitate-aer-bme680-voc",
      "breadboard-830-puncte-alimentare"
    ]
  },
  {
    "slug": "esp32-wroom-32d-type-c",
    "name": "Placă de Dezvoltare ESP32-WROOM-32D Dual-Core Type-C",
    "sku": "ESP32-DEV-30P-C",
    "mpn": "ESP32-D0WDQ6-V3",
    "category_id": 1,
    "subcategory": "Microcontrolere Wi-Fi & BT",
    "price_ron": 25.99,
    "old_price_ron": 28.99,
    "stock": 82,
    "stock_status": "in_stock",
    "short_desc": "Placă clasică 30 de pini ESP32 cu conector USB Type-C, cip serial CH340C, Wi-Fi 2.4GHz și Bluetooth 4.2 BLE.",
    "full_desc": "Calul de bătaie al proiectelor DIY și al integrărilor Home Assistant (ESPHome/Tasmota). Echipat cu cipul verificat ESP32-D0WDQ6 pe 240MHz, 4MB Flash SPI, alimentare protejată și buton de BOOT/EN pentru scriere fără efort.",
    "technical_specs": {
      "ram": "520 KB SRAM",
      "storage": "4 MB Flash SPI",
      "processor": "Xtensa Dual-Core 32-bit LX6 @ 240 MHz",
      "interfaces": [
        "25x GPIO",
        "ADC 12-bit",
        "DAC 8-bit",
        "2x I2C",
        "3x UART",
        "SPI",
        "PWM"
      ],
      "connectivity": "Wi-Fi 802.11 b/g/n + Bluetooth 4.2 BLE",
      "operating_voltage": "Alimentare USB 5V, logică internă 3.3V"
    },
    "pinout_info": null,
    "datasheet_url": "https://www.espressif.com/sites/default/files/documentation/esp32-wroom-32d_esp32-wroom-32u_datasheet_en.pdf",
    "image_url": "https://gomagcdn.ro/domains/robofun.ro/files/product/large/sparkfun-esp32-thing-power-control-shield-0-831456-2118-752080.jpg",
    "badge": "ESPHome Favorite",
    "tags": [
      "ESP32",
      "ESPHome",
      "Tasmota",
      "Type-C",
      "Wi-Fi",
      "IoT"
    ],
    "rating": 4.82,
    "review_count": 89,
    "featured": false,
    "compatible_with": [
      "senzor-boscli-bme280-i2c",
      "modul-4-relee-5v-optocuplate"
    ]
  },
  {
    "slug": "adafruit-can-bus-featherwing-mcp2515",
    "name": "Adafruit CAN Bus FeatherWing MCP2515 & TJA1051/3 Transceiver",
    "sku": "ADA-CAN-MCP2515",
    "mpn": "4759",
    "category_id": 1,
    "subcategory": "Comunicație Industrială & CAN",
    "price_ron": 57.99,
    "old_price_ron": 64.99,
    "stock": 16,
    "stock_status": "in_stock",
    "short_desc": "Modul de comunicație pe magistrală CAN Bus industrială sau automotive cu controller SPI Microchip MCP2515 și transceiver de 3.3V.",
    "full_desc": "Adafruit CAN Bus FeatherWing adaugă comunicație CAN standard (Controller Area Network) oricărei plăci din formatul Feather sau oricărui microcontroler via SPI. Include rezistor de terminare de 120Ω comutabil cu jumper, bloc terminal cu șuruburi 3.5mm pentru firele CANH/CANL și compatibilitate completă cu protocoalele OBD-II și CANopen.",
    "technical_specs": {
      "connection": "Terminal block 3-pin (CANH, CANL, GND)",
      "termination": "Rezistor 120Ω integrat comutabil",
      "can_controller": "Microchip MCP2515 cu bus SPI până la 10 MHz",
      "can_transceiver": "NXP TJA1051/3 (funcționează la logică de 3.3V, tolerat 5V pe bus)",
      "operating_speed": "Standard CAN 2.0B până la 1 Mbps"
    },
    "pinout_info": null,
    "datasheet_url": "https://learn.adafruit.com/adafruit-can-bus-featherwing",
    "image_url": "https://gomagcdn.ro/domains/robofun.ro/files/product/large/adafruit-can-bus-featherwing-mcp2515-415030.jpg",
    "badge": "Automotive & Industrial",
    "tags": [
      "CAN Bus",
      "MCP2515",
      "OBD-II",
      "Industrial",
      "Feather",
      "SPI"
    ],
    "rating": 4.87,
    "review_count": 8,
    "featured": false,
    "compatible_with": [
      "adafruit-feather-esp32-s3-stemma",
      "arduino-uno-r4-wifi"
    ]
  },
  {
    "slug": "minisforum-ms-01-workstation-mini-pc",
    "name": "Minisforum MS-01 Workstation Mini PC (Intel i9-13900H, 2x 10G SFP+, 2x 2.5G)",
    "sku": "MINIS-MS01-I9",
    "mpn": "MS-01-13900H",
    "category_id": 2,
    "subcategory": "Servere & Mini PC",
    "price_ron": 4249.99,
    "old_price_ron": 4599.99,
    "stock": 5,
    "stock_status": "in_stock",
    "short_desc": "Cel mai dorit nod de server homelab compact: procesor Intel Core i9-13900H (14C/20T), porturi duble 10G SFP+, porturi duble 2.5G i226 și slot PCIe x16.",
    "full_desc": "Minisforum MS-01 este considerat standardul de aur absolut în comunitățile Homelab și Proxmox VE. Într-un format compact de doar 1.8 litri, integrează două porturi 10Gbps SFP+, două porturi 2.5GbE Intel i226-V, trei sloturi M.2 NVMe (suport pentru SSD-uri U.2 Enterprise via adaptor) și un slot de expansiune PCIe 4.0 x16 (electric x8) pentru plăci video low-profile sau adaptoare SAS HBA. Suportă tehnologia Intel vPro pentru management de la distanță KVM direct din rețea.",
    "technical_specs": {
      "cooling": "Sistem de răcire cu cameră de vapori și două ventilatoare silențioase",
      "processor": "Intel Core i9-13900H (14 nuclee, 20 fire de execuție, până la 5.4GHz, 24MB Cache)",
      "usb_ports": "2x USB4 (40Gbps cu ieșire video DP), 2x USB 3.2 Gen2, 2x USB 2.0",
      "networking": "2x 10G SFP+ (Intel 82599/X557) + 2x 2.5GbE RJ45 (Intel i226-V / i226-LM cu vPro)",
      "ram_support": "Până la 96GB DDR5-5200MHz SO-DIMM (suport non-ECC)",
      "power_supply": "Adaptor extern 19V / 180W inclus",
      "storage_bays": "3x M.2 PCIe 4.0 x4 (1x suportă SSD-uri U.2 Enterprise NVMe)",
      "pcie_expansion": "1x PCIe 4.0 x16 (funcționează în mod x8 half-height/half-length)"
    },
    "pinout_info": null,
    "datasheet_url": "https://www.minisforum.com/page/ms01",
    "image_url": "https://store.minisforum.com/cdn/shop/files/Compressed_MS-01.png",
    "badge": "Legendar Homelab",
    "tags": [
      "Minisforum",
      "MS-01",
      "Proxmox",
      "10GbE SFP+",
      "i9-13900H",
      "Homelab",
      "vPro"
    ],
    "rating": 4.99,
    "review_count": 27,
    "featured": true,
    "compatible_with": [
      "mikrotik-crs305-1g-4s-in",
      "mellanox-connectx-4-lx-25gbe-dual-port",
      "mikrotik-xs-da0001-dac-25g-1m"
    ]
  },
  {
    "slug": "mellanox-connectx-4-lx-25gbe-dual-port",
    "name": "Placă de Rețea Mellanox ConnectX-4 Lx Dual Port 25GbE SFP28 PCIe 3.0 x8",
    "sku": "MCX4121A-ACAT",
    "mpn": "MCX4121A-ACAT",
    "category_id": 2,
    "subcategory": "Plăci de Rețea 10G & 25G",
    "price_ron": 494.99,
    "old_price_ron": 549.99,
    "stock": 11,
    "stock_status": "in_stock",
    "short_desc": "Placă de rețea enterprise cu două porturi 25Gbps SFP28 / 10Gbps SFP+, RoCE v2 (RDMA over Converged Ethernet) și consum de doar 8.5W.",
    "full_desc": "Mellanox (NVIDIA Networking) ConnectX-4 Lx este placa ideală pentru clustere Ceph, virtualizare Proxmox VE și stocare ZFS de mare viteză pe rețea. Oferă suport complet hardware pentru RoCE v2 (RDMA), NVMe-oF (NVMe over Fabrics) și SR-IOV. Porturile SFP28 funcționează perfect atât la 25Gbps cât și în mod backwards-compatible la 10Gbps SFP+ cu cabluri DAC sau transceivere optice.",
    "technical_specs": {
      "ports": "2x SFP28 (suportă 25GbE și 10GbE)",
      "bracket": "Include ambele bracket-uri: Full-Height și Low-Profile",
      "accelerations": "Hardware RoCE v2 (RDMA), VXLAN, NVGRE, Geneve offload, SR-IOV",
      "bus_interface": "PCI Express 3.0 x8 (compatibil în sloturi x8 și x16)",
      "power_consumption": "Tipic 8.5W (foarte rece comparativ cu alte plăci 10G/25G)"
    },
    "pinout_info": null,
    "datasheet_url": "https://www.nvidia.com/en-us/networking/ethernet/connectx-4-lx/",
    "image_url": "https://www.nvidia.com/content/dam/en-zz/Solutions/networking/Ethernet/ethernet-adapters/connectx4-lx/nvidia-mellanox-connectx4-lx-2c50-p@2x.jpg",
    "badge": "25Gbps RoCE v2",
    "tags": [
      "Mellanox",
      "25GbE",
      "SFP28",
      "RDMA",
      "RoCE",
      "Ceph",
      "Proxmox"
    ],
    "rating": 4.97,
    "review_count": 21,
    "featured": true,
    "compatible_with": [
      "mikrotik-xs-da0001-dac-25g-1m",
      "minisforum-ms-01-workstation-mini-pc"
    ]
  },
  {
    "slug": "intel-x520-da2-10gbe-dual-port-pcie",
    "name": "Placă de Rețea Intel X520-DA2 Dual Port 10GbE SFP+ PCIe x8",
    "sku": "INTEL-X520-DA2",
    "mpn": "E10G42BTDA",
    "category_id": 2,
    "subcategory": "Plăci de Rețea 10G & 25G",
    "price_ron": 278.99,
    "old_price_ron": 319.99,
    "stock": 14,
    "stock_status": "in_stock",
    "short_desc": "Placă PCIe 2.0 x8 cu controller original Intel 82599ES, 2 sloturi 10G SFP+, bracket standard și low-profile incluse.",
    "full_desc": "Standardul de aur pentru servere Proxmox VE, TrueNAS SCALE și routere virtualizate OPNsense/pfSense. Controllerul Intel 82599ES beneficiază de suport nativ `ixgbe` direct în kernelul Linux și FreeBSD, fără necesitatea compilării manuale de drivere. Suportă SR-IOV, VLAN hardware tagging, Jumbo Frames de până la 9.5KB și descărcare checksum TCP/IP/UDP.",
    "technical_specs": {
      "ports": "2x SFP+ 10Gbps (compatibil și cu transceivere 1Gbps SFP)",
      "cooling": "Radiator pasiv din aluminiu anodizat (necesită airflow de carcasă de minim 100 LFM)",
      "features": [
        "SR-IOV (până la 64 Virtual Functions per port)",
        "VLAN Tagging (802.1Q)",
        "Jumbo Frames 9.5KB",
        "iSCSI Boot",
        "PXE Boot"
      ],
      "controller": "Intel 82599ES 10 Gigabit Ethernet Controller",
      "interface_bus": "PCI Express 2.0 x8 (compatibil în sloturi x8 și x16)",
      "power_consumption": "Consum mediu: 8.6W (cu transceivere DAC sau optice)"
    },
    "pinout_info": null,
    "datasheet_url": "https://www.intel.com/content/www/us/en/products/sku/39776/intel-82599es-10-gigabit-ethernet-controller/specifications.html",
    "image_url": "https://gomagcdn.ro/domains/robofun.ro/files/product/medium/placa-de-retea-intel-x520-da2-dual-port-10gbe-sfp-pcie-82599es-782194.jpg",
    "badge": "Best Seller Homelab",
    "tags": [
      "10GbE",
      "SFP+",
      "Intel 82599ES",
      "Proxmox",
      "TrueNAS",
      "OPNsense"
    ],
    "rating": 4.9,
    "review_count": 31,
    "featured": true,
    "compatible_with": [
      "cablu-dac-10g-sfp-1m",
      "transceiver-sfp-10gbase-t-copper",
      "mikrotik-crs305-1g-4s-in"
    ]
  },
  {
    "slug": "ubiquiti-unifi-dream-machine-special-edition",
    "name": "Ubiquiti UniFi Dream Machine Special Edition (UDM-SE)",
    "sku": "UBI-UDM-SE",
    "mpn": "UDM-SE",
    "category_id": 2,
    "subcategory": "Routere & Gateway-uri Homelab",
    "price_ron": 2489.99,
    "old_price_ron": 2649.99,
    "stock": 6,
    "stock_status": "in_stock",
    "short_desc": "Gateway enterprise All-in-One 1U cu WAN 2.5GbE, 2x porturi 10G SFP+, switch integrat 8x GbE cu PoE/PoE+ și SSD 128GB NVR.",
    "full_desc": "Ubiquiti UDM-SE este centrul nervos al rețelelor moderne de top. Oferă rutare de 3.5 Gbps cu inspecție completă de securitate IDS/IPS, două porturi 10G SFP+ (unul LAN și unul WAN), switch integrat cu 8 porturi Gigabit (2x PoE+ și 6x PoE) și bay pentru hard disk de 3.5 inch pentru supraveghere video UniFi Protect. Include stocare internă SSD integrată de 128GB și ecran tactil color de 1.3 inch pentru diagnoză în timp real.",
    "technical_specs": {
      "ram": "4 GB DDR4",
      "display": "Ecran tactil color LCM 1.3-inch",
      "storage": "SSD 128GB integrat + 1x bay 3.5\"/2.5\" SATA HDD",
      "lan_ports": "8x 1GbE RJ45 (cu PoE/PoE+ total 130W) + 1x 10G SFP+",
      "processor": "Quad-Core ARM Cortex-A57 @ 1.7 GHz",
      "wan_ports": "1x 2.5GbE RJ45 + 1x 10G SFP+",
      "form_factor": "Montabil în rack 19\" 1U (urechi de rack incluse)",
      "ids_ips_throughput": "3.5 Gbps cu inspecție pachete completă"
    },
    "pinout_info": null,
    "datasheet_url": "https://techspecs.ui.com/unifi/cloud-gateways/udm-se",
    "image_url": "https://images.svc.ui.com/?u=https%3A%2F%2Fcdn.ecomm.ui.com%2Fproducts%2F1b6fcc08-a6b8-4496-a831-6125a47c412f%2Fc1d1e0e0-4ec6-4760-9bc2-81cdfdf3eaa5.png&q=75&w=1000",
    "badge": "Enterprise Gateway",
    "tags": [
      "Ubiquiti",
      "UniFi",
      "UDM-SE",
      "10G SFP+",
      "PoE+",
      "IDS/IPS",
      "Rack 1U"
    ],
    "rating": 4.96,
    "review_count": 22,
    "featured": true,
    "compatible_with": [
      "ubiquiti-unifi-u6-pro-wifi-6",
      "ubiquiti-unifi-switch-pro-8-poe",
      "cablu-dac-10g-sfp-1m"
    ]
  },
  {
    "slug": "ubiquiti-unifi-cloud-gateway-ultra",
    "name": "Ubiquiti UniFi Cloud Gateway Ultra (UCG-Ultra)",
    "sku": "UBI-UCG-ULTRA",
    "mpn": "UCG-Ultra",
    "category_id": 2,
    "subcategory": "Routere & Gateway-uri Homelab",
    "price_ron": 609.99,
    "old_price_ron": 659.99,
    "stock": 15,
    "stock_status": "in_stock",
    "short_desc": "Gateway ultra-compact UniFi cu rutare 1 Gbps IDS/IPS, port WAN 2.5GbE, 4 porturi LAN Gigabit și ecran de stare 0.96 inch.",
    "full_desc": "UniFi Cloud Gateway Ultra oferă puterea ecosistemului complet UniFi OS într-un format desktop incredibil de mic. Suportă managementul a peste 30 de dispozitive UniFi și 300 de clienți, inspecție de securitate la 1Gbps complet, suport multi-WAN cu failover automat și alimentare directă prin USB-C (sursă inclusă).",
    "technical_specs": {
      "ram": "3 GB DDR4",
      "power": "USB-C 5V / 3A (adaptor inclus)",
      "display": "Ecran de stare LCM 0.96 inch",
      "lan_ports": "4x 1GbE RJ45 (unul reconfigurabil ca WAN secundar)",
      "processor": "Quad-Core ARM Cortex-A53 @ 1.5 GHz",
      "wan_ports": "1x 2.5GbE RJ45",
      "dimensions": "141.8 x 127.6 x 30 mm",
      "ids_ips_throughput": "1 Gbps"
    },
    "pinout_info": null,
    "datasheet_url": "https://techspecs.ui.com/unifi/cloud-gateways/ucg-ultra",
    "image_url": "https://images.svc.ui.com/?u=https%3A%2F%2Fcdn.ecomm.ui.com%2Fproducts%2F8d2d9e4b-89f3-49a1-9c17-5d774c0067b4%2F2e179331-f85a-4bc9-bf3e-d00192522732.png&q=75&w=1000",
    "badge": "Top Alegere Compact",
    "tags": [
      "Ubiquiti",
      "UniFi",
      "UCG-Ultra",
      "2.5GbE",
      "Cloud Gateway",
      "Multi-WAN"
    ],
    "rating": 4.93,
    "review_count": 34,
    "featured": false,
    "compatible_with": [
      "ubiquiti-unifi-u6-pro-wifi-6",
      "cablu-patch-cord-cat6-utp-cupru-3m"
    ]
  },
  {
    "slug": "ubiquiti-unifi-switch-pro-8-poe",
    "name": "Ubiquiti UniFi Switch Pro 8 PoE (USW-Pro-8-PoE) Layer 3 + 2x 10G SFP+",
    "sku": "UBI-USW-PRO-8-POE",
    "mpn": "USW-Pro-8-PoE",
    "category_id": 2,
    "subcategory": "Switch-uri cu Management",
    "price_ron": 1649.99,
    "old_price_ron": 1779.99,
    "stock": 8,
    "stock_status": "in_stock",
    "short_desc": "Switch enterprise Layer 3 compact: 6 porturi PoE+ GbE, 2 porturi PoE++ (60W per port), 2 uplink-uri 10G SFP+ și buget PoE de 120W.",
    "full_desc": "USW-Pro-8-PoE este switch-ul ideal pentru birouri tehnice și homelab-uri cu cerințe mari de lățime de bandă și alimentare. Include comutare avansată Layer 3 (rutare inter-VLAN hardware, rute statice, DHCP relay), două porturi uplink 10G SFP+ pentru conectare la servere sau routere 10G și alimentare PoE++ 802.3bt capabilă să alimenteze access point-uri WiFi 6/7 consumatoare de energie.",
    "technical_specs": {
      "ports": "8x GbE RJ45 + 2x 10G SFP+",
      "cooling": "Răcire fără ventilator la sarcini mici, silențios",
      "mounting": "Desktop sau montaj pe perete (kit inclus)",
      "poe_budget": "120W total (6x 802.3at PoE+ până la 30W, 2x 802.3bt PoE++ până la 60W)",
      "features_l3": "Inter-VLAN routing, rute statice, DHCP server/relay",
      "switching_capacity": "56 Gbps"
    },
    "pinout_info": null,
    "datasheet_url": "https://techspecs.ui.com/unifi/switching/usw-pro-8-poe",
    "image_url": "https://images.svc.ui.com/?u=https%3A%2F%2Fcdn.ecomm.ui.com%2Fproducts%2F37c8c814-f786-4f8a-ac58-96525f22e029%2Fd4a21d75-7b98-43d5-9868-36cab2ba8161.png&q=75&w=1000",
    "badge": "Layer 3 + 10G SFP+",
    "tags": [
      "Ubiquiti",
      "Switch",
      "Layer 3",
      "PoE++",
      "10G SFP+",
      "UniFi"
    ],
    "rating": 4.95,
    "review_count": 13,
    "featured": false,
    "compatible_with": [
      "ubiquiti-unifi-u6-pro-wifi-6",
      "ubiquiti-unifi-dream-machine-special-edition"
    ]
  },
  {
    "slug": "ubiquiti-unifi-u6-pro-wifi-6",
    "name": "Ubiquiti UniFi Access Point U6-Pro WiFi 6 Dual-Band 5.3 Gbps",
    "sku": "UBI-U6-PRO",
    "mpn": "U6-Pro",
    "category_id": 2,
    "subcategory": "Echipamente Rețea Wireless",
    "price_ron": 779.99,
    "old_price_ron": 839.99,
    "stock": 17,
    "stock_status": "in_stock",
    "short_desc": "Access point Wi-Fi 6 de înaltă performanță cu 4x4 MIMO pe 5GHz (4.8 Gbps), 2x2 MIMO pe 2.4GHz și suport pentru peste 350 de clienți.",
    "full_desc": "UniFi U6-Pro utilizează tehnologia Wi-Fi 6 pentru a oferi o acoperire wireless densă și stabilă în medii rezidențiale sau de birou aglomerate. Dispune de izolare avansată a traficului vizitatorilor, suport complet VLAN pe SSID, analiză spectrală în timp real și alimentare PoE 802.3at.",
    "technical_specs": {
      "capacity": "Suportă peste 350 de clienți conectați simultan",
      "dimensions": "197 mm diametru x 35 mm grosime",
      "interfaces": "1x GbE RJ45 cu alimentare PoE 802.3at",
      "standard_wifi": "Wi-Fi 6 (802.11ax), backwards compatible 802.11ac/a/b/g/n",
      "throughput_5ghz": "4.8 Gbps (4x4 MIMO, canale de 160 MHz)",
      "throughput_24ghz": "573.5 Mbps (2x2 MIMO)"
    },
    "pinout_info": null,
    "datasheet_url": "https://techspecs.ui.com/unifi/wifi/u6-pro",
    "image_url": "https://images.svc.ui.com/?u=https%3A%2F%2Fcdn.ecomm.ui.com%2Fproducts%2F8e88b222-7a55-4cf0-8677-ae9b6347fe84%2Fe16aa122-b5e5-4ffb-9f1a-27ee14d9ab3d.png&q=75&w=1000",
    "badge": "Wi-Fi 6 4x4 MIMO",
    "tags": [
      "Ubiquiti",
      "Access Point",
      "WiFi 6",
      "U6-Pro",
      "160MHz",
      "UniFi"
    ],
    "rating": 4.94,
    "review_count": 29,
    "featured": true,
    "compatible_with": [
      "ubiquiti-unifi-dream-machine-special-edition",
      "ubiquiti-unifi-switch-pro-8-poe"
    ]
  },
  {
    "slug": "mikrotik-crs305-1g-4s-in",
    "name": "Switch 10G MikroTik CRS305-1G-4S+IN (4x 10G SFP+, 1x Gigabit, Fanless)",
    "sku": "MIK-CRS305",
    "mpn": "CRS305-1G-4S+IN",
    "category_id": 2,
    "subcategory": "Switch-uri cu Management",
    "price_ron": 688.99,
    "old_price_ron": 734.99,
    "stock": 16,
    "stock_status": "in_stock",
    "short_desc": "Cel mai popular switch 10G pentru homelab: 4 sloturi SFP+ 10Gbps, 1 port Gigabit RJ45 cu PoE In, carcasă metalică complet silențioasă.",
    "full_desc": "MikroTik CRS305-1G-4S+IN este soluția de facto pentru interconectarea nodurilor de virtualizare, a NAS-urilor și a stațiilor de lucru la viteze de 10 Gigabiți. Dispune de funcționalitatea Dual Boot (poate rula fie SwOS pentru o interfață web de comutare extrem de simplă, fie RouterOS v7 pentru funcții complete de rutare, VLAN-uri 802.1Q și filtre L2/L3). Nu are ventilatoare, fiind 100% silențios.",
    "technical_specs": {
      "cpu": "Qualcomm 98DX3236 800 MHz",
      "ram": "512 MB",
      "ports": "4x SFP+ 10Gbps + 1x Gigabit Ethernet RJ45",
      "cooling": "Complet pasiv (radiator masiv pe spate, zero decibeli)",
      "power_redundancy": "2x Mufe jack DC 12-57V (alimentare redundantă) + PoE-in pe portul RJ45",
      "power_consumption": "Doar 12W (maxim 18W cu transceivere SFP+ RJ45)",
      "switching_capacity": "82 Gbps / Non-blocking throughput: 41 Gbps"
    },
    "pinout_info": null,
    "datasheet_url": "https://mikrotik.com/product/crs305_1g_4s_in",
    "image_url": "https://cdn.mikrotik.com/web-assets/rb_images/1659_lg.webp",
    "badge": "Best 10G Homelab Switch",
    "tags": [
      "MikroTik",
      "CRS305",
      "10G SFP+",
      "SwOS",
      "RouterOS",
      "Fanless",
      "Homelab"
    ],
    "rating": 4.98,
    "review_count": 45,
    "featured": true,
    "compatible_with": [
      "cablu-dac-10g-sfp-1m",
      "intel-x520-da2-10gbe-dual-port-pcie",
      "transceiver-sfp-10gbase-t-copper"
    ]
  },
  {
    "slug": "mikrotik-crs309-1g-8s-in",
    "name": "Switch 10G MikroTik CRS309-1G-8S+IN (8x 10G SFP+, Desktop/Rack Fanless)",
    "sku": "MIK-CRS309",
    "mpn": "CRS309-1G-8S+IN",
    "category_id": 2,
    "subcategory": "Switch-uri cu Management",
    "price_ron": 1289.99,
    "old_price_ron": 1389.99,
    "stock": 9,
    "stock_status": "in_stock",
    "short_desc": "Switch de mare densitate cu 8 sloturi 10G SFP+, 1 port Gigabit RJ45, radiator masiv pasiv și capacitate de comutare de 162 Gbps.",
    "full_desc": "Dacă 4 porturi 10G nu sunt suficiente, CRS309 oferă 8 porturi 10Gbps SFP+ într-o carcasă desktop solidă care include și urechi de montare în rack 19-inch 1U. Echipat cu procesor Dual-Core la 800MHz și 512MB RAM, suportă hardware offloading complet pentru VLAN-uri și L2 switching la viteză wire-speed fără nicio cădere de pachete.",
    "technical_specs": {
      "cpu": "Dual-Core 98DX8208 @ 800 MHz",
      "ram": "512 MB",
      "ports": "8x SFP+ 10Gbps + 1x Gigabit RJ45 management",
      "cooling": "Pasiv cu radiatoare masive de aluminiu",
      "power_inputs": "2x Mufe jack DC (alimentare failover redundantă) + PoE-In",
      "switching_capacity": "162 Gbps"
    },
    "pinout_info": null,
    "datasheet_url": "https://mikrotik.com/product/crs309_1g_8s_in",
    "image_url": "https://cdn.mikrotik.com/web-assets/rb_images/1730_lg.webp",
    "badge": "8x 10G SFP+ Fanless",
    "tags": [
      "MikroTik",
      "CRS309",
      "10G SFP+",
      "8 Porturi",
      "Wire-Speed",
      "Homelab"
    ],
    "rating": 4.97,
    "review_count": 18,
    "featured": true,
    "compatible_with": [
      "cablu-dac-10g-sfp-1m",
      "mellanox-connectx-4-lx-25gbe-dual-port",
      "intel-x520-da2-10gbe-dual-port-pcie"
    ]
  },
  {
    "slug": "mikrotik-rb5009ug-s-in",
    "name": "Router MikroTik RB5009UG+S+IN (1x 10G SFP+, 1x 2.5GbE, 7x 1GbE)",
    "sku": "MIK-RB5009-S",
    "mpn": "RB5009UG+S+IN",
    "category_id": 2,
    "subcategory": "Routere & Gateway-uri Homelab",
    "price_ron": 984.99,
    "old_price_ron": 1049.99,
    "stock": 8,
    "stock_status": "in_stock",
    "short_desc": "Routerul de referință pentru pasionații de homelab: procesor Marvell Armada Quad-core @ 1.4GHz, 1GB RAM DDR4, port 10G SFP+ și port 2.5GbE.",
    "full_desc": "MikroTik RB5009 este o capodoperă a eficienței tehnice. Carcasa sa metalică funcționează ca un radiator uriaș pentru procesorul Marvell Armada ARM64 Quad-core. Oferă flexibilitate totală de rutare: poți folosi portul 10G SFP+ pentru fibră optică sau conexiune 10G LAN către switch, portul de 2.5GbE pentru conexiuni de internet gigabit ultra-rapide și cele 7 porturi Gigabit pentru dispozitive locale.",
    "technical_specs": {
      "cpu": "Marvell Armada ARM64 88F7040 Quad-core @ 1.4 GHz",
      "ram": "1 GB DDR4",
      "ports": "1x SFP+ 10Gbps + 1x 2.5GbE RJ45 + 7x Gigabit RJ45",
      "storage": "1 GB NAND",
      "form_factor": "Desktop compact (se pot monta 4 unități într-un singur spațiu 1U de rack 19\")",
      "power_options": "3 moduri de alimentare: Mufă Jack DC, Conector terminal 2-pin și PoE-in (802.3af/at)",
      "operating_system": "RouterOS v7 (licență Level 5)"
    },
    "pinout_info": null,
    "datasheet_url": "https://mikrotik.com/product/rb5009ug_s_in",
    "image_url": "https://cdn.mikrotik.com/web-assets/rb_images/2065_lg.webp",
    "badge": "Routerul Anului",
    "tags": [
      "MikroTik",
      "RB5009",
      "RouterOS v7",
      "10G SFP+",
      "2.5GbE",
      "ARM64"
    ],
    "rating": 4.96,
    "review_count": 27,
    "featured": true,
    "compatible_with": [
      "cablu-dac-10g-sfp-1m",
      "transceiver-sfp-10gbase-t-copper",
      "switch-zyxel-gs1200-8"
    ]
  },
  {
    "slug": "mikrotik-css610-8g-2s-in",
    "name": "Switch MikroTik CSS610-8G-2S+IN (8x Gigabit RJ45, 2x 10G SFP+)",
    "sku": "MIK-CSS610",
    "mpn": "CSS610-8G-2S+IN",
    "category_id": 2,
    "subcategory": "Switch-uri cu Management",
    "price_ron": 464.99,
    "old_price_ron": 509.99,
    "stock": 14,
    "stock_status": "in_stock",
    "short_desc": "Switch cu management accesibil și performant: 8 porturi Gigabit Ethernet, 2 sloturi 10G SFP+ uplink și sistem de operare SwOS Lite.",
    "full_desc": "MikroTik CSS610 este soluția ideală pentru a adăuga conectivitate 10G la o rețea locală fără costuri mari. Dispune de 8 porturi Gigabit pentru calculatoare și imprimante și două sloturi 10G SFP+ pentru uplink rapid către router sau serverul NAS. Sistemul de operare web SwOS Lite permite configurarea rapidă a VLAN-urilor, port isolation, bandwidth limiting și broadcast storm control.",
    "technical_specs": {
      "os": "MikroTik SwitchOS Lite (management web simplu)",
      "ports": "8x Gigabit RJ45 + 2x SFP+ 10Gbps",
      "power": "Mufă Jack DC sau PoE-In pe portul 1 RJ45",
      "cooling": "Pasiv, silențios",
      "switching_capacity": "56 Gbps"
    },
    "pinout_info": null,
    "datasheet_url": "https://mikrotik.com/product/css610_8g_2s_in",
    "image_url": "https://cdn.mikrotik.com/web-assets/rb_images/1980_lg.webp",
    "badge": "Buget 10G Uplink",
    "tags": [
      "MikroTik",
      "CSS610",
      "SwOS",
      "10G SFP+",
      "Gigabit",
      "VLAN"
    ],
    "rating": 4.88,
    "review_count": 19,
    "featured": false,
    "compatible_with": [
      "cablu-dac-10g-sfp-1m",
      "mikrotik-hex-s-router"
    ]
  },
  {
    "slug": "mikrotik-crs310-8g-2s-in",
    "name": "Switch 2.5G MikroTik CRS310-8G+2S+IN (8x 2.5GbE RJ45, 2x 10G SFP+)",
    "sku": "MIK-CRS310-25G",
    "mpn": "CRS310-8G+2S+IN",
    "category_id": 2,
    "subcategory": "Switch-uri cu Management",
    "price_ron": 979.99,
    "old_price_ron": 1049.99,
    "stock": 10,
    "stock_status": "in_stock",
    "short_desc": "Switch-ul generației 2.5G: 8 porturi RJ45 la viteză completă 2.5 Gigabit, 2 porturi 10G SFP+ uplink și procesor ARM v7 @ 800MHz cu RouterOS v7.",
    "full_desc": "CRS310 este răspunsul MikroTik la cererea uriașă de switch-uri 2.5Gbps pentru plăcile de bază moderne, nodurile mini PC Proxmox și noile access point-uri Wi-Fi 6/7. Oferă 8 porturi 2.5G native și două porturi 10G SFP+ pentru conectare de mare viteză la magistrala centrală a rețelei.",
    "technical_specs": {
      "os": "RouterOS v7 (Level 5)",
      "cpu": "ARM 32-bit 98DX226S @ 800 MHz",
      "ram": "256 MB",
      "ports": "8x 2.5GbE RJ45 + 2x 10G SFP+",
      "cooling": "Ventilator silențios cu turație variabilă termoreglat",
      "switching_capacity": "80 Gbps"
    },
    "pinout_info": null,
    "datasheet_url": "https://mikrotik.com/product/crs310_8g_2s_in",
    "image_url": "https://cdn.mikrotik.com/web-assets/rb_images/2280_lg.webp",
    "badge": "Viteză 2.5GbE Nativă",
    "tags": [
      "MikroTik",
      "CRS310",
      "2.5GbE",
      "10G SFP+",
      "RouterOS",
      "Homelab"
    ],
    "rating": 4.94,
    "review_count": 15,
    "featured": true,
    "compatible_with": [
      "mini-pc-homelab-intel-n100-4x25gbe",
      "cablu-dac-10g-sfp-1m"
    ]
  },
  {
    "slug": "mikrotik-hex-s-router",
    "name": "Router Gigabit MikroTik hEX S (5x Gigabit RJ45, 1x SFP, PoE Out)",
    "sku": "MIK-HEX-S",
    "mpn": "RB760iGS",
    "category_id": 2,
    "subcategory": "Routere & Gateway-uri Homelab",
    "price_ron": 314.99,
    "old_price_ron": 344.99,
    "stock": 25,
    "stock_status": "in_stock",
    "short_desc": "Router compact și robust cu 5 porturi Gigabit Ethernet, 1 slot SFP pentru fibră optică, criptare hardware IPsec și slot microSD.",
    "full_desc": "MikroTik hEX S este un router clasic de birou sau casă capabil să gestioneze conexiuni PPPoE Gigabit cu ușurință. Dispune de procesor Dual-Core la 880MHz (4 threads), accelerare hardware pentru tuneluri VPN IPsec (până la 470 Mbps), ieșire PoE pasivă pe portul 5 pentru alimentarea unui access point și slot microSD pentru stocarea fișierelor Dude de monitorizare a rețelei.",
    "technical_specs": {
      "cpu": "MediaTek MT7621A Dual-Core 4 Threads @ 880 MHz",
      "ram": "256 MB",
      "ports": "5x Gigabit RJ45 + 1x SFP 1.25Gbps",
      "poe_out": "Port 5 PoE Out pasiv (aceeași tensiune ca la intrare)",
      "storage_expand": "Slot MicroSD integrat",
      "ipsec_acceleration": "Da, hardware IPsec offloading"
    },
    "pinout_info": null,
    "datasheet_url": "https://mikrotik.com/product/hex_s",
    "image_url": "https://cdn.mikrotik.com/web-assets/rb_images/1539_lg.webp",
    "badge": "Criptare Hardware IPsec",
    "tags": [
      "MikroTik",
      "hEX S",
      "RouterOS",
      "SFP",
      "IPsec",
      "Gigabit",
      "VPN"
    ],
    "rating": 4.91,
    "review_count": 39,
    "featured": false,
    "compatible_with": [
      "switch-zyxel-gs1200-8",
      "cablu-patch-cord-cat6-utp-cupru-3m"
    ]
  },
  {
    "slug": "mikrotik-xs-da0001-dac-25g-1m",
    "name": "Cablu Direct Attach DAC MikroTik XS+DA0001 (10G SFP+ / 25G SFP28 1m)",
    "sku": "MIK-XS-DA0001",
    "mpn": "XS+DA0001",
    "category_id": 2,
    "subcategory": "Transceivere & Cabluri DAC/Optice",
    "price_ron": 118.99,
    "old_price_ron": 134.99,
    "stock": 28,
    "stock_status": "in_stock",
    "short_desc": "Cablu de cupru pasiv hibrid certificat pentru ambele standarde: 10Gbps SFP+ și 25Gbps SFP28, lungime 1 metru.",
    "full_desc": "MikroTik XS+DA0001 rezolvă definitiv problema compatibilității dintre echipamentele 10G și noile generații 25G. Funcționează perfect în sloturi 10G SFP+ (de exemplu între un MikroTik CRS305 și o placă Intel X520) dar și în sloturi de 25G SFP28 (între un switch 25G și o placă Mellanox ConnectX-4 Lx) cu latență ultra-redusă de sub 0.1µs.",
    "technical_specs": {
      "impedance": "100 Ohm diferențial",
      "connectors": "SFP+ / SFP28 la ambele capete",
      "cable_length": "1.0 Metru (pasiv Twinax Cupru)",
      "power_consumption": "0W (pasiv)",
      "supported_data_rates": "10 Gbps (SFP+) și 25 Gbps (SFP28)"
    },
    "pinout_info": null,
    "datasheet_url": "https://mikrotik.com/product/xs_da0001",
    "image_url": "https://cdn.mikrotik.com/web-assets/rb_images/2003_lg.webp",
    "badge": "10G & 25G Hibrid",
    "tags": [
      "MikroTik",
      "DAC Cable",
      "SFP28",
      "SFP+",
      "25GbE",
      "10GbE",
      "Twinax"
    ],
    "rating": 4.95,
    "review_count": 22,
    "featured": false,
    "compatible_with": [
      "mellanox-connectx-4-lx-25gbe-dual-port",
      "mikrotik-crs305-1g-4s-in",
      "intel-x520-da2-10gbe-dual-port-pcie"
    ]
  },
  {
    "slug": "mini-pc-homelab-intel-n100-4x25gbe",
    "name": "Mini PC Homelab Intel Alder Lake-N N100 (4x 2.5GbE Intel i226-V, Fanless)",
    "sku": "MINIPC-N100-4NIC",
    "mpn": "N100-4L-V2",
    "category_id": 2,
    "subcategory": "Servere & Mini PC",
    "price_ron": 1149.99,
    "old_price_ron": 1279.99,
    "stock": 7,
    "stock_status": "low_stock",
    "short_desc": "Dispozitiv complet din aluminiu pentru virtualizare: 4 porturi 2.5GbE Intel i226-V Rev.4, procesor Quad-Core N100 3.4GHz (TDP 6W) și răcire pasivă fără zgomot.",
    "full_desc": "Creat special pentru comunitatea de homelab, acest Mini PC reprezintă hardware-ul perfect pentru rularea sistemelor Proxmox VE, firewall OPNsense/pfSense sau containerizare Docker/K3s. Carcasa robustă din aluminiu extrudat preia în mod direct căldura procesorului Intel N100 (4 nuclee Gracemont de mare eficiență). Beneficiază de 4 controllere de rețea independente Intel i226-V, slot M.2 NVMe PCIe 3.0 x2 și slot DDR5 SO-DIMM (suportă până la 32GB RAM).",
    "technical_specs": {
      "power": "Adaptor 12V DC 5A (60W) inclus în pachet cu mufă standard jack 5.5x2.5mm",
      "cooling": "Complet pasiv (0 dB, carcasă din bloc masiv de aluminiu cu aripioare de disipare)",
      "processor": "Intel Alder Lake-N N100 (4C / 4T, frecvență boost 3.4GHz, 6MB Smart Cache, TDP 6W)",
      "video_out": "1x HDMI 2.0 (4K@60Hz) + 1x DisplayPort 1.4 (4K@60Hz)",
      "networking": "4x Porturi RJ45 2.5GbE cu controller independent Intel i226-V (suport hardware VLAN, PXE, WoL)",
      "ram_support": "1x Slot DDR5 SO-DIMM (4800MT/s), compatibil module de până la 32GB (livrat fără RAM)",
      "storage_support": "1x Slot M.2 2280 NVMe (PCIe 3.0 x2) + 1x conector intern SATA 3.0 (livrat fără stocare)"
    },
    "pinout_info": null,
    "datasheet_url": "https://www.intel.com/content/www/us/en/products/sku/231803/intel-processor-n100-6m-cache-up-to-3-40-ghz/specifications.html",
    "image_url": "https://gomagcdn.ro/domains/robofun.ro/files/product/medium/mini-pc-homelab-intel-alder-lake-n-n100-4x-25gbe-intel-i226-v-fanless-642918.jpg",
    "badge": "Alegerea Proxmox",
    "tags": [
      "Mini PC",
      "Intel N100",
      "4x 2.5GbE",
      "OPNsense",
      "Proxmox",
      "Fanless",
      "Homelab"
    ],
    "rating": 4.94,
    "review_count": 18,
    "featured": true,
    "compatible_with": [
      "switch-zyxel-gs1200-8",
      "cabinet-rack-10-inch-6u"
    ]
  },
  {
    "slug": "cabinet-rack-10-inch-6u",
    "name": "Cabinet Rack 10-inch 6U Negru cu Ușă din Sticlă Securizată",
    "sku": "RACK-10IN-6U-BLK",
    "mpn": "RK10-6U-BK",
    "category_id": 2,
    "subcategory": "Cabinete Rack & Accesorii",
    "price_ron": 264.99,
    "old_price_ron": 298.99,
    "stock": 11,
    "stock_status": "in_stock",
    "short_desc": "Cabinet metalic compact de 10 inch, format 6U adâncime 300mm, șine reglabile, uși laterale detașabile și încuietoare cu cheie.",
    "full_desc": "Soluția ideală de organizare a echipamentelor homelab în spații restrânse (apartamente, garaje, debara tehnică). Formatul de 10-inch ocupă jumătate din amprenta unui rack clasic de 19\", dar oferă rigiditate structurală din oțel SPCC laminat la rece de 1.2mm. Permite montarea routerelor MikroTik, switch-urilor compacte, nodurilor Raspberry Pi și a patch-panel-urilor dedicate.",
    "technical_specs": {
      "features": [
        "Ușă frontală din sticlă securizată fumurie reversibilă",
        "Panouri laterale detașabile cu cleme rapide",
        "Fante de aerisire pasivă pe capacul superior și inferior"
      ],
      "material": "Oțel laminat la rece SPCC, vopsit electrostatic în câmp magnetic (negru mat RAL9004)",
      "mounting": "Montaj pe perete sau pe birou/podea (include dibluri de ancorare și 12 seturi șuruburi M6)",
      "dimensions": "Lățime: 312 mm | Adâncime: 300 mm | Înălțime: 320 mm (6U)",
      "load_capacity": "Sarcină statică maximă suportată: 30 kg"
    },
    "pinout_info": null,
    "datasheet_url": "https://example.com/datasheets/rack-10in-6u.pdf",
    "image_url": "https://gomagcdn.ro/domains/robofun.ro/files/product/medium/cabinet-rack-10-inch-6u-negru-usa-sticla-homelab-319042.jpg",
    "badge": "Ideal Apartament",
    "tags": [
      "Rack 10 inch",
      "6U",
      "Homelab",
      "Management Cabluri",
      "Sticlă Securizată"
    ],
    "rating": 4.88,
    "review_count": 22,
    "featured": false,
    "compatible_with": [
      "patch-panel-10-inch-12-porturi",
      "mikrotik-rb5009ug-s-in"
    ]
  },
  {
    "slug": "patch-panel-10-inch-12-porturi",
    "name": "Patch Panel 10-inch 12 Porturi RJ45 Cat6 UTP 1U Negru",
    "sku": "PP-10IN-12P-C6",
    "mpn": "PP10-12-C6-BK",
    "category_id": 2,
    "subcategory": "Cabinete Rack & Accesorii",
    "price_ron": 78.99,
    "old_price_ron": null,
    "stock": 26,
    "stock_status": "in_stock",
    "short_desc": "Panou de conexiuni Cat6 1U pentru cabinete rack de 10 inch, 12 porturi ecranate parțial, blocuri IDC compatibile Krone/110.",
    "full_desc": "Punctul central de cablare structurată pentru laboratorul tău casnic. Construit din tablă de oțel rigidă de 1.5mm, include etichete de numerotare frontală, coduri de culoare conform standardelor T568A și T568B pe spatele blocurilor IDC și bară posterioară de susținere și descărcare mecanică a cablurilor UTP.",
    "technical_specs": {
      "ports": "12x Porturi RJ45 8P8C cu contacte placate cu aur de 50 microni",
      "standard": "TIA/EIA 568-C.2 Cat.6 UTP (compatibil Gigabit Ethernet și 2.5GbE până la 250MHz)",
      "idc_blocks": "Blocuri de inserție pentru cabluri masive AWG 22-26 (compatibile inserție unealtă tip Krone sau 110)"
    },
    "pinout_info": null,
    "datasheet_url": "https://example.com/datasheets/pp-10in-12p.pdf",
    "image_url": "https://gomagcdn.ro/domains/robofun.ro/files/product/medium/patch-panel-10-inch-12-porturi-cat6-negru-1u-582910.jpg",
    "badge": "Cat6 Gigabit",
    "tags": [
      "Patch Panel",
      "10 inch",
      "Cat6",
      "RJ45",
      "Cablare Structurată"
    ],
    "rating": 4.85,
    "review_count": 14,
    "featured": false,
    "compatible_with": [
      "cabinet-rack-10-inch-6u",
      "cablu-patch-cord-cat6-utp-cupru-3m"
    ]
  },
  {
    "slug": "transceiver-sfp-10gbase-t-copper",
    "name": "Transceiver SFP+ 10GBASE-T RJ45 Copper 30m 10G/5G/2.5G/1G",
    "sku": "SFP-10G-T-RJ45",
    "mpn": "SFP-10G-T-30M",
    "category_id": 2,
    "subcategory": "Transceivere & Cabluri DAC/Optice",
    "price_ron": 184.99,
    "old_price_ron": 214.99,
    "stock": 19,
    "stock_status": "in_stock",
    "short_desc": "Modul optic convertor de la SFP+ la port RJ45 de cupru de 10Gbps, auto-negociere multi-gigabit (10G/5G/2.5G/1G) până la 30 metri pe Cat6a.",
    "full_desc": "Permite conectarea unui cablu clasic de rețea RJ45 într-un slot 10G SFP+ al switch-ului sau serverului. Echipat cu controller Marvell Aquantia de ultimă generație cu consum optimizat de sub 2.5W, eliminând supraîncălzirea tipică modulelor vechi 10GBASE-T. Suportă auto-negociere NBASE-T completă, putând sincroniza și pe echipamente de 2.5Gbps sau 5Gbps.",
    "technical_specs": {
      "distance": "Până la 30 metri pe cablu Cat6a/Cat7 (10G) sau 100 metri (la 1G/2.5G pe Cat5e/Cat6)",
      "data_rate": "Auto-negociere 10 Gbps, 5 Gbps, 2.5 Gbps, 1000 Mbps",
      "form_factor": "SFP+ MSA Compliant, conector standard RJ45 ecranat",
      "compatibility": "Compatibil cu switch-uri MikroTik, Ubiquiti UniFi, Cisco, Intel și plăci PCIe",
      "power_consumption": "Max 2.4W la 10Gbps 30m"
    },
    "pinout_info": null,
    "datasheet_url": "https://example.com/datasheets/sfp-10g-t.pdf",
    "image_url": "https://gomagcdn.ro/domains/robofun.ro/files/product/medium/transceiver-sfp-10gbase-t-rj45-copper-30m-482019.jpg",
    "badge": "Multi-Gigabit RJ45",
    "tags": [
      "SFP+",
      "10GBASE-T",
      "RJ45",
      "Multi-Gigabit",
      "MikroTik",
      "UniFi"
    ],
    "rating": 4.91,
    "review_count": 25,
    "featured": false,
    "compatible_with": [
      "intel-x520-da2-10gbe-dual-port-pcie",
      "mikrotik-crs305-1g-4s-in",
      "mikrotik-rb5009ug-s-in"
    ]
  },
  {
    "slug": "cablu-dac-10g-sfp-1m",
    "name": "Cablu Direct Attach Copper (DAC) 10G SFP+ Pasiv 1 Metru",
    "sku": "DAC-10G-SFP-1M",
    "mpn": "DAC-SFP10G-1M",
    "category_id": 2,
    "subcategory": "Transceivere & Cabluri DAC/Optice",
    "price_ron": 58.99,
    "old_price_ron": 68.99,
    "stock": 42,
    "stock_status": "in_stock",
    "short_desc": "Cablu de cupru pasiv twinax de 10Gbps SFP+ la SFP+, lungime 1m, latență aproape nulă și consum de 0.1W.",
    "full_desc": "Cea mai ieftină, rece și fiabilă metodă de a interconecta două echipamente 10G SFP+ amplasate în același rack sau pe același birou (de exemplu între un router MikroTik și o placă de rețea Intel X520). Nu necesită transceivere separate, elimină conversia electro-optică și asigură o latență de transmisie de sub 0.1 microsecunde.",
    "technical_specs": {
      "length": "1.0 Metru",
      "data_rate": "10.3125 Gbps (10GbE)",
      "cable_type": "Twinaxial Shielded Copper Cable AWG 30 pasiv",
      "connectors": "2x Conectori SFP+ integrați cu mecanism de blocare/extragere rapidă",
      "compatibility": "Programat generic MSA – compatibil out-of-the-box cu MikroTik, Ubiquiti, Intel, Mellanox, Dell, HP",
      "power_consumption": "< 0.1W (practic zero consum termic)"
    },
    "pinout_info": null,
    "datasheet_url": "https://example.com/datasheets/dac-10g-1m.pdf",
    "image_url": "https://gomagcdn.ro/domains/robofun.ro/files/product/medium/cablu-dac-10g-sfp-plus-direct-attach-copper-1m-719203.jpg",
    "badge": "Latență Zero",
    "tags": [
      "DAC",
      "SFP+",
      "10GbE",
      "Twinax",
      "Interconectare Rack",
      "Rece"
    ],
    "rating": 4.97,
    "review_count": 52,
    "featured": false,
    "compatible_with": [
      "intel-x520-da2-10gbe-dual-port-pcie",
      "mikrotik-crs305-1g-4s-in",
      "mikrotik-rb5009ug-s-in"
    ]
  },
  {
    "slug": "switch-zyxel-gs1200-8",
    "name": "Switch Zyxel GS1200-8 8-Port Gigabit Web Managed Metal",
    "sku": "ZYX-GS1200-8",
    "mpn": "GS1200-8-EU0101F",
    "category_id": 2,
    "subcategory": "Switch-uri cu Management",
    "price_ron": 178.99,
    "old_price_ron": 198.99,
    "stock": 17,
    "stock_status": "in_stock",
    "short_desc": "Switch de birou cu carcasă metalică, 8 porturi Gigabit RJ45, management web simplu, suport 802.1Q VLAN, QoS și Link Aggregation (LAG).",
    "full_desc": "Un switch extrem de stabil și compact pentru segmentarea rețelei de homelab prin VLAN-uri. Permite izolarea rețelei de dispozitive IoT de calculatoarele personale și de servere. Include funcții esențiale precum IGMP Snooping v1/v2/v3 pentru fluxuri video de camere IP sau televiziune IPTV, limitare lățime de bandă și agregare de link-uri LACP static pentru dublarea vitezei către un NAS.",
    "technical_specs": {
      "ports": "8x 10/100/1000 Mbps RJ45",
      "housing": "Carcasă robustă din metal, fără ventilator (complet silențios)",
      "bandwidth": "16 Gbps capacitate de comutare",
      "management": "Interfață web intuitivă protejată cu parolă (fără necesitate software extern)",
      "power_saving": "Standard IEEE 802.3az Energy Efficient Ethernet (consum tipic: 3.5W)",
      "vlan_support": "Port-based VLAN și 802.1Q Tagged VLAN (până la 32 grupuri)"
    },
    "pinout_info": null,
    "datasheet_url": "https://www.zyxel.com/sites/default/files/2023-08/GS1200-Series_Datasheet.pdf",
    "image_url": "https://gomagcdn.ro/domains/robofun.ro/files/product/medium/switch-zyxel-gs1200-8-8-port-gigabit-web-managed-metal-892104.jpg",
    "badge": "VLAN Esențial",
    "tags": [
      "Switch",
      "VLAN",
      "Gigabit",
      "Zyxel",
      "QoS",
      "Homelab"
    ],
    "rating": 4.86,
    "review_count": 20,
    "featured": false,
    "compatible_with": [
      "mikrotik-rb5009ug-s-in",
      "mini-pc-homelab-intel-n100-4x25gbe"
    ]
  },
  {
    "slug": "home-assistant-green-gateway",
    "name": "Gateway Smart Home Hub - Home Assistant Green Plug-and-Play",
    "sku": "HA-GREEN-HUB",
    "mpn": "NBI-HA-GREEN",
    "category_id": 3,
    "subcategory": "Gateway-uri Smart Home & Coordonatoare",
    "price_ron": 484.99,
    "old_price_ron": 519.99,
    "stock": 14,
    "stock_status": "in_stock",
    "short_desc": "Dispozitivul oficial Home Assistant gata de pornire: procesor Quad-Core Rockchip RK3566 @ 1.8GHz, 4GB RAM, 32GB eMMC și Home Assistant OS preinstalat.",
    "full_desc": "Home Assistant Green este cel mai simplu mod de a rula cel mai puternic sistem de automatizări casnice open-source din lume, 100% local și privat, fără dependență de cloud. Conectezi cablul de alimentare și cablul de rețea, deschizi aplicația mobilă și ești gata în mai puțin de 5 minute. Oferă consum minuscul de energie (sub 3W), stocare eMMC industrială extrem de fiabilă și suport pentru mii de integrări locale.",
    "technical_specs": {
      "ram": "4GB LPDDR4X",
      "storage": "32GB eMMC flash integrat (mult mai fiabil decât cardurile MicroSD)",
      "software": "Home Assistant OS preinstalat din fabrică",
      "processor": "Rockchip RK3566 Quad-Core ARM Cortex-A55 @ 1.8 GHz cu NPU 0.8 TOPS",
      "usb_ports": "2x USB 2.0 (pentru stick-uri Zigbee/Z-Wave/Thread)",
      "networking": "Gigabit Ethernet RJ45",
      "power_consumption": "Tipic 1.7W | Maxim 3W (sursă alimentare inclusă)"
    },
    "pinout_info": null,
    "datasheet_url": "https://www.home-assistant.io/green/",
    "image_url": "https://www.home-assistant.io/images/blog/2023-09-ha10/green-intro.png",
    "badge": "Hub Oficial HA",
    "tags": [
      "Home Assistant",
      "Green",
      "Smart Home",
      "Zigbee",
      "Matter",
      "Local Control"
    ],
    "rating": 4.98,
    "review_count": 33,
    "featured": true,
    "compatible_with": [
      "sonoff-zigbee-3-0-usb-dongle-plus-e",
      "senzor-calitate-aer-bme680-voc"
    ]
  },
  {
    "slug": "sonoff-zigbee-3-0-usb-dongle-plus-e",
    "name": "Coordonator Sonoff Zigbee 3.0 USB Dongle Plus-E (EFR32MG21, +20dBm)",
    "sku": "SON-ZBDONGLE-E",
    "mpn": "ZBDongle-E",
    "category_id": 3,
    "subcategory": "Gateway-uri Smart Home & Coordonatoare",
    "price_ron": 98.99,
    "old_price_ron": 114.99,
    "stock": 38,
    "stock_status": "in_stock",
    "short_desc": "Coordonator Zigbee 3.0 și Thread/Matter bazat pe cipul Silicon Labs EFR32MG21, carcasă metalică din aluminiu și antenă externă SMA de +20dBm.",
    "full_desc": "Sonoff ZBDongle-E este standardul preferat pentru rețele Zigbee 3.0 robuste în Home Assistant prin Zigbee2MQTT sau ZHA. Carcasa din aluminiu previne interferențele radio din porturile USB 3.0, iar amplificatorul hardware de +20dBm asigură o acoperire pe mai multe etaje fără deconectări. Poate fi rescris cu firmware de router Zigbee sau cu firmware multiprotocol Matter/Thread.",
    "technical_specs": {
      "antenna": "Antenă externă omnidirecțională SMA rotativă",
      "housing": "Aluminiu anodizat pentru disipare termică și ecranare RF",
      "firmware": "Preinstalat cu firmware oficial de coordonator Zigbee 3.0 EZSP",
      "output_power": "Până la +20dBm putere radio",
      "compatibility": "Zigbee2MQTT, Home Assistant ZHA, openHAB, ioBroker",
      "microcontroller": "Silicon Labs EFR32MG21"
    },
    "pinout_info": null,
    "datasheet_url": "https://sonoff.tech/product/gateway-and-sensors/sonoff-zigbee-3-0-usb-dongle-plus-e/",
    "image_url": "https://sonoff.tech/cdn/shop/files/ZBDongle-E-1_1024x1024.png",
    "badge": "Zigbee2MQTT Star",
    "tags": [
      "Sonoff",
      "Zigbee 3.0",
      "Thread",
      "Matter",
      "EFR32MG21",
      "Home Assistant"
    ],
    "rating": 4.96,
    "review_count": 64,
    "featured": true,
    "compatible_with": [
      "home-assistant-green-gateway",
      "raspberry-pi-5-8gb"
    ]
  },
  {
    "slug": "senzor-calitate-aer-bme680-voc",
    "name": "Senzor Ambiental și Calitate Aer Bosch BME680 (VOC, Gaz, Temp, Umid, Pres)",
    "sku": "SEN-BOSH-BME680",
    "mpn": "BME680-QWIIC",
    "category_id": 3,
    "subcategory": "Senzori Ambientali & Calitate Aer",
    "price_ron": 64.99,
    "old_price_ron": 74.99,
    "stock": 31,
    "stock_status": "in_stock",
    "short_desc": "Senzor integrat 4-în-1 de calitate a aerului: compuși organici volatili (VOC), rezistență gaz (IAQ), presiune barometrică, temperatură și umiditate.",
    "full_desc": "Bosch Sensortec BME680 este senzorul de referință pentru monitorizarea calității aerului în interior (Indoor Air Quality - IAQ). Detectează o gamă largă de gaze volatile precum vopseluri, solvenți, alcool, monoxid de carbon și fum de țigară, calculând un index precis de aer curat (IAQ 0-500). Oferă comunicație I2C și SPI, funcționând nativ în ESPHome și Arduino.",
    "technical_specs": {
      "gas_sensor": "Timp de răspuns < 1s, măsurare compuși VOC și bVOC",
      "interfaces": "I2C (adresă 0x77 sau 0x76) și SPI 4-fire",
      "humidity_range": "0 - 100% r.H. (acuratețe ±3%)",
      "pressure_range": "300 - 1100 hPa (acuratețe ±0.6 hPa)",
      "operating_voltage": "1.71V - 3.6V DC (placa include regulator 3.3V și level shifter pentru 5V)",
      "temperature_range": "-40°C la +85°C (acuratețe ±0.5°C)"
    },
    "pinout_info": null,
    "datasheet_url": "https://www.bosch-sensortec.com/media/boschsensortec/downloads/datasheets/bst-bme680-ds001.pdf",
    "image_url": "https://gomagcdn.ro/domains/robofun.ro/files/product/large/senzor-de-masurarea-calitatii-aerului-qwiic-bme680-2315-6063.jpg",
    "badge": "4-în-1 Aer & Gaz",
    "tags": [
      "BME680",
      "Bosch",
      "Calitate Aer",
      "VOC",
      "IAQ",
      "I2C",
      "ESPHome"
    ],
    "rating": 4.93,
    "review_count": 27,
    "featured": true,
    "compatible_with": [
      "sparkfun-esp32-c6-thing-plus",
      "esp32-s3-devkitc-1-n16r8"
    ]
  },
  {
    "slug": "senzor-boscli-bme280-i2c",
    "name": "Senzor Ambiental Bosch BME280 (Temperatură, Umiditate, Presiune)",
    "sku": "SEN-BOSH-BME280",
    "mpn": "BME280-MOD",
    "category_id": 3,
    "subcategory": "Senzori Ambientali & Calitate Aer",
    "price_ron": 24.99,
    "old_price_ron": 28.99,
    "stock": 94,
    "stock_status": "in_stock",
    "short_desc": "Modul senzor de precizie înaltă 3-în-1: presiune barometrică, umiditate relativă și temperatură cu interfețe I2C și SPI.",
    "full_desc": "Cel mai popular senzor pentru stații meteo casnice și monitorizare ambientală în încăperi de servere sau rack-uri de rețea. Cu un consum de doar 3.6 µA la 1Hz, BME280 oferă citiri de o precizie chirurgicală și stabilitate termică de lungă durată.",
    "technical_specs": {
      "interfaces": [
        "I2C (adrese implicite 0x76 sau 0x77 via jumper SDO)",
        "SPI până la 10 MHz"
      ],
      "humidity_range": "0 - 100% RH (precizie ±3% RH, timp răspuns 1 secundă)",
      "pressure_range": "300 - 1100 hPa (echivalent altitudine de la 9000m la -500m față de nivelul mării, zgomot RMS 0.2 Pa)",
      "operating_voltage": "1.8V - 3.3V DC (tolerat 5V pe plăcile cu regulator integrat)",
      "temperature_range": "-40°C la +85°C (precizie ±0.5°C la 25°C)"
    },
    "pinout_info": null,
    "datasheet_url": "https://www.bosch-sensortec.com/media/boschsensortec/downloads/datasheets/bst-bme280-ds002.pdf",
    "image_url": "https://gomagcdn.ro/domains/robofun.ro/files/product/medium/senzor-presiune-temperatura-umiditate-bme280-33v-1-3185-1994.jpg",
    "badge": "Precizie Bosch",
    "tags": [
      "BME280",
      "Senzor Temperatură",
      "Umiditate",
      "Presiune Barometrică",
      "I2C"
    ],
    "rating": 4.95,
    "review_count": 67,
    "featured": false,
    "compatible_with": [
      "esp32-wroom-32d-type-c",
      "raspberry-pi-pico-2-rp2350"
    ]
  },
  {
    "slug": "senzor-calitate-aer-co2-scd41-ndir",
    "name": "Senzor Calitate Aer CO2 Sensirion SCD41 NDIR Fotoacustic (400-5000 ppm)",
    "sku": "SEN-SENS-SCD41",
    "mpn": "SCD41-BREAKOUT",
    "category_id": 3,
    "subcategory": "Senzori Ambientali & Calitate Aer",
    "price_ron": 184.99,
    "old_price_ron": 209.99,
    "stock": 18,
    "stock_status": "in_stock",
    "short_desc": "Senzor NDIR de înaltă precizie pentru dioxid de carbon (CO2) veritabil, cu compensare automată de temperatură și umiditate integrată.",
    "full_desc": "Spre deosebire de senzorii chimici ieftini de eCO2 care doar estimează dioxidul de carbon, Sensirion SCD41 măsoară concentrația moleculară reală prin tehnologie fotoacustică PASens®. Are o precizie impecabilă de ±(40 ppm + 5% din citire) în intervalul 400 - 5000 ppm. Ideal pentru monitorizarea calității aerului în birouri, săli de servere sau dormitoare prin Home Assistant.",
    "technical_specs": {
      "accuracy": "±(40 ppm + 5% din valoarea măsurată)",
      "co2_range": "400 - 5000 ppm (extins până la 40000 ppm)",
      "interface": "I2C (adresă fixă 0x62)",
      "operating_voltage": "2.4V - 5.5V DC",
      "power_consumption": "Mod low-power: 17 mW la interval de 5 minute",
      "integrated_sensors": "Temperatură (-10 la +60°C) și umiditate (0-100% RH) pentru auto-calibrare"
    },
    "pinout_info": null,
    "datasheet_url": "https://sensirion.com/products/catalog/SCD41/",
    "image_url": "https://gomagcdn.ro/domains/robofun.ro/files/product/large/senzor-de-umiditate-si-temperatura-co-sparkfun-scd41-qwiic-745933.jpg",
    "badge": "CO2 Real Fotoacustic",
    "tags": [
      "Sensirion",
      "SCD41",
      "NDIR",
      "CO2",
      "Calitate Aer",
      "I2C",
      "ESPHome"
    ],
    "rating": 4.97,
    "review_count": 21,
    "featured": true,
    "compatible_with": [
      "sparkfun-esp32-c6-thing-plus",
      "esp32-s3-devkitc-1-n16r8"
    ]
  },
  {
    "slug": "senzor-calitate-aer-co2-scd40-ndir",
    "name": "Senzor Calitate Aer CO2 Sensirion SCD40 NDIR Fotoacustic",
    "sku": "SEN-SENS-SCD40",
    "mpn": "SCD40-MOD",
    "category_id": 3,
    "subcategory": "Senzori Ambientali & Calitate Aer",
    "price_ron": 144.99,
    "old_price_ron": 164.99,
    "stock": 15,
    "stock_status": "in_stock",
    "short_desc": "Măsurare optică directă a dioxidului de carbon (CO2) prin tehnologie fotoacustică PASens®, cu senzor integrat de temperatură și umiditate.",
    "full_desc": "Sensirion SCD40 reprezintă o revoluție în miniaturizarea senzorilor NDIR de dioxid de carbon. Dimensiunile sale de doar 10x10x7mm permit integrarea în carcase compacte de perete pentru case inteligente. Precizie ridicată de ±(50 ppm + 5% din citire) în intervalul standard 400 - 2000 ppm.",
    "technical_specs": {
      "accuracy": "±(50 ppm + 5% din valoarea citită)",
      "co2_range": "400 - 2000 ppm",
      "interfaces": [
        "I2C fast-mode (adresă fixă 0x62)"
      ],
      "operating_voltage": "2.4V - 5.5V DC (interfață I2C compatibilă 3.3V și 5V)",
      "integrated_sensors": "Senzor de temperatură (-10 la +60°C) și umiditate (0 la 100% RH)"
    },
    "pinout_info": null,
    "datasheet_url": "https://sensirion.com/products/catalog/SCD40/",
    "image_url": "https://gomagcdn.ro/domains/robofun.ro/files/product/medium/senzor-calitate-aer-co2-sensirion-scd40-ndir-i2c-291048.jpg",
    "badge": "Calitate Elvețiană",
    "tags": [
      "CO2 NDIR",
      "Sensirion",
      "SCD40",
      "Calitate Aer",
      "I2C"
    ],
    "rating": 4.91,
    "review_count": 15,
    "featured": false,
    "compatible_with": [
      "esp32-wroom-32d-type-c",
      "arduino-uno-r4-wifi"
    ]
  },
  {
    "slug": "senzor-sensirion-sht31-d-i2c",
    "name": "Senzor Digital de Temperatură și Umiditate Sensirion SHT31-D I2C",
    "sku": "SEN-SHT31-D",
    "mpn": "SHT31-DIS-B",
    "category_id": 3,
    "subcategory": "Senzori Ambientali & Calitate Aer",
    "price_ron": 48.99,
    "old_price_ron": 54.99,
    "stock": 28,
    "stock_status": "in_stock",
    "short_desc": "Senzor industrial calibrat din fabrică cu acuratețe ridicată: ±0.2°C pentru temperatură și ±2% pentru umiditate pe magistrală I2C.",
    "full_desc": "Sensirion SHT31-D oferă stabilitate de clasă industrială pe termen lung, fiind echipat cu un element intern de încălzire (heater) pentru deshidratarea senzorului în medii cu condens ridicat. Suportă alerte hardware de temperatură/umiditate configurabile pe pinul ALERT.",
    "technical_specs": {
      "features": "Alert pin configurabil, heater intern integrat",
      "interface": "I2C (adrese selectabile 0x44 sau 0x45)",
      "humidity_accuracy": "±2% r.H. în intervalul 0% la 100%",
      "operating_voltage": "2.15V - 5.5V DC",
      "temperature_accuracy": "±0.2°C în intervalul 0°C la 90°C"
    },
    "pinout_info": null,
    "datasheet_url": "https://sensirion.com/products/catalog/SHT31-DIS/",
    "image_url": "https://gomagcdn.ro/domains/robofun.ro/files/product/large/adafruit-sensiron-sht31-d-temperature-humidity-sen-138888-2109-703990.jpg",
    "badge": "±0.2°C Acuratețe",
    "tags": [
      "Sensirion",
      "SHT31",
      "Temperatură",
      "Umiditate",
      "Calibrat",
      "I2C"
    ],
    "rating": 4.94,
    "review_count": 19,
    "featured": false,
    "compatible_with": [
      "adafruit-feather-esp32-s3-stemma",
      "arduino-uno-r4-wifi"
    ]
  },
  {
    "slug": "senzor-sensirion-gy-sht40-i2c",
    "name": "Modul Senzor Digital Precizie Înaltă Sensirion SHT40 I2C",
    "sku": "SEN-GY-SHT40",
    "mpn": "GY-SHT40",
    "category_id": 3,
    "subcategory": "Senzori Ambientali & Calitate Aer",
    "price_ron": 23.99,
    "old_price_ron": 27.99,
    "stock": 45,
    "stock_status": "in_stock",
    "short_desc": "Cea mai nouă generație Sensirion de senzori ambientali: consum ultra-sczut de curent (sub 0.4 µA) și rezoluție pe 16 biți.",
    "full_desc": "SHT40 este succesorul seriilor SHT3x, oferind un consum energetic redus la jumătate și o protecție crescută împotriva contaminanților chimici din aer. Modulul compact include rezistori de pull-up pe liniile I2C și condensator de decuplare.",
    "technical_specs": {
      "interface": "I2C (adresă fixă 0x44)",
      "humidity_accuracy": "±1.8% r.H.",
      "operating_voltage": "1.08V - 3.6V DC",
      "power_consumption": "0.4 µA la 1 citire per secundă",
      "temperature_accuracy": "±0.2°C"
    },
    "pinout_info": null,
    "datasheet_url": "https://sensirion.com/products/catalog/SHT40/",
    "image_url": "https://gomagcdn.ro/domains/robofun.ro/files/product/large/321ae244-f1d9-423d-9a69-c017040ccb88-430057-6596-165668.png",
    "badge": "Ultra Low Power",
    "tags": [
      "SHT40",
      "Sensirion",
      "Temperatură",
      "Umiditate",
      "16-bit",
      "ESPHome"
    ],
    "rating": 4.9,
    "review_count": 12,
    "featured": false,
    "compatible_with": [
      "sparkfun-esp32-c6-thing-plus",
      "raspberry-pi-pico-2-rp2350"
    ]
  },
  {
    "slug": "senzor-temperatura-inox-ds18b20-waterproof",
    "name": "Senzor Temperatură Impermeabil DS18B20 Inox 1-Wire Cablu 1m",
    "sku": "SEN-DS18B20-WP-1M",
    "mpn": "DS18B20-WP",
    "category_id": 3,
    "subcategory": "Senzori Industriali & Temperatură",
    "price_ron": 16.99,
    "old_price_ron": null,
    "stock": 75,
    "stock_status": "in_stock",
    "short_desc": "Senzor digital Dallas/Maxim DS18B20 în capsulă etanșă din oțel inoxidabil cu cablu flexibil de 1 metru pe protocol 1-Wire.",
    "full_desc": "Ideal pentru măsurarea temperaturii apei din boilere, radiatoare, acvarii, conducte termice sau din exteriorul locuinței. Fiecare senzor are un identificator unic ROM pe 64 de biți gravat cu laser, permițând conectarea a zeci de senzori în paralel pe un singur pin de date folosind un simplu rezistor de pull-up de 4.7kΩ.",
    "technical_specs": {
      "cable": "Cablu cauciucat flexibil rezistent la umiditate de 100 cm",
      "accuracy": "±0.5°C în intervalul -10°C la +85°C",
      "resolution": "Selectabilă de la 9 la 12 biți (0.0625°C rezoluție)",
      "probe_dimensions": "Tub inox diametru 6mm, lungime 50mm",
      "operating_voltage": "3.0V - 5.5V DC (suportă și mod parazit pe linia de date)",
      "temperature_range": "-55°C la +125°C"
    },
    "pinout_info": null,
    "datasheet_url": "https://www.analog.com/media/en/technical-documentation/data-sheets/DS18B20.pdf",
    "image_url": "https://gomagcdn.ro/domains/robofun.ro/files/product/large/senzor-de-temperatura-waterproof-ds18b20-307-7881.jpg",
    "badge": "1-Wire Inox",
    "tags": [
      "DS18B20",
      "1-Wire",
      "Impermeabil",
      "Temperatură",
      "Inox",
      "ESPHome"
    ],
    "rating": 4.92,
    "review_count": 48,
    "featured": false,
    "compatible_with": [
      "esp32-wroom-32d-type-c",
      "arduino-uno-r4-wifi"
    ]
  },
  {
    "slug": "senzor-distanta-laser-tof-vl53l0x",
    "name": "Senzor Distanță Laser ToF STMicroelectronics VL53L0X 2m",
    "sku": "SEN-ST-VL53L0X",
    "mpn": "VL53L0X-BRK",
    "category_id": 3,
    "subcategory": "Telemetrie Laser & ToF",
    "price_ron": 19.99,
    "old_price_ron": 23.99,
    "stock": 41,
    "stock_status": "in_stock",
    "short_desc": "Telemetru laser infraroșu invizibil (940nm) cu tehnologie Time-of-Flight, măsurare precisă milimetrică a distanței independente de culoarea țintei.",
    "full_desc": "Spre deosebire de senzorii optici convenționali care măsoară intensitatea luminii reflectate, VL53L0X calculează cu precizie timpul necesar fotonilor de a parcurge distanța până la țintă și înapoi la detectorul SPAD. Măsurătoarea nu este afectată de culoarea sau rugozitatea suprafeței detectate.",
    "technical_specs": {
      "range": "Mod standard: 50mm - 1200mm | Mod long-range: până la 2000mm",
      "emitter": "Laser VCSEL 940nm (Clasa 1 sigură pentru ochi conform IEC 60825-1:2014)",
      "interfaces": [
        "I2C până la 400kHz (adresă 0x29 modificabilă prin software)"
      ],
      "operating_voltage": "2.8V - 5.0V DC (placă cu regulator LDO integrat)"
    },
    "pinout_info": null,
    "datasheet_url": "https://www.st.com/resource/en/datasheet/vl53l0x.pdf",
    "image_url": "https://gomagcdn.ro/domains/robofun.ro/files/product/medium/senzor-distanta-laser-tof-stmicroelectronics-vl53l0x-2m-i2c-192840.jpg",
    "badge": "Laser Time-of-Flight",
    "tags": [
      "VL53L0X",
      "Laser ToF",
      "Telemetru",
      "I2C",
      "Distanță Milimetrică"
    ],
    "rating": 4.88,
    "review_count": 19,
    "featured": false,
    "compatible_with": [
      "esp32-wroom-32d-type-c",
      "arduino-uno-r4-wifi"
    ]
  },
  {
    "slug": "senzor-curent-tensiune-ti-ina219",
    "name": "Senzor Curent și Tensiune Bidirecțional TI INA219 I2C High-Side",
    "sku": "SEN-TI-INA219",
    "mpn": "INA219BIDR",
    "category_id": 3,
    "subcategory": "Senzori Putere & Energie",
    "price_ron": 18.99,
    "old_price_ron": null,
    "stock": 52,
    "stock_status": "in_stock",
    "short_desc": "Monitorizare pe magistrală high-side de tensiune (0-26V DC) și curent (până la ±3.2A) cu rezoluție de 12 biți via I2C.",
    "full_desc": "Modulul ideal pentru monitorizarea consumului de energie al nodurilor homelab, panourilor solare DIY sau acumulatorilor LiFePO4. Măsurând căderea de tensiune pe un sunt de precizie de 0.1Ω plasat pe linia de plus (High-Side), nu introduce interferențe în masa sistemului electric.",
    "technical_specs": {
      "accuracy": "1% pe întreg domeniul de temperatură",
      "interfaces": "I2C (până la 4 adrese selectabile prin jumpere: 0x40, 0x41, 0x44, 0x45)",
      "bus_voltage": "0V la +26V DC",
      "current_range": "±3.2A cu rezistorul șunt de 0.1Ω (rezoluție 0.8mA)",
      "operating_voltage": "3.0V - 5.5V DC (alimentare logică)"
    },
    "pinout_info": null,
    "datasheet_url": "https://www.ti.com/lit/ds/symlink/ina219.pdf",
    "image_url": "https://gomagcdn.ro/domains/robofun.ro/files/product/medium/senzor-curent-tensiune-bidirectional-ti-ina219-i2c-26v-3a-641829.jpg",
    "badge": "Monitorizare Energie",
    "tags": [
      "INA219",
      "Curent DC",
      "Tensiune",
      "Putere",
      "I2C",
      "Solar"
    ],
    "rating": 4.93,
    "review_count": 32,
    "featured": false,
    "compatible_with": [
      "esp32-wroom-32d-type-c",
      "raspberry-pi-pico-2-rp2350"
    ]
  },
  {
    "slug": "senzor-particule-praf-laser-pms5003",
    "name": "Senzor Particule Praf PM2.5 / PM10 Plantower PMS5003 Laser",
    "sku": "SEN-PLAN-PMS5003",
    "mpn": "PMS5003",
    "category_id": 3,
    "subcategory": "Senzori Ambientali & Calitate Aer",
    "price_ron": 88.99,
    "old_price_ron": 104.99,
    "stock": 16,
    "stock_status": "in_stock",
    "short_desc": "Contor optic digital cu laser pentru particule în suspensie PM1.0, PM2.5 și PM10, ieșire serială UART, carcasă ecranată metalic.",
    "full_desc": "Senzor profesional pentru măsurarea poluării aerului conform standardelor naționale și internaționale. Utilizează principiul dispersiei luminii laser (Mie scattering) combinat cu un microventilator intern pentru tragerea constantă a probei de aer. Oferă citiri în micrograme per metru cub (µg/m³) și număr de particule pe fracțiuni de dimensiune.",
    "technical_specs": {
      "dimensions": "50 x 38 x 21 mm",
      "interfaces": "UART Serial 9600 baud (compatibil direct cu pinii RX/TX ESP32 și Raspberry Pi)",
      "particle_range": "0.3 µm până la 10 µm (categorii raportate: PM1.0, PM2.5, PM10)",
      "operating_voltage": "5V DC (logic level 3.3V UART)",
      "concentration_range": "0 la 1000 µg/m³ (acuratețe ±10% la 100-500 µg/m³)"
    },
    "pinout_info": null,
    "datasheet_url": "https://www.aqmd.gov/docs/default-source/aq-spec/resources-page/plantower-pms5003-manual_v2-3.pdf",
    "image_url": "https://gomagcdn.ro/domains/robofun.ro/files/product/medium/senzor-particule-praf-pm25-pm10-plantower-pms5003-laser-uart-710294.jpg",
    "badge": "Calitate Aer Laser",
    "tags": [
      "PMS5003",
      "PM2.5",
      "PM10",
      "Plantower",
      "Poluare Aer",
      "UART"
    ],
    "rating": 4.89,
    "review_count": 23,
    "featured": false,
    "compatible_with": [
      "esp32-wroom-32d-type-c",
      "raspberry-pi-5-8gb"
    ]
  },
  {
    "slug": "modul-4-relee-5v-optocuplate",
    "name": "Modul cu 4 Relee 5V Optocuplate 10A 250V AC cu Izolație Galvanică",
    "sku": "MOD-REL-4CH-5V",
    "mpn": "RELAY-4CH-OPTO",
    "category_id": 3,
    "subcategory": "Module Relee & Putere",
    "price_ron": 21.99,
    "old_price_ron": null,
    "stock": 68,
    "stock_status": "in_stock",
    "short_desc": "Placă cu 4 relee electromagnetice acționate la 5V, izolație cu optocuploare pentru protecția microcontrolerului, comutare până la 10A 250V AC.",
    "full_desc": "Modulul esențial pentru proiecte de automatizare a iluminatului, pompelor sau prizelor inteligente. Fiecare canal dispune de optocuplor independent, eliminând riscul ca vârfurile inductive de tensiune să ajungă înapoi pe pinii GPIO ai plăcii Arduino sau ESP32. Contacte normal deschise (NO) și normal închise (NC) disponibile pe terminale cu șurub.",
    "technical_specs": {
      "isolation": "Optocuploare PC817 pe fiecare canal cu jumper JD-VCC detașabil pentru alimentare separată",
      "indicators": "LED roșu pentru alimentare placă + 4 LED-uri verzi de stare pentru fiecare releu",
      "load_capacity": "Max 10A la 250V AC sau 10A la 30V DC",
      "trigger_level": "Active Low (declanșare la nivel logic 0)",
      "control_voltage": "5V DC (curent de declanșare 15-20mA per canal)"
    },
    "pinout_info": null,
    "datasheet_url": "https://example.com/datasheets/relay-4ch.pdf",
    "image_url": "https://gomagcdn.ro/domains/robofun.ro/files/product/medium/modul-4-relee-5v-optocuplate-10a-250v-ac-arduino-esp32-849201.jpg",
    "badge": "Izolație Galvanică",
    "tags": [
      "Releu",
      "4 Canale",
      "Optocuplor",
      "230V AC",
      "Automatizare",
      "Arduino"
    ],
    "rating": 4.87,
    "review_count": 45,
    "featured": false,
    "compatible_with": [
      "arduino-uno-r4-wifi",
      "esp32-wroom-32d-type-c"
    ]
  },
  {
    "slug": "releu-solid-state-ssr-40da",
    "name": "Releu Solid State SSR-40DA 40A 24-380V AC (Comandă 3-32V DC)",
    "sku": "REL-SSR-40DA",
    "mpn": "SSR-40DA",
    "category_id": 3,
    "subcategory": "Module Relee & Putere",
    "price_ron": 33.99,
    "old_price_ron": 38.99,
    "stock": 35,
    "stock_status": "in_stock",
    "short_desc": "Releu semiconductor static pentru comutare fără scânteie, fără zgomot mecanic, curent de sarcină de până la 40A AC și comandă directă de pe GPIO 3.3V/5V.",
    "full_desc": "Soluția modernă pentru comutarea sarcinilor mari de încălzire (boilere, paturi încălzite de imprimante 3D, rezistențe electrice industriale). Fiind compus exclusiv din semiconductori (triac și optocuplor intern), nu are piese în mișcare, asigurând o durată de viață practic infinită și comutare la trecerea prin zero (Zero-Crossing) pentru eliminarea paraziților de rețea.",
    "technical_specs": {
      "load_current": "40A maxim (pentru sarcini de peste 10A este obligatorie montarea pe un radiator de aluminiu)",
      "input_voltage": "3V - 32V DC (compatibil direct cu pini GPIO 3.3V de ESP32/Raspberry Pi și 5V Arduino)",
      "response_time": "Sub 10 ms",
      "output_voltage": "24V - 380V AC",
      "switching_type": "Zero Cross Switching",
      "isolation_voltage": "Peste 2500V AC între intrare și ieșire"
    },
    "pinout_info": null,
    "datasheet_url": "https://example.com/datasheets/ssr-40da.pdf",
    "image_url": "https://gomagcdn.ro/domains/robofun.ro/files/product/large/releu-solid-state-40a-3-32v-dc-1051-7905.jpeg",
    "badge": "Fără Scânteie / Silent",
    "tags": [
      "Solid State",
      "SSR",
      "40A",
      "Zero-Cross",
      "Comandă 3.3V",
      "Industrial"
    ],
    "rating": 4.9,
    "review_count": 28,
    "featured": false,
    "compatible_with": [
      "esp32-wroom-32d-type-c",
      "arduino-uno-r4-wifi"
    ]
  },
  {
    "slug": "modul-releu-solid-state-2-canale-ssr",
    "name": "Modul Releu Solid State SSR cu 2 Canale Comandă Optocuplată 5V",
    "sku": "MOD-SSR-2CH-5V",
    "mpn": "G3MB-202P-2CH",
    "category_id": 3,
    "subcategory": "Module Relee & Putere",
    "price_ron": 44.99,
    "old_price_ron": 51.99,
    "stock": 22,
    "stock_status": "in_stock",
    "short_desc": "Modul compact cu două relee electronice solide Omron G3MB-202P pentru 230V AC 2A, complet silențios cu siguranțe fuzibile integrate.",
    "full_desc": "Proiectat special pentru comutarea silențioasă a corpurilor de iluminat sau ventilatoarelor din dormitoare și birouri, unde sunetul releelor electromagnetice este deranjant. Fiecare canal include siguranță de protecție de 2A și contacte solide pe terminale cu șurub.",
    "technical_specs": {
      "features": "Zero-Cross switching, complet silențios (0 dB), siguranțe fuzibile incluse",
      "load_current": "2A maxim per canal",
      "output_voltage": "100V - 240V AC",
      "control_voltage": "5V DC (declanșare logică Low)"
    },
    "pinout_info": null,
    "datasheet_url": "https://omron.com/g3mb",
    "image_url": "https://gomagcdn.ro/domains/robofun.ro/files/product/large/modul-releu-solid-state-2-canale-1-807645-2711-424509.jpg",
    "badge": "0 dB Silențios",
    "tags": [
      "SSR",
      "Omron",
      "Silențios",
      "230V AC",
      "Home Assistant",
      "ESPHome"
    ],
    "rating": 4.89,
    "review_count": 14,
    "featured": false,
    "compatible_with": [
      "arduino-uno-r4-wifi",
      "esp32-wroom-32d-type-c"
    ]
  },
  {
    "slug": "convertor-industrial-rs485-la-ttl-uart",
    "name": "Convertor Industrial Bidirecțional RS485 la TTL UART cu Protecție TVS",
    "sku": "CONV-RS485-TTL",
    "mpn": "MAX485-IND",
    "category_id": 3,
    "subcategory": "Comunicație Industrială & CAN",
    "price_ron": 11.99,
    "old_price_ron": null,
    "stock": 46,
    "stock_status": "in_stock",
    "short_desc": "Modul adaptor pentru magistrale industriale Modbus RTU / RS485 cu control automat al direcției de flux și protecție la supratensiune.",
    "full_desc": "Permite citirea contoarelor inteligente de energie, invertoarelor fotovoltaice sau senzorilor industriali Modbus pe distanțe de până la 1200 de metri folosind un cablu torsadat. Include cip de comutare automată hardware a fluxului RX/TX fără necesitatea unui pin suplimentar de control DE/RE.",
    "technical_specs": {
      "baud_rate": "110 bps până la 128 kbps",
      "interfaces": "Pini 2.54mm UART (VCC, GND, TX, RX) + bloc terminal cu șuruburi A / B",
      "protection": "Diode TVS anti-tranzitorii, rezistor de terminare 120Ω integrat",
      "operating_voltage": "3.3V - 5.0V DC",
      "transmission_distance": "Până la 1200 metri la 9600 baud pe cablu torsadat"
    },
    "pinout_info": null,
    "datasheet_url": "https://example.com/datasheets/rs485-ttl.pdf",
    "image_url": "https://gomagcdn.ro/domains/robofun.ro/files/product/large/rs-485-1-262720-149-631759.jpg",
    "badge": "Modbus RTU",
    "tags": [
      "RS485",
      "Modbus",
      "Industrial",
      "UART",
      "TVS",
      "ESPHome"
    ],
    "rating": 4.86,
    "review_count": 25,
    "featured": false,
    "compatible_with": [
      "esp32-wroom-32d-type-c",
      "arduino-uno-r4-wifi"
    ]
  },
  {
    "slug": "sursa-industriala-mean-well-24v-13-4a",
    "name": "Sursă Industrială Mean Well LRS-350-24 (24V 14.6A 350W Carcasă Metal)",
    "sku": "MW-LRS-350-24",
    "mpn": "LRS-350-24",
    "category_id": 4,
    "subcategory": "Surse Industriale & Șină DIN",
    "price_ron": 194.99,
    "old_price_ron": 219.99,
    "stock": 16,
    "stock_status": "in_stock",
    "short_desc": "Sursă industrială în comutație de mare putere: ieșire 24V DC reglabilă ±10%, curent maxim 14.6A (350W) cu ventilator integrat inteligent.",
    "full_desc": "Standardul mondial de fiabilitate pentru alimentarea imprimantelor 3D mari, benzilor LED de mare putere, automatizărilor PLC și motoarelor pas cu pas NEMA. Carcasa compactă 1U include protecții complete la scurtcircuit, suprasarcină, supratensiune și temperatură ridicată.",
    "technical_specs": {
      "cooling": "Ventilator DC integrat cu pornire automată la sarcină termică",
      "dimensions": "215 x 115 x 30 mm (profil 1U joasă înălțime)",
      "efficiency": "88%",
      "input_voltage": "90 - 132V AC / 180 - 264V AC selectabil prin comutator",
      "output_current": "14.6 A (putere totală 350.4W)",
      "output_voltage": "24V DC (ajustabil între 21.6V și 28.8V prin potențiometru)"
    },
    "pinout_info": null,
    "datasheet_url": "https://www.meanwell.com/webapp/product/search.aspx?prod=LRS-350",
    "image_url": "https://gomagcdn.ro/domains/robofun.ro/files/product/large/alimentator-pulsatoriu24v-881781-1984-719180.jpg",
    "badge": "Mean Well 350W",
    "tags": [
      "Mean Well",
      "24V",
      "350W",
      "Industrial",
      "Alimentare",
      "Sursă Comutație"
    ],
    "rating": 4.97,
    "review_count": 31,
    "featured": true,
    "compatible_with": [
      "sina-din-otel-perforata-35mm-1m",
      "releu-solid-state-ssr-40da"
    ]
  },
  {
    "slug": "sursa-industriala-mean-well-12v-12-5a",
    "name": "Sursă Industrială Mean Well LRS-150-12 (12V 12.5A 150W Metal)",
    "sku": "MW-LRS-150-12",
    "mpn": "LRS-150-12",
    "category_id": 4,
    "subcategory": "Surse Industriale & Șină DIN",
    "price_ron": 134.99,
    "old_price_ron": 149.99,
    "stock": 24,
    "stock_status": "in_stock",
    "short_desc": "Sursă 12V 12.5A fără ventilator (100% silențioasă) pentru alimentarea serverelor mini PC, switch-urilor de rețea și camerelor IP.",
    "full_desc": "Cu un profil subțire de doar 30mm și răcire complet pasivă prin convecție naturală, Mean Well LRS-150-12 este ideală pentru dulapuri de rețea și rack-uri unde zgomotul ventilatoarelor nu este tolerat. Eficiență energetică ridicată de 87.5% și consum în gol sub 0.5W.",
    "technical_specs": {
      "safety": "Protecție scurtcircuit, suprasarcină (hiccup mode), supratensiune",
      "cooling": "Complet pasivă (fără ventilator)",
      "input_voltage": "85 - 264V AC universal",
      "output_current": "12.5 A (150W)",
      "output_voltage": "12V DC (ajustabil între 10.2V și 13.8V)"
    },
    "pinout_info": null,
    "datasheet_url": "https://www.meanwell.com/webapp/product/search.aspx?prod=LRS-150",
    "image_url": "https://gomagcdn.ro/domains/robofun.ro/files/product/large/alimentator-pulsatoriu-12v-69223-1982-291413.jpg",
    "badge": "12V 150W Fanless",
    "tags": [
      "Mean Well",
      "12V",
      "150W",
      "Fanless",
      "Alimentare Homelab"
    ],
    "rating": 4.95,
    "review_count": 26,
    "featured": false,
    "compatible_with": [
      "mini-pc-homelab-intel-n100-4x25gbe",
      "sina-din-otel-perforata-35mm-1m"
    ]
  },
  {
    "slug": "sursa-industriala-mean-well-lrs-100-12",
    "name": "Sursă Industrială Mean Well LRS-100-12 (12V 8.5A 102W Carcasă Metal)",
    "sku": "MW-LRS-100-12",
    "mpn": "LRS-100-12",
    "category_id": 4,
    "subcategory": "Surse Industriale & Șină DIN",
    "price_ron": 87.99,
    "old_price_ron": 97.99,
    "stock": 31,
    "stock_status": "in_stock",
    "short_desc": "Sursă de alimentare compactă în comutație de 12V 8.5A în carcasă metalică tip plasă, profil ultra-redus 1U (30mm), certificată industrial.",
    "full_desc": "Gama LRS de la Mean Well este standardul de aur mondial pentru alimentarea sigură și neîntreruptă a echipamentelor electronice. LRS-100-12 oferă o eficiență de până la 88%, rezistență la supratensiuni de intrare de până la 300V AC timp de 5 secunde și funcționare fără ventilator prin convecție naturală a aerului până la temperaturi ambientale de 70°C.",
    "technical_specs": {
      "dimensions": "129 x 97 x 30 mm (profil 1U joasă înălțime)",
      "efficiency": "88%",
      "protections": "Scurtcircuit, suprasarcină (mod hiccup, auto-recuperare), supratensiune",
      "input_voltage": "85 - 264V AC / 120 - 373V DC universal",
      "output_current": "8.5 A (putere totală 102W)",
      "output_voltage": "12V DC (ajustabil fin din potențiometru între 10.2V și 13.8V)"
    },
    "pinout_info": null,
    "datasheet_url": "https://www.meanwell.com/Upload/PDF/LRS-100/LRS-100-SPEC.PDF",
    "image_url": "https://gomagcdn.ro/domains/robofun.ro/files/product/medium/sursa-industriala-mean-well-lrs-100-12-12v-85a-carcasa-metalica-729104.jpg",
    "badge": "Eficiență 88%",
    "tags": [
      "Mean Well",
      "Sursă 12V",
      "Industrial",
      "100W",
      "Fără Ventilator"
    ],
    "rating": 4.96,
    "review_count": 36,
    "featured": false,
    "compatible_with": [
      "convertor-dcdc-buck-lm2596-voltmetru",
      "mini-pc-homelab-intel-n100-4x25gbe"
    ]
  },
  {
    "slug": "ups-rackmount-1u-line-interactive-750va",
    "name": "UPS Rackmount 1U Line-Interactive 750VA / 525W cu Afișaj LCD și Port USB/SNMP",
    "sku": "UPS-RACK-1U-750VA",
    "mpn": "PR750ERT1U",
    "category_id": 4,
    "subcategory": "Unități UPS & Alimentare Rack",
    "price_ron": 1179.99,
    "old_price_ron": 1289.99,
    "stock": 5,
    "stock_status": "low_stock",
    "short_desc": "Unitate UPS profesională 1U pentru rack 19\", undă sinusoidală pură (Pure Sinewave), reglare automată a tensiunii (AVR) și monitorizare NUT/USB.",
    "full_desc": "Protecția supremă pentru servere homelab, NAS-uri TrueNAS și routere împotriva căderilor de curent și a fluctuațiilor de tensiune. Formatul ultra-subțire 1U economisește spațiu prețios în rack. Oferă ieșire pe undă sinusoidală pură esențială pentru sursele cu PFC activ ale serverelor moderne și compatibilitate nativă cu Network UPS Tools (NUT) pentru oprirea controlată automată a mașinilor virtuale Proxmox la descărcarea bateriei.",
    "technical_specs": {
      "outlets": "4x Mufe IEC C13 protejate de baterie și supratensiune",
      "runtime": "Aproximativ 25 minute la o sarcină tipică de homelab (100W)",
      "capacity": "750 VA / 525 W",
      "topology": "Line-Interactive cu AVR dublu (Buck / Boost)",
      "waveform": "Undă sinusoidală pură (Pure Sine Wave)",
      "interfaces": "Port USB HID (recunoscut automat de Proxmox/TrueNAS) + slot pentru card SNMP",
      "form_factor": "Rackmount 19\" 1U (adâncime scurtă de 390mm)"
    },
    "pinout_info": null,
    "datasheet_url": "https://example.com/datasheets/ups-1u-750va.pdf",
    "image_url": "https://upload.wikimedia.org/wikipedia/commons/f/f4/UPSFrontView.jpg",
    "badge": "Undă Sinusoidală Pură",
    "tags": [
      "UPS",
      "Rack 1U",
      "Pure Sine",
      "NUT",
      "Proxmox",
      "TrueNAS",
      "AVR"
    ],
    "rating": 4.96,
    "review_count": 17,
    "featured": true,
    "compatible_with": [
      "minisforum-ms-01-workstation-mini-pc",
      "mini-pc-homelab-intel-n100-4x25gbe"
    ]
  },
  {
    "slug": "sina-din-otel-perforata-35mm-1m",
    "name": "Șină DIN Oțel Galvanizat Perforată 35mm x 7.5mm x 1 Metru",
    "sku": "DIN-RAIL-35-1M",
    "mpn": "TS35-7.5-1M",
    "category_id": 4,
    "subcategory": "Surse Industriale & Șină DIN",
    "price_ron": 18.99,
    "old_price_ron": null,
    "stock": 58,
    "stock_status": "in_stock",
    "short_desc": "Șină standard industrială EN 50022 Top Hat 35mm din oțel zincat pasivizat, cu fante pre-perforate de fixare pe toată lungimea.",
    "full_desc": "Baza montajului modular pentru tablouri electrice de automatizare, alimentatoare industriale, relee inteligente și module ESP32 pe șină DIN. Tratamentul de zincare și pasivizare electrochimică oferă rezistență excelentă la coroziune și aderență mecanică fermă.",
    "technical_specs": {
      "slots": "Fante ovale de 6.2 x 18 mm la pas de 25 mm",
      "material": "Oțel laminat la rece galvanizat pasivizat alb-argintiu",
      "standard": "EN 50022 / DIN 46277-3 (profil Top Hat 35mm)",
      "dimensions": "Lățime: 35 mm | Înălțime profil: 7.5 mm | Lungime: 1000 mm (1m)"
    },
    "pinout_info": null,
    "datasheet_url": "https://example.com/datasheets/din-rail-35.pdf",
    "image_url": "https://upload.wikimedia.org/wikipedia/commons/0/00/Din_rail.jpg",
    "badge": "Standard EN 50022",
    "tags": [
      "Șină DIN",
      "TS35",
      "Tablou Electric",
      "Automatizări",
      "Oțel Zincat"
    ],
    "rating": 4.91,
    "review_count": 34,
    "featured": false,
    "compatible_with": [
      "sursa-industriala-mean-well-24v-13-4a",
      "releu-solid-state-ssr-40da"
    ]
  },
  {
    "slug": "sursa-raspberry-pi-27w-usb-c",
    "name": "Sursă Oficială de Alimentare Raspberry Pi 27W USB-C PD (Negru)",
    "sku": "PWR-RPI-27W-BLK",
    "mpn": "SC1154",
    "category_id": 4,
    "subcategory": "Surse USB-PD & Laborator",
    "price_ron": 61.99,
    "old_price_ron": 68.99,
    "stock": 55,
    "stock_status": "in_stock",
    "short_desc": "Adaptor USB Power Delivery certificat special pentru Raspberry Pi 5: furnizează 5.1V la 5.0A (25.5W) pentru alimentarea perifericelor consumatoare.",
    "full_desc": "Concepută special pentru a susține cerințele energetice ridicate ale noului Raspberry Pi 5. Spre deosebire de adaptoarele clasice USB-PD care limitează ieșirea la 5V/3A (15W), sursa oficială comunică un profil personalizat de 5.1V / 5.0A. Acest lucru permite Raspberry Pi 5 să livreze un curent complet de 1.6A către cele 4 porturi USB pentru a alimenta simultan SSD-uri NVMe externe și modemuri fără avertismente de undervoltage.",
    "technical_specs": {
      "input": "100 - 240V AC, 50/60Hz priză europeană EU",
      "connector": "USB Type-C cu pini de mare putere",
      "protections": "Supracurent, supratensiune, scurtcircuit și protecție termică",
      "cable_length": "1.2 metri cablu integrat gros AWG 17 cu cădere minimă de tensiune",
      "output_profiles": "5.1V @ 5.0A (profil Pi 5), 9.0V @ 3.0A, 12.0V @ 2.25A, 15.0V @ 1.8A (standard USB-PD)"
    },
    "pinout_info": null,
    "datasheet_url": "https://datasheets.raspberrypi.com/power-supply/27w-power-supply-product-brief.pdf",
    "image_url": "https://gomagcdn.ro/domains/robofun.ro/files/product/medium/sursa-oficiala-raspberry-pi-27w-usb-c-pd-negru-eu-349018.jpg",
    "badge": "Certificat Pi 5",
    "tags": [
      "Raspberry Pi 5",
      "USB-C",
      "Power Delivery",
      "27W",
      "5.1V 5A",
      "Sursă Oficială"
    ],
    "rating": 4.96,
    "review_count": 48,
    "featured": false,
    "compatible_with": [
      "raspberry-pi-5-8gb",
      "raspberry-pi-5-4gb"
    ]
  },
  {
    "slug": "cooler-activ-oficial-raspberry-pi-5",
    "name": "Cooler Activ Oficial Raspberry Pi 5 (Radiator Aluminiu + Ventilator PWM)",
    "sku": "CLR-RPI5-ACT",
    "mpn": "SC1148",
    "category_id": 4,
    "subcategory": "Răcire Activă & Ventilatoare Industriale",
    "price_ron": 26.99,
    "old_price_ron": null,
    "stock": 62,
    "stock_status": "in_stock",
    "short_desc": "Soluția oficială de răcire: radiator masiv din aluminiu frezat, ventilator centrifugal PWM termostatat și pad-uri termice pre-aplicate.",
    "full_desc": "Sistemul esențial pentru funcționarea pe termen lung a unui Raspberry Pi 5 sub sarcină grea fără throttling termic. Se montează direct pe pinii prevăzuți pe placa de bază folosind pini de blocare elastici cu arc. Ventilatorul este controlat fin prin PWM direct de către sistemul de operare Raspberry Pi OS, pornind automat doar când temperatura procesorului atinge 60°C.",
    "technical_specs": {
      "airflow": "Până la 1.4 CFM",
      "heatsink": "Aluminiu anodizat argintiu, acoperă procesorul BCM2712, cipul RP1 și etajul PMIC de alimentare",
      "fan_control": "Conector dedicat JST 4-pin cu control turație PWM și feedback tahometru",
      "noise_level": "Sub 20 dB la turație medie, complet inaudibil în idle",
      "thermal_interface": "Pad-uri termice de înaltă conductivitate pre-montate din fabrică"
    },
    "pinout_info": null,
    "datasheet_url": "https://datasheets.raspberrypi.com/cooling/active-cooler-product-brief.pdf",
    "image_url": "https://gomagcdn.ro/domains/robofun.ro/files/product/medium/cooler-activ-oficial-raspberry-pi-5-radiator-ventilator-pwm-291048.jpg",
    "badge": "Răcire Zero Throttling",
    "tags": [
      "Raspberry Pi 5",
      "Cooler",
      "PWM",
      "Radiator Aluminiu",
      "Silențios"
    ],
    "rating": 4.97,
    "review_count": 56,
    "featured": false,
    "compatible_with": [
      "raspberry-pi-5-8gb",
      "raspberry-pi-5-4gb"
    ]
  },
  {
    "slug": "cooler-activ-negru-cnc-raspberry-pi-5",
    "name": "Cooler Activ Negru Aluminiu Frezat CNC pentru Raspberry Pi 5",
    "sku": "CLR-RPI5-CNC-BLK",
    "mpn": "RPI5-CNC-COOLER",
    "category_id": 4,
    "subcategory": "Răcire Activă & Ventilatoare Industriale",
    "price_ron": 38.99,
    "old_price_ron": 44.99,
    "stock": 29,
    "stock_status": "in_stock",
    "short_desc": "Radiator premium din aluminiu negru mat anodizat, frezat CNC de precizie cu ventilator silențios PWM integrat pentru Raspberry Pi 5.",
    "full_desc": "O alternativă estetică și robustă la coolerul oficial. Finisajul negru mat anodizat oferă o emisie termică radiativă superioară și un aspect curat în carcase deschise sau în clustere homelab montate în rack.",
    "technical_specs": {
      "fan": "Ventilator centrifugal PWM 4-pin conectat la mufa dedicată a plăcii",
      "coverage": "CPU BCM2712, cip I/O RP1, PMIC DA9091",
      "material": "Aluminiu 6063 frezat CNC, anodizat negru mat",
      "mounting": "Pini push-pin elastici cu arcuri din oțel inoxidabil"
    },
    "pinout_info": null,
    "datasheet_url": "https://example.com/datasheets/cnc-cooler-rpi5.pdf",
    "image_url": "https://gomagcdn.ro/domains/robofun.ro/files/product/large/39a5101a-df62-4d62-96ad-d1a213785fa0-191667-6600-303633.png",
    "badge": "Aluminiu CNC Negru",
    "tags": [
      "Raspberry Pi 5",
      "CNC",
      "Negru Mat",
      "Răcire Pasivă/Activă",
      "PWM"
    ],
    "rating": 4.93,
    "review_count": 18,
    "featured": false,
    "compatible_with": [
      "raspberry-pi-5-8gb",
      "raspberry-pi-5-4gb"
    ]
  },
  {
    "slug": "microventilator-12v-40mm-server",
    "name": "Microventilator 12V DC 40x40x10mm Rulare Continuă Rulment Dublu",
    "sku": "FAN-12V-4010-BB",
    "mpn": "FAN-4010-12V",
    "category_id": 4,
    "subcategory": "Răcire Activă & Ventilatoare Industriale",
    "price_ron": 17.99,
    "old_price_ron": null,
    "stock": 42,
    "stock_status": "in_stock",
    "short_desc": "Ventilator compact 40mm pentru switch-uri 1U de rețea, carcase mini PC și carcase de discuri cu rulmenți dubli cu bile pentru operare non-stop 24/7.",
    "full_desc": "Construit special pentru înlocuirea ventilatoarelor uzate și zgomotoase din switch-uri de rețea sau dulapuri tehnice. Rulmentul dublu cu bile (Dual Ball Bearing) garantează o durată de viață de peste 50.000 de ore chiar și la temperaturi ambientale ridicate.",
    "technical_specs": {
      "airflow": "6.8 CFM la 6000 RPM",
      "current": "0.08 A (consum sub 1W)",
      "connector": "Conector 2-pin / 3-pin cu pas standard de 2.54mm",
      "dimensions": "40 x 40 x 10 mm",
      "bearing_type": "Dual Ball Bearing (rulment dublu cu bile)",
      "operating_voltage": "12V DC (pornește de la 7V DC)"
    },
    "pinout_info": null,
    "datasheet_url": "https://example.com/datasheets/fan-4010.pdf",
    "image_url": "https://gomagcdn.ro/domains/robofun.ro/files/product/large/microventilator-406783-492-745232.jpg",
    "badge": "Rulment Dublu 24/7",
    "tags": [
      "Ventilator 40mm",
      "12V",
      "1U Server",
      "Switch Cooling",
      "Dual Ball Bearing"
    ],
    "rating": 4.88,
    "review_count": 27,
    "featured": false,
    "compatible_with": [
      "cabinet-rack-10-inch-6u",
      "switch-zyxel-gs1200-8"
    ]
  },
  {
    "slug": "convertor-dcdc-buck-lm2596-voltmetru",
    "name": "Convertor Coborâtor DC-DC Buck Step-Down LM2596 cu Voltmetru LED",
    "sku": "MOD-LM2596-VM",
    "mpn": "LM2596S-ADJ-VM",
    "category_id": 4,
    "subcategory": "Surse USB-PD & Laborator",
    "price_ron": 14.99,
    "old_price_ron": null,
    "stock": 78,
    "stock_status": "in_stock",
    "short_desc": "Modul reglabil de coborâre a tensiunii cu eficiență ridicată, intrare 4-40V, ieșire 1.25-37V DC max 3A, afișaj digital roșu cu buton de calibrare.",
    "full_desc": "Un instrument indispensabil pe masa oricărui pasionat de hardware. Permite coborârea tensiunii de la o sursă industrială de 12V sau 24V la tensiunea exactă cerută de proiect (ex: 5V pentru Raspberry Pi, 3.3V pentru senzori sau 9V pentru routere). Voltmetrul integrat cu 3 cifre permite vizualizarea instantanee a tensiunii de intrare sau de ieșire prin apăsarea unui simplu buton.",
    "technical_specs": {
      "display": "Voltmetru LED roșu 3 digiți cu precizie ±0.05V și posibilitate de calibrare manuală",
      "efficiency": "Până la 92%",
      "connections": "Terminale cu șuruburi pentru conectare fără lipire + pad-uri cositoribile",
      "input_voltage": "4.0V - 40V DC (tensiunea de intrare trebuie să fie cu minim 1.5V mai mare decât ieșirea)",
      "output_current": "Curent nominal 2A (până la 3A cu radiator suplimentar aplicat pe cip)",
      "output_voltage": "1.25V - 37V DC reglabil continuu prin potențiometru multitură"
    },
    "pinout_info": null,
    "datasheet_url": "https://www.ti.com/lit/ds/symlink/lm2596.pdf",
    "image_url": "https://gomagcdn.ro/domains/robofun.ro/files/product/medium/convertor-coborator-dcdc-buck-stepdown-lm2596-voltmetru-led-482910.jpg",
    "badge": "Afișaj Volți Integrat",
    "tags": [
      "LM2596",
      "Buck Converter",
      "Step-Down",
      "Voltmetru LED",
      "Reglabil"
    ],
    "rating": 4.84,
    "review_count": 41,
    "featured": false,
    "compatible_with": [
      "sursa-industriala-mean-well-lrs-100-12",
      "breadboard-830-puncte-alimentare"
    ]
  },
  {
    "slug": "regulator-dcdc-step-up-down-pololu-s7v8a",
    "name": "Regulator Tensiune Step-Up Step-Down S7V8A Pololu 2.7-11.8V la 5V",
    "sku": "POL-S7V8A",
    "mpn": "2118",
    "category_id": 4,
    "subcategory": "Surse USB-PD & Laborator",
    "price_ron": 28.99,
    "old_price_ron": 32.99,
    "stock": 26,
    "stock_status": "in_stock",
    "short_desc": "Regulator automat buck-boost în format miniatural: produce o tensiune stabilă de 5V din orice sursă de intrare între 2.7V și 11.8V.",
    "full_desc": "Regulatorul ideal pentru dispozitive alimentate din baterii a căror tensiune scade treptat pe măsură ce se descarcă (cum ar fi acumulatoare Li-Ion 3.7V sau pachete de baterii AA). Menține o ieșire fixă și stabilă de 5V indiferent dacă tensiunea bateriei este mai mică sau mai mare decât 5V.",
    "technical_specs": {
      "dimensions": "11.5 x 16.5 x 2.5 mm (incredibil de mic)",
      "efficiency": "80% - 90%",
      "input_voltage": "2.7V la 11.8V DC",
      "output_current": "Până la 1A la coborâre / 500mA la urcare de la 3.7V",
      "output_voltage": "5V DC fix (acuratețe ±4%)"
    },
    "pinout_info": null,
    "datasheet_url": "https://www.pololu.com/product/2118",
    "image_url": "https://gomagcdn.ro/domains/robofun.ro/files/product/large/s7v8a-1-447090-319-865071.jpg",
    "badge": "Buck-Boost Pololu",
    "tags": [
      "Pololu",
      "Step-Up/Down",
      "5V",
      "Baterie",
      "Miniatură",
      "IoT"
    ],
    "rating": 4.92,
    "review_count": 15,
    "featured": false,
    "compatible_with": [
      "breadboard-830-puncte-alimentare",
      "arduino-uno-r4-wifi"
    ]
  },
  {
    "slug": "regulator-dcdc-step-down-5v-9a-pololu",
    "name": "Regulator Coborâtor DC-DC Step-Down 5V 9A Pololu D24V90F5",
    "sku": "POL-D24V90F5",
    "mpn": "2858",
    "category_id": 4,
    "subcategory": "Surse USB-PD & Laborator",
    "price_ron": 81.99,
    "old_price_ron": 91.99,
    "stock": 14,
    "stock_status": "in_stock",
    "short_desc": "Regulator synchronus buck de mare putere: livrează un curent uriaș de 9A continuu la 5V DC dintr-o intrare de până la 38V.",
    "full_desc": "Soluția ideală pentru alimentarea clusterelor de Raspberry Pi dintr-o singură sursă de 12V sau 24V. Datorită topologiei de rectificare sincronă, atinge o eficiență de până la 95%, rămânând rece chiar și atunci când debitează mai mulți amperi către consumatori.",
    "technical_specs": {
      "features": "Protecție termică la supratemperatură, protecție la scurtcircuit",
      "efficiency": "Până la 95%",
      "input_voltage": "6V la 38V DC",
      "output_voltage": "5V DC (acuratețe 4%)",
      "continuous_output_current": "9 A continuu (45W putere la 5V)"
    },
    "pinout_info": null,
    "datasheet_url": "https://www.pololu.com/product/2858",
    "image_url": "https://gomagcdn.ro/domains/robofun.ro/files/product/large/regulator-step-down-5v-9a-d24v90f5-631-1053.jpg",
    "badge": "9A Ieșire 5V",
    "tags": [
      "Pololu",
      "Step-Down",
      "5V 9A",
      "Cluster RPi",
      "Eficiență 95%"
    ],
    "rating": 4.96,
    "review_count": 11,
    "featured": false,
    "compatible_with": [
      "sursa-industriala-mean-well-lrs-100-12",
      "raspberry-pi-5-8gb"
    ]
  },
  {
    "slug": "set-cabluri-injector-splitter-poe-pasiv",
    "name": "Set Cabluri Injector Pasiv PoE și Splitter RJ45 DC Jack 5.5x2.1mm",
    "sku": "POE-PASIV-SET",
    "mpn": "POE-INJ-SPL-SET",
    "category_id": 4,
    "subcategory": "Echipamente PoE",
    "price_ron": 21.99,
    "old_price_ron": null,
    "stock": 45,
    "stock_status": "in_stock",
    "short_desc": "Set de două adaptoare pentru transmiterea alimentării DC (12V sau 24V) prin perechile nefolosite (4,5 și 7,8) ale cablului de rețea Cat5e/Cat6.",
    "full_desc": "Permite alimentarea camerelor IP non-PoE, a routerelor sau a plăcilor de dezvoltare amplasate la distanță fără a trage cabluri de 230V. Setul conține un adaptor injector (cu mufă jack tată) și un adaptor splitter (cu mufă jack mamă standard de 5.5x2.1mm).",
    "technical_specs": {
      "connectors": "RJ45 tată + RJ45 mamă + mufă DC jack 5.5 x 2.1 mm",
      "pinout_poe": "Date pe pinii 1/2 și 3/6; Alimentare pe pinii 4/5 (+) și 7/8 (-)",
      "ethernet_speed": "10/100 Mbps",
      "voltage_support": "9V - 48V DC"
    },
    "pinout_info": null,
    "datasheet_url": "https://example.com/datasheets/poe-passive-set.pdf",
    "image_url": "https://gomagcdn.ro/domains/robofun.ro/files/product/large/passive-poe-injector-cable-set-2-101875-866-190960.jpg",
    "badge": "Plug-and-Play PoE",
    "tags": [
      "PoE",
      "Pasiv",
      "Injector",
      "Splitter",
      "Camere IP",
      "Rețea"
    ],
    "rating": 4.82,
    "review_count": 33,
    "featured": false,
    "compatible_with": [
      "cablu-patch-cord-cat6-utp-cupru-3m",
      "sursa-industriala-mean-well-12v-12-5a"
    ]
  },
  {
    "slug": "modul-expansiune-ups-hat-raspberry-pi",
    "name": "Modul Placă Expansiune UPS HAT cu Baterie Litiu 2500mAh pentru Raspberry Pi",
    "sku": "HAT-UPS-RPI-LIPO",
    "mpn": "RPI-UPS-HAT-V2",
    "category_id": 4,
    "subcategory": "Surse USB-PD & Laborator",
    "price_ron": 84.99,
    "old_price_ron": 98.99,
    "stock": 18,
    "stock_status": "in_stock",
    "short_desc": "Sursă neîntreruptibilă dedicată format HAT pentru Raspberry Pi: baterie inclusă, încărcare în timp real și comutare la căderea rețelei fără restart.",
    "full_desc": "Protejează cardurile SD și sistemul de operare Linux al Raspberry Pi împotriva coruperii cauzate de pene bruște de curent. Include circuit de monitorizare a stării bateriei via I2C (tensiune, curent descărcare, procentaj rămas) și scripturi de shutdown controlat automat.",
    "technical_specs": {
      "output": "5V DC până la 3.0A",
      "battery": "Celulă LiPo 2500mAh inclusă în pachet",
      "telemetry": "Monitorizare tensiune și nivel baterie prin magistrala I2C",
      "form_factor": "HAT standard cu pini pogo sau conector 40-pin",
      "switching_time": "Zero milisecunde (comutare instantanee fără resetarea procesorului)"
    },
    "pinout_info": null,
    "datasheet_url": "https://example.com/datasheets/ups-hat-rpi.pdf",
    "image_url": "https://gomagcdn.ro/domains/robofun.ro/files/product/large/placa-expansiune-ups-hat-baterie-litiu-2500-mah%20(1)-2813-448747.jpg",
    "badge": "Protecție Pană Curent",
    "tags": [
      "UPS HAT",
      "Raspberry Pi",
      "Baterie LiPo",
      "I2C Telemetrie",
      "Zero Reset"
    ],
    "rating": 4.91,
    "review_count": 22,
    "featured": false,
    "compatible_with": [
      "raspberry-pi-5-4gb",
      "raspberry-pi-5-8gb"
    ]
  },
  {
    "slug": "panou-rack-1u-4x-raspberry-pi",
    "name": "Panou Frontal Rack 1U 19-inch pentru 4x Raspberry Pi 4 / 5",
    "sku": "RCK-1U-4RPI",
    "mpn": "RCK-4RPI-1U-BLK",
    "category_id": 4,
    "subcategory": "Cabinete Rack & Accesorii",
    "price_ron": 239.99,
    "old_price_ron": 274.99,
    "stock": 9,
    "stock_status": "in_stock",
    "short_desc": "Panou modular din oțel debitat laser 1U pentru rack de 19\", permite montarea a până la 4 plăci Raspberry Pi 4 sau 5 cu acces frontal complet.",
    "full_desc": "Transformă plăcile tale Raspberry Pi într-un cluster compact și aerisit montat profesional în rack de servere. Fiecare nod are o tăviță metalică detașabilă individual cu șuruburi captive, permițând intervenția la o placă fără oprirea celorlalte. Oferă decupaje frontale pentru expunerea cardurilor MicroSD, a porturilor USB și a mufelor HDMI.",
    "technical_specs": {
      "capacity": "4 noduri independente Raspberry Pi 4 Model B sau Raspberry Pi 5",
      "features": "Tăvițe detașabile frontal cu acces la cardul MicroSD fără demontarea plăcii",
      "material": "Oțel laminat la rece de 1.5mm, vopsit electrostatic în negru mat texturat",
      "rack_size": "Standard 19-inch 1U (înălțime 44.45 mm, lățime 482.6 mm)"
    },
    "pinout_info": null,
    "datasheet_url": "https://example.com/datasheets/rpi-rack-1u.pdf",
    "image_url": "https://gomagcdn.ro/domains/robofun.ro/files/product/medium/panou-frontal-rack-1u-19-inch-pentru-4x-raspberry-pi-4-5-metal-391048.jpg",
    "badge": "Cluster 4 Noduri",
    "tags": [
      "Rack 1U",
      "19 inch",
      "Raspberry Pi 5",
      "Cluster Kubernetes",
      "Homelab"
    ],
    "rating": 4.93,
    "review_count": 16,
    "featured": false,
    "compatible_with": [
      "raspberry-pi-5-8gb",
      "raspberry-pi-5-4gb"
    ]
  },
  {
    "slug": "cablu-patch-cord-cat6-utp-cupru-3m",
    "name": "Cablu Rețea Patch Cord Cat6 UTP 3 Metri Cupru Masiv 250MHz Albastru",
    "sku": "CAB-CAT6-UTP-3M-BL",
    "mpn": "PC-C6-UTP-3M-BU",
    "category_id": 4,
    "subcategory": "Prototipare & Cabluri Rețea",
    "price_ron": 14.99,
    "old_price_ron": null,
    "stock": 85,
    "stock_status": "in_stock",
    "short_desc": "Cablu patch cord Cat6 de înaltă flexibilitate, conductoare 100% cupru pur (CU, nu CCA), lățime de bandă certificată 250MHz pentru Gigabit și 2.5GbE.",
    "full_desc": "Cablul ideal pentru conectarea serverelor din rack la switch sau router. Mufele RJ45 turnate dispun de pini placați cu aur de 50µm pentru prevenirea oxidării și protecție anti-agățare (snagless boot) a clemelor de blocare.",
    "technical_specs": {
      "jacket": "Înveliș exterior PVC rezistent la abraziune și UV",
      "standard": "Cat.6 U/UTP conform ISO/IEC 11801 și EN 50173",
      "bandwidth": "Până la 250 MHz (suportă 1000BASE-T și 2.5GBASE-T)",
      "conductors": "100% Cupru pur multifilar AWG 24/7 (fără aluminiu cuprat)",
      "connectors": "2x RJ45 ecranate cu contacte aurite și protecție flexibilă la îndoire"
    },
    "pinout_info": null,
    "datasheet_url": "https://example.com/datasheets/cat6-patch-3m.pdf",
    "image_url": "https://gomagcdn.ro/domains/robofun.ro/files/product/large/cablu-retea-utp2-jpg-149718-736-994974.jpg",
    "badge": "100% Cupru Pur",
    "tags": [
      "Cablu Rețea",
      "Patch Cord",
      "Cat6",
      "Cupru Pur",
      "Gigabit",
      "Snagless"
    ],
    "rating": 4.95,
    "review_count": 62,
    "featured": false,
    "compatible_with": [
      "switch-zyxel-gs1200-8",
      "patch-panel-10-inch-12-porturi",
      "mikrotik-rb5009ug-s-in"
    ]
  },
  {
    "slug": "breadboard-830-puncte-alimentare",
    "name": "Placă de Teste Breadboard Transparent 830 Puncte cu Benzi Duble de Alimentare",
    "sku": "BB-830P-TR",
    "mpn": "MB-102-TR",
    "category_id": 4,
    "subcategory": "Prototipare & Cabluri Rețea",
    "price_ron": 14.99,
    "old_price_ron": null,
    "stock": 110,
    "stock_status": "in_stock",
    "short_desc": "Placă pentru prototipare rapidă fără lipire (solderless), 830 puncte de contact din bronz fosforos placat cu nichel, corp transparent cu bandă adezivă 3M.",
    "full_desc": "Esențială pentru construirea circuitelor de testare cu senzori, microcontrolere Arduino, ESP32 și Raspberry Pi Pico. Carcasa din plastic transparent permite vizualizarea directă a lamelor de contact interne, fiind excelentă pentru învățare și depanare rapidă.",
    "technical_specs": {
      "pitch": "Pas standard 2.54 mm (0.1 inch)",
      "mounting": "Bandă dublu adezivă 3M pe spate + sistem lateral de îmbinare mecanică a mai multor plăci",
      "spring_clips": "Lamele elastice din bronz fosforos placat cu nichel (peste 5000 cicluri de inserție)",
      "total_points": "830 puncte (zona centrală 630 puncte cu șanț IC standard + 200 puncte pe 4 benzi de alimentare)",
      "compatibility": "Fire cu diametru AWG 20-29 (0.3mm - 0.8mm)"
    },
    "pinout_info": null,
    "datasheet_url": "https://example.com/datasheets/breadboard-830.pdf",
    "image_url": "https://gomagcdn.ro/domains/robofun.ro/files/product/medium/placa-de-teste-breadboard-transparent-830-puncte-cu-benzi-de-alimentare-820194.jpg",
    "badge": "Prototipare Rapidă",
    "tags": [
      "Breadboard",
      "Prototipare",
      "830 Puncte",
      "Solderless",
      "Transparent"
    ],
    "rating": 4.86,
    "review_count": 58,
    "featured": false,
    "compatible_with": [
      "set-cabluri-dupont-120-buc",
      "arduino-uno-r4-wifi",
      "esp32-wroom-32d-type-c"
    ]
  },
  {
    "slug": "set-cabluri-dupont-120-buc",
    "name": "Set Cabluri Jumper DuPont 120 Bucăți 20cm (Mamă-Mamă, Tată-Tată, Mamă-Tată)",
    "sku": "CAB-DUP-120PC",
    "mpn": "DUPONT-KIT-20CM",
    "category_id": 4,
    "subcategory": "Prototipare & Cabluri Rețea",
    "price_ron": 17.99,
    "old_price_ron": 21.99,
    "stock": 140,
    "stock_status": "in_stock",
    "short_desc": "Set complet de 120 fire jumper flexibile pas 2.54mm în 10 culori distincte: 40x M-M, 40x M-T, 40x T-T, lungime 20cm.",
    "full_desc": "Pachetul complet de cabluri necesar pentru orice conexiune între senzori I2C/SPI, module de relee și pinii GPIO ai plăcilor de dezvoltare. Firele pot fi separate individual sau menținute grupate în panglică pentru o cablare curată a magistralelor paralele.",
    "technical_specs": {
      "pitch": "Pas 2.54 mm standard DuPont",
      "colors": "10 culori distincte pentru identificarea ușoară a liniilor de alimentare și semnal",
      "length": "20 cm",
      "quantity": "120 bucăți (3 panglici a câte 40 de fire: Mamă-Mamă, Tată-Tată, Tată-Mamă)",
      "wire_gauge": "AWG 28 cupru multifilar flexibil"
    },
    "pinout_info": null,
    "datasheet_url": "https://example.com/datasheets/dupont-wires.pdf",
    "image_url": "https://gomagcdn.ro/domains/robofun.ro/files/product/medium/set-cabluri-jumper-dupont-120-bucati-20cm-mama-tata-591048.jpg",
    "badge": "Set Esențial",
    "tags": [
      "Cabluri Jumper",
      "DuPont",
      "Mamă-Mamă",
      "Tată-Tată",
      "Prototipare",
      "GPIO"
    ],
    "rating": 4.9,
    "review_count": 73,
    "featured": false,
    "compatible_with": [
      "breadboard-830-puncte-alimentare",
      "arduino-uno-r4-wifi",
      "esp32-wroom-32d-type-c"
    ]
  },
  {
    "slug": "server-rack-1u-supermicro-epyc-7302p",
    "name": "Server Rack 1U Supermicro SuperServer (AMD EPYC 7302P 16C/32T, 64GB DDR4 ECC, 4x 3.5\" Hot-Swap)",
    "sku": "SRV-SM-EPYC16",
    "mpn": "SYS-1014S-WTRT",
    "category_id": 5,
    "subcategory": "Servere Datacenter",
    "price_ron": 5889.99,
    "old_price_ron": 6249.99,
    "stock": 6,
    "stock_status": "in_stock",
    "short_desc": "Platformă rackmount 1U enterprise optimizată pentru noduri de virtualizare Proxmox VE / Ceph, procesor 16-Core EPYC Milan/Rome, IPMI dedicat și surse 500W redundante.",
    "full_desc": "Supermicro SuperServer 1014S oferă o densitate remarcabilă de calcul pentru infrastructuri de cloud privat și homelaburi avansate. Echipat cu socket SP3 compatibil AMD EPYC 7002/7003, 8 sloturi DIMM cu suport memorie ECC Registered până la 2TB și 4 sertare frontale 3.5\" SAS/SATA hot-swap. Include consolă IPMI 2.0 cu KVM over IP și HTML5 dedicat.",
    "technical_specs": {
      "ram": "64GB (2x 32GB) DDR4-3200MHz ECC Registered RDIMM (suport până la 2TB)",
      "storage": "4x Baie 3.5\"/2.5\" Hot-Swap SAS/SATA + 2x slot M.2 NVMe PCIe 4.0 x4 pe placă",
      "processor": "AMD EPYC 7302P 16 Nuclee / 32 Fire de execuție @ 3.0GHz (Boost 3.3GHz, 128MB L3 Cache)",
      "interfaces": [
        "2x 10GbE Base-T RJ45 (Intel X550-AT2)",
        "1x Port RJ45 IPMI dedicat",
        "2x USB 3.0 spate",
        "1x VGA",
        "1x PCIe 4.0 x16 Full-Height"
      ],
      "form_factor": "1U Rackmount 19\" (adâncime 650 mm)",
      "operating_voltage": "100-240V AC 50/60Hz redundant",
      "power_consumption": "Surse redundante 2x 500W 80 PLUS Platinum (1+1)"
    },
    "pinout_info": null,
    "datasheet_url": "https://www.supermicro.com/en/products/system/1U/1014/SYS-1014S-WTRT.cfm",
    "image_url": "https://gomagcdn.ro/domains/robofun.ro/files/product/large/supermicro-superserver-1u-rackmount-amd-epyc-7302p-64gb-ecc-192830.jpg",
    "badge": "Enterprise Flagship",
    "tags": [
      "Supermicro",
      "AMD EPYC",
      "1U Server",
      "ECC RAM",
      "IPMI",
      "Datacenter",
      "Proxmox"
    ],
    "rating": 4.98,
    "review_count": 14,
    "featured": true,
    "compatible_with": [
      "mellanox-connectx-5-25gbe-sfp28",
      "lsi-broadcom-sas-9300-8i-it-mode",
      "kioxia-cd6-r-384tb-u2-nvme-ssd"
    ]
  },
  {
    "slug": "mellanox-connectx-5-25gbe-sfp28",
    "name": "Placă de Rețea Mellanox ConnectX-5 Dual-Port 25GbE SFP28 PCIe 3.0 x8 (MCX512A-ACAT)",
    "sku": "NIC-MLX-CX5-25G",
    "mpn": "MCX512A-ACAT",
    "category_id": 5,
    "subcategory": "Rețelistică Datacenter",
    "price_ron": 1189.99,
    "old_price_ron": 1349.99,
    "stock": 18,
    "stock_status": "in_stock",
    "short_desc": "Placă PCIe dual-port 25GbE SFP28 cu accelerare hardware RoCE v2 (RDMA over Converged Ethernet), transferuri cu latență sub-microsecundă și suport SR-IOV.",
    "full_desc": "NVIDIA Mellanox ConnectX-5 EN oferă o lățime de bandă cumulată de până la 50Gb/s și o rată de procesare de până la 75 de milioane de pachete pe secundă. Ideală pentru cluster Ceph, iSCSI/NVMe-oF cu viteză extremă și noduri de virtualizare Proxmox / Kubernetes.",
    "technical_specs": {
      "protocols": [
        "RoCE v2 RDMA",
        "NVMe-oF",
        "SR-IOV (până la 1024 Virtual Functions)",
        "DPDK",
        "VXLAN / NVGRE offload"
      ],
      "interfaces": [
        "2x Slot SFP28 25GbE (compatibil și cu module 10GbE SFP+)",
        "Interfață PCIe 3.0 / 4.0 x8 (form factor Low Profile / Full Height)"
      ],
      "operating_voltage": "12V DC direct din slotul PCIe",
      "power_consumption": "Consum mediu: 9.7W (răcire pasivă cu radiator server)"
    },
    "pinout_info": null,
    "datasheet_url": "https://network.nvidia.com/files/doc-resources/pb-connectx-5-en-card.pdf",
    "image_url": "https://gomagcdn.ro/domains/robofun.ro/files/product/large/mellanox-connectx-5-dual-port-25gbe-sfp28-pcie-mcx512a-acat-481920.jpg",
    "badge": "25GbE RDMA",
    "tags": [
      "Mellanox",
      "ConnectX-5",
      "25GbE",
      "SFP28",
      "RDMA",
      "RoCE",
      "Ceph"
    ],
    "rating": 4.95,
    "review_count": 28,
    "featured": true,
    "compatible_with": [
      "server-rack-1u-supermicro-epyc-7302p",
      "mikrotik-ccr2004-1g-12s-plus-2xs"
    ]
  },
  {
    "slug": "mellanox-connectx-4-100gbe-qsfp28",
    "name": "Placă de Rețea Mellanox ConnectX-4 Dual-Port 100GbE QSFP28 PCIe 3.0 x16 (MCX415A-CCAT)",
    "sku": "NIC-MLX-CX4-100G",
    "mpn": "MCX415A-CCAT",
    "category_id": 5,
    "subcategory": "Rețelistică Datacenter",
    "price_ron": 1849.99,
    "old_price_ron": 2099.99,
    "stock": 8,
    "stock_status": "in_stock",
    "short_desc": "Placă PCIe dual-port 100 Gigabit QSFP28 pentru backbone de storage SAN, noduri de calcul HPC și clustere AI de înaltă performanță.",
    "full_desc": "Mellanox ConnectX-4 permite conexiuni de 100Gb/s per port prin conectori QSFP28. Oferă offload hardware complet pentru protocoale de overlay (VXLAN, GENEVE) și suport nativ pentru kernel Linux, Proxmox VE, FreeBSD și ESXi.",
    "technical_specs": {
      "protocols": [
        "RoCE v2",
        "GPUDirect RDMA",
        "Overlay Networks Offloading",
        "Overlay Gateway",
        "DPDK"
      ],
      "interfaces": [
        "2x Slot QSFP28 100GbE (suport cabluri DAC 100G, transceivere optice și breakout 4x25G)",
        "Interfață PCIe 3.0 x16"
      ],
      "power_consumption": "Consum maxim: 18.2W"
    },
    "pinout_info": null,
    "datasheet_url": "https://network.nvidia.com/files/doc-resources/pb-connectx-4-en-card.pdf",
    "image_url": "https://gomagcdn.ro/domains/robofun.ro/files/product/large/mellanox-connectx-4-dual-port-100gbe-qsfp28-pcie-mcx415a-ccat-718290.jpg",
    "badge": "100GbE Backbone",
    "tags": [
      "Mellanox",
      "100GbE",
      "QSFP28",
      "ConnectX-4",
      "HPC",
      "Datacenter"
    ],
    "rating": 4.9,
    "review_count": 11,
    "featured": false,
    "compatible_with": [
      "server-rack-1u-supermicro-epyc-7302p"
    ]
  },
  {
    "slug": "mikrotik-ccr2004-1g-12s-plus-2xs",
    "name": "Switch & Router MikroTik Cloud Core Router CCR2004-1G-12S+2XS (12x 10G SFP+, 2x 25G SFP28)",
    "sku": "NET-MTK-CCR2004",
    "mpn": "CCR2004-1G-12S+2XS",
    "category_id": 5,
    "subcategory": "Rețelistică Datacenter",
    "price_ron": 3189.99,
    "old_price_ron": 3449.99,
    "stock": 12,
    "stock_status": "in_stock",
    "short_desc": "Router enterprise montabil în rack 1U cu procesor quad-core Annapurna Labs Alpine v2, 12 sloturi 10G SFP+, 2 sloturi 25G SFP28 și alimentare duală redundantă.",
    "full_desc": "CCR2004-1G-12S+2XS este un router de mare densitate destinat rețelelor enterprise și furnizorilor de servicii. Fiecare port dispune de conexiune dedicată full-duplex fără bottleneck. Rulează sistemul RouterOS v7 cu licență Level 6 completă.",
    "technical_specs": {
      "ram": "4GB DDR4 RAM",
      "processor": "Annapurna Labs Alpine AL32400 Quad-Core ARMv8 64-bit @ 1.7GHz",
      "interfaces": [
        "12x Slot SFP+ 10Gbps",
        "2x Slot SFP28 25Gbps",
        "1x Port Gigabit Ethernet RJ45",
        "1x Port serial de consolă RJ45"
      ],
      "form_factor": "1U Rackmount 19\" (urechi de rack incluse)",
      "power_consumption": "Surse duale redundante interne AC 100-240V (consum maxim: 49W)"
    },
    "pinout_info": null,
    "datasheet_url": "https://i.mt.lv/cdn/rb_files/CCR2004-1G-12S_2XS-200508125133.pdf",
    "image_url": "https://i.mt.lv/cdn/rb_images/1922_hi_res.png",
    "badge": "Datacenter Router",
    "tags": [
      "MikroTik",
      "CCR2004",
      "25G SFP28",
      "10G SFP+",
      "RouterOS v7",
      "BGP"
    ],
    "rating": 4.96,
    "review_count": 22,
    "featured": true,
    "compatible_with": [
      "mellanox-connectx-5-25gbe-sfp28",
      "server-rack-1u-supermicro-epyc-7302p"
    ]
  },
  {
    "slug": "lsi-broadcom-sas-9300-8i-it-mode",
    "name": "Host Bus Adapter (HBA) LSI Broadcom SAS 9300-8i 12Gbps 8-Port PCIe 3.0 [Flashed IT Mode ZFS]",
    "sku": "HBA-LSI-9300-IT",
    "mpn": "03-25600-01B",
    "category_id": 5,
    "subcategory": "Storage Enterprise",
    "price_ron": 648.99,
    "old_price_ron": 719.99,
    "stock": 15,
    "stock_status": "in_stock",
    "short_desc": "Controller SAS3 12Gb/s direct passthrough (Initiator Target Mode) cu firmware oficial Avago/Broadcom P16, esențial pentru TrueNAS SCALE, ZFS pools și unRAID.",
    "full_desc": "LSI SAS 9300-8i este standardul de aur în comunitatea ZFS și Homelab pentru atașarea directă a HDD-urilor și SSD-urilor fără strat intermediar RAID hardware. Echipat cu controllerul LSI SAS3008 Fusion-MPT 2.5 și 2 porturi interne mini-SAS HD SFF-8643, controlează până la 1024 de discuri non-RAID prin expandere SAS.",
    "technical_specs": {
      "processor": "LSI SAS3008 Fusion-MPT 2.5 Controller",
      "protocols": [
        "12Gb/s SAS-3",
        "6Gb/s SATA-III",
        "IT Mode nativ (Direct Passthrough JBOD)"
      ],
      "interfaces": [
        "2x Conectori interni Mini-SAS HD (SFF-8643)",
        "Interfață PCIe 3.0 x8"
      ],
      "power_consumption": "Consum tipic: 13W"
    },
    "pinout_info": null,
    "datasheet_url": "https://docs.broadcom.com/doc/12353331",
    "image_url": "https://gomagcdn.ro/domains/robofun.ro/files/product/large/lsi-broadcom-sas-9300-8i-12gbps-8-port-hba-it-mode-zfs-819203.jpg",
    "badge": "ZFS Passthrough",
    "tags": [
      "LSI",
      "Broadcom",
      "HBA",
      "IT Mode",
      "ZFS",
      "TrueNAS",
      "SAS3"
    ],
    "rating": 4.97,
    "review_count": 36,
    "featured": true,
    "compatible_with": [
      "server-rack-1u-supermicro-epyc-7302p"
    ]
  },
  {
    "slug": "kioxia-cd6-r-384tb-u2-nvme-ssd",
    "name": "SSD Enterprise Kioxia CD6-R 3.84TB U.2 NVMe PCIe 4.0 x4 (KCD61RUL3T84, 1 DWPD, Power Loss Protection)",
    "sku": "SSD-KIO-3840-U2",
    "mpn": "KCD61RUL3T84",
    "category_id": 5,
    "subcategory": "Storage Enterprise",
    "price_ron": 2289.99,
    "old_price_ron": 2499.99,
    "stock": 10,
    "stock_status": "in_stock",
    "short_desc": "SSD NVMe U.2 enterprise de clasă datacenter cu condensatori hardware de protecție la căderea tensiunii (PLP), latență constantă deterministă și anduranță 1 DWPD.",
    "full_desc": "Kioxia CD6-R oferă performanțe de transfer de până la 6.200 MB/s la citire și 1.000.000 IOPS aleatorii. Condensatorii fizici integrati garantează salvarea cache-ului DRAM pe flash NAND în fracțiuni de secundă în caz de pană bruscă de curent, eliminând coruperea bazelor de date și a pool-urilor ZFS.",
    "technical_specs": {
      "storage": "Capacitate: 3.84TB 3D BiCS FLASH TLC",
      "endurance": "1 DWPD (Drive Writes Per Day) timp de 5 ani (peste 7.000 TBW)",
      "interfaces": [
        "U.2 (SFF-8639) PCIe 4.0 x4, compatibil NVMe 1.4"
      ],
      "form_factor": "2.5 inch, grosime 15mm",
      "performance": "Citire secvențială: 6.200 MB/s | Scriere: 4.000 MB/s | IOPS citire 4K: 1.000.000"
    },
    "pinout_info": null,
    "datasheet_url": "https://business.kioxia.com/en-jp/buy/cd6-r-series.html",
    "image_url": "https://gomagcdn.ro/domains/robofun.ro/files/product/large/kioxia-cd6-r-3-84tb-u2-nvme-pcie-4-datacenter-ssd-plp-319204.jpg",
    "badge": "Enterprise PLP",
    "tags": [
      "Kioxia",
      "U.2 NVMe",
      "Datacenter SSD",
      "PLP",
      "PCIe 4.0",
      "ZFS"
    ],
    "rating": 4.92,
    "review_count": 9,
    "featured": false,
    "compatible_with": [
      "server-rack-1u-supermicro-epyc-7302p"
    ]
  },
  {
    "slug": "eaton-epdu-g3-managed-16a",
    "name": "PDU Rackmount Administrat Eaton ePDU G3 Managed 16A (8x C13 + 2x C19, Monitorizare per Priză)",
    "sku": "PDU-EAT-G3-M16",
    "mpn": "EMAB04",
    "category_id": 5,
    "subcategory": "Alimentare & PDU",
    "price_ron": 1679.99,
    "old_price_ron": 1849.99,
    "stock": 7,
    "stock_status": "in_stock",
    "short_desc": "Unitate inteligentă de distribuție a energiei electrice pentru rack de servere cu măsurare precisă clasa 1 (±1%) și pornire/oprire la distanță pentru fiecare priză via SNMP v3 / Web.",
    "full_desc": "Eaton ePDU G3 Managed oferă control absolut asupra alimentării echipamentelor din rack. Permite reboot la distanță al nodurilor blocate, secvențiere de pornire pentru a preveni căderea disjunctoarelor din cauza curenților de pornire (inrush current) și alertare prin e-mail/SNMP.",
    "technical_specs": {
      "interfaces": [
        "8x Priză IEC-320-C13 securizate cu blocator mecanic",
        "2x Priză IEC-320-C19",
        "1x Port RJ45 Gigabit Ethernet de management",
        "1x Port senzor de temperatură/umiditate"
      ],
      "form_factor": "Montabil 1U orizontal sau 0U vertical în rack 19\"",
      "operating_voltage": "200-240V AC 50/60Hz (curent nominal 16A, conector IEC 60309 sau C20)"
    },
    "pinout_info": null,
    "datasheet_url": "https://www.eaton.com/content/dam/eaton/products/backup-power-ups-surge-it-power-distribution/it-power-distribution/eaton-epdu-g3-managed-brochure.pdf",
    "image_url": "https://gomagcdn.ro/domains/robofun.ro/files/product/large/eaton-epdu-g3-managed-16a-0u-1u-c13-c19-snmp-910284.jpg",
    "badge": "Smart PDU",
    "tags": [
      "Eaton",
      "ePDU",
      "Managed PDU",
      "SNMP",
      "Rack 19inch",
      "Datacenter"
    ],
    "rating": 4.89,
    "review_count": 8,
    "featured": false,
    "compatible_with": [
      "server-rack-1u-supermicro-epyc-7302p",
      "mikrotik-ccr2004-1g-12s-plus-2xs"
    ]
  },
  {
    "slug": "raritan-dominion-kx-iii-8-port-kvm-ip",
    "name": "Consolă KVM over IP Raritan Dominion KX III (8 Porturi Server Cat5, Acces BIOS Web HTML5)",
    "sku": "KVM-RAR-KX3-8",
    "mpn": "DKX3-108",
    "category_id": 5,
    "subcategory": "Management Datacenter",
    "price_ron": 3849.99,
    "old_price_ron": 4199.99,
    "stock": 4,
    "stock_status": "in_stock",
    "short_desc": "Switch KVM IP enterprise de nivel militar pentru administrare out-of-band la nivel de BIOS cu client web 100% HTML5 fără Java, streaming 1080p la 30fps și suport Virtual Media.",
    "full_desc": "Raritan Dominion KX III este utilizat în centrele de date pentru acces out-of-band complet la servere chiar și atunci când sistemul de operare nu pornește sau placa de rețea nu are drivere. Permite maparea unui fișier ISO de pe laptopul tehnicianului direct în server ca unitate optică virtuală pentru instalare de la distanță.",
    "technical_specs": {
      "interfaces": [
        "8x Porturi RJ45 pentru dongle-uri CIM Cat5 (VGA/USB/HDMI)",
        "2x Porturi Gigabit Ethernet redundante (failover)",
        "1x Port modem out-of-band",
        "Alimentare duală AC"
      ],
      "form_factor": "1U Rackmount 19\"",
      "performance": "Video digital 1920x1080 @ 30fps cu compresie hardware DVI/VGA"
    },
    "pinout_info": null,
    "datasheet_url": "https://www.raritan.com/products/kvm-serial-consoles/kvm-over-ip-switches/dominion-kx-iii",
    "image_url": "https://gomagcdn.ro/domains/robofun.ro/files/product/large/raritan-dominion-kx-iii-8-port-kvm-over-ip-html5-bios-619283.jpg",
    "badge": "Out-of-Band",
    "tags": [
      "Raritan",
      "KVM over IP",
      "Dominion KX",
      "Out-of-Band",
      "Datacenter",
      "HTML5"
    ],
    "rating": 4.94,
    "review_count": 6,
    "featured": false,
    "compatible_with": [
      "server-rack-1u-supermicro-epyc-7302p"
    ]
  },
  {
    "slug": "apple-iphone-7-a10-fusion-linux-dev-node",
    "name": "Apple iPhone 7 (A10 Fusion) 32GB Black [Ready for Linux / checkm8 / postmarketOS]",
    "sku": "DEV-APL-IP7-A10",
    "mpn": "A1778-LINUX-DEV",
    "category_id": 6,
    "subcategory": "Apple Linux (A10)",
    "price_ron": 388.99,
    "old_price_ron": 439.99,
    "stock": 14,
    "stock_status": "in_stock",
    "short_desc": "Dispozitiv A10 Fusion cu bootrom exploatabil permanent prin checkm8, testat pentru Project Sandcastle, postmarketOS și bootare directă de kernel Linux mainline 6.x.",
    "full_desc": "Datorită vulnerabilității iremediabile din BootROM (checkm8), cipul Apple A10 Fusion (4-core, 2 Hurricane + 2 Zephyr) reprezintă o platformă remarcabilă și ultra-eficientă pentru rularea sistemelor Linux pe arhitectură ARM64. Dispozitivul este recondiționat, cu ecran 4.7\" Retina intact, baterie verificată (>85% capacitate) și port Lightning cu mod DFU complet operațional.",
    "technical_specs": {
      "ram": "2GB LPDDR4",
      "display": "4.7\" IPS Retina 1334x750",
      "storage": "32GB NVMe intern (partiționabil pentru rădăcină Linux)",
      "processor": "Apple A10 Fusion Quad-Core 64-bit ARMv8 @ 2.34GHz",
      "interfaces": [
        "Port Lightning cu suport serial UART via cablu DCSD / conector special",
        "Wi-Fi 802.11ac dual-band",
        "Bluetooth 4.2"
      ],
      "operating_voltage": "Alimentare 5V 1A Lightning sau baterie internă Li-Ion 1960 mAh"
    },
    "pinout_info": {
      "pin_map": [
        {
          "pin": "Pin 1",
          "name": "GND",
          "function": "Masă electrică"
        },
        {
          "pin": "Pin 2",
          "name": "L0p (DP)",
          "function": "USB D+ / UART TX (în mod debug serial)"
        },
        {
          "pin": "Pin 3",
          "name": "L0n (DM)",
          "function": "USB D- / UART RX (în mod debug serial)"
        },
        {
          "pin": "Pin 4",
          "name": "ID0",
          "function": "Detecție accesoriu"
        },
        {
          "pin": "Pin 5",
          "name": "PWR",
          "function": "Alimentare 5V DC"
        }
      ],
      "total_pins": 8,
      "logic_level": "3.3V UART (via accesorii debug)",
      "wiring_notes": [
        "Pentru activarea consolei seriale UART este recomandat un cablu DCSD Alex sau sonde hardware de tip Tigard.",
        "Pornirea Linux se realizează din modul DFU rulând `checkra1n -c` sau payload-ul custom `pongoOS` cu argumente de boot `boot-args=\"console=tty0\"`.",
        "Suportă distribuția postmarketOS cu interfață Phosh sau Alpine Linux minimal headless."
      ]
    },
    "datasheet_url": "https://postmarketos.org/wiki/apple-iphone-7",
    "image_url": "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=600&auto=format&fit=crop&q=80",
    "badge": "checkm8 Ready",
    "tags": [
      "Apple",
      "iPhone 7",
      "A10 Fusion",
      "checkm8",
      "postmarketOS",
      "Linux ARM64",
      "OS Dev"
    ],
    "rating": 4.88,
    "review_count": 19,
    "featured": true,
    "compatible_with": [
      "tigard-multi-protocol-hardware-debug-probe",
      "black-magic-probe-v2-3-swd-jtag"
    ]
  },
  {
    "slug": "apple-ipad-6th-gen-a10-linux-workstation",
    "name": "Apple iPad 6th Gen 9.7\" (A10 Fusion, 2GB RAM) [checkm8 Linux Node / USB Host]",
    "sku": "DEV-APL-IPAD6-A10",
    "mpn": "A1893-DEV",
    "category_id": 6,
    "subcategory": "Apple Linux (A10)",
    "price_ron": 648.99,
    "old_price_ron": 719.99,
    "stock": 9,
    "stock_status": "in_stock",
    "short_desc": "Platformă de dezvoltare A10 Fusion cu ecran generos 9.7\" Retina 2048x1536, compatibilă checkm8, capabilă de mod USB Host (tastatură/mouse/Ethernet) sub kernel Linux.",
    "full_desc": "iPad 6 (2018) este ultimul model de iPad cu ecran clasic și buton Home ce conține procesorul A10 vulnerabil prin checkm8. Cu adaptorul Lightning to USB 3 Camera Adapter, oferă port USB-A host complet sub Linux pentru tastaturi fizice, adaptoare Gigabit Ethernet și stick-uri de memorie.",
    "technical_specs": {
      "ram": "2GB LPDDR4 SDRAM",
      "display": "9.7\" Retina IPS 2048x1536 (264 ppi)",
      "storage": "32GB NVMe intern",
      "processor": "Apple A10 Fusion Quad-Core 64-bit @ 2.34GHz",
      "connectivity": "Wi-Fi 802.11a/b/g/n/ac dual band (2.4GHz + 5GHz), Bluetooth 4.2"
    },
    "pinout_info": null,
    "datasheet_url": "https://wiki.postmarketos.org/wiki/Apple_iPad_6th_generation_(apple-ipad6)",
    "image_url": "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&auto=format&fit=crop&q=80",
    "badge": "Linux Tablet",
    "tags": [
      "Apple",
      "iPad 6",
      "A10 Fusion",
      "checkm8",
      "Linux",
      "postmarketOS"
    ],
    "rating": 4.91,
    "review_count": 12,
    "featured": false,
    "compatible_with": [
      "apple-iphone-7-a10-fusion-linux-dev-node"
    ]
  },
  {
    "slug": "apple-ipad-pro-105-a10x-fusion-6-core",
    "name": "Apple iPad Pro 10.5\" (A10X Fusion 6-Core, 4GB RAM) [checkm8 A10X High-Perf Linux]",
    "sku": "DEV-APL-IPRO-A10X",
    "mpn": "A1701-A10X-DEV",
    "category_id": 6,
    "subcategory": "Apple Linux (A10X)",
    "price_ron": 889.99,
    "old_price_ron": 989.99,
    "stock": 6,
    "stock_status": "in_stock",
    "short_desc": "Sistem de calcul de înaltă performanță A10X Fusion 6-Core (3 Hurricane + 3 Zephyr, 12-core GPU), 4GB LPDDR4 și ecran ProMotion 120Hz cu suport bootrom checkm8.",
    "full_desc": "Subcategoria A10X reprezintă apogeul puterii de calcul exploatabile prin checkm8 fără semnături Apple. Cu 4GB RAM LPDDR4 și 6 nuclee active, iPad Pro 10.5 oferă dublul performanței lui A10 simplu, permițând compilarea nativă de pachete Debian/Alpine direct pe dispozitiv.",
    "technical_specs": {
      "ram": "4GB LPDDR4 RAM",
      "display": "10.5\" True Tone ProMotion 120Hz (2224x1668)",
      "storage": "64GB NVMe Flash",
      "processor": "Apple A10X Fusion 6-Core (3 nuclee performanță Hurricane + 3 eficiență Zephyr) @ 2.38GHz",
      "interfaces": [
        "Port Lightning (USB 3.0 Host capabil)",
        "Smart Connector lateral (3 pini)"
      ]
    },
    "pinout_info": null,
    "datasheet_url": "https://wiki.postmarketos.org/wiki/Apple_iPad_Pro_10.5-inch_(apple-ipad7)",
    "image_url": "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=600&auto=format&fit=crop&q=80",
    "badge": "A10X 6-Core Flagship",
    "tags": [
      "Apple",
      "A10X Fusion",
      "iPad Pro",
      "checkm8",
      "Linux ARM64",
      "120Hz"
    ],
    "rating": 4.97,
    "review_count": 8,
    "featured": true,
    "compatible_with": [
      "apple-iphone-7-a10-fusion-linux-dev-node"
    ]
  },
  {
    "slug": "orange-pi-5-plus-16gb-rk3588",
    "name": "Orange Pi 5 Plus 16GB RAM (Rockchip RK3588 8-Core, 2x 2.5GbE, NPU 6 TOPS)",
    "sku": "SBC-OPI-5P-16G",
    "mpn": "OPI-5PLUS-16GB",
    "category_id": 6,
    "subcategory": "SBC Speciale",
    "price_ron": 748.99,
    "old_price_ron": 798.99,
    "stock": 16,
    "stock_status": "in_stock",
    "short_desc": "SBC de performanță extremă cu SoC octa-core Rockchip RK3588 (4x A76 + 4x A55), 16GB RAM, 2 porturi 2.5GbE LAN, 2 ieșiri HDMI 8K și slot M.2 NVMe PCIe 3.0 x4.",
    "full_desc": "Orange Pi 5 Plus depășește orice SBC convențional prin conectivitatea sa abundentă: două porturi Ethernet 2.5G Realtek RTL8125BG, slot M.2 M-Key pentru SSD NVMe 2280 la viteze de până la 2000 MB/s, slot M.2 E-Key pentru card Wi-Fi 6E, intrare HDMI Rx 4K și NPU integrat de 6 TOPS pentru inteligență artificială locală.",
    "technical_specs": {
      "npu": "6 TOPS NPU integrat (INT4/INT8/INT16/FP16)",
      "ram": "16GB LPDDR4/4x 2133MHz",
      "processor": "Rockchip RK3588 Octa-core 64-bit (4x Cortex-A76 @ 2.4GHz + 4x Cortex-A55 @ 1.8GHz)",
      "interfaces": [
        "2x 2.5GbE RJ45",
        "2x HDMI 2.1 Out (8K60p)",
        "1x HDMI 2.0 In (4K60p)",
        "1x M.2 M-Key PCIe 3.0 x4 2280",
        "1x M.2 E-Key PCIe 2.0",
        "2x USB 3.0",
        "2x USB 2.0",
        "1x USB-C DisplayPort",
        "40-Pin GPIO"
      ],
      "operating_voltage": "5V DC via USB-C (recomandat 5V/4A sau sursă PD)"
    },
    "pinout_info": {
      "gpio_count": 28,
      "total_pins": 40,
      "logic_level": "3.3V LVCMOS",
      "wiring_notes": [
        "Compatibil cu distribuțiile Ubuntu 22.04/24.04, Debian 12 și Armbian cu kernel mainline 6.x."
      ]
    },
    "datasheet_url": "http://www.orangepi.org/html/hardWare/computerAndMicrocontrollers/details/Orange-Pi-5-Plus.html",
    "image_url": "https://gomagcdn.ro/domains/robofun.ro/files/product/large/orange-pi-5-plus-16gb-rockchip-rk3588-8-core-921443.jpg",
    "badge": "Dual 2.5G & 8K",
    "tags": [
      "Orange Pi",
      "RK3588",
      "SBC",
      "2.5GbE",
      "NPU",
      "PCIe 3.0",
      "Armbian"
    ],
    "rating": 4.94,
    "review_count": 23,
    "featured": true,
    "compatible_with": [
      "google-coral-usb-accelerator-edge-tpu",
      "hailo-8-m2-ai-acceleration-module"
    ]
  },
  {
    "slug": "radxa-rock-5b-8gb-rk3588",
    "name": "Radxa Rock 5B 8GB RAM (Rockchip RK3588, Dual 8K HDMI, 2.5GbE, M.2 M-Key)",
    "sku": "SBC-RDX-R5B-8G",
    "mpn": "ROCK-5B-8GB",
    "category_id": 6,
    "subcategory": "SBC Speciale",
    "price_ron": 688.99,
    "old_price_ron": 748.99,
    "stock": 11,
    "stock_status": "in_stock",
    "short_desc": "Placă de calcul cu arhitectură ARM64 RK3588, factor de formă Pico-ITX, slot M.2 NVMe cu 4 benzi PCIe 3.0 și suport excelent pentru virtualizare KVM și containere Docker.",
    "full_desc": "Radxa Rock 5B este unul dintre cele mai robuste SBC-uri industriale bazate pe RK3588. Suportă memorie eMMC 5.1 modulară, alimentare USB-PD 9V-20V, butoane hardware Power/Recovery/Maskrom și conector dedicat de baterie RTC.",
    "technical_specs": {
      "ram": "8GB LPDDR4x 64-bit",
      "processor": "Rockchip RK3588 Octa-core @ 2.4GHz + GPU Mali G610 MP4",
      "interfaces": [
        "1x 2.5GbE RJ45 cu suport PoE",
        "2x HDMI Out 8K60p + 1x HDMI In 4K",
        "M.2 M-Key 2280 PCIe 3.0 x4",
        "4x USB (2x 3.0, 2x 2.0)",
        "40-Pin GPIO"
      ],
      "operating_voltage": "USB Type-C PD 2.0 (9V/2A, 12V/2A, 15V/2A, 20V/2A)"
    },
    "pinout_info": null,
    "datasheet_url": "https://docs.radxa.com/rock5/rock5b",
    "image_url": "https://gomagcdn.ro/domains/robofun.ro/files/product/large/radxa-rock-5b-8gb-rk3588-812391.jpg",
    "badge": "Pico-ITX ARM",
    "tags": [
      "Radxa",
      "Rock 5B",
      "RK3588",
      "SBC ARM",
      "8K",
      "USB-PD"
    ],
    "rating": 4.9,
    "review_count": 15,
    "featured": false,
    "compatible_with": [
      "orange-pi-5-plus-16gb-rk3588"
    ]
  },
  {
    "slug": "khadas-vim4-8gb-lpddr4x-sbc",
    "name": "Khadas VIM4 8GB LPDDR4X (Amlogic A311D2, Wi-Fi 6, Gigabit, HDMI In 4K)",
    "sku": "SBC-KHD-VIM4-8G",
    "mpn": "KVIM4-8GB",
    "category_id": 6,
    "subcategory": "SBC Speciale",
    "price_ron": 888.99,
    "old_price_ron": 949.99,
    "stock": 8,
    "stock_status": "in_stock",
    "short_desc": "SBC compact de calitate premium cu procesor octa-core Amlogic A311D2 (4x A73 + 4x A53), port dedicat Micro-HDMI Input 4K, Wi-Fi 6 MIMO și sistem de operare OOWOW integrat.",
    "full_desc": "Khadas VIM4 se remarcă prin sistemul inovator OOWOW, care permite instalarea oricărei distribuții Linux direct din cloud fără a scrie un card microSD pe calculator. Ideal pentru procesare video în timp real, digital signage și noduri multimedia IoT.",
    "technical_specs": {
      "ram": "8GB LPDDR4X @ 2112MHz",
      "storage": "32GB eMMC 5.1 Flash integrat pe placă",
      "processor": "Amlogic A311D2 Octa-Core (4x Cortex-A73 @ 2.2GHz + 4x Cortex-A53 @ 2.0GHz)",
      "interfaces": [
        "1x HDMI 2.1 Out (4K60p)",
        "1x Micro-HDMI In (4K30p)",
        "1x Gigabit Ethernet RJ45",
        "Wi-Fi 6 (AP6275S 2T2R)",
        "Bluetooth 5.3",
        "40-Pin GPIO"
      ]
    },
    "pinout_info": null,
    "datasheet_url": "https://docs.khadas.com/products/sbc/vim4/start",
    "image_url": "https://gomagcdn.ro/domains/robofun.ro/files/product/large/khadas-vim4-active-cooling-kit-amlogic-a311d2-941012.jpg",
    "badge": "HDMI In & Wi-Fi 6",
    "tags": [
      "Khadas",
      "VIM4",
      "Amlogic",
      "HDMI In",
      "Wi-Fi 6",
      "OOWOW"
    ],
    "rating": 4.88,
    "review_count": 7,
    "featured": false,
    "compatible_with": [
      "orange-pi-5-plus-16gb-rk3588"
    ]
  },
  {
    "slug": "starfive-visionfive-2-risc-v-sbc-8gb",
    "name": "StarFive VisionFive 2 (Quad-Core RISC-V JH7110, 8GB RAM, 2x Gigabit Ethernet)",
    "sku": "SBC-STF-VF2-8G",
    "mpn": "VF7110-8GB",
    "category_id": 6,
    "subcategory": "Hardware RISC-V",
    "price_ron": 488.99,
    "old_price_ron": 538.99,
    "stock": 17,
    "stock_status": "in_stock",
    "short_desc": "Primul SBC RISC-V accesibil de înaltă performanță cu procesor StarFive JH7110 Quad-Core 64-bit RV64GC @ 1.5GHz, GPU 3D Imagination BXE-4-32 și slot M.2 NVMe.",
    "full_desc": "VisionFive 2 aduce arhitectura RISC-V cu set complet de instrucțiuni deschise (RV64GC) în lumea desktop și homelab. Dispune de suport complet pentru Debian, Arch Linux RISC-V, Fedora și FreeBSD. Este echipat cu slot M.2 NVMe PCIe 2.0 x1, ieșire HDMI 4K30p, interfețe MIPI DSI/CSI și pini GPIO compatibili 40-pin Raspberry Pi.",
    "technical_specs": {
      "ram": "8GB LPDDR4 SDRAM",
      "storage": "Slot MicroSD, flash QSPI NOR 16MB pentru bootloader U-Boot, slot M.2 M-Key PCIe 2.0 x1",
      "processor": "StarFive JH7110 Quad-Core 64-bit RISC-V RV64GC @ 1.5GHz (2MB L2 Cache)",
      "interfaces": [
        "2x Gigabit Ethernet RJ45 (YT8531C)",
        "1x HDMI 2.0 (4K30p)",
        "4x USB 3.0",
        "40-Pin GPIO"
      ],
      "operating_voltage": "5V DC via USB-C (recomandat 3A+)"
    },
    "pinout_info": {
      "pin_map": [
        {
          "pin": "Pin 8",
          "name": "UART TX",
          "function": "Consolă serială RISC-V (115200 baud)"
        },
        {
          "pin": "Pin 10",
          "name": "UART RX",
          "function": "Consolă serială RISC-V (115200 baud)"
        },
        {
          "pin": "Pin 6",
          "name": "GND",
          "function": "Masă"
        }
      ],
      "gpio_count": 28,
      "total_pins": 40,
      "logic_level": "3.3V LVCMOS",
      "wiring_notes": [
        "Pentru depanarea bootloader-ului U-Boot și a kernelului Linux este recomandat un adaptor USB-UART conectat la pinii 8 și 10."
      ]
    },
    "datasheet_url": "https://doc-en.rvspace.org/VisionFive2/PDF/VisionFive2_Datasheet.pdf",
    "image_url": "https://gomagcdn.ro/domains/robofun.ro/files/product/large/starfive-visionfive-2-risc-v-sbc-8gb-ram-819203.jpg",
    "badge": "Pure RISC-V 64",
    "tags": [
      "RISC-V",
      "StarFive",
      "VisionFive 2",
      "RV64GC",
      "Open Source ISA",
      "Debian"
    ],
    "rating": 4.89,
    "review_count": 21,
    "featured": true,
    "compatible_with": [
      "milkv-duo-risc-v-64mb-sbc",
      "tigard-multi-protocol-hardware-debug-probe"
    ]
  },
  {
    "slug": "milkv-duo-risc-v-64mb-sbc",
    "name": "Milk-V Duo 64MB RISC-V SBC (CV1800B Dual RV64 @ 1GHz, Linux Ready)",
    "sku": "SBC-MLK-DUO-64",
    "mpn": "MILKV-DUO-64MB",
    "category_id": 6,
    "subcategory": "Hardware RISC-V",
    "price_ron": 58.99,
    "old_price_ron": 68.99,
    "stock": 45,
    "stock_status": "in_stock",
    "short_desc": "Micro-calculator RISC-V ultra-accesibil cu cip Sophgo CV1800B Dual-Core 64-bit @ 1GHz, capabil să booteze Linux complet în mai puțin de 2 secunde la un consum sub 1W.",
    "full_desc": "Milk-V Duo are dimensiunea unei plăci Raspberry Pi Pico, însă rulează o distribuție Linux completă cu conexiune Ethernet-over-USB RNDIS. Dispune de un al doilea nucleu RISC-V dedicat sarcinilor de timp real (FreeRTOS) și un accelerator TPU integrat de 0.5 TOPS.",
    "technical_specs": {
      "ram": "64MB SIP DRAM integrat",
      "storage": "Slot MicroSD pentru sistem de fișiere rootfs",
      "processor": "Sophgo CV1800B Dual RV64 (1GHz nucleu primar Linux + 700MHz nucleu secundar RTOS)",
      "interfaces": [
        "USB Type-C (alimentare + conexiune rețea virtuală RNDIS)",
        "Conector 10/100M Ethernet via pini",
        "Camera CSI 16-pin MIPI",
        "26x Pini I/O multifuncționali"
      ],
      "operating_voltage": "5V DC via USB-C"
    },
    "pinout_info": {
      "total_pins": 40,
      "logic_level": "3.3V",
      "wiring_notes": [
        "Bootează direct din MicroSD. La conectare prin cablu USB-C, calculatorul recunoaște un port de rețea USB prin care vă conectați via SSH pe 192.168.42.1."
      ]
    },
    "datasheet_url": "https://milkv.io/docs/duo/overview",
    "image_url": "https://gomagcdn.ro/domains/robofun.ro/files/product/large/milkv-duo-cv1800b-risc-v-micro-sbc-64mb-718293.jpg",
    "badge": "Linux sub 60 lei",
    "tags": [
      "Milk-V",
      "RISC-V",
      "Linux",
      "Micro-SBC",
      "Sophgo",
      "IoT"
    ],
    "rating": 4.87,
    "review_count": 31,
    "featured": false,
    "compatible_with": [
      "starfive-visionfive-2-risc-v-sbc-8gb"
    ]
  },
  {
    "slug": "sipeed-tang-primer-20k-fpga-kit",
    "name": "Sipeed Tang Primer 20K FPGA Kit (Gowin GW2A-LV18PG256C8, 20K LUT, Core + Dock)",
    "sku": "DEV-FPG-TANG-20K",
    "mpn": "TANG-PRIMER-20K-KIT",
    "category_id": 6,
    "subcategory": "FPGA & Reconfigurable",
    "price_ron": 348.99,
    "old_price_ron": 388.99,
    "stock": 18,
    "stock_status": "in_stock",
    "short_desc": "Kit FPGA versatil cu 20.736 elemente logice (LUT4), 128MB DDR3 onboard, ieșire video HDMI, slot PMOD și USB-JTAG integrat: creează propriul tău procesor RISC-V de la zero.",
    "full_desc": "Tang Primer 20K este platforma perfectă pentru pasionații de arhitectură de calculatoare (Computer Architecture), sinteză Verilog/VHDL și rularea de core-uri deschise precum NEORV32, PicoRV32 sau acceleratoare neurale. Include modulul central SODIMM și placa suport Primer Dock cu ieșire HDMI, conector de cameră DVP și interfețe PMOD.",
    "technical_specs": {
      "ram": "128MB (1Gbit) DDR3 SDRAM @ 800Mbps",
      "processor": "Gowin GW2A-LV18PG256C8 FPGA (20.736 LUT4, 15.552 Flip-Flop, 828Kbit Block RAM, 48 multiplicatoare DSP 18x18)",
      "interfaces": [
        "Port HDMI digital",
        "Slot card MicroSD",
        "USB-C JTAG/UART programmer",
        "4x Conectori PMOD industriali",
        "Slot cameră DVP"
      ],
      "operating_voltage": "5V DC via USB-C"
    },
    "pinout_info": {
      "total_pins": 48,
      "logic_level": "3.3V comutabil (PMOD I/O)",
      "wiring_notes": [
        "Programabil prin suita oficială Gowin EDA sau uneltele open-source Yosys + nextpnr (Apycula project)."
      ]
    },
    "datasheet_url": "https://wiki.sipeed.com/hardware/en/tang/tang-primer-20k/primer-20k.html",
    "image_url": "https://gomagcdn.ro/domains/robofun.ro/files/product/large/sipeed-tang-primer-20k-gowin-fpga-dock-kit-519284.jpg",
    "badge": "Build Your Own CPU",
    "tags": [
      "FPGA",
      "Gowin",
      "Sipeed",
      "Tang Primer",
      "Build Your CPU",
      "Verilog",
      "RISC-V"
    ],
    "rating": 4.95,
    "review_count": 17,
    "featured": true,
    "compatible_with": [
      "digilent-pynq-z2-xilinx-zynq-board",
      "tigard-multi-protocol-hardware-debug-probe"
    ]
  },
  {
    "slug": "digilent-pynq-z2-xilinx-zynq-board",
    "name": "Digilent PYNQ-Z2 Development Board (Xilinx Zynq-7000 SoC Dual ARM + FPGA Fabric)",
    "sku": "DEV-FPG-PYNQ-Z2",
    "mpn": "410-379",
    "category_id": 6,
    "subcategory": "FPGA & Reconfigurable",
    "price_ron": 1189.99,
    "old_price_ron": 1289.99,
    "stock": 7,
    "stock_status": "in_stock",
    "short_desc": "Platformă de calcul reconfigurabil hibrid cu procesor dual-core ARM Cortex-A9 și matrice FPGA Xilinx Artix-7, programabilă direct în limbajul Python prin Jupyter Notebooks.",
    "full_desc": "PYNQ-Z2 revoluționează dezvoltarea pe FPGA prin combinarea vitezei hardware cu flexibilitatea Python. Suprafața FPGA găzduiește overlay-uri hardware accelerate (procesare semnal audio, procesare imagine HDMI 1080p, filtre convoluționale), controlate prin librării Python native fără recompilare continuă de bitstream-uri.",
    "technical_specs": {
      "ram": "512MB DDR3 @ 1050Mbps",
      "storage": "Slot MicroSD, 16MB Quad-SPI Flash",
      "processor": "Xilinx Zynq-7000 (XC7Z020-1CLG400C): Dual ARM Cortex-A9 @ 650MHz + Matrice Artix-7 (13.300 slice-uri logice, 53.200 LUT, 220 multiplicatoare DSP)",
      "interfaces": [
        "HDMI In & HDMI Out 1080p",
        "Gigabit Ethernet RJ45",
        "USB 2.0 Host",
        "Conectori Arduino Shield & Raspberry Pi Header",
        "2x Conectori Pmod"
      ],
      "operating_voltage": "7V - 15V DC via mufă jack sau 5V USB"
    },
    "pinout_info": null,
    "datasheet_url": "https://digilent.com/reference/programmable-logic/pynq-z2/reference-manual",
    "image_url": "https://gomagcdn.ro/domains/robofun.ro/files/product/large/pynq-z2-xilinx-zynq-7000-soc-development-board-319203.jpg",
    "badge": "Python on FPGA",
    "tags": [
      "PYNQ",
      "Xilinx",
      "Zynq",
      "FPGA",
      "Python",
      "Accelerator",
      "DSP"
    ],
    "rating": 4.96,
    "review_count": 10,
    "featured": false,
    "compatible_with": [
      "sipeed-tang-primer-20k-fpga-kit"
    ]
  },
  {
    "slug": "tigard-multi-protocol-hardware-debug-probe",
    "name": "Tigard Multi-Protocol Hardware Debug Probe (FTDI FT2232H, UART/JTAG/SWD/SPI/I2C)",
    "sku": "REV-TGD-PROBE-01",
    "mpn": "TIGARD-V1.1",
    "category_id": 6,
    "subcategory": "OS Dev & Reverse Engineering",
    "price_ron": 248.99,
    "old_price_ron": 278.99,
    "stock": 22,
    "stock_status": "in_stock",
    "short_desc": "Sondă avansată de reverse engineering și depanare firmware cu comutator de nivel logic 1.8V / 2.5V / 3.3V / 5.0V, protecție ESD și compatibilitate OpenOCD, Flashrom, UrJTAG.",
    "full_desc": "Proiectată special pentru inginerii de reverse engineering și dezvoltatorii de sisteme de operare low-level, Tigard elimină haosul firelor jumper și pericolele distrugerii cipurilor prin mismatch de tensiune. Fiecare interfață (UART, JTAG, SPI, I2C) are antet dedicat etichetat clar și leduri de activitate.",
    "technical_specs": {
      "processor": "FTDI FT2232H Hi-Speed USB 2.0 (480Mbps)",
      "interfaces": [
        "Port UART de mare viteză (până la 12 Mbaud)",
        "Port JTAG/SWD pentru OpenOCD",
        "Port SPI pentru Flashrom",
        "Port I2C",
        "Port USB-C de conectare la PC"
      ],
      "logic_level": "Comutator hardware: 1.8V, 2.5V, 3.3V, 5.0V sau referință externă VTarget",
      "protections": "Diode TVS de protecție la descărcări electrostatice ESD pe fiecare linie de semnal"
    },
    "pinout_info": {
      "pin_map": [
        {
          "pin": "JTAG VTgt",
          "name": "VTarget",
          "function": "Tensiune referință țintă"
        },
        {
          "pin": "JTAG TMS",
          "name": "TMS / SWDIO",
          "function": "Test Mode Select / SWD Data"
        },
        {
          "pin": "JTAG TCK",
          "name": "TCK / SWCLK",
          "function": "Test Clock / SWD Clock"
        },
        {
          "pin": "JTAG TDI",
          "name": "TDI",
          "function": "Test Data In"
        },
        {
          "pin": "JTAG TDO",
          "name": "TDO / SWO",
          "function": "Test Data Out"
        }
      ],
      "total_pins": 24,
      "wiring_notes": [
        "Funcționează fără drivere suplimentare pe Linux prin librăriile libftdi / OpenOCD."
      ]
    },
    "datasheet_url": "https://github.com/tigard-tools/tigard",
    "image_url": "https://gomagcdn.ro/domains/robofun.ro/files/product/large/tigard-hardware-hacking-multi-protocol-debug-probe-192031.jpg",
    "badge": "Reverse Engineering Gold",
    "tags": [
      "Tigard",
      "JTAG",
      "SWD",
      "UART",
      "Reverse Engineering",
      "OpenOCD",
      "Hardware Hacking"
    ],
    "rating": 4.98,
    "review_count": 27,
    "featured": true,
    "compatible_with": [
      "black-magic-probe-v2-3-swd-jtag",
      "programator-eeprom-ch341a-v17-pro"
    ]
  },
  {
    "slug": "black-magic-probe-v2-3-swd-jtag",
    "name": "Black Magic Probe v2.3 Native SWD/JTAG Debugger (GDB Server Onboard)",
    "sku": "DEV-BMP-PROBE-23",
    "mpn": "BMP-V2.3-NATIVE",
    "category_id": 6,
    "subcategory": "OS Dev & Reverse Engineering",
    "price_ron": 288.99,
    "old_price_ron": 319.99,
    "stock": 14,
    "stock_status": "in_stock",
    "short_desc": "Debugger JTAG/SWD autonom care implementează serverul GDB direct în hardware, permițând conectarea directă din `gdb target extended-remote` fără software intermediar.",
    "full_desc": "Spre deosebire de sondele tradiționale care depind de un server software complex (OpenOCD, J-Link server), Black Magic Probe traduce comenzile GDB direct în semnale electrice pe firul SWD/JTAG. Recunoaște automat microcontrolere ARM Cortex-M0/M3/M4/M7, Cortex-A și procesoare RISC-V.",
    "technical_specs": {
      "processor": "STM32F103 High-Density USB Microcontroller",
      "interfaces": [
        "Conector standard 10-pin 0.05\" Cortex Debug",
        "Conector serial UART passthrough integrat",
        "Port USB-C"
      ],
      "compatibility": "ARM Cortex-M, Cortex-A, RISC-V RV32/RV64",
      "operating_voltage": "1.7V - 5.0V target sensing cu translatoare de nivel bidirecționale"
    },
    "pinout_info": null,
    "datasheet_url": "https://black-magic.org/",
    "image_url": "https://gomagcdn.ro/domains/robofun.ro/files/product/large/black-magic-probe-v2-3-swd-jtag-debugger-gdb-server-410293.jpg",
    "badge": "GDB Server On-Chip",
    "tags": [
      "Black Magic Probe",
      "SWD",
      "JTAG",
      "GDB",
      "OS Dev",
      "Cortex-M",
      "Bare Metal"
    ],
    "rating": 4.93,
    "review_count": 14,
    "featured": false,
    "compatible_with": [
      "tigard-multi-protocol-hardware-debug-probe"
    ]
  },
  {
    "slug": "programator-eeprom-ch341a-v17-pro",
    "name": "Kit Programator EEPROM/SPI Flash CH341A v1.7 Pro (Clește Test SOIC8 + Adaptor 1.8V)",
    "sku": "REV-CH341-PRO-KIT",
    "mpn": "CH341A-V1.7-KIT",
    "category_id": 6,
    "subcategory": "OS Dev & Reverse Engineering",
    "price_ron": 68.99,
    "old_price_ron": 78.99,
    "stock": 35,
    "stock_status": "in_stock",
    "short_desc": "Kit de deblocare și citire firmware SPI Flash 24/25 Series cu comutator de tensiune real 3.3V/5V/1.8V (fără bug-ul de supratensiune de 5V al versiunilor ieftine) și clește SOIC8.",
    "full_desc": "Versiunea 1.7 Pro rezolvă definitiv celebra problemă a plăcilor CH341A clasice care aplicau 5V pe cipurile de 3.3V. Include clește de test SOIC8/SOP8 pentru citirea și rescrierea cipurilor BIOS/Flash direct pe placa de bază, fără dezlipire.",
    "technical_specs": {
      "interfaces": [
        "Soclu ZIF 16-pini pentru cipuri DIP/SOIC",
        "Clește de testare cablu panglică SOIC8",
        "Adaptor adaptor de nivel logic 1.8V inclus pentru cipuri moderne",
        "Conector USB-A"
      ],
      "compatibility": "Toate cipurile SPI Flash 25xx și EEPROM 24xx (Winbond, Macronix, Micron, GigaDevice)"
    },
    "pinout_info": null,
    "datasheet_url": "https://www.flashrom.org/supported_hardware/CH341A_3.3V_fix.html",
    "image_url": "https://gomagcdn.ro/domains/robofun.ro/files/product/large/programator-eeprom-spi-flash-ch341a-v1-7-pro-cleste-soic8-718290.jpg",
    "badge": "Fixed 3.3V/1.8V",
    "tags": [
      "EEPROM",
      "CH341A",
      "BIOS",
      "SPI Flash",
      "Reverse Engineering",
      "Flashrom"
    ],
    "rating": 4.86,
    "review_count": 48,
    "featured": false,
    "compatible_with": [
      "tigard-multi-protocol-hardware-debug-probe"
    ]
  },
  {
    "slug": "hackrf-one-sdr-transceiver-kit",
    "name": "HackRF One 1MHz - 6GHz SDR Transceiver (Carcasă Aluminiu + Antene + Cablu SMA)",
    "sku": "SDR-GSG-HRF-KIT",
    "mpn": "HACKRF-ONE-R9",
    "category_id": 6,
    "subcategory": "Software Defined Radio",
    "price_ron": 889.99,
    "old_price_ron": 989.99,
    "stock": 13,
    "stock_status": "in_stock",
    "short_desc": "Platformă radio definită prin software (SDR) semi-duplex cu lățime de bandă uriașă de la 1MHz la 6GHz, eșantionare 20 MSPS, compatibilă GNU Radio, SDR# și analizoare spectrale.",
    "full_desc": "HackRF One proiectat de Great Scott Gadgets este instrumentul suprem pentru cercetare în radiofrecvență, securitate wireless și analiză de spectru. Poate atât recepționa, cât și transmite semnale radio de la benzile AM/FM, HAM radio, GSM, GPS, Wi-Fi și Bluetooth până la banda de 6GHz.",
    "technical_specs": {
      "bandwidth": "Până la 20 MHz (20 MSPS eșantioane I/Q)",
      "interfaces": [
        "Conector antenă SMA mamă (cu alimentare internă Bias-T 3.3V 50mA)",
        "Conector SMA Clock In & Clock Out pentru sincronizare",
        "Port Micro-USB de date/alimentare"
      ],
      "frequency_range": "1 MHz până la 6 GHz",
      "power_consumption": "Alimentat exclusiv via USB (5V DC)"
    },
    "pinout_info": null,
    "datasheet_url": "https://greatscottgadgets.com/hackrf/one/",
    "image_url": "https://gomagcdn.ro/domains/robofun.ro/files/product/large/hackrf-one-software-defined-radio-1mhz-6ghz-transceiver-912034.jpg",
    "badge": "1MHz - 6GHz Full RF",
    "tags": [
      "HackRF One",
      "SDR",
      "Radio",
      "Transceiver",
      "GNU Radio",
      "RF",
      "Wireless Security"
    ],
    "rating": 4.97,
    "review_count": 24,
    "featured": true,
    "compatible_with": [
      "rtl-sdr-blog-v4-dongle-tcxo-kit"
    ]
  },
  {
    "slug": "rtl-sdr-blog-v4-dongle-tcxo-kit",
    "name": "RTL-SDR Blog V4 Dongle SDR Receiver cu TCXO 1PPM + Kit Antene Dipol Polivalente",
    "sku": "SDR-RTL-BLOG-V4",
    "mpn": "RTL-SDR-V4-KIT",
    "category_id": 6,
    "subcategory": "Software Defined Radio",
    "price_ron": 218.99,
    "old_price_ron": 248.99,
    "stock": 29,
    "stock_status": "in_stock",
    "short_desc": "Receptor radio pe USB cu tuner modern Rafael Micro R828D, oscilator termocompensat TCXO 1 PPM, filtrare HF directă fără convertor upconvertor și carcasă de aluminiu ecranată.",
    "full_desc": "Generația V4 a apreciatului RTL-SDR Blog aduce o recepție substanțial îmbunătățită în banda undelor scurte (HF: 500kHz - 28MHz) datorită circuitului integrat de upconverter intern, precum și ecranare termică superioară. Include kitul complet cu bază magnetică și două brațe telescopice dipol.",
    "technical_specs": {
      "bandwidth": "Până la 2.4 MHz eșantionare stabilă",
      "stability": "Oscilator TCXO 1 PPM (deviație termică insesizabilă)",
      "interfaces": [
        "Conector antenă SMA mamă de 50 ohmi",
        "Port USB 2.0 ecranat"
      ],
      "frequency_range": "500 kHz până la 1.75 GHz"
    },
    "pinout_info": null,
    "datasheet_url": "https://www.rtl-sdr.com/rtl-sdr-blog-v4-users-guide/",
    "image_url": "https://gomagcdn.ro/domains/robofun.ro/files/product/large/rtl-sdr-blog-v4-r828d-tcxo-1ppm-software-defined-radio-829103.jpg",
    "badge": "Best Value SDR",
    "tags": [
      "RTL-SDR",
      "SDR",
      "TCXO",
      "ADS-B",
      "Receptor Radio",
      "HF Receiver"
    ],
    "rating": 4.96,
    "review_count": 53,
    "featured": false,
    "compatible_with": [
      "hackrf-one-sdr-transceiver-kit"
    ]
  },
  {
    "slug": "google-coral-usb-accelerator-edge-tpu",
    "name": "Google Coral USB Accelerator (Edge TPU Coprocessor 4 TOPS, USB 3.0 Type-C)",
    "sku": "ACC-GGL-CORAL-USB",
    "mpn": "G950-01456-01",
    "category_id": 6,
    "subcategory": "Acceleratoare AI & Compute",
    "price_ron": 388.99,
    "old_price_ron": 428.99,
    "stock": 21,
    "stock_status": "in_stock",
    "short_desc": "Coprocesor dedicat de inferență neuronală Edge TPU conectabil pe USB 3.0, capabil de 4 TOPS la un consum de doar 2W (0.5W/TOPS). Ideal pentru Frigate NVR și Home Assistant.",
    "full_desc": "Google Coral USB Accelerator permite adăugarea inferenței rapide de modele machine learning (TensorFlow Lite) pe orice mini PC, server homelab sau Raspberry Pi. Poate rula modele complexe de recunoaștere a obiectelor (MobileNet SSD, YOLO) la peste 100 de cadre pe secundă cu încărcare aproape zero pe procesorul gazdă.",
    "technical_specs": {
      "processor": "Google Edge TPU ASIC (4 TOPS INT8 @ 2W)",
      "interfaces": [
        "USB 3.0 Type-C (cablu USB-C la USB-A inclus)"
      ],
      "form_factor": "Modul compact cu carcasă de aluminiu pentru disipare pasivă (65 x 30 mm)",
      "compatibility": "Linux (Debian, Ubuntu, Raspberry Pi OS), Windows 10/11, macOS"
    },
    "pinout_info": null,
    "datasheet_url": "https://coral.ai/docs/accelerator/datasheet/",
    "image_url": "https://gomagcdn.ro/domains/robofun.ro/files/product/large/coral-usb-accelerator-google-edge-tpu-4-tops-629104.jpg",
    "badge": "Frigate NVR Essential",
    "tags": [
      "Google Coral",
      "TPU",
      "Edge AI",
      "TensorFlow Lite",
      "Frigate",
      "NVR",
      "Homelab"
    ],
    "rating": 4.97,
    "review_count": 45,
    "featured": true,
    "compatible_with": [
      "orange-pi-5-plus-16gb-rk3588",
      "hailo-8-m2-ai-acceleration-module"
    ]
  },
  {
    "slug": "hailo-8-m2-ai-acceleration-module",
    "name": "Hailo-8 M.2 AI Acceleration Module (Key M 2280 PCIe 3.0 x4, 26 TOPS @ 2.5W)",
    "sku": "ACC-HLO-8-M2-26T",
    "mpn": "HABP28NENK0",
    "category_id": 6,
    "subcategory": "Acceleratoare AI & Compute",
    "price_ron": 989.99,
    "old_price_ron": 1099.99,
    "stock": 9,
    "stock_status": "in_stock",
    "short_desc": "Modul de inferență AI extremă în format M.2 NVMe capabil de 26 TOPS pentru procesare video multi-canal în timp real la o eficiență de neegalat de 10.4 TOPS/W.",
    "full_desc": "Hailo-8 depășește cu mult performanța altor acceleratoare Edge prin arhitectura sa bazată pe dataflow controlat de memorie. Poate procesa simultan până la 16 stream-uri video HD la rezoluție completă pentru clasificare, detecție și estimare de poziție cu latență sub 5ms.",
    "technical_specs": {
      "processor": "Hailo-8 AI Processor (26 TOPS @ eficiență tipică 2.5W)",
      "interfaces": [
        "M.2 Key M 2280 PCIe Gen3 x4 (compatibil cu sloturi standard de SSD NVMe)"
      ],
      "software_support": "Hailo TAPPAS, HailoRT driver nativ Linux, plugin-uri GStreamer, suport TensorFlow & ONNX",
      "power_consumption": "Consum mediu: 2.5W | Maxim: 4.5W"
    },
    "pinout_info": null,
    "datasheet_url": "https://hailo.ai/products/ai-accelerators/hailo-8-m2-module/",
    "image_url": "https://gomagcdn.ro/domains/robofun.ro/files/product/large/hailo-8-m2-ai-acceleration-module-key-m-26-tops-910283.jpg",
    "badge": "26 TOPS AI Beast",
    "tags": [
      "Hailo-8",
      "M.2",
      "AI Accelerator",
      "26 TOPS",
      "Vision AI",
      "Computer Vision"
    ],
    "rating": 4.94,
    "review_count": 8,
    "featured": false,
    "compatible_with": [
      "orange-pi-5-plus-16gb-rk3588",
      "radxa-rock-5b-8gb-rk3588"
    ]
  },
  {
    "slug": "flipper-zero-portable-multi-tool",
    "name": "Flipper Zero Multi-Tool Device (Sub-1GHz, RFID, NFC, IR, GPIO & BadUSB)",
    "sku": "SEC-FLP-ZERO-01",
    "mpn": "FLIP-ZERO-R04",
    "category_id": 7,
    "subcategory": "Wireless & RF Pentesting",
    "price_ron": 1189.99,
    "old_price_ron": 1349.99,
    "stock": 12,
    "stock_status": "in_stock",
    "short_desc": "Instrument portabil autonom pentru audit de securitate: transceiver Sub-1GHz CC1101, cititor/emulator RFID 125kHz & NFC 13.56MHz, infraroșu, pini GPIO 3.3V și emulare BadUSB.",
    "full_desc": "Flipper Zero este dispozitivul etalon de buzunar pentru cercetare în radiofrecvență, control acces și sisteme încorporate. Dispune de ecran monocrom LCD 1.4\" cu iluminare portocalie lizibil în lumina soarelui, baterie Li-Po 2100 mAh cu autonomie de până la 7 zile, slot MicroSD pentru stocare dicționare/semnale și interfață USB-C pentru conectare la aplicațiile de desktop și smartphone via Bluetooth BLE.",
    "technical_specs": {
      "battery": "Acumulator Li-Po 2100 mAh reîncărcabil prin USB-C",
      "rfid_nfc": "RFID 125kHz (EM-4100, HID Prox, Indala) + NFC 13.56MHz (ISO-14443A/B, NXP Mifare, FeliCa)",
      "processor": "STM32WB55RG Dual-Core ARM Cortex-M4 (64MHz) + Cortex-M0+ (32MHz pentru stack radio)",
      "interfaces": [
        "Slot card MicroSD (până la 64GB)",
        "18 pini GPIO 3.3V toleranți 5V",
        "USB Type-C 2.0",
        "Transceiver Infraroșu (TX/RX 800-950nm)"
      ],
      "radio_sub_1ghz": "Transceiver TI CC1101 cu antenă integrată (benzi 315MHz, 433MHz, 868MHz, 915MHz)"
    },
    "pinout_info": {
      "pin_map": [
        {
          "pin": "Pin 1",
          "name": "VCC 5V",
          "function": "Ieșire alimentare 5V DC (max 1000mA cu modul activ)"
        },
        {
          "pin": "Pin 8",
          "name": "GND",
          "function": "Masă electrică"
        },
        {
          "pin": "Pin 9",
          "name": "3V3",
          "function": "Ieșire stabilizată 3.3V DC (max 500mA)"
        },
        {
          "pin": "Pin 13",
          "name": "USART TX",
          "function": "Transmisie serială UART (implicit 115200 baud)"
        },
        {
          "pin": "Pin 14",
          "name": "USART RX",
          "function": "Recepție serială UART"
        },
        {
          "pin": "Pin 15",
          "name": "SWCLK",
          "function": "Ceas programare SWD"
        },
        {
          "pin": "Pin 16",
          "name": "SWDIO",
          "function": "Date programare SWD"
        }
      ],
      "total_pins": 18,
      "logic_level": "3.3V (tolerant 5V pe majoritatea pinilor)",
      "wiring_notes": [
        "Pinii GPIO sunt compatibili cu module externe precum WiFi Dev Board (ESP32-S2), plăci NRF24L01 sau senzori de mediu.",
        "Dispune de protecție la supracurent și supratensiune pe pinii I/O."
      ]
    },
    "datasheet_url": "https://docs.flipper.net/",
    "image_url": "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&auto=format&fit=crop&q=80",
    "badge": "Multi-Tool RF",
    "tags": [
      "Flipper Zero",
      "Sub-1GHz",
      "RFID 125kHz",
      "NFC 13.56MHz",
      "BadUSB",
      "Pentesting",
      "CC1101"
    ],
    "rating": 4.98,
    "review_count": 58,
    "featured": true,
    "compatible_with": [
      "chameleon-ultra-pocket-rfid-nfc-emulator",
      "pachet-10x-carduri-taguri-t5577-mifare-magic"
    ]
  },
  {
    "slug": "hak5-wifi-pineapple-mark-vii",
    "name": "Hak5 WiFi Pineapple Mark VII (Dual-Band 2.4/5GHz Enterprise Wireless Audit)",
    "sku": "SEC-HK5-PINE-MK7",
    "mpn": "WP-MK7-STD",
    "category_id": 7,
    "subcategory": "Network Security & Hak5",
    "price_ron": 889.99,
    "old_price_ron": 989.99,
    "stock": 8,
    "stock_status": "in_stock",
    "short_desc": "Platformă etalon pentru audit wireless 802.11 b/g/n/ac: detecție dispozitive rogue, captură pachete WPA/WPA2/WPA3, monitorizare spectru RF și suită PineAP via interfață web dedicată.",
    "full_desc": "WiFi Pineapple Mark VII de la Hak5 este liderul recunoscut internațional în testarea de penetrare wireless și conformitate defensivă pentru rețele Wi-Fi. Echipat cu 3 radiouri Wi-Fi independente (un radio dedicat exclusiv monitorizării și capturii, plus două radiouri cu antene de mare câștig), oferă o perspectivă fără precedent asupra ecosistemului wireless al organizației.",
    "technical_specs": {
      "radios": "3x Radiouri Wi-Fi independente (suport complet 2.4GHz și 5GHz cu mod monitor nativ)",
      "processor": "Mediatek MT7628 SoC MIPS @ 580MHz + 256MB RAM",
      "interfaces": [
        "3x Conectori antenă RP-SMA (antene de mare câștig incluse)",
        "1x Port USB Type-C (date și alimentare)",
        "1x Port USB 2.0 Host pentru stick-uri 4G/LTE sau storage",
        "1x Slot card MicroSD"
      ],
      "os_support": "Sistem de operare Hak5 PineappleOS bazat pe Linux OpenWrt"
    },
    "pinout_info": null,
    "datasheet_url": "https://docs.hak5.org/wifi-pineapple/",
    "image_url": "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&auto=format&fit=crop&q=80",
    "badge": "Hak5 Official",
    "tags": [
      "Hak5",
      "WiFi Pineapple",
      "PineAP",
      "Wireless Audit",
      "802.11ac",
      "Red Team",
      "WPA3"
    ],
    "rating": 4.96,
    "review_count": 32,
    "featured": true,
    "compatible_with": [
      "hak5-lan-turtle-network-implant",
      "hak5-packet-squirrel-ethernet-tap"
    ]
  },
  {
    "slug": "hak5-usb-rubber-ducky-v3",
    "name": "Hak5 USB Rubber Ducky (DuckyScript 3.0 Keystroke Injection & BadUSB)",
    "sku": "SEC-HK5-DUCKY-03",
    "mpn": "RD-V3-USB",
    "category_id": 7,
    "subcategory": "USB Security & Hotplug",
    "price_ron": 389.99,
    "old_price_ron": 439.99,
    "stock": 15,
    "stock_status": "in_stock",
    "short_desc": "Dispozitivul original de simulare atac hotplug keystroke: procesor ARM 32-bit Cortex, stocare MicroSD, comutator de profiluri hardware și limbaj de scriptare DuckyScript 3.0.",
    "full_desc": "USB Rubber Ducky pare o memorie USB obișnuită, însă este recunoscut instantaneu de orice calculator ca tastatură umană de încredere (HID). Versiunea V3 introduce DuckyScript 3.0 complet turing (variabile, instrucțiuni if/else, bucle while, funcții, exfiltrare date prin LED-urile CapsLock) și buton de armare rapidă.",
    "technical_specs": {
      "storage": "Slot card MicroSD (card MicroSD inclus)",
      "processor": "Microcontroller 32-bit ARM Cortex @ 96MHz",
      "interfaces": [
        "Conector USB Type-A (carcasă neagră discretă)",
        "Buton mecanic de armare/dezarmare rapidă",
        "LED multicolor RGB de stare"
      ],
      "compatibility": "Windows, macOS, Linux, ChromeOS, Android (fără instalare de drivere)"
    },
    "pinout_info": null,
    "datasheet_url": "https://docs.hak5.org/usb-rubber-ducky/",
    "image_url": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80",
    "badge": "DuckyScript 3.0",
    "tags": [
      "Hak5",
      "USB Rubber Ducky",
      "Hotplug Attack",
      "BadUSB",
      "DuckyScript",
      "Red Team"
    ],
    "rating": 4.97,
    "review_count": 41,
    "featured": true,
    "compatible_with": [
      "tester-detector-cabluri-malitioase-omg"
    ]
  },
  {
    "slug": "hak5-lan-turtle-network-implant",
    "name": "Hak5 LAN Turtle (Covert Systems Management & Network Implant)",
    "sku": "SEC-HK5-TURTLE-01",
    "mpn": "LT-V1-NET",
    "category_id": 7,
    "subcategory": "Network Security & Hak5",
    "price_ron": 419.99,
    "old_price_ron": 469.99,
    "stock": 10,
    "stock_status": "in_stock",
    "short_desc": "Dispozitiv de acces la distanță și man-in-the-middle mascat într-un adaptor USB-to-Ethernet: shell reverse SSH, monitorizare trafic pachete și OpenWrt integrat.",
    "full_desc": "LAN Turtle este o unealtă de administrare de sistem și pentesting acoperită care oferă acces la distanță într-o rețea locală prin tunel SSH / OpenVPN, monitorizează traficul de rețea și execută module automate direct la conectarea fizică între PC și priza de rețea.",
    "technical_specs": {
      "features": [
        "Auto-execuție module Hak5",
        "Bypass gateway",
        "DNS Spoofing",
        "Reverse Shell over SSH"
      ],
      "processor": "Atheros AR9331 SoC @ 400MHz, 64MB DDR2 RAM, 16MB Flash",
      "interfaces": [
        "1x Conector USB-A gazdă",
        "1x Port RJ45 Ethernet 10/100 Mbps",
        "Meniu grafic interactiv prin consolă SSH"
      ]
    },
    "pinout_info": null,
    "datasheet_url": "https://docs.hak5.org/lan-turtle/",
    "image_url": "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&auto=format&fit=crop&q=80",
    "badge": "Hak5 Implant",
    "tags": [
      "Hak5",
      "LAN Turtle",
      "Network Implant",
      "OpenWrt",
      "MITM",
      "Reverse SSH",
      "Red Team"
    ],
    "rating": 4.92,
    "review_count": 18,
    "featured": false,
    "compatible_with": [
      "hak5-wifi-pineapple-mark-vii",
      "hak5-packet-squirrel-ethernet-tap"
    ]
  },
  {
    "slug": "hak5-packet-squirrel-ethernet-tap",
    "name": "Hak5 Packet Squirrel (Hardware Ethernet TAP & Packet Capture)",
    "sku": "SEC-HK5-SQUIRREL-01",
    "mpn": "PS-V1-TAP`",
    "category_id": 7,
    "subcategory": "Network Security & Hak5",
    "price_ron": 459.99,
    "old_price_ron": 509.99,
    "stock": 9,
    "stock_status": "in_stock",
    "short_desc": "Instrument hardware multi-funcțional Ethernet TAP: captură pachete tcpdump direct pe stick USB, VPN transparent și redirecționare de trafic prin comutator cu 4 poziții.",
    "full_desc": "Packet Squirrel se instalează direct pe cablul de rețea Ethernet și funcționează ca un switch transparent pasiv sau ca router de analiză. Cu o simplă comutare a selectorului mecanic pe pozițiile 1, 2, 3 sau 4, pornește automat capturi PCAP pe medii de stocare USB, stabilește tuneluri OpenVPN sau execută scripturi de securitate.",
    "technical_specs": {
      "os": "Sistem dedicat OpenWrt Hak5",
      "processor": "Atheros MIPS CPU @ 400MHz, 64MB RAM",
      "interfaces": [
        "2x Porturi Ethernet RJ45 10/100 (In/Out inline passthrough)",
        "1x Port USB 2.0 Host pentru salvare fișiere PCAP",
        "1x Port Micro-USB pentru alimentare 5V",
        "Selector mecanic cu 4 moduri de funcționare",
        "LED RGB programabil"
      ]
    },
    "pinout_info": null,
    "datasheet_url": "https://docs.hak5.org/packet-squirrel/",
    "image_url": "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&auto=format&fit=crop&q=80",
    "badge": "Hardware TAP",
    "tags": [
      "Hak5",
      "Packet Squirrel",
      "Network TAP",
      "tcpdump",
      "PCAP",
      "Ethernet Audit"
    ],
    "rating": 4.94,
    "review_count": 15,
    "featured": false,
    "compatible_with": [
      "dual-gigabit-hardware-network-tap"
    ]
  },
  {
    "slug": "esp32-marauder-v6-pocket-board",
    "name": "ESP32 Marauder v6 Pocket Pentest Board (Ecran TFT Touch 2.8\", Antenă Externă SMA)",
    "sku": "SEC-ESP-MRD-V6",
    "mpn": "MRD-ESP32-V6",
    "category_id": 7,
    "subcategory": "Wireless & RF Pentesting",
    "price_ron": 289.99,
    "old_price_ron": 339.99,
    "stock": 18,
    "stock_status": "in_stock",
    "short_desc": "Platformă portabilă firmware Marauder pentru analiză de protocol Wi-Fi (scanare beacon, deautentificare, captură PMKID) și Bluetooth BLE (detectare AirTags/Flippers).",
    "full_desc": "ESP32 Marauder v6 este o suită de audit wireless autonomă într-o carcasă printată 3D cu ecran tactil color TFT de 2.8\". Include slot MicroSD pentru salvarea fișierelor PCAP compatibile Wireshark și baterie Li-Ion internă cu circuit de încărcare USB-C.",
    "technical_specs": {
      "battery": "Acumulator reîncărcabil 18650 Li-Ion integrat",
      "display": "2.8\" TFT Touchscreen color rezoluție 320x240 (controller ILI9341 + XPT2046)",
      "wireless": "Wi-Fi 802.11 b/g/n + Bluetooth 4.2 BR/EDR & BLE",
      "processor": "ESP32-WROOM-32D Dual-Core 32-bit @ 240MHz",
      "interfaces": [
        "Conector antenă externă SMA cu antenă 3dBi inclusă",
        "Slot card MicroSD (FAT32)",
        "Port USB-C de date și încărcare"
      ]
    },
    "pinout_info": null,
    "datasheet_url": "https://github.com/justcallmekoko/ESP32Marauder",
    "image_url": "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80",
    "badge": "Marauder v6",
    "tags": [
      "ESP32 Marauder",
      "Wi-Fi Analysis",
      "BLE",
      "PMKID",
      "Deauth Detection",
      "TFT Touch"
    ],
    "rating": 4.89,
    "review_count": 27,
    "featured": true,
    "compatible_with": [
      "bruce-esp32-s3-multi-tool-board",
      "alfa-network-awus036acm-monitor-mode-adapter"
    ]
  },
  {
    "slug": "bruce-esp32-s3-multi-tool-board",
    "name": "Bruce ESP32-S3 Multi-Tool Dev Board (Sub-GHz CC1101 + Wi-Fi/BLE + MicroSD)",
    "sku": "SEC-ESP-BRUCE-S3",
    "mpn": "BRUCE-S3-LAB",
    "category_id": 7,
    "subcategory": "Wireless & RF Pentesting",
    "price_ron": 348.99,
    "old_price_ron": 389.99,
    "stock": 14,
    "stock_status": "in_stock",
    "short_desc": "Placă dedicată rulării firmware-ului Bruce pe ESP32-S3: transceiver Sub-1GHz CC1101 cu antenă telescopică SMA, ecran color IPS, suport BadUSB și audit wireless.",
    "full_desc": "Firmware-ul Bruce extinde capabilitățile plăcilor bazate pe ESP32-S3 către audit RF avansat. Datorită suportului nativ USB OTG pe ESP32-S3, placa poate rula scripturi BadUSB rapide, emula tastaturi/mouse-uri și interacționa cu semnale radio Sub-1GHz (300-928MHz) via modulul integrat CC1101.",
    "technical_specs": {
      "display": "Ecran color IPS 1.9\" cu unghiuri largi de vizualizare",
      "processor": "ESP32-S3 Dual-Core Xtensa LX7 @ 240MHz cu suport instrucțiuni vectoriale AI",
      "interfaces": [
        "Port USB-C nativ (suport BadUSB HID)",
        "Port USB-C secundar de depanare UART",
        "Slot MicroSD",
        "Conector antenă SMA"
      ],
      "rf_transceiver": "Texas Instruments CC1101 Sub-1GHz (315/433/868/915 MHz)"
    },
    "pinout_info": null,
    "datasheet_url": "https://github.com/pr3y/Bruce",
    "image_url": "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80",
    "badge": "Bruce Firmware",
    "tags": [
      "Bruce",
      "ESP32-S3",
      "Sub-1GHz",
      "CC1101",
      "BadUSB",
      "Marauder",
      "Wireless"
    ],
    "rating": 4.91,
    "review_count": 19,
    "featured": false,
    "compatible_with": [
      "flipper-zero-portable-multi-tool"
    ]
  },
  {
    "slug": "proxmark3-rdv401-research-kit",
    "name": "Proxmark3 RDV4.01 Research Kit (Dual-Band LF 125kHz & HF 13.56MHz + Chameleon)",
    "sku": "SEC-PRX-MK3-RDV4",
    "mpn": "PM3-RDV4.01-KIT",
    "category_id": 7,
    "subcategory": "RFID / NFC Research",
    "price_ron": 1449.99,
    "old_price_ron": 1619.99,
    "stock": 6,
    "stock_status": "in_stock",
    "short_desc": "Standardul suprem în cercetarea RFID/NFC: sniffing, clonare, emulare și decriptare carduri contactless (Mifare Classic, Desfire, HID Prox, iClass, T5577) cu antene modulare acordate.",
    "full_desc": "Proxmark3 RDV4.01 este proiectat special pentru laboratoare de testare a securității fizice și cercetători hardware. Folosește un FPGA Xilinx Spartan-II pentru demodularea semnalelor RF brute și un microcontroler ARM Cortex-M4. Suportă firmware-ul open-source Iceman (RRG), cu comenzi avansate de atac asupra cheilor de criptare Crypto1 din cipurile Mifare.",
    "technical_specs": {
      "antennas": "Antene modulare ultra-acordate: antenă duală LF (125/134kHz cu factor Q ridicat) + antenă HF (13.56MHz)",
      "processor": "ARM Cortex-M4 (AT91SAM7S512) + FPGA Xilinx Spartan-II",
      "interfaces": [
        "Port USB-C",
        "Slot conector de baterie modulară Blueshark"
      ],
      "supported_tags": "LF: HID Prox, Indala, EM4100, AWID, T5577, Hitag; HF: Mifare Classic 1K/4K, Ultralight, DESFire, iClass, ISO14443A/B, ISO15693"
    },
    "pinout_info": null,
    "datasheet_url": "https://github.com/RfidResearchGroup/proxmark3",
    "image_url": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&auto=format&fit=crop&q=80",
    "badge": "RFID Gold Standard",
    "tags": [
      "Proxmark3",
      "RDV4",
      "RFID",
      "NFC",
      "Mifare",
      "HID Prox",
      "Hardware Hacking"
    ],
    "rating": 4.99,
    "review_count": 36,
    "featured": true,
    "compatible_with": [
      "pachet-10x-carduri-taguri-t5577-mifare-magic",
      "chameleon-ultra-pocket-rfid-nfc-emulator"
    ]
  },
  {
    "slug": "chameleon-ultra-pocket-rfid-nfc-emulator",
    "name": "ChameleonUltra Pocket RFID/NFC Emulator & Reader (Bluetooth 5.0 + USB-C)",
    "sku": "SEC-CHM-ULTRA-01",
    "mpn": "CHM-ULTRA-BT",
    "category_id": 7,
    "subcategory": "RFID / NFC Research",
    "price_ron": 579.99,
    "old_price_ron": 649.99,
    "stock": 11,
    "stock_status": "in_stock",
    "short_desc": "Emulator hardware de buzunar de înaltă precizie cu Bluetooth: reține și emulează simultan până la 8 sloturi LF și 8 sloturi HF, decriptează chei Mifare și se controlează prin app mobil.",
    "full_desc": "ChameleonUltra este cel mai mic și mai precis emulator RFID/NFC activ din lume. Permite simularea perfectă a temporizării (anti-collision timing) pentru cititoare securizate, extragerea automată a cheilor Mifare prin atacuri nested/darkside și sincronizarea profilurilor de card prin aplicația open-source iOS și Android.",
    "technical_specs": {
      "battery": "Baterie internă reîncărcabilă Li-Po 90mAh (săptămâni de emulare continuă)",
      "storage": "8 sloturi independente de carduri HF (13.56MHz) + 8 sloturi LF (125kHz)",
      "emulation": "Mifare Classic, Mifare Ultralight, NTAG213/215/216, EM4100, T5577, HID Prox",
      "processor": "Nordic nRF52840 SoC (Bluetooth 5.0 LE + USB 2.0 nativ)"
    },
    "pinout_info": null,
    "datasheet_url": "https://github.com/RfidResearchGroup/ChameleonUltra",
    "image_url": "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=600&auto=format&fit=crop&q=80",
    "badge": "8-Slot Emulator",
    "tags": [
      "ChameleonUltra",
      "RFID",
      "NFC Emulator",
      "Bluetooth",
      "Mifare Classic",
      "T5577"
    ],
    "rating": 4.95,
    "review_count": 22,
    "featured": false,
    "compatible_with": [
      "proxmark3-rdv401-research-kit",
      "flipper-zero-portable-multi-tool"
    ]
  },
  {
    "slug": "alfa-network-awus036acm-monitor-mode-adapter",
    "name": "Adaptor Wi-Fi Alfa Network AWUS036ACM 802.11ac 1200Mbps (Dual Antenă 5dBi, Monitor Mode & Injection)",
    "sku": "SEC-ALF-036ACM",
    "mpn": "AWUS036ACM",
    "category_id": 7,
    "subcategory": "Wireless & RF Pentesting",
    "price_ron": 248.99,
    "old_price_ron": 279.99,
    "stock": 25,
    "stock_status": "in_stock",
    "short_desc": "Adaptor Wi-Fi USB 3.0 etalon pentru Kali Linux / Parrot OS bazat pe chipset Mediatek MT7612U: suport nativ în nucleul Linux pentru mod monitor, injecție de pachete și benzi 2.4GHz + 5GHz.",
    "full_desc": "Alfa AWUS036ACM este placa de rețea Wi-Fi preferată a specialiștilor în securitate datorită driverului `mt76` integrat direct în nucleul Linux oficial (fără compilare manuală de module dkms). Suportă rate de transfer AC1200 (300Mbps pe 2.4GHz + 867Mbps pe 5GHz) și vine cu două antene dipol de 5dBi cu conectori RP-SMA.",
    "technical_specs": {
      "chipset": "MediaTek MT7612U (driver nativ kernel Linux mainline mt76)",
      "features": [
        "Mod Monitor nativ",
        "Injecție pachete (Packet Injection)",
        "Suport mod AP"
      ],
      "interfaces": [
        "Port USB 3.0 Type-A",
        "2x Conectori RP-SMA mamă cu antene omnidirecționale 5dBi detașabile"
      ],
      "frequencies": "Dual Band 2.4 GHz & 5 GHz (802.11a/b/g/n/ac)"
    },
    "pinout_info": null,
    "datasheet_url": "https://files.alfa.com.tw/files/datasheet/AWUS036ACM.pdf",
    "image_url": "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&auto=format&fit=crop&q=80",
    "badge": "Kali Monitor Mode",
    "tags": [
      "Alfa Network",
      "Kali Linux",
      "Monitor Mode",
      "Packet Injection",
      "MT7612U",
      "Wi-Fi 5"
    ],
    "rating": 4.97,
    "review_count": 49,
    "featured": true,
    "compatible_with": [
      "hak5-wifi-pineapple-mark-vii",
      "esp32-marauder-v6-pocket-board"
    ]
  },
  {
    "slug": "bus-pirate-v5-hardware-hacking-tool",
    "name": "Bus Pirate v5 Hardware Hacking Multi-Tool (I2C/SPI/UART/1-Wire, Terminal VT100, Ecran Color)",
    "sku": "SEC-BUS-PIRATE-V5",
    "mpn": "BP-V5-REV10",
    "category_id": 7,
    "subcategory": "Hardware Hacking & Embedded",
    "price_ron": 289.99,
    "old_price_ron": 329.99,
    "stock": 16,
    "stock_status": "in_stock",
    "short_desc": "Instrument universal open-source pentru comunicare directă cu cipurile de pe plăci: surse de tensiune programabile 0.8V - 5V, sonde logice, decodor de protocoale și conectori cu blocare automată.",
    "full_desc": "Bus Pirate v5 este un instrument indispensabil de laborator hardware creat de Dangerous Prototypes. Echipat cu procesor dual-core Raspberry Pi RP2040, ecran LCD color de înaltă rezoluție și sursă de laborator integrată cu limitare de curent, permite trimiterea de comenzi I2C, SPI, UART, 1-Wire, MIDI sau JTAG direct dintr-un terminal serial obișnuit.",
    "technical_specs": {
      "processor": "Raspberry Pi RP2040 Dual-Core ARM Cortex-M0+ @ 133MHz",
      "protocols": [
        "I2C",
        "SPI",
        "UART",
        "1-Wire",
        "CAN",
        "SWD",
        "JTAG",
        "MIDI",
        "Bitbang"
      ],
      "interfaces": [
        "8 pini multifuncționali I/O cu LED-uri RGB indicatoare",
        "Ecran color IPS 240x135",
        "Port USB-C nativ"
      ],
      "voltage_supply": "Sursă de tensiune reglabilă digital 0.8V - 5.0V (curent până la 400mA)"
    },
    "pinout_info": {
      "total_pins": 10,
      "logic_level": "0.8V - 5.0V programabil",
      "wiring_notes": [
        "Fiecare pin are un LED RGB asociat care își schimbă culoarea în funcție de nivelul logic (High = verde, Low = albastru, Tensiune = roșu)."
      ]
    },
    "datasheet_url": "https://buspirate.com/",
    "image_url": "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80",
    "badge": "Hardware Multi-Tool",
    "tags": [
      "Bus Pirate",
      "I2C",
      "SPI",
      "UART",
      "Hardware Hacking",
      "Dangerous Prototypes"
    ],
    "rating": 4.96,
    "review_count": 31,
    "featured": true,
    "compatible_with": [
      "glasgow-interface-explorer-hardware-tool",
      "analizor-logic-usb-16-canale-100mhz"
    ]
  },
  {
    "slug": "glasgow-interface-explorer-hardware-tool",
    "name": "Glasgow Interface Explorer Hardware Tool (FPGA iCE40 + Interfețe Digitale Universale)",
    "sku": "SEC-GLS-EXPLORER-01",
    "mpn": "GLASGOW-REV-C",
    "category_id": 7,
    "subcategory": "Hardware Hacking & Embedded",
    "price_ron": 789.99,
    "old_price_ron": 879.99,
    "stock": 7,
    "stock_status": "in_stock",
    "short_desc": "Platformă de explorare și inginerie inversă hardware bazată pe FPGA Lattice iCE40: configurează dinamic transceivere pentru orice protocol digital nestandard (SPI, JTAG, SWD, UART, I2C, bus-uri proprietare).",
    "full_desc": "Glasgow este un instrument revoluționar open-source care elimină limitările procesoarelor clasice prin sinteza on-the-fly de blocuri logice FPGA. Poate citi memorii flash la viteze maxime, emula controlere necunoscute și decoda protocoale industriale asincrone folosind unelte Python native.",
    "technical_specs": {
      "processor": "Lattice iCE40HX8K FPGA + Cypress FX2 High-Speed USB",
      "protection": "Limitare de curent pe fiecare canal și protecție ESD avansată",
      "io_channels": "16 canale I/O digitale de mare viteză cu translație independentă de tensiune de la 1.8V la 5.0V",
      "power_output": "Sursă integrată programabilă independentă pentru fiecare banc de 8 pini"
    },
    "pinout_info": null,
    "datasheet_url": "https://glasgowembedded.org/",
    "image_url": "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80",
    "badge": "FPGA Protocol Explorer",
    "tags": [
      "Glasgow",
      "FPGA",
      "Hardware Hacking",
      "Reverse Engineering",
      "Digital Protocol"
    ],
    "rating": 4.98,
    "review_count": 12,
    "featured": false,
    "compatible_with": [
      "bus-pirate-v5-hardware-hacking-tool"
    ]
  },
  {
    "slug": "analizor-logic-usb-16-canale-100mhz",
    "name": "Analizor Logic USB 16 Canale 100MHz (Compatibil Sigrok / PulseView / Saleae Logic Software)",
    "sku": "SEC-LOG-16CH-100M",
    "mpn": "LA-16CH-100MHZ",
    "category_id": 7,
    "subcategory": "Hardware Hacking & Embedded",
    "price_ron": 198.99,
    "old_price_ron": 229.99,
    "stock": 22,
    "stock_status": "in_stock",
    "short_desc": "Analizor logic digital pe 16 canale independente la 100MHz cu carcasă de aluminiu ecranată și sonde cu micro-clești: decodare automată protocoale SPI, I2C, UART, CAN, USB 1.1 și JTAG în timp real.",
    "full_desc": "Acest analizor logic compact pe USB este un instrument esențial pentru orice banc de lucru de inginerie inversă sau dezvoltare de firmware. Funcționează cu software-ul gratuit și open-source PulseView / Sigrok, oferind decodificatoare automate pentru peste 100 de protocoale industriale și digitale.",
    "technical_specs": {
      "channels": "16 canale logice digitale simultane",
      "interfaces": [
        "Conector panglică 20-pin",
        "Port USB Type-B / Type-C către PC"
      ],
      "input_voltage": "Compatibil cu logică 1.8V, 2.5V, 3.3V și 5.0V CMOS/TTL",
      "sampling_rate": "Până la 100 MSPS (eșantioane pe secundă)"
    },
    "pinout_info": null,
    "datasheet_url": "https://sigrok.org/wiki/Supported_hardware",
    "image_url": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80",
    "badge": "100MHz 16-CH",
    "tags": [
      "Logic Analyzer",
      "100MHz",
      "Sigrok",
      "PulseView",
      "Hardware Debug",
      "Protocol Analyzer"
    ],
    "rating": 4.93,
    "review_count": 38,
    "featured": false,
    "compatible_with": [
      "bus-pirate-v5-hardware-hacking-tool"
    ]
  },
  {
    "slug": "dual-gigabit-hardware-network-tap",
    "name": "Dual Gigabit Hardware Network TAP (Passive 10/100/1000Base-T Packet Capture / Plunder Bug Style)",
    "sku": "SEC-NET-TAP-1G",
    "mpn": "NET-TAP-GIGABIT",
    "category_id": 7,
    "subcategory": "Network Security & Hak5",
    "price_ron": 339.99,
    "old_price_ron": 389.99,
    "stock": 13,
    "stock_status": "in_stock",
    "short_desc": "TAP de rețea hardware pasiv pentru interceptarea fără alterare a traficului Gigabit Ethernet (full-duplex RX/TX pe porturi separate de monitorizare) pentru Wireshark / Zeek / Suricata.",
    "full_desc": "Spre deosebire de port-mirroring-ul bazat pe switch-uri software care poate pierde pachete în sarcini mari, acest TAP hardware reproduce fizic 100% din traficul ce trece pe fir fără a introduce latență, jitter sau riscuri de injectare de pachete în rețeaua monitorizată.",
    "technical_specs": {
      "ports": [
        "2x Porturi de rețea inline passthrough (J1 și J2)",
        "2x Porturi de monitorizare RX / TX (Tap A și Tap B)"
      ],
      "power": "Alimentare 5V via USB-C cu protecție la cădere (traficul continuă să curgă chiar și fără alimentare pe circuit pasiv)",
      "speed": "10/100/1000 Base-T Gigabit Ethernet"
    },
    "pinout_info": null,
    "datasheet_url": "https://en.wikipedia.org/wiki/Network_tap",
    "image_url": "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&auto=format&fit=crop&q=80",
    "badge": "Passive Sniffer",
    "tags": [
      "Network TAP",
      "Gigabit Ethernet",
      "Wireshark",
      "Packet Capture",
      "Passive Sniffer"
    ],
    "rating": 4.91,
    "review_count": 14,
    "featured": false,
    "compatible_with": [
      "hak5-packet-squirrel-ethernet-tap"
    ]
  },
  {
    "slug": "tester-detector-cabluri-malitioase-omg",
    "name": "Tester & Detector de Cabluri Malițioase C-to-C (O.MG Cable Tester / Hardware Interceptor Detector)",
    "sku": "SEC-CAB-TEST-OMG",
    "mpn": "CAB-DETECTOR-V2",
    "category_id": 7,
    "subcategory": "USB Security & Hotplug",
    "price_ron": 178.99,
    "old_price_ron": 209.99,
    "stock": 19,
    "stock_status": "in_stock",
    "short_desc": "Dispozitiv de securitate pentru laborator ce detectează implanturile hardware ascunse în cabluri USB-C/Lightning (cipuri Wi-Fi spion, payload-uri BadUSB ascunse în conector), testând integritatea pinilor CC/VBUS.",
    "full_desc": "Cablurile malițioase moderne (precum O.MG Cable sau USBNinja) conțin microprocesoare și module Wi-Fi ascunse în carcasa mufei USB. Acest detector măsoară rezistența, continuitatea și impedanța fiecărui pin intern pentru a identifica imediat cablurile modificate înainte de conectarea lor pe computere sensibile.",
    "technical_specs": {
      "power": "Baterie internă tip pastilă CR2032 sau alimentare externă 5V",
      "display": "Matrice de LED-uri de diagnostic pe fiecare linie de semnal (GND, TX/RX, CC, VBUS, D+/D-)",
      "interfaces": [
        "Intrare USB Type-C",
        "Ieșire USB Type-C",
        "Soclu Lightning",
        "Port Micro-USB"
      ]
    },
    "pinout_info": null,
    "datasheet_url": "https://o.mg.lol/",
    "image_url": "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&auto=format&fit=crop&q=80",
    "badge": "Anti-Implant",
    "tags": [
      "O.MG Cable Detector",
      "Malicious Cable",
      "Hardware Implant",
      "USB Security",
      "BadUSB"
    ],
    "rating": 4.94,
    "review_count": 17,
    "featured": false,
    "compatible_with": [
      "hak5-usb-rubber-ducky-v3"
    ]
  },
  {
    "slug": "pachet-10x-carduri-taguri-t5577-mifare-magic",
    "name": "Pachet 10x Carduri & Taguri Dual-Frequency T5577 (125kHz Re-writable) + Mifare Magic Gen2 (13.56MHz UID Changeable)",
    "sku": "SEC-RFID-TAG-PACK10",
    "mpn": "RFID-TEST-DUAL10",
    "category_id": 7,
    "subcategory": "RFID / NFC Research",
    "price_ron": 74.99,
    "old_price_ron": 89.99,
    "stock": 40,
    "stock_status": "in_stock",
    "short_desc": "Set esențial de test pentru laboratorul RFID/NFC: 5 carduri cu cip Atmel T5577 (rescriibile pentru clonare EM4100 / HID Prox) și 5 taguri Mifare Classic 1K cu bloc 0 (UID) direct inscriptibil fără backdoor-uri blocate.",
    "full_desc": "Kitul ideal de consumabile pentru experimente cu Flipper Zero sau Proxmark3. Cardurile T5577 pot emula orice cip de joasă frecvență de 125kHz, în timp ce tagurile Mifare Magic Gen2 (CUID) suportă rescrierea sectorului 0 cu comenzi standard de scriere ISO14443A, ocolind sistemele anti-clonare care blochează tagurile Gen1.",
    "technical_specs": {
      "contents": [
        "5x Carduri albe PVC T5577 (125kHz LF, 330 biți EEPROM)",
        "5x Brelocuri RFID albastre Mifare Classic 1K Magic Gen2 (13.56MHz HF, UID modificabil)"
      ],
      "compatibility": "100% compatibile cu Flipper Zero, Proxmark3, ChameleonUltra, ACR122U"
    },
    "pinout_info": null,
    "datasheet_url": "https://lab401.com/",
    "image_url": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&auto=format&fit=crop&q=80",
    "badge": "Lab Test Pack",
    "tags": [
      "RFID Tags",
      "T5577",
      "Mifare Magic Gen2",
      "UID Changeable",
      "Proxmark3",
      "Test Lab"
    ],
    "rating": 4.98,
    "review_count": 52,
    "featured": false,
    "compatible_with": [
      "proxmark3-rdv401-research-kit",
      "flipper-zero-portable-multi-tool"
    ]
  },
  {
    "slug": "raspberry-pi-compute-module-4-8gb-emmc-wifi",
    "name": "Raspberry Pi Compute Module 4 (CM4) - 8GB RAM, 32GB eMMC, Wi-Fi & BT",
    "sku": "RPI-CM4-8G32GW",
    "mpn": "CM4108032",
    "category_id": 1,
    "subcategory": "SBC ARM",
    "price_ron": 489.99,
    "old_price_ron": 539.99,
    "stock": 18,
    "stock_status": "in_stock",
    "short_desc": "Modul de calcul industrial BCM2711 Quad-Core A72 @ 1.5GHz, 8GB LPDDR4, 32GB eMMC și conectivitate wireless dual-band.",
    "full_desc": "Raspberry Pi Compute Module 4 valorifică puterea de calcul a Raspberry Pi 4 într-un format compact pentru integrare în plăci carrier industriale, clustere homelab tip Blade sau echipamente IoT robuste. Dispune de interfață PCIe 2.0 x1 dedicată pentru extensii NVMe sau plăci de rețea.",
    "technical_specs": {
      "architecture": "ARM64",
      "skill_level": "Advanced",
      "processor": "Broadcom BCM2711 Quad-core Cortex-A76 @ 1.5GHz",
      "ram": "8GB LPDDR4-3200 SDRAM",
      "storage": "32GB eMMC Flash de înaltă anduranță",
      "interfaces": [
        "PCIe 2.0 x1",
        "Gigabit Ethernet PHY",
        "2x HDMI 2.0",
        "2x MIPI DSI",
        "2x MIPI CSI-2",
        "28x GPIO"
      ],
      "power_consumption": "4.5W tipic",
      "operating_voltage": "5V DC via carrier board",
      "linux_support": "Mainline Kernel 6.6+ & Raspberry Pi OS",
      "works_with_os": [
        "Raspberry Pi OS",
        "Ubuntu Server",
        "Debian",
        "Alpine Linux"
      ],
      "documentation_links": {
        "datasheet": "https://datasheets.raspberrypi.com/cm4/cm4-datasheet.pdf",
        "pinout": "https://datasheets.raspberrypi.com/cm4/cm4-pinout.pdf"
      }
    },
    "pinout_info": {
      "pin_map": [
        {
          "pin": "Hirose DF40 Pin 1",
          "name": "GND",
          "function": "Ground referință masă"
        },
        {
          "pin": "Hirose DF40 Pin 3",
          "name": "PCIE_TX_P",
          "function": "PCIe 2.0 x1 Transmit Pozitiv"
        },
        {
          "pin": "Hirose DF40 Pin 5",
          "name": "PCIE_TX_N",
          "function": "PCIe 2.0 x1 Transmit Negativ"
        }
      ]
    },
    "datasheet_url": "https://datasheets.raspberrypi.com/cm4/cm4-datasheet.pdf",
    "image_url": "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    "badge": "Popular Compute",
    "tags": [
      "sbc",
      "arm64",
      "cm4",
      "industrial",
      "pcie",
      "cluster"
    ],
    "rating": 4.95,
    "review_count": 14,
    "featured": true,
    "compatible_with": [
      "raspberry-pi-5-8gb",
      "sursa-raspberry-pi-27w-usb-c"
    ]
  },
  {
    "slug": "banana-pi-bpi-r3-wifi-6-router-sbc",
    "name": "Banana Pi BPI-R3 Wi-Fi 6 Router Board (MediaTek MT7986A, 2x 2.5G SFP)",
    "sku": "BPI-R3-ROUTER",
    "mpn": "BPI-R3-MT7986",
    "category_id": 1,
    "subcategory": "SBC ARM & Networking",
    "price_ron": 589.99,
    "old_price_ron": 649.99,
    "stock": 9,
    "stock_status": "in_stock",
    "short_desc": "SBC de rețea enterprise cu procesor Filogic 830 Quad A53 @ 2.0GHz, 2x porturi SFP 2.5G, 5x Gigabit RJ45 și Wi-Fi 6 4x4.",
    "full_desc": "Banana Pi BPI-R3 este placa ideală pentru construirea unui router custom hardware OpenWrt de foarte mare viteză. Cu 2 sloturi SFP pentru fibră optică sau module DAC de 2.5GbE, 5 porturi Ethernet RJ45 Gigabit și suport integrat Wi-Fi 6 AX6000 dual-band, suportă hardware packet steering și wire-guard VPN de mare debit.",
    "technical_specs": {
      "architecture": "ARM64",
      "skill_level": "Intermediate",
      "processor": "MediaTek MT7986A (Filogic 830) Quad-Core ARM Cortex-A53 @ 2.0GHz",
      "ram": "2GB DDR4",
      "storage": "8GB eMMC Flash onboard + Slot MicroSD + Slot M.2 NVMe PCIe x2",
      "interfaces": [
        "2x 2.5G SFP cage",
        "5x Gigabit Ethernet (1 WAN + 4 LAN)",
        "1x USB 3.0",
        "Slot M.2 B-Key 5G",
        "Slot M.2 M-Key NVMe"
      ],
      "operating_voltage": "12V DC / 3A (Jack 5.5x2.1mm)",
      "power_consumption": "8W idle, 22W sub sarcină Wi-Fi maximă",
      "linux_support": "OpenWrt Official Snapshot / Linux Mainline 6.x",
      "works_with_os": [
        "OpenWrt",
        "Debian",
        "Armbian"
      ],
      "documentation_links": {
        "datasheet": "https://wiki.banana-pi.org/Banana_Pi_BPI-R3",
        "github": "https://github.com/BPI-SBC/BPI-R3-OPENWRT-V21.02"
      }
    },
    "datasheet_url": "https://wiki.banana-pi.org/Banana_Pi_BPI-R3",
    "image_url": "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80",
    "badge": "OpenWrt Flagship",
    "tags": [
      "router",
      "openwrt",
      "sfp",
      "wifi6",
      "networking",
      "sbc"
    ],
    "rating": 4.88,
    "review_count": 9,
    "featured": true,
    "compatible_with": [
      "transceiver-sfp-10gbase-t-copper",
      "cablu-dac-10g-sfp-1m"
    ]
  },
  {
    "slug": "radxa-zero-3w-4gb-quad-core-wifi6",
    "name": "Radxa Zero 3W (4GB RAM, Quad-Core Cortex-A35, Wi-Fi 6 & BT 5.4)",
    "sku": "RADXA-ZERO-3W-4G",
    "mpn": "RADXA-Z3W-4GB",
    "category_id": 1,
    "subcategory": "SBC ARM",
    "price_ron": 179.99,
    "old_price_ron": 199.99,
    "stock": 22,
    "stock_status": "in_stock",
    "short_desc": "SBC ultra-compact în format Raspberry Pi Zero cu procesor Rockchip RK3566, 4GB RAM LPDDR4 și Wi-Fi 6.",
    "full_desc": "Radxa Zero 3W oferă o performanță de 4x mai mare decât un Raspberry Pi Zero 2W clasic, integrând 4GB de RAM LPDDR4, procesor RK3566 pe 64 de biți și conectivitate wireless de generație nouă Wi-Fi 6 cu antenă ceramică onboard și conector IPEX extern.",
    "technical_specs": {
      "architecture": "ARM64",
      "skill_level": "Beginner",
      "processor": "Rockchip RK3566 Quad-core ARM Cortex-A35 @ 1.6GHz + NPU 0.8 TOPS",
      "ram": "4GB LPDDR4",
      "storage": "MicroSD slot (suport eMMC opțional)",
      "interfaces": [
        "Micro HDMI 1080p60",
        "1x USB 3.0 Type-C OTG",
        "1x USB 2.0 Type-C Power",
        "40-pin GPIO"
      ],
      "operating_voltage": "5V DC via USB-C (5V/2A)",
      "power_consumption": "1.2W idle, 4W max load",
      "linux_support": "Debian 11/12, Ubuntu, Armbian 6.x",
      "works_with_os": [
        "Debian",
        "Ubuntu",
        "Armbian",
        "DietPi"
      ]
    },
    "datasheet_url": "https://radxa.com/products/zeros/zero3w",
    "image_url": "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80",
    "badge": "Compact Power",
    "tags": [
      "sbc",
      "arm64",
      "radxa",
      "wifi6",
      "iot",
      "portable"
    ],
    "rating": 4.82,
    "review_count": 11,
    "featured": false
  },
  {
    "slug": "libre-computer-aml-s905x-cc-le-potato-2gb",
    "name": "Libre Computer AML-S905X-CC (Le Potato) - 2GB RAM 4K HDR",
    "sku": "LC-LE-POTATO-2GB",
    "mpn": "AML-S905X-CC-2GB",
    "category_id": 1,
    "subcategory": "SBC ARM",
    "price_ron": 199.99,
    "old_price_ron": 229.99,
    "stock": 15,
    "stock_status": "in_stock",
    "short_desc": "SBC open-source cu suport nativ Mainline Linux Kernel 6.x, decodare hardware 4K HDR și compatibilitate cu accesorii Raspberry Pi.",
    "full_desc": "Le Potato este un SBC proiectat cu filozofia open-source în minte, având suport upstream direct în kernel-ul Linux mainline și U-Boot. Ideal pentru proiecte unde stabilitatea kernelului și eliminarea driverelor binare proprietare sunt primordiale.",
    "technical_specs": {
      "architecture": "ARM64",
      "skill_level": "Beginner",
      "processor": "Amlogic S905X Quad-core Cortex-A53 @ 1.5GHz",
      "ram": "2GB DDR3",
      "storage": "Slot MicroSD UHS + eMMC 5.x interface",
      "interfaces": [
        "Fast Ethernet 100M",
        "4x USB 2.0",
        "HDMI 2.0 4K60",
        "40-pin Raspberry Pi GPIO",
        "S/PDIF Optical"
      ],
      "operating_voltage": "5V DC via Micro-USB",
      "power_consumption": "2W idle, 5W load",
      "linux_support": "100% Upstream Linux Kernel (6.6+ Mainline)",
      "works_with_os": [
        "Debian",
        "Ubuntu",
        "Armbian",
        "CoreELEC"
      ]
    },
    "datasheet_url": "https://libre.computer/products/aml-s905x-cc/",
    "image_url": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
    "badge": "100% Mainline",
    "tags": [
      "sbc",
      "arm64",
      "mainline",
      "open-source",
      "media-server"
    ],
    "rating": 4.79,
    "review_count": 8,
    "featured": false
  },
  {
    "slug": "pine64-quartz64-model-a-8gb-rk3566",
    "name": "Pine64 Quartz64 Model A (8GB RAM, Rockchip RK3566, PCIe x1 Slot)",
    "sku": "PINE64-QUARTZ64-A-8G",
    "mpn": "QUARTZ64-A-8GB",
    "category_id": 1,
    "subcategory": "SBC ARM",
    "price_ron": 399.99,
    "old_price_ron": 449.99,
    "stock": 12,
    "stock_status": "in_stock",
    "short_desc": "SBC hacker-friendly cu slot fizic deschis PCIe 2.0 x1, port SATA 3.0 nativ, 8GB RAM și suport e-Ink display.",
    "full_desc": "Pine64 Quartz64 Model A oferă o conectivitate unică pentru un SBC sub 400 de lei: un slot PCIe 2.0 x1 mecanic deschis ce acceptă direct plăci grafice, controllere SATA sau plăci de rețea Intel/Mellanox, alături de un port nativ SATA 6Gbps și conector e-Ink.",
    "technical_specs": {
      "architecture": "ARM64",
      "skill_level": "Intermediate",
      "processor": "Rockchip RK3566 Quad A55 64-bit @ 1.8GHz + 0.8 TOPS NPU",
      "ram": "8GB LPDDR4",
      "storage": "MicroSD slot + socket eMMC + 1x SATA 3.0 (cu header alimentare)",
      "interfaces": [
        "Slot PCIe 2.0 x1 mecanic deschis",
        "Gigabit Ethernet",
        "1x USB 3.0",
        "3x USB 2.0",
        "HDMI 2.0",
        "e-Paper interface"
      ],
      "operating_voltage": "12V DC (Jack baril 5.5x2.1mm)",
      "power_consumption": "3W idle, 9W sub sarcină maximă",
      "linux_support": "Linux Mainline 6.x (suport comunitar activ)",
      "works_with_os": [
        "Debian",
        "Manjaro ARM",
        "Armbian",
        "FreeBSD"
      ]
    },
    "datasheet_url": "https://wiki.pine64.org/wiki/Quartz64",
    "image_url": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
    "badge": "PCIe Expansibil",
    "tags": [
      "sbc",
      "arm64",
      "pcie",
      "pine64",
      "sata",
      "homelab"
    ],
    "rating": 4.85,
    "review_count": 13,
    "featured": false
  },
  {
    "slug": "apple-ipod-touch-7th-gen-a10-linux-dev",
    "name": "Apple iPod touch (7th Gen) 32GB — A10 Fusion Linux Dev Platform",
    "sku": "APPLE-IPOD-TOUCH-7-A10",
    "mpn": "MVHV2LL/A-LAB",
    "category_id": 6,
    "subcategory": "Apple Hardware Linux",
    "price_ron": 349.99,
    "old_price_ron": 399.99,
    "stock": 7,
    "stock_status": "in_stock",
    "short_desc": "Dispozitiv ultra-subțire A10 Fusion exploatabil via checkm8 pentru rulare kernel Linux 6.x / postmarketOS fără baterie umflată.",
    "full_desc": "iPod touch generația a 7-a este cel mai compact dispozitiv Apple dotat cu procesorul quad-core A10 Fusion pe 64 de biți. Nefiind legat de modem celular baseband, oferă o platformă curată și sigură pentru bootarea distribuțiilor Linux ARM64 (postmarketOS, Debian) direct prin exploit-ul de bootrom tethered checkm8.",
    "technical_specs": {
      "architecture": "ARM64 (Apple A10)",
      "skill_level": "Expert",
      "processor": "Apple A10 Fusion Quad-core (2x Hurricane + 2x Zephyr @ 2.34GHz)",
      "ram": "2GB LPDDR4",
      "storage": "32GB Apple NVMe Flash",
      "interfaces": [
        "Lightning (D+/D- USB 2.0 & UART Debug)",
        "Wi-Fi 802.11ac",
        "Bluetooth 4.1",
        "Display Retina 4\" 1136x640"
      ],
      "operating_voltage": "5V USB via Lightning",
      "power_consumption": "0.4W idle, 2.5W max CPU load",
      "linux_support": "Linux Mainline branch (A10 SoC checkm8 payload)",
      "works_with_os": [
        "postmarketOS",
        "Alpine Linux",
        "Debian chroot",
        "iOS 15.8 Legacy"
      ]
    },
    "datasheet_url": "https://postmarketos.org/wiki/device:apple-ipod7",
    "image_url": "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80",
    "badge": "Linux Pocket Node",
    "tags": [
      "niche",
      "apple-linux",
      "checkm8",
      "a10",
      "postmarketos",
      "arm64"
    ],
    "rating": 4.89,
    "review_count": 6,
    "featured": true
  },
  {
    "slug": "apple-iphone-7-plus-128gb-a10-linux-testbed",
    "name": "Apple iPhone 7 Plus 128GB — A10 Fusion Linux Platform (Refurbished)",
    "sku": "APPLE-IPHONE-7PLUS-A10",
    "mpn": "MN4M2LL/A-LAB",
    "category_id": 6,
    "subcategory": "Apple Hardware Linux",
    "price_ron": 499.99,
    "old_price_ron": 579.99,
    "stock": 8,
    "stock_status": "in_stock",
    "short_desc": "Platformă de dezvoltare Linux A10 Fusion cu ecran 5.5\" 1080p, 3GB RAM și 128GB spațiu pentru compilare nativă.",
    "full_desc": "iPhone 7 Plus oferă 3GB de RAM LPDDR4 (cu 50% mai mult decât iPhone 7 standard), făcându-l capabil să compileze pachete C/Rust direct pe dispozitiv sub postmarketOS. Exploit-ul checkm8 permite injectarea u-boot și inițializarea framebuffer-ului la rezoluție nativă 1920x1080.",
    "technical_specs": {
      "architecture": "ARM64 (Apple A10)",
      "skill_level": "Expert",
      "processor": "Apple A10 Fusion Quad-core 64-bit @ 2.34GHz",
      "ram": "3GB LPDDR4",
      "storage": "128GB NVMe Storage intern",
      "interfaces": [
        "Lightning Connector cu suport DCSD serial cable",
        "Wi-Fi 802.11a/b/g/n/ac",
        "Display 5.5\" 1080p"
      ],
      "operating_voltage": "5V DC via Lightning",
      "power_consumption": "0.8W idle, 3.8W max load",
      "linux_support": "Mainline Linux Kernel adaptat checkm8",
      "works_with_os": [
        "postmarketOS",
        "Debian Linux",
        "PongoOS"
      ]
    },
    "datasheet_url": "https://github.com/checkra1n/PongoOS",
    "image_url": "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=800&q=80",
    "badge": "3GB RAM A10",
    "tags": [
      "niche",
      "apple-linux",
      "checkm8",
      "a10",
      "arm64",
      "security"
    ],
    "rating": 4.88,
    "review_count": 5,
    "featured": false
  },
  {
    "slug": "apple-tv-4k-1st-gen-a10x-headless-node",
    "name": "Apple TV 4K (1st Gen) 64GB — Apple A10X Fusion 6-Core Headless Node",
    "sku": "APPLE-TV-4K-A10X",
    "mpn": "MP7P2LL/A-LAB",
    "category_id": 6,
    "subcategory": "Apple Hardware Linux",
    "price_ron": 449.99,
    "old_price_ron": 519.99,
    "stock": 5,
    "stock_status": "in_stock",
    "short_desc": "Dispozitiv A10X Fusion cu 6 nuclee CPU (3x Hurricane + 3x Zephyr), Gigabit Ethernet nativ și ieșire HDMI 2.0a 4K.",
    "full_desc": "Apple TV 4K prima generație ascunde un procesor A10X extrem de puternic (cu 6 nuclee de procesare și GPU cu 12 nuclee), alături de un port Gigabit Ethernet nativ. Cu un breakout Lightning de debug intern sau exploatare prin DFU, oferă performanțe impresionante de nod headless de calcul.",
    "technical_specs": {
      "architecture": "ARM64 (Apple A10X)",
      "skill_level": "Expert",
      "processor": "Apple A10X Fusion 6-Core (3x Hurricane @ 2.38GHz + 3x Zephyr)",
      "ram": "3GB LPDDR4",
      "storage": "64GB Apple NVMe Solid State",
      "interfaces": [
        "Gigabit Ethernet RJ45",
        "HDMI 2.0a",
        "Wi-Fi 802.11ac MIMO",
        "Sursă alimentare integrată 230V"
      ],
      "operating_voltage": "100-240V AC intern",
      "power_consumption": "2.5W idle, 9W sub încărcare completă 6-core",
      "linux_support": "PongoOS & checkm8 payload research",
      "works_with_os": [
        "PongoOS",
        "Custom Linux Kernel",
        "tvOS 17 Legacy"
      ]
    },
    "datasheet_url": "https://theapplewiki.com/wiki/Apple_TV_4K_(1st_generation)",
    "image_url": "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80",
    "badge": "6-Core A10X",
    "tags": [
      "niche",
      "apple-linux",
      "a10x",
      "gigabit",
      "checkm8",
      "headless"
    ],
    "rating": 4.92,
    "review_count": 4,
    "featured": false
  },
  {
    "slug": "milkv-mars-riscv-sbc-8gb-ram",
    "name": "Milk-V Mars Quad-Core 64-bit RISC-V SBC (8GB RAM, JH7110)",
    "sku": "MILKV-MARS-8GB",
    "mpn": "MILKV-MARS-8G",
    "category_id": 6,
    "subcategory": "Hardware RISC-V",
    "price_ron": 379.99,
    "old_price_ron": 429.99,
    "stock": 14,
    "stock_status": "in_stock",
    "short_desc": "SBC RISC-V în format de card de credit compatibil mecanic cu accesorii Raspberry Pi, 8GB RAM și Gigabit Ethernet.",
    "full_desc": "Milk-V Mars aduce arhitectura RISC-V la un nivel de maturitate remarcabil. Echipat cu procesorul StarFive JH7110 Quad-Core U74 @ 1.5GHz, oferă suport direct pentru distribuțiile Debian RISC-V, Fedora și Ubuntu, având conector PCIe M.2 E-Key pentru carduri wireless și 40 de pini GPIO.",
    "technical_specs": {
      "architecture": "RISC-V (RV64GC)",
      "skill_level": "Intermediate",
      "processor": "StarFive JH7110 Quad-Core 64-bit RISC-V SiFive U74 @ 1.5GHz + Imagination BXE-4-32 GPU",
      "ram": "8GB LPDDR4",
      "storage": "Slot MicroSD UHS-I + Socket modul eMMC",
      "interfaces": [
        "Gigabit Ethernet RJ45 (suport PoE HAT)",
        "3x USB 3.0",
        "1x USB 2.0",
        "HDMI 2.0 4K",
        "M.2 E-Key Wi-Fi",
        "40-pin GPIO"
      ],
      "operating_voltage": "5V DC via USB-C (3A)",
      "power_consumption": "2.5W idle, 7W max load",
      "linux_support": "Upstream Linux Kernel 6.6+ & Debian RISC-V Port",
      "works_with_os": [
        "Debian RISC-V",
        "Ubuntu RISC-V",
        "Fedora",
        "FreeBSD"
      ]
    },
    "datasheet_url": "https://milkv.io/mars",
    "image_url": "https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=800&q=80",
    "badge": "RISC-V 8GB",
    "tags": [
      "niche",
      "risc-v",
      "sbc",
      "open-architecture",
      "linux-mainline"
    ],
    "rating": 4.86,
    "review_count": 8,
    "featured": true
  },
  {
    "slug": "lichee-pi-4a-th1520-quad-riscv-16gb",
    "name": "Sipeed Lichee Pi 4A (TH1520 Quad-Core RISC-V 16GB RAM + 128GB eMMC)",
    "sku": "LICHEE-PI-4A-16G",
    "mpn": "SIPEED-LPI4A-16G",
    "category_id": 6,
    "subcategory": "Hardware RISC-V",
    "price_ron": 899.99,
    "old_price_ron": 999.99,
    "stock": 6,
    "stock_status": "in_stock",
    "short_desc": "Cel mai puternic SBC RISC-V: T-Head TH1520 Quad-Core C910 @ 1.85GHz, 16GB RAM LPDDR4X, NPU 4 TOPS și 2x Gigabit Ethernet.",
    "full_desc": "Lichee Pi 4A este primul computer pe o singură placă capabil să rivalizeze cu Raspberry Pi 4 în performanța CPU pe arhitectură RISC-V. Cu 16GB de memorie RAM, 128GB stocare internă de mare viteză și accelerare AI NPU de 4 TOPS, este stația supremă pentru dezvoltare software și portare kernel pe RISC-V.",
    "technical_specs": {
      "architecture": "RISC-V (RV64GCV)",
      "skill_level": "Expert",
      "processor": "Alibaba T-Head TH1520 Quad-Core XuanTie C910 @ 1.85GHz cu extensii Vector 0.7.1 + 4 TOPS NPU",
      "ram": "16GB LPDDR4X 3733Mbps",
      "storage": "128GB eMMC 5.1 Flash intern + slot MicroSD",
      "interfaces": [
        "2x Gigabit Ethernet RJ45",
        "4x USB 3.0 Type-A",
        "HDMI 2.0 4K30",
        "MIPI DSI + CSI",
        "Audio Jack 3.5mm"
      ],
      "operating_voltage": "5V DC / 4A via USB Type-C",
      "power_consumption": "4W idle, 14W sarcină maximă NPU+CPU",
      "linux_support": "Debian 12 RISC-V, OpenEuler, Android 13",
      "works_with_os": [
        "Debian 12",
        "openEuler",
        "Android 13 RISC-V"
      ]
    },
    "datasheet_url": "https://wiki.sipeed.com/hardware/en/lichee/th1520/lp4a.html",
    "image_url": "https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=800&q=80",
    "badge": "16GB RISC-V Monster",
    "tags": [
      "niche",
      "risc-v",
      "th1520",
      "ai-npu",
      "high-performance"
    ],
    "rating": 4.94,
    "review_count": 5,
    "featured": false
  },
  {
    "slug": "wch-ch32v003-riscv-dev-kit-10pk",
    "name": "WCH CH32V003 RISC-V Development Kit (10x Plăci + WCH-LinkE Debugger)",
    "sku": "WCH-CH32V003-KIT-10PK",
    "mpn": "WCH-CH32V003F4P6-KIT",
    "category_id": 6,
    "subcategory": "Hardware RISC-V",
    "price_ron": 59.99,
    "old_price_ron": 79.99,
    "stock": 35,
    "stock_status": "in_stock",
    "short_desc": "Kit de 10 plăcuțe microcontroler RISC-V 32-bit la 48MHz + programator WCH-LinkE pentru prototipare masivă la cost redus.",
    "full_desc": "CH32V003 este faimosul microcontroler RISC-V de sub 10 cenți. Acest kit include 10 module de dezvoltare cu pini gata lipiți și programatorul oficial WCH-LinkE cu suport SDI 1-wire debug, compatibil cu toolchain-ul GCC open-source și PlatformIO.",
    "technical_specs": {
      "architecture": "RISC-V (RV32EC)",
      "skill_level": "Beginner",
      "processor": "WCH QingKe 32-bit RISC-V Core @ 48MHz",
      "ram": "2KB SRAM",
      "storage": "16KB Flash memorie program",
      "interfaces": [
        "1x USART",
        "1x I2C",
        "1x SPI",
        "8x Canale ADC 10-bit",
        "18x GPIO"
      ],
      "operating_voltage": "3.3V / 5.0V DC",
      "power_consumption": "< 10mA activ",
      "linux_support": "Compatibil cu toolchain GCC/GDB pe Linux & macOS",
      "works_with_os": [
        "Bare-metal C/Assembly",
        "FreeRTOS"
      ]
    },
    "datasheet_url": "http://www.wch-ic.com/products/CH32V003.html",
    "image_url": "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
    "badge": "Super Valoare",
    "tags": [
      "niche",
      "risc-v",
      "microcontroller",
      "wch",
      "embedded",
      "low-cost"
    ],
    "rating": 4.83,
    "review_count": 19,
    "featured": false
  },
  {
    "slug": "tang-nano-9k-gowin-fpga-hdmi-kit",
    "name": "Tang Nano 9K Gowin FPGA Development Board cu HDMI & USB-JTAG",
    "sku": "TANG-NANO-9K",
    "mpn": "SIPEED-TANG-NANO-9K",
    "category_id": 6,
    "subcategory": "FPGA & Reconfigurable",
    "price_ron": 149.99,
    "old_price_ron": 179.99,
    "stock": 20,
    "stock_status": "in_stock",
    "short_desc": "Placă FPGA compactă cu 8640 LUT-uri, port HDMI nativ, 64Mbit PSRAM și programator USB-JTAG integrat.",
    "full_desc": "Tang Nano 9K este platforma ideală pentru învățarea Verilog/VHDL și emularea consolelor retro (NES, GameBoy, ZX Spectrum) sau a microarhitecturilor RISC-V. Dispune de conector HDMI direct, slot card TF și programator BL616 onboard prin USB Type-C.",
    "technical_specs": {
      "architecture": "FPGA (Gowin GW1NR-9)",
      "skill_level": "Intermediate",
      "processor": "Gowin GW1NR-LV9QN88P (8640 LUT4, 6480 Flip-Flop, 468Kbits Block SRAM)",
      "ram": "64Mbit PSRAM încorporată",
      "storage": "Slot MicroSD + Flash SPI 32Mbit onboard",
      "interfaces": [
        "Ieșire video digitală HDMI standard",
        "USB Type-C (JTAG & UART)",
        "Conector 40-pin RGB LCD",
        "36x I/O user pins"
      ],
      "operating_voltage": "5V DC via USB-C",
      "power_consumption": "1.5W tipic",
      "linux_support": "Gowin EDA pe Linux & Yosys/Apycula open-source flow",
      "works_with_os": [
        "Hardware sintetizat direct (Verilog/VHDL)"
      ]
    },
    "datasheet_url": "https://wiki.sipeed.com/hardware/en/tang/Tang-Nano-9K/Nano-9K.html",
    "image_url": "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&w=800&q=80",
    "badge": "FPGA Best Buy",
    "tags": [
      "niche",
      "fpga",
      "gowin",
      "hdmi",
      "verilog",
      "retro-gaming"
    ],
    "rating": 4.87,
    "review_count": 14,
    "featured": true
  },
  {
    "slug": "lattice-icestick-ice40hx1k-open-source-fpga",
    "name": "Lattice iCEstick iCE40HX-1K USB FPGA Kit (100% Open-Source Toolchain)",
    "sku": "LATTICE-ICESTICK-1K",
    "mpn": "ICE40HX1K-STICK-EVN",
    "category_id": 6,
    "subcategory": "FPGA & Reconfigurable",
    "price_ron": 269.99,
    "old_price_ron": 299.99,
    "stock": 8,
    "stock_status": "in_stock",
    "short_desc": "Dongle USB FPGA compatibil 100% cu toolchain-ul complet deschis Yosys, nextpnr și IceStorm.",
    "full_desc": "Lattice iCEstick este standardul de aur pentru dezvoltarea FPGA fără licențe software proprietare greoaie. Folosind instrumentele Project IceStorm, sinteza și rutarea bitstream-ului se execută în sub 2 secunde direct din terminalul Linux.",
    "technical_specs": {
      "architecture": "FPGA (Lattice iCE40)",
      "skill_level": "Intermediate",
      "processor": "Lattice iCE40HX-1K-TQ144 (1280 Logic Cells, 64 Kbits Block RAM)",
      "ram": "Block RAM intern",
      "storage": "32Mbit SPI Flash pentru bitstream permanent",
      "interfaces": [
        "USB 2.0 Type-A Direct",
        "2x Digilent Pmod 2x6 conectori",
        "Transceiver infraroșu IrDA",
        "5x User LEDs"
      ],
      "operating_voltage": "5V direct din portul USB",
      "power_consumption": "0.3W ultra-low power",
      "linux_support": "Yosys, NextPNR, IcePack (Debian/Ubuntu/Arch/macOS native)",
      "works_with_os": [
        "Sinteză Verilog deschisă"
      ]
    },
    "datasheet_url": "https://www.latticesemi.com/icestick",
    "image_url": "https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&w=800&q=80",
    "badge": "100% Open Toolchain",
    "tags": [
      "niche",
      "fpga",
      "ice40",
      "yosys",
      "open-source-silicon"
    ],
    "rating": 4.88,
    "review_count": 7,
    "featured": false
  },
  {
    "slug": "digilent-basys-3-artix-7-fpga-trainer-board",
    "name": "Digilent Basys 3 Artix-7 FPGA Trainer Board (Xilinx XC7A35T)",
    "sku": "DIGILENT-BASYS3-A7",
    "mpn": "410-183-BASYS3",
    "category_id": 6,
    "subcategory": "FPGA & Reconfigurable",
    "price_ron": 1299.99,
    "old_price_ron": 1449.99,
    "stock": 5,
    "stock_status": "in_stock",
    "short_desc": "Placă academică Xilinx Artix-7 cu 33.280 celule logice, ieșire VGA, 16 comutatoare, afișaj 7 segmente și Vivado WebPACK.",
    "full_desc": "Digilent Basys 3 este concepută pentru studenți și ingineri care vor să creeze propriile procesoare (MIPS, RISC-V) sau acceleratoare hardware pe arhitectura Xilinx 7-Series. Oferă un set generos de comutatoare, butoane, ieșire VGA și port USB-HID host.",
    "technical_specs": {
      "architecture": "FPGA (Xilinx Artix-7)",
      "skill_level": "Advanced",
      "processor": "Xilinx Artix-7 XC7A35T-1CPG236C (33,280 celule logice, 90 felii DSP, 1,800 Kbits BRAM)",
      "ram": "Block RAM intern + Suport USB Flash drive",
      "storage": "16MByte Quad-SPI Flash onboard",
      "interfaces": [
        "VGA 12-bit DAC",
        "USB-HID Host (tastatură/mouse)",
        "USB-JTAG integrat",
        "4x Conectori Pmod 12-pin",
        "16 comutatoare + 16 LED-uri"
      ],
      "operating_voltage": "5V DC via USB sau sursă externă",
      "power_consumption": "2W - 5W în funcție de design",
      "linux_support": "AMD Xilinx Vivado ML Standard (Linux x86_64)",
      "works_with_os": [
        "VHDL / Verilog / SystemVerilog"
      ]
    },
    "datasheet_url": "https://digilent.com/reference/programmable-logic/basys-3/reference-manual",
    "image_url": "https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=800&q=80",
    "badge": "Xilinx Artix-7",
    "tags": [
      "niche",
      "fpga",
      "xilinx",
      "artix7",
      "vivado",
      "hardware-accel"
    ],
    "rating": 4.95,
    "review_count": 6,
    "featured": false
  },
  {
    "slug": "beaglebone-black-rev-c-ti-am3358-real-time",
    "name": "BeagleBone Black Rev C (TI Sitara AM3358 1GHz, U-Boot, 2x PRU Co-Processors)",
    "sku": "BEAGLEBONE-BLACK-REVC",
    "mpn": "BB-BBLK-000C",
    "category_id": 6,
    "subcategory": "OS Development & Embedded",
    "price_ron": 349.99,
    "old_price_ron": 389.99,
    "stock": 14,
    "stock_status": "in_stock",
    "short_desc": "SBC de referință pentru dezvoltarea kernel-ului Linux și sisteme deterministe cu 2 unități PRU în timp real de 200MHz.",
    "full_desc": "BeagleBone Black este platforma prin excelență pe care învață viitorii ingineri de Linux kernel și drivere de dispozitiv. Cu acces facil la consola serială, bootloader U-Boot configurabil dinamic și două nuclee PRU de timp real, este de neînlocuit în automatizările industriale.",
    "technical_specs": {
      "architecture": "ARMv7-A (32-bit Cortex-A8)",
      "skill_level": "Intermediate",
      "processor": "TI Sitara AM3358BZCZ100 Cortex-A8 @ 1GHz + 2x 32-bit PRU-ICSS @ 200MHz",
      "ram": "512MB DDR3L-800",
      "storage": "4GB eMMC onboard + slot MicroSD",
      "interfaces": [
        "Fast Ethernet 100M",
        "Micro HDMI",
        "USB 2.0 Host",
        "Mini USB Client (alimentare & rețea virtuală)",
        "2x Headere 46-pin Cape"
      ],
      "operating_voltage": "5V DC via Mini-USB sau Jack baril 5V/2A",
      "power_consumption": "1.8W idle, 4W max",
      "linux_support": "Linux Mainline 6.x & Debian BeagleBoard Images",
      "works_with_os": [
        "Debian",
        "FreeRTOS pe PRU",
        "Buildroot",
        "Yocto Project"
      ]
    },
    "datasheet_url": "https://beagleboard.org/black",
    "image_url": "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    "badge": "OS Dev Classic",
    "tags": [
      "niche",
      "os-dev",
      "beaglebone",
      "u-boot",
      "pru",
      "realtime"
    ],
    "rating": 4.88,
    "review_count": 12,
    "featured": true
  },
  {
    "slug": "raspberry-pi-debug-probe-cmsis-dap-uart",
    "name": "Raspberry Pi Debug Probe (CMSIS-DAP + UART USB Debugger Kit)",
    "sku": "RPI-DEBUG-PROBE-KIT",
    "mpn": "SC0916",
    "category_id": 6,
    "subcategory": "OS Development & Embedded",
    "price_ron": 69.99,
    "old_price_ron": 84.99,
    "stock": 25,
    "stock_status": "in_stock",
    "short_desc": "Sondă oficială hardware de debug all-in-one: interfață SWD CMSIS-DAP și punte USB-la-UART serială independentă.",
    "full_desc": "Raspberry Pi Debug Probe rezolvă frustrarea depanării microcontrolerelor ARM Cortex-M. Conține o sondă SWD standardizată CMSIS-DAP susținută de OpenOCD și o consolă serială UART USB conectabilă la headerele de debug de pe Raspberry Pi 5 și Pico.",
    "technical_specs": {
      "architecture": "Universal ARM Debug",
      "skill_level": "Beginner",
      "processor": "Raspberry Pi RP2040 Dual-core",
      "interfaces": [
        "Port SWD (conector JST-SH 3-pin)",
        "Port UART (conector JST-SH 3-pin)",
        "Conector Micro-USB"
      ],
      "operating_voltage": "5V DC via USB (suportă ținte 3.3V logic)",
      "power_consumption": "< 0.5W",
      "linux_support": "Driverless sub Linux, macOS și Windows (USB CDC & HID)",
      "works_with_os": [
        "OpenOCD",
        "GDB",
        "picoprobe",
        "VS Code Cortex-Debug"
      ]
    },
    "datasheet_url": "https://datasheets.raspberrypi.com/debug-probe/debug-probe-product-brief.pdf",
    "image_url": "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
    "badge": "Esențial Debug",
    "tags": [
      "niche",
      "os-dev",
      "debugger",
      "swd",
      "uart",
      "openocd"
    ],
    "rating": 4.93,
    "review_count": 16,
    "featured": false
  },
  {
    "slug": "segger-jlink-edu-mini-debug-probe",
    "name": "SEGGER J-Link EDU Mini Debug Probe (Cortex-M SWD/JTAG)",
    "sku": "SEGGER-JLINK-EDU-MINI",
    "mpn": "8.08.91-EDU-MINI",
    "category_id": 6,
    "subcategory": "OS Development & Embedded",
    "price_ron": 199.99,
    "old_price_ron": 239.99,
    "stock": 10,
    "stock_status": "in_stock",
    "short_desc": "Sondă profesională originală SEGGER J-Link pentru studenți și entuziaști: breakpoint-uri nelimitate în Flash și GDB Server.",
    "full_desc": "J-Link EDU Mini este standardul industrial de viteză și stabilitate în depanarea microcontrolerelor ARM Cortex-M0/M3/M4/M7/M33. Permite viteze de descărcare în Flash de până la 200 KByte/s și analiză prin utilitarele oficiale SEGGER Ozone și SystemView.",
    "technical_specs": {
      "architecture": "Universal ARM Cortex-M Debug",
      "skill_level": "Advanced",
      "processor": "Hardware original SEGGER",
      "interfaces": [
        "Header JTAG/SWD 9-pin (0.05\" pitch)",
        "Port Micro-USB"
      ],
      "operating_voltage": "3.3V target voltage logic",
      "power_consumption": "< 0.3W",
      "linux_support": "SEGGER J-Link Software and Documentation Pack pe Linux/macOS",
      "works_with_os": [
        "GDB Server",
        "SEGGER Ozone",
        "Eclipse",
        "IAR",
        "Keil"
      ]
    },
    "datasheet_url": "https://www.segger.com/products/debug-probes/j-link/models/j-link-edu-mini/",
    "image_url": "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
    "badge": "Pro Debugger",
    "tags": [
      "niche",
      "os-dev",
      "segger",
      "jlink",
      "swd",
      "firmware"
    ],
    "rating": 4.97,
    "review_count": 11,
    "featured": false
  },
  {
    "slug": "dslogic-plus-16ch-400mhz-usb-logic-analyzer",
    "name": "DSLogic Plus 16-Channel 400MHz USB Logic Analyzer (Carcasă CNC Aluminiu)",
    "sku": "DSLOGIC-PLUS-16CH",
    "mpn": "DSLOGIC-PLUS-16",
    "category_id": 6,
    "subcategory": "Reverse Engineering",
    "price_ron": 699.99,
    "old_price_ron": 799.99,
    "stock": 9,
    "stock_status": "in_stock",
    "short_desc": "Analizor logic profesional cu memorie buffer 256Mbit DDR, eșantionare 400MHz și decodare protocoale SPI/I2C/UART/CAN/USB.",
    "full_desc": "DSLogic Plus oferă capabilități de laborator de inginerie inversă pe birou. Spre deosebire de clonele ieftine pe USB, conține 256Mbit de memorie hardware dedicată ce previne pierderea pachetelor la eșantionare de mare viteză și cabluri ecranate cu masă individuală pe fiecare fir.",
    "technical_specs": {
      "architecture": "Logic Analyzer Hardware",
      "skill_level": "Advanced",
      "interfaces": [
        "16 canale logice digitale",
        "Conector USB Type-C High-Speed",
        "16x sonde ecranate cu clești"
      ],
      "sampling_rate": "400MHz pe 4 canale, 200MHz pe 8 canale, 100MHz pe 16 canale",
      "memory": "256Mbit DDR SDRAM hardware buffer",
      "voltage_threshold": "Praguri de tensiune reglabile software: 0V - 5V (rezoluție 0.1V)",
      "linux_support": "Software DSView nativ pe Linux (AppImage / DEB) & suport Sigrok/PulseView",
      "works_with_os": [
        "DSView",
        "Sigrok PulseView"
      ]
    },
    "datasheet_url": "https://www.dreamsourcelab.com/product/dslogic-series/",
    "image_url": "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
    "badge": "400MHz Sampling",
    "tags": [
      "niche",
      "reverse-engineering",
      "logic-analyzer",
      "protocols",
      "hardware-hacking"
    ],
    "rating": 4.96,
    "review_count": 8,
    "featured": true
  },
  {
    "slug": "total-phase-beagle-usb-480-protocol-analyzer",
    "name": "Total Phase Beagle USB 480 Protocol Analyzer (Captură USB 2.0 480Mbps)",
    "sku": "TOTALPHASE-BEAGLE-480",
    "mpn": "TP320510",
    "category_id": 6,
    "subcategory": "Reverse Engineering",
    "price_ron": 3299.99,
    "old_price_ron": 3699.99,
    "stock": 3,
    "stock_status": "in_stock",
    "short_desc": "Analizor de protocol de referință industrială pentru captură și decodare în timp real a magistralelor High-Speed USB 480Mbps.",
    "full_desc": "Total Phase Beagle USB 480 este instrumentul definitiv pentru depanarea și ingineria inversă a dispozitivelor și driverelor USB. Monitorizează non-intruziv traficul USB la viteze Low, Full și High-Speed, oferind decodare live a claselor HID, Mass Storage, CDC și a transferurilor izocrone audio/video.",
    "technical_specs": {
      "architecture": "Protocol Analyzer Industrial",
      "skill_level": "Expert",
      "interfaces": [
        "Port USB 2.0 In-Line (Host & Device)",
        "Port analizor USB High-Speed către PC",
        "Conector I/O digital de declanșare"
      ],
      "buffer": "64MB memorie circulară internă de captură",
      "precision": "Rezolvare timestamp la nivel de 16.7 nanosecunde",
      "operating_voltage": "Alimentat exclusiv din portul USB al PC-ului",
      "linux_support": "Data Center Software pentru Linux x86_64 și macOS",
      "works_with_os": [
        "Total Phase Data Center",
        "Wireshark via pcap"
      ]
    },
    "datasheet_url": "https://www.totalphase.com/products/beagle-usb480/",
    "image_url": "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
    "badge": "Lab Grade Protocol",
    "tags": [
      "niche",
      "reverse-engineering",
      "usb-analyzer",
      "datacenter",
      "protocols"
    ],
    "rating": 5,
    "review_count": 3,
    "featured": false
  },
  {
    "slug": "canable-2-pro-isolated-usb-can-fd-adapter",
    "name": "CANable 2.0 Pro USB-to-CAN / CAN-FD Analyzer (Izolare Galvanică 2.5kV)",
    "sku": "CANABLE-2-PRO-ISOLATED",
    "mpn": "CANABLE-V2-PRO",
    "category_id": 6,
    "subcategory": "Reverse Engineering",
    "price_ron": 199.99,
    "old_price_ron": 239.99,
    "stock": 16,
    "stock_status": "in_stock",
    "short_desc": "Adaptor USB la CAN 2.0A/B și CAN-FD de mare viteză cu izolare galvanică 2.5kV și suport SocketCAN nativ în kernelul Linux.",
    "full_desc": "CANable 2.0 Pro utilizează un microcontroler STM32G4 de generație nouă și un transceiver CAN-FD izolat galvanic. Suportă rate de transfer de până la 5 Mbps pe CAN-FD și este recunoscut instantaneu ca interfață de rețea `can0` sub Linux fără a necesita drivere speciale.",
    "technical_specs": {
      "architecture": "CAN Bus & Automotive",
      "skill_level": "Intermediate",
      "processor": "STM32G431 32-bit Cortex-M4 @ 170MHz",
      "interfaces": [
        "Terminal cu șurub 3-pin (CAN_H, CAN_L, GND)",
        "Port USB Type-C",
        "Comutator rezistență terminare 120Ω"
      ],
      "isolation": "2.5kV izolare galvanică completă protecție PC",
      "bitrate": "Până la 1 Mbps CAN clasic și 5 Mbps CAN-FD",
      "linux_support": "Nativ în Linux SocketCAN (compatibil can-utils, SavvyCAN, Wireshark)",
      "works_with_os": [
        "Linux (SocketCAN)",
        "SavvyCAN pe Linux/macOS"
      ]
    },
    "datasheet_url": "https://canable.io/",
    "image_url": "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
    "badge": "SocketCAN Nativ",
    "tags": [
      "niche",
      "reverse-engineering",
      "can-bus",
      "can-fd",
      "automotive",
      "socketcan"
    ],
    "rating": 4.91,
    "review_count": 14,
    "featured": false
  },
  {
    "slug": "limesdr-mini-2-0-full-duplex-sdr-transceiver",
    "name": "LimeSDR Mini 2.0 Full-Duplex RF Software Defined Radio Transceiver",
    "sku": "LIMESDR-MINI-20",
    "mpn": "LMS7002M-MINI2",
    "category_id": 6,
    "subcategory": "Software Defined Radio (SDR)",
    "price_ron": 1999.99,
    "old_price_ron": 2249.99,
    "stock": 4,
    "stock_status": "in_stock",
    "short_desc": "SDR Full-Duplex profesional pe scară largă: 10MHz - 3.5GHz, lățime de bandă 30.72MHz, transceiver FPRF LMS7002M + FPGA Lattice ECP5.",
    "full_desc": "LimeSDR Mini 2.0 este instrumentul suprem pentru cercetare radio bidirecțională, permițând transmisie și recepție simultană (Full-Duplex). Ideal pentru crearea de stații de bază celulare 4G/5G private cu srsRAN, comunicații satelitare și audit radio complet.",
    "technical_specs": {
      "architecture": "SDR Full-Duplex Transceiver",
      "skill_level": "Expert",
      "frequency_range": "10 MHz – 3.5 GHz",
      "bandwidth": "Până la 30.72 MHz lățime de bandă RF",
      "fpga": "Lattice ECP5 (LFE5U-40F)",
      "rf_transceiver": "Lime Microsystems LMS7002M FPRF",
      "interfaces": [
        "Port USB 3.0 Type-A",
        "2x Conectori SMA (1x Tx, 1x Rx)"
      ],
      "power_consumption": "4W tipic via USB 3.0",
      "linux_support": "LimeSuite, GNU Radio, Gqrx, srsRAN pe Linux & macOS",
      "works_with_os": [
        "GNU Radio",
        "SDR#",
        "srsRAN",
        "Gqrx"
      ]
    },
    "datasheet_url": "https://limemicro.com/products/boards/limesdr-mini-2-0/",
    "image_url": "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80",
    "badge": "Full-Duplex 3.5GHz",
    "tags": [
      "niche",
      "sdr",
      "rf",
      "limesdr",
      "gnuradio",
      "5g-cellular"
    ],
    "rating": 4.97,
    "review_count": 5,
    "featured": true
  },
  {
    "slug": "heltec-wifi-lora-32-v3-esp32s3-sx1262",
    "name": "Heltec WiFi LoRa 32 V3 (ESP32-S3 + SX1262 LoRa 868MHz + 0.96\" OLED)",
    "sku": "HELTEC-LORA32-V3-868",
    "mpn": "HTIT-WB32LA-V3",
    "category_id": 6,
    "subcategory": "Software Defined Radio & LoRa",
    "price_ron": 119.99,
    "old_price_ron": 139.99,
    "stock": 28,
    "stock_status": "in_stock",
    "short_desc": "Nod LoRa de lungă distanță cu ESP32-S3 dual-core, radio Semtech SX1262 868MHz (+22dBm), ecran OLED și suport nativ Meshtastic.",
    "full_desc": "Heltec LoRa 32 V3 este cea mai populară placă de dezvoltare pentru crearea rețelelor mesh descentralizate Meshtastic. Combină procesorul ESP32-S3 cu suport Wi-Fi și Bluetooth 5.0 cu cel mai performant cip radio LoRa SX1262 și un display OLED integrat.",
    "technical_specs": {
      "architecture": "ESP32-S3 + Semtech SX1262",
      "skill_level": "Beginner",
      "processor": "Xtensa 32-bit LX7 Dual-Core @ 240MHz + 8MB Flash",
      "rf_frequency": "Banda ISM europeană 863-870 MHz (suport +22dBm output)",
      "interfaces": [
        "Display 0.96\" OLED monocrom I2C",
        "Conector antenă IPEX/U.FL (antenă inclusă)",
        "Port USB-C",
        "Conector baterie Li-Po 3.7V"
      ],
      "operating_voltage": "5V USB-C sau baterie Li-Po",
      "power_consumption": "Somn adânc: 10µA | Transmisie radio: 120mA",
      "linux_support": "Flasher web Meshtastic & PlatformIO direct pe Linux",
      "works_with_os": [
        "Meshtastic Firmware",
        "ESPHome",
        "Arduino IDE"
      ]
    },
    "datasheet_url": "https://resource.heltec.cn/download/WiFi_LoRa_32_V3",
    "image_url": "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    "badge": "Meshtastic Native",
    "tags": [
      "niche",
      "lora",
      "meshtastic",
      "esp32-s3",
      "rf",
      "off-grid"
    ],
    "rating": 4.91,
    "review_count": 22,
    "featured": false
  },
  {
    "slug": "lilygo-t-beam-esp32-lora-868-gps-neo6m",
    "name": "LilyGO T-Beam ESP32 LoRa 868MHz + GPS NEO-6M (Meshtastic Node Portabil)",
    "sku": "LILYGO-TBEAM-GPS-868",
    "mpn": "T-BEAM-V1.2-868",
    "category_id": 6,
    "subcategory": "Software Defined Radio & LoRa",
    "price_ron": 189.99,
    "old_price_ron": 219.99,
    "stock": 14,
    "stock_status": "in_stock",
    "short_desc": "Nod portabil autonom cu receptor GPS u-blox, radio LoRa SX1262, soclu baterie 18650 și management avansat AXP2101.",
    "full_desc": "LilyGO T-Beam este soluția completă de comunicații off-grid și geolocalizare fără rețea celulară. Transmite coordonatele GPS criptate pe frecvența 868MHz către alți utilizatori din rețeaua Meshtastic, funcționând zile întregi pe un singur acumulator 18650.",
    "technical_specs": {
      "architecture": "ESP32 Dual-Core + GPS",
      "skill_level": "Intermediate",
      "processor": "ESP32 Dual-Core @ 240MHz + 4MB Flash + 8MB PSRAM",
      "gps_module": "u-blox NEO-6M cu antenă ceramică patch activă dedicată",
      "lora_chip": "Semtech SX1262 868MHz",
      "power_management": "PMU AXP2101 cu încărcare inteligentă 18650",
      "interfaces": [
        "Soclu acumulator 18650 pe spate",
        "Conector antenă SMA mamă",
        "Port USB-C",
        "Header I2C pentru ecran"
      ],
      "operating_voltage": "3.7V Li-Ion 18650 sau 5V USB-C",
      "power_consumption": "Mod GPS fix + LoRa ascultare: ~65mA",
      "linux_support": "Flasher Meshtastic CLI pe Linux/macOS",
      "works_with_os": [
        "Meshtastic OS",
        "Paxcounter"
      ]
    },
    "datasheet_url": "https://github.com/Xinyuan-LilyGO/LilyGO-T-Beam",
    "image_url": "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
    "badge": "GPS + LoRa Node",
    "tags": [
      "niche",
      "lora",
      "meshtastic",
      "gps",
      "esp32",
      "emergency-radio"
    ],
    "rating": 4.89,
    "review_count": 15,
    "featured": false
  },
  {
    "slug": "coral-m2-dual-edge-tpu-8tops-ekey",
    "name": "Google Coral M.2 Accelerator with Dual Edge TPU (8 TOPS, M.2 E-Key)",
    "sku": "CORAL-M2-DUAL-EDGETPU",
    "mpn": "G650-06076-01",
    "category_id": 6,
    "subcategory": "Compute Accelerators",
    "price_ron": 299.99,
    "old_price_ron": 349.99,
    "stock": 11,
    "stock_status": "in_stock",
    "short_desc": "Accelerator AI dublu cu 2x cipuri Google Edge TPU (8 TOPS total la doar 4W) în format compact M.2 2230 E-Key.",
    "full_desc": "Google Coral Dual Edge TPU integrează două coprocesoare de inferență ML independente pe un singur card M.2. Fiecare TPU rulează la 4 TOPS și consumă doar 2W, fiind acceleratorul preferat pentru sisteme Frigate NVR capabile să detecteze zeci de stream-uri video 4K simultan.",
    "technical_specs": {
      "architecture": "Google Edge TPU ASIC",
      "skill_level": "Intermediate",
      "performance": "8 TOPS total (2x 4 TOPS @ 2W per cip)",
      "form_factor": "M.2 2230 E-Key (necesită suport dual PCIe lane pe slotul M.2)",
      "interface": "2x PCIe Gen2 x1 independente",
      "power_consumption": "4W la sarcină maximă dublă",
      "operating_voltage": "3.3V DC via slot M.2",
      "linux_support": "Driver Gasket și libedgetpu oficial Debian/Ubuntu",
      "works_with_os": [
        "Debian",
        "Ubuntu",
        "Proxmox VE (passthrough PCIe)",
        "Frigate NVR"
      ]
    },
    "datasheet_url": "https://coral.ai/products/m2-accelerator-dual-edgetpu/",
    "image_url": "https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=800&q=80",
    "badge": "8 TOPS Frigate",
    "tags": [
      "niche",
      "edge-tpu",
      "coral",
      "ai-inference",
      "frigate",
      "nvr"
    ],
    "rating": 4.95,
    "review_count": 18,
    "featured": true
  },
  {
    "slug": "raspberry-pi-ai-hat-plus-26-tops-hailo8",
    "name": "Raspberry Pi AI HAT+ 26 TOPS (Modul Hailo-8 M.2 Integrat)",
    "sku": "RPI-AI-HAT-PLUS-26TOPS",
    "mpn": "SC1204",
    "category_id": 6,
    "subcategory": "Compute Accelerators",
    "price_ron": 499.99,
    "old_price_ron": 559.99,
    "stock": 13,
    "stock_status": "in_stock",
    "short_desc": "Placă HAT oficială pentru Raspberry Pi 5 cu accelerator Hailo-8 de 26 TOPS pentru modele mari de viziune computerizată și LLM.",
    "full_desc": "Raspberry Pi AI HAT+ aduce puterea inferenței AI profesionale pe Raspberry Pi 5. Cu 26 de TOPS asigurate de cipul Hailo-8 conectat prin magistrala PCIe 3.0, procesează modele YOLOv8 la peste 100 FPS în timp real direct din suita Raspberry Pi Camera.",
    "technical_specs": {
      "architecture": "Hailo-8 Neural Processing Architecture",
      "skill_level": "Intermediate",
      "performance": "26 TOPS (Tera-Operations Per Second)",
      "interface": "PCIe 3.0 x1 via conector FPC 16-pin Raspberry Pi 5",
      "form_factor": "Standard HAT+ cu decupaj pentru ventilator activ",
      "power_consumption": "5W maxim la 26 TOPS",
      "linux_support": "HailoRT integrat nativ în apt pe Raspberry Pi OS",
      "works_with_os": [
        "Raspberry Pi OS Bookworm",
        "Ubuntu 24.04 ARM64"
      ]
    },
    "datasheet_url": "https://datasheets.raspberrypi.com/ai-hat/ai-hat-plus-product-brief.pdf",
    "image_url": "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    "badge": "26 TOPS Official",
    "tags": [
      "niche",
      "hailo-8",
      "ai-accelerator",
      "raspberry-pi-5",
      "neural-network"
    ],
    "rating": 4.98,
    "review_count": 10,
    "featured": true
  },
  {
    "slug": "intel-neural-compute-stick-2-myriad-x-refurb",
    "name": "Intel Neural Compute Stick 2 (Myriad X VPU Edge AI - Refurbished Lab)",
    "sku": "INTEL-NCS2-REFURB",
    "mpn": "NCSM2485.DK-LAB",
    "category_id": 6,
    "subcategory": "Compute Accelerators",
    "price_ron": 289.99,
    "old_price_ron": 349.99,
    "stock": 7,
    "stock_status": "in_stock",
    "short_desc": "Stick USB 3.0 de accelerare deep learning bazat pe procesorul vizual Intel Movidius Myriad X și OpenVINO.",
    "full_desc": "Intel NCS 2 este acceleratorul USB clasic pentru inferență rapidă a rețelelor neurale convoluționale pe dispozitive fără slot PCIe sau GPU dedicat. Compatibil cu toolkit-ul OpenVINO, permite rularea detectoarelor de obiecte pe orice Mini PC sau Raspberry Pi.",
    "technical_specs": {
      "architecture": "Intel Movidius Myriad X VPU",
      "skill_level": "Intermediate",
      "processor": "16x SHAVE vector cores + Neural Compute Engine hardware",
      "interface": "USB 3.0 Type-A High-Speed",
      "power_consumption": "1.5W - 2.5W",
      "operating_voltage": "5V direct din portul USB",
      "linux_support": "Intel OpenVINO Toolkit pe Linux x86_64 și ARM64",
      "works_with_os": [
        "Ubuntu Linux",
        "Debian",
        "Raspberry Pi OS"
      ]
    },
    "datasheet_url": "https://www.intel.com/content/www/us/en/developer/tools/neural-compute-stick/overview.html",
    "image_url": "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
    "badge": "OpenVINO VPU",
    "tags": [
      "niche",
      "intel",
      "myriad-x",
      "ai-accelerator",
      "openvino",
      "usb-ai"
    ],
    "rating": 4.77,
    "review_count": 6,
    "featured": false
  },
  {
    "slug": "hak5-shark-jack-automated-pentest-tool",
    "name": "Hak5 Shark Jack — Automated Portable Ethernet Pentest Tool",
    "sku": "HAK5-SHARK-JACK",
    "mpn": "HAK5-SJ-V1",
    "category_id": 7,
    "subcategory": "Network Security & Pentest",
    "price_ron": 399.99,
    "old_price_ron": 449.99,
    "stock": 8,
    "stock_status": "in_stock",
    "short_desc": "Unealtă de audit rețea de buzunar: conectezi mufa RJ45, rulează Nmap în 15 secunde și salvează raportul pe stocarea internă.",
    "full_desc": "Hak5 Shark Jack este dedicat auditurilor fizice rapide autorizate de securitate a rețelelor. Dotat cu un sistem Linux independent, baterie internă Li-Po reîncărcabilă și comutator de payload-uri, efectuează scanări stealth de porturi și exfiltrare automată a datelor de telemetrie.",
    "technical_specs": {
      "architecture": "MIPS Embedded Linux",
      "skill_level": "Intermediate",
      "processor": "MediaTek MT7688 SoC",
      "ram": "64MB DDR2",
      "storage": "Stocare Flash integrată pentru scripturi DuckyScript și loguri",
      "interfaces": [
        "Mufă RJ45 Ethernet tată",
        "Port USB-C pentru încărcare și consolă SSH",
        "LED RGB status",
        "Comutator fizic de mod"
      ],
      "battery": "Acumulator Li-Po integrat (15-20 minute autonomie activă)",
      "linux_support": "OpenWrt-based custom OS Hak5",
      "works_with_os": [
        "Firmware nativ Hak5 SharkJack",
        "SSH Linux Client"
      ]
    },
    "datasheet_url": "https://shop.hak5.org/products/shark-jack",
    "image_url": "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80",
    "badge": "Hak5 Rapid Audit",
    "tags": [
      "cybersecurity",
      "hak5",
      "pentest",
      "network-security",
      "nmap",
      "stealth"
    ],
    "rating": 4.92,
    "review_count": 9,
    "featured": true
  },
  {
    "slug": "hak5-plunder-bug-lan-tap-pocket-sniffer",
    "name": "Hak5 Plunder Bug LAN TAP Pocket Sniffer (Captură Pasivă USB-C)",
    "sku": "HAK5-PLUNDER-BUG",
    "mpn": "HAK5-PB-V1",
    "category_id": 7,
    "subcategory": "Network Security & Pentest",
    "price_ron": 349.99,
    "old_price_ron": 399.99,
    "stock": 12,
    "stock_status": "in_stock",
    "short_desc": "TAP hardware de rețea Gigabit ultra-compact: inserezi între două echipamente și capturezi tot traficul în Wireshark prin USB-C.",
    "full_desc": "Hak5 Plunder Bug este visul oricărui analist de securitate și sysadmin. Se introduce inline între orice switch și dispozitiv fără a întrerupe conexiunea Ethernet și emite o copie exactă a tuturor pachetelor către portul USB-C, gata de analiză în Wireshark sau tcpdump.",
    "technical_specs": {
      "architecture": "Hardware Network TAP",
      "skill_level": "Intermediate",
      "ports": "2x Porturi RJ45 Gigabit Ethernet 10/100/1000Base-T (Pass-Through)",
      "capture_interface": "1x Port USB Type-C High-Speed",
      "stealth_mode": "Complet invizibil pe rețea în modul pasiv (fără adresă IP sau MAC expus)",
      "power_consumption": "< 1.5W via USB-C",
      "linux_support": "Apare ca placă de rețea USB standard sub Linux/macOS/Android",
      "works_with_os": [
        "Wireshark",
        "tcpdump",
        "Android Root App Hak5"
      ]
    },
    "datasheet_url": "https://shop.hak5.org/products/plunder-bug",
    "image_url": "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80",
    "badge": "Gigabit TAP",
    "tags": [
      "cybersecurity",
      "hak5",
      "lan-tap",
      "wireshark",
      "packet-capture",
      "network"
    ],
    "rating": 4.94,
    "review_count": 11,
    "featured": false
  },
  {
    "slug": "flipper-zero-wifi-devboard-esp32s2-marauder",
    "name": "Flipper Zero Wi-Fi Devboard (ESP32-S2 Marauder Pre-Configurat)",
    "sku": "FLIPPER-WIFI-DEVBOARD",
    "mpn": "FZ-DEVBOARD-WIFI",
    "category_id": 7,
    "subcategory": "Wireless & RF Security",
    "price_ron": 229.99,
    "old_price_ron": 269.99,
    "stock": 20,
    "stock_status": "in_stock",
    "short_desc": "Modul oficial de extensie Wi-Fi pentru Flipper Zero cu cip ESP32-S2, compatibil Black Magic Debug și firmware Marauder.",
    "full_desc": "Placa de dezvoltare Wi-Fi se montează direct pe headerul GPIO al Flipper Zero, extinzând capabilitățile dispozitivului către rețelele wireless 802.11 b/g/n. Permite scanarea pachetelor beacon, detectarea atacurilor de deautentificare și depanarea wireless via GDB.",
    "technical_specs": {
      "architecture": "ESP32-S2 Wireless",
      "skill_level": "Intermediate",
      "processor": "Espressif ESP32-S2FN4R2 32-bit LX7 @ 240MHz",
      "interfaces": [
        "Header tată GPIO Flipper Zero",
        "Port USB Type-C independent",
        "Puncte de testare SWD"
      ],
      "operating_voltage": "Alimentat din bateria Flipper Zero sau extern via USB-C",
      "firmware_options": [
        "Black Magic Debug Probe",
        "ESP32 Marauder Wi-Fi Pentest"
      ],
      "linux_support": "Flasher esptool nativ pe Linux & macOS",
      "works_with_os": [
        "Flipper Zero OS",
        "Marauder CLI"
      ]
    },
    "datasheet_url": "https://docs.flipper.net/development/hardware/wifi-debugger-module",
    "image_url": "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80",
    "badge": "Flipper Add-on",
    "tags": [
      "cybersecurity",
      "flipper-zero",
      "wifi",
      "marauder",
      "esp32-s2",
      "rf"
    ],
    "rating": 4.96,
    "review_count": 32,
    "featured": true
  },
  {
    "slug": "flipper-zero-video-game-module-rp2040-dvi",
    "name": "Flipper Zero Video Game Module (RP2040 + Ieșire Video DVI + Senzor IMU)",
    "sku": "FLIPPER-VGM-RP2040",
    "mpn": "FZ-VGM-01",
    "category_id": 7,
    "subcategory": "Hardware Research & Modding",
    "price_ron": 299.99,
    "old_price_ron": 349.99,
    "stock": 14,
    "stock_status": "in_stock",
    "short_desc": "Modul RP2040 cu ieșire digitală video DVI către monitor, senzor inerțial IMU cu 6 axe și port USB-C programabil.",
    "full_desc": "Video Game Module transformă Flipper Zero într-o consolă portabilă cu ieșire directă pe monitor sau televizor via mufa DVI/HDMI. Conține un senzor giroscop/accelerometru cu 6 axe TDK și un microcontroler Raspberry Pi RP2040 gata de reprogramare în C/C++.",
    "technical_specs": {
      "architecture": "Raspberry Pi RP2040 Microcontroller",
      "skill_level": "Beginner",
      "processor": "Raspberry Pi RP2040 Dual-Core Cortex-M0+ @ 133MHz",
      "imu_sensor": "TDK InvenSense ICM-42688-P 6-axis Gyroscope & Accelerometer",
      "interfaces": [
        "Port video digital DVI-D / HDMI",
        "Port USB-C",
        "Conector GPIO Flipper Zero"
      ],
      "operating_voltage": "3.3V / 5V via Flipper Zero",
      "power_consumption": "0.8W activ cu ieșire video 720p",
      "linux_support": "Suport complet Raspberry Pi Pico C/C++ SDK",
      "works_with_os": [
        "Flipper Zero OS",
        "Pico SDK Bare-metal"
      ]
    },
    "datasheet_url": "https://docs.flipper.net/video-game-module",
    "image_url": "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80",
    "badge": "HDMI Video Out",
    "tags": [
      "cybersecurity",
      "flipper-zero",
      "rp2040",
      "dvi",
      "imu",
      "gaming"
    ],
    "rating": 4.93,
    "review_count": 14,
    "featured": false
  },
  {
    "slug": "yard-stick-one-sub-1ghz-wireless-transceiver",
    "name": "Yard Stick One Sub-1GHz Wireless Transceiver (Great Scott Gadgets)",
    "sku": "GSG-YARD-STICK-ONE",
    "mpn": "YARDSTICK1-GSG",
    "category_id": 7,
    "subcategory": "Wireless & RF Security",
    "price_ron": 599.99,
    "old_price_ron": 679.99,
    "stock": 6,
    "stock_status": "in_stock",
    "short_desc": "Dongle USB radio Sub-1GHz cu amplificator +20dBm pentru cercetare protocoale ISM (300-348MHz, 391-464MHz, 782-928MHz).",
    "full_desc": "Creat de Michael Ossmann (Great Scott Gadgets), Yard Stick One este proiectat special pentru transmiterea și interceptarea pachetelor radio digitale pe frecvențe sub-gigahertz. Cu firmware RfCat pre-instalat, permite automatizarea auditului sistemelor de alarmă și barierelor în Python.",
    "technical_specs": {
      "architecture": "Texas Instruments CC1111 Wireless SoC",
      "skill_level": "Advanced",
      "frequencies": "Banda 1: 300-348 MHz | Banda 2: 391-464 MHz | Banda 3: 782-928 MHz",
      "tx_power": "Amplificator hardware intern până la +20dBm (100mW)",
      "modulations": "ASK, OOK, 2-FSK, 4-FSK, GFSK, MSK",
      "interfaces": [
        "Conector SMA mamă 50Ω pentru antenă",
        "Port USB Type-A tată"
      ],
      "operating_voltage": "5V direct din USB",
      "linux_support": "Biblioteca RfCat pe Python 3 sub Linux și macOS",
      "works_with_os": [
        "RfCat Python Library",
        "Universal Radio Hacker"
      ]
    },
    "datasheet_url": "https://greatscottgadgets.com/yardstickone/",
    "image_url": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
    "badge": "Great Scott Gadgets",
    "tags": [
      "cybersecurity",
      "rf",
      "sub-1ghz",
      "yardstick",
      "rfcat",
      "wireless-audit"
    ],
    "rating": 4.97,
    "review_count": 7,
    "featured": false
  },
  {
    "slug": "dell-poweredge-r640-1u-2x-xeon-silver-64gb-ecc-refurb",
    "name": "Server Rack 1U Dell PowerEdge R640 Refurbished (2x Xeon Silver 4210, 64GB DDR4 ECC, 8x SFF, iDRAC9)",
    "sku": "DELL-R640-1U-REFURB",
    "mpn": "PE-R640-8SFF-LAB",
    "category_id": 5,
    "subcategory": "Servere Rackmount",
    "price_ron": 4999.99,
    "old_price_ron": 5799.99,
    "stock": 4,
    "stock_status": "in_stock",
    "short_desc": "Server enterprise 1U cu 2x procesoare Intel Xeon Silver 4210 (20 nuclee / 40 fire de execuție), 64GB ECC Reg, 8 sertare 2.5\" și iDRAC9 Enterprise.",
    "full_desc": "Dell PowerEdge R640 este coloana vertebrală a centrelor de date moderne. Formatul său compact 1U oferă o densitate masivă de calcul cu două socket-uri LGA3647, controller RAID PERC H730P cu baterie de cache, management iDRAC9 Enterprise cu HTML5 KVM complet și două surse de alimentare redundante Titanium de 750W.",
    "technical_specs": {
      "architecture": "x86_64 Dual Socket LGA3647",
      "skill_level": "Expert",
      "processor": "2x Intel Xeon Silver 4210 (10C/20T @ 2.2GHz, Turbo 3.2GHz, 13.75MB Cache fiecare) = 20C / 40T",
      "ram": "64GB DDR4-2933 MHz ECC Registered RDIMM (extensibil la 1.5TB în 24 sloturi)",
      "storage_bays": "8x Sertare 2.5\" SFF SAS/SATA/NVMe Hot-Plug (tăvițe incluse)",
      "raid_controller": "Dell PERC H730P 2GB NV Cache (suport RAID 0, 1, 5, 6, 10, 50, 60 sau HBA passthrough)",
      "network": "Placă rNDC Dell Broadcom Quad-Port (2x 10GbE SFP+ + 2x 1GbE RJ45)",
      "remote_management": "iDRAC9 Enterprise cu licență dedicată (KVM virtual HTML5, Remote Media, Power Cap)",
      "power_supplies": "2x 750W Titanium Hot-Plug Redundante 80 PLUS",
      "form_factor": "Rackmount 19\" 1U (Șine ReadyRails originale incluse)",
      "operating_voltage": "100-240V AC Redundant",
      "linux_support": "Certificat Proxmox VE 8.x, VMware ESXi 7/8, TrueNAS SCALE, RHEL/Debian",
      "works_with_os": [
        "Proxmox VE",
        "TrueNAS SCALE",
        "VMware ESXi",
        "Ubuntu Server",
        "Debian"
      ]
    },
    "datasheet_url": "https://i.dell.com/sites/csdocuments/Shared-Content_data-Sheets_Documents/en/poweredge-r640-spec-sheet.pdf",
    "image_url": "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
    "badge": "Enterprise 1U Flagship",
    "tags": [
      "enterprise",
      "server",
      "dell",
      "xeon",
      "proxmox",
      "10gbe",
      "idrac9",
      "rack1u"
    ],
    "rating": 4.99,
    "review_count": 7,
    "featured": true
  },
  {
    "slug": "dell-poweredge-r740-2u-2x-xeon-gold-128gb-ecc-refurb",
    "name": "Server Rack 2U Dell PowerEdge R740 Refurbished (2x Xeon Gold 6138, 128GB DDR4 ECC, 16x SFF)",
    "sku": "DELL-R740-2U-REFURB",
    "mpn": "PE-R740-16SFF-LAB",
    "category_id": 5,
    "subcategory": "Servere Rackmount",
    "price_ron": 7899.99,
    "old_price_ron": 8999.99,
    "stock": 3,
    "stock_status": "in_stock",
    "short_desc": "Monster de virtualizare 2U: 2x Xeon Gold 6138 (40 nuclee / 80 thread-uri), 128GB ECC Reg, 16x lăcașuri 2.5\", surse duble 1100W.",
    "full_desc": "Dell PowerEdge R740 oferă un echilibru impecabil între capacitatea de stocare, numărul de sloturi PCIe pentru acceleratoare grafice sau plăci 25G/100G și o putere brută de 40 nuclee fizice Xeon Gold. Ideal pentru noduri masive Ceph, clustere de calcul Kubernetes și virtualizare VMware/Proxmox.",
    "technical_specs": {
      "architecture": "x86_64 Dual Socket LGA3647",
      "skill_level": "Expert",
      "processor": "2x Intel Xeon Gold 6138 (20C/40T @ 2.0GHz, Turbo 3.7GHz, 27.5MB Cache per CPU) = 40 Cores / 80 Threads",
      "ram": "128GB DDR4-2666 MHz ECC Registered RDIMM (extensibil la 3TB)",
      "storage_bays": "16x Lăcașuri 2.5\" SFF SAS-12G/SATA-6G Hot-Plug",
      "expansion_slots": "8x Sloturi PCIe Gen3 (suport până la 3x GPU-uri dublu-slot de 300W)",
      "network": "Intel X520/I350 rNDC Daughter Card (2x 10GbE SFP+ + 2x 1GbE RJ45)",
      "remote_management": "iDRAC9 Enterprise cu port dedicat gigabit",
      "power_supplies": "2x 1100W Platinum Hot-Plug Redundante",
      "form_factor": "Rackmount 19\" 2U (Șine glisante incluse)",
      "operating_voltage": "100-240V AC Redundant",
      "linux_support": "Proxmox VE, ESXi, TrueNAS SCALE, Ceph, Kubernetes",
      "works_with_os": [
        "Proxmox VE",
        "TrueNAS SCALE",
        "ESXi 8.0",
        "CentOS Stream",
        "Ubuntu Server"
      ]
    },
    "datasheet_url": "https://i.dell.com/sites/csdocuments/Shared-Content_data-Sheets_Documents/en/poweredge-r740-spec-sheet.pdf",
    "image_url": "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
    "badge": "40 Cores / 80 Threads",
    "tags": [
      "enterprise",
      "server",
      "dell",
      "xeon-gold",
      "virtualization",
      "ceph",
      "rack2u"
    ],
    "rating": 5,
    "review_count": 5,
    "featured": true
  },
  {
    "slug": "dell-optiplex-7070-micro-tiny-pc-i5-16gb-nvme",
    "name": "Dell OptiPlex 7070 Micro Tiny PC (Intel Core i5-9500T 6-Core, 16GB RAM, 512GB NVMe - Proxmox Node)",
    "sku": "DELL-OPTIPLEX-7070-MFF",
    "mpn": "OPTIPLEX-7070-MFF-LAB",
    "category_id": 5,
    "subcategory": "Mini PC & Thin Clients",
    "price_ron": 1199.99,
    "old_price_ron": 1399.99,
    "stock": 12,
    "stock_status": "in_stock",
    "short_desc": "Nod de homelab silențios și eficient energetic de doar 1 Litru: 6 nuclee native i5, 16GB DDR4, slot M.2 NVMe și consum mediu de sub 12W.",
    "full_desc": "Dell OptiPlex Micro 7070 este alegerea numărul 1 pentru arhitectura modernă de micro-clustere Proxmox VE „TinyMiniMicro”. Consumul redus la priză combinat cu un procesor hexacore cu 6 fire de execuție la 35W TDP și suport pentru două unități de stocare îl fac un nod de încredere.",
    "technical_specs": {
      "architecture": "x86_64",
      "skill_level": "Beginner",
      "processor": "Intel Core i5-9500T 6 Cores / 6 Threads @ 2.2GHz (Turbo 3.7GHz, 9MB Cache, 35W TDP)",
      "ram": "16GB DDR4-2666 MHz SODIMM (extensibil la 64GB în 2 sloturi)",
      "storage": "512GB M.2 PCIe 3.0 x4 NVMe SSD + Conector intern SATA 2.5\" liber",
      "interfaces": [
        "Intel I219-LM Gigabit Ethernet",
        "2x DisplayPort 1.2 4K60",
        "1x USB 3.1 Gen2 Type-C",
        "5x USB 3.1 Type-A"
      ],
      "operating_voltage": "19.5V DC (Alimentator Dell 65W original inclus)",
      "power_consumption": "8W idle, 32W sarcină maximă completă",
      "dimensions": "182 x 178 x 36 mm (Volum 1 Litru)",
      "linux_support": "100% suport Linux fără drivere externe",
      "works_with_os": [
        "Proxmox VE",
        "Debian",
        "Ubuntu Server",
        "TrueNAS SCALE",
        "ESXi"
      ]
    },
    "datasheet_url": "https://i.dell.com/sites/csdocuments/Shared-Content_data-Sheets_Documents/en/optiplex-7070-spec-sheet.pdf",
    "image_url": "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80",
    "badge": "Proxmox Tiny Node",
    "tags": [
      "enterprise",
      "mini-pc",
      "dell",
      "proxmox",
      "homelab",
      "low-power",
      "tinyminimicro"
    ],
    "rating": 4.93,
    "review_count": 15,
    "featured": true
  },
  {
    "slug": "nvidia-tesla-t4-16gb-gddr6-pcie-passive-gpu-refurb",
    "name": "NVIDIA Tesla T4 16GB GDDR6 PCIe 3.0 x16 Passive GPU (AI Inference & vGPU Lab - Refurbished)",
    "sku": "NVIDIA-TESLA-T4-16GB",
    "mpn": "TESLA-T4-16G-LAB",
    "category_id": 5,
    "subcategory": "Acceleratoare Grafice & AI",
    "price_ron": 3499.99,
    "old_price_ron": 3999.99,
    "stock": 5,
    "stock_status": "in_stock",
    "short_desc": "Accelerator AI enterprise de 70W: 2560 nuclee CUDA, 320 nuclee Tensor, 16GB GDDR6 ECC VRAM fără conector separat de alimentare PCIe.",
    "full_desc": "NVIDIA Tesla T4 este placa grafică favorită a utilizatorilor de servere 1U/2U și Proxmox vGPU. Datorită consumului de doar 70W alimentat exclusiv din slotul PCIe x16, nu necesită cabluri de alimentare suplimentare, oferind 16GB de memorie video ECC pentru rularea modelelor de limbaj (Ollama, vLLM) și transcodare video 4K.",
    "technical_specs": {
      "architecture": "NVIDIA Turing GPU (TU104)",
      "skill_level": "Expert",
      "cuda_cores": "2560 nuclee CUDA + 320 Tensor Cores (Turing)",
      "vram": "16GB GDDR6 cu corecție a erorilor ECC pe magistrală de 256-bit (320 GB/s lățime de bandă)",
      "interface": "PCIe 3.0 x16 profil redus / profil complet",
      "cooling": "Răcire pasivă pentru servere cu flux de aer forțat (opțional kit ventilator 50mm pentru carcase desktop)",
      "power_consumption": "70W TDP (alimentare 100% din slotul PCIe)",
      "vgpu_support": "Suport oficial NVIDIA GRID vGPU (partiționare VRAM între VM-uri)",
      "linux_support": "NVIDIA Enterprise Linux Drivers & CUDA Toolkit",
      "works_with_os": [
        "Proxmox VE (vGPU unlock / passthrough)",
        "Ubuntu Server",
        "Debian"
      ]
    },
    "datasheet_url": "https://www.nvidia.com/en-us/data-center/tesla-t4/",
    "image_url": "https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=800&q=80",
    "badge": "70W AI vGPU",
    "tags": [
      "enterprise",
      "nvidia",
      "tesla-t4",
      "ai-inference",
      "ollama",
      "vgpu",
      "cuda"
    ],
    "rating": 4.97,
    "review_count": 8,
    "featured": true
  },
  {
    "slug": "seagate-exos-x18-16tb-enterprise-sata-hdd",
    "name": "Seagate Exos X18 16TB Enterprise SATA 3.5\" HDD 7200RPM 256MB Cache (ST16000NM000J)",
    "sku": "SEAGATE-EXOS-X18-16TB",
    "mpn": "ST16000NM000J",
    "category_id": 2,
    "subcategory": "Storage & HDD Homelab",
    "price_ron": 1199.99,
    "old_price_ron": 1349.99,
    "stock": 16,
    "stock_status": "in_stock",
    "short_desc": "Hard disk enterprise cu heliu sigilat de 16TB formatat: 7200 RPM, 256MB cache, 2.5 milioane ore MTBF și anduranță 550TB/an.",
    "full_desc": "Seagate Exos X18 este etalonul fiabilității pentru stocarea ZFS în servere TrueNAS și Unraid. Tehnologia Helium reduce fricțiunea internă și consumul de energie, permițând viteze de transfer susținute de peste 260 MB/s în mod silențios.",
    "technical_specs": {
      "capacity": "16TB (16.000 GB)",
      "form_factor": "3.5\" HDD standard",
      "interface": "SATA 6 Gb/s",
      "spindle_speed": "7200 RPM",
      "cache": "256MB Multisegmented DRAM Cache",
      "technology": "CMR (Conventional Magnetic Recording) + Heliu sigilat ermetic",
      "workload_rating": "550 TB/an (5x mai mare decât hard disk-urile desktop)",
      "mtbf": "2.500.000 ore",
      "power_consumption": "5.3W idle, 8.8W operare susținută",
      "linux_support": "Nativ sub ZFS, mdadm, Btrfs, ext4",
      "works_with_os": [
        "TrueNAS SCALE",
        "Unraid",
        "Proxmox VE",
        "Linux"
      ]
    },
    "datasheet_url": "https://www.seagate.com/files/www-content/datasheets/pdfs/exos-x18-channel-DS2049-2-2007US-en_US.pdf",
    "image_url": "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=800&q=80",
    "badge": "16TB Helium CMR",
    "tags": [
      "homelab",
      "storage",
      "hdd",
      "zfs",
      "truenas",
      "16tb",
      "seagate"
    ],
    "rating": 4.95,
    "review_count": 21,
    "featured": true
  },
  {
    "slug": "wd-red-plus-8tb-nas-hdd-cmr-5640rpm",
    "name": "Western Digital Red Plus 8TB NAS HDD 3.5\" CMR 5640RPM 256MB Cache (WD80EFPX)",
    "sku": "WD-RED-PLUS-8TB-CMR",
    "mpn": "WD80EFPX",
    "category_id": 2,
    "subcategory": "Storage & HDD Homelab",
    "price_ron": 849.99,
    "old_price_ron": 949.99,
    "stock": 14,
    "stock_status": "in_stock",
    "short_desc": "Hard disk silențios dedicat NAS de 8TB cu tehnologie garantată CMR: 5640 RPM, compatibil 24/7 cu până la 8 sertare.",
    "full_desc": "Western Digital Red Plus este alegerea clasică a utilizatorilor de homelab care își țin serverul de stocare în birou sau sufragerie. Turația de 5640 RPM oferă un nivel de zgomot extrem de redus, fără a sacrifica performanța necesară pentru matrici RAID-Z2.",
    "technical_specs": {
      "capacity": "8TB (8.000 GB)",
      "form_factor": "3.5\" HDD",
      "interface": "SATA 6 Gb/s",
      "recording_technology": "CMR (Conventional Magnetic Recording - 100% sigur pentru ZFS resilvering)",
      "spindle_speed": "5640 RPM (funcționare ultra-silențioasă)",
      "cache": "256MB",
      "power_consumption": "3.4W idle, 5.2W operare",
      "linux_support": "Compatibil cu toate distribuțiile NAS Linux și FreeBSD",
      "works_with_os": [
        "TrueNAS",
        "Synology DSM",
        "QNAP QTS",
        "Proxmox VE"
      ]
    },
    "datasheet_url": "https://www.westerndigital.com/products/internal-drives/wd-red-plus-sata-3-5-hdd",
    "image_url": "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=800&q=80",
    "badge": "Silențios CMR",
    "tags": [
      "homelab",
      "storage",
      "hdd",
      "nas",
      "wd-red",
      "cmr",
      "truenas"
    ],
    "rating": 4.88,
    "review_count": 17,
    "featured": false
  },
  {
    "slug": "crucial-32gb-2x16gb-ddr4-3200-sodimm-kit",
    "name": "Crucial 32GB (2x16GB) DDR4 3200MHz CL22 SODIMM Kit (Upgrade RAM Homelab)",
    "sku": "CRUCIAL-DDR4-32GB-KIT",
    "mpn": "CT2K16G4SFRA32A",
    "category_id": 2,
    "subcategory": "Memorie RAM Homelab",
    "price_ron": 299.99,
    "old_price_ron": 349.99,
    "stock": 26,
    "stock_status": "in_stock",
    "short_desc": "Kit dual channel de 32GB (2x 16GB) DDR4 SODIMM la 1.2V pentru Minisforum MS-01, noduri Intel N100 și Dell OptiPlex Micro.",
    "full_desc": "Memoria RAM este resursa numărul 1 epuizată în orice homelab Proxmox. Acest kit de 32GB Crucial garantează stabilitate de 100% la tensiunea standard de 1.2V JEDEC, fără a necesita configurări XMP/DOCP în BIOS.",
    "technical_specs": {
      "capacity": "32GB Kit (2x module de 16GB)",
      "type": "DDR4-3200 PC4-25600 260-Pin Non-ECC SODIMM",
      "timings": "CL22 (22-22-22)",
      "voltage": "1.2V Standard JEDEC",
      "compatibility": "Minisforum MS-01, Mini PC N100, Dell Micro, Lenovo Tiny, HP Mini, QNAP/Synology SODIMM",
      "linux_support": "Recunoscut nativ la frecvența completă 3200MHz fără profil XMP"
    },
    "datasheet_url": "https://www.crucial.com/memory/ddr4/ct2k16g4sfra32a",
    "image_url": "https://images.unsplash.com/photo-1562975871-2244243a3d56?auto=format&fit=crop&w=800&q=80",
    "badge": "Homelab RAM Staple",
    "tags": [
      "homelab",
      "ram",
      "sodimm",
      "ddr4",
      "upgrade",
      "proxmox"
    ],
    "rating": 4.96,
    "review_count": 28,
    "featured": false
  },
  {
    "slug": "patch-panel-19-inch-1u-24-porturi-keystone-ecranat",
    "name": "Panou Patch Panel 19\" 1U 24 Porturi Ecranate Cat6A Keystone cu Suport Cablu",
    "sku": "PATCH-PANEL-19-1U-24P",
    "mpn": "PP-19-1U-24K-STP",
    "category_id": 2,
    "subcategory": "Accesorii Rack 19\"",
    "price_ron": 149.99,
    "old_price_ron": 179.99,
    "stock": 20,
    "stock_status": "in_stock",
    "short_desc": "Panou patch metalic SPCC 1U pentru rack de 19\" cu 24 de porturi modulare Keystone și bară posterioară de degrevare mecanică.",
    "full_desc": "Esențial pentru un rack de homelab curat și profesional. Rama metalică ecranată acceptă orice conector modular standard Keystone: RJ45 Cat6/Cat6A, cuple LC fibră optică duplex, HDMI sau USB-C passthrough.",
    "technical_specs": {
      "form_factor": "Rack 19\" standard, înălțime 1U",
      "ports": "24 porturi modulare standard Keystone",
      "material": "Oțel SPCC laminat la rece de 1.5mm, vopsit electrostatic negru mat",
      "features": "Bară posterioară de susținere și prindere cu bride a cablurilor + fir de împământare inclus",
      "compatibility": "Module Keystone UTP / FTP / STP, LC Fibră, HDMI"
    },
    "image_url": "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80",
    "badge": "Rack 19\" 1U",
    "tags": [
      "homelab",
      "rack",
      "patch-panel",
      "keystone",
      "networking",
      "cable-management"
    ],
    "rating": 4.92,
    "review_count": 14,
    "featured": false
  },
  {
    "slug": "pdu-rackmount-19-inch-1u-8-prize-schuko-protectie",
    "name": "Unitate PDU Rackmount 19\" 1U cu 8 Prize Schuko, Întrerupător și Protecție Supratensiune",
    "sku": "PDU-19-1U-8-SCHUKO",
    "mpn": "PDU-19-1U-8SK-SW",
    "category_id": 2,
    "subcategory": "Alimentare & PDU Rack",
    "price_ron": 129.99,
    "old_price_ron": 159.99,
    "stock": 22,
    "stock_status": "in_stock",
    "short_desc": "Bloc de distribuție a alimentării (PDU) 1U din profil de aluminiu robust cu 8 prize Schuko la 45°, sarcină 16A / 3680W.",
    "full_desc": "Unitatea PDU Rack 19\" 1U oferă distribuție sigură și fiabilă a energiei electrice pentru echipamentele din dulapul de homelab. Carcasa din aluminiu rigid rezistă la torsiune, iar prizele orientate la 45° permit conectarea alimentatoarelor masive fără a bloca prizele adiacente.",
    "technical_specs": {
      "form_factor": "Montare în rack de 19\", înălțime 1U (urechi de montaj incluse)",
      "outlets": "8x Prize Schuko CEE 7/4 orientate ergonomic la 45°",
      "rating": "16A / 250V AC (Putere maximă admisă: 3680 Watt)",
      "protection": "Modul de protecție la supratensiune integrat (SPD) + Întrerupător basculant cu capac de protecție transparent",
      "cable": "Cablu flexibil H05VV-F 3G1.5mm² lungime 2.0 metri cu ștecher Schuko turnat"
    },
    "image_url": "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80",
    "badge": "16A Heavy Duty",
    "tags": [
      "homelab",
      "pdu",
      "rack",
      "alimentare",
      "schuko",
      "protectie-supratensiune"
    ],
    "rating": 4.95,
    "review_count": 19,
    "featured": false
  },
  {
    "slug": "shelly-plus-1pm-smart-relay-power-metering",
    "name": "Shelly Plus 1PM — Releu Inteligent Wi-Fi & Bluetooth cu Măsurare Consum Energie",
    "sku": "SHELLY-PLUS-1PM",
    "mpn": "SNSW-001P16EU",
    "category_id": 3,
    "subcategory": "Relee Inteligente & Smart Home",
    "price_ron": 79.99,
    "old_price_ron": 94.99,
    "stock": 35,
    "stock_status": "in_stock",
    "short_desc": "Releu inteligent de 16A cu procesor ESP32 intern, măsurare exactă a puterii active (W/kWh), protecție la supratemperatură și integrare MQTT.",
    "full_desc": "Shelly Plus 1PM este releul favorit al comunității Home Assistant. Se instalează discret în doza de aparat sau tabloul electric, raportând în timp real consumul energetic în wați al serverelor, aerului condiționat sau electrocasnicelor, cu suport local REST API și MQTT fără a depinde de cloud.",
    "technical_specs": {
      "processor": "Espressif ESP32 160MHz intern",
      "connectivity": "Wi-Fi 802.11 b/g/n + Bluetooth 4.2 pentru împerechere rapidă",
      "capacity": "Până la 16A / 3840W sarcină rezistivă",
      "power_metering": "Măsurare consum instantaneu în Wați și energie acumulată în kWh",
      "safety": "Protecție automată hardware la supratemperatură și supratensiune",
      "operating_voltage": "110-240V AC sau 24-30V DC",
      "linux_support": "Home Assistant Native Integration (Zero-Conf local), MQTT, ESPHome/Tasmota flashable"
    },
    "datasheet_url": "https://www.shelly.com/en/products/shop/shelly-plus-1-pm",
    "image_url": "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
    "badge": "Home Assistant Native",
    "tags": [
      "iot",
      "shelly",
      "power-monitoring",
      "home-assistant",
      "mqtt",
      "esp32"
    ],
    "rating": 4.96,
    "review_count": 42,
    "featured": true
  },
  {
    "slug": "hilink-hlk-ld2410c-24ghz-mmwave-presence-radar",
    "name": "Hi-Link HLK-LD2410C 24GHz mmWave Human Presence Radar Sensor (Bluetooth & UART)",
    "sku": "HILINK-LD2410C-RADAR",
    "mpn": "HLK-LD2410C-BT",
    "category_id": 3,
    "subcategory": "Senzori Prezență & Mișcare",
    "price_ron": 39.99,
    "old_price_ron": 49.99,
    "stock": 40,
    "stock_status": "in_stock",
    "short_desc": "Senzor radar milimetric 24GHz FMCW: detectează prezența umană statică (respirație la birou sau somn) până la 6 metri distanță.",
    "full_desc": "Adio stingere a luminilor în timp ce lucrezi nemișcat la birou! Spre deosebire de senzorii PIR clasici care necesită mișcare fizică mare, radarul mmWave HLK-LD2410C măsoară micro-mișcările cutiei toracice, trimițând starea instantaneu prin UART sau pin digital OUT către ESPHome.",
    "technical_specs": {
      "technology": "24GHz FMCW Radar milimetric cu antenă integrată pe PCB",
      "detection_range": "Până la 6 metri distanță, unghi de acoperire 60°",
      "interfaces": [
        "UART Serial (115200 bps)",
        "Pin OUT nivel logic 3.3V",
        "Bluetooth Low Energy pentru calibrare mobilă"
      ],
      "operating_voltage": "5V DC (consum mediu ~79mA)",
      "features": "Porți de distanță configurabile independent (sensibilitate separată pentru mișcare și prezență statică)",
      "linux_support": "Componentă oficială nativă în ESPHome (ld2410)"
    },
    "datasheet_url": "https://www.hlktech.net/index.php?id=1095",
    "image_url": "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    "badge": "Micro-Motion Radar",
    "tags": [
      "iot",
      "radar",
      "mmwave",
      "presence",
      "esphome",
      "home-assistant",
      "sensors"
    ],
    "rating": 4.92,
    "review_count": 27,
    "featured": false
  },
  {
    "slug": "apple-macbook-air-13-m1-asahi-linux",
    "name": "Apple MacBook Air 13\" M1 (16GB RAM, 512GB SSD) [Asahi Linux Gold Tier - Fedora Remix]",
    "sku": "APPLE-MBA-M1-16G-ASAHI",
    "mpn": "MGN63LL/A-ASAHI",
    "category_id": 6,
    "subcategory": "Apple Hardware Linux",
    "price_ron": 3499.99,
    "old_price_ron": 3999.99,
    "stock": 6,
    "stock_status": "in_stock",
    "short_desc": "Laptop ultraportabil fanless cu procesor Apple Silicon M1, 16GB memorie unificată și suport Gold Tier în Fedora Asahi Linux Remix.",
    "full_desc": "MacBook Air M1 reprezintă standardul de aur pentru Asahi Linux. Datorită răcirii pasive complet silențioase, eficienței energetice extraordinare și maturității driverelor dezvoltate de echipa Asahi Linux, rulează nativ kernelul Linux 6.x cu accelerare grafică completă OpenGL 4.6 și Vulkan 1.3, Wi-Fi, Bluetooth, tastatură, touchpad multitouch și autonomie de până la 16 ore.",
    "technical_specs": {
      "architecture": "ARM64 (Apple Silicon M1)",
      "skill_level": "Intermediate",
      "processor": "Apple M1 (4x Firestorm @ 3.2GHz + 4x Icestorm @ 2.06GHz) + 7/8-core Apple GPU",
      "ram": "16GB Unified Memory LPDDR4X-4266 (Lățime de bandă 68 GB/s)",
      "storage": "512GB Apple NVMe Flash (Driver NVMe Apple ANS2 nativ în Linux)",
      "display": "13.3\" Retina Display (2560 x 1600), 400 nits, DCI-P3",
      "battery": "Baterie 49.9Wh (Până la 16 ore de autonomie sub Fedora Asahi Linux)",
      "ports": "2x Thunderbolt 3 / USB4 Type-C (suport DisplayPort extern și încărcare USB-PD), Jack 3.5mm",
      "audio": "Difuzoare stereo cu suport DSP activ în PipeWire pentru protecție acustică",
      "linux_support": "Fedora Asahi Linux Remix (Gold Tier - Nativ U-Boot / m1n1)",
      "works_with_os": [
        "Fedora Asahi Remix",
        "Arch Linux ARM Asahi",
        "Debian ARM64",
        "macOS Dual-Boot"
      ],
      "documentation_links": {
        "datasheet": "https://asahilinux.org/about/",
        "github": "https://github.com/AsahiLinux"
      }
    },
    "pinout_info": null,
    "datasheet_url": "https://asahilinux.org/fedora/",
    "image_url": "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=800&q=80",
    "badge": "Asahi Gold Tier",
    "tags": [
      "niche",
      "apple-silicon",
      "m1",
      "asahi-linux",
      "macbook-air",
      "arm64",
      "fedora-asahi"
    ],
    "rating": 4.98,
    "review_count": 14,
    "featured": true,
    "compatible_with": [
      "sursa-raspberry-pi-27w-usb-c"
    ]
  },
  {
    "slug": "apple-macbook-pro-13-m1-asahi-linux",
    "name": "Apple MacBook Pro 13\" M1 (16GB RAM, 512GB SSD) [Asahi Linux Gold Tier - Ventilator Activ]",
    "sku": "APPLE-MBP13-M1-16G-ASAHI",
    "mpn": "MYD82LL/A-ASAHI",
    "category_id": 6,
    "subcategory": "Apple Hardware Linux",
    "price_ron": 3899.99,
    "old_price_ron": 4499.99,
    "stock": 5,
    "stock_status": "in_stock",
    "short_desc": "Laptop Apple Silicon M1 cu răcire activă prin ventilator, 16GB RAM unificată, Touch Bar suportat în Linux și anduranță susținută.",
    "full_desc": "MacBook Pro 13\" M1 oferă avantajul unui ventilator activ pentru sarcini de compilare îndelungate fără thermal throttling (Rust, Linux Kernel, C++). Asahi Linux include driver dedicat pentru Touch Bar (afișează tastele funcționale F1-F12 sau statistici de sistem) și suport complet pentru senzorii termici Apple SMC.",
    "technical_specs": {
      "architecture": "ARM64 (Apple Silicon M1)",
      "skill_level": "Intermediate",
      "processor": "Apple M1 (4x Firestorm @ 3.2GHz + 4x Icestorm) + 8-core Apple GPU",
      "ram": "16GB Unified Memory LPDDR4X-4266",
      "storage": "512GB Apple NVMe Flash",
      "cooling": "Ventilator activ intern (permite 100% CPU load susținut indefinit)",
      "touch_bar": "Suportat în Linux via tiny-dfr (afișează taste F-keys dinamice)",
      "ports": "2x Thunderbolt 3 / USB4, Jack audio 3.5mm",
      "battery": "Baterie 58.2Wh (Până la 18 ore de autonomie)",
      "linux_support": "Fedora Asahi Remix Gold Tier",
      "works_with_os": [
        "Fedora Asahi Remix",
        "Arch Linux ARM",
        "macOS Dual-Boot"
      ],
      "documentation_links": {
        "datasheet": "https://asahilinux.org/about/",
        "github": "https://github.com/AsahiLinux/tiny-dfr"
      }
    },
    "pinout_info": null,
    "datasheet_url": "https://asahilinux.org/fedora/",
    "image_url": "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
    "badge": "Răcire Activă M1",
    "tags": [
      "niche",
      "apple-silicon",
      "m1",
      "macbook-pro",
      "asahi-linux",
      "touchbar",
      "arm64"
    ],
    "rating": 4.96,
    "review_count": 11,
    "featured": false,
    "compatible_with": []
  },
  {
    "slug": "apple-macbook-air-13-m2-asahi-linux",
    "name": "Apple MacBook Air 13.6\" M2 (16GB RAM, 512GB SSD) [Asahi Linux Certified - MagSafe 3]",
    "sku": "APPLE-MBA-M2-16G-ASAHI",
    "mpn": "MLY33LL/A-ASAHI",
    "category_id": 6,
    "subcategory": "Apple Hardware Linux",
    "price_ron": 4799.99,
    "old_price_ron": 5499.99,
    "stock": 7,
    "stock_status": "in_stock",
    "short_desc": "Design modern cu MagSafe 3, procesor M2 (Avalanche/Blizzard), ecran Liquid Retina 13.6\" și suport complet Fedora Asahi Linux.",
    "full_desc": "MacBook Air M2 aduce un salt de 18% în performanța procesorului cu nucleele Avalanche/Blizzard și un GPU cu 10 nuclee suportat prin driverul Honeykrisp Vulkan 1.3. Portul de încărcare magnetic MagSafe 3 eliberează ambele porturi USB4/Thunderbolt pentru periferice de laborator și monitoare externe.",
    "technical_specs": {
      "architecture": "ARM64 (Apple Silicon M2)",
      "skill_level": "Intermediate",
      "processor": "Apple M2 (4x Avalanche @ 3.49GHz + 4x Blizzard @ 2.42GHz) + 10-core GPU",
      "ram": "16GB Unified Memory LPDDR5-6400 (Lățime de bandă 100 GB/s)",
      "storage": "512GB Apple NVMe Flash",
      "display": "13.6\" Liquid Retina (2560 x 1664), 500 nits, True Tone",
      "charging": "Port dedicat MagSafe 3 (LED de stare suportat în Linux)",
      "ports": "2x Thunderbolt / USB4, Port MagSafe 3, Jack 3.5mm",
      "battery": "Baterie 52.6Wh (Până la 17 ore autonomie)",
      "linux_support": "Fedora Asahi Linux Remix (Kernel 6.x cu driver GPU Honeykrisp)",
      "works_with_os": [
        "Fedora Asahi Remix",
        "Ubuntu Asahi",
        "macOS Dual-Boot"
      ],
      "documentation_links": {
        "datasheet": "https://asahilinux.org/fedora/",
        "github": "https://github.com/AsahiLinux"
      }
    },
    "pinout_info": null,
    "datasheet_url": "https://asahilinux.org/fedora/",
    "image_url": "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=800&q=80",
    "badge": "M2 MagSafe 3",
    "tags": [
      "niche",
      "apple-silicon",
      "m2",
      "macbook-air",
      "asahi-linux",
      "magsafe",
      "arm64"
    ],
    "rating": 4.97,
    "review_count": 16,
    "featured": true,
    "compatible_with": []
  },
  {
    "slug": "apple-macbook-pro-14-m2-pro-asahi-linux",
    "name": "Apple MacBook Pro 14\" M2 Pro (16GB RAM, 512GB SSD) [Asahi Linux Edge - 120Hz ProMotion & HDMI]",
    "sku": "APPLE-MBP14-M2PRO-ASAHI",
    "mpn": "MPHE3LL/A-ASAHI",
    "category_id": 6,
    "subcategory": "Apple Hardware Linux",
    "price_ron": 6999.99,
    "old_price_ron": 7899.99,
    "stock": 4,
    "stock_status": "in_stock",
    "short_desc": "Stație de lucru portabilă M2 Pro cu 10 nuclee CPU, 16 nuclee GPU, ecran Liquid Retina XDR Mini-LED 120Hz ProMotion și HDMI nativ.",
    "full_desc": "MacBook Pro 14\" M2 Pro este cel mai performant laptop ARM64 pentru dezvoltatorii de Linux. Cu 10 nuclee CPU pe lățime de bandă a memoriei de 200 GB/s, ecran Mini-LED cu rată de reîmprospătare dinamică 120Hz ProMotion suportat impecabil în Wayland, 3 porturi Thunderbolt 4, slot card SDXC și ieșire HDMI 2.1.",
    "technical_specs": {
      "architecture": "ARM64 (Apple Silicon M2 Pro)",
      "skill_level": "Advanced",
      "processor": "Apple M2 Pro (6x nuclee performanță Avalanche + 4x nuclee eficiență Blizzard) + 16-core GPU",
      "ram": "16GB Unified Memory LPDDR5-6400 (Lățime de bandă 200 GB/s)",
      "storage": "512GB Apple NVMe Flash de mare viteză",
      "display": "14.2\" Liquid Retina XDR Mini-LED (3024 x 1964), 120Hz ProMotion, 1000 nits susținut XDR",
      "ports": "3x Thunderbolt 4 (USB-C), 1x HDMI 2.1, 1x Slot card SDXC, 1x MagSafe 3, Jack 3.5mm",
      "cooling": "Sistem dublu de ventilatoare cu cameră de vapori",
      "battery": "Baterie 70Wh (Încărcare rapidă 96W USB-PD / MagSafe)",
      "linux_support": "Fedora Asahi Linux Remix (suport ProMotion 120Hz sub Wayland, Vulkan 1.3)",
      "works_with_os": [
        "Fedora Asahi Remix",
        "Arch ARM",
        "macOS Dual-Boot"
      ],
      "documentation_links": {
        "datasheet": "https://asahilinux.org/fedora/",
        "github": "https://github.com/AsahiLinux"
      }
    },
    "pinout_info": null,
    "datasheet_url": "https://asahilinux.org/fedora/",
    "image_url": "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
    "badge": "120Hz ProMotion Mini-LED",
    "tags": [
      "niche",
      "apple-silicon",
      "m2-pro",
      "macbook-pro",
      "asahi-linux",
      "120hz",
      "vulkan",
      "arm64"
    ],
    "rating": 5,
    "review_count": 9,
    "featured": true,
    "compatible_with": []
  },
  {
    "slug": "lenovo-thinkpad-x230-coreboot-me-cleaner",
    "name": "Lenovo ThinkPad X230 (Intel Core i5-3320M, 16GB RAM, 512GB SSD) [Pre-Flashed Coreboot + SeaBIOS / me_cleaner]",
    "sku": "THINKPAD-X230-COREBOOT",
    "mpn": "2325-X230-COREBOOT",
    "category_id": 6,
    "subcategory": "Laptopturi Coreboot & Open Firmware",
    "price_ron": 1349.99,
    "old_price_ron": 1549.99,
    "stock": 5,
    "stock_status": "in_stock",
    "short_desc": "Legendarul ThinkPad X230 cu Coreboot + SeaBIOS pre-instalat pe cipurile SPI fizice, Intel ME neutralizat complet și ecran IPS.",
    "full_desc": "ThinkPad X230 este simbolul securității hardware open-source. BIOS-ul proprietar Lenovo a fost înlocuit complet prin scriere hardware cu Coreboot open-source și payload SeaBIOS, eliminând orice whitelist Wi-Fi și deblocând viteza memoriei RAM la 1600/1866MHz. Modulul Intel Management Engine (ME) a fost neutralizat cu me_cleaner (peste 95% din firmware-ul ME eliminat), prevenind orice backdoor la nivel de procesor.",
    "technical_specs": {
      "architecture": "x86_64",
      "skill_level": "Intermediate",
      "processor": "Intel Core i5-3320M Dual-Core / 4 Threads @ 2.60GHz (Turbo 3.30GHz, 3MB Cache)",
      "ram": "16GB (2x8GB) DDR3L-1600MHz Dual Channel",
      "storage": "512GB SATA 2.5\" SSD de mare viteză + slot liber mSATA intern",
      "display": "12.5\" HD (1366 x 768) Premium IPS Unghiuri Largi de Vizualizare",
      "firmware": "Coreboot 4.22 + SeaBIOS Payload (Cipuri Winbond W25Q64 + W25Q32 rescrise)",
      "intel_me_status": "Neutralizat complet via me_cleaner (ROM sterilizat, fără acces rețea/ring -3)",
      "battery": "Baterie extinsă 6-celule 62Wh în stare excelentă",
      "interfaces": [
        "2x USB 3.0",
        "1x USB 2.0 Always-On",
        "Mini DisplayPort",
        "VGA",
        "Gigabit Ethernet Intel 82579LM",
        "Slot ExpressCard 54mm",
        "Cititor carduri SD"
      ],
      "linux_support": "Compatibilitate 100% nativă fără drivere binare în Linux/BSD/Qubes OS",
      "works_with_os": [
        "Qubes OS",
        "Debian",
        "Arch Linux",
        "Tails OS",
        "Void Linux",
        "OpenBSD"
      ],
      "documentation_links": {
        "datasheet": "https://coreboot.org/status/board/lenovo/x230/",
        "github": "https://github.com/corna/me_cleaner"
      }
    },
    "pinout_info": null,
    "datasheet_url": "https://coreboot.org/status/board/lenovo/x230/",
    "image_url": "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=800&q=80",
    "badge": "Coreboot Pre-Flashed",
    "tags": [
      "niche",
      "thinkpad",
      "x230",
      "coreboot",
      "libreboot",
      "me-cleaner",
      "qubes-os",
      "privacy"
    ],
    "rating": 4.99,
    "review_count": 18,
    "featured": true,
    "compatible_with": [
      "kit-profesional-flashing-coreboot-pomona-5250",
      "programator-eeprom-ch341a-v17-pro"
    ]
  },
  {
    "slug": "lenovo-thinkpad-t440p-coreboot-modular-quad-i7",
    "name": "Lenovo ThinkPad T440p Modular (Intel Core i7-4700MQ Quad-Core, 16GB RAM, 1080p IPS) [Coreboot Ready / Heads Tested]",
    "sku": "THINKPAD-T440P-COREBOOT",
    "mpn": "20AN-T440P-MOD",
    "category_id": 6,
    "subcategory": "Laptopturi Coreboot & Open Firmware",
    "price_ron": 1699.99,
    "old_price_ron": 1949.99,
    "stock": 4,
    "stock_status": "in_stock",
    "short_desc": "Cel mai modular laptop ThinkPad: procesor socketat i7 Quad-Core 8-thread, ecran 1080p IPS nou, trackpad T450 cu butoane fizice și Coreboot.",
    "full_desc": "ThinkPad T440p este regele modularității: socket PGA946 cu procesor quad-core i7-4700MQ înlocuibil, suport pentru 3 unități de stocare simultane (2.5\" SATA + M.2 2242 + UltraBay caddy) și acces instant la cele două cipuri SPI Flash (4MB + 8MB) direct sub capacul inferior cu 2 șuruburi. Vine cu trackpad-ul cu butoane fizice de T450 instalat și este complet validat pentru Coreboot și Heads tamper-evident firmware.",
    "technical_specs": {
      "architecture": "x86_64 Socket PGA946",
      "skill_level": "Intermediate",
      "processor": "Intel Core i7-4700MQ Quad-Core / 8 Threads @ 2.40GHz (Turbo 3.40GHz, 6MB Cache)",
      "ram": "16GB (2x8GB) DDR3L-1600 Dual Channel",
      "storage": "512GB SSD SATA III 2.5\" + suport suplimentar M.2 2242 SATA",
      "display": "14.0\" Full HD (1920 x 1080) IPS Mat Anti-Glare (Upgrade panou N140HCE-EN1)",
      "trackpad_mod": "Instalat Trackpad original T450 cu 3 butoane fizice pentru TrackPoint",
      "firmware_status": "Gata pregătit pentru Coreboot / Tianocore UEFI / Heads Payload (cipuri 12MB accesibile)",
      "intel_me_status": "me_cleaner compatibil (poate fi neutralizat în 5 minute)",
      "interfaces": [
        "2x USB 3.0",
        "2x USB 2.0",
        "Mini DisplayPort",
        "VGA",
        "Gigabit Ethernet",
        "Slot UltraBay DVD/HDD",
        "Slot SDXC"
      ],
      "linux_support": "Certificat Linux 6.x, zero thermal throttling pe profil TLP",
      "works_with_os": [
        "Coreboot + Heads",
        "Qubes OS",
        "Arch Linux",
        "Fedora",
        "Debian"
      ]
    },
    "pinout_info": null,
    "datasheet_url": "https://coreboot.org/status/board/lenovo/t440p/",
    "image_url": "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
    "badge": "Quad-Core i7 Modular",
    "tags": [
      "niche",
      "thinkpad",
      "t440p",
      "coreboot",
      "heads",
      "modular",
      "i7-quad",
      "linux"
    ],
    "rating": 4.97,
    "review_count": 14,
    "featured": true,
    "compatible_with": [
      "kit-profesional-flashing-coreboot-pomona-5250"
    ]
  },
  {
    "slug": "lenovo-thinkpad-x200-libreboot-ryf-certified",
    "name": "Lenovo ThinkPad X200 (Core 2 Duo P8600, 8GB RAM, SSD 256GB) [100% Libreboot Pre-Installed, FSF RYF Certified]",
    "sku": "THINKPAD-X200-LIBREBOOT",
    "mpn": "7458-X200-LIBRE",
    "category_id": 6,
    "subcategory": "Laptopturi Coreboot & Open Firmware",
    "price_ron": 1199.99,
    "old_price_ron": 1399.99,
    "stock": 3,
    "stock_status": "in_stock",
    "short_desc": "Laptop cu 100% Free Software BIOS (Libreboot): zero blob-uri proprietare, fără Intel ME hardware, certificat FSF Respects Your Freedom.",
    "full_desc": "ThinkPad X200 este cel mai puternic laptop din lume capabil să ruleze Libreboot fără niciun microcod sau blob binar binar proprietar (fără Video BIOS proprietar, fără Intel Management Engine). Echipat cu cipulset GM45 și placă Wi-Fi Atheros cu firmware liber ath9k, reprezintă puritatea absolută a software-ului liber promovat de Richard Stallman și Free Software Foundation.",
    "technical_specs": {
      "architecture": "x86_64",
      "skill_level": "Beginner",
      "processor": "Intel Core 2 Duo P8600 2.40GHz (3MB L2 Cache, 25W TDP)",
      "ram": "8GB (2x4GB) DDR3 PC3-8500 (Maximul absolut suportat de chipsetul GM45)",
      "storage": "256GB SATA SSD",
      "display": "12.1\" WXGA (1280 x 800) Mat LED Backlight",
      "firmware": "Libreboot Official Stable Release (GRUB Payload direct în Flash)",
      "intel_me_status": "Inexistent fizic / dezactivat din arhitectura chipsetului GM45",
      "wifi": "Atheros AR9285 802.11b/g/n (Driver liber ath9k în kernelul Linux)",
      "keyboard": "Clasică ThinkPad 7-row cu mecanism foarfecă original IBM-style",
      "linux_support": "100% FSF Free Software (Trisquel, Guix, Debian-main, Parabola)",
      "works_with_os": [
        "Trisquel GNU/Linux",
        "GNU Guix System",
        "Debian Libre",
        "Devuan"
      ]
    },
    "pinout_info": null,
    "datasheet_url": "https://libreboot.org/docs/hardware/x200.html",
    "image_url": "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
    "badge": "100% Free Software RYF",
    "tags": [
      "niche",
      "libreboot",
      "fsf-ryf",
      "x200",
      "thinkpad",
      "free-software",
      "zero-blobs"
    ],
    "rating": 4.95,
    "review_count": 8,
    "featured": false,
    "compatible_with": [
      "kit-profesional-flashing-coreboot-pomona-5250"
    ]
  },
  {
    "slug": "lenovo-thinkpad-t480-quad-core-privacy-coreboot-ready",
    "name": "Lenovo ThinkPad T480 (Intel Core i5-8350U Quad-Core, 32GB DDR4, 512GB NVMe) [Linux Privacy Edition - Coreboot Ready]",
    "sku": "THINKPAD-T480-PRIVACY",
    "mpn": "20L5-T480-PRIVACY",
    "category_id": 6,
    "subcategory": "Laptopturi Coreboot & Open Firmware",
    "price_ron": 1899.99,
    "old_price_ron": 2199.99,
    "stock": 6,
    "stock_status": "in_stock",
    "short_desc": "Sfântul Graal al ThinkPad-urilor moderne de Linux: 4C/8T Gen8, 32GB RAM, două baterii PowerBridge, Thunderbolt 3 și cameră cu obturator ThinkShutter.",
    "full_desc": "ThinkPad T480 este considerat de comunitatea sysadmin și de securitate cel mai fiabil și versatil laptop modern de la Lenovo. Oferă 4 nuclee fizice și 8 fire de execuție la 15W TDP, două sloturi SODIMM de RAM (suport până la 64GB DDR4), două baterii independente cu comutare la cald PowerBridge, conector Thunderbolt 3 compatibil cu dock-uri eGPU și oblon fizic pentru cameră ThinkShutter.",
    "technical_specs": {
      "architecture": "x86_64",
      "skill_level": "Intermediate",
      "processor": "Intel Core i5-8350U Quad-Core / 8 Threads @ 1.70GHz (Turbo 3.60GHz, 6MB Cache, vPro)",
      "ram": "32GB (2x16GB) DDR4-2400MHz Dual Channel (extensibil la 64GB)",
      "storage": "512GB M.2 2280 NVMe PCIe SSD",
      "display": "14.0\" Full HD (1920 x 1080) IPS Anti-Glare",
      "battery_system": "Dual Battery PowerBridge (1x Baterie internă 24Wh + 1x Baterie externă detașabilă 48Wh)",
      "privacy_features": "ThinkShutter slider mecanic pentru webcam + cititor de amprente match-on-chip",
      "interfaces": [
        "1x Thunderbolt 3 (40Gbps)",
        "1x USB Type-C (USB-PD & DisplayPort)",
        "2x USB 3.1 Gen 1",
        "HDMI 1.4b",
        "Gigabit Ethernet RJ45 nativ",
        "Cititor carduri SD"
      ],
      "firmware_status": "Compatibil cu portul Coreboot comunitar / me_cleaner HAP bit disable",
      "linux_support": "Suport impecabil în orice distribuție Linux modernă (Kernel 6.x nativ)",
      "works_with_os": [
        "Fedora Workstation",
        "Debian",
        "Arch Linux",
        "Qubes OS",
        "Ubuntu"
      ]
    },
    "pinout_info": null,
    "datasheet_url": "https://psref.lenovo.com/syspool/Sys/PDF/ThinkPad/ThinkPad_T480/ThinkPad_T480_Spec.PDF",
    "image_url": "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80",
    "badge": "PowerBridge 32GB RAM",
    "tags": [
      "niche",
      "thinkpad",
      "t480",
      "linux",
      "quad-core",
      "powerbridge",
      "thunderbolt3",
      "qubes-os"
    ],
    "rating": 4.98,
    "review_count": 23,
    "featured": true,
    "compatible_with": [
      "crucial-32gb-2x16gb-ddr4-3200-sodimm-kit"
    ]
  },
  {
    "slug": "kit-profesional-flashing-coreboot-pomona-5250",
    "name": "Kit Profesional Flashing Coreboot / Libreboot (Programator CH341A v1.7 Fix 3.3V + Clește Original Pomona 5250 SOIC8)",
    "sku": "COREBOOT-FLASH-KIT-POMONA",
    "mpn": "KIT-CB-CH341A-POM5250",
    "category_id": 6,
    "subcategory": "Unelte Flashing & Reverse Engineering",
    "price_ron": 139.99,
    "old_price_ron": 169.99,
    "stock": 19,
    "stock_status": "in_stock",
    "short_desc": "Kitul definitiv pentru scrierea Coreboot/Libreboot: programator CH341A revizuit cu fix hardware la 3.3V și clește aurit Pomona 5250 fabricat în SUA.",
    "full_desc": "Programatoarele CH341A ieftine au un defect de fabrică periculos: alimentează cipurile de BIOS la 5V pe liniile de date, riscând să ardă definitiv placa de bază a ThinkPad-ului. Acest kit vine cu versiunea revizuită v1.7 ce livrează strict nivel logic de 3.3V pe toate liniile SPI și legendarul clește Pomona 5250 cu pini de contact placați cu aur ce nu alunecă de pe pinii minusculi SOIC-8 ai cipului de BIOS.",
    "technical_specs": {
      "voltage_fix": "Modificare hardware garantată 3.3V Logic Level pe toți pinii (VCC, CS, CLK, MOSI, MISO, WP, HOLD)",
      "clip_model": "Pomona 5250 SOIC8 original (Fabricat în SUA, contacte berylium copper aurite)",
      "supported_chips": "Seriile SPI Flash 24xx / 25xx (Winbond W25Q32, W25Q64, W25Q128, Macronix MX25L, GigaDevice)",
      "adapter_included": "Adaptor 1.8V SPI pentru laptopuri noi cu cipuri de joasă tensiune",
      "cables": "Cabluri Dupont multifilare cu rezistență parazită < 0.2Ω pentru citire 100% fără bit flips",
      "linux_support": "flashrom nativ: `flashrom -p ch341a_spi -c \"W25Q64.V\" -r bios_backup.bin`",
      "works_with_os": [
        "Linux (flashrom)",
        "macOS (brew flashrom)",
        "FreeBSD"
      ]
    },
    "pinout_info": {
      "pin_map": [
        {
          "pin": "Pin 1",
          "name": "CS (Chip Select)",
          "function": "Selectare cip SPI activ pe 0 logic"
        },
        {
          "pin": "Pin 2",
          "name": "MISO (DO)",
          "function": "Date ieșire din memoria Flash către programator"
        },
        {
          "pin": "Pin 3",
          "name": "WP# (Write Protect)",
          "function": "Tragere la 3.3V pentru a permite scrierea"
        },
        {
          "pin": "Pin 4",
          "name": "GND",
          "function": "Masă comună de referință"
        },
        {
          "pin": "Pin 5",
          "name": "MOSI (DI)",
          "function": "Date intrare din programator în memoria Flash"
        },
        {
          "pin": "Pin 6",
          "name": "CLK (Serial Clock)",
          "function": "Semnal de sincronizare ceas SPI"
        },
        {
          "pin": "Pin 7",
          "name": "HOLD#",
          "function": "Tragere la 3.3V pentru funcționare normală"
        },
        {
          "pin": "Pin 8",
          "name": "VCC (+3.3V)",
          "function": "Alimentare precisă 3.30V DC"
        }
      ]
    },
    "datasheet_url": "https://coreboot.org/docs/flash_tutorial/",
    "image_url": "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
    "badge": "3.3V Hardware Fix",
    "tags": [
      "niche",
      "coreboot",
      "libreboot",
      "ch341a",
      "pomona",
      "soic8",
      "flashrom",
      "bios-flashing"
    ],
    "rating": 4.99,
    "review_count": 29,
    "featured": true,
    "compatible_with": [
      "lenovo-thinkpad-x230-coreboot-me-cleaner",
      "lenovo-thinkpad-t440p-coreboot-modular-quad-i7"
    ]
  },
  {
    "slug": "cleste-test-soic16-pomona-5252-cabluri",
    "name": "Clește Test SOIC16 Pomona 5252 + Cabluri Ecranate pentru Flashing BIOS SOIC-16",
    "sku": "POMONA-5252-SOIC16",
    "mpn": "POMONA-5252-KIT",
    "category_id": 6,
    "subcategory": "Unelte Flashing & Reverse Engineering",
    "price_ron": 89.99,
    "old_price_ron": 109.99,
    "stock": 12,
    "stock_status": "in_stock",
    "short_desc": "Clește original Pomona 5252 cu 16 contacte aurite pentru cipurile SPI Flash în capsulă lată SOIC-16 (ThinkPad T430, W530, Dell Latitude).",
    "full_desc": "Multe laptopuri clasice și servere enterprise utilizează cipuri SPI de 16 pini (SOIC-16 / SOP-16) în loc de SOIC-8. Cleștele Pomona 5252 rezolvă problema conectării fără a dezlipi cipul de pe placa de bază, asigurând o prindere fermă cu rezistență de contact minimă.",
    "technical_specs": {
      "clip_model": "Pomona 5252 original cu 16 pini (SOP-16 / SOIC-16 Wide Body)",
      "contacts": "Cupru beriliu placat cu aur pur de 30 micropoli pentru conductivitate maximă",
      "compatibility": "Compatibil cu programatoarele CH341A, Bus Pirate, Raspberry Pi SPI",
      "cables": "Panglică 16 fire colorate cu mufe mamă Dupont de 2.54mm"
    },
    "pinout_info": null,
    "datasheet_url": "https://www.pomonaelectronics.com/products/test-clips/soic-test-clip-16-pin",
    "image_url": "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
    "badge": "Pomona USA Original",
    "tags": [
      "niche",
      "pomona",
      "soic16",
      "coreboot",
      "bios-flashing",
      "flashrom"
    ],
    "rating": 4.93,
    "review_count": 8,
    "featured": false,
    "compatible_with": [
      "kit-profesional-flashing-coreboot-pomona-5250"
    ]
  },
  {
    "slug": "cablu-dedicat-spi-flashing-raspberry-pi-coreboot",
    "name": "Cablu Dedicat SPI Flashing Raspberry Pi la SOIC8 (Coreboot / Heads / Flashrom Native)",
    "sku": "RPI-SPI-COREBOOT-CABLE",
    "mpn": "RPI-SPI-SOIC8-CB",
    "category_id": 6,
    "subcategory": "Unelte Flashing & Reverse Engineering",
    "price_ron": 49.99,
    "old_price_ron": 59.99,
    "stock": 25,
    "stock_status": "in_stock",
    "short_desc": "Cablu gata etichetat pentru conectarea directă a pinilor GPIO SPI de pe Raspberry Pi la cleștele SOIC8 fără bătăi de cap.",
    "full_desc": "Cea mai recomandată metodă de scriere Coreboot de către dezvoltatorii proiectului este folosirea unui Raspberry Pi 4 sau 5 ca programator hardware prin modulul Linux de kernel `linux_spi`. Acest cablu are pinii etichetați individual color-coded (SPI_CLK -> Pin 23, MOSI -> Pin 19, MISO -> Pin 21, CE0 -> Pin 24, 3V3 -> Pin 1, GND -> Pin 6), eliminând orice risc de conectare greșită.",
    "technical_specs": {
      "interfaces": "Header 6-pin dedicat GPIO Raspberry Pi -> Conector 8-pin clește SOIC8 Pomona",
      "resistors": "Rezistențe de amortizare serie 100Ω integrate pe liniile CLK și MOSI pentru eliminarea reflexiilor de semnal la 10-25MHz",
      "linux_support": "`flashrom -p linux_spi:dev=/dev/spidev0.0,spispeed=16000 -c \"W25Q64.V\" -w coreboot.rom`",
      "compatibility": "Raspberry Pi 3B+, 4B, 5, Zero 2W"
    },
    "pinout_info": null,
    "datasheet_url": "https://www.flashrom.org/Raspberry_Pi",
    "image_url": "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    "badge": "linux_spi Native",
    "tags": [
      "niche",
      "raspberry-pi",
      "spi-flashing",
      "coreboot",
      "flashrom",
      "soic8"
    ],
    "rating": 4.96,
    "review_count": 17,
    "featured": false,
    "compatible_with": [
      "raspberry-pi-5-8gb",
      "kit-profesional-flashing-coreboot-pomona-5250"
    ]
  },
  {
    "slug": "google-pixel-8-pro-128gb-grapheneos-hardened",
    "name": "Google Pixel 8 Pro 128GB Obsidian [GrapheneOS Pre-Installed & Verified Boot Re-Locked]",
    "sku": "PIXEL8-PRO-GRAPHENE-128G",
    "mpn": "GC3VE-GRAPHENE-PRO",
    "category_id": 6,
    "subcategory": "GrapheneOS & Hardened Mobile Security",
    "price_ron": 3499.99,
    "old_price_ron": 3999.99,
    "stock": 5,
    "stock_status": "in_stock",
    "short_desc": "Smartphone de securitate maximă cu GrapheneOS pre-instalat, cheie AVB proprie înscrisă în hardware, MTE activ și coprocesor Titan M2.",
    "full_desc": "Google Pixel 8 Pro cu GrapheneOS reprezintă vârful securității mobile globale. Bootloader-ul este re-blocat hardware cu cheia criptografică unică GrapheneOS pentru a asigura starea Green Verified Boot. Datorită arhitecturii Armv9 a procesorului Google Tensor G3, beneficiază de MTE (Hardware Memory Tagging Extension) activat nativ, anihilând atacurile de tip memory corruption (Buffer Overflow, Use-After-Free). Zero telemetrie Google, izolator sandbox pentru Google Play Services și protecție hardware Titan M2 împotriva atacurilor brute-force.",
    "technical_specs": {
      "architecture": "ARMv9 64-bit cu Hardware MTE",
      "skill_level": "Intermediate",
      "processor": "Google Tensor G3 (9-core CPU: 1x Cortex-X3 + 4x Cortex-A715 + 4x Cortex-A510)",
      "security_chip": "Titan M2 dedicated hardware security element (Common Criteria EAL6+)",
      "memory_safety": "Hardware Memory Tagging Extension (MTE) forțat la nivel de sistem și aplicații",
      "ram": "12GB LPDDR5X",
      "storage": "128GB UFS 3.1 Flash",
      "display": "6.7\" Super Actua LTPO OLED (1344 x 2992), 1-120Hz dinamic, 2400 nits peak",
      "firmware_status": "GrapheneOS Official Release (Bootloader Re-Locked cu AVB Custom Root of Trust)",
      "privacy_features": "Toggles hardware pentru Senzori și Rețea per aplicație, Auto-Reboot timer la inactivitate, dezactivare automată port USB la blocare ecran",
      "network": "Dual SIM (1x Nano-SIM fizic + 1x eSIM), 5G Sub-6/mmWave, Wi-Fi 7, Bluetooth 5.3, UWB",
      "battery": "5050mAh cu încărcare rapidă 30W USB-PD 3.0 și wireless Qi",
      "linux_support": "Kernel Linux 6.1 cu patch-uri de securitate GrapheneOS și izolator seccomp întărit",
      "works_with_os": [
        "GrapheneOS",
        "Sandboxed Google Play Services (fără privilegii de sistem)",
        "AOSP Pur"
      ]
    },
    "pinout_info": null,
    "datasheet_url": "https://grapheneos.org/features",
    "image_url": "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80",
    "badge": "Hardware MTE & Titan M2",
    "tags": [
      "niche",
      "grapheneos",
      "google-pixel",
      "pixel-8-pro",
      "security",
      "privacy",
      "titan-m2",
      "mte"
    ],
    "rating": 5,
    "review_count": 24,
    "featured": true,
    "compatible_with": []
  },
  {
    "slug": "google-pixel-8-128gb-grapheneos-hardened",
    "name": "Google Pixel 8 128GB Obsidian [GrapheneOS Pre-Installed & Verified Boot Re-Locked]",
    "sku": "PIXEL8-GRAPHENE-128G",
    "mpn": "G9BQD-GRAPHENE",
    "category_id": 6,
    "subcategory": "GrapheneOS & Hardened Mobile Security",
    "price_ron": 2799.99,
    "old_price_ron": 3199.99,
    "stock": 7,
    "stock_status": "in_stock",
    "short_desc": "Format compact de 6.2\" cu Tensor G3, protecție avansată MTE hardware, GrapheneOS pre-configurat și chei AVB semnate.",
    "full_desc": "Google Pixel 8 oferă același nivel militar de securitate MTE și Titan M2 ca versiunea Pro, dar într-un corp compact și manevrabil de 6.2 inci. Cu GrapheneOS pre-instalat și bootloader re-blocat, oferă protecție completă împotriva spyware-ului de tip Pegasus/Predator, alocator de memorie întărit hardened_malloc și actualizări de securitate direct din depozitele oficiale.",
    "technical_specs": {
      "architecture": "ARMv9 64-bit cu Hardware MTE",
      "skill_level": "Intermediate",
      "processor": "Google Tensor G3 (9-core) + Titan M2 Security Co-Processor",
      "security_chip": "Titan M2 EAL6+ tamper-resistant element",
      "ram": "8GB LPDDR5X",
      "storage": "128GB UFS 3.1",
      "display": "6.2\" Actua OLED (1080 x 2400), 60-120Hz, 2000 nits peak",
      "firmware_status": "GrapheneOS Official Stable (Verificare criptografică AVB completă)",
      "privacy_features": "Auditor app integrat (atestare hardware periodică), comutatoare permisiuni senzori/clipboard, mac address randomization avansată",
      "network": "Nano-SIM + eSIM, Wi-Fi 7, 5G, Bluetooth 5.3",
      "battery": "4575mAh, autonomie excelentă fără serviciile de fundal Google",
      "linux_support": "Android Open Source Project întărit cu kernel Linux 6.1 LTS",
      "works_with_os": [
        "GrapheneOS Official"
      ]
    },
    "pinout_info": null,
    "datasheet_url": "https://grapheneos.org/faq#supported-devices",
    "image_url": "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80",
    "badge": "Compact Flagship MTE",
    "tags": [
      "niche",
      "grapheneos",
      "google-pixel",
      "pixel-8",
      "privacy",
      "titan-m2",
      "security"
    ],
    "rating": 4.98,
    "review_count": 19,
    "featured": true,
    "compatible_with": []
  },
  {
    "slug": "google-pixel-7a-128gb-grapheneos-privacy-phone",
    "name": "Google Pixel 7a 128GB Charcoal [GrapheneOS Pre-Installed & Re-Locked Bootloader]",
    "sku": "PIXEL7A-GRAPHENE-128G",
    "mpn": "GWKK3-GRAPHENE-7A",
    "category_id": 6,
    "subcategory": "GrapheneOS & Hardened Mobile Security",
    "price_ron": 1799.99,
    "old_price_ron": 2099.99,
    "stock": 9,
    "stock_status": "in_stock",
    "short_desc": "Cel mai popular telefon de privacy pentru jurnaliști și cercetători: Tensor G2, Titan M2, 8GB RAM și GrapheneOS gata de utilizare.",
    "full_desc": "Google Pixel 7a este campionul raportului securitate/preț. Dotat cu procesorul Tensor G2 și coprocesorul de securitate Titan M2, rulează GrapheneOS cu fluiditate desăvârșită. Vine cu sistemul de operare gata instalat, cheile criptografice înscrise în cipul TPM și bootloader-ul re-blocat pentru securitate fizică totală împotriva furtului de date.",
    "technical_specs": {
      "architecture": "ARMv8.2-A 64-bit",
      "skill_level": "Beginner",
      "processor": "Google Tensor G2 (Octa-Core: 2x Cortex-X1 + 2x Cortex-A78 + 4x Cortex-A55)",
      "security_chip": "Titan M2 EAL6+ Hardware Security Module",
      "ram": "8GB LPDDR5",
      "storage": "128GB UFS 3.1",
      "display": "6.1\" OLED FHD+ (1080 x 2400) 90Hz",
      "firmware_status": "GrapheneOS Official Stable (Green Verified Boot)",
      "privacy_features": "Vanadium hardened browser (izolare strictă site-uri), tastatură fără acces la rețea, camera app securizată",
      "network": "Nano-SIM + eSIM Dual SIM, 5G, Wi-Fi 6E, Bluetooth 5.3",
      "battery": "4385mAh (autonomie de până la 2 zile datorită eliminării Google Play Services din fundal)",
      "linux_support": "Linux Kernel 5.10 LTS adaptat GrapheneOS",
      "works_with_os": [
        "GrapheneOS",
        "F-Droid",
        "Aurora Store"
      ]
    },
    "pinout_info": null,
    "datasheet_url": "https://grapheneos.org/install/web",
    "image_url": "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80",
    "badge": "Sweet Spot Privacy",
    "tags": [
      "niche",
      "grapheneos",
      "google-pixel",
      "pixel-7a",
      "privacy-phone",
      "titan-m2",
      "journalist"
    ],
    "rating": 4.96,
    "review_count": 31,
    "featured": true,
    "compatible_with": []
  },
  {
    "slug": "google-pixel-6a-128gb-grapheneos-burner-phone",
    "name": "Google Pixel 6a 128GB Charcoal [GrapheneOS Pre-Installed - Burner / Field Unit]",
    "sku": "PIXEL6A-GRAPHENE-128G",
    "mpn": "GX7AS-GRAPHENE-6A",
    "category_id": 6,
    "subcategory": "GrapheneOS & Hardened Mobile Security",
    "price_ron": 1299.99,
    "old_price_ron": 1499.99,
    "stock": 8,
    "stock_status": "in_stock",
    "short_desc": "Dispozitiv de securitate accesibil pentru misiuni de teren sau telefon secundar dedicat: Tensor G1, Titan M2 și bootloader blocat.",
    "full_desc": "Pixel 6a este soluția optimă pentru un dispozitiv dedicat de conferințe, călătorii internaționale riscante sau nod mobil de comunicații securizate (Signal, Briar, Session). Oferă protecția hardware a cipului Titan M2 și alocatorul de memorie hardened_malloc la un preț imbatabil.",
    "technical_specs": {
      "architecture": "ARMv8.2-A 64-bit",
      "skill_level": "Beginner",
      "processor": "Google Tensor G1 Octa-core + Titan M2 Hardware Security Chip",
      "security_chip": "Titan M2 EAL6+ Crypto Engine",
      "ram": "6GB LPDDR5",
      "storage": "128GB UFS 3.1",
      "display": "6.1\" OLED FHD+ (1080 x 2400) 60Hz",
      "firmware_status": "GrapheneOS Official Stable (Bootloader Re-Locked)",
      "privacy_features": "Profiluri de utilizator complet izolate (separare muncă / personal / anonim), fără acces ID publicitar",
      "network": "Nano-SIM + eSIM, 5G, Wi-Fi 6E, Bluetooth 5.2",
      "battery": "4410mAh",
      "linux_support": "Linux Kernel 5.10 LTS GrapheneOS",
      "works_with_os": [
        "GrapheneOS"
      ]
    },
    "pinout_info": null,
    "datasheet_url": "https://grapheneos.org/",
    "image_url": "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80",
    "badge": "Budget Privacy Field Node",
    "tags": [
      "niche",
      "grapheneos",
      "google-pixel",
      "pixel-6a",
      "field-unit",
      "privacy",
      "burner"
    ],
    "rating": 4.93,
    "review_count": 15,
    "featured": false,
    "compatible_with": []
  },
  {
    "slug": "rakwireless-rak7268v2-wisgate-edge-lite-2-lorawan-gateway",
    "name": "RAKwireless RAK7268V2 WisGate Edge Lite 2 (8-Channel LoRaWAN Gateway SX1302 cu PoE)",
    "sku": "RAK7268V2-LORAWAN-GW",
    "mpn": "RAK7268C-EU868",
    "category_id": 3,
    "subcategory": "Smart City & LoRaWAN",
    "price_ron": 799.99,
    "old_price_ron": 899.99,
    "stock": 7,
    "stock_status": "in_stock",
    "short_desc": "Gateway industrial de interior cu 8 canale LoRaWAN bazat pe cipul Semtech SX1302, alimentare PoE, Wi-Fi și server intern ChirpStack.",
    "full_desc": "RAK7268V2 WisGate Edge Lite 2 este nodul central ideal pentru proiecte Smart City, clădiri de birouri și monitorizarea campusurilor. Cu un cip receptor SX1302 capabil să proceseze simultan pachete de la mii de senzori pe o rază de până la 15 km în câmp deschis, integrează sistemul de operare WisGateOS 2 bazat pe OpenWrt și permite rutarea locală prin ChirpStack sau în cloud către The Things Network (TTN).",
    "technical_specs": {
      "architecture": "MIPS MediaTek MT7628 + Semtech SX1302 LoRa Concentrator",
      "skill_level": "Intermediate",
      "channels": "8 canale LoRaWAN simultane (Banda europeană EU868: 863-870 MHz)",
      "connectivity": "Ethernet RJ45 10/100M cu suport PoE 802.3af + Wi-Fi 2.4GHz b/g/n",
      "internal_network_server": "Server ChirpStack V4 integrat pe dispozitiv (funcționează complet offline fără cloud)",
      "packet_forwarders": "Semtech Packet Forwarder, Basics Station, ChirpStack Gateway Bridge",
      "operating_voltage": "12V DC Jack sau 48V PoE 802.3af (Splitter inclus)",
      "power_consumption": "< 5W",
      "linux_support": "WisGateOS 2 (bazat pe OpenWrt Linux cu acces root SSH)",
      "works_with_os": [
        "WisGateOS",
        "The Things Network (TTN)",
        "ChirpStack",
        "AWS IoT Core for LoRaWAN"
      ]
    },
    "pinout_info": null,
    "datasheet_url": "https://docs.rakwireless.com/product-categories/wisgate/rak7268v2/",
    "image_url": "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80",
    "badge": "Smart City Gateway",
    "tags": [
      "iot",
      "smart-city",
      "lorawan",
      "gateway",
      "sx1302",
      "chirpstack",
      "ttn"
    ],
    "rating": 4.97,
    "review_count": 12,
    "featured": true,
    "compatible_with": [
      "heltec-wifi-lora-32-v3-esp32s3-sx1262",
      "lilygo-t-beam-esp32-lora-868-gps-neo6m"
    ]
  },
  {
    "slug": "seeed-sensecap-s2100-lorawan-data-logger-ip66",
    "name": "Seeed Studio SenseCAP S2100 LoRaWAN Data Logger & Hub (Baterie 19Ah, IP66 Exterior)",
    "sku": "SENSECAP-S2100-HUB",
    "mpn": "114992984",
    "category_id": 3,
    "subcategory": "Smart City & LoRaWAN",
    "price_ron": 349.99,
    "old_price_ron": 399.99,
    "stock": 15,
    "stock_status": "in_stock",
    "short_desc": "Data logger universal de exterior IP66 cu autonomie de până la 10 ani pe baterie pentru conectarea oricărui senzor industrial RS485/Modbus sau analogic la rețeaua LoRaWAN.",
    "full_desc": "SenseCAP S2100 rezolvă provocarea digitalizării senzorilor industriali din orașele inteligente și agricultură. Acceptă semnale de intrare Modbus RTU RS485, 0-10V, 4-20mA și impulsuri de debitmetru, transmițând datele criptat prin LoRaWAN la kilometri distanță, alimentat exclusiv dintr-o baterie internă Li-SOCl2 de 19Ah inclusă.",
    "technical_specs": {
      "interfaces": "RS485 Modbus RTU, 0-10V analogic, 4-20mA buclă de curent, intrare GPIO/Pulse counter",
      "sensor_power_output": "Livrează 12V DC sau 5V DC direct către senzorul extern doar în momentul citirii",
      "lorawan_class": "LoRaWAN Class A (Banda EU868, putere emisie +16dBm)",
      "battery": "Baterie internă litiu D-Cell ER34615 3.6V / 19.000mAh (Până la 10 ani autonomie la transmisie la 1 oră)",
      "enclosure": "Carcasă ermetică IP66 rezistentă la UV, intemperii și temperaturi -40°C ... +85°C",
      "configuration": "Bluetooth Low Energy din aplicație dedicată Android / iOS",
      "linux_support": "Decodoare oficiale JavaScript/Python pentru TTN și ChirpStack"
    },
    "pinout_info": null,
    "datasheet_url": "https://www.seeedstudio.com/SenseCAP-S2100-LoRaWAN-Data-Logger-p-5389.html",
    "image_url": "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    "badge": "10 Ani Baterie IP66",
    "tags": [
      "iot",
      "smart-city",
      "lorawan",
      "modbus",
      "data-logger",
      "industrial-iot",
      "sensors"
    ],
    "rating": 4.93,
    "review_count": 14,
    "featured": false,
    "compatible_with": [
      "rakwireless-rak7268v2-wisgate-edge-lite-2-lorawan-gateway"
    ]
  },
  {
    "slug": "senzor-calitate-aer-exterior-smart-city-pm-gaze-rs485-ip65",
    "name": "Senzor Calitate Aer Exterior Smart City (PM2.5 / PM10 / NO2 / CO / SO2, RS485 Modbus, IP65)",
    "sku": "SMARTCITY-AQ-RS485-IP65",
    "mpn": "SCAQ-PRO-RS485",
    "category_id": 3,
    "subcategory": "Smart City & Mediu",
    "price_ron": 489.99,
    "old_price_ron": 569.99,
    "stock": 8,
    "stock_status": "in_stock",
    "short_desc": "Stație compactă de monitorizare a aerului urban în carcasă cu protecție solară anti-radiație, senzor laser de particule și celule electrochimice de gaze.",
    "full_desc": "Conceput pentru rețelele de monitorizare ambientală urbană din Smart Cities, acest senzor all-in-one măsoară concentrația de pulberi în suspensie (PM2.5 și PM10) prin difracție laser și gazele poluante de trafic (NO2, CO, SO2) prin senzori electrochimici de mare sensibilitate, raportând datele continuu prin protocolul industrial Modbus RTU pe magistrala RS485.",
    "technical_specs": {
      "measured_parameters": "PM2.5 (0-1000 µg/m³), PM10 (0-1000 µg/m³), NO2 (0-20 ppm), CO (0-100 ppm), Temperatură (-40...+80°C), Umiditate (0-100%)",
      "interface": "RS485 Modbus RTU (Adresă programabilă 1-247, baud rate 9600 bps)",
      "operating_voltage": "9V - 24V DC",
      "enclosure": "Ecran lamelar multi-strat anti-radiație solară cu protecție IP65",
      "linux_support": "Integrare directă prin noduri Node-RED, Python Modbus și Home Assistant",
      "works_with_os": [
        "Home Assistant",
        "Node-RED",
        "ThingsBoard IoT Platform"
      ]
    },
    "pinout_info": null,
    "datasheet_url": "https://www.seeedstudio.com/",
    "image_url": "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
    "badge": "Smart City Poluare",
    "tags": [
      "iot",
      "smart-city",
      "calitate-aer",
      "pm25",
      "pm10",
      "modbus",
      "rs485",
      "poluare"
    ],
    "rating": 4.89,
    "review_count": 9,
    "featured": false,
    "compatible_with": [
      "seeed-sensecap-s2100-lorawan-data-logger-ip66",
      "convertor-industrial-rs485-la-ttl-uart"
    ]
  },
  {
    "slug": "senzor-radar-microunde-trafic-viteza-vehicule-24ghz-modbus",
    "name": "Senzor Radar Microunde Monitorizare Trafic și Viteză Vehicule Smart City (24GHz, Modbus/UART)",
    "sku": "SMARTCITY-TRAFFIC-RADAR-24G",
    "mpn": "RADAR-TF24-PRO",
    "category_id": 3,
    "subcategory": "Smart City & Trafic",
    "price_ron": 599.99,
    "old_price_ron": 689.99,
    "stock": 6,
    "stock_status": "in_stock",
    "short_desc": "Senzor radar Doppler 24GHz de exterior pentru detecția fluxului de vehicule, clasificare trafic și măsurare viteză până la 100 de metri.",
    "full_desc": "Componentă esențială pentru intersecțiile inteligente și parcările Smart City. Emite semnale radar în banda 24GHz fără a fi afectat de ploaie, ceață, întuneric sau praf, raportând instantaneu prezența vehiculelor, viteza lor exactă (1-250 km/h) și direcția de deplasare (apropiere/depărtare).",
    "technical_specs": {
      "technology": "24GHz FMCW / Doppler Radar",
      "detection_range": "Până la 100 de metri distanță pentru autovehicule",
      "speed_range": "1 km/h – 250 km/h (acuratețe ±1 km/h)",
      "interfaces": [
        "RS485 Modbus RTU",
        "UART 3.3V",
        "Ieșire releu trigger depășire viteză"
      ],
      "operating_voltage": "12V DC (9-24V DC)",
      "power_consumption": "< 1.8W",
      "enclosure": "IP67 etanș pentru montaj pe stâlpi stradali sau pasaje",
      "linux_support": "Pachete ROS2 / Python pentru analiză în timp real a traficului"
    },
    "pinout_info": null,
    "datasheet_url": "https://www.seeedstudio.com/",
    "image_url": "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80",
    "badge": "Radar Trafic 24GHz",
    "tags": [
      "iot",
      "smart-city",
      "radar",
      "trafic",
      "viteza",
      "modbus",
      "senzori-exterior"
    ],
    "rating": 4.95,
    "review_count": 7,
    "featured": false,
    "compatible_with": [
      "convertor-industrial-rs485-la-ttl-uart"
    ]
  },
  {
    "slug": "controler-inteligent-iluminat-public-lorawan-nema-dali",
    "name": "Controler Inteligent Iluminat Public Smart City LoRaWAN NEMA (IP66, Fotocelulă & DALI/0-10V)",
    "sku": "SMARTCITY-STREETLIGHT-NEMA",
    "mpn": "SLC-NEMA-EU868",
    "category_id": 3,
    "subcategory": "Smart City & Energie",
    "price_ron": 269.99,
    "old_price_ron": 319.99,
    "stock": 14,
    "stock_status": "in_stock",
    "short_desc": "Nod de telegestiune pentru stâlpi de iluminat cu soclu standard ANSI C136.41 NEMA 7-pin, dimming DALI/0-10V și măsurare consum energie.",
    "full_desc": "Permite municipalităților să reducă factura energetică a iluminatului public cu peste 40%. Se instalează prin simplă răsucire pe soclul NEMA existent al lămpii stradale LED, oferind control individual al intensității luminoase conform orarelor sau senzorului crepuscular integrat, raportând automat lămpile defecte prin rețeaua LoRaWAN.",
    "technical_specs": {
      "socket_type": "Standard internațional ANSI C136.41 NEMA 7-pin Twist-Lock",
      "communication": "LoRaWAN Class C (Banda EU868, transmisie bidirecțională în timp real)",
      "dimming_support": "Interfață duală DALI 2.0 și semnal analogic 0-10V PWM",
      "power_metering": "Măsurare precisă Tensiune (V), Curent (A), Putere Activă (W), Energie (kWh) și Factor de Putere (Cos φ)",
      "photocell": "Senzor crepuscular optic integrat pentru comutare de urgență în caz de lipsă rețea",
      "operating_voltage": "100-277V AC 50/60Hz",
      "enclosure": "IP66 rezistent la UV extrem și descărcări electrice până la 10kV",
      "linux_support": "Integrare platforme Smart City ThingsBoard, Home Assistant"
    },
    "pinout_info": null,
    "datasheet_url": "https://lora-alliance.org/",
    "image_url": "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    "badge": "NEMA 7-Pin LoRaWAN",
    "tags": [
      "iot",
      "smart-city",
      "iluminat-public",
      "lorawan",
      "nema",
      "dali",
      "energie"
    ],
    "rating": 4.91,
    "review_count": 11,
    "featured": false,
    "compatible_with": [
      "rakwireless-rak7268v2-wisgate-edge-lite-2-lorawan-gateway"
    ]
  },
  {
    "slug": "contor-inteligent-apa-smart-city-lorawan-ultrasonic-dn20",
    "name": "Contor Inteligent de Apă Smart City LoRaWAN Ultrasonic (DN20, IP68 Submersibil)",
    "sku": "SMARTCITY-WATERMETER-DN20",
    "mpn": "WM-US-DN20-EU868",
    "category_id": 3,
    "subcategory": "Smart City & Utilități",
    "price_ron": 389.99,
    "old_price_ron": 449.99,
    "stock": 10,
    "stock_status": "in_stock",
    "short_desc": "Debitmetru de apă ultrasonic fără componente mecanice în mișcare, cu emițător radio LoRaWAN, baterie 10 ani și detectare scurgeri/avarii.",
    "full_desc": "Digitalizează complet rețelele de distribuție a apei potabile. Tehnologia cu ultrasunete măsoară chiar și cele mai mici scurgeri de picături fără a suferi de uzură mecanică în timp, raportând zilnic indexul de consum, temperatura apei și alarme de conductă spartă sau curgere inversă prin LoRaWAN.",
    "technical_specs": {
      "pipe_diameter": "DN20 (Filet 3/4\" exterior, debit nominal Q3 = 2.5 m³/h)",
      "measurement_principle": "Tranzit ultrasonic (Fără rotor mecanic, insensibil la impurități/nisip)",
      "communication": "LoRaWAN Class A (EU868)",
      "leak_detection": "Detectare curgere continuă anormală (țeavă spartă sau toaletă curgând), curgere inversă, golire conductă",
      "battery": "Baterie Litiu 3.6V integrată de înaltă anduranță (Durată de viață 10+ ani)",
      "protection_class": "IP68 complet submersibil (poate funcționa inundat în căminul de apă la 1 metru adâncime)",
      "linux_support": "Decodoare pachete JavaScript/Payload formate pentru TTN/ChirpStack"
    },
    "pinout_info": null,
    "datasheet_url": "https://lora-alliance.org/",
    "image_url": "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
    "badge": "Ultrasonic IP68",
    "tags": [
      "iot",
      "smart-city",
      "contor-apa",
      "lorawan",
      "ultrasonic",
      "utilitati",
      "submersibil"
    ],
    "rating": 4.96,
    "review_count": 8,
    "featured": false,
    "compatible_with": [
      "rakwireless-rak7268v2-wisgate-edge-lite-2-lorawan-gateway"
    ]
  },
  {
    "slug": "home-assistant-yellow-hub-cm4-zigbee-matter-poe",
    "name": "Home Assistant Yellow Hub (Raspberry Pi CM4, Zigbee 3.0, Thread & Matter Integrat, PoE)",
    "sku": "NABUCASA-HA-YELLOW",
    "mpn": "HA-YELLOW-POE",
    "category_id": 3,
    "subcategory": "Smart Home Hubs",
    "price_ron": 899.99,
    "old_price_ron": 999.99,
    "stock": 9,
    "stock_status": "in_stock",
    "short_desc": "Hub-ul Smart Home oficial creat de Nabu Casa: radio intern Silicon Labs Matter/Thread/Zigbee, slot M.2 NVMe și alimentare Gigabit PoE.",
    "full_desc": "Home Assistant Yellow este platforma de referință a întregului univers Smart Home local și privat. Proiectat special de echipa fondatoare Home Assistant, integrează direct cipul radio multiprotocol Silicon Labs MGM210P capabil să ruleze simultan Zigbee 3.0 și Thread/Matter, un slot M.2 M-Key pentru SSD-uri NVMe ultra-rapide și alimentare directă prin cablul de rețea PoE.",
    "technical_specs": {
      "processor_module": "Raspberry Pi Compute Module 4 (CM4) Quad-core A72 @ 1.5GHz, 2GB RAM, 16GB eMMC",
      "multiprotocol_radio": "Silicon Labs MGM210P intern (Zigbee 3.0, Thread, Matter cu antenă ceramică + conector IPEX)",
      "storage_expansion": "Slot M.2 2280 NVMe PCIe 2.0 (stocare baze de date istorice pe SSD)",
      "networking": "Gigabit Ethernet cu alimentare Power-over-Ethernet (PoE 802.3at) integrată",
      "interfaces": [
        "2x USB 2.0 Type-A",
        "Port USB-C de depanare serială",
        "DAC audio stereo de înaltă fidelitate"
      ],
      "operating_system": "Home Assistant OS oficial pre-instalat (gata de configurare în 60 secunde)",
      "works_with_os": [
        "Home Assistant OS",
        "Matter",
        "Thread",
        "Zigbee Home Automation (ZHA)"
      ]
    },
    "pinout_info": null,
    "datasheet_url": "https://yellow.home-assistant.io/",
    "image_url": "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
    "badge": "Oficial Nabu Casa",
    "tags": [
      "iot",
      "smart-home",
      "home-assistant",
      "yellow",
      "matter",
      "thread",
      "zigbee",
      "poe"
    ],
    "rating": 4.99,
    "review_count": 36,
    "featured": true,
    "compatible_with": [
      "raspberry-pi-compute-module-4-8gb-emmc-wifi",
      "shelly-plus-1pm-smart-relay-power-metering"
    ]
  },
  {
    "slug": "shelly-pro-4pm-4-channel-din-rail-smart-switch-lan-color-screen",
    "name": "Shelly Pro 4PM — 4-Channel DIN Rail Smart Switch cu Ecran Color & LAN Ethernet",
    "sku": "SHELLY-PRO-4PM-DIN",
    "mpn": "SPSW-004PE16EU",
    "category_id": 3,
    "subcategory": "Smart Home & Tablouri Electrice",
    "price_ron": 429.99,
    "old_price_ron": 489.99,
    "stock": 12,
    "stock_status": "in_stock",
    "short_desc": "Comutator profesional inteligent pentru tablou electric pe șină DIN: 4 canale de 16A (total 40A), măsurare consum pe fiecare canal, ecran color și port LAN RJ45.",
    "full_desc": "Standardul profesional pentru automatizarea locuințelor și birourilor direct din tabloul electric general. Cu conectivitate prin cablu Ethernet LAN pentru fiabilitate absolută fără interferențe Wi-Fi, măsoară consumul în timp real pe 4 circuite independente de 16A și afișează puterea instantanee pe ecranul color integrat de 1.8 inci.",
    "technical_specs": {
      "mounting": "Montaj standard pe șină DIN (ocupa 3 module DIN în tablou)",
      "channels": "4 canale independente de comutare (16A maxim per canal, curent total combinat 40A)",
      "connectivity": "Port Ethernet RJ45 10/100M nativ + Wi-Fi 802.11 b/g/n + Bluetooth 4.2",
      "power_metering": "Măsurare separată pe fiecare canal a puterii active (W), tensiunii (V) și curentului (A)",
      "display": "Ecran color TFT 1.8\" pentru navigare, diagnoză și consum live cu butoane de control",
      "safety": "Protecție la supratemperatură, supratensiune, supracurent și detectare arc electric",
      "linux_support": "Home Assistant Native Integration, MQTT local securizat TLS, scripting mJS intern"
    },
    "pinout_info": null,
    "datasheet_url": "https://www.shelly.com/en/products/shop/shelly-pro-4-pm",
    "image_url": "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
    "badge": "4x 16A DIN Rail LAN",
    "tags": [
      "iot",
      "smart-home",
      "shelly",
      "tablou-electric",
      "din-rail",
      "lan",
      "power-metering"
    ],
    "rating": 4.98,
    "review_count": 22,
    "featured": true,
    "compatible_with": [
      "home-assistant-yellow-hub-cm4-zigbee-matter-poe"
    ]
  },
  {
    "slug": "vana-inteligenta-motorizata-apa-gaz-zigbee-inchidere-automata",
    "name": "Vană Inteligentă Motorizată de Apă / Gaz cu Închidere Automată la Inundație (Zigbee 3.0)",
    "sku": "SMARTHOME-VALVE-ZIGBEE",
    "mpn": "ZIGBEE-VALVE-01",
    "category_id": 3,
    "subcategory": "Smart Home Siguranță",
    "price_ron": 179.99,
    "old_price_ron": 209.99,
    "stock": 16,
    "stock_status": "in_stock",
    "short_desc": "Robinet motorizat de înalt cuplu ce se instalează peste robinetul existent fără modificarea instalației; închide apa în 5 secunde la inundație.",
    "full_desc": "Sistemul de siguranță esențial pentru orice casă inteligentă. Se montează peste maneta oricărui robinet cu bilă de 1/2\", 3/4\" sau 1\" existent pe țeavă. Cuplat în automatizările Home Assistant cu senzorii de inundație, închide automat coloana de apă în sub 7 secunde de la detectarea primei picături, prevenind daune de mii de euro.",
    "technical_specs": {
      "communication": "Protocol standard Zigbee 3.0 (compatibil ZHA, Zigbee2MQTT, Tuya)",
      "torque": "Cuplu mecanic puternic de 30-60 kg.cm (rotește chiar și robinete înțepenite)",
      "close_time": "Timp de acționare completă închidere/deschidere: 5 - 8 secunde",
      "manual_override": "Inel de eliberare mecanică pentru acționare manuală în caz de pană totală de curent",
      "operating_voltage": "12V DC / 1A (Alimentator 230V inclus în pachet)",
      "linux_support": "Recunoscut instantaneu în Home Assistant via Zigbee2MQTT / ZHA"
    },
    "pinout_info": null,
    "datasheet_url": "https://www.zigbee2mqtt.io/",
    "image_url": "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
    "badge": "Anti-Inundație Automat",
    "tags": [
      "iot",
      "smart-home",
      "siguranta",
      "vana-apa",
      "zigbee",
      "anti-inundatie",
      "home-assistant"
    ],
    "rating": 4.94,
    "review_count": 27,
    "featured": false,
    "compatible_with": [
      "sonoff-zigbee-3-0-usb-dongle-plus-e",
      "home-assistant-yellow-hub-cm4-zigbee-matter-poe"
    ]
  },
  {
    "slug": "aqara-fp2-mmwave-radar-presence-sensor",
    "name": "Senzor Prezență Umană mmWave Aqara FP2 (Radar 60GHz Multi-Zone, Detecție Căderi & Lumină)",
    "sku": "AQARA-FP2-MMWAVE-SENSOR",
    "mpn": "PS-S02D",
    "category_id": 3,
    "subcategory": "Smart Home & Senzori Prezență",
    "price_ron": 389.99,
    "old_price_ron": 439.99,
    "stock": 14,
    "stock_status": "in_stock",
    "short_desc": "Senzor radar milimetric 60GHz cu cartografiere spațială: împarte camera în până la 30 de zone independente și detectează căderile persoanelor.",
    "full_desc": "Aqara FP2 revoluționează automatizările rezidențiale. Un singur senzor montat pe perete poate monitoriza o încăpere de 40 mp împărțită în zone separate (ex: zona patului, biroului, canapelei), aprinzând luminile doar acolo unde te afli și detectând prezența statică la nivel de respirație prin radar milimetric de 60GHz.",
    "technical_specs": {
      "radar_frequency": "60GHz mmWave radar cu lățime de bandă mare",
      "detection_capabilities": "Poziționare multi-persoană simultană (până la 5 persoane), până la 30 de zone configurabile, detecție căderi la sol",
      "coverage_area": "Până la 40 m² (unghi orizontal 120°, rază 8 metri)",
      "connectivity": "Wi-Fi 802.11 b/g/n 2.4GHz + Bluetooth 4.2",
      "extra_sensors": "Senzor de luminanță ambientală integrat (lux)",
      "integrations": "Apple HomeKit, Home Assistant (integrare locală HomeKit Controller), Google Home, Alexa",
      "operating_voltage": "5V USB Type-C (cablu 2m inclus)"
    },
    "pinout_info": null,
    "datasheet_url": "https://www.aqara.com/en/product/presence-sensor-fp2/",
    "image_url": "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    "badge": "Multi-Zone mmWave 60G",
    "tags": [
      "iot",
      "smart-home",
      "aqara",
      "mmwave",
      "prezenta",
      "radar",
      "homekit",
      "home-assistant"
    ],
    "rating": 4.96,
    "review_count": 33,
    "featured": true,
    "compatible_with": [
      "home-assistant-yellow-hub-cm4-zigbee-matter-poe"
    ]
  },
  {
    "slug": "cap-termostatic-inteligent-calorifer-zigbee-trv-pid",
    "name": "Cap Termostatic Inteligent pentru Calorifer Zigbee 3.0 (Ecran LED, Control PID, Home Assistant)",
    "sku": "SMARTHOME-TRV-ZIGBEE",
    "mpn": "TRV-ZB-01",
    "category_id": 3,
    "subcategory": "Smart Home Climatizare",
    "price_ron": 159.99,
    "old_price_ron": 189.99,
    "stock": 24,
    "stock_status": "in_stock",
    "short_desc": "Robinet termostatic inteligent cu motoraș silențios pas-cu-pas, ecran LED curbat rotativ, detectare geam deschis și reglaj fin PID.",
    "full_desc": "Optimizează încălzirea camerei cu o precizie de 0.5°C. Comunică direct prin Zigbee 3.0 cu Home Assistant, permițând calibrarea temperaturii din senzori externi de cameră, programe zilnice de confort și închiderea automată a caloriferului la deschiderea ferestrelor pentru o economie substanțială la facturile termice.",
    "technical_specs": {
      "communication": "Zigbee 3.0 (compatibil 100% Zigbee2MQTT și ZHA)",
      "valve_compatibility": "Filet standard M30 x 1.5mm + include adaptoare Danfoss RA/RAV/RAVL, Caleffi și Giacomini",
      "temperature_range": "5°C – 35°C (precizie setare 0.5°C)",
      "features": "Algoritm auto-adaptiv PID, funcție decalcifiere săptămânală valvă, protecție îngheț, blocare copii",
      "power_supply": "2x Baterii AA 1.5V (Autonomie până la 1.5 ani)",
      "linux_support": "Expune complet setpoint, local temperature, pi_heating_demand în Home Assistant"
    },
    "pinout_info": null,
    "datasheet_url": "https://www.zigbee2mqtt.io/",
    "image_url": "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
    "badge": "Control Termic PID",
    "tags": [
      "iot",
      "smart-home",
      "climatizare",
      "termostat",
      "trv",
      "zigbee",
      "calorifer",
      "economie-energie"
    ],
    "rating": 4.88,
    "review_count": 19,
    "featured": false,
    "compatible_with": [
      "sonoff-zigbee-3-0-usb-dongle-plus-e",
      "home-assistant-yellow-hub-cm4-zigbee-matter-poe"
    ]
  },
  {
    "slug": "gateway-industrial-modbus-rtu-rs485-la-mqtt-ethernet-waveshare",
    "name": "Gateway Industrial Modbus RTU / RS485 la MQTT & Ethernet (Șină DIN, Izolare 2.5kV)",
    "sku": "WAVESHARE-MODBUS-MQTT-GW",
    "mpn": "WS-20162",
    "category_id": 3,
    "subcategory": "Industrial IoT & Modbus",
    "price_ron": 219.99,
    "old_price_ron": 259.99,
    "stock": 18,
    "stock_status": "in_stock",
    "short_desc": "Convertor profesional bidirecțional pe șină DIN: citește registre Modbus RTU de la contoare/invertoare și publică automat JSON pe MQTT prin Ethernet.",
    "full_desc": "Puntea de legătură ideală între echipamentele industriale grele (invertoare solare fotovoltaice Huawei/Growatt, contoare trifazate Eastron SDM, pompe industriale) și platformele moderne de date (Home Assistant, InfluxDB, Grafana, Node-RED). Convertește automat registrele într-un format curat JSON transmis securizat prin Ethernet către brokerul MQTT.",
    "technical_specs": {
      "processor": "32-bit ARM Cortex-M7 de înaltă frecvență",
      "network": "Ethernet 10/100M Auto-MDIX cu conector RJ45",
      "serial_port": "RS485 industrial cu izolare galvanică completă 2.5kV și protecție ESD 15kV",
      "protocols": "Modbus RTU la Modbus TCP, MQTT Client (suport autentificare și TLS), HTTP POST, TCP/UDP Server",
      "mounting": "Carcasă ignifugă montabilă pe șină DIN de 35mm",
      "operating_voltage": "9V - 36V DC via terminal cu șurub industrial",
      "linux_support": "Compatibil cu orice broker MQTT (Mosquitto pe Linux, Home Assistant MQTT)"
    },
    "pinout_info": null,
    "datasheet_url": "https://www.waveshare.com/wiki/RS485_TO_ETH_(B)",
    "image_url": "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
    "badge": "Izolare 2.5kV Modbus",
    "tags": [
      "iot",
      "industrial-iot",
      "modbus",
      "mqtt",
      "rs485",
      "ethernet",
      "din-rail",
      "solar-inverter"
    ],
    "rating": 4.96,
    "review_count": 21,
    "featured": true,
    "compatible_with": [
      "senzor-calitate-aer-exterior-smart-city-pm-gaze-rs485-ip65"
    ]
  },
  {
    "slug": "senzor-industrial-umiditate-temperatura-sol-ec-npk-rs485-ip68",
    "name": "Senzor Industrial Umiditate, Temperatură și Conductivitate Sol (Soil Moisture / EC) RS485 Modbus",
    "sku": "AGRIIOT-SOIL-EC-TEMP-RS485",
    "mpn": "SOIL-EC-MODBUS-316L",
    "category_id": 3,
    "subcategory": "AgriTech & Environmental IoT",
    "price_ron": 199.99,
    "old_price_ron": 239.99,
    "stock": 20,
    "stock_status": "in_stock",
    "short_desc": "Sondă din oțel inoxidabil 316L cu rășină epoxidică IP68 pentru agricultură de precizie și irigații automate: măsoară umiditatea solului, temperatura și salinitatea.",
    "full_desc": "Proiectat pentru îngropare pe termen lung direct în sol, în sere, livezi sau gazon. Trei ace masive din inox 316L rezistente la coroziune măsoară dielectricul solului (umiditate volumetrică VWC 0-100%), conductivitatea electrică EC (salinitate și nivel de fertilizare) și temperatura, comunicând robust prin Modbus RS485 pe cabluri de până la 100 de metri.",
    "technical_specs": {
      "measured_parameters": "Umiditate sol VWC (0 - 100%, acuratețe ±2%), Conductivitate electrică EC (0 - 20.000 µs/cm), Temperatură sol (-40°C la +80°C)",
      "probe_material": "3 electrozi din oțel inoxidabil 316L de calitate medicală",
      "protection": "IP68 etanșat în rășină epoxidică neagră de înaltă densitate (rezistă la îngheț și îngrășăminte chimice)",
      "interface": "RS485 Modbus RTU standard (adrese și parametri configurabili)",
      "operating_voltage": "4.5V - 30V DC (Consum redus: ~15mA)",
      "cable_length": "Cablu ecranat flexibil de 2.0 metri (extensibil)",
      "linux_support": "Biblioteci gata făcute Python Modbus / ESPHome pentru irigații automate"
    },
    "pinout_info": null,
    "datasheet_url": "https://www.seeedstudio.com/",
    "image_url": "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
    "badge": "Inox 316L IP68",
    "tags": [
      "iot",
      "agritech",
      "sol",
      "umiditate-sol",
      "ec-salinitate",
      "modbus",
      "rs485",
      "irigatii"
    ],
    "rating": 4.93,
    "review_count": 15,
    "featured": false,
    "compatible_with": [
      "gateway-industrial-modbus-rtu-rs485-la-mqtt-ethernet-waveshare"
    ]
  },
  {
    "slug": "statie-meteo-ultrasonica-7-in-1-modbus-rs485-sdi12",
    "name": "Stație Meteo Ultrasonică Industrială 7-în-1 (Vânt Ultrasonic, Direcție, Precipitații, Temp, Umid, Pres, Solar)",
    "sku": "SMARTCITY-WEATHER-7IN1",
    "mpn": "WTH-US7-MODBUS",
    "category_id": 3,
    "subcategory": "Smart City & Mediu",
    "price_ron": 1499.99,
    "old_price_ron": 1699.99,
    "stock": 5,
    "stock_status": "in_stock",
    "short_desc": "Stație meteo all-in-one fără piese în mișcare (anemometru ultrasonic), imună la uzură mecanică, cu ieșire Modbus RS485 pentru Smart City și parcuri fotovoltaice.",
    "full_desc": "Spre deosebire de stațiile meteo cu cupe mecanice care îngheață iarna sau se blochează din cauza păsărilor, această stație profesională măsoară viteza și direcția vântului prin diferența de timp a impulsurilor ultrasonice pe 4 axe. Integrează de asemenea senzor optic de ploaie, radiație solară globală, presiune barometrică, temperatură și umiditate.",
    "technical_specs": {
      "sensors_integrated": "Viteză vânt ultrasonică (0-60 m/s), Direcție vânt (0-360°), Precipitații optice, Radiație solară (0-2000 W/m²), Presiune barometrică (300-1100 hPa), Temperatură (-40...+85°C), Umiditate relativă (0-100%)",
      "measurement_principle": "Tranzit ultrasonic (Fără piese în mișcare mecanică, zero mentenanță periodică)",
      "interfaces": "RS485 Modbus RTU + suport SDI-12 pentru data loggere hidrologice",
      "operating_voltage": "12V - 24V DC",
      "enclosure": "Corp masiv din policarbonat cu protecție UV și încălzire internă anti-îngheț automată",
      "linux_support": "WeeWX Weather Software, Home Assistant, Node-RED nativ"
    },
    "pinout_info": null,
    "datasheet_url": "https://weewx.com/",
    "image_url": "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
    "badge": "Anemometru Ultrasonic",
    "tags": [
      "iot",
      "smart-city",
      "statie-meteo",
      "ultrasonic",
      "vant",
      "modbus",
      "solar-energy",
      "weewx"
    ],
    "rating": 4.98,
    "review_count": 6,
    "featured": true,
    "compatible_with": [
      "gateway-industrial-modbus-rtu-rs485-la-mqtt-ethernet-waveshare"
    ]
  },
  {
    "slug": "tracker-gps-active-smart-city-lorawan-accelerometru-ip68",
    "name": "Tracker GPS/GLONASS Industrial de Active Smart City cu Rețea LoRaWAN (IP68, Baterie 5400mAh)",
    "sku": "SMARTCITY-GPS-ASSET-TRACKER",
    "mpn": "OYS-LORA-TRACK-IP68",
    "category_id": 3,
    "subcategory": "Smart City & Logistică",
    "price_ron": 299.99,
    "old_price_ron": 349.99,
    "stock": 16,
    "stock_status": "in_stock",
    "short_desc": "Dispozitiv de localizare prin satelit pentru containere de deșeuri municipale, utilaje și flote de biciclete: transmite poziția prin LoRaWAN fără cartelă GSM.",
    "full_desc": "Elimină abonamentele lunare GSM pentru monitorizarea flotelor și activelor orașului. Utilizează rețeaua gratuită sau privată LoRaWAN pentru a transmite coordonatele geografice precise. Accelerometrul 3D intern detectează mișcarea sau bascularea containerului de deșeuri, trezind dispozitivul din modul de somn adânc de ultra-redus consum.",
    "technical_specs": {
      "positioning": "GNSS multi-constelație (GPS, GLONASS, Galileo, BeiDou) cu antenă internă ceramică de mare câștig",
      "communication": "LoRaWAN Class A (Banda EU868, adaptiv data rate ADR)",
      "motion_sensor": "Accelerometru 3 axe cu detecție mișcare, vibrații, răsturnare și alertă furt",
      "battery": "Baterie internă litiu Li-SOCl2 5400mAh (Până la 5 ani autonomie cu 2 fix-uri GPS pe zi)",
      "enclosure": "Carcasă ranforsată din fibră de sticlă și policarbonat, etanșeitate completă IP68 / IK08 antivandal",
      "linux_support": "Traccar GPS tracking server compatibil, decodoare TTN / ChirpStack"
    },
    "pinout_info": null,
    "datasheet_url": "https://www.traccar.org/",
    "image_url": "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80",
    "badge": "Zero Abonament GSM",
    "tags": [
      "iot",
      "smart-city",
      "gps-tracker",
      "lorawan",
      "asset-tracking",
      "flote",
      "traccar"
    ],
    "rating": 4.92,
    "review_count": 14,
    "featured": false,
    "compatible_with": [
      "rakwireless-rak7268v2-wisgate-edge-lite-2-lorawan-gateway"
    ]
  },
  {
    "slug": "kincony-kc868-a16-esp32-din-rail-smart-home-controller",
    "name": "Placă Automatizare Industrială & Smart Home KinCony KC868-A16 (ESP32, 16 Relee, 16 DI Optoizolate, LAN Ethernet, RS485)",
    "sku": "KINCONY-KC868-A16-ESP32",
    "mpn": "KC868-A16",
    "category_id": 3,
    "subcategory": "Smart Home & Building Automation",
    "price_ron": 389.99,
    "old_price_ron": 449.99,
    "stock": 11,
    "stock_status": "in_stock",
    "short_desc": "Controler PLC open-source montabil pe șină DIN cu ESP32, 16 ieșiri pe relee (10A), 16 intrări digitale optoizolate, Ethernet RJ45 LAN, RS485 și integrare nativă ESPHome / Home Assistant.",
    "full_desc": "KinCony KC868-A16 este nucleul de vis pentru tabloul electric smart home sau proiecte industriale. Înlocuiește PLC-urile proprietare scumpe oferind libertate software completă: rulează ESPHome, Tasmota sau firmware C++ Arduino direct integrat în Home Assistant pe Ethernet fără dependență de Wi-Fi. Echipat cu 16 relee de putere, 16 intrări cu optocuploare pentru întrerupătoare de perete sau senzori inductivi, 4 intrări analogice 0-5V/4-20mA, port RS485 Modbus și ceas de timp real RTC cu baterie backup.",
    "technical_specs": {
      "mcu": "Espressif ESP32-WROOM-32E Dual-Core Xtensa LX6 @ 240MHz (4MB Flash, 520KB SRAM)",
      "skill_level": "Intermediate",
      "outputs": "16x Relee electromagnetice independente (250V AC / 10A sau 30V DC / 10A, contacte NO/COM)",
      "digital_inputs": "16x Intrări digitale optoizolate galvanic (compatibile contact uscat, 12V/24V semnal industrial)",
      "analog_inputs": "4x Intrări analogice (0-5V sau 4-20mA configurabile prin jumperi)",
      "networking": "Ethernet LAN RJ45 10/100M cu cip LAN8720 + Wi-Fi 2.4GHz 802.11b/g/n + Bluetooth 4.2 BLE",
      "industrial_bus": "Port serial RS485 cu rezistență de terminare 120Ω integrată pentru senzori Modbus RTU",
      "rtc": "Ceas hardware în timp real DS1307 cu lăcaș baterie CR1220 pentru acțiuni programate offline",
      "power_supply": "Alimentare 12V DC industrială prin bloc de borne cu șurub (< 18W consum maxim cu toate releele active)",
      "mounting": "Carcasă ignifugă montabilă direct pe șină DIN industrială standard 35mm (lățime 215mm)",
      "firmware_support": "ESPHome (configurare YAML 1-click), Tasmota, Arduino IDE, MicroPython, Home Assistant Auto-Discovery",
      "works_with_os": [
        "ESPHome",
        "Home Assistant",
        "Tasmota",
        "Node-RED",
        "OpenHAB",
        "MQTT Broker"
      ]
    },
    "pinout_info": {
      "ethernet": "LAN8720 PHY conectat pe GPIO19/GPIO21/GPIO22/GPIO25/GPIO26/GPIO27",
      "rs485": "UART2 (TX: GPIO14, RX: GPIO15, DE/RE automat)",
      "i2c": "SDA: GPIO4, SCL: GPIO5 (DS1307 RTC + PCF8574 I/O Expanders)",
      "analog": "GPIO34 (ADC1), GPIO35 (ADC2), GPIO36 (ADC3), GPIO39 (ADC4)",
      "relays": "Controlate prin expansoare I2C PCF8574T cu stare reținută la reboot"
    },
    "datasheet_url": "https://www.kincony.com/esp32-16-channel-relay-board-kc868-a16.html",
    "image_url": "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    "badge": "DIN-Rail PLC ESP32",
    "tags": [
      "iot",
      "smart-home",
      "kincony",
      "esp32",
      "esphome",
      "relee",
      "din-rail",
      "home-assistant",
      "plc",
      "modbus"
    ],
    "rating": 4.98,
    "review_count": 23,
    "featured": true,
    "compatible_with": [
      "shelly-pro-4pm-releu-4-canale-din-rail-lan-wifi",
      "home-assistant-yellow-hub-cm4-zigbee-matter-poe"
    ]
  }
];

export async function seedDatabase() {
  console.log('Seeding categories and extended products catalog...');
  const conn = await pool.getConnection();
  try {
    for (const cat of categoriesData) {
      await conn.query(
        `INSERT INTO categories (id, slug, name, icon, description, sort_order)
         VALUES (?, ?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE
           name = VALUES(name),
           icon = VALUES(icon),
           description = VALUES(description),
           sort_order = VALUES(sort_order)`,
        [cat.id, cat.slug, cat.name, cat.icon, cat.description, cat.sort_order]
      );
    }
    console.log(`Seeded/Updated ${categoriesData.length} categories.`);

    for (const prod of productsData) {
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
    console.log(`Successfully seeded/updated ${productsData.length} products.`);
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
