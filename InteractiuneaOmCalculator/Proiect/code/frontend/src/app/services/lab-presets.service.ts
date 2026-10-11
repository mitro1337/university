import { Injectable } from '@angular/core';
import { LabGoalOption, LabGoalType } from '../models/lab-builder.model';

@Injectable({
  providedIn: 'root'
})
export class LabPresetsService {
  public readonly goals: LabGoalOption[] = [
    {
      id: 'cybersecurity',
      title: 'Laborator Cybersecurity & Pentest',
      titleEn: 'Cybersecurity & Pentesting Lab',
      icon: 'security',
      description: 'Audit autorizat pentru radiofrecvență (Sub-1GHz, RFID/NFC), rețele wireless 802.11, atacuri hotplug BadUSB și inspecție hardware de magistrale.',
      descriptionEn: 'Authorized RF auditing (Sub-1GHz, RFID/NFC), 802.11 wireless security, BadUSB keystroke injection, and hardware bus debugging.',
      suggestedOs: ['Kali Linux', 'Parrot OS', 'PineappleOS', 'BlackArch'],
      recommendedSkus: {
        budget: ['SEC-ALF-036ACM', 'SEC-LOG-16CH-100M', 'SEC-RFID-TAG-PACK10'],
        balanced: ['SEC-ESP-MRD-V6', 'SEC-HK5-DUCKY-03', 'SEC-ESP-BRUCE-S3', 'SEC-BUS-PIRATE-V5'],
        performance: ['SEC-FLP-ZERO-01', 'SEC-HK5-PINE-MK7', 'SEC-HK5-SQUIRREL-01', 'SEC-CAB-TEST-OMG'],
        enterprise: ['SEC-PRX-MK3-RDV4', 'SEC-GLS-EXPLORER-01', 'SEC-NET-TAP-1G', 'SEC-HK5-TURTLE-01']
      }
    },
    {
      id: 'homelab',
      title: 'Nod / Cluster Homelab Proxmox',
      titleEn: 'Homelab Proxmox Node & Cluster',
      icon: 'compute',
      description: 'Virtualizare LXC/VM, infrastructură hiperconvergentă, interconectare de mare viteză 10GbE SFP+ și management de rețea prin MikroTik.',
      descriptionEn: 'LXC/VM virtualization, hyperconverged homelab, 10GbE SFP+ low-latency interconnects, and MikroTik network management.',
      suggestedOs: ['Proxmox VE 8.x', 'Debian 12 Bookworm', 'Ubuntu Server 24.04 LTS'],
      recommendedSkus: {
        budget: ['HL-MS01-I9', 'NET-MTK-HEX-GR3', 'PWR-MW-LRS-100-12'],
        balanced: ['HL-MS01-I9', 'NET-MTK-RB5009', 'NET-INT-X520-DA2', 'NET-DAC-SFP10G-1M'],
        performance: ['HL-MS01-I9', 'NET-MTK-CRS305', 'ENT-NIC-MCX4-25G', 'PWR-CYB-UPS-1000VA'],
        enterprise: ['ENT-SRV-R640-2U', 'NET-MTK-CRS309', 'ENT-HBA-LSI-9300-8I', 'ENT-PDU-APC-8OUT']
      }
    },
    {
      id: 'nas',
      title: 'Server de Stocare ZFS / NAS',
      titleEn: 'ZFS Storage & High-Speed NAS',
      icon: 'storage',
      description: 'Stocare resilientă TrueNAS / ZFS pool-uri, controllere HBA SAS3 IT-Mode, pool-uri all-flash NVMe și rețea dedicată 10GbE/25GbE.',
      descriptionEn: 'Resilient TrueNAS / ZFS storage pools, SAS3 IT-Mode HBA controllers, NVMe all-flash caching, and dedicated 10G/25G networking.',
      suggestedOs: ['TrueNAS SCALE', 'TrueNAS CORE', 'UnRAID', 'ZFS on Linux'],
      recommendedSkus: {
        budget: ['RPI5-8GB-EU', 'ACC-NVME-HAT-PIP', 'PWR-RPI-27W-WHT'],
        balanced: ['ENT-HBA-LSI-9300-8I', 'NET-INT-X520-DA2', 'NET-DAC-SFP10G-1M'],
        performance: ['ENT-SSD-U2-384TB', 'ENT-HBA-LSI-9300-8I', 'ENT-NIC-MCX4-25G', 'NET-MTK-CRS305'],
        enterprise: ['ENT-SRV-R640-2U', 'ENT-SSD-U2-384TB', 'ENT-HBA-LSI-9300-8I', 'PWR-CYB-UPS-1000VA']
      }
    },
    {
      id: 'router_firewall',
      title: 'Router, Firewall & Gateway Securizat',
      titleEn: 'Dedicated Router & Security Gateway',
      icon: 'network',
      description: 'Routing inter-VLAN la viteză de linie, inspecție pachete OPNsense/pfSense, failover dual-WAN și segmentare IoT.',
      descriptionEn: 'Line-rate inter-VLAN routing, OPNsense/pfSense packet inspection, dual-WAN failover, and strict IoT network isolation.',
      suggestedOs: ['OPNsense', 'pfSense', 'MikroTik RouterOS v7', 'OpenWrt'],
      recommendedSkus: {
        budget: ['NET-MTK-HEX-GR3', 'NET-CAB-CAT6-PATCH'],
        balanced: ['NET-MTK-RB5009', 'NET-DAC-SFP10G-1M', 'NET-CAB-CAT6-PATCH'],
        performance: ['NET-UBI-UDM-SE', 'NET-MTK-CRS305', 'NET-DAC-SFP10G-1M'],
        enterprise: ['NET-MTK-CRS309', 'NET-UBI-USW-PRO-24', 'ENT-PDU-APC-8OUT']
      }
    },
    {
      id: 'kubernetes',
      title: 'Cluster Kubernetes & Edge Containers',
      titleEn: 'Kubernetes Cluster & Edge Microservices',
      icon: 'k8s',
      description: 'Cluster multi-nod K3s/Talos Linux pe SBC-uri cu alimentare PoE centralizată și rețea izolată pentru ingress controller.',
      descriptionEn: 'Multi-node K3s/Talos Linux cluster running on ARM/RISC-V SBCs with centralized PoE power and isolated ingress networking.',
      suggestedOs: ['Talos Linux', 'k3s on Alpine', 'Ubuntu Core', 'Flatcar Container Linux'],
      recommendedSkus: {
        budget: ['RPI5-4GB-EU', 'PWR-RPI-27W-WHT', 'NET-CAB-CAT6-PATCH'],
        balanced: ['RPI5-8GB-EU', 'ACC-NVME-HAT-PIP', 'PWR-RPI-27W-WHT', 'NET-MTK-HEX-GR3'],
        performance: ['RPI5-8GB-EU', 'NIC-RK3588-ROCK5B', 'NET-MTK-RB5009', 'NET-DAC-SFP10G-1M'],
        enterprise: ['HL-MS01-I9', 'NET-MTK-CRS305', 'ENT-NIC-MCX4-25G', 'PWR-CYB-UPS-1000VA']
      }
    },
    {
      id: 'iot',
      title: 'Home Automation & IoT Gateway',
      titleEn: 'Smart Home Hub & IoT Telemetry',
      icon: 'iot',
      description: 'Instanță Home Assistant locală (Zero Cloud), antenă Zigbee 3.0 / Thread Matter, senzori de mediu I2C și relee industriale.',
      descriptionEn: 'Local Zero-Cloud Home Assistant hub, Zigbee 3.0 / Thread Matter coordinator, I2C environmental sensors, and industrial relays.',
      suggestedOs: ['Home Assistant OS (HAOS)', 'ESPHome', 'Tasmota', 'Zigbee2MQTT'],
      recommendedSkus: {
        budget: ['ESP32-WROOM-32D', 'IOT-SN-BME280-I2C', 'IOT-RL-SSR-40DA'],
        balanced: ['RPI5-4GB-EU', 'IOT-SN-BME280-I2C', 'IOT-SN-SCD40-CO2', 'ACC-JMP-120P-20CM'],
        performance: ['RPI5-8GB-EU', 'ACC-NVME-HAT-PIP', 'IOT-SN-SCD40-CO2', 'IOT-MOD-RS485-IND'],
        enterprise: ['HL-MS01-I9', 'IOT-SN-SCD40-CO2', 'IOT-MOD-RS485-IND', 'PWR-CYB-UPS-1000VA']
      }
    },
    {
      id: 'os_development',
      title: 'Dezvoltare OS & Embedded Reverse Engineering',
      titleEn: 'OS Development & Reverse Engineering Lab',
      icon: 'embedded',
      description: 'Platformă pentru scriere de bootloadere, kernel development ARM64/RISC-V, extragere firmware EEPROM și depanare JTAG/SWD.',
      descriptionEn: 'Bare-metal bootloader experimentation, ARM64/RISC-V kernel hacking, SPI flash dumping, and hardware JTAG/SWD debug probes.',
      suggestedOs: ['Custom Kernel / U-Boot', 'FreeBSD', 'Linux Mainline', 'Zephyr RTOS'],
      recommendedSkus: {
        budget: ['NIC-RPI-RP2040-PICO', 'ACC-JMP-120P-20CM', 'ACC-BB-830-TIE'],
        balanced: ['NIC-RPI-RP2040-PICO', 'SEC-BUS-PIRATE-V5', 'SEC-LOG-16CH-100M', 'ACC-JMP-120P-20CM'],
        performance: ['NIC-RV-MILKV-DUO', 'SEC-BUS-PIRATE-V5', 'SEC-GLS-EXPLORER-01', 'NIC-RK3588-ROCK5B'],
        enterprise: ['NIC-RV-STARFIVE-JH7110', 'SEC-GLS-EXPLORER-01', 'SEC-PRX-MK3-RDV4', 'NIC-RK3588-ROCK5B']
      }
    },
    {
      id: 'sdr_rf',
      title: 'Laborator Software Defined Radio (SDR)',
      titleEn: 'Software Defined Radio & RF Research',
      icon: 'rf',
      description: 'Recepție și transmisie semnale radio 1MHz–6GHz, analiză protocoale LoRa/Zigbee, captură ADS-B și decodare telemetrie satelitară.',
      descriptionEn: '1MHz–6GHz RF transceiver capabilities, LoRa/Zigbee protocol analysis, ADS-B flight tracking, and weather satellite telemetry decoding.',
      suggestedOs: ['DragonOS', 'GNU Radio Companion', 'SDR++', 'GQRX'],
      recommendedSkus: {
        budget: ['NIC-SDR-RTL-V4', 'SEC-ALF-036ACM'],
        balanced: ['NIC-SDR-RTL-V4', 'SEC-ESP-BRUCE-S3', 'SEC-FLP-ZERO-01'],
        performance: ['NIC-SDR-HACKRF-ONE', 'NIC-SDR-RTL-V4', 'SEC-FLP-ZERO-01'],
        enterprise: ['NIC-SDR-HACKRF-ONE', 'SEC-FLP-ZERO-01', 'SEC-GLS-EXPLORER-01', 'HL-MS01-I9']
      }
    }
  ];
}
