import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LabPresetsService } from '../../services/lab-presets.service';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { CompatibilityService } from '../../services/compatibility.service';
import { RackBuilderService, CATALOG_RACK_ITEMS } from '../../services/rack-builder.service';
import { TranslationService } from '../../services/translation.service';
import { LabGoalOption, BudgetTier, RackUnitItem } from '../../models/lab-builder.model';
import { Product } from '../../models/product.model';
import { UiBadgeComponent } from '../../components/ui/ui-badge.component';
import { UiCompatibilityEngineComponent } from '../../components/ui/ui-compatibility-engine.component';
import { LenisService } from '../../services/lenis.service';

@Component({
  selector: 'app-lab-builder',
  standalone: true,
  imports: [RouterLink, FormsModule, UiBadgeComponent, UiCompatibilityEngineComponent],
  template: `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lenis-reveal is-revealed">
      
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-border">
        <div>
          <div class="flex items-center gap-2 mb-1">
            <h1 class="font-display text-2xl sm:text-3xl lg:text-4xl text-text-primary tracking-wide uppercase">
              {{ i18n.isRo() ? 'Build Your Lab — Configurator Tehnic' : 'Build Your Lab — Systems Architect' }}
            </h1>
            <app-ui-badge variant="accent">Enterprise Core</app-ui-badge>
          </div>
          <p class="text-xs text-text-muted">
            {{ i18n.isRo() 
              ? 'Proiectează arhitectura laboratorului tău pe baza obiectivului de operare, validează compatibilitatea și dimensionează rack-ul.' 
              : 'Design lab architecture by operational objective, validate cross-component power/PCIe specs, and inspect rack units.' }}
          </p>
        </div>

        <div class="inline-flex p-1 rounded-lg bg-surface border border-border text-xs">
          <button 
            type="button" 
            (click)="setMainTab('builder')"
            [class.bg-surface-elevated]="activeMainTab() === 'builder'"
            [class.text-text-primary]="activeMainTab() === 'builder'"
            [class.border]="activeMainTab() === 'builder'"
            [class.border-border]="activeMainTab() === 'builder'"
            [class.text-text-muted]="activeMainTab() !== 'builder'"
            class="px-3.5 py-1.5 rounded transition-colors flex items-center gap-1.5 font-medium">
            <span>{{ i18n.isRo() ? 'Configurator Proiect' : 'Project Configurator' }}</span>
          </button>
          <button 
            type="button" 
            (click)="setMainTab('rack')"
            [class.bg-surface-elevated]="activeMainTab() === 'rack'"
            [class.text-text-primary]="activeMainTab() === 'rack'"
            [class.border]="activeMainTab() === 'rack'"
            [class.border-border]="activeMainTab() === 'rack'"
            [class.text-text-muted]="activeMainTab() !== 'rack'"
            class="px-3.5 py-1.5 rounded transition-colors flex items-center gap-1.5 font-medium">
            <span>{{ i18n.isRo() ? 'Rack Builder 19"' : '19" Rack Builder' }}</span>
          </button>
          <button 
            type="button" 
            (click)="setMainTab('topology')"
            [class.bg-surface-elevated]="activeMainTab() === 'topology'"
            [class.text-text-primary]="activeMainTab() === 'topology'"
            [class.border]="activeMainTab() === 'topology'"
            [class.border-border]="activeMainTab() === 'topology'"
            [class.text-text-muted]="activeMainTab() !== 'topology'"
            class="px-3.5 py-1.5 rounded transition-colors flex items-center gap-1.5 font-medium">
            <span>{{ i18n.isRo() ? 'Topologie Rețea' : 'Network Topology' }}</span>
          </button>
        </div>
      </div>

      @if (activeMainTab() === 'builder') {
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <div class="lg:col-span-8 space-y-8">
            
            <div class="bg-surface rounded-xl border border-border p-6 shadow-xs transition-colors">
              <div class="flex items-center justify-between mb-4">
                <h3 class="font-heading text-xs font-bold uppercase tracking-wider text-text-primary flex items-center gap-2">
                  <span class="w-5 h-5 rounded-full bg-primary text-primary-contrast text-[10px] flex items-center justify-center font-bold">1</span>
                  {{ i18n.isRo() ? 'Obiectivul de laborator (What are you building?)' : 'Select Lab Goal (What are you building?)' }}
                </h3>
                <span class="text-xs text-text-muted tabular-nums">{{ presetsService.goals.length }} opțiuni</span>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 lenis-reveal-stagger is-revealed">
                @for (goal of presetsService.goals; track goal.id) {
                  <div 
                    (click)="selectedGoal.set(goal)"
                    [class.border-accent]="selectedGoal().id === goal.id"
                    [class.bg-surface-elevated]="selectedGoal().id === goal.id"
                    [class.border-border]="selectedGoal().id !== goal.id"
                    class="spotlight-card lenis-velocity-card p-3.5 rounded-lg border hover:border-border-focus cursor-pointer transition-all flex items-start gap-3">
                    <div class="w-8 h-8 rounded-lg bg-surface-elevated border border-border flex items-center justify-center text-primary flex-shrink-0 mt-0.5">
                      @switch (goal.id) {
                        @case ('cybersecurity') {
                          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
                        }
                        @case ('homelab') {
                          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="7" rx="1"/><rect x="2" y="14" width="20" height="7" rx="1"/><line x1="6" y1="6.5" x2="6.01" y2="6.5"/><line x1="6" y1="17.5" x2="6.01" y2="17.5"/></svg>
                        }
                        @case ('nas') {
                          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"/></svg>
                        }
                        @case ('router_firewall') {
                          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9"/></svg>
                        }
                        @case ('kubernetes') {
                          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>
                        }
                        @case ('iot') {
                          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"/></svg>
                        }
                        @case ('os_development') {
                          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>
                        }
                        @default {
                          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                        }
                      }
                    </div>
                    <div class="min-w-0">
                      <div class="font-heading text-xs font-bold text-text-primary mb-0.5 truncate">
                        {{ i18n.isRo() ? goal.title : goal.titleEn }}
                      </div>
                      <p class="text-[11px] text-text-muted line-clamp-2 leading-relaxed">
                        {{ i18n.isRo() ? goal.description : goal.descriptionEn }}
                      </p>
                    </div>
                  </div>
                }
              </div>
            </div>

            <div class="bg-surface rounded-xl border border-border p-6 shadow-xs transition-colors">
              <div class="flex items-center justify-between mb-4">
                <h3 class="font-heading text-xs font-bold uppercase tracking-wider text-text-primary flex items-center gap-2">
                  <span class="w-5 h-5 rounded-full bg-primary text-primary-contrast text-[10px] flex items-center justify-center font-bold">2</span>
                  {{ i18n.isRo() ? 'Segmentul de Buget' : 'Target Budget Tier' }}
                </h3>
              </div>

              <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <button 
                  type="button"
                  (click)="selectedBudget.set('budget')"
                  [class.bg-surface-elevated]="selectedBudget() === 'budget'"
                  [class.border-accent]="selectedBudget() === 'budget'"
                  [class.text-text-primary]="selectedBudget() === 'budget'"
                  [class.border-border]="selectedBudget() !== 'budget'"
                  [class.text-text-muted]="selectedBudget() !== 'budget'"
                  class="p-3 rounded-lg border text-center transition-all">
                  <div class="text-xs font-bold uppercase">Budget</div>
                  <div class="text-[10px] opacity-75 mt-0.5 tabular-nums">&lt; 1.000 lei</div>
                </button>

                <button 
                  type="button"
                  (click)="selectedBudget.set('balanced')"
                  [class.bg-surface-elevated]="selectedBudget() === 'balanced'"
                  [class.border-accent]="selectedBudget() === 'balanced'"
                  [class.text-text-primary]="selectedBudget() === 'balanced'"
                  [class.border-border]="selectedBudget() !== 'balanced'"
                  [class.text-text-muted]="selectedBudget() !== 'balanced'"
                  class="p-3 rounded-lg border text-center transition-all">
                  <div class="text-xs font-bold uppercase">Balanced</div>
                  <div class="text-[10px] opacity-75 mt-0.5 tabular-nums">1.000–2.500 lei</div>
                </button>

                <button 
                  type="button"
                  (click)="selectedBudget.set('performance')"
                  [class.bg-surface-elevated]="selectedBudget() === 'performance'"
                  [class.border-accent]="selectedBudget() === 'performance'"
                  [class.text-text-primary]="selectedBudget() === 'performance'"
                  [class.border-border]="selectedBudget() !== 'performance'"
                  [class.text-text-muted]="selectedBudget() !== 'performance'"
                  class="p-3 rounded-lg border text-center transition-all">
                  <div class="text-xs font-bold uppercase">Performance</div>
                  <div class="text-[10px] opacity-75 mt-0.5 tabular-nums">2.500–5.000 lei</div>
                </button>

                <button 
                  type="button"
                  (click)="selectedBudget.set('enterprise')"
                  [class.bg-surface-elevated]="selectedBudget() === 'enterprise'"
                  [class.border-accent]="selectedBudget() === 'enterprise'"
                  [class.text-text-primary]="selectedBudget() === 'enterprise'"
                  [class.border-border]="selectedBudget() !== 'enterprise'"
                  [class.text-text-muted]="selectedBudget() !== 'enterprise'"
                  class="p-3 rounded-lg border text-center transition-all">
                  <div class="text-xs font-bold uppercase">Enterprise</div>
                  <div class="text-[10px] opacity-75 mt-0.5 tabular-nums">5.000+ lei</div>
                </button>
              </div>
            </div>

            <div class="bg-surface rounded-xl border border-border p-6 shadow-xs transition-colors">
              <h3 class="font-heading text-xs font-bold uppercase tracking-wider text-text-primary flex items-center gap-2 mb-3">
                <span class="w-5 h-5 rounded-full bg-primary text-primary-contrast text-[10px] flex items-center justify-center font-bold">3</span>
                {{ i18n.isRo() ? 'Ecosistem Software Recomandat' : 'Verified Software Stack' }}
              </h3>
              <div class="flex flex-wrap items-center gap-2">
                @for (os of selectedGoal().suggestedOs; track os) {
                  <app-ui-badge variant="success">{{ os }}</app-ui-badge>
                }
              </div>
            </div>

            <div class="bg-surface rounded-xl border border-border p-6 shadow-xs transition-colors">
              <div class="flex items-center justify-between mb-4">
                <h3 class="font-heading text-sm font-semibold text-text-primary flex items-center gap-2">
                  <span class="w-5 h-5 rounded-full bg-primary text-primary-contrast text-[10px] flex items-center justify-center font-bold">4</span>
                  {{ i18n.isRo() ? 'Kit Hardware Recomandat' : 'Hardware Package Items' }}
                </h3>
                <span class="text-xs text-text-muted tabular-nums">{{ bundleProducts().length }} echipamente</span>
              </div>

              @if (bundleProducts().length === 0) {
                <div class="p-6 text-center text-xs text-text-muted">
                  Se încarcă componentele optime din catalog...
                </div>
              } @else {
                <div class="divide-y divide-border">
                  @for (prod of bundleProducts(); track prod.id) {
                    <div class="py-3 flex items-center justify-between gap-4 first:pt-0 last:pb-0">
                      <div class="flex items-center gap-3 min-w-0">
                        <img [src]="prod.image_url" [alt]="prod.name" class="w-12 h-12 object-contain rounded bg-canvas-subtle border border-border p-1 flex-shrink-0">
                        <div class="min-w-0">
                          <a [routerLink]="['/produs', prod.slug]" class="font-heading text-xs font-semibold text-text-primary hover:text-primary truncate block">
                            {{ prod.name }}
                          </a>
                          <div class="flex items-center gap-2 text-[11px] text-text-muted mt-0.5">
                            <span>{{ prod.sku }}</span>
                            <span>•</span>
                            <span class="text-text-primary font-medium">{{ prod.subcategory }}</span>
                          </div>
                        </div>
                      </div>

                      <div class="text-right flex-shrink-0">
                        <div class="text-xs font-bold text-text-primary tabular-nums">
                          {{ prod.price_ron.toFixed(2) }} lei
                        </div>
                        <span class="text-[10px] text-emerald-400 font-medium">● În stoc</span>
                      </div>
                    </div>
                  }
                </div>
              }
            </div>

          </div>

          <div class="lg:col-span-4 space-y-6">
            
            <div class="bg-surface rounded-xl border border-border p-5 shadow-xs sticky top-20 transition-colors space-y-4">
              <div class="flex items-center justify-between pb-3 border-b border-border">
                <h4 class="font-heading text-xs font-semibold text-text-primary">
                  Compatibility Matrix
                </h4>
                <span class="text-xs text-primary font-medium">{{ selectedGoal().id }}</span>
              </div>

              <app-ui-compatibility-engine 
                [result]="compatibilityResult()"
                [compact]="false"
                (addFix)="onAddFixToBundle($event)">
              </app-ui-compatibility-engine>

              <div class="pt-4 border-t border-border space-y-3">
                <div class="flex items-center justify-between text-xs">
                  <span class="text-text-muted">{{ i18n.isRo() ? 'Total Pachet Hardware:' : 'Bundle Total:' }}</span>
                  <span class="text-lg font-bold text-text-primary tabular-nums">
                    {{ bundleTotalPrice().toFixed(2) }} lei
                  </span>
                </div>

                <div class="text-[11px] text-emerald-400 font-medium flex items-center gap-1.5">
                  <svg class="w-3.5 h-3.5 text-emerald-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
                  <span>{{ i18n.isRo() ? 'Livrare Sameday Gratuită Inclusă' : 'Free Express Courier Delivery Included' }}</span>
                </div>

                <button 
                  type="button"
                  (click)="addAllBundleToCart()"
                  [disabled]="bundleProducts().length === 0"
                  class="w-full py-2.5 px-4 rounded-lg bg-primary hover:bg-primary-hover text-primary-contrast font-semibold text-xs transition-all flex items-center justify-center gap-2 shadow-xs">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
                  </svg>
                  <span>{{ i18n.isRo() ? 'Adaugă Tot Pachetul în Coș' : 'Add Entire Bundle to Cart' }}</span>
                </button>
              </div>

            </div>

          </div>

        </div>
      }

      @if (activeMainTab() === 'rack') {
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <div class="lg:col-span-8 bg-surface rounded-xl border border-border p-6 shadow-xs transition-colors">
            
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-border">
              <div>
                <h3 class="font-heading text-sm font-semibold text-text-primary">
                  {{ i18n.isRo() ? 'Șasiu Rack 19" Standard EIA-310' : '19" Standard EIA-310 Rack Enclosure' }}
                </h3>
                <p class="text-xs text-text-muted mt-0.5">
                  {{ rackService.usedUnits() }}U ocupat din {{ rackService.totalUnits() }}U total ({{ rackService.freeUnits() }}U libere)
                </p>
              </div>

              <div class="flex items-center gap-1.5 text-xs">
                <span class="text-text-muted">{{ i18n.isRo() ? 'Format:' : 'Size:' }}</span>
                @for (size of [6, 9, 12, 18, 24]; track size) {
                  <button 
                    type="button" 
                    (click)="rackService.setRackSize(size)"
                    [class.bg-surface-elevated]="rackService.totalUnits() === size"
                    [class.border-accent]="rackService.totalUnits() === size"
                    [class.text-text-primary]="rackService.totalUnits() === size"
                    [class.border-border]="rackService.totalUnits() !== size"
                    [class.text-text-muted]="rackService.totalUnits() !== size"
                    class="px-2.5 py-1 rounded border font-semibold text-xs transition-colors">
                    {{ size }}U
                  </button>
                }
              </div>
            </div>

            <div class="bg-canvas-subtle rounded-xl p-5 border border-border max-w-xl mx-auto shadow-2xl relative">
              <div class="flex justify-between text-[9px] text-text-muted mb-2 px-6 font-medium">
                <span>◄ ȘINĂ STÂNGA 19"</span>
                <span>ȘINĂ DREAPTA 19" ►</span>
              </div>

              <div class="space-y-1.5">
                @for (slot of rackService.slots(); track $index; let idx = $index) {
                  @let unitNum = rackService.totalUnits() - idx;
                  <div class="flex items-center gap-2">
                    <span class="w-7 text-right text-[10px] text-text-muted font-bold tabular-nums">U{{ unitNum }}</span>
                    
                    @if (slot) {
                      <div 
                        [style.border-left-color]="slot.colorHex"
                        class="flex-1 h-10 bg-surface border border-border border-l-4 rounded px-3 flex items-center justify-between text-xs text-text-primary shadow-xs">
                        <div class="flex items-center gap-2 min-w-0">
                          <span class="w-2 h-2 rounded-full" [style.background-color]="slot.colorHex"></span>
                          <span class="font-bold truncate text-[11px]">{{ slot.name }}</span>
                          <span class="text-[9px] px-1.5 py-0.5 rounded bg-surface-elevated text-text-muted tabular-nums">{{ slot.powerWatts }}W</span>
                        </div>
                        <button 
                          type="button" 
                          (click)="rackService.removeItem(idx)"
                          class="w-5 h-5 rounded flex items-center justify-center text-text-muted hover:text-rose-400 hover:bg-surface-elevated transition-colors"
                          title="Elimină din rack"
                          aria-label="Elimină din rack">
                          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
                        </button>
                      </div>
                    } @else {
                      <div 
                        (click)="openSlotSelector(idx)"
                        class="flex-1 h-10 border border-dashed border-border rounded flex items-center justify-center text-[10px] text-text-muted hover:border-border-focus hover:text-text-primary cursor-pointer transition-colors font-medium">
                        + {{ i18n.isRo() ? 'Slot U' + unitNum + ' Liber (Click pentru a monta echipament)' : 'Slot U' + unitNum + ' Empty (Click to Mount)' }}
                      </div>
                    }
                  </div>
                }
              </div>

              <div class="mt-4 pt-3 border-t border-border flex items-center justify-between text-xs font-medium">
                <button 
                  type="button" 
                  (click)="rackService.loadSampleHomelabRack()"
                  class="text-[11px] text-primary hover:underline">
                  {{ i18n.isRo() ? 'Încarcă Configurație Homelab 12U' : 'Load 12U Homelab Preset' }}
                </button>
                <button 
                  type="button" 
                  (click)="rackService.clearRack()"
                  class="text-[11px] text-rose-400 hover:underline">
                  {{ i18n.isRo() ? 'Golește Rack' : 'Clear Rack' }}
                </button>
              </div>

            </div>

          </div>

          <div class="lg:col-span-4 space-y-6">
            
            <div class="bg-surface rounded-xl border border-border p-5 shadow-xs transition-colors">
              <h4 class="font-heading text-xs font-semibold text-text-primary mb-4 flex items-center gap-2">
                <span>{{ i18n.isRo() ? 'Telemetrie Șasiu Rack' : 'Rack Chassis Telemetry' }}</span>
              </h4>

              <div class="space-y-2.5 text-xs">
                <div class="flex items-center justify-between p-2 rounded bg-surface-elevated border border-border">
                  <span class="text-text-muted">{{ i18n.isRo() ? 'Putere Estimată:' : 'Estimated Power:' }}</span>
                  <span class="font-bold text-text-primary tabular-nums">{{ rackService.totalPowerWatts() }} Watts</span>
                </div>
                <div class="flex items-center justify-between p-2 rounded bg-surface-elevated border border-border">
                  <span class="text-text-muted">{{ i18n.isRo() ? 'Greutate Totală:' : 'Total Weight:' }}</span>
                  <span class="font-bold text-text-primary tabular-nums">{{ rackService.totalWeightKg().toFixed(1) }} kg</span>
                </div>
                <div class="flex items-center justify-between p-2 rounded bg-surface-elevated border border-border">
                  <span class="text-text-muted">{{ i18n.isRo() ? 'Grad Ocupare:' : 'Occupancy Rate:' }}</span>
                  <span class="font-bold text-emerald-400 tabular-nums">
                    {{ ((rackService.usedUnits() / rackService.totalUnits()) * 100).toFixed(0) }}%
                  </span>
                </div>
              </div>

              <div class="mt-3 pt-2 border-t border-border text-[10px] text-text-muted">
                {{ i18n.isRo() ? 'Calculat conform specificațiilor termice și maselor certificatelor producătorilor.' : 'Calculated per OEM thermal ratings and certified hardware weights.' }}
              </div>
            </div>

            <div class="bg-surface rounded-xl border border-border p-5 shadow-xs transition-colors">
              <h4 class="font-heading text-xs font-semibold text-text-primary mb-3">
                {{ i18n.isRo() ? 'Echipamente Montabile în Rack 19"' : 'Mountable 19" Rack Hardware' }}
              </h4>
              <div class="space-y-2">
                @for (item of availableRackItems; track item.id) {
                  <div class="p-2.5 rounded border border-border hover:border-border-focus flex items-center justify-between gap-2 text-xs">
                    <div class="min-w-0">
                      <div class="font-bold text-text-primary truncate text-[11px]">{{ item.name }}</div>
                      <div class="text-[10px] text-text-muted tabular-nums">{{ item.uSize }}U • {{ item.powerWatts }}W • {{ item.weightKg }}kg</div>
                    </div>
                    <button 
                      type="button" 
                      (click)="autoMountItem(item)"
                      class="px-2.5 py-1 rounded bg-surface-elevated hover:bg-surface text-text-primary text-[10px] font-medium border border-border flex-shrink-0">
                      {{ i18n.isRo() ? '+ Montează' : '+ Mount' }}
                    </button>
                  </div>
                }
              </div>
            </div>

          </div>

        </div>
      }

      @if (activeMainTab() === 'topology') {
        <div class="bg-surface rounded-xl border border-border p-8 shadow-xs transition-colors">
          <div class="max-w-3xl mx-auto text-center mb-8">
            <h3 class="font-heading text-base sm:text-lg font-bold text-text-primary mb-1">
              {{ i18n.isRo() ? 'Topologie Arhitecturală Homelab & Datacenter' : 'Homelab & Datacenter Network Architecture' }}
            </h3>
            <p class="text-xs text-text-muted">
              {{ i18n.isRo() ? 'Segmentare L2/L3 prin VLAN-uri izolate, legături trunk 10GbE SFP+ DAC și inspecție hardware TAP.' : 'L2/L3 segmentation across isolated VLANs, 10GbE SFP+ DAC trunks, and hardware TAP packet capture.' }}
            </p>
          </div>

          <div class="max-w-4xl mx-auto bg-canvas-subtle rounded-xl p-6 sm:p-10 border border-border text-text-primary shadow-2xl relative overflow-hidden">
            
            <div class="flex flex-col items-center space-y-6">
              
              <div class="flex items-center gap-3 px-5 py-2.5 rounded-lg bg-surface border border-border shadow-xs">
                <div class="w-8 h-8 rounded-lg bg-surface-elevated border border-border flex items-center justify-center text-primary flex-shrink-0">
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9"/></svg>
                </div>
                <div>
                  <div class="text-xs font-bold text-text-primary font-heading">WAN / Fiber ONT (RDS 1Gbps / 10Gbps)</div>
                  <div class="text-[10px] text-text-muted">IP Public Static / PPPoE VLAN 35</div>
                </div>
              </div>

              <div class="w-0.5 h-6 bg-border"></div>

              <div class="flex items-center gap-4 px-6 py-3.5 rounded-lg bg-surface border border-emerald-500/80 shadow-md max-w-md w-full">
                <div class="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 flex-shrink-0">
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
                </div>
                <div class="min-w-0 flex-1">
                  <div class="text-xs font-bold text-emerald-400 font-heading">MikroTik RB5009UG+S+IN / OPNsense</div>
                  <div class="text-[10px] text-text-muted">RouterOS v7 • WireGuard VPN • NAT & Inter-VLAN Routing</div>
                  <div class="text-[9px] text-emerald-400 font-bold mt-0.5">Port SFP+ 10Gbps Trunk către Core Switch</div>
                </div>
              </div>

              <div class="w-0.5 h-6 bg-border"></div>

              <div class="flex items-center gap-4 px-6 py-3.5 rounded-lg bg-surface border border-blue-500/80 shadow-md max-w-md w-full">
                <div class="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 flex-shrink-0">
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                </div>
                <div class="min-w-0 flex-1">
                  <div class="text-xs font-bold text-blue-400 font-heading">MikroTik CRS305 / CRS309 (Core Switch 10G SFP+)</div>
                  <div class="text-[10px] text-text-muted">VLAN 10 (LAN) • VLAN 20 (Homelab) • VLAN 30 (IoT) • VLAN 40 (DMZ)</div>
                  <div class="text-[9px] text-blue-400 font-bold mt-0.5">8x 10G SFP+ Cuplare Directă DAC 0.5m / 1m</div>
                </div>
              </div>

              <div class="w-full max-w-xl h-0.5 bg-border mt-2"></div>

              <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-3xl pt-2">
                
                <div class="p-3.5 rounded-lg bg-surface border border-border text-center space-y-1.5 flex flex-col items-center">
                  <div class="w-8 h-8 rounded-lg bg-surface-elevated border border-border flex items-center justify-center text-text-primary">
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="7" rx="1"/><rect x="2" y="14" width="20" height="7" rx="1"/><line x1="6" y1="6.5" x2="6.01" y2="6.5"/><line x1="6" y1="17.5" x2="6.01" y2="17.5"/></svg>
                  </div>
                  <div class="text-xs font-bold text-text-primary font-heading">Nod Proxmox VE</div>
                  <div class="text-[10px] text-text-muted">Dual SFP+ 10G LACP</div>
                  <div class="text-[9px] text-emerald-400 font-bold">LXC & Docker Stacks</div>
                </div>

                <div class="p-3.5 rounded-lg bg-surface border border-border text-center space-y-1.5 flex flex-col items-center">
                  <div class="w-8 h-8 rounded-lg bg-surface-elevated border border-border flex items-center justify-center text-text-primary">
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"/></svg>
                  </div>
                  <div class="text-xs font-bold text-text-primary font-heading">TrueNAS ZFS Storage</div>
                  <div class="text-[10px] text-text-muted">10GbE SFP+ iSCSI & NFS</div>
                  <div class="text-[9px] text-blue-400 font-bold">ZFS Pool NVMe Cache</div>
                </div>

                <div class="p-3.5 rounded-lg bg-surface border border-border text-center space-y-1.5 flex flex-col items-center">
                  <div class="w-8 h-8 rounded-lg bg-surface-elevated border border-border flex items-center justify-center text-text-primary">
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
                  </div>
                  <div class="text-xs font-bold text-text-primary font-heading">Hardware Network TAP</div>
                  <div class="text-[10px] text-text-muted">Inspecție pasivă pcap</div>
                  <div class="text-[9px] text-rose-400 font-bold">Suricata IDS / Zeek</div>
                </div>

              </div>

            </div>

          </div>

        </div>
      }

    </div>
  `
})
export class LabBuilderComponent implements OnInit {
  presetsService = inject(LabPresetsService);
  productService = inject(ProductService);
  cartService = inject(CartService);
  compatService = inject(CompatibilityService);
  rackService = inject(RackBuilderService);
  i18n = inject(TranslationService);
  lenisService = inject(LenisService);
  route = inject(ActivatedRoute);

