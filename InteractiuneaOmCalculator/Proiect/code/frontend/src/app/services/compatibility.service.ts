import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { CompatibilityIssue, CompatibilityResult } from '../models/lab-builder.model';

@Injectable({
  providedIn: 'root'
})
export class CompatibilityService {

  public evaluateCompatibility(products: Product[]): CompatibilityResult {
    if (!products || products.length === 0) {
      return {
        score: 100,
        isFullyCompatible: true,
        issues: [],
        positiveMatches: ['Adaugă componente pentru a rula verificarea automată de compatibilitate.'],
        positiveMatchesEn: ['Add components to run real-time automated compatibility checks.']
      };
    }

    if (products.length === 1) {
      return {
        score: 100,
        isFullyCompatible: true,
        issues: [],
        positiveMatches: [`${products[0].name} este validat tehnic ca echipament de sine stătător.`],
        positiveMatchesEn: [`${products[0].name} is technically validated as a standalone unit.`]
      };
    }

    const issues: CompatibilityIssue[] = [];
    const positiveMatches: string[] = [];
    const positiveMatchesEn: string[] = [];

    const slugs = products.map(p => p.slug.toLowerCase());
    const skus = products.map(p => p.sku.toLowerCase());

    // Helper finders
    const hasRpi5 = slugs.some(s => s.includes('raspberry-pi-5'));
    const hasRpi4 = slugs.some(s => s.includes('raspberry-pi-4'));
    const hasNvmeHat = slugs.some(s => s.includes('nvme-hat') || s.includes('m2-nvme') || s.includes('hat-m2'));
    const hasOfficialPsu27W = slugs.some(s => s.includes('27w') || s.includes('sursa-oficiala-raspberry-pi-5'));
    const hasStandardPsu = slugs.some(s => s.includes('15w') || s.includes('sursa-alimentare') || s.includes('usb-c-5v'));
    
    const has10gSfpSwitch = slugs.some(s => s.includes('crs305') || s.includes('crs309') || s.includes('switch-10g') || s.includes('aggregation'));
    const has10gSfpNic = slugs.some(s => s.includes('x520') || s.includes('connectx') || s.includes('sfp-plus') || s.includes('sfp+'));
    const hasDacCable = slugs.some(s => s.includes('dac') || s.includes('direct-attach') || s.includes('transceiver') || s.includes('sfp-10g-sr'));

    const hasProxmark = slugs.some(s => s.includes('proxmark'));
    const hasFlipper = slugs.some(s => s.includes('flipper-zero'));
    const hasRfidTags = slugs.some(s => s.includes('t5577') || s.includes('mifare-magic') || s.includes('rfid-tag'));

    const hasBusPirate = slugs.some(s => s.includes('bus-pirate'));
    const hasGlasgow = slugs.some(s => s.includes('glasgow'));
    const hasLogicAnalyzer = slugs.some(s => s.includes('analizor-logic') || s.includes('logic-analyzer'));
    const hasDupontWires = slugs.some(s => s.includes('dupont') || s.includes('jumper') || s.includes('cabluri-jumper'));

    const hasRackChassis = slugs.some(s => s.includes('rack') || s.includes('carcasa-rack'));
    const hasRackRails = slugs.some(s => s.includes('sine') || s.includes('rails'));

    // Check 1: Raspberry Pi 5 + NVMe HAT Power Supply requirement (27W USB-PD)
    if (hasRpi5 && hasNvmeHat) {
      if (!hasOfficialPsu27W) {
        issues.push({
          severity: 'warning',
          title: 'Alimentare insuficientă recomandată pentru RPi 5 + NVMe',
          titleEn: 'Recommended power supply may be insufficient for RPi 5 + NVMe',
          message: 'Raspberry Pi 5 echipat cu NVMe HAT PCIe consumă până la 25W sub sarcină combinată. O sursă USB-C standard de 15W limitează curentul pe periferice la 600mA și poate produce kernel panic / disk dropouts. Se recomandă sursa oficială USB-PD 27W (5.1V / 5.0A).',
          messageEn: 'Raspberry Pi 5 with an NVMe PCIe HAT draws up to 25W under load. A standard 15W PSU limits peripheral current to 600mA, causing drive dropouts. The official 27W USB-PD (5.1V 5A) power supply is strongly recommended.',
          involvedProductSlugs: products.filter(p => p.slug.includes('raspberry-pi-5') || p.slug.includes('nvme-hat')).map(p => p.slug),
          suggestedFixSku: 'PWR-RPI-27W-WHT',
          suggestedFixName: 'Sursă Oficială Raspberry Pi 5 - 27W USB-C PD Albă'
        });
      } else {
        positiveMatches.push('Sursă USB-PD 27W prezentă: asigură 5.0A la 5.1V pentru alimentarea completă a SSD-ului NVMe și perifericelor PCIe.');
        positiveMatchesEn.push('27W USB-PD PSU confirmed: supplies full 5.0A @ 5.1V for NVMe SSD and PCIe peripherals.');
      }
    }

    // Check 2: Raspberry Pi 4 + PCIe NVMe HAT (Incompatible)
    if (hasRpi4 && hasNvmeHat) {
      issues.push({
        severity: 'error',
        title: 'Incompatibilitate hardware: NVMe HAT PCIe pe Raspberry Pi 4',
        titleEn: 'Hardware Incompatibility: PCIe NVMe HAT on Raspberry Pi 4',
        message: 'Raspberry Pi 4 Model B nu dispune de magistrală PCIe FPC expusă. Acest HAT M.2 NVMe funcționează exclusiv cu Raspberry Pi 5 sau plăci RK3588 dotate cu conector flex PCIe.',
        messageEn: 'Raspberry Pi 4 Model B does not have an exposed PCIe FPC connector. This M.2 NVMe HAT is compatible exclusively with Raspberry Pi 5 or PCIe-capable SBCs.',
        involvedProductSlugs: products.filter(p => p.slug.includes('raspberry-pi-4') || p.slug.includes('nvme-hat')).map(p => p.slug)
      });
    }

    // Check 3: 10GbE SFP+ Network link validation
    if (has10gSfpSwitch && has10gSfpNic) {
      if (!hasDacCable) {
        issues.push({
          severity: 'warning',
          title: 'Lipsă cablu de interconectare 10G SFP+',
          titleEn: 'Missing 10G SFP+ interconnect cable',
          message: 'Ai selectat atât un switch 10G SFP+, cât și o placă de rețea 10G SFP+, dar lipsește mediul fizic de transmisie. Ai nevoie de un cablu Direct Attach Copper (DAC) SFP+ 10G sau 2 transceivere optice 10G-SR + fibră optică LC-LC.',
          messageEn: 'You selected both a 10G SFP+ switch and a 10G SFP+ NIC, but no physical interconnect is present. A 10G SFP+ Direct Attach Copper (DAC) cable or 10G-SR optical transceivers are required.',
          involvedProductSlugs: products.filter(p => p.slug.includes('crs305') || p.slug.includes('x520') || p.slug.includes('connectx')).map(p => p.slug),
          suggestedFixSku: 'NET-DAC-SFP10G-1M',
          suggestedFixName: 'Cablu Direct Attach Copper (DAC) SFP+ 10G - 1 Metru'
        });
      } else {
        positiveMatches.push('Interconectare 10G validată: Switch-ul și placa de rețea SFP+ au cablu compatibil DAC / transceiver optic în configurație.');
        positiveMatchesEn.push('10G interconnect validated: Switch and SFP+ NIC have compatible DAC cable / optical transceivers.');
      }
    }

    // Check 4: Pentesting / Lab synergy
    if ((hasProxmark || hasFlipper) && hasRfidTags) {
      positiveMatches.push('Ecosistem RFID/NFC complet: Cardurile Atmel T5577 (LF 125kHz) și Mifare Magic Gen2 (HF 13.56MHz) sunt 100% compatibile cu unealta de cercetare selectată.');
      positiveMatchesEn.push('Complete RFID/NFC ecosystem: T5577 (LF 125kHz) and Mifare Magic Gen2 (HF 13.56MHz) cards are 100% compatible with your selected research tool.');
    }

    // Check 5: Hardware Hacking / Probes + DuPont Jumpers
    if ((hasBusPirate || hasGlasgow || hasLogicAnalyzer) && !hasDupontWires) {
      issues.push({
        severity: 'info',
        title: 'Recomandare: Set cabluri jumper DuPont pentru sonde',
        titleEn: 'Tip: DuPont jumper wire set recommended for probes',
        message: 'Pentru conectarea facilă a pinilor de analiză I2C/SPI/UART la header-ele de test sau breadboard, se recomandă un set de cabluri flexibile pas 2.54mm.',
        messageEn: 'For easy connection of I2C/SPI/UART probe pins to target test headers, a 2.54mm pitch flexible jumper wire set is recommended.',
        involvedProductSlugs: products.filter(p => p.slug.includes('bus-pirate') || p.slug.includes('glasgow') || p.slug.includes('analizor')).map(p => p.slug),
        suggestedFixSku: 'ACC-JMP-120P-20CM',
        suggestedFixName: 'Set Cabluri Jumper DuPont 120 Bucăți (20cm, M-M, M-T, T-T)'
      });
    } else if ((hasBusPirate || hasGlasgow || hasLogicAnalyzer) && hasDupontWires) {
      positiveMatches.push('Conectică de testare completă: Sondele hardware au cabluri jumper DuPont compatibile pentru magistralele digitale.');
      positiveMatchesEn.push('Complete test interconnects: Hardware probes have compatible DuPont jumper wires for digital buses.');
    }

    // Check 6: Generic compatibility validation between products in compatible_with lists
    products.forEach(p => {
      if (p.compatible_with && p.compatible_with.length > 0) {
        p.compatible_with.forEach(targetSlug => {
          if (slugs.includes(targetSlug.toLowerCase())) {
            const targetProd = products.find(t => t.slug.toLowerCase() === targetSlug.toLowerCase());
            if (targetProd) {
              const matchMsg = `Compatibilitate verificată: ${p.name} este certificat să funcționeze direct cu ${targetProd.name}.`;
              const matchMsgEn = `Certified compatibility: ${p.name} is verified to operate with ${targetProd.name}.`;
              if (!positiveMatches.includes(matchMsg)) {
                positiveMatches.push(matchMsg);
                positiveMatchesEn.push(matchMsgEn);
              }
            }
          }
        });
      }
    });

    // Calculate score
    let score = 100;
    const errorCount = issues.filter(i => i.severity === 'error').length;
    const warningCount = issues.filter(i => i.severity === 'warning').length;

    score -= (errorCount * 35);
    score -= (warningCount * 12);
    score = Math.max(10, Math.min(100, score));

    const isFullyCompatible = errorCount === 0 && warningCount === 0;

    return {
      score,
      isFullyCompatible,
      issues,
      positiveMatches,
      positiveMatchesEn
    };
  }
}
