import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LabProfileService } from '../../services/lab-profile.service';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-lab-profile-modal',
  standalone: true,
  imports: [FormsModule],
  template: `
    @if (profileService.isDrawerOpen()) {
      <div 
        class="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4"
        (click)="profileService.isDrawerOpen.set(false)">
        
        <div 
          class="w-full max-w-lg bg-surface border border-border rounded-2xl shadow-overlay overflow-hidden transition-colors"
          data-lenis-prevent
          (click)="$event.stopPropagation()">
          
          <div class="px-6 py-4 border-b border-border flex items-center justify-between bg-surface-elevated">
            <div class="flex items-center gap-2.5">
              <div class="w-8 h-8 rounded-lg bg-surface-sunken border border-border flex items-center justify-center text-accent">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/>
                </svg>
              </div>
              <div>
                <h3 class="text-sm font-bold text-text-primary">
                  {{ i18n.isRo() ? 'Profilul hardware al laboratorului tău' : 'My Lab Hardware Profile' }}
                </h3>
                <p class="text-[11px] text-text-muted">
                  {{ i18n.isRo() ? 'Configurează echipamentele existente pentru validare contextuală automată' : 'Define your existing lab hardware for live contextual compatibility' }}
                </p>
              </div>
            </div>
            
            <button 
              type="button" 
              (click)="profileService.isDrawerOpen.set(false)"
              [attr.aria-label]="i18n.isRo() ? 'Închide' : 'Close'"
              class="w-8 h-8 rounded-lg flex items-center justify-center text-text-muted hover:text-text-primary hover:bg-surface-sunken transition-colors">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          </div>

          <div class="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
            
            <div>
              <label class="block text-xs font-bold text-text-primary mb-1">
                {{ i18n.isRo() ? 'Nume Laborator' : 'Lab Name' }}
              </label>
              <input 
                type="text" 
                [ngModel]="profileService.profile().name"
                (ngModelChange)="profileService.updateProfile({ name: $event })"
                class="w-full px-3 py-2 rounded-xl bg-surface-sunken border border-border text-xs text-text-primary focus:border-accent focus:outline-none">
            </div>

            <div>
              <label class="block text-xs font-bold text-text-primary mb-1">
                {{ i18n.isRo() ? 'Sistem de Operare Principal' : 'Primary Operating System' }}
              </label>
              <select 
                [ngModel]="profileService.profile().primaryOs"
                (ngModelChange)="profileService.updateProfile({ primaryOs: $event })"
                class="w-full px-3 py-2 rounded-xl bg-surface-sunken border border-border text-xs text-text-primary focus:border-accent focus:outline-none">
                <option value="proxmox">Proxmox VE 8.x</option>
                <option value="truenas">TrueNAS CORE / SCALE</option>
                <option value="debian">Debian 12 Bookworm</option>
                <option value="ubuntu">Ubuntu Server 24.04 LTS</option>
                <option value="kali">Kali Linux / Pentest</option>
                <option value="unraid">UnRAID</option>
                <option value="other">{{ i18n.isRo() ? 'Alt OS / Custom' : 'Other OS / Custom' }}</option>
              </select>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-xs font-bold text-text-primary mb-1">
                  {{ i18n.isRo() ? 'Arhitectură CPU' : 'CPU Architecture' }}
                </label>
                <select 
                  [ngModel]="profileService.profile().cpuArchitecture"
                  (ngModelChange)="profileService.updateProfile({ cpuArchitecture: $event })"
                  class="w-full px-3 py-2 rounded-xl bg-surface-sunken border border-border text-xs text-text-primary focus:border-accent focus:outline-none">
                  <option value="x86_64">x86_64 (Intel / AMD)</option>
                  <option value="arm64">ARM64 (RPi / Rockchip / Apple)</option>
                  <option value="riscv">RISC-V 64-bit</option>
                </select>
              </div>

              <div>
                <label class="block text-xs font-bold text-text-primary mb-1">
                  {{ i18n.isRo() ? 'RAM Total (GB)' : 'Total RAM (GB)' }}
                </label>
                <input 
                  type="number" 
                  [ngModel]="profileService.profile().totalRamGb"
                  (ngModelChange)="profileService.updateProfile({ totalRamGb: +$event })"
                  class="w-full px-3 py-2 rounded-xl bg-surface-sunken border border-border text-xs text-text-primary focus:border-accent focus:outline-none">
              </div>
            </div>

            <div>
              <label class="block text-xs font-bold text-text-primary mb-1">
                {{ i18n.isRo() ? 'Viteză Rețea Locală' : 'Local Network Speed' }}
              </label>
              <select 
                [ngModel]="profileService.profile().networkSpeed"
                (ngModelChange)="profileService.updateProfile({ networkSpeed: $event })"
                class="w-full px-3 py-2 rounded-xl bg-surface-sunken border border-border text-xs text-text-primary focus:border-accent focus:outline-none">
                <option value="1GbE">1 Gbps (Standard Gigabit RJ45)</option>
                <option value="2.5GbE">2.5 Gbps Multi-Gig</option>
                <option value="10GbE">10 Gbps (10GbE SFP+ / DAC)</option>
                <option value="25GbE+">25 Gbps+ Datacenter</option>
              </select>
            </div>

            <div class="space-y-2 pt-2">
              <label class="flex items-center gap-2.5 cursor-pointer text-xs text-text-secondary hover:text-text-primary">
                <input 
                  type="checkbox" 
                  [ngModel]="profileService.profile().hasSfpPlus"
                  (ngModelChange)="profileService.updateProfile({ hasSfpPlus: $event })"
                  class="rounded text-accent focus:ring-0">
                <span>{{ i18n.isRo() ? 'Dispun de porturi libere SFP+ 10G în switch' : 'I have available 10G SFP+ ports on my switch' }}</span>
              </label>

              <label class="flex items-center gap-2.5 cursor-pointer text-xs text-text-secondary hover:text-text-primary">
                <input 
                  type="checkbox" 
                  [ngModel]="profileService.profile().hasPcieSlots"
                  (ngModelChange)="profileService.updateProfile({ hasPcieSlots: $event })"
                  class="rounded text-accent focus:ring-0">
                <span>{{ i18n.isRo() ? 'Am sloturi PCIe libere disponibile în server / PC' : 'I have free PCIe expansion slots available in my server' }}</span>
              </label>
            </div>

          </div>

          <div class="px-6 py-3 bg-surface-elevated border-t border-border flex items-center justify-between">
            <span class="text-[11px] text-text-muted">{{ i18n.isRo() ? 'Salvat automat local' : 'Auto-saved locally' }}</span>
            <button 
              type="button" 
              (click)="profileService.isDrawerOpen.set(false)"
              class="px-4 py-2 rounded-xl bg-accent hover:bg-accent-hover text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-xs">
              {{ i18n.isRo() ? 'Salvează & Închide' : 'Save & Close' }}
            </button>
          </div>

        </div>
      </div>
    }
  `
})
export class LabProfileModalComponent {
  profileService = inject(LabProfileService);
  i18n = inject(TranslationService);
}
