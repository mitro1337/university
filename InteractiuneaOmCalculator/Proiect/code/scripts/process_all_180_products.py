import os
import sys
import json
import time
import re
import urllib.request
import urllib.parse
import io
import collections
from PIL import Image, ImageFilter

OUTPUT_DIR = 'frontend/public/images/products'
os.makedirs(OUTPUT_DIR, exist_ok=True)

HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8'
}

def download_image(url):
    req = urllib.request.Request(url, headers=HEADERS)
    with urllib.request.urlopen(req, timeout=12) as res:
        return res.read()

def bing_search_image(query):
    query = re.sub(r'[^a-zA-Z0-9\s\.\-]', ' ', query)
    query = re.sub(r'\s+', ' ', query).strip()
    url = f'https://www.bing.com/images/search?q={urllib.parse.quote(query)}&first=1&scenario=ImageBasicHover'
    req = urllib.request.Request(url, headers=HEADERS)
    try:
        with urllib.request.urlopen(req, timeout=8) as res:
            text = res.read().decode('utf-8', errors='ignore')
            murls = re.findall(r'murl&quot;:&quot;(https://[^&]+)&quot;', text)
            for m in murls:
                m_low = m.lower()
                if not any(bad in m_low for bad in ['shutterstock', 'alamy', 'dreamstime', 'istock', '123rf', 'stockphoto', 'vectorstock', 'lookaside']):
                    return m
    except Exception as e:
        pass
    return None

def wikimedia_search_image(query):
    query = re.sub(r'[^a-zA-Z0-9\s]', ' ', query)
    query = re.sub(r'\s+', ' ', query).strip()
    url = f'https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrnamespace=6&gsrlimit=3&prop=imageinfo&iiprop=url&gsrsearch={urllib.parse.quote(query)}'
    req = urllib.request.Request(url, headers={'User-Agent': 'VexeraBot/1.0 (contact@vexera.ro)'})
    try:
        with urllib.request.urlopen(req, timeout=6) as res:
            data = json.load(res)
            pages = data.get('query', {}).get('pages', {})
            for pid, p in pages.items():
                info = p.get('imageinfo', [{}])[0]
                u = info.get('url')
                if u and any(u.lower().endswith(ext) for ext in ['.jpg', '.jpeg', '.png']):
                    return u
    except Exception:
        pass
    return None

