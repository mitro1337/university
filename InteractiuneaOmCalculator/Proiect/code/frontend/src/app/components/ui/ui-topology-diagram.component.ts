import { Component, signal, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslationService } from '../../services/translation.service';
import { AudioFeedbackService } from '../../services/audio-feedback.service';

export type TopologyPath = 'all' | 'compute' | 'networking' | 'iot' | 'security';

export interface TopologyNodeInfo {
  id: string;
  name: string;
  titleRo: string;
  titleEn: string;
  category: string;
  categoryEn: string;
  protocol: string;
  hardwareExample: string;
  categorySlug: string;
  goalType: string;
  descriptionRo: string;
  descriptionEn: string;
}

@Component({
  selector: 'app-ui-topology-diagram',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="w-full relative select-none">
      
      <div class="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mb-6">
        <button
          type="button"
          (click)="setPath('all')"
          [class.bg-accent]="selectedPath() === 'all'"
          [class.text-white]="selectedPath() === 'all'"
          [class.border-accent]="selectedPath() === 'all'"
          [class.bg-surface-elevated]="selectedPath() !== 'all'"
          [class.text-text-secondary]="selectedPath() !== 'all'"
          class="px-3 sm:px-4 py-1.5 rounded-full text-xs font-semibold border border-border transition-all flex items-center gap-1.5 shadow-2xs hover:border-accent">
          <span class="w-1.5 h-1.5 rounded-full bg-accent-primary" [class.bg-white]="selectedPath() === 'all'"></span>
          <span>{{ i18n.isRo() ? 'Toată Arhitectura' : 'Full Architecture' }}</span>
        </button>

        <button
          type="button"
          (click)="setPath('compute')"
          [class.bg-accent]="selectedPath() === 'compute'"
          [class.text-white]="selectedPath() === 'compute'"
          [class.border-accent]="selectedPath() === 'compute'"
          [class.bg-surface-elevated]="selectedPath() !== 'compute'"
          [class.text-text-secondary]="selectedPath() !== 'compute'"
          class="px-3 sm:px-4 py-1.5 rounded-full text-xs font-semibold border border-border transition-all flex items-center gap-1.5 shadow-2xs hover:border-accent">
          <span>{{ i18n.isRo() ? 'Virtualizare Proxmox' : 'Proxmox Virtualization' }}</span>
        </button>

        <button
          type="button"
          (click)="setPath('networking')"
          [class.bg-accent]="selectedPath() === 'networking'"
          [class.text-white]="selectedPath() === 'networking'"
          [class.border-accent]="selectedPath() === 'networking'"
          [class.bg-surface-elevated]="selectedPath() !== 'networking'"
          [class.text-text-secondary]="selectedPath() !== 'networking'"
          class="px-3 sm:px-4 py-1.5 rounded-full text-xs font-semibold border border-border transition-all flex items-center gap-1.5 shadow-2xs hover:border-accent">
          <span>{{ i18n.isRo() ? 'Rețelistică 10G/25G' : '10G/25G Networking' }}</span>
        </button>

        <button
          type="button"
          (click)="setPath('iot')"
          [class.bg-accent]="selectedPath() === 'iot'"
          [class.text-white]="selectedPath() === 'iot'"
          [class.border-accent]="selectedPath() === 'iot'"
          [class.bg-surface-elevated]="selectedPath() !== 'iot'"
          [class.text-text-secondary]="selectedPath() !== 'iot'"
          class="px-3 sm:px-4 py-1.5 rounded-full text-xs font-semibold border border-border transition-all flex items-center gap-1.5 shadow-2xs hover:border-accent">
          <span>{{ i18n.isRo() ? 'IoT & LoRaWAN' : 'IoT & LoRaWAN' }}</span>
        </button>

        <button
          type="button"
          (click)="setPath('security')"
          [class.bg-accent]="selectedPath() === 'security'"
          [class.text-white]="selectedPath() === 'security'"
          [class.border-accent]="selectedPath() === 'security'"
          [class.bg-surface-elevated]="selectedPath() !== 'security'"
          [class.text-text-secondary]="selectedPath() !== 'security'"
          class="px-3 sm:px-4 py-1.5 rounded-full text-xs font-semibold border border-border transition-all flex items-center gap-1.5 shadow-2xs hover:border-accent">
          <span>{{ i18n.isRo() ? 'Securitate & SDR' : 'Security & SDR' }}</span>
        </button>
      </div>

      <div class="relative w-full max-w-5xl mx-auto bg-canvas border border-border/80 rounded-2xl p-4 sm:p-6 lg:p-8 overflow-hidden shadow-panel group/canvas">
        
        <div class="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(184,104,48,0.22),transparent)] pointer-events-none"></div>
        <div class="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>

        <svg viewBox="0 0 1000 520" class="w-full h-auto block" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="accent-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <filter id="soft-glow" x="-10%" y="-10%" width="120%" height="120%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>

            <linearGradient id="busGradientBrown" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#b86830" />
              <stop offset="50%" stop-color="#d4a373" />
              <stop offset="100%" stop-color="#c9773b" />
            </linearGradient>

            <linearGradient id="busGradientAmber" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#e09f58" />
              <stop offset="100%" stop-color="#b86830" />
            </linearGradient>
          </defs>

          
          <path d="M 170 390 L 170 280 L 320 280"
                stroke="#493424" stroke-width="2" stroke-dasharray="4 4" />
          <path d="M 170 390 L 170 280 L 320 280"
                stroke="#d4a373" stroke-width="2" stroke-dasharray="6 6"
                class="animate-bus-flow"
                [attr.opacity]="isPathActive('iot') ? '1' : '0.15'" />

          <path d="M 270 420 L 270 340 L 350 340 L 350 300"
                stroke="#493424" stroke-width="2" stroke-dasharray="4 4" />
          <path d="M 270 420 L 270 340 L 350 340 L 350 300"
                stroke="#e09f58" stroke-width="2" stroke-dasharray="6 6"
                class="animate-bus-flow"
                [attr.opacity]="isPathActive('iot') ? '1' : '0.15'" />

          <path d="M 450 240 L 530 240"
                stroke="#493424" stroke-width="3" stroke-dasharray="6 6" />
          <path d="M 450 240 L 530 240"
                stroke="#b86830" stroke-width="3" stroke-dasharray="8 6"
                class="animate-bus-flow"
                [attr.opacity]="isPathActive('networking') || isPathActive('compute') ? '1' : '0.2'" />

          <path d="M 640 240 L 730 240"
                stroke="#493424" stroke-width="3" stroke-dasharray="6 6" />
          <path d="M 640 240 L 730 240"
                stroke="#c9773b" stroke-width="3" stroke-dasharray="8 6"
                class="animate-bus-flow"
                [attr.opacity]="isPathActive('compute') ? '1' : '0.2'" />

          <path d="M 585 290 L 585 380 L 730 380"
                stroke="#493424" stroke-width="2" stroke-dasharray="4 4" />
          <path d="M 585 290 L 585 380 L 730 380"
                stroke="#d4a373" stroke-width="2" stroke-dasharray="6 6"
                class="animate-bus-flow"
                [attr.opacity]="'0.9'" />

          <path d="M 380 90 L 380 200"
                stroke="#493424" stroke-width="2" stroke-dasharray="4 4" />
          <path d="M 380 90 L 380 200"
                stroke="#b86830" stroke-width="2" stroke-dasharray="6 6"
                class="animate-bus-flow"
                [attr.opacity]="isPathActive('security') ? '1' : '0.15'" />

          <path d="M 585 100 L 585 190"
                stroke="#493424" stroke-width="2" stroke-dasharray="4 4" />
          <path d="M 585 100 L 585 190"
                stroke="#e09f58" stroke-width="2" stroke-dasharray="6 6"
                class="animate-bus-flow"
                [attr.opacity]="'0.7'" />


          <g (click)="selectNode('security')"
             (mouseenter)="hoverNode('security')"
             class="cursor-pointer transition-transform group"
             [class.opacity-40]="!isPathActive('security')">
            <rect x="310" y="30" width="140" height="60" rx="10"
                  [attr.stroke]="activeNodeId() === 'security' ? '#b86830' : '#493424'"
                  [attr.stroke-width]="activeNodeId() === 'security' ? '2.5' : '1.5'"
                  fill="#17110c" />
            <line x1="330" y1="30" x2="330" y2="14" stroke="#d4a373" stroke-width="2" stroke-linecap="round" />
            <circle cx="330" cy="12" r="2.5" fill="#b86830" />
            <path d="M 324 8 A 8 8 0 0 1 336 8" stroke="#b86830" stroke-width="1.5" stroke-linecap="round" fill="none" />
            <path d="M 320 4 A 13 13 0 0 1 340 4" stroke="#b86830" stroke-width="1.5" stroke-linecap="round" fill="none" opacity="0.7" />

            <text x="350" y="55" fill="#fcf8f4" font-size="12" font-weight="600" font-family="'Plus Jakarta Sans', sans-serif">Security SDR / RF</text>
            <text x="350" y="72" fill="#c2ada0" font-size="10" font-family="'Manrope', sans-serif">Sub-1GHz &bull; HackRF</text>
            
            <circle cx="435" cy="45" r="3.5" fill="#10b981" />
          </g>

          <g (click)="selectNode('cloud')"
             (mouseenter)="hoverNode('cloud')"
             class="cursor-pointer transition-transform group">
            <path d="M 550 65 A 18 18 0 0 1 575 48 A 26 26 0 0 1 615 48 A 20 20 0 0 1 635 68 A 16 16 0 0 1 630 85 L 545 85 A 15 15 0 0 1 550 65 Z"
                  stroke="#b86830" stroke-width="2.5" fill="#17110c" filter="url(#soft-glow)" />
            <text x="590" y="70" text-anchor="middle" fill="#fcf8f4" font-size="11" font-weight="600" font-family="'Plus Jakarta Sans', sans-serif">Cloud / VPN</text>
            <text x="590" y="81" text-anchor="middle" fill="#c2ada0" font-size="9" font-family="'Manrope', sans-serif">WireGuard / LwM2M</text>
          </g>


          <g (click)="selectNode('network')"
             (mouseenter)="hoverNode('network')"
             class="cursor-pointer transition-transform group"
             [class.opacity-40]="!isPathActive('networking')">
            <rect x="290" y="200" width="160" height="85" rx="12"
                  [attr.stroke]="activeNodeId() === 'network' ? '#b86830' : '#493424'"
                  [attr.stroke-width]="activeNodeId() === 'network' ? '2.5' : '1.5'"
                  fill="#17110c" />
            <rect x="305" y="215" width="130" height="24" rx="4" fill="#0c0907" stroke="#312318" stroke-width="1" />
            <rect x="312" y="220" width="10" height="14" rx="1.5" fill="#231912" />
            <circle cx="317" cy="223" r="1.5" fill="#10b981" />
            <rect x="326" y="220" width="10" height="14" rx="1.5" fill="#231912" />
            <circle cx="331" cy="223" r="1.5" fill="#10b981" />
            <rect x="340" y="220" width="10" height="14" rx="1.5" fill="#231912" />
            <circle cx="345" cy="223" r="1.5" fill="#b86830" />
            
            <rect x="360" y="218" width="18" height="18" rx="2" fill="#060403" stroke="#b86830" stroke-width="1.5" />
            <rect x="382" y="218" width="18" height="18" rx="2" fill="#060403" stroke="#b86830" stroke-width="1.5" />
            <circle cx="369" cy="227" r="2.5" fill="#d4a373" />
            <circle cx="391" cy="227" r="2.5" fill="#d4a373" />

            <text x="370" y="258" text-anchor="middle" fill="#fcf8f4" font-size="13" font-weight="600" font-family="'Plus Jakarta Sans', sans-serif">10G/25G Switch</text>
            <text x="370" y="274" text-anchor="middle" fill="#c2ada0" font-size="10" font-family="'Manrope', sans-serif">MikroTik &bull; SFP28 DAC</text>
          </g>

          <g (click)="selectNode('compute')"
             (mouseenter)="hoverNode('compute')"
             class="cursor-pointer transition-transform group"
             [class.opacity-40]="!isPathActive('compute')">
            <rect x="520" y="195" width="135" height="95" rx="12"
                  [attr.stroke]="activeNodeId() === 'compute' ? '#b86830' : '#493424'"
                  [attr.stroke-width]="activeNodeId() === 'compute' ? '2.5' : '1.5'"
                  fill="#17110c" />
            
            <rect x="535" y="210" width="30" height="30" rx="4" fill="#0c0907" stroke="#b86830" stroke-width="1.5" />
            <path d="M 543 218 L 557 218 L 557 232 L 543 232 Z" fill="#b86830" opacity="0.3" />
            <text x="550" y="229" text-anchor="middle" fill="#fcf8f4" font-size="8" font-weight="bold">i9</text>

            <line x1="575" y1="210" x2="575" y2="240" stroke="#b86830" stroke-width="2" />
            <line x1="581" y1="210" x2="581" y2="240" stroke="#b86830" stroke-width="2" />
            <line x1="587" y1="210" x2="587" y2="240" stroke="#b86830" stroke-width="2" />
            <line x1="593" y1="210" x2="593" y2="240" stroke="#b86830" stroke-width="2" />

            <circle cx="638" cy="210" r="3" fill="#10b981" />

            <text x="587" y="260" text-anchor="middle" fill="#fcf8f4" font-size="13" font-weight="600" font-family="'Plus Jakarta Sans', sans-serif">Proxmox VE</text>
            <text x="587" y="276" text-anchor="middle" fill="#c2ada0" font-size="10" font-family="'Manrope', sans-serif">Minisforum MS-01</text>
          </g>

          <g (click)="selectNode('storage')"
             (mouseenter)="hoverNode('storage')"
             class="cursor-pointer transition-transform group"
             [class.opacity-40]="!isPathActive('compute')">
            <rect x="725" y="200" width="135" height="85" rx="12"
                  [attr.stroke]="activeNodeId() === 'storage' ? '#b86830' : '#493424'"
                  [attr.stroke-width]="activeNodeId() === 'storage' ? '2.5' : '1.5'"
                  fill="#17110c" />
            
            <rect x="740" y="215" width="22" height="12" rx="2" fill="#0c0907" stroke="#b86830" stroke-width="1" />
            <circle cx="745" cy="221" r="1.5" fill="#d4a373" />
            <rect x="768" y="215" width="22" height="12" rx="2" fill="#0c0907" stroke="#b86830" stroke-width="1" />
            <circle cx="773" cy="221" r="1.5" fill="#d4a373" />
            <rect x="796" y="215" width="22" height="12" rx="2" fill="#0c0907" stroke="#b86830" stroke-width="1" />
            <circle cx="801" cy="221" r="1.5" fill="#d4a373" />
            <rect x="824" y="215" width="22" height="12" rx="2" fill="#0c0907" stroke="#b86830" stroke-width="1" />
            <circle cx="829" cy="221" r="1.5" fill="#d4a373" />

            <text x="792" y="255" text-anchor="middle" fill="#fcf8f4" font-size="13" font-weight="600" font-family="'Plus Jakarta Sans', sans-serif">ZFS TrueNAS</text>
            <text x="792" y="271" text-anchor="middle" fill="#c2ada0" font-size="10" font-family="'Manrope', sans-serif">PCIe Gen4 NVMe Pool</text>
          </g>


          
          <g (click)="selectNode('sensor_temp')"
             (mouseenter)="hoverNode('sensor_temp')"
             class="cursor-pointer group"
             [class.opacity-40]="!isPathActive('iot')">
            <circle cx="100" cy="425" r="26"
                    [attr.stroke]="activeNodeId() === 'sensor_temp' ? '#b86830' : '#493424'"
                    [attr.stroke-width]="activeNodeId() === 'sensor_temp' ? '2.5' : '1.5'"
                    fill="#17110c" />
            <path d="M 100 411 L 100 439 M 86 425 L 114 425 M 90 415 L 110 435 M 90 435 L 110 415"
                  stroke="#fcf8f4" stroke-width="1.5" stroke-linecap="round" />
            <circle cx="100" cy="425" r="3" fill="#d4a373" />
            <text x="100" y="468" text-anchor="middle" fill="#c2ada0" font-size="10" font-weight="500" font-family="'Manrope', sans-serif">BME280 Temp</text>
          </g>

          <g (click)="selectNode('sensor_lora')"
             (mouseenter)="hoverNode('sensor_lora')"
             class="cursor-pointer group"
             [class.opacity-40]="!isPathActive('iot')">
            <circle cx="170" cy="415" r="26"
                    [attr.stroke]="activeNodeId() === 'sensor_lora' ? '#b86830' : '#493424'"
                    [attr.stroke-width]="activeNodeId() === 'sensor_lora' ? '2.5' : '1.5'"
                    fill="#17110c" />
            <path d="M 170 403 C 164 403 160 407 160 413 C 160 421 170 429 170 429 C 170 429 180 421 180 413 C 180 407 176 403 170 403 Z"
                  stroke="#b86830" stroke-width="1.5" fill="none" />
            <circle cx="170" cy="411" r="2.5" fill="#d4a373" />
            <text x="170" y="458" text-anchor="middle" fill="#c2ada0" font-size="10" font-weight="500" font-family="'Manrope', sans-serif">LoRaWAN 868</text>
          </g>

          <g (click)="selectNode('actuator')"
             (mouseenter)="hoverNode('actuator')"
             class="cursor-pointer group"
             [class.opacity-40]="!isPathActive('iot')">
            <circle cx="240" cy="430" r="26"
                    [attr.stroke]="activeNodeId() === 'actuator' ? '#b86830' : '#493424'"
                    [attr.stroke-width]="activeNodeId() === 'actuator' ? '2.5' : '1.5'"
                    fill="#17110c" />
            <path d="M 235 435 L 245 435 M 237 438 L 243 438 M 240 420 C 234 420 231 424 233 429 C 234 432 236 433 236 435 L 244 435 C 244 433 246 432 247 429 C 249 424 246 420 240 420 Z"
                  stroke="#fcf8f4" stroke-width="1.5" fill="none" stroke-linecap="round" />
            <line x1="240" y1="416" x2="240" y2="413" stroke="#b86830" stroke-width="1.5" />
            <text x="240" y="473" text-anchor="middle" fill="#c2ada0" font-size="10" font-weight="500" font-family="'Manrope', sans-serif">Zigbee / Matter</text>
          </g>

          <g (click)="selectNode('sensor_esp')"
             (mouseenter)="hoverNode('sensor_esp')"
             class="cursor-pointer group"
             [class.opacity-40]="!isPathActive('iot')">
            <circle cx="310" cy="420" r="26"
                    [attr.stroke]="activeNodeId() === 'sensor_esp' ? '#b86830' : '#493424'"
                    [attr.stroke-width]="activeNodeId() === 'sensor_esp' ? '2.5' : '1.5'"
                    fill="#17110c" />
            <circle cx="310" cy="420" r="14" stroke="#493424" stroke-width="1.5" fill="none" />
            <line x1="310" y1="420" x2="316" y2="414" stroke="#b86830" stroke-width="1.5" stroke-linecap="round" />
            <circle cx="310" cy="420" r="2" fill="#d4a373" />
            <text x="310" y="463" text-anchor="middle" fill="#c2ada0" font-size="10" font-weight="500" font-family="'Manrope', sans-serif">ESP32-S3 Node</text>
          </g>

          <g (click)="selectNode('console')"
             (mouseenter)="hoverNode('console')"
             class="cursor-pointer transition-transform group">
            
            <rect x="710" y="340" width="160" height="95" rx="6" stroke="#493424" stroke-width="1.5" fill="#17110c" />
            <rect x="718" y="347" width="144" height="76" rx="3" fill="#060403" stroke="#312318" stroke-width="1" />
            
            <path d="M 726 405 L 742 390 L 758 398 L 774 375 L 790 382 L 806 360 L 822 368 L 838 355"
                  stroke="#b86830" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M 726 412 L 746 410 L 766 402 L 786 405 L 806 392 L 826 395 L 846 385"
                  stroke="#d4a373" stroke-width="1.5" fill="none" stroke-dasharray="3 3" />
            
            <rect x="830" y="395" width="4" height="20" fill="#b86830" />
            <rect x="838" y="388" width="4" height="27" fill="#d4a373" />
            <rect x="846" y="380" width="4" height="35" fill="#e09f58" />

            <path d="M 698 437 L 882 437 L 872 447 L 708 447 Z" fill="#231912" stroke="#493424" stroke-width="1.5" />
            <rect x="770" y="440" width="40" height="4" rx="2" fill="#17110c" />

            <rect x="888" y="365" width="36" height="70" rx="6" stroke="#493424" stroke-width="1.5" fill="#17110c" />
            <rect x="892" y="372" width="28" height="52" rx="3" fill="#060403" />
            <circle cx="906" cy="382" r="5" fill="#b86830" />
            <line x1="896" y1="395" x2="916" y2="395" stroke="#d4a373" stroke-width="1.5" />
            <line x1="896" y1="403" x2="912" y2="403" stroke="#c2ada0" stroke-width="1" />
            <line x1="896" y1="411" x2="914" y2="411" stroke="#c2ada0" stroke-width="1" />
            <circle cx="906" cy="430" r="2" fill="#fcf8f4" />

            <text x="790" y="470" text-anchor="middle" fill="#fcf8f4" font-size="12" font-weight="600" font-family="'Plus Jakarta Sans', sans-serif">{{ i18n.isRo() ? 'Consolă & Observabilitate' : 'Console & Telemetry' }}</text>
            <text x="790" y="485" text-anchor="middle" fill="#c2ada0" font-size="10" font-family="'Manrope', sans-serif">Grafana &bull; Proxmox GUI &bull; Home Assistant</text>
          </g>

        </svg>

        <div class="absolute top-4 right-4 sm:top-6 sm:right-6 bg-surface-elevated/90 backdrop-blur-md border border-border px-3 py-1.5 rounded-lg flex items-center gap-2 text-xs text-text-primary shadow-xs">
          <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span class="font-medium text-[11px] text-text-secondary">{{ i18n.isRo() ? 'Automație & Telemetrie Live' : 'Live Automation & Telemetry' }}</span>
        </div>
      </div>

      @let node = currentNodeInfo();
      <div class="mt-4 max-w-5xl mx-auto bg-surface border border-border rounded-xl p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all">
        <div class="flex items-start sm:items-center gap-3.5">
          <div class="w-10 h-10 rounded-xl bg-accent/15 text-accent flex items-center justify-center font-bold text-lg flex-shrink-0 border border-accent/20">
            @switch (node.categorySlug) {
              @case ('homelab-networking') {
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9"/></svg>
              }
              @case ('enterprise-hardware') {
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="7" rx="1"/><rect x="2" y="14" width="20" height="7" rx="1"/><line x1="6" y1="6.5" x2="6.01" y2="6.5"/><line x1="6" y1="17.5" x2="6.01" y2="17.5"/></svg>
              }
              @case ('sensors-iot') {
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"/></svg>
              }
              @case ('cybersecurity-research') {
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
              }
              @default {
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
              }
            }
          </div>
          <div>
            <div class="flex items-center gap-2">
              <span class="text-xs font-semibold px-2 py-0.5 rounded bg-accent/10 text-accent border border-accent/20">
                {{ node.protocol }}
              </span>
              <span class="text-xs text-text-muted">{{ i18n.isRo() ? 'Hardware Recomandat:' : 'Recommended Hardware:' }} <strong class="text-text-primary font-medium">{{ node.hardwareExample }}</strong></span>
            </div>
            <h4 class="font-heading text-sm sm:text-base font-semibold text-text-primary mt-1">
              {{ i18n.isRo() ? node.titleRo : node.titleEn }}
            </h4>
            <p class="text-xs text-text-secondary mt-0.5 max-w-2xl font-normal leading-relaxed">
              {{ i18n.isRo() ? node.descriptionRo : node.descriptionEn }}
            </p>
          </div>
        </div>

        <div class="flex items-center gap-2.5 flex-shrink-0 self-end md:self-center">
          <a [routerLink]="['/build-your-lab']" [queryParams]="{ goal: node.goalType }"
             class="px-4 py-2 rounded-lg bg-surface-elevated hover:bg-surface-sunken text-text-primary text-xs font-semibold border border-border transition-colors">
            {{ i18n.isRo() ? 'Configurează în Builder' : 'Configure in Lab Builder' }}
          </a>
          <a [routerLink]="['/produse']" [queryParams]="{ category: node.categorySlug }"
             class="px-4 py-2 rounded-lg bg-accent hover:bg-accent-hover text-white text-xs font-semibold transition-all shadow-xs flex items-center gap-1.5">
            <span>{{ i18n.isRo() ? 'Catalog Dedicat' : 'Dedicated Catalog' }}</span>
            <span>→</span>
          </a>
        </div>
      </div>

    </div>
  `
})
export class UiTopologyDiagramComponent {
  readonly i18n = inject(TranslationService);
  private readonly audioService = inject(AudioFeedbackService);

  readonly selectedPath = signal<TopologyPath>('all');
  readonly activeNodeId = signal<string>('compute');

  readonly nodesData: Record<string, TopologyNodeInfo> = {
    compute: {
      id: 'compute',
      name: 'Compute Core',
      titleRo: 'Nod de Compute & Virtualizare Proxmox VE',
      titleEn: 'Compute Node & Proxmox VE Virtualization Cluster',
      category: 'Enterprise Hardware & Homelab',
      categoryEn: 'Enterprise Hardware & Homelab',
      protocol: 'PCIe 4.0 x16 • 64GB DDR5 • KVM/LXC',
      hardwareExample: 'Minisforum MS-01 (Intel i9-13900H, 2x 10G SFP+)',
      categorySlug: 'enterprise-hardware',
      goalType: 'homelab',
      descriptionRo: 'Nod central x86-64 capabil să ruleze simultan zeci de mașini virtuale și containere Docker, cu interfețe duale 10Gbps SFP+ pentru tranzit de date de mare viteză fără gâtuiri.',
      descriptionEn: 'Central high-density x86-64 compute node engineered to concurrently host dozens of isolated virtual machines and Docker containers, equipped with dual 10Gbps SFP+ uplinks for zero-bottleneck data throughput.'
    },
    network: {
      id: 'network',
      name: '10G/25G Network Core',
      titleRo: 'Switch & Routing Core 10G/25G SFP28 Managed',
      titleEn: 'Switch & Routing Core 10G/25G SFP28 Managed',
      category: 'Networking & Infrastructure',
      categoryEn: 'Networking & Infrastructure',
      protocol: '25Gbps SFP28 • WireGuard • VLANs 802.1Q',
      hardwareExample: 'MikroTik CRS305 / CRS309 + Cabluri DAC 10G',
      categorySlug: 'homelab-networking',
      goalType: 'router_firewall',
      descriptionRo: 'Distanțează traficul critic de rețea prin magistrale optice dedicate de 10G/25G, cu segmentare avansată de VLAN-uri pentru izolarea laboratorului de securitate și a dispozitivelor IoT.',
      descriptionEn: 'Segregates mission-critical network throughput via dedicated 10G/25G optical backbones, featuring multi-tenant 802.1Q VLAN isolation between homelab compute, security research rigs, and untrusted IoT devices.'
    },
    storage: {
      id: 'storage',
      name: 'Storage NAS Pool',
      titleRo: 'Storage Server ZFS All-Flash & Backup Pool',
      titleEn: 'ZFS All-Flash Storage Server & High-Integrity Backup Pool',
      category: 'Power & Storage',
      categoryEn: 'Power & Storage',
      protocol: 'ZFS RAID-Z2 • SAS 12Gbps HBA • NVMe Gen4',
      hardwareExample: 'SAS HBA LSI 9300-8i IT-Mode + SSD-uri U.2 / NVMe',
      categorySlug: 'power-accessories',
      goalType: 'nas',
      descriptionRo: 'Arhitectură de stocare de înaltă integritate bazată pe ZFS, cu protecție automată la degradarea siliciului (bit rot) și snapshot-uri atomice la nivel de nanosecundă.',
      descriptionEn: 'High-integrity ZFS enterprise storage architecture providing automatic bit rot scrubbing, copy-on-write integrity validation, and sub-nanosecond atomic snapshots.'
    },
    security: {
      id: 'security',
      name: 'Security SDR / RF',
      titleRo: 'Laborator de Securitate Radio & Audit Hardware',
      titleEn: 'Radio Security Research Lab & Hardware Auditing Rig',
      category: 'Cybersecurity Research',
      categoryEn: 'Cybersecurity Research',
      protocol: 'Sub-1GHz • 2.4/5GHz • JTAG / SWD Debug',
      hardwareExample: 'HackRF One SDR + Flipper Zero + WiFi Marauder ESP32',
      categorySlug: 'cybersecurity-research',
      goalType: 'cybersecurity',
      descriptionRo: 'Unelte complete de cercetare hardware, analiză de spectru radiofrecvență și interfețe hardware de debug pentru auditarea dispozitivelor IoT și a protocolului Coreboot.',
      descriptionEn: 'End-to-end hardware hacking workstation, software-defined RF spectrum analysis, and dedicated JTAG/SWD debugging bus for low-level firmware auditing and reverse engineering.'
    },
    sensor_temp: {
      id: 'sensor_temp',
      name: 'Environmental Sensor',
      titleRo: 'Senzori Ambientali & Telemetrie Industrială',
      titleEn: 'Environmental Telemetry & Industrial Sensors',
      category: 'Sensors & IoT',
      categoryEn: 'Sensors & IoT',
      protocol: 'I2C / SPI • 3.3V • Ultra-Low Power',
      hardwareExample: 'Senzor Bosch BME280 (Temp, Umiditate, Presiune)',
      categorySlug: 'sensors-iot',
      goalType: 'iot',
      descriptionRo: 'Captează parametrii de mediu în timp real și îi transmite către nodul gateway prin magistrale cu consum ultra-redus.',
      descriptionEn: 'Captures precision ambient metrics in real time (temperature, humidity, atmospheric pressure) and streams telemetry packets across ultra-low-power I2C/SPI buses.'
    },
    sensor_lora: {
      id: 'sensor_lora',
      name: 'LoRaWAN Gateway',
      titleRo: 'Gateway & Noduri LoRaWAN 868MHz Long Range',
      titleEn: 'Long-Range 868MHz EU LoRaWAN Gateway & Sensor Nodes',
      category: 'Sensors & IoT',
      categoryEn: 'Sensors & IoT',
      protocol: 'LoRaWAN Class A/C • 868 MHz EU • Raza 10km+',
      hardwareExample: 'RAK Wireless Concentrator LoRaWAN + Antenă 5.8dBi',
      categorySlug: 'sensors-iot',
      goalType: 'iot',
      descriptionRo: 'Acoperire pe rază de kilometri fără costuri de cartelă SIM, ideal pentru monitorizare extinsă smart city, depozite și sere automatizate.',
      descriptionEn: 'Multi-kilometer wireless coverage without recurring SIM carrier subscriptions, purpose-built for smart agriculture, perimeter automation, and campus-wide telemetry.'
    },
    actuator: {
      id: 'actuator',
      name: 'Smart Home Actuator',
      titleRo: 'Relee & Actuatoare Industriale Zigbee / Matter',
      titleEn: 'Industrial Zigbee / Matter Actuators & High-Power Relays',
      category: 'Sensors & IoT',
      categoryEn: 'Sensors & IoT',
      protocol: 'Matter / Thread / Zigbee 3.0 • Relee 16A Optoizolate',
      hardwareExample: 'Modul Releu Dublu Kincony ESP32 DIN-Rail',
      categorySlug: 'sensors-iot',
      goalType: 'iot',
      descriptionRo: 'Control fizic direct de comutație electrică pentru automatizări rezidențiale și industriale, integrat direct în Home Assistant.',
      descriptionEn: 'Direct galvanically isolated electric switching for home and industrial automation systems, with native zero-latency Home Assistant integration.'
    },
    sensor_esp: {
      id: 'sensor_esp',
      name: 'Microcontroller SBC',
      titleRo: 'Microcontrolere & Plăci de Dezvoltare ESP32-S3',
      titleEn: 'ESP32-S3 Microcontroller & Edge SBC Development Units',
      category: 'SBC & Microcontrollers',
      categoryEn: 'SBC & Microcontrollers',
      protocol: 'Dual Core Xtensa 240MHz • WiFi 4 + BLE 5.0 Mesh',
      hardwareExample: 'ESP32-S3 DevKitC-1 N16R8 + Camera OV2640',
      categorySlug: 'sbc-microcontrollers',
      goalType: 'iot',
      descriptionRo: 'Platforma ideală pentru rularea firmware-ului personalizat ESPHome sau Tasmota cu criptare hardware accelerată.',
      descriptionEn: 'High-performance dual-core microcontrollers designed for custom ESPHome/Tasmota firmware stacks with hardware-accelerated cryptographic engines.'
    },
    cloud: {
      id: 'cloud',
      name: 'Cloud & Hybrid Uplink',
      titleRo: 'Uplink Cloud & Tunnel Securizat WireGuard',
      titleEn: 'Offsite Cloud Uplink & Encrypted WireGuard Overlay',
      category: 'Networking & Infrastructure',
      categoryEn: 'Networking & Infrastructure',
      protocol: 'WireGuard Kernel Module • Zero-Trust Overlay',
      hardwareExample: 'VPS Offsite WireGuard Endpoint + DDNS',
      categorySlug: 'homelab-networking',
      goalType: 'router_firewall',
      descriptionRo: 'Conectivitate criptată de la distanță către homelab fără a deschide porturi nesigure în routerul furnizorului de internet (ISP).',
      descriptionEn: 'Secure kernel-level WireGuard cryptographic overlay connecting remote endpoints to the homelab without exposing vulnerable open ports to the public Internet.'
    },
    console: {
      id: 'console',
      name: 'Operations & Observability',
      titleRo: 'Consolă Centrală de Telemetrie & Observabilitate',
      titleEn: 'Central Observability Console & Telemetry Workstation',
      category: 'Management & Monitorizare',
      categoryEn: 'Management & Monitoring',
      protocol: 'Prometheus • Grafana • WebRTC • Syslog',
      hardwareExample: 'Workstation Monitor 4K + Dashboards Mobile',
      categorySlug: 'enterprise-hardware',
      goalType: 'homelab',
      descriptionRo: 'Monitorizare unificată în timp real a întregii stive: încărcare procesor, temperaturi senzori, flux de pachete în rețea și starea raidului ZFS.',
      descriptionEn: 'Unified full-stack observability command center aggregating Prometheus metrics, Grafana dashboards, system logs, and live ZFS pool health telemetry.'
    }
  };

  readonly currentNodeInfo = computed(() => {
    const id = this.activeNodeId();
    return this.nodesData[id] || this.nodesData['compute'];
  });

  setPath(path: TopologyPath): void {
    this.selectedPath.set(path);
    this.audioService.playSwitch();
  }

  isPathActive(category: string): boolean {
    const path = this.selectedPath();
    if (path === 'all') return true;
    return path === category;
  }

  selectNode(id: string): void {
    if (this.activeNodeId() !== id) {
      this.activeNodeId.set(id);
      this.audioService.playClick();
    }
  }

  hoverNode(id: string): void {
    if (this.activeNodeId() !== id) {
      this.activeNodeId.set(id);
    }
  }
}
