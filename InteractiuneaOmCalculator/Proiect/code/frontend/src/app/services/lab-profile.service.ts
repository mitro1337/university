import { Injectable, signal, effect } from '@angular/core';
import { UserLabProfile } from '../models/lab-builder.model';
import { Product } from '../models/product.model';

const STORAGE_KEY = 'vexera_user_lab_profile';

const DEFAULT_PROFILE: UserLabProfile = {
  name: 'Homelab Proxmox Cluster',
  primaryOs: 'proxmox',
  cpuArchitecture: 'x86_64',
  totalRamGb: 64,
  networkSpeed: '10GbE',
  hasSfpPlus: true,
  hasPcieSlots: true,
  powerBudgetWatts: 450
};

@Injectable({
  providedIn: 'root'
})
export class LabProfileService {
  public profile = signal<UserLabProfile>(this.loadInitial());
  public isDrawerOpen = signal<boolean>(false);

  constructor() {
    effect(() => {
      try {
        if (typeof window !== 'undefined' && window.localStorage) {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(this.profile()));
        }
      } catch (e) {
        console.warn('Could not save lab profile', e);
      }
    });
  }

  private loadInitial(): UserLabProfile {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Could not load lab profile', e);
    }
    return DEFAULT_PROFILE;
  }

  public updateProfile(partial: Partial<UserLabProfile>): void {
    this.profile.update(current => ({ ...current, ...partial }));
  }

  public evaluateProductAgainstLab(product: Product): {
    status: 'compatible' | 'bottleneck' | 'attention';
    messageRo: string;
    messageEn: string;
  } {
    const p = this.profile();
    const slug = product.slug.toLowerCase();
    const specs = product.technical_specs || {};

    // 10G SFP+ check
    if (slug.includes('sfp') || slug.includes('10g')) {
      if (!p.hasSfpPlus && p.networkSpeed === '1GbE') {
        return {
          status: 'bottleneck',
          messageRo: `Atenție la infrastructură: Laboratorul tău are rețea configurată pe 1GbE RJ45 fără porturi SFP+. Această componentă 10G va necesita un switch compatibil sau transceiver.`,
          messageEn: `Infrastructure notice: Your lab profile is configured for 1GbE RJ45 without SFP+ ports. This 10G item requires a compatible switch or transceiver.`
        };
      }
    }

    // PCIe Slot check for NICs / SAS controllers
    if (slug.includes('pcie') || slug.includes('x520') || slug.includes('hba') || slug.includes('mellanox')) {
      if (!p.hasPcieSlots) {
        return {
          status: 'attention',
          messageRo: `Profilul tău indică lipsa sloturilor libere PCIe full/half-height în nodul curent.`,
          messageEn: `Your lab profile indicates no free PCIe full/half-height slots available in the current node.`
        };
      }
    }

    // Proxmox OS check
    if (p.primaryOs === 'proxmox') {
      return {
        status: 'compatible',
        messageRo: `100% Compatibil cu mediul tău de virtualizare Proxmox VE (${p.cpuArchitecture}, ${p.totalRamGb}GB RAM).`,
        messageEn: `100% Compatible with your Proxmox VE virtualization environment (${p.cpuArchitecture}, ${p.totalRamGb}GB RAM).`
      };
    }

    return {
      status: 'compatible',
      messageRo: `Compatibil cu specificațiile laboratorului tău (${p.name}).`,
      messageEn: `Compatible with your current lab profile specifications (${p.name}).`
    };
  }
}
