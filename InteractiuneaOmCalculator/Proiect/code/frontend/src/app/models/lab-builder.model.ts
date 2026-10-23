import { Product } from './product.model';

export type LabGoalType = 
  | 'homelab' 
  | 'cybersecurity' 
  | 'nas' 
  | 'router_firewall' 
  | 'kubernetes' 
  | 'iot' 
  | 'os_development' 
  | 'sdr_rf';

export type BudgetTier = 'budget' | 'balanced' | 'performance' | 'enterprise';

export interface LabGoalOption {
  id: LabGoalType;
  title: string;
  titleEn: string;
  icon: string;
  description: string;
  descriptionEn: string;
  suggestedOs: string[];
  recommendedSkus: Record<BudgetTier, string[]>;
}

export interface CompatibilityIssue {
  severity: 'error' | 'warning' | 'info';
  title: string;
  titleEn: string;
  message: string;
  messageEn: string;
  involvedProductSlugs: string[];
  suggestedFixSku?: string;
  suggestedFixName?: string;
}

export interface CompatibilityResult {
  score: number; // 0 to 100
  isFullyCompatible: boolean;
  issues: CompatibilityIssue[];
  positiveMatches: string[];
  positiveMatchesEn: string[];
}

export interface RackUnitItem {
  id: string;
  name: string;
  nameEn?: string;
  uSize: number; // e.g. 1U, 2U, 4U
  category: 'switch' | 'server' | 'nas' | 'ups' | 'pdu' | 'patch_panel' | 'shelf';
  productSlug?: string;
  powerWatts: number;
  weightKg: number;
  depthMm: number;
  colorHex: string;
}

export interface RackSlot {
  unitIndex: number; // 1-indexed, e.g. 1 to 12
  item: RackUnitItem | null;
}

export interface UserLabProfile {
  name: string;
  primaryOs: 'proxmox' | 'truenas' | 'debian' | 'ubuntu' | 'kali' | 'unraid' | 'other';
  cpuArchitecture: 'x86_64' | 'arm64' | 'riscv';
  totalRamGb: number;
  networkSpeed: '1GbE' | '2.5GbE' | '10GbE' | '25GbE+';
  hasSfpPlus: boolean;
  hasPcieSlots: boolean;
  powerBudgetWatts: number;
}