def transparentize(img):
    img = img.convert('RGBA')
    w, h = img.size
    
    # Check if image already has native transparency
    extrema = img.getextrema()
    if len(extrema) == 4 and extrema[3][0] < 50:
        bbox = img.getbbox()
        if bbox:
            left, top, right, bottom = bbox
            pad = 8
            img = img.crop((max(0, left - pad), max(0, top - pad), min(w, right + pad), min(h, bottom + pad)))
        return img
        
    pixels = img.load()
    mask = Image.new('L', (w, h), 255)
    mask_pixels = mask.load()
    
    sample_points = [
        (0, 0), (w - 1, 0), (0, h - 1), (w - 1, h - 1),
        (w // 2, 0), (w // 2, h - 1), (0, h // 2), (w - 1, h // 2)
    ]
    corner_colors = [pixels[pt] for pt in sample_points]
    avg_r = sum(c[0] for c in corner_colors) / len(corner_colors)
    avg_g = sum(c[1] for c in corner_colors) / len(corner_colors)
    avg_b = sum(c[2] for c in corner_colors) / len(corner_colors)
    
    visited = bytearray(w * h)
    queue = collections.deque()
    
    for x in range(w):
        queue.append((x, 0))
        queue.append((x, h - 1))
        visited[0 * w + x] = 1
        visited[(h - 1) * w + x] = 1
    for y in range(h):
        queue.append((0, y))
        queue.append((w - 1, y))
        visited[y * w + 0] = 1
        visited[y * w + (w - 1)] = 1
        
    is_white_bg = (avg_r > 215 and avg_g > 215 and avg_b > 215)
    min_lum = 224
    max_lum = 250
    tol_sq = 34 ** 2
    
    while queue:
        x, y = queue.popleft()
        r, g, b, _ = pixels[x, y]
        
        if is_white_bg:
            lum = 0.299 * r + 0.587 * g + 0.114 * b
            if lum >= min_lum:
                if lum >= max_lum:
                    mask_pixels[x, y] = 0
                else:
                    factor = (max_lum - lum) / (max_lum - min_lum)
                    mask_pixels[x, y] = int(255 * factor)
                    
                for nx, ny in ((x+1, y), (x-1, y), (x, y+1), (x, y-1)):
                    if 0 <= nx < w and 0 <= ny < h:
                        idx = ny * w + nx
                        if not visited[idx]:
                            visited[idx] = 1
                            queue.append((nx, ny))
        else:
            dist_sq = (r - avg_r)**2 + (g - avg_g)**2 + (b - avg_b)**2
            if dist_sq <= tol_sq:
                mask_pixels[x, y] = 0
                for nx, ny in ((x+1, y), (x-1, y), (x, y+1), (x, y-1)):
                    if 0 <= nx < w and 0 <= ny < h:
                        idx = ny * w + nx
                        if not visited[idx]:
                            visited[idx] = 1
                            queue.append((nx, ny))
                            
    img.putalpha(mask)
    
    bbox = img.getbbox()
    if bbox:
        left, top, right, bottom = bbox
        pad = 10
        img = img.crop((max(0, left - pad), max(0, top - pad), min(w, right + pad), min(h, bottom + pad)))
        
    return img

def clean_device_name(name):
    cleaned = re.sub(r'\(.*?\)|\[.*?\]', '', name).strip()
    prefixes = [
        'Server Rack 1U ', 'Server Rack 2U ', 'Adaptor Wi-Fi ', 'Kit Profesional Flashing ',
        'Senzor Prezență Umană mmWave ', 'Releu Inteligent ', 'Placă Automatizare Industrială ',
        'Panou Patch Panel ', 'Unitate PDU Rackmount ', 'Senzor Calitate Aer Exterior ',
        'Senzor Radar Microunde Monitorizare Trafic și Viteză Vehicule ',
        'Controler Inteligent Iluminat Public ', 'Contor Inteligent de Apă ',
        'Vană Inteligentă Motorizată de Apă / Gaz cu Închidere Automată la Inundație ',
        'Cap Termostatic Inteligent pentru Calorifer ', 'Gateway Industrial ',
        'Senzor Industrial Umiditate, Temperatură și Conductivitate Sol ',
        'Stație Meteo Ultrasonică Industrială ', 'Tracker GPS/GLONASS Industrial de Active ',
        'Clește Test ', 'Cablu Dedicat SPI Flashing ', 'Placă de Dezvoltare ', 'Modul ',
        'Placă de Bază ', 'Sursă Alimentare '
    ]
    for p in prefixes:
        cleaned = cleaned.replace(p, '')
    cleaned = re.sub(r'[^a-zA-Z0-9\s\.\-]', ' ', cleaned)
    cleaned = re.sub(r'\s+', ' ', cleaned).strip()
    return cleaned

def get_product_search_terms(prod):
    slug = prod['slug']
    name = prod['name']
    cname = clean_device_name(name)
    
    slug_keywords = {
        'apple-iphone-7-a10-fusion-linux-dev-node': 'iPhone 7 black front',
        'apple-ipad-6th-gen-a10-linux-workstation': 'iPad 6th Gen space gray',
        'apple-ipad-pro-105-a10x-fusion-6-core': 'iPad Pro 10.5 space gray',
        'apple-ipod-touch-7th-gen-a10-linux-dev': 'iPod touch 7th gen space gray',
        'apple-iphone-7-plus-128gb-a10-linux-testbed': 'iPhone 7 Plus black front',
        'apple-tv-4k-1st-gen-a10x-headless-node': 'Apple TV 4K box remote',
        'eaton-epdu-g3-managed-16a': 'Eaton ePDU G3 Managed 16A',
        'raritan-dominion-kx-iii-8-port-kvm-ip': 'Raritan Dominion KX III KVM',
        'sipeed-tang-primer-20k-fpga-kit': 'Tang Primer 20K FPGA',
        'digilent-pynq-z2-xilinx-zynq-board': 'PYNQ Z2 board Xilinx',
        'tigard-multi-protocol-hardware-debug-probe': 'Tigard debug probe hardware',
        'black-magic-probe-v2-3-swd-jtag': 'Black Magic Probe JTAG SWD',
        'kioxia-cd6-r-384tb-u2-nvme-ssd': 'Kioxia CD6 R U2 NVMe SSD',
        'switch-zyxel-gs1200-8': 'Zyxel GS1200 8 switch',
        'cablu-dac-10g-sfp-1m': '10G SFP DAC cable 1m',
        'senzor-distanta-laser-tof-vl53l0x': 'VL53L0X TOF laser sensor breakout',
        'senzor-curent-tensiune-ti-ina219': 'INA219 current sensor breakout',
        'senzor-particule-praf-laser-pms5003': 'Plantower PMS5003 laser sensor',
        'sursa-industriala-mean-well-lrs-100-12': 'Mean Well LRS 100 12 power supply',
        'panou-rack-1u-4x-raspberry-pi': '1U 19 inch rack mount 4x Raspberry Pi',
        'milkv-duo-cv1800b-risc-v-micro-sbc-64mb': 'Milk-V Duo CV1800B RISC-V',
        'radxa-zero-3w-4gb-quad-core-wifi6': 'Radxa Zero 3W board',
        'banana-pi-bpi-r3-wifi-6-router-sbc': 'Banana Pi BPI R3 router',
        'libre-computer-aml-s905x-cc-le-potato-2gb': 'Le Potato Libre Computer SBC',
        'pine64-quartz64-model-a-8gb-rk3566': 'Quartz64 Model A Pine64',
        'milkv-mars-riscv-sbc-8gb-ram': 'Milk-V Mars RISC-V SBC',
        'lichee-pi-4a-th1520-quad-riscv-16gb': 'Lichee Pi 4A RISC-V SBC',
        'wch-ch32v003-riscv-dev-kit-10pk': 'WCH CH32V003 development board',
        'tang-nano-9k-gowin-fpga-hdmi-kit': 'Tang Nano 9K Gowin FPGA',
        'lattice-icestick-ice40hx1k-open-source-fpga': 'Lattice iCEstick USB FPGA',
        'digilent-basys-3-artix-7-fpga-trainer-board': 'Digilent Basys 3 Artix 7 FPGA',
        'beaglebone-black-rev-c-ti-am3358-real-time': 'BeagleBone Black Rev C',
        'raspberry-pi-debug-probe-cmsis-dap-uart': 'Raspberry Pi Debug Probe',
        'segger-jlink-edu-mini-debug-probe': 'SEGGER J Link EDU Mini',
        'dslogic-plus-16ch-400mhz-usb-logic-analyzer': 'DSLogic Plus USB Logic Analyzer',
        'total-phase-beagle-usb-480-protocol-analyzer': 'Total Phase Beagle USB 480',
        'canable-2-pro-isolated-usb-can-fd-adapter': 'CANable 2.0 Pro USB CAN',
        'limesdr-mini-2-0-full-duplex-sdr-transceiver': 'LimeSDR Mini 2.0',
        'heltec-wifi-lora-32-v3-esp32s3-sx1262': 'Heltec WiFi LoRa 32 V3',
        'lilygo-t-beam-esp32-lora-868-gps-neo6m': 'LilyGO T-Beam ESP32 LoRa GPS',
        'coral-m2-dual-edge-tpu-8tops-ekey': 'Google Coral M2 Dual Edge TPU',
        'raspberry-pi-ai-hat-plus-26-tops-hailo8': 'Raspberry Pi AI HAT Hailo 8',
        'intel-neural-compute-stick-2-myriad-x-refurb': 'Intel Neural Compute Stick 2',
        'yard-stick-one-sub-1ghz-wireless-transceiver': 'Yard Stick One Great Scott Gadgets',
        'alfa-network-awus036acm-monitor-mode-adapter': 'Alfa AWUS036ACM Wi-Fi adapter',
        'bus-pirate-v5-hardware-hacking-tool': 'Bus Pirate v5 hardware tool',
        'glasgow-interface-explorer-hardware-tool': 'Glasgow Interface Explorer tool',
        'analizor-logic-usb-16-canale-100mhz': 'USB logic analyzer 16 channel 100MHz',
        'dual-gigabit-hardware-network-tap': 'Dual gigabit network TAP hardware',
        'tester-detector-cabluri-malitioase-omg': 'OMG cable tester hardware',
        'pachet-10x-carduri-taguri-t5577-mifare-magic': 'T5577 RFID cards keyfobs',
        'esp32-marauder-v6-pocket-board': 'ESP32 Marauder v6 board',
        'bruce-esp32-s3-multi-tool-board': 'Bruce ESP32 S3 board',
        'proxmark3-rdv401-research-kit': 'Proxmark3 RDV4.01 kit',
        'chameleon-ultra-pocket-rfid-nfc-emulator': 'ChameleonUltra RFID NFC emulator',
        'flipper-zero-wifi-devboard-esp32s2-marauder': 'Flipper Zero WiFi Devboard',
        'flipper-zero-video-game-module-rp2040-dvi': 'Flipper Zero Video Game Module',
        'dell-poweredge-r740-2u-2x-xeon-gold-128gb-ecc-refurb': 'Dell PowerEdge R740 2U server',
        'dell-optiplex-7070-micro-tiny-pc-i5-16gb-nvme': 'Dell OptiPlex 7070 Micro',
        'nvidia-tesla-t4-16gb-gddr6-pcie-passive-gpu-refurb': 'NVIDIA Tesla T4 GPU',
        'wd-red-plus-8tb-nas-hdd-cmr-5640rpm': 'WD Red Plus 8TB NAS HDD',
        'crucial-32gb-2x16gb-ddr4-3200-sodimm-kit': 'Crucial 32GB DDR4 3200 SODIMM kit',
        'patch-panel-19-inch-1u-24-porturi-keystone-ecranat': '1U 24 port Cat6A patch panel keystone',
        'pdu-rackmount-19-inch-1u-8-prize-schuko-protectie': '1U 19 inch PDU 8 Schuko',
        'hilink-hlk-ld2410c-24ghz-mmwave-presence-radar': 'HLK LD2410C 24GHz mmWave radar',
        'apple-macbook-air-13-m1-asahi-linux': 'MacBook Air M1 space gray open front',
        'apple-macbook-pro-13-m1-asahi-linux': 'MacBook Pro 13 M1 space gray open',
        'apple-macbook-air-13-m2-asahi-linux': 'MacBook Air M2 midnight space gray',
        'apple-macbook-pro-14-m2-pro-asahi-linux': 'MacBook Pro 14 M2 Pro space gray',
        'lenovo-thinkpad-t440p-coreboot-modular-quad-i7': 'Lenovo ThinkPad T440p open front',
        'lenovo-thinkpad-x200-libreboot-ryf-certified': 'Lenovo ThinkPad X200 open front',
        'lenovo-thinkpad-t480-quad-core-privacy-coreboot-ready': 'Lenovo ThinkPad T480 open front',
        'kit-profesional-flashing-coreboot-pomona-5250': 'CH341A Pomona 5250 SOIC8 programmer',
        'cleste-test-soic16-pomona-5252-cabluri': 'Pomona 5252 SOIC16 test clip',
        'cablu-dedicat-spi-flashing-raspberry-pi-coreboot': 'SPI flashing cable SOIC8',
        'google-pixel-8-pro-128gb-grapheneos-hardened': 'Google Pixel 8 Pro Obsidian front',
        'google-pixel-8-128gb-grapheneos-hardened': 'Google Pixel 8 Obsidian front',
        'google-pixel-7a-128gb-grapheneos-privacy-phone': 'Google Pixel 7a Charcoal front',
        'google-pixel-6a-128gb-grapheneos-burner-phone': 'Google Pixel 6a Charcoal front',
        'rakwireless-rak7268v2-wisgate-edge-lite-2-lorawan-gateway': 'RAK7268V2 WisGate Edge Lite 2',
        'seeed-sensecap-s2100-lorawan-data-logger-ip66': 'Seeed SenseCAP S2100 LoRaWAN',
        'senzor-calitate-aer-exterior-smart-city-pm-gaze-rs485-ip65': 'Outdoor air quality sensor RS485 IP65',
        'senzor-radar-microunde-trafic-viteza-vehicule-24ghz-modbus': '24GHz microwave radar traffic sensor RS485',
        'controler-inteligent-iluminat-public-lorawan-nema-dali': 'LoRaWAN streetlight controller NEMA',
        'contor-inteligent-apa-smart-city-lorawan-ultrasonic-dn20': 'Ultrasonic water meter LoRaWAN DN20',
        'shelly-pro-4pm-4-channel-din-rail-smart-switch-lan-color-screen': 'Shelly Pro 4PM DIN rail switch',
        'vana-inteligenta-motorizata-apa-gaz-zigbee-inchidere-automata': 'Smart motorized water gas valve Zigbee',
        'cap-termostatic-inteligent-calorifer-zigbee-trv-pid': 'Smart radiator thermostat valve Zigbee TRV',
        'gateway-industrial-modbus-rtu-rs485-la-mqtt-ethernet-waveshare': 'Waveshare Modbus RTU RS485 to MQTT Ethernet gateway',
        'senzor-industrial-umiditate-temperatura-sol-ec-npk-rs485-ip68': 'Soil moisture temperature EC sensor RS485 Modbus',
        'statie-meteo-ultrasonica-7-in-1-modbus-rs485-sdi12': 'Ultrasonic weather station 7 in 1 RS485',
        'tracker-gps-active-smart-city-lorawan-accelerometru-ip68': 'Industrial LoRaWAN GPS asset tracker IP68',
        'kincony-kc868-a16-esp32-din-rail-smart-home-controller': 'KinCony KC868 A16 ESP32 relay board',
        'intel-x520-da2-10gbe-dual-port-pcie': 'Intel X520-DA2 10GbE SFP PCIe',
        'mini-pc-homelab-intel-n100-4x25gbe': 'Intel N100 4x 2.5GbE Mini PC homelab'
    }
    
    if slug in slug_keywords:
        return [slug_keywords[slug] + ' white background', slug_keywords[slug]]
        
    return [cname + ' white background', cname]

def main():
    with open('all_products.json') as f:
        products = json.load(f)
        
    hak5 = []
    if os.path.exists('hak5_products.json'):
        with open('hak5_products.json') as f:
            hak5 = json.load(f)
            
    lab401 = []
    if os.path.exists('lab401_products.json'):
        with open('lab401_products.json') as f:
            lab401 = json.load(f)
            
    print(f"Total products to verify: {len(products)}")
    
    success_count = 0
    skipped_count = 0
    failed_count = 0
    
    for idx, prod in enumerate(products):
        slug = prod['slug']
        existing_url = prod.get('image_url', '')
        out_file = os.path.join(OUTPUT_DIR, f"{slug}.png")
        
        # Check if already generated and valid
        if os.path.exists(out_file) and os.path.getsize(out_file) > 12000:
            skipped_count += 1
            continue
            
        print(f"[{idx+1}/{len(products)}] Processing: {slug}")
        
        raw_data = None
        
        # Sourced vendor image
        if existing_url and 'unsplash' not in existing_url and existing_url.startswith('http'):
            try:
                raw_data = download_image(existing_url)
                print(f"  -> Downloaded existing vendor URL ({len(raw_data)} bytes)")
            except Exception as e:
                print(f"  -> Existing URL failed ({e}), searching online...")
                raw_data = None

        # Vendor catalog check
        if not raw_data:
            s_lower = slug.lower()
            if any(k in s_lower for k in ['pineapple', 'ducky', 'turtle', 'squirrel', 'shark-jack', 'plunder-bug']):
                for h in hak5:
                    ht = h['title'].lower()
                    if ('pineapple' in s_lower and 'pineapple' in ht and 'pager' not in ht and 'mod' not in ht) or \
                       ('ducky' in s_lower and 'rubber ducky' in ht and 'student' not in ht and 'desk' not in ht) or \
                       ('shark-jack' in s_lower and 'shark jack' in ht and 'student' not in ht and 'cable' not in ht and 'guide' not in ht) or \
                       ('plunder-bug' in s_lower and 'plunder bug' in ht and 'patch' not in ht) or \
                       ('turtle' in s_lower and 'lan turtle' in ht and 'student' not in ht and 'desk' not in ht and 'hub' not in ht) or \
                       ('squirrel' in s_lower and 'packet squirrel' in ht and 'student' not in ht and 'desk' not in ht):
                        if h.get('images'):
                            try:
                                raw_data = download_image(h['images'][0]['src'])
                                print(f"  -> Matched Hak5 catalog: {h['title']}")
                                break
                            except Exception:
                                pass
                                
            if not raw_data and any(k in s_lower for k in ['flipper', 'proxmark', 'chameleon']):
                for l in lab401:
                    lt = l['title'].lower()
                    if ('flipper-zero-portable' in s_lower and 'flipper zero' in lt and 'case' not in lt and 'microsd' not in lt) or \
                       ('flipper-zero-wifi' in s_lower and 'wifi' in lt and 'board' in lt) or \
                       ('flipper-zero-video' in s_lower and 'video game' in lt) or \
                       ('proxmark3' in s_lower and 'proxmark' in lt) or \
                       ('chameleon' in s_lower and 'chameleon' in lt):
                        if l.get('images'):
                            try:
                                raw_data = download_image(l['images'][0]['src'])
                                print(f"  -> Matched Lab401 catalog: {l['title']}")
                                break
                            except Exception:
                                pass

        # Secondary image fallback
        if not raw_data:
            search_terms = get_product_search_terms(prod)
            for st in search_terms:
                print(f"  -> Bing Searching: '{st}'")
                found_url = bing_search_image(st)
                if found_url:
                    try:
                        raw_data = download_image(found_url)
                        print(f"  -> Found via Bing: {found_url[:70]} ({len(raw_data)} bytes)")
                        break
                    except Exception as e:
                        print(f"  -> Download failed ({e})")
                time.sleep(0.2)
                
            if not raw_data:
                # Try Wikimedia Commons
                for st in search_terms:
                    wiki_url = wikimedia_search_image(st)
                    if wiki_url:
                        try:
                            raw_data = download_image(wiki_url)
                            print(f"  -> Found via Wikimedia: {wiki_url[:70]}")
                            break
                        except Exception:
                            pass

        if not raw_data:
            print(f"  [FAILED] Could not find photo for {slug}")
            failed_count += 1
            continue

        # Transparentize and save
        try:
            im = Image.open(io.BytesIO(raw_data))
            processed = transparentize(im)
            processed.save(out_file, format='PNG', optimize=True)
            print(f"  [SAVED] {out_file} ({os.path.getsize(out_file):,} bytes, size: {processed.size})")
            success_count += 1
        except Exception as e:
            print(f"  [PROCESSING ERROR] {slug}: {e}")
            failed_count += 1
            
        time.sleep(0.15)

    print(f"\n==========================================")
    print(f"Image pipeline run complete!")
    print(f"Success: {success_count}, Skipped (already generated): {skipped_count}, Failed: {failed_count}")
    print(f"==========================================")

if __name__ == '__main__':
    main()
