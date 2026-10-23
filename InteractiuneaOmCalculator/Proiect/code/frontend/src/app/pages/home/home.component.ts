import { Component, inject, signal, computed, OnInit, AfterViewInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { ComparisonService } from '../../services/comparison.service';
import { TranslationService } from '../../services/translation.service';
import { UiFeedbackService } from '../../services/ui-feedback.service';
import { LenisService } from '../../services/lenis.service';
import { WishlistService } from '../../services/wishlist.service';
import { AudioFeedbackService } from '../../services/audio-feedback.service';
import { Category, Product } from '../../models/product.model';
import { HardwareViewer3dComponent } from '../../components/ui/hardware-viewer-3d.component';
import { UiTopologyDiagramComponent } from '../../components/ui/ui-topology-diagram.component';

export type HomeTab = 'all' | 'cybersecurity' | 'enterprise' | 'niche' | 'homelab' | 'sbc' | 'sensors' | 'power';
export type ArchetypeKey = 'titan' | 'mikrotik' | 'hackrf';

interface ModularOption {
  id: string;
  nameRo: string;
  nameEn: string;
  detailRo: string;
  detailEn: string;
  price: number;
  watts: number;
}

interface SwitchPort {
  id: number;
  label: string;
  type: 'sfp' | 'rj45';
  speed: string;
  vlan: string;
  status: 'active' | 'standby' | 'poe';
  poeWatts?: number;
  targetDeviceRo: string;
  targetDeviceEn: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, FormsModule, HardwareViewer3dComponent, UiTopologyDiagramComponent],
  template: `
    <!-- Top Hardware Status Notification Banner -->
    <div class="bg-surface-elevated/70 border-b border-border py-2 px-4 sm:px-6 text-xs text-text-secondary select-none">
      <div class="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        <div class="flex items-center gap-2">
          <span class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-surface border border-accent/40 text-accent font-bold text-[10px] uppercase">
            <span class="w-1.5 h-1.5 rounded-full bg-accent animate-ping"></span>
            VEXERA // R&D
          </span>
          <span class="text-text-primary font-semibold text-[11px]">
            {{ i18n.isRo() ? 'Platformă de Hardware Engineering & Homelab Enterprise' : 'Hardware Engineering & Enterprise Homelab Platform' }}
          </span>
        </div>
        <div class="flex items-center gap-4 text-[11px] text-text-muted">
          <span class="hidden sm:inline">{{ i18n.isRo() ? 'Garanție 24 Luni • OUG 140/2021' : '24-Month Warranty • EU Standard' }}</span>
          <span class="text-border hidden sm:inline">|</span>
          <span class="font-semibold text-text-secondary">
            {{ i18n.isRo() ? '3 Rate 0% Dobândă prin Klarna' : '3x 0% Interest with Klarna' }}
          </span>
        </div>
      </div>
    </div>

    <!-- 1. Hero Section: The Interactive Hardware Command Station -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 pb-14 relative lenis-reveal is-revealed">
      <div data-lenis-parallax="0.18" class="absolute -top-12 left-1/3 -translate-x-1/2 w-96 h-96 bg-accent/8 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div data-lenis-parallax="-0.12" data-lenis-parallax-x="0.08" class="absolute top-24 right-4 w-72 h-72 bg-accent/6 rounded-full blur-3xl pointer-events-none -z-10"></div>
      
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        <!-- Left Hero Copy & Interactive Archetype Command Deck -->
        <div class="lg:col-span-7 text-left space-y-6">
          
          <!-- Archetype Hardware Selector Tabs (Teenage Engineering & Ubiquiti Style) -->
          <div class="space-y-2">
            <div class="text-[10px] uppercase font-bold tracking-wider text-text-muted">
              {{ i18n.isRo() ? 'Selectează Arhitectura de Sistem:' : 'Select Hardware Architecture:' }}
            </div>
            <div class="flex flex-wrap gap-1.5 p-1 rounded-xl bg-surface-sunken border border-border max-w-xl">
              <button 
                type="button"
                (click)="switchArchetype('titan')"
                [class.bg-surface-elevated]="activeArchetype() === 'titan'"
                [class.text-text-primary]="activeArchetype() === 'titan'"
                [class.border-border]="activeArchetype() === 'titan'"
                [class.shadow-xs]="activeArchetype() === 'titan'"
                [class.text-text-muted]="activeArchetype() !== 'titan'"
                class="flex-1 min-w-[130px] px-3 py-2 rounded-lg text-left border border-transparent transition-all cursor-pointer">
                <div class="text-[11px] font-bold uppercase tracking-tight flex items-center justify-between">
                  <span>TITAN-9 CLUSTER</span>
                  @if (activeArchetype() === 'titan') {
                    <span class="w-1.5 h-1.5 rounded-full bg-accent"></span>
                  }
                </div>
                <div class="text-[9px] text-text-muted mt-0.5">ARM64 • Quad-Blade</div>
              </button>

              <button 
                type="button"
                (click)="switchArchetype('mikrotik')"
                [class.bg-surface-elevated]="activeArchetype() === 'mikrotik'"
                [class.text-text-primary]="activeArchetype() === 'mikrotik'"
                [class.border-border]="activeArchetype() === 'mikrotik'"
                [class.shadow-xs]="activeArchetype() === 'mikrotik'"
                [class.text-text-muted]="activeArchetype() !== 'mikrotik'"
                class="flex-1 min-w-[130px] px-3 py-2 rounded-lg text-left border border-transparent transition-all cursor-pointer">
                <div class="text-[11px] font-bold uppercase tracking-tight flex items-center justify-between">
                  <span>ROUTERBOARD 10G</span>
                  @if (activeArchetype() === 'mikrotik') {
                    <span class="w-1.5 h-1.5 rounded-full bg-accent"></span>
                  }
                </div>
                <div class="text-[9px] text-text-muted mt-0.5">8x SFP+ 10Gbps Core</div>
              </button>

              <button 
                type="button"
                (click)="switchArchetype('hackrf')"
                [class.bg-surface-elevated]="activeArchetype() === 'hackrf'"
                [class.text-text-primary]="activeArchetype() === 'hackrf'"
                [class.border-border]="activeArchetype() === 'hackrf'"
                [class.shadow-xs]="activeArchetype() === 'hackrf'"
                [class.text-text-muted]="activeArchetype() !== 'hackrf'"
                class="flex-1 min-w-[130px] px-3 py-2 rounded-lg text-left border border-transparent transition-all cursor-pointer">
                <div class="text-[11px] font-bold uppercase tracking-tight flex items-center justify-between">
                  <span>HACKRF SDR LAB</span>
                  @if (activeArchetype() === 'hackrf') {
                    <span class="w-1.5 h-1.5 rounded-full bg-accent"></span>
                  }
                </div>
                <div class="text-[9px] text-text-muted mt-0.5">1MHz - 6GHz Spectrum</div>
              </button>
            </div>
          </div>

          <!-- Main Dynamic Title -->
          <div>
            <div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-surface-elevated border border-border text-[10px] font-bold uppercase tracking-wider text-accent mb-3">
              <span>{{ currentArchetypeData().badge }}</span>
            </div>
            <h1 class="font-display uppercase tracking-tight text-3xl sm:text-5xl text-text-primary leading-[1.05]">
              {{ i18n.isRo() ? currentArchetypeData().titleRo : currentArchetypeData().titleEn }}
            </h1>
            <p class="text-xs sm:text-sm text-text-secondary leading-relaxed mt-3 max-w-2xl font-normal">
              {{ i18n.isRo() ? currentArchetypeData().descRo : currentArchetypeData().descEn }}
            </p>
          </div>

          <!-- Dynamic Technical Spec Grid (Industrial Spec-Sheet) -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3.5 rounded-xl bg-surface-sunken border border-border max-w-2xl text-xs">
            <div class="space-y-0.5 p-1.5 border-r border-border/60">
              <div class="text-[9px] uppercase font-bold text-text-muted tracking-wider">{{ i18n.isRo() ? 'Arhitectură' : 'Architecture' }}</div>
              <div class="font-bold text-text-primary text-[11px] truncate">{{ currentArchetypeData().arch }}</div>
            </div>
            <div class="space-y-0.5 p-1.5 border-r border-border/60">
              <div class="text-[9px] uppercase font-bold text-text-muted tracking-wider">{{ i18n.isRo() ? 'Putere / TDP' : 'Power TDP' }}</div>
              <div class="font-bold text-accent text-[11px] tabular-nums">{{ currentArchetypeData().power }}</div>
            </div>
            <div class="space-y-0.5 p-1.5 border-r border-border/60">
              <div class="text-[9px] uppercase font-bold text-text-muted tracking-wider">{{ i18n.isRo() ? 'Interfață / I/O' : 'Interface I/O' }}</div>
              <div class="font-bold text-text-primary text-[11px] truncate">{{ currentArchetypeData().io }}</div>
            </div>
            <div class="space-y-0.5 p-1.5">
              <div class="text-[9px] uppercase font-bold text-text-muted tracking-wider">{{ i18n.isRo() ? 'Sistem / OS' : 'OS Support' }}</div>
              <div class="font-bold text-text-primary text-[11px] truncate">{{ currentArchetypeData().os }}</div>
            </div>
          </div>

          <!-- Primary Actions Strip -->
          <div class="flex flex-wrap items-center gap-3 pt-1">
            <a routerLink="/build-your-lab" 
               class="px-5 py-2.5 rounded-xl bg-accent hover:bg-accent-hover text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center gap-2 group cursor-pointer">
              <span>{{ i18n.isRo() ? 'Configurator Rack 19"' : '19" Rack Builder' }}</span>
              <span class="group-hover:translate-x-1 transition-transform">→</span>
            </a>

            <button 
              type="button"
              (click)="scrollToInventory()" 
              class="px-4 py-2.5 rounded-xl bg-surface-elevated hover:bg-surface-sunken border border-border text-text-primary font-bold text-xs uppercase tracking-wider transition-all cursor-pointer">
              <span>{{ i18n.isRo() ? 'Inventar Live (180)' : 'Live Inventory (180)' }} ↓</span>
            </button>

            <button 
              type="button"
              (click)="addArchetypeToCart()"
              class="px-4 py-2.5 rounded-xl bg-surface border border-accent/40 hover:bg-accent/10 text-accent font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer">
              <span>+ {{ i18n.isRo() ? 'Adaugă acest Nod' : 'Add this Node' }}</span>
              <span class="tabular-nums font-semibold">({{ currentArchetypeData().price.toFixed(2) }} {{ i18n.currencyLabel() }})</span>
            </button>
          </div>

        </div>

        <!-- Right: 3D Real-time WebGL Hardware CAD Viewer -->
        <div class="lg:col-span-5">
          <div class="relative rounded-2xl p-1 bg-surface-elevated border border-border shadow-2xl">
            <app-hardware-viewer-3d [productName]="currentArchetypeData().cadName"></app-hardware-viewer-3d>
            
            <div class="p-3 bg-surface rounded-xl border border-border mt-2 flex items-center justify-between gap-3 text-xs">
              <div class="flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-accent"></span>
                <span class="font-bold text-text-primary">{{ currentArchetypeData().titleEn }}</span>
              </div>
              <div class="text-accent font-black tabular-nums text-sm">
                {{ currentArchetypeData().price.toFixed(2) }} {{ i18n.currencyLabel() }}
              </div>
            </div>
          </div>
        </div>

      </div>

      <!-- Telemetry Strip -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mt-10 pt-6 border-t border-border">
        <div class="p-3 rounded-xl bg-surface-sunken border border-border space-y-1">
          <div class="flex items-center justify-between text-[10px] uppercase font-bold text-text-muted">
            <span>{{ i18n.isRo() ? 'Throughput 10G SFP+' : '10G SFP+ Throughput' }}</span>
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
          </div>
          <div class="text-lg font-black text-text-primary tabular-nums">9.84 Gbps</div>
          <div class="text-[10px] text-text-muted">{{ i18n.isRo() ? 'Optic SMF 1310nm duplex' : 'Optical SMF 1310nm duplex' }}</div>
        </div>

        <div class="p-3 rounded-xl bg-surface-sunken border border-border space-y-1">
          <div class="flex items-center justify-between text-[10px] uppercase font-bold text-text-muted">
            <span>{{ i18n.isRo() ? 'Eficiență PUE' : 'PUE Metric' }}</span>
            <span class="w-1.5 h-1.5 rounded-full bg-accent"></span>
          </div>
          <div class="text-lg font-black text-text-primary tabular-nums">1.06 PUE</div>
          <div class="text-[10px] text-text-muted">{{ i18n.isRo() ? '80+ Titanium 42W Idle' : '80+ Titanium 42W Idle' }}</div>
        </div>

        <div class="p-3 rounded-xl bg-surface-sunken border border-border space-y-1">
          <div class="flex items-center justify-between text-[10px] uppercase font-bold text-text-muted">
            <span>{{ i18n.isRo() ? 'Stoc Fizic Depozit' : 'Verified Depo Stock' }}</span>
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
          </div>
          <div class="text-lg font-black text-text-primary tabular-nums">180+ SKU</div>
          <div class="text-[10px] text-accent font-semibold">{{ i18n.isRo() ? 'Expediere în 24h garantat' : 'Same-day 24h dispatch' }}</div>
        </div>

        <div class="p-3 rounded-xl bg-surface-sunken border border-border space-y-1">
          <div class="flex items-center justify-between text-[10px] uppercase font-bold text-text-muted">
            <span>{{ i18n.isRo() ? 'Garanție Legală' : 'Warranty Standard' }}</span>
            <span class="w-1.5 h-1.5 rounded-full bg-accent"></span>
          </div>
          <div class="text-lg font-black text-text-primary tabular-nums">24 {{ i18n.isRo() ? 'Luni' : 'Months' }}</div>
          <div class="text-[10px] text-text-muted">{{ i18n.isRo() ? 'Conform OUG 140/2021' : 'EU Legal compliance' }}</div>
        </div>
      </div>
    </section>

    <!-- 2. Framework-Inspired Interactive Modular Node Workbench -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-border lenis-reveal is-revealed">
      <div class="bg-surface rounded-2xl border border-border p-6 sm:p-8 shadow-panel space-y-8">
        
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-5">
          <div>
            <div class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-accent/10 border border-accent/30 text-accent font-bold text-[10px] uppercase tracking-wider mb-2">
              {{ i18n.isRo() ? 'Configurator Modular Live' : 'Interactive Modular Workbench' }}
            </div>
            <h2 class="font-display text-2xl sm:text-3xl uppercase tracking-tight text-text-primary">
              {{ i18n.isRo() ? 'Personalizează-ți Propriul Compute Node' : 'Configure Your Custom Compute Node' }}
            </h2>
            <p class="text-xs text-text-secondary mt-1 max-w-2xl font-normal">
              {{ i18n.isRo() 
                ? 'Alege componentele modulare, verifică în timp real consumul energetic în wați (W), interfețele PCIe și adaugă întregul nod asamblat direct în coș.' 
                : 'Select modular hardware components, monitor real-time wattage draw (W), PCIe bus lanes, and bundle your customized node directly to cart.' }}
            </p>
          </div>

          <!-- Total Metrics Header Box -->
          <div class="p-3.5 rounded-xl bg-surface-sunken border border-border flex items-center gap-4 text-xs">
            <div>
              <div class="text-[10px] uppercase font-bold text-text-muted">{{ i18n.isRo() ? 'Consum Total' : 'Total Power' }}</div>
              <div class="text-base font-black text-accent tabular-nums">{{ modularTotalWatts() }} W</div>
            </div>
            <div class="w-px h-8 bg-border"></div>
            <div>
              <div class="text-[10px] uppercase font-bold text-text-muted">{{ i18n.isRo() ? 'Preț Asamblare' : 'Bundle Price' }}</div>
              <div class="text-base font-black text-text-primary tabular-nums">{{ modularTotalPrice().toFixed(2) }} {{ i18n.currencyLabel() }}</div>
            </div>
          </div>
        </div>

        <!-- 4 Step Modular Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <!-- Step 1: Compute Engine -->
          <div class="space-y-2">
            <div class="text-[11px] font-bold uppercase tracking-wider text-text-primary flex items-center justify-between">
              <span>1. {{ i18n.isRo() ? 'Placă de Bază / SoC' : 'Base Compute Engine' }}</span>
            </div>
            <div class="space-y-2">
              @for (opt of computeOptions; track opt.id) {
                <button
                  type="button"
                  (click)="selectCompute(opt)"
                  [class.border-accent]="selectedCompute().id === opt.id"
                  [class.bg-surface-elevated]="selectedCompute().id === opt.id"
                  [class.bg-surface-sunken]="selectedCompute().id !== opt.id"
                  class="w-full text-left p-3 rounded-xl border border-border transition-all cursor-pointer hover:border-accent">
                  <div class="flex items-center justify-between text-xs font-bold text-text-primary">
                    <span class="truncate">{{ i18n.isRo() ? opt.nameRo : opt.nameEn }}</span>
                    <span class="text-accent tabular-nums text-[11px]">{{ opt.price }} lei</span>
                  </div>
                  <div class="text-[10px] text-text-muted mt-1 leading-snug">
                    {{ i18n.isRo() ? opt.detailRo : opt.detailEn }}
                  </div>
                  <div class="text-[9px] font-semibold text-text-secondary mt-1.5 flex items-center gap-1">
                    <span class="w-1.5 h-1.5 rounded-full bg-accent"></span>
                    <span>TDP: {{ opt.watts }}W</span>
                  </div>
                </button>
              }
            </div>
          </div>

          <!-- Step 2: Networking Interface -->
          <div class="space-y-2">
            <div class="text-[11px] font-bold uppercase tracking-wider text-text-primary flex items-center justify-between">
              <span>2. {{ i18n.isRo() ? 'Rețelistică & I/O' : 'Network Interconnect' }}</span>
            </div>
            <div class="space-y-2">
              @for (opt of networkOptions; track opt.id) {
                <button
                  type="button"
                  (click)="selectNetwork(opt)"
                  [class.border-accent]="selectedNetwork().id === opt.id"
                  [class.bg-surface-elevated]="selectedNetwork().id === opt.id"
                  [class.bg-surface-sunken]="selectedNetwork().id !== opt.id"
                  class="w-full text-left p-3 rounded-xl border border-border transition-all cursor-pointer hover:border-accent">
                  <div class="flex items-center justify-between text-xs font-bold text-text-primary">
                    <span class="truncate">{{ i18n.isRo() ? opt.nameRo : opt.nameEn }}</span>
                    <span class="text-accent tabular-nums text-[11px]">{{ opt.price }} lei</span>
                  </div>
                  <div class="text-[10px] text-text-muted mt-1 leading-snug">
                    {{ i18n.isRo() ? opt.detailRo : opt.detailEn }}
                  </div>
                  <div class="text-[9px] font-semibold text-text-secondary mt-1.5 flex items-center gap-1">
                    <span class="w-1.5 h-1.5 rounded-full bg-accent"></span>
                    <span>TDP: {{ opt.watts }}W</span>
                  </div>
                </button>
              }
            </div>
          </div>

          <!-- Step 3: Storage Pool -->
          <div class="space-y-2">
            <div class="text-[11px] font-bold uppercase tracking-wider text-text-primary flex items-center justify-between">
              <span>3. {{ i18n.isRo() ? 'Stocare NVMe / SAS' : 'Storage Array' }}</span>
            </div>
            <div class="space-y-2">
              @for (opt of storageOptions; track opt.id) {
                <button
                  type="button"
                  (click)="selectStorage(opt)"
                  [class.border-accent]="selectedStorage().id === opt.id"
                  [class.bg-surface-elevated]="selectedStorage().id === opt.id"
                  [class.bg-surface-sunken]="selectedStorage().id !== opt.id"
                  class="w-full text-left p-3 rounded-xl border border-border transition-all cursor-pointer hover:border-accent">
                  <div class="flex items-center justify-between text-xs font-bold text-text-primary">
                    <span class="truncate">{{ i18n.isRo() ? opt.nameRo : opt.nameEn }}</span>
                    <span class="text-accent tabular-nums text-[11px]">{{ opt.price }} lei</span>
                  </div>
                  <div class="text-[10px] text-text-muted mt-1 leading-snug">
                    {{ i18n.isRo() ? opt.detailRo : opt.detailEn }}
                  </div>
                  <div class="text-[9px] font-semibold text-text-secondary mt-1.5 flex items-center gap-1">
                    <span class="w-1.5 h-1.5 rounded-full bg-accent"></span>
                    <span>TDP: {{ opt.watts }}W</span>
                  </div>
                </button>
              }
            </div>
          </div>

          <!-- Step 4: Enclosure & Cooling -->
          <div class="space-y-2">
            <div class="text-[11px] font-bold uppercase tracking-wider text-text-primary flex items-center justify-between">
              <span>4. {{ i18n.isRo() ? 'Șasiu & Răcire' : 'Chassis & Thermal' }}</span>
            </div>
            <div class="space-y-2">
              @for (opt of enclosureOptions; track opt.id) {
                <button
                  type="button"
                  (click)="selectEnclosure(opt)"
                  [class.border-accent]="selectedEnclosure().id === opt.id"
                  [class.bg-surface-elevated]="selectedEnclosure().id === opt.id"
                  [class.bg-surface-sunken]="selectedEnclosure().id !== opt.id"
                  class="w-full text-left p-3 rounded-xl border border-border transition-all cursor-pointer hover:border-accent">
                  <div class="flex items-center justify-between text-xs font-bold text-text-primary">
                    <span class="truncate">{{ i18n.isRo() ? opt.nameRo : opt.nameEn }}</span>
                    <span class="text-accent tabular-nums text-[11px]">{{ opt.price }} lei</span>
                  </div>
                  <div class="text-[10px] text-text-muted mt-1 leading-snug">
                    {{ i18n.isRo() ? opt.detailRo : opt.detailEn }}
                  </div>
                  <div class="text-[9px] font-semibold text-text-secondary mt-1.5 flex items-center gap-1">
                    <span class="w-1.5 h-1.5 rounded-full bg-accent"></span>
                    <span>TDP: {{ opt.watts }}W</span>
                  </div>
                </button>
              }
            </div>
          </div>

        </div>

        <!-- Workbench Action Footer -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-surface-sunken border border-border">
          <div class="text-xs text-text-secondary">
            <strong class="text-text-primary">{{ i18n.isRo() ? 'Configurație Asamblată:' : 'Selected Hardware Node:' }}</strong>
            <span class="ml-1 text-text-muted">
              {{ selectedCompute().nameEn }} + {{ selectedNetwork().nameEn }} + {{ selectedStorage().nameEn }} + {{ selectedEnclosure().nameEn }}
            </span>
          </div>

          <button
            type="button"
            (click)="addConfiguredNodeToCart()"
            class="px-6 py-3 rounded-xl bg-accent hover:bg-accent-hover text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer">
            <span>{{ i18n.isRo() ? 'Asamblează & Adaugă în Coș' : 'Bundle & Add Custom Node to Cart' }}</span>
            <span class="tabular-nums font-black">({{ modularTotalPrice().toFixed(2) }} {{ i18n.currencyLabel() }})</span>
          </button>
        </div>

      </div>
    </section>

    <!-- 3. Teenage Engineering & Ubiquiti Engineering Bento Grid -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lenis-reveal is-revealed">
      <div class="flex items-center justify-between border-b border-border pb-3 mb-6">
        <div>
          <h2 class="font-display text-2xl sm:text-3xl uppercase tracking-tight text-text-primary">
            {{ i18n.isRo() ? 'Instrumente Tehnice de Laborator' : 'Hardware Telemetry & Signal Lab' }}
          </h2>
          <p class="text-xs text-text-secondary mt-0.5">
            {{ i18n.isRo() ? 'Interacționează direct cu porturile switch, spectrul radio SDR și sunetul mecanic' : 'Interact with switch ports, SDR radio frequencies, and mechanical sound synthesis' }}
          </p>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5">
        
        <!-- Bento 1: Interactive 8-Port 10G SFP+ Switch Matrix (Ubiquiti inspired) -->
        <div class="lg:col-span-6 bg-surface rounded-2xl border border-border p-5 shadow-panel space-y-4 flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between mb-3">
              <div class="flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span class="text-xs font-bold uppercase tracking-wide text-text-primary">
                  {{ i18n.isRo() ? 'Matrice Porturi Switch 10G SFP+' : '10G SFP+ Active Switch Matrix' }}
                </span>
              </div>
              <span class="text-[10px] font-semibold px-2 py-0.5 rounded bg-surface-sunken border border-border text-text-muted">
                {{ i18n.isRo() ? 'Click pe un port pentru diagnostic' : 'Click port for telemetry' }}
              </span>
            </div>

            <!-- 8 Ports Visualizer -->
            <div class="grid grid-cols-4 sm:grid-cols-8 gap-2 p-3 bg-surface-sunken rounded-xl border border-border">
              @for (port of switchPorts; track port.id) {
                <button
                  type="button"
                  (click)="selectPort(port)"
                  [class.border-accent]="selectedPort().id === port.id"
                  [class.bg-surface-elevated]="selectedPort().id === port.id"
                  class="p-2 rounded-lg border border-border/80 text-center transition-all cursor-pointer hover:border-accent flex flex-col items-center justify-center gap-1 group">
                  <div class="text-[9px] font-bold text-text-muted group-hover:text-text-primary">{{ port.label }}</div>
                  <div 
                    class="w-3.5 h-3.5 rounded-sm flex items-center justify-center border"
                    [class.bg-emerald-500/20]="port.status === 'active'"
                    [class.border-emerald-500]="port.status === 'active'"
                    [class.bg-accent/20]="port.status === 'poe'"
                    [class.border-accent]="port.status === 'poe'"
                    [class.bg-border]="port.status === 'standby'"
                    [class.border-border]="port.status === 'standby'">
                    <span 
                      class="w-1.5 h-1.5 rounded-full"
                      [class.bg-emerald-400]="port.status === 'active'"
                      [class.bg-accent]="port.status === 'poe'"
                      [class.bg-text-muted]="port.status === 'standby'">
                    </span>
                  </div>
                  <div class="text-[8px] font-semibold text-text-muted uppercase">{{ port.type }}</div>
                </button>
              }
            </div>

            <!-- Active Port Inspector Drawer -->
            <div class="mt-4 p-3.5 rounded-xl bg-surface-elevated border border-border text-xs space-y-1.5">
              <div class="flex items-center justify-between">
                <span class="font-bold text-text-primary text-[11px]">{{ selectedPort().label }}: {{ i18n.isRo() ? selectedPort().targetDeviceRo : selectedPort().targetDeviceEn }}</span>
                <span class="text-[10px] font-semibold text-emerald-400 tabular-nums">{{ selectedPort().speed }} LINK UP</span>
              </div>
              <div class="grid grid-cols-3 gap-2 text-[10px] text-text-muted pt-1 border-t border-border/60">
                <div>VLAN: <strong class="text-text-primary">{{ selectedPort().vlan }}</strong></div>
                <div>Status: <strong class="text-text-primary uppercase">{{ selectedPort().status }}</strong></div>
                <div>PoE: <strong class="text-accent">{{ selectedPort().poeWatts ? selectedPort().poeWatts + 'W' : 'N/A' }}</strong></div>
              </div>
            </div>
          </div>

          <div class="text-[10px] text-text-muted flex items-center justify-between pt-2 border-t border-border">
            <span>Non-blocking throughput: 162 Gbps</span>
            <span class="text-accent font-semibold">RouterOS v7 & SwOS Dual Boot</span>
          </div>
        </div>

        <!-- Bento 2: Live HTML5 Canvas RF Spectrum Waterfall (Teenage Engineering SDR) -->
        <div class="lg:col-span-6 bg-surface rounded-2xl border border-border p-5 shadow-panel space-y-3 flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between mb-2">
              <div class="flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-accent"></span>
                <span class="text-xs font-bold uppercase tracking-wide text-text-primary">
                  {{ i18n.isRo() ? 'Spectrograf Radio Waterfall (1MHz - 6GHz)' : 'SDR Spectrum Waterfall Display' }}
                </span>
              </div>
              
              <!-- Frequency selector -->
              <div class="flex items-center gap-1 text-[10px]">
                <button 
                  type="button" 
                  (click)="setRfBand('433')"
                  [class.bg-accent]="activeRfBand() === '433'"
                  [class.text-white]="activeRfBand() === '433'"
                  class="px-2 py-0.5 rounded bg-surface-sunken border border-border cursor-pointer">433M</button>
                <button 
                  type="button" 
                  (click)="setRfBand('868')"
                  [class.bg-accent]="activeRfBand() === '868'"
                  [class.text-white]="activeRfBand() === '868'"
                  class="px-2 py-0.5 rounded bg-surface-sunken border border-border cursor-pointer">868M</button>
                <button 
                  type="button" 
                  (click)="setRfBand('2.4')"
                  [class.bg-accent]="activeRfBand() === '2.4'"
                  [class.text-white]="activeRfBand() === '2.4'"
                  class="px-2 py-0.5 rounded bg-surface-sunken border border-border cursor-pointer">2.4G</button>
              </div>
            </div>

            <!-- Canvas Display -->
            <div class="relative w-full h-32 rounded-xl bg-black border border-border overflow-hidden">
              <canvas #waterfallCanvas class="w-full h-full block"></canvas>
              <div class="absolute bottom-1 right-2 text-[9px] text-accent/80 tabular-nums font-semibold tracking-widest pointer-events-none">
                FREQ: {{ activeRfBand() }}GHz • 20 MSPS
              </div>
            </div>
          </div>

          <!-- Bottom SDR parameters -->
          <div class="grid grid-cols-3 gap-2 text-[10px] text-text-muted pt-2 border-t border-border">
            <div>{{ i18n.isRo() ? 'Eșantionare:' : 'Sample Rate:' }} <strong class="text-text-primary">20 Msps</strong></div>
            <div>{{ i18n.isRo() ? 'Răspuns:' : 'Response:' }} <strong class="text-text-primary">Semi-Duplex</strong></div>
            <div>{{ i18n.isRo() ? 'RF Front-End:' : 'RF Front-End:' }} <strong class="text-accent">MAX2837</strong></div>
          </div>
        </div>

        <!-- Bento 3: Teenage Engineering Tactile Audio Pad -->
        <div class="lg:col-span-6 bg-surface rounded-2xl border border-border p-5 shadow-panel space-y-4 flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between mb-3">
              <div class="flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-accent"></span>
                <span class="text-xs font-bold uppercase tracking-wide text-text-primary">
                  {{ i18n.isRo() ? 'Sintetizator Web Audio Tactil' : 'Tactile Web Audio Synthesizer' }}
                </span>
              </div>
              <span class="text-[10px] font-semibold text-text-muted">
                {{ audioService.isMuted() ? (i18n.isRo() ? 'Audio Muted' : 'Audio Muted') : (i18n.isRo() ? 'Procedural Web Audio' : 'Procedural Web Audio') }}
              </span>
            </div>

            <p class="text-xs text-text-secondary leading-relaxed mb-3">
              {{ i18n.isRo() 
                ? 'Apasă tastele fizice pentru a declanșa oscilatoarele de sinteză audio procedurală (clicuri mecanice, relee electrice, chimes de confirmare).' 
                : 'Click keys to trigger procedural synthesizer oscillators simulating mechanical switches, relays, and hardware confirmation chimes.' }}
            </p>

            <!-- 5 Tactile Mechanical Buttons -->
            <div class="grid grid-cols-5 gap-2">
              <button
                type="button"
                (click)="playDemoSound('click')"
                class="p-3 rounded-xl bg-surface-sunken hover:bg-surface-elevated border border-border hover:border-accent active:scale-95 transition-all text-center group cursor-pointer shadow-xs">
                <div class="text-[10px] font-bold text-text-primary group-hover:text-accent">KEY</div>
                <div class="text-[8px] text-text-muted mt-0.5">800Hz</div>
              </button>

              <button
                type="button"
                (click)="playDemoSound('switch')"
                class="p-3 rounded-xl bg-surface-sunken hover:bg-surface-elevated border border-border hover:border-accent active:scale-95 transition-all text-center group cursor-pointer shadow-xs">
                <div class="text-[10px] font-bold text-text-primary group-hover:text-accent">RELAY</div>
                <div class="text-[8px] text-text-muted mt-0.5">Dual-Pulse</div>
              </button>

              <button
                type="button"
                (click)="playDemoSound('mount')"
                class="p-3 rounded-xl bg-surface-sunken hover:bg-surface-elevated border border-border hover:border-accent active:scale-95 transition-all text-center group cursor-pointer shadow-xs">
                <div class="text-[10px] font-bold text-text-primary group-hover:text-accent">MOUNT</div>
                <div class="text-[8px] text-text-muted mt-0.5">180Hz</div>
              </button>

              <button
                type="button"
                (click)="playDemoSound('beep')"
                class="p-3 rounded-xl bg-surface-sunken hover:bg-surface-elevated border border-border hover:border-accent active:scale-95 transition-all text-center group cursor-pointer shadow-xs">
                <div class="text-[10px] font-bold text-text-primary group-hover:text-accent">CHIME</div>
                <div class="text-[8px] text-text-muted mt-0.5">1.6kHz</div>
              </button>

              <button
                type="button"
                (click)="playDemoSound('stamp')"
                class="p-3 rounded-xl bg-surface-sunken hover:bg-surface-elevated border border-border hover:border-accent active:scale-95 transition-all text-center group cursor-pointer shadow-xs">
                <div class="text-[10px] font-bold text-text-primary group-hover:text-accent">STAMP</div>
                <div class="text-[8px] text-text-muted mt-0.5">95Hz</div>
              </button>
            </div>
          </div>

          <div class="flex items-center justify-between pt-2 border-t border-border text-[10px] text-text-muted">
            <span>{{ i18n.isRo() ? 'Feedback tactil integrat pe toate acțiunile site-ului' : 'Tactile sound integrated across all store actions' }}</span>
            <button 
              type="button" 
              (click)="audioService.toggleMute()" 
              class="text-accent font-semibold hover:underline cursor-pointer">
              {{ audioService.isMuted() ? (i18n.isRo() ? 'Activează Sunetul' : 'Enable Sound') : (i18n.isRo() ? 'Oprește Sunetul' : 'Mute Sound') }}
            </button>
          </div>
        </div>

        <!-- Bento 4: Thermal & Fan Profiler Simulation -->
        <div class="lg:col-span-6 bg-surface rounded-2xl border border-border p-5 shadow-panel space-y-4 flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between mb-3">
              <div class="flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span class="text-xs font-bold uppercase tracking-wide text-text-primary">
                  {{ i18n.isRo() ? 'Simulator Termic & Control PWM Ventilatoare' : 'Thermal & PWM Fan Simulator' }}
                </span>
              </div>
              <span class="text-[10px] font-semibold text-accent tabular-nums">
                {{ thermalCpuLoad() }}% CPU LOAD
              </span>
            </div>

            <!-- Slider control -->
            <div class="space-y-1.5">
              <label class="text-[10px] uppercase font-bold text-text-muted flex items-center justify-between">
                <span>{{ i18n.isRo() ? 'Nivel Încărcare Procesor' : 'CPU Load Level' }}</span>
                <span class="text-text-primary tabular-nums">{{ thermalCpuLoad() }}%</span>
              </label>
              <input 
                type="range" 
                min="0" 
                max="100" 
                [(ngModel)]="thermalCpuLoad" 
                (input)="onThermalSliderChange()"
                class="w-full accent-accent cursor-pointer">
            </div>

            <!-- Dynamic Gauge Readout -->
            <div class="grid grid-cols-2 gap-3 mt-4">
              <div class="p-3 rounded-xl bg-surface-sunken border border-border space-y-1">
                <div class="text-[9px] uppercase font-bold text-text-muted">{{ i18n.isRo() ? 'Temperatură Die' : 'Die Temperature' }}</div>
                <div class="text-xl font-black text-text-primary tabular-nums">
                  {{ thermalCalculatedTemp() }}°C
                </div>
                <div class="text-[9px] text-text-muted">
                  {{ thermalCalculatedTemp() < 45 ? 'Nominal Idle' : thermalCalculatedTemp() < 65 ? 'Optimal Load' : 'High Performance' }}
                </div>
              </div>

              <div class="p-3 rounded-xl bg-surface-sunken border border-border space-y-1">
                <div class="text-[9px] uppercase font-bold text-text-muted">{{ i18n.isRo() ? 'Turație Noctua PWM' : 'Noctua Fan RPM' }}</div>
                <div class="text-xl font-black text-accent tabular-nums">
                  {{ thermalCalculatedRpm() }} RPM
                </div>
                <div class="text-[9px] text-text-muted">
                  {{ thermalCalculatedRpm() < 1500 ? 'Silent 18 dBA' : 'Active 28 dBA' }}
                </div>
              </div>
            </div>
          </div>

          <div class="text-[10px] text-text-muted pt-2 border-t border-border flex items-center justify-between">
            <span>{{ i18n.isRo() ? 'Profil PWM calculat conform senzorilor I2C' : 'PWM fan curve linked to I2C thermal probes' }}</span>
            <span class="text-text-primary font-semibold">TDP Max: 95W</span>
          </div>
        </div>

      </div>
    </section>

    <!-- 4. Ubiquiti-Inspired Interactive Topology Visualizer Section -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 border-t border-border lenis-reveal is-revealed">
      <div class="text-center max-w-3xl mx-auto mb-8 space-y-2">
        <div class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-surface-elevated border border-border text-[10px] font-bold uppercase tracking-wider text-accent">
          {{ i18n.isRo() ? 'Topologie Rețea & Arhitectură Homelab' : 'Network Topology & Homelab Architecture' }}
        </div>
        <h2 class="font-display text-2xl sm:text-4xl uppercase tracking-tight text-text-primary">
          {{ i18n.isRo() ? 'Diagramă Interactivă Ecosistem Vexera' : 'Interactive System Architecture Visualizer' }}
        </h2>
        <p class="text-xs sm:text-sm text-text-secondary leading-relaxed">
          {{ i18n.isRo() 
            ? 'Navighează prin căile fizice și logice dintre fibra WAN 10G, switch-urile enterprise, clusterul de virtualizare Proxmox și nodurile periferice IoT.' 
            : 'Trace physical and logical flows from 10G WAN fiber through enterprise switches, Proxmox hypervisor clusters, and IoT edge nodes.' }}
        </p>
      </div>

      <div class="bg-surface rounded-2xl border border-border p-4 sm:p-6 shadow-panel">
        <app-ui-topology-diagram></app-ui-topology-diagram>
      </div>
    </section>

    <!-- 5. Live Hardware Inventory Section (180 SKUs) -->
    <section id="inventory-grid" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-border lenis-reveal is-revealed">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-border mb-6">
        <div>
          <h2 class="font-display text-2xl sm:text-3xl lg:text-4xl uppercase tracking-tight text-text-primary">
            {{ i18n.isRo() ? 'Hardware din Depozitul Local' : 'Live Inventory Hardware' }}
          </h2>
          <p class="text-xs text-text-secondary mt-0.5">
            {{ i18n.isRo() ? 'Stoc fizic gata de expediere cu parametri tehnici măsurați' : 'Physical stock ready to ship with verified hardware benchmarks' }}
          </p>
        </div>

        <!-- Filter tabs -->
        <div class="flex items-center gap-1.5 text-xs overflow-x-auto pb-1 sm:pb-0">
          <button 
            type="button"
            (click)="setCategoryTab('all')"
            [class.bg-accent]="activeTab() === 'all'"
            [class.text-white]="activeTab() === 'all'"
            [class.bg-surface-elevated]="activeTab() !== 'all'"
            [class.text-text-secondary]="activeTab() !== 'all'"
            class="px-3.5 py-1.5 rounded-lg border border-border hover:border-accent active:scale-95 transition-all whitespace-nowrap text-xs font-bold cursor-pointer">
            <span>{{ i18n.isRo() ? 'Toate (180)' : 'All (180)' }}</span>
          </button>
          <button 
            type="button"
            (click)="setCategoryTab('cybersecurity')"
            [class.bg-accent]="activeTab() === 'cybersecurity'"
            [class.text-white]="activeTab() === 'cybersecurity'"
            [class.bg-surface-elevated]="activeTab() !== 'cybersecurity'"
            [class.text-text-secondary]="activeTab() !== 'cybersecurity'"
            class="px-3.5 py-1.5 rounded-lg border border-border hover:border-accent active:scale-95 transition-all whitespace-nowrap text-xs font-bold cursor-pointer">
            <span>{{ i18n.isRo() ? 'Securitate' : 'Security' }}</span>
          </button>
          <button 
            type="button"
            (click)="setCategoryTab('enterprise')"
            [class.bg-accent]="activeTab() === 'enterprise'"
            [class.text-white]="activeTab() === 'enterprise'"
            [class.bg-surface-elevated]="activeTab() !== 'enterprise'"
            [class.text-text-secondary]="activeTab() !== 'enterprise'"
            class="px-3.5 py-1.5 rounded-lg border border-border hover:border-accent active:scale-95 transition-all whitespace-nowrap text-xs font-bold cursor-pointer">
            <span>{{ i18n.isRo() ? 'Enterprise & Servere' : 'Enterprise & Servers' }}</span>
          </button>
          <button 
            type="button"
            (click)="setCategoryTab('niche')"
            [class.bg-accent]="activeTab() === 'niche'"
            [class.text-white]="activeTab() === 'niche'"
            [class.bg-surface-elevated]="activeTab() !== 'niche'"
            [class.text-text-secondary]="activeTab() !== 'niche'"
            class="px-3.5 py-1.5 rounded-lg border border-border hover:border-accent active:scale-95 transition-all whitespace-nowrap text-xs font-bold cursor-pointer">
            <span>{{ i18n.isRo() ? 'Hardware Nișat' : 'Niche Hardware' }}</span>
          </button>
          <button 
            type="button"
            (click)="setCategoryTab('homelab')"
            [class.bg-accent]="activeTab() === 'homelab'"
            [class.text-white]="activeTab() === 'homelab'"
            [class.bg-surface-elevated]="activeTab() !== 'homelab'"
            [class.text-text-secondary]="activeTab() !== 'homelab'"
            class="px-3.5 py-1.5 rounded-lg border border-border hover:border-accent active:scale-95 transition-all whitespace-nowrap text-xs font-bold cursor-pointer">
            <span>{{ i18n.isRo() ? 'Homelab & 10G' : 'Homelab & 10G' }}</span>
          </button>
        </div>
      </div>

      <!-- Products Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lenis-reveal-stagger is-revealed">
        @for (prod of filteredFeaturedProducts().slice(0, 12); track prod.id) {
          <div 
            class="bg-surface hover:bg-surface-elevated border border-border rounded-xl p-4 shadow-panel group flex flex-col justify-between transition-all"
            [style.transition-delay]="($index * 40) + 'ms'">
            <div>
              <a [routerLink]="['/produs', prod.slug]" 
                 class="relative h-44 w-full bg-surface-sunken rounded-lg p-3 flex items-center justify-center mb-3 block overflow-hidden">
                <img 
                  [src]="prod.image_url" 
                  [alt]="i18n.getProductName(prod)"
                  data-lenis-parallax="0.035"
                  class="lenis-parallax-image max-h-full max-w-full object-contain filter drop-shadow-sm group-hover:scale-105 transition-transform duration-300">
                
                @if (prod.stock > 0) {
                  <span class="absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded bg-surface border border-accent/40 text-accent">
                    {{ i18n.isRo() ? 'În stoc (' + prod.stock + ' buc)' : 'In stock (' + prod.stock + ' pcs)' }}
                  </span>
                } @else {
                  <span class="absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded bg-surface border border-border text-text-muted">
                    {{ i18n.isRo() ? 'La comandă' : 'Backorder' }}
                  </span>
                }

                <button
                  type="button"
                  (click)="$event.preventDefault(); $event.stopPropagation(); wishlistService.toggleWishlist(prod)"
                  class="heart-button absolute top-2 right-2 w-7 h-7 rounded-full bg-surface/85 backdrop-blur-xs border border-border flex items-center justify-center text-text-muted hover:text-accent z-10"
                  [class.is-active]="wishlistService.isWishlisted(prod.id)">
                  <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </a>

              <div class="flex items-center justify-between mb-1 gap-2">
                <span class="text-[10px] text-text-muted uppercase tracking-wider truncate font-semibold">
                  {{ i18n.getSubcategoryName(prod.subcategory) }}
                </span>
                <button 
                  type="button"
                  (click)="$event.stopPropagation(); uiFeedback.copyToClipboard(prod.sku, i18n.isRo() ? 'Cod SKU' : 'SKU Code')"
                  class="text-[10px] tabular-nums px-1.5 py-0.5 rounded bg-surface-sunken border border-border text-text-muted font-bold inline-flex items-center gap-1 active:scale-95 flex-shrink-0 cursor-pointer">
                  <span>{{ prod.sku }}</span>
                  <svg class="w-2.5 h-2.5 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <rect x="8" y="8" width="12" height="12" rx="2" stroke-width="2"/>
                    <path d="M16 8V6a2 2 0 00-2-2H6a2 2 0 00-2 2v8a2 2 0 002 2h2" stroke-width="2"/>
                  </svg>
                </button>
              </div>

              <h4 class="font-heading text-xs sm:text-sm font-bold text-text-primary group-hover:text-accent transition-colors leading-snug line-clamp-2">
                <a [routerLink]="['/produs', prod.slug]">
                  {{ i18n.getProductName(prod) }}
                </a>
              </h4>
              <p class="text-xs text-text-secondary mt-1.5 line-clamp-2 leading-relaxed font-normal">
                {{ i18n.getProductShortDesc(prod) }}
              </p>
            </div>

            <div class="pt-3.5 mt-3 border-t border-border flex items-center justify-between">
              <div>
                <div class="text-base sm:text-lg font-bold text-text-primary tabular-nums leading-none">
                  {{ prod.price_ron.toFixed(2) }} <span class="text-xs font-normal text-text-muted">{{ i18n.currencyLabel() }}</span>
                </div>
                <div class="text-[10px] text-text-muted mt-0.5">{{ i18n.isRo() ? 'TVA inclus • Factură' : 'VAT included • Invoice' }}</div>
              </div>

              <div class="flex items-center gap-1.5">
                <a [routerLink]="['/produs', prod.slug]"
                   class="px-2.5 py-1.5 rounded-lg bg-surface-elevated hover:bg-surface-sunken text-text-primary text-xs font-bold border border-border hover:border-accent active:scale-95 transition-all">
                  {{ i18n.isRo() ? 'Fișă' : 'Specs' }}
                </a>
                <button
                  type="button"
                  (click)="addToCartWithFeedback(prod)"
                  [class.btn-added-state]="isJustAdded(prod.id)"
                  class="px-3 py-1.5 rounded-lg bg-accent hover:bg-accent-hover active:scale-95 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 min-w-[72px] justify-center cursor-pointer">
                  @if (isJustAdded(prod.id)) {
                    <span>{{ i18n.isRo() ? 'Adăugat' : 'Added' }}</span>
                  } @else {
                    <span>{{ i18n.isRo() ? '+ Coș' : '+ Cart' }}</span>
                  }
                </button>
              </div>
            </div>
          </div>
        }
      </div>

      <div class="text-center mt-10">
        <a routerLink="/produse" 
           class="px-6 py-3 rounded-xl bg-surface-elevated hover:bg-surface-sunken border border-border text-text-primary font-bold text-xs uppercase tracking-wider inline-flex items-center gap-2 transition-all shadow-sm">
          <span>{{ i18n.isRo() ? 'Explorează toate cele ' + totalProductsCount() + ' echipamente în Catalog' : 'Explore all ' + totalProductsCount() + ' hardware products in Catalog' }}</span>
          <span>→</span>
        </a>
      </div>
    </section>

    <!-- 6. Klarna Financing & Enterprise Architecture Section -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lenis-reveal is-revealed">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <!-- Klarna BNPL Interactive Calculator -->
        <div class="bg-surface rounded-2xl border border-border p-6 shadow-panel space-y-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="px-2 py-0.5 rounded bg-[#FFB3C7] text-black font-black text-xs tracking-tight">Klarna.</span>
              <span class="font-bold text-xs uppercase text-text-primary">{{ i18n.isRo() ? 'Simulator Rate fără Dobândă' : '0% Interest Installment Calculator' }}</span>
            </div>
            <span class="text-[10px] font-bold text-accent uppercase">0% DAE</span>
          </div>

          <p class="text-xs text-text-secondary leading-relaxed">
            {{ i18n.isRo() 
              ? 'Împarte costul echipamentelor în 3 rate egale, retrase automat la fiecare 30 de zile. Fără comisioane ascunse, fără card de credit.' 
              : 'Split your hardware acquisition into 3 equal monthly payments. Zero interest, zero hidden fees, instant approval without a credit card.' }}
          </p>

          <div class="space-y-1">
            <div class="flex items-center justify-between text-xs">
              <span class="text-text-muted">{{ i18n.isRo() ? 'Valoare comandă simulată:' : 'Simulated order value:' }}</span>
              <span class="font-bold text-text-primary tabular-nums">{{ klarnaAmount() }} {{ i18n.currencyLabel() }}</span>
            </div>
            <input 
              type="range" 
              min="300" 
              max="10000" 
              step="100" 
              [(ngModel)]="klarnaAmount" 
              class="w-full accent-accent cursor-pointer">
          </div>

          <div class="grid grid-cols-3 gap-2 pt-2 text-center text-xs">
            <div class="p-2.5 rounded-xl bg-surface-sunken border border-border">
              <div class="text-[9px] uppercase font-bold text-text-muted">{{ i18n.isRo() ? 'Rata 1 (Azi)' : 'Payment 1 (Today)' }}</div>
              <div class="text-sm font-black text-text-primary tabular-nums mt-0.5">{{ (klarnaAmount() / 3).toFixed(2) }}</div>
            </div>
            <div class="p-2.5 rounded-xl bg-surface-sunken border border-border">
              <div class="text-[9px] uppercase font-bold text-text-muted">{{ i18n.isRo() ? 'Rata 2 (Ziua 30)' : 'Payment 2 (Day 30)' }}</div>
              <div class="text-sm font-black text-text-primary tabular-nums mt-0.5">{{ (klarnaAmount() / 3).toFixed(2) }}</div>
            </div>
            <div class="p-2.5 rounded-xl bg-surface-sunken border border-border">
              <div class="text-[9px] uppercase font-bold text-text-muted">{{ i18n.isRo() ? 'Rata 3 (Ziua 60)' : 'Payment 3 (Day 60)' }}</div>
              <div class="text-sm font-black text-text-primary tabular-nums mt-0.5">{{ (klarnaAmount() / 3).toFixed(2) }}</div>
            </div>
          </div>
        </div>

        <!-- Section 5.11 System Architecture Banner -->
        <div class="bg-surface rounded-2xl border border-border p-6 shadow-panel space-y-4 flex flex-col justify-between">
          <div>
            <div class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-surface-elevated border border-border text-[10px] font-bold uppercase tracking-wider text-accent mb-2">
              {{ i18n.isRo() ? 'Documentație Proiect HCI // Capitolul 5.11' : 'HCI Documentation // Chapter 5.11' }}
            </div>
            <h3 class="font-display text-xl sm:text-2xl uppercase tracking-tight text-text-primary">
              {{ i18n.isRo() ? 'Arhitectura Sistemului pe Trei Nivele (Three-Tier)' : 'Three-Tier System Architecture Model' }}
            </h3>
            <p class="text-xs text-text-secondary leading-relaxed mt-2">
              {{ i18n.isRo() 
                ? 'Sistemul are la bază framework-ul Angular (Presentation Tier MVC), stratul logic de business (Business Tier Node.js/Express) și Data Access Layer stocat pe MySQL / SQLite.' 
                : 'Built upon Angular (Presentation Tier MVC), independent business logic (Business Tier Node.js/Express), and relational Data Access Layer on MySQL / SQLite.' }}
            </p>
          </div>

          <div class="pt-3 border-t border-border flex items-center justify-between">
            <span class="text-[11px] text-text-muted">
              {{ i18n.isRo() ? 'Descrierea modulelor, securitate & fluxuri' : 'System modules, security & data flows' }}
            </span>
            <a routerLink="/arhitectura" 
               class="px-4 py-2 rounded-xl bg-accent hover:bg-accent-hover text-white font-bold text-xs uppercase tracking-wider transition-all">
              <span>{{ i18n.isRo() ? 'Citește Capitolul 5.11' : 'View Chapter 5.11' }}</span>
              <span class="ml-1">→</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  `
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  productService = inject(ProductService);
  cartService = inject(CartService);
  compService = inject(ComparisonService);
  i18n = inject(TranslationService);
  uiFeedback = inject(UiFeedbackService);
  lenisService = inject(LenisService);
  wishlistService = inject(WishlistService);
  audioService = inject(AudioFeedbackService);

  @ViewChild('waterfallCanvas') waterfallCanvasRef!: ElementRef<HTMLCanvasElement>;
  private waterfallAnimId: number | null = null;

  categories = signal<Category[]>([]);
  featuredProducts = signal<Product[]>([]);
  totalProductsCount = signal<number>(180);
  activeTab = signal<HomeTab>('all');
  justAddedProductIds = signal<number[]>([]);

  // 1. Hero Archetype State
  activeArchetype = signal<ArchetypeKey>('titan');

  archetypesData: Record<ArchetypeKey, {
    badge: string;
    titleRo: string;
    titleEn: string;
    descRo: string;
    descEn: string;
    arch: string;
    power: string;
    io: string;
    os: string;
    price: number;
    cadName: string;
  }> = {
    titan: {
      badge: 'EDGE CLUSTER // QUAD-BLADE',
      titleRo: 'Vexera Titan-9 Edge Compute Node',
      titleEn: 'Vexera Titan-9 Edge Compute Node',
      descRo: 'Nod de cluster quad-blade cu suport pentru 4x module Raspberry Pi CM4 / Radxa CM3, switch gigabit integrat, alimentare PoE+ 802.3at și accelerare AI Coral M.2.',
      descEn: 'Quad-blade cluster node housing 4x Raspberry Pi CM4 / Radxa CM3 modules, integrated managed switch, PoE+ 802.3at input, and Dual Coral Edge TPU M.2 acceleration.',
      arch: 'ARM64 / RISC-V Blade',
      power: '18W - 45W Peak',
      io: 'Dual 2.5GbE + Switch',
      os: 'Proxmox VE / K3s',
      price: 1849.00,
      cadName: 'Titan-9 Edge Compute Node'
    },
    mikrotik: {
      badge: 'ENTERPRISE 10G // SFP+ CORE',
      titleRo: 'MikroTik CRS309-1G-8S+IN 10G Switch',
      titleEn: 'MikroTik CRS309-1G-8S+IN 10G Switch',
      descRo: 'Switch enterprise 10G cu 8 porturi SFP+ 10Gbps și 1 port Gigabit Ethernet cu PoE-In. Răcire pasivă complet silențioasă pentru birouri și homelab.',
      descEn: 'Enterprise 10G switch with 8x SFP+ 10Gbps cages and 1x Gigabit Ethernet PoE-In port. Dual-boot RouterOS / SwOS with silent passive cooling for silent racks.',
      arch: 'Dual-Core 800MHz',
      power: '17W - 23W Max',
      io: '8x 10G SFP+ + 1x 1GbE',
      os: 'RouterOS v7 / SwOS',
      price: 1349.00,
      cadName: 'MikroTik CRS309 10G Switch'
    },
    hackrf: {
      badge: 'CYBERSECURITY // RF LAB',
      titleRo: 'HackRF One Software Defined Radio',
      titleEn: 'HackRF One Software Defined Radio',
      descRo: 'Platformă SDR open-source capabilă de transmisie și recepție semi-duplex între 1 MHz și 6 GHz cu rată de eșantionare de până la 20 Msps în quadrature.',
      descEn: 'Open-source SDR peripheral capable of transmission or reception of radio signals from 1 MHz to 6 GHz. Designed for RF test, SDR analysis, and spectrum exploration.',
      arch: 'LPC4330 + MAX2837',
      power: '< 3W USB Powered',
      io: 'SMA 50Ω + USB 2.0',
      os: 'GNU Radio / SDR#',
      price: 1799.00,
      cadName: 'HackRF One SDR Transceiver'
    }
  };

  currentArchetypeData = computed(() => this.archetypesData[this.activeArchetype()]);

  // 2. Modular Workbench Options
  computeOptions: ModularOption[] = [
    { id: 'arm_cm4', nameRo: 'Turing Pi 2 (4x CM4 Slots)', nameEn: 'Turing Pi 2 (4x CM4 Slots)', detailRo: 'Cluster 4 noduri ARM64 Cortex-A72', detailEn: '4-node cluster ARM64 Cortex-A72', price: 1299, watts: 25 },
    { id: 'x86_xeon', nameRo: 'Intel Xeon D-1541 8C/16T', nameEn: 'Intel Xeon D-1541 8C/16T', detailRo: 'Proxmox Hypervisor dedicat', detailEn: 'Dedicated Proxmox Hypervisor', price: 2499, watts: 45 },
    { id: 'riscv_star', nameRo: 'StarFive VisionFive 2 8GB', nameEn: 'StarFive VisionFive 2 8GB', detailRo: 'Arhitectură deschisă RISC-V 64-bit', detailEn: 'Open architecture RISC-V 64-bit', price: 499, watts: 10 }
  ];

  networkOptions: ModularOption[] = [
    { id: 'dual_10g', nameRo: 'Dual 10G SFP+ Mellanox PCIe', nameEn: 'Dual 10G SFP+ Mellanox PCIe', detailRo: '20 Gbps Throughput agregat optic', detailEn: '20 Gbps aggregate optical throughput', price: 299, watts: 8 },
    { id: 'quad_25g', nameRo: 'Quad 2.5GbE Intel i226-V', nameEn: 'Quad 2.5GbE Intel i226-V', detailRo: '4x porturi RJ45 2.5G independente', detailEn: '4x independent 2.5G RJ45 ports', price: 189, watts: 5 },
    { id: 'poe_gigabit', nameRo: 'PoE+ Splitter 802.3at', nameEn: 'PoE+ Splitter 802.3at', detailRo: 'Alimentare directă din switch', detailEn: 'Power directly via network cable', price: 89, watts: 2 }
  ];

  storageOptions: ModularOption[] = [
    { id: 'nvme_mirror', nameRo: '2x 1TB Samsung 980 PRO', nameEn: '2x 1TB Samsung 980 PRO', detailRo: 'ZFS Mirror NVMe 7000 MB/s', detailEn: 'ZFS Mirror NVMe 7000 MB/s', price: 749, watts: 6 },
    { id: 'sas_array', nameRo: '4x 4TB Enterprise SAS', nameEn: '4x 4TB Enterprise SAS', detailRo: 'Capacitate brută 16TB 24/7', detailEn: 'Raw capacity 16TB 24/7 duty', price: 1599, watts: 24 },
    { id: 'microsd_ind', nameRo: '512GB Industrial MicroSD', nameEn: '512GB Industrial MicroSD', detailRo: 'P/E Cycles ridicate pentru OS', detailEn: 'High P/E endurance for OS', price: 149, watts: 1 }
  ];

  enclosureOptions: ModularOption[] = [
    { id: 'rack_1u', nameRo: '1U Aluminum Rack Chassis', nameEn: '1U Aluminum Rack Chassis', detailRo: 'Montaj standard rack 19" cu ventilatoare', detailEn: 'Standard 19" rackmount with PWM fans', price: 449, watts: 4 },
    { id: 'passive_cnc', nameRo: 'Șasiu Pasiv Billet Aluminum', nameEn: 'Passive CNC Billet Chassis', detailRo: 'Disipare 0 dB complet silențioasă', detailEn: '0 dB completely silent dissipation', price: 289, watts: 0 },
    { id: 'din_rail', nameRo: 'Montură Industrială DIN-Rail', nameEn: 'Industrial DIN-Rail Mount', detailRo: 'Fixare în tablou de automatizare', detailEn: 'Cabinet automation rail clip', price: 119, watts: 0 }
  ];

  selectedCompute = signal<ModularOption>(this.computeOptions[0]);
  selectedNetwork = signal<ModularOption>(this.networkOptions[0]);
  selectedStorage = signal<ModularOption>(this.storageOptions[0]);
  selectedEnclosure = signal<ModularOption>(this.enclosureOptions[0]);

  modularTotalWatts = computed(() => {
    return this.selectedCompute().watts + 
           this.selectedNetwork().watts + 
           this.selectedStorage().watts + 
           this.selectedEnclosure().watts;
  });

  modularTotalPrice = computed(() => {
    return this.selectedCompute().price + 
           this.selectedNetwork().price + 
           this.selectedStorage().price + 
           this.selectedEnclosure().price;
  });

  // 3. Switch Matrix Ports
  switchPorts: SwitchPort[] = [
    { id: 1, label: 'SFP+ 1', type: 'sfp', speed: '10 Gbps', vlan: 'VLAN 10 (WAN)', status: 'active', targetDeviceRo: 'Uplink Fibră Optică RCS&RDS', targetDeviceEn: '10G Fiber WAN Uplink' },
    { id: 2, label: 'SFP+ 2', type: 'sfp', speed: '10 Gbps', vlan: 'VLAN 20 (COR)', status: 'active', targetDeviceRo: 'Proxmox Hypervisor Nod Alpha', targetDeviceEn: 'Proxmox Node Alpha' },
    { id: 3, label: 'SFP+ 3', type: 'sfp', speed: '10 Gbps', vlan: 'VLAN 20 (COR)', status: 'active', targetDeviceRo: 'Proxmox Hypervisor Nod Beta', targetDeviceEn: 'Proxmox Node Beta' },
    { id: 4, label: 'SFP+ 4', type: 'sfp', speed: '10 Gbps', vlan: 'VLAN 30 (SAN)', status: 'active', targetDeviceRo: 'TrueNAS Enterprise Storage', targetDeviceEn: 'TrueNAS Enterprise Storage' },
    { id: 5, label: 'LAN 1', type: 'rj45', speed: '2.5 Gbps', vlan: 'VLAN 40 (WIFI)', status: 'poe', poeWatts: 18.2, targetDeviceRo: 'UniFi U7 Pro Wi-Fi 7 AP', targetDeviceEn: 'UniFi U7 Pro Wi-Fi 7 AP' },
    { id: 6, label: 'LAN 2', type: 'rj45', speed: '1 Gbps', vlan: 'VLAN 50 (IOT)', status: 'poe', poeWatts: 5.4, targetDeviceRo: 'Home Assistant Green Gateway', targetDeviceEn: 'Home Assistant Green Gateway' },
    { id: 7, label: 'LAN 3', type: 'rj45', speed: '1 Gbps', vlan: 'VLAN 60 (DEV)', status: 'active', targetDeviceRo: 'Banc de Test & SDR Lab', targetDeviceEn: 'SDR Lab Test Bench' },
    { id: 8, label: 'SFP+ 8', type: 'sfp', speed: '10 Gbps', vlan: 'VLAN 99 (TRK)', status: 'standby', targetDeviceRo: 'Port Rezervă / Redundanță LACP', targetDeviceEn: 'Redundant LACP Trunk' }
  ];

  selectedPort = signal<SwitchPort>(this.switchPorts[0]);

  // 4. RF Spectrum Waterfall State
  activeRfBand = signal<string>('2.4');

  // 5. Thermal & Fan Simulation State
  thermalCpuLoad = signal<number>(35);
  thermalCalculatedTemp = computed(() => {
    const load = this.thermalCpuLoad();
    return Math.round(28 + (load * 0.44));
  });
  thermalCalculatedRpm = computed(() => {
    const load = this.thermalCpuLoad();
    return Math.round(800 + (load * 34));
  });

  // 6. Klarna Simulated Amount
  klarnaAmount = signal<number>(1800);

  isJustAdded(id: number): boolean {
    return this.justAddedProductIds().includes(id);
  }

  switchArchetype(key: ArchetypeKey) {
    this.audioService.play('switch');
    this.activeArchetype.set(key);
  }

  selectCompute(opt: ModularOption) {
    this.audioService.play('click');
    this.selectedCompute.set(opt);
  }

  selectNetwork(opt: ModularOption) {
    this.audioService.play('click');
    this.selectedNetwork.set(opt);
  }

  selectStorage(opt: ModularOption) {
    this.audioService.play('click');
    this.selectedStorage.set(opt);
  }

  selectEnclosure(opt: ModularOption) {
    this.audioService.play('click');
    this.selectedEnclosure.set(opt);
  }

  selectPort(port: SwitchPort) {
    this.audioService.play('click');
    this.selectedPort.set(port);
  }

  setRfBand(band: string) {
    this.audioService.play('click');
    this.activeRfBand.set(band);
  }

  playDemoSound(sound: 'click' | 'switch' | 'mount' | 'beep' | 'stamp') {
    this.audioService.play(sound);
  }

  onThermalSliderChange() {
    // subtle tactile feedback on slider movement
    if (this.thermalCpuLoad() % 20 === 0) {
      this.audioService.play('click');
    }
  }

  addConfiguredNodeToCart() {
    this.audioService.play('stamp');
    const customProduct: Product = {
      id: 999900 + Math.floor(Math.random() * 999),
      slug: 'custom-assembled-node',
      name: `Custom Node: ${this.selectedCompute().nameEn} (${this.selectedNetwork().nameEn})`,
      sku: `VEX-CUSTOM-${Date.now().toString().slice(-4)}`,
      category_id: 2,
      subcategory: 'servers',
      price_ron: this.modularTotalPrice(),
      stock: 12,
      stock_status: 'in_stock',
      short_desc: `${this.selectedCompute().nameEn} with ${this.selectedNetwork().nameEn}, ${this.selectedStorage().nameEn}, ${this.selectedEnclosure().nameEn}. Total TDP ${this.modularTotalWatts()}W.`,
      full_desc: 'Pre-assembled custom compute node with stress testing and verified BIOS parameters.',
      technical_specs: {
        processor: this.selectedCompute().nameEn,
        interfaces: [this.selectedNetwork().nameEn],
        storage: this.selectedStorage().nameEn,
        power_consumption: `${this.modularTotalWatts()}W`
      },
      tags: ['custom', 'modular', 'cluster', 'edge'],
      image_url: '/assets/images/titan9.png',
      featured: false,
      rating: 5.0,
      review_count: 1
    };

    this.cartService.addToCart(customProduct);
    const msg = this.i18n.isRo() 
      ? `Nod asamblat (${this.modularTotalPrice().toFixed(2)} lei) adăugat în coș!` 
      : `Custom Node (${this.modularTotalPrice().toFixed(2)} RON) added to cart!`;
    this.uiFeedback.showToast(msg, 'success');
  }

  addArchetypeToCart() {
    this.audioService.play('stamp');
    const data = this.currentArchetypeData();
    const mockProduct: Product = {
      id: 888800 + (this.activeArchetype() === 'titan' ? 1 : this.activeArchetype() === 'mikrotik' ? 2 : 3),
      slug: this.activeArchetype() === 'titan' ? 'vexera-titan-9' : this.activeArchetype() === 'mikrotik' ? 'mikrotik-crs309' : 'hackrf-one-sdr',
      name: data.titleEn,
      sku: `VEX-${this.activeArchetype().toUpperCase()}-NODE`,
      category_id: this.activeArchetype() === 'hackrf' ? 7 : 5,
      subcategory: this.activeArchetype() === 'hackrf' ? 'sdr' : 'networking',
      price_ron: data.price,
      stock: 8,
      stock_status: 'in_stock',
      short_desc: data.descEn,
      full_desc: data.descEn,
      technical_specs: {
        architecture: data.arch,
        power: data.power,
        interfaces: [data.io],
        os: data.os
      },
      tags: ['enterprise', 'node', 'rack'],
      image_url: '/assets/images/titan9.png',
      featured: true,
      rating: 5.0,
      review_count: 7
    };

    this.cartService.addToCart(mockProduct);
    const msg = this.i18n.isRo() 
      ? `${data.titleRo} adăugat în coș!` 
      : `${data.titleEn} added to cart!`;
    this.uiFeedback.showToast(msg, 'success');
  }

  addToCartWithFeedback(prod: Product) {
    this.audioService.play('beep');
    this.cartService.addToCart(prod);
    const prodName = this.i18n.getProductName(prod);
    const msg = this.i18n.isRo() ? `${prodName} adăugat în coș` : `${prodName} added to cart`;
    this.uiFeedback.showToast(msg, 'success');
    
    this.justAddedProductIds.update(ids => [...ids, prod.id]);
    setTimeout(() => {
      this.justAddedProductIds.update(ids => ids.filter(i => i !== prod.id));
    }, 1500);
  }

  scrollToInventory() {
    this.audioService.play('click');
    this.lenisService.scrollTo('#inventory-grid', { offset: -48, duration: 1.15 });
  }

  setCategoryTab(tab: HomeTab) {
    this.audioService.play('click');
    this.activeTab.set(tab);
    setTimeout(() => {
      this.lenisService.observeRevealElements();
      this.lenisService.resize();
    }, 50);
  }

  ngOnInit() {
    this.productService.getCategories().subscribe(cats => {
      this.categories.set(cats);
      const total = cats.reduce((acc, c) => acc + (Number(c.product_count) || 0), 0);
      if (total > 0) {
        this.totalProductsCount.set(total);
      }
    });

    this.productService.getProducts({ featured: true, limit: 30 }).subscribe({
      next: (prods) => {
        this.featuredProducts.set(prods);
        setTimeout(() => {
          this.lenisService.observeRevealElements();
          this.lenisService.resize();
        }, 100);
      }
    });
  }

  ngAfterViewInit() {
    this.initWaterfallCanvas();
  }

  ngOnDestroy() {
    if (this.waterfallAnimId !== null) {
      cancelAnimationFrame(this.waterfallAnimId);
    }
  }

  private initWaterfallCanvas() {
    if (!this.waterfallCanvasRef?.nativeElement) return;
    const canvas = this.waterfallCanvasRef.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth || 400;
    canvas.height = canvas.offsetHeight || 120;

    let offset = 0;
    const render = () => {
      offset += 0.05;
      ctx.fillStyle = '#0a0d14';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw grid lines
      ctx.strokeStyle = '#1e2638';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // Draw simulated live RF carrier peaks
      ctx.beginPath();
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = '#b86830'; // signal orange

      const peak1 = canvas.width * 0.35;
      const peak2 = canvas.width * 0.68;

      for (let x = 0; x < canvas.width; x++) {
        const noise = (Math.sin(x * 0.15 + offset * 3) + Math.cos(x * 0.08 - offset * 2)) * 3;
        const dist1 = Math.abs(x - peak1);
        const dist2 = Math.abs(x - peak2);
        const signal1 = Math.exp(-dist1 * dist1 / 180) * 45;
        const signal2 = Math.exp(-dist2 * dist2 / 240) * 35;

        const y = canvas.height - 18 - (signal1 + signal2 + noise + Math.sin(offset + x * 0.02) * 5);
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();

      this.waterfallAnimId = requestAnimationFrame(render);
    };

    render();
  }

  filteredFeaturedProducts() {
    const tab = this.activeTab();
    const list = this.featuredProducts();
    if (tab === 'all') return list;
    if (tab === 'cybersecurity') return list.filter(p => p.category_id === 7);
    if (tab === 'enterprise') return list.filter(p => p.category_id === 5);
    if (tab === 'niche') return list.filter(p => p.category_id === 6);
    if (tab === 'homelab') return list.filter(p => p.category_id === 2);
    if (tab === 'sbc') return list.filter(p => p.category_id === 1);
    if (tab === 'sensors') return list.filter(p => p.category_id === 3);
    if (tab === 'power') return list.filter(p => p.category_id === 4);
    return list;
  }
}