  activeMainTab = signal<'builder' | 'rack' | 'topology'>('builder');

  setMainTab(tab: 'builder' | 'rack' | 'topology') {
    this.activeMainTab.set(tab);
    setTimeout(() => {
      this.lenisService.resize();
      this.lenisService.observeRevealElements();
    }, 50);
  }

  selectedGoal = signal<LabGoalOption>(this.presetsService.goals[0]);
  selectedBudget = signal<BudgetTier>('balanced');

  allCatalogProducts = signal<Product[]>([]);

  availableRackItems = CATALOG_RACK_ITEMS;

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['tab'] === 'rack') this.activeMainTab.set('rack');
      if (params['tab'] === 'topology') this.activeMainTab.set('topology');
      if (params['goal']) {
        const found = this.presetsService.goals.find(g => g.id === params['goal']);
        if (found) this.selectedGoal.set(found);
      }
    });

    this.productService.getProducts({ limit: 120 }).subscribe(prods => {
      this.allCatalogProducts.set(prods);
    });
  }

  bundleProducts = computed<Product[]>(() => {
    const goal = this.selectedGoal();
    const budget = this.selectedBudget();
    const skus = goal.recommendedSkus[budget] || [];
    const prods = this.allCatalogProducts();

    return prods.filter(p => skus.some(sku => sku.toLowerCase() === p.sku.toLowerCase()));
  });

  bundleTotalPrice = computed(() => {
    return this.bundleProducts().reduce((acc, p) => acc + p.price_ron, 0);
  });

  compatibilityResult = computed(() => {
    return this.compatService.evaluateCompatibility(this.bundleProducts());
  });

  addAllBundleToCart(): void {
    const prods = this.bundleProducts();
    prods.forEach(p => {
      this.cartService.addToCart(p, 1);
    });
    this.cartService.isOpen.set(true);
  }

  onAddFixToBundle(sku: string): void {
    const match = this.allCatalogProducts().find(p => p.sku.toLowerCase() === sku.toLowerCase());
    if (match) {
      this.cartService.addToCart(match, 1);
    }
  }

  openSlotSelector(slotIndex: number): void {
    const item = this.availableRackItems[slotIndex % this.availableRackItems.length];
    this.rackService.placeItem(slotIndex, item);
  }

  autoMountItem(item: RackUnitItem): void {
    const slots = this.rackService.slots();
    for (let i = 0; i <= slots.length - item.uSize; i++) {
      let canPlace = true;
      for (let j = 0; j < item.uSize; j++) {
        if (slots[i + j] !== null) {
          canPlace = false;
          break;
        }
      }
      if (canPlace) {
        this.rackService.placeItem(i, item);
        return;
      }
    }
  }
}
