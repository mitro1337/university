import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { TranslationService } from '../../services/translation.service';
import { ThemeService } from '../../services/theme.service';
import { ComparisonService } from '../../services/comparison.service';
import { LabProfileService } from '../../services/lab-profile.service';
import { KeyboardShortcutsService } from '../../services/keyboard-shortcuts.service';
import { AccessibilityService } from '../../services/accessibility.service';
import { WishlistService } from '../../services/wishlist.service';
import { UiFeedbackService } from '../../services/ui-feedback.service';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, FormsModule, TranslatePipe],
  template: `
    <header class="header-nav sticky top-0 z-40 transition-colors">
      <!-- HCI Telemetry & Affordances Top Strip -->
      <div class="border-b border-border/80 bg-surface-sunken/90 backdrop-blur-md py-1 px-4 sm:px-6 lg:px-8 text-[11px] font-mono text-text-muted select-none">
        <div class="max-w-7xl mx-auto flex items-center justify-between gap-3">
          
          <div class="flex items-center gap-3">
            <span class="inline-flex items-center gap-1.5 text-text-primary font-semibold">
              <span class="led-indicator-3d" style="--led-color: #00ff9d; --led-glow: rgba(0, 255, 157, 0.8)"></span>
              <span class="text-[10px] tracking-wider text-cyan-400">HCI TACTILE 3D</span>
            </span>
            <span class="text-border hidden sm:inline">|</span>
            <span class="hidden sm:inline-flex items-center gap-1 text-[10px] text-text-secondary">
              <span>LATENCY:</span>
              <span class="text-emerald-400 font-bold tabular-nums">{{ uiFeedback.latencyMs() }}ms</span>
            </span>
          </div>

          <div class="flex items-center gap-2 sm:gap-4">
            <!-- 3D Tilt Mode Toggle -->
            <button 
              type="button" 
              (click)="uiFeedback.toggleTilt()"
              [title]="uiFeedback.isTiltEnabled() ? 'Dezactivează fizica 3D Tilt' : 'Activează fizica 3D Tilt'"
              class="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-surface border border-border hover:border-cyan-400/50 text-[10px] text-text-secondary hover:text-cyan-400 transition-colors cursor-pointer">
              <span>3D TILT:</span>
              <span [class.text-cyan-400]="uiFeedback.isTiltEnabled()" [class.text-text-muted]="!uiFeedback.isTiltEnabled()" class="font-bold">
                {{ uiFeedback.isTiltEnabled() ? 'ON' : 'OFF' }}
              </span>
            </button>

            <!-- Tactile Web Audio Toggle -->
            <button 
              type="button" 
              (click)="uiFeedback.toggleSound()"
              [title]="uiFeedback.isSoundEnabled() ? 'Dezactivează efectele audio tactile' : 'Activează efectele audio tactile'"
              class="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-surface border border-border hover:border-cyan-400/50 text-[10px] text-text-secondary hover:text-cyan-400 transition-colors cursor-pointer">
              <span>AUDIO FX:</span>
              <span [class.text-emerald-400]="uiFeedback.isSoundEnabled()" [class.text-text-muted]="!uiFeedback.isSoundEnabled()" class="font-bold">
                {{ uiFeedback.isSoundEnabled() ? 'ON' : 'OFF' }}
              </span>
            </button>

            <!-- Quick Affordances List -->
            <div class="hidden lg:flex items-center gap-2 text-[10px] text-text-muted">
              <span>AFFORDANCES:</span>
              <span class="kbd-badge">[ ⌘K ] CĂUTARE</span>
              <span class="kbd-badge">[ C ] COȘ</span>
              <span class="kbd-badge">[ A ] A11Y</span>
              <span class="kbd-badge">[ ? ] AJUTOR</span>
            </div>
          </div>

        </div>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-13 flex items-center justify-between gap-3 sm:gap-6">
        
        <div class="flex items-center gap-3 sm:gap-5 flex-shrink-0">
          <button
            type="button"
            (click)="mobileMenuOpen.set(!mobileMenuOpen())"
            class="lg:hidden p-1.5 rounded-lg border border-border bg-surface-elevated text-text-secondary hover:text-text-primary transition-all active:translate-y-0.5 shadow-xs"
            aria-label="Deschide meniu mobil">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>

          <a routerLink="/" class="flex items-center gap-2.5 group flex-shrink-0">
            <div class="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 text-black flex items-center justify-center font-bold shadow-[0_2px_10px_rgba(0,210,255,0.4)] border border-cyan-300/40 transform group-hover:scale-105 transition-transform">
              <svg class="w-4 h-4 text-slate-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 10V3L4 14h7v7l9-11h-7z"/>
              </svg>
            </div>
            <span class="font-display text-2xl tracking-wider uppercase text-text-primary leading-none flex items-center gap-1.5">
              Vexera<span class="led-indicator-3d" style="--led-color: #00d2ff; --led-glow: rgba(0, 210, 255, 0.9)"></span>
            </span>
          </a>

          <nav class="hidden lg:flex items-center gap-1 text-xs font-medium text-text-secondary">
            <div class="relative">
              <button 
                type="button"
                (click)="categoryMenuOpen.set(!categoryMenuOpen())"
                class="px-3 py-1.5 rounded-lg hover:bg-surface-elevated hover:text-text-primary transition-all flex items-center gap-1.5 border border-transparent hover:border-border active:translate-y-0.5"
                [class.bg-surface-elevated]="categoryMenuOpen()"
                [class.border-border]="categoryMenuOpen()"
                [class.text-text-primary]="categoryMenuOpen()">
                <span>{{ 'filter_categories' | translate }}</span>
                <svg class="w-3 h-3 transition-transform" [class.rotate-180]="categoryMenuOpen()" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                </svg>
              </button>

              @if (categoryMenuOpen()) {
                <div 
                  class="fixed inset-0 z-40" 
                  (click)="categoryMenuOpen.set(false)">
                </div>

                <div class="absolute left-0 top-full mt-2 w-96 bg-surface/95 backdrop-blur-xl border border-border-strong rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] p-3 z-50 mega-menu-enter">
                  <div class="text-[11px] font-semibold text-text-muted px-2.5 py-1.5 border-b border-border flex items-center justify-between">
                    <span class="tracking-wide uppercase">{{ i18n.isRo() ? 'Verticale Tehnice de Laborator' : 'Hardware Verticals' }}</span>
                    <a routerLink="/produse" (click)="categoryMenuOpen.set(false)" class="text-accent hover:underline text-[11px] font-semibold flex items-center gap-1">
                      <span>{{ i18n.isRo() ? 'Toate (180)' : 'All (180)' }}</span>
                      <span>→</span>
                    </a>
                  </div>

                  <div class="grid grid-cols-2 gap-1.5 py-2">
                    <a [routerLink]="['/categorie', 'sbc-microcontrollers']" (click)="categoryMenuOpen.set(false)"
                       class="flex flex-col p-2 rounded-lg hover:bg-surface-elevated text-text-primary transition-colors text-xs border border-transparent hover:border-border group">
                      <div class="font-medium text-text-primary leading-none group-hover:text-cyan-400 transition-colors">{{ 'cat_sbc' | translate }}</div>
                      <div class="text-[10px] text-text-muted mt-1">Raspberry Pi 5, ESP32, RISC-V</div>
                    </a>

                    <a [routerLink]="['/categorie', 'homelab-networking']" (click)="categoryMenuOpen.set(false)"
                       class="flex flex-col p-2 rounded-lg hover:bg-surface-elevated text-text-primary transition-colors text-xs border border-transparent hover:border-border group">
                      <div class="font-medium text-text-primary leading-none group-hover:text-cyan-400 transition-colors">{{ 'cat_homelab' | translate }}</div>
                      <div class="text-[10px] text-text-muted mt-1">Mini-PC Proxmox, 10G SFP+</div>
                    </a>

                    <a [routerLink]="['/categorie', 'sensors-iot']" (click)="categoryMenuOpen.set(false)"
                       class="flex flex-col p-2 rounded-lg hover:bg-surface-elevated text-text-primary transition-colors text-xs border border-transparent hover:border-border group">
                      <div class="font-medium text-text-primary leading-none group-hover:text-cyan-400 transition-colors">{{ 'cat_sensors' | translate }}</div>
                      <div class="text-[10px] text-text-muted mt-1">LoRaWAN, Zigbee, BME280</div>
                    </a>

                    <a [routerLink]="['/categorie', 'enterprise-hardware']" (click)="categoryMenuOpen.set(false)"
                       class="flex flex-col p-2 rounded-lg hover:bg-surface-elevated text-text-primary transition-colors text-xs border border-transparent hover:border-border group">
                      <div class="font-medium text-text-primary leading-none group-hover:text-cyan-400 transition-colors">{{ 'cat_enterprise' | translate }}</div>
                      <div class="text-[10px] text-text-muted mt-1">Servere 1U/2U, HBA LSI, Rack</div>
                    </a>

                    <a [routerLink]="['/categorie', 'cybersecurity-research']" (click)="categoryMenuOpen.set(false)"
                       class="flex flex-col p-2 rounded-lg hover:bg-surface-elevated text-text-primary transition-colors text-xs border border-transparent hover:border-border group">
                      <div class="font-medium text-rose-400 leading-none group-hover:text-rose-300 transition-colors">{{ 'cat_cybersecurity' | translate }}</div>
                      <div class="text-[10px] text-text-muted mt-1">Flipper Zero, HackRF, JTAG</div>
                    </a>

                    <a [routerLink]="['/categorie', 'niche-hardware']" (click)="categoryMenuOpen.set(false)"
                       class="flex flex-col p-2 rounded-lg hover:bg-surface-elevated text-text-primary transition-colors text-xs border border-transparent hover:border-border group">
                      <div class="font-medium text-amber-400 leading-none group-hover:text-amber-300 transition-colors">{{ 'cat_niche' | translate }}</div>
                      <div class="text-[10px] text-text-muted mt-1">ThinkPad Coreboot, Asahi</div>
                    </a>
                  </div>
                  
                  <div class="pt-1.5 border-t border-border mt-0.5">
                    <a [routerLink]="['/categorie', 'power-accessories']" (click)="categoryMenuOpen.set(false)"
                       class="flex items-center justify-between px-2.5 py-1 rounded-lg hover:bg-surface-elevated text-text-muted hover:text-text-primary transition-colors text-[11px]">
                      <span>{{ 'cat_power' | translate }} (Surse PD 27W-100W, DAC, PDU)</span>
                      <span>→</span>
                    </a>
                  </div>
                </div>
              }
            </div>

            <a routerLink="/build-your-lab"
               class="px-3 py-1.5 rounded-lg hover:bg-surface-elevated hover:text-text-primary transition-all flex items-center gap-1.5 border border-transparent hover:border-border active:translate-y-0.5">
              <span>Lab Builder</span>
            </a>

            <a routerLink="/compara"
               class="px-3 py-1.5 rounded-lg hover:bg-surface-elevated hover:text-text-primary transition-all flex items-center gap-1.5 border border-transparent hover:border-border active:translate-y-0.5"
               [title]="i18n.isRo() ? 'Comparator produse' : 'Product comparison'">
              <span>{{ i18n.isRo() ? 'Compară' : 'Compare' }}</span>
              @if (compService.count() > 0) {
                <span class="w-4 h-4 rounded-full bg-amber-500 text-white text-[10px] font-semibold flex items-center justify-center">
                  {{ compService.count() }}
                </span>
              }
            </a>
          </nav>
        </div>

        <div class="hidden sm:block flex-1 search-bar-expandable mx-2 sm:mx-4">
          <form (ngSubmit)="onSearchSubmit()" class="relative flex items-center w-full">
            <svg class="w-3.5 h-3.5 text-text-muted absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
            
            <input 
              type="text" 
              [(ngModel)]="searchQuery"
              name="searchQuery"
              [placeholder]="i18n.t('search_placeholder')"
              class="w-full bg-surface-sunken border border-border-strong rounded-lg pl-8 pr-16 py-1 text-xs text-text-primary placeholder:text-text-muted focus:outline-none focus:border-cyan-400 focus:bg-surface-elevated transition-all h-8 shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)] font-normal">
            
            <div class="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
              <span class="kbd-badge text-[9px] hidden md:inline">⌘K</span>
              <button 
                type="submit" 
                class="text-[10px] text-text-muted hover:text-text-primary transition-colors px-1 py-0.5 rounded border border-border bg-surface leading-none active:translate-y-0.5"
                title="Apasă Enter pentru căutare">
                ↵
              </button>
            </div>
          </form>
        </div>

        <div class="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
          
          @if (wishlistService.count() > 0) {
            <a 
              routerLink="/produse" 
              class="hidden sm:flex items-center gap-1 px-2 py-1 rounded-md border border-rose-500/30 bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 text-xs transition-colors h-7 active:translate-y-0.5"
              [title]="i18n.isRo() ? 'Produse favorite salvate' : 'Saved favorite products'">
              <svg class="w-3.5 h-3.5 fill-rose-500 text-rose-500" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
              <span class="text-[10px] font-bold text-rose-300 tabular-nums">{{ wishlistService.count() }}</span>
            </a>
          }

          <a
            routerLink="/produse"
            class="sm:hidden p-1.5 rounded-md border border-border bg-surface text-text-secondary hover:text-text-primary transition-colors h-7 w-7 flex items-center justify-center active:translate-y-0.5"
            title="Căutare produse">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
          </a>

          <button 
            type="button"
            (click)="labProfileService.isDrawerOpen.set(true)"
            class="hidden md:flex items-center gap-1 px-2.5 py-1 rounded-md border border-border bg-surface hover:bg-surface-elevated text-text-secondary hover:text-text-primary text-xs transition-all active:translate-y-0.5 shadow-xs"
            [title]="i18n.isRo() ? 'Profilul laboratorului meu' : 'My lab profile'">
            <span class="text-[11px] font-medium">My Lab</span>
          </button>

          <button
            type="button"
            (click)="a11yService.openModal()"
            class="p-1 rounded-md border border-border bg-surface text-text-muted hover:text-accent hover:border-cyan-400/40 hover:bg-surface-elevated transition-all hidden sm:flex items-center justify-center text-[10px] font-bold h-7 w-7 active:translate-y-0.5 shadow-xs"
            [title]="i18n.isRo() ? 'Accesibilitate (tasta A)' : 'Accessibility (key A)'">
            <span>A11Y</span>
          </button>

          <button
            type="button"
            (click)="shortcutsService.openModal()"
            class="p-1 rounded-md border border-border bg-surface text-text-muted hover:text-accent hover:border-cyan-400/40 hover:bg-surface-elevated transition-all hidden sm:flex items-center justify-center text-xs h-7 w-7 active:translate-y-0.5 shadow-xs"
            [title]="i18n.isRo() ? 'Scurtături de tastatură (tasta ?)' : 'Keyboard shortcuts (key ?)'">
            <span>?</span>
          </button>

          <span class="hidden sm:inline w-px h-3.5 bg-border"></span>

          <div class="hidden md:inline-flex items-center rounded-md border border-border bg-surface-sunken p-0.5 text-[10px] font-semibold text-text-primary shadow-[inset_0_1px_2px_rgba(0,0,0,0.4)]">
            <button 
              type="button"
              (click)="i18n.setLanguage('ro')"
              [class.bg-surface-elevated]="i18n.isRo()"
              [class.text-accent]="i18n.isRo()"
              [class.text-text-muted]="!i18n.isRo()"
              class="px-1.5 py-0.5 rounded transition-colors">
              RO
            </button>
            <button 
              type="button"
              (click)="i18n.setLanguage('en')"
              [class.bg-surface-elevated]="i18n.isEn()"
              [class.text-accent]="i18n.isEn()"
              [class.text-text-muted]="!i18n.isEn()"
              class="px-1.5 py-0.5 rounded transition-colors">
              EN
            </button>
          </div>

          <button 
            type="button"
            (click)="themeService.toggleTheme()"
            class="hidden md:flex p-1 rounded-md border border-border bg-surface text-text-muted hover:text-text-primary transition-all h-7 w-7 items-center justify-center active:translate-y-0.5 shadow-xs"
            [title]="themeService.isDark() ? (i18n.isRo() ? 'Activează modul luminos' : 'Switch to light mode') : (i18n.isRo() ? 'Activează modul întunecat' : 'Switch to dark mode')">
            @if (themeService.isDark()) {
              <svg class="w-3.5 h-3.5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            } @else {
              <svg class="w-3.5 h-3.5 text-text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            }
          </button>

          <!-- 3D Tactile Cart Button with Pushdown Depth -->
          <button 
            type="button"
            (click)="cartService.toggleCart()"
            class="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-gradient-to-b from-surface-elevated to-surface hover:from-surface-elevated hover:to-surface text-text-primary transition-all border border-border-strong group h-7 text-xs font-medium shadow-[0_2px_0_#06090e,0_4px_8px_rgba(0,0,0,0.5)] active:translate-y-0.5 active:shadow-none"
            [attr.aria-label]="'cart_label' | translate">
            <svg class="w-3.5 h-3.5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
            </svg>
            <span class="hidden sm:inline">{{ i18n.isRo() ? 'Coș' : 'Cart' }}</span>
            <span class="kbd-badge text-[9px] hidden lg:inline">C</span>
            <span class="w-4 h-4 rounded-full bg-cyan-400 text-black text-[10px] font-black flex items-center justify-center shadow-xs">
              {{ cartService.itemsCount() }}
            </span>
            @if (cartService.itemsCount() > 0) {
              <span class="hidden md:inline font-bold text-text-primary tabular-nums text-xs ml-0.5">
                {{ cartService.subtotal().toFixed(2) }} lei
              </span>
            }
          </button>
        </div>

      </div>

      @if (mobileMenuOpen()) {
        <div 
          class="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs lg:hidden"
          (click)="mobileMenuOpen.set(false)">
        </div>

        <div class="fixed inset-y-0 left-0 z-50 w-72 bg-surface-base border-r border-border-subtle shadow-2xl p-5 overflow-y-auto lg:hidden flex flex-col justify-between">
          <div class="space-y-5">
            <div class="flex items-center justify-between border-b border-border-subtle pb-3">
              <div class="font-semibold text-base text-text-primary">{{ i18n.isRo() ? 'Meniu Vexera' : 'Vexera Menu' }}</div>
              <button 
                type="button" 
                (click)="mobileMenuOpen.set(false)"
                class="p-1 text-text-muted hover:text-text-primary"
                [attr.aria-label]="i18n.isRo() ? 'Închide meniu' : 'Close menu'">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
              </button>
            </div>

            <div class="space-y-1 text-xs">
              <div class="text-[11px] font-medium text-text-muted px-2 py-1">{{ i18n.isRo() ? 'Categorii Hardware' : 'Hardware Categories' }}</div>
              <a routerLink="/produse" (click)="mobileMenuOpen.set(false)" class="block px-3 py-2 rounded-md hover:bg-surface-elevated text-text-primary font-medium">
                {{ 'all_products_menu' | translate }}
              </a>
              <a [routerLink]="['/categorie', 'sbc-microcontrollers']" (click)="mobileMenuOpen.set(false)" class="block px-3 py-2 rounded-md hover:bg-surface-elevated text-text-secondary hover:text-text-primary">
                {{ 'cat_sbc' | translate }}
              </a>
              <a [routerLink]="['/categorie', 'homelab-networking']" (click)="mobileMenuOpen.set(false)" class="block px-3 py-2 rounded-md hover:bg-surface-elevated text-text-secondary hover:text-text-primary">
                {{ 'cat_homelab' | translate }}
              </a>
              <a [routerLink]="['/categorie', 'sensors-iot']" (click)="mobileMenuOpen.set(false)" class="block px-3 py-2 rounded-md hover:bg-surface-elevated text-text-secondary hover:text-text-primary">
                {{ 'cat_sensors' | translate }}
              </a>
              <a [routerLink]="['/categorie', 'enterprise-hardware']" (click)="mobileMenuOpen.set(false)" class="block px-3 py-2 rounded-md hover:bg-surface-elevated text-text-secondary hover:text-text-primary">
                {{ 'cat_enterprise' | translate }}
              </a>
              <a [routerLink]="['/categorie', 'cybersecurity-research']" (click)="mobileMenuOpen.set(false)" class="block px-3 py-2 rounded-md hover:bg-surface-elevated text-rose-400 font-medium">
                {{ 'cat_cybersecurity' | translate }}
              </a>
              <a [routerLink]="['/categorie', 'niche-hardware']" (click)="mobileMenuOpen.set(false)" class="block px-3 py-2 rounded-md hover:bg-surface-elevated text-amber-400 font-medium">
                {{ 'cat_niche' | translate }}
              </a>
              <a [routerLink]="['/categorie', 'power-accessories']" (click)="mobileMenuOpen.set(false)" class="block px-3 py-2 rounded-md hover:bg-surface-elevated text-text-secondary hover:text-text-primary">
                {{ 'cat_power' | translate }}
              </a>
            </div>

            <div class="space-y-1 text-xs pt-4 border-t border-border-subtle">
              <div class="text-[11px] font-medium text-text-muted px-2 py-1">{{ i18n.isRo() ? 'Unelte Configurare' : 'Architecture Tools' }}</div>
              <a routerLink="/build-your-lab" (click)="mobileMenuOpen.set(false)" class="block px-3 py-2 rounded-md bg-surface-elevated text-accent font-medium">
                {{ i18n.isRo() ? 'Configurator Lab' : 'Build Your Lab' }}
              </a>
              <a routerLink="/compara" (click)="mobileMenuOpen.set(false)" class="block px-3 py-2 rounded-md hover:bg-surface-elevated text-text-secondary hover:text-text-primary">
                {{ i18n.isRo() ? 'Comparator Hardware' : 'Hardware Comparison' }}
              </a>
              <button type="button" (click)="mobileMenuOpen.set(false); labProfileService.isDrawerOpen.set(true)" class="w-full text-left px-3 py-2 rounded-md hover:bg-surface-elevated text-text-secondary hover:text-text-primary">
                {{ i18n.isRo() ? 'Profilul laboratorului meu' : 'My Lab Profile' }}
              </button>
            </div>
          </div>

          <div class="pt-4 border-t border-border-subtle space-y-1.5 text-xs text-text-muted">
            <div class="font-medium text-text-secondary">{{ i18n.isRo() ? 'Depozit Vexera România' : 'Vexera Hub Romania' }}</div>
            <div>0720 123 456 • L-V 09:00 - 18:00</div>
            <div class="text-[11px] text-emerald-400 font-medium">{{ i18n.isRo() ? 'Livrare Sameday & Easybox' : 'Sameday & Easybox Delivery' }}</div>
          </div>
        </div>
      }
    </header>
  `
})
export class NavbarComponent {
  cartService = inject(CartService);
  i18n = inject(TranslationService);
  themeService = inject(ThemeService);
  compService = inject(ComparisonService);
  labProfileService = inject(LabProfileService);
  shortcutsService = inject(KeyboardShortcutsService);
  a11yService = inject(AccessibilityService);
  wishlistService = inject(WishlistService);
  uiFeedback = inject(UiFeedbackService);
  router = inject(Router);

  searchQuery = '';
  mobileMenuOpen = signal<boolean>(false);
  categoryMenuOpen = signal<boolean>(false);

  onSearchSubmit() {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/produse'], { queryParams: { search: this.searchQuery.trim() } });
    }
  }
}
