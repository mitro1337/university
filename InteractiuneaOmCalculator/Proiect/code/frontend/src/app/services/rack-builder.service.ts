import { Injectable, signal, computed } from '@angular/core';
import { RackSlot, RackUnitItem } from '../models/lab-builder.model';

export const CATALOG_RACK_ITEMS: RackUnitItem[] = [
  {
    id: 'rack-patch-1u',
    name: 'Patch Panel Cat6 24 Porturi 1U UTP',
    uSize: 1,
    category: 'patch_panel',
    productSlug: 'patch-panel-cat6-24-porturi-1u',
    powerWatts: 0,
    weightKg: 0.9,
    depthMm: 110,
    colorHex: '#334155'
  },
  {
    id: 'rack-sw-mtk-1u',
    name: 'Switch MikroTik CRS309-1G-8S+IN 10G SFP+ (1U Rack)',
    uSize: 1,
    category: 'switch',
    productSlug: 'mikrotik-crs309-1g-8s-in-switch-10g',
    powerWatts: 21,
    weightKg: 1.8,
    depthMm: 180,
    colorHex: '#1e293b'
  },
  {
    id: 'rack-shelf-rpi-1u',
    name: 'Tavă Rack 1U pentru 4x Raspberry Pi 5 / Mini PC',
    uSize: 1,
    category: 'shelf',
    productSlug: 'raspberry-pi-5-8gb',
    powerWatts: 45,
    weightKg: 2.2,
    depthMm: 250,
    colorHex: '#475569'
  },
  {
    id: 'rack-pdu-1u',
    name: 'Unitate PDU APC 1U Rackmount 8 Prize Schuko C13',
    uSize: 1,
    category: 'pdu',
    productSlug: 'apc-pdu-1u-rackmount-8-outlets',
    powerWatts: 5,
    weightKg: 2.1,
    depthMm: 140,
    colorHex: '#0f172a'
  },
  {
    id: 'rack-srv-dell-1u',
    name: 'Server Enterprise Dell PowerEdge R640 1U Dual Xeon',
    uSize: 1,
    category: 'server',
    productSlug: 'dell-poweredge-r640-1u-dual-xeon',
    powerWatts: 240,
    weightKg: 15.5,
    depthMm: 700,
    colorHex: '#0284c7'
  },
  {
    id: 'rack-nas-2u',
    name: 'Șasiu Stocare ZFS TrueNAS 2U 12-Bay SAS3',
    uSize: 2,
    category: 'nas',
    productSlug: 'lsi-broadcom-sas-9300-8i-12gbps-hba',
    powerWatts: 180,
    weightKg: 22.0,
    depthMm: 650,
    colorHex: '#d97706'
  },
  {
    id: 'rack-ups-2u',
    name: 'UPS CyberPower 1000VA / 900W 2U Rackmount Sinus Pur',
    uSize: 2,
    category: 'ups',
    productSlug: 'cyberpower-ups-rackmount-1000va-sinus-pur',
    powerWatts: 35,
    weightKg: 18.2,
    depthMm: 430,
    colorHex: '#10b981'
  }
];

@Injectable({
  providedIn: 'root'
})
export class RackBuilderService {
  public totalUnits = signal<number>(12); // Default 12U rack
  public slots = signal<(RackUnitItem | null)[]>(new Array(12).fill(null));

  public usedUnits = computed(() => {
    return this.slots().filter(s => s !== null).length;
  });

  public freeUnits = computed(() => {
    return this.totalUnits() - this.usedUnits();
  });

  public totalPowerWatts = computed(() => {
    return this.slots().reduce((acc, item) => acc + (item ? item.powerWatts : 0), 0);
  });

  public totalWeightKg = computed(() => {
    return this.slots().reduce((acc, item) => acc + (item ? item.weightKg : 0), 0);
  });

  public setRackSize(size: number): void {
    const current = this.slots();
    const newSlots = new Array(size).fill(null);
    for (let i = 0; i < Math.min(size, current.length); i++) {
      newSlots[i] = current[i];
    }
    this.totalUnits.set(size);
    this.slots.set(newSlots);
  }

  public placeItem(slotIndex: number, item: RackUnitItem): boolean {
    const current = [...this.slots()];
    const uSize = item.uSize;

    // Check if slot and subsequent slots are inside rack bounds
    if (slotIndex + uSize > current.length) {
      return false;
    }

    // Assign to slot
    for (let i = 0; i < uSize; i++) {
      current[slotIndex + i] = item;
    }

    this.slots.set(current);
    return true;
  }

  public removeItem(slotIndex: number): void {
    const current = [...this.slots()];
    const targetItem = current[slotIndex];
    if (!targetItem) return;

    // Remove all consecutive slots holding this exact item instance
    for (let i = 0; i < current.length; i++) {
      if (current[i] && current[i]?.id === targetItem.id && Math.abs(i - slotIndex) < targetItem.uSize) {
        current[i] = null;
      }
    }
    this.slots.set(current);
  }

  public clearRack(): void {
    this.slots.set(new Array(this.totalUnits()).fill(null));
  }

  public loadSampleHomelabRack(): void {
    this.setRackSize(12);
    const slots = new Array(12).fill(null);
    slots[0] = CATALOG_RACK_ITEMS[0]; // U1 Patch Panel
    slots[1] = CATALOG_RACK_ITEMS[1]; // U2 MikroTik 10G Switch
    slots[2] = CATALOG_RACK_ITEMS[2]; // U3 1U Raspberry Pi Cluster
    slots[3] = CATALOG_RACK_ITEMS[3]; // U4 1U APC PDU
    slots[4] = CATALOG_RACK_ITEMS[4]; // U5 1U Dell R640 Server
    slots[5] = CATALOG_RACK_ITEMS[5]; // U6-U7 2U TrueNAS NAS
    slots[6] = CATALOG_RACK_ITEMS[5];
    slots[10] = CATALOG_RACK_ITEMS[6]; // U11-U12 2U CyberPower UPS
    slots[11] = CATALOG_RACK_ITEMS[6];
    this.slots.set(slots);
  }
}
