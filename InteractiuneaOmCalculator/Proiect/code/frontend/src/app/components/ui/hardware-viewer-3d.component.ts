import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy, signal, input, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as THREE from 'three';
import { TranslationService } from '../../services/translation.service';
import { AudioFeedbackService } from '../../services/audio-feedback.service';

interface ExplodedPart {
  mesh: THREE.Object3D;
  restPos: THREE.Vector3;
  targetPos: THREE.Vector3;
}

export type CameraPreset = 'iso' | 'front' | 'top';

@Component({
  selector: 'app-hardware-viewer-3d',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="relative w-full aspect-square rounded-2xl bg-[#0c0d12] border border-border shadow-xl flex flex-col group select-none overflow-hidden transition-colors">
      
      <!-- Top HUD Header -->
      <div class="absolute top-3 inset-x-3 z-20 flex items-center justify-between pointer-events-none">
        <div class="flex items-center gap-2 px-2.5 py-1 rounded-md bg-surface/85 backdrop-blur-md border border-border text-[11px] font-semibold text-text-primary">
          <span class="w-1.5 h-1.5 rounded-full bg-accent animate-ping"></span>
          <span>3D CAD // {{ productName() || 'HARDWARE MODULE' }}</span>
        </div>

        <div class="flex items-center gap-1 pointer-events-auto">
          <!-- Camera Presets (Ubiquiti Inspired) -->
          <div class="inline-flex items-center rounded-md border border-border bg-surface/85 p-0.5 text-[10px] font-bold">
            <button 
              type="button"
              (click)="setCameraPreset('iso')"
              [class.bg-accent]="activePreset() === 'iso'"
              [class.text-white]="activePreset() === 'iso'"
              [class.text-text-muted]="activePreset() !== 'iso'"
              class="px-2 py-0.5 rounded transition-all cursor-pointer">
              ISO
            </button>
            <button 
              type="button"
              (click)="setCameraPreset('front')"
              [class.bg-accent]="activePreset() === 'front'"
              [class.text-white]="activePreset() === 'front'"
              [class.text-text-muted]="activePreset() !== 'front'"
              class="px-2 py-0.5 rounded transition-all cursor-pointer">
              FRONT
            </button>
            <button 
              type="button"
              (click)="setCameraPreset('top')"
              [class.bg-accent]="activePreset() === 'top'"
              [class.text-white]="activePreset() === 'top'"
              [class.text-text-muted]="activePreset() !== 'top'"
              class="px-2 py-0.5 rounded transition-all cursor-pointer">
              TOP
            </button>
          </div>

          <!-- Exploded View Toggle (Framework Inspired) -->
          <button 
            type="button"
            (click)="toggleExplodedView()"
            [class.bg-accent]="isExploded()"
            [class.text-white]="isExploded()"
            [class.bg-surface/85]="!isExploded()"
            [class.text-text-secondary]="!isExploded()"
            class="px-2.5 py-1 rounded-md border border-border text-[10px] font-bold transition-all hover:border-accent cursor-pointer shadow-xs">
            {{ isExploded() ? (i18n.isRo() ? 'ASAMBLAT' : 'ASSEMBLED') : (i18n.isRo() ? 'EXPLODAT' : 'EXPLODED') }}
          </button>

          <!-- Wireframe Toggle -->
          <button 
            type="button"
            (click)="toggleWireframe()"
            [class.bg-accent]="isWireframe()"
            [class.text-white]="isWireframe()"
            [class.bg-surface/85]="!isWireframe()"
            [class.text-text-secondary]="!isWireframe()"
            class="px-2 py-1 rounded-md border border-border text-[10px] font-bold transition-all hover:border-accent cursor-pointer shadow-xs">
            {{ isWireframe() ? (i18n.isRo() ? 'SOLID' : 'SOLID') : (i18n.isRo() ? 'LINII' : 'WIREFRAME') }}
          </button>

          <!-- Auto-Rotate Toggle -->
          <button 
            type="button"
            (click)="toggleAutoRotate()"
            [class.text-accent]="isAutoRotating()"
            [class.text-text-muted]="!isAutoRotating()"
            class="p-1 rounded-md bg-surface/85 border border-border text-[10px] hover:text-text-primary transition-colors cursor-pointer shadow-xs"
            [title]="i18n.isRo() ? 'Rotire automată' : 'Auto Rotate'">
            <svg class="w-3.5 h-3.5" [class.animate-spin]="isAutoRotating()" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Live Simulated Hardware Telemetry HUD (Ubiquiti Store & Design Center Inspired) -->
      <div class="absolute top-12 left-3 z-20 pointer-events-none flex flex-col gap-1 text-[10px] font-semibold tabular-nums text-text-muted">
        <div class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-black/60 backdrop-blur-xs border border-white/10 text-white/90">
          <span class="w-1.5 h-1.5 rounded-full bg-accent"></span>
          <span>TEMP: <strong class="text-white">38.2°C</strong></span>
        </div>
        <div class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-black/60 backdrop-blur-xs border border-white/10 text-white/90">
          <span class="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
          <span>PWR: <strong class="text-white">12.4W</strong></span>
        </div>
        <div class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-black/60 backdrop-blur-xs border border-white/10 text-white/90">
          <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
          <span>SFP+: <strong class="text-emerald-400">10G LINK UP</strong></span>
        </div>
      </div>

      <!-- 3D Three.js Canvas Container -->
      <div 
        #canvasContainer 
        class="w-full h-full cursor-grab active:cursor-grabbing relative"
        (mousedown)="onPointerDown($event)"
        (mousemove)="onPointerMove($event)"
        (mouseup)="onPointerUp()"
        (mouseleave)="onPointerUp()"
        (touchstart)="onTouchStart($event)"
        (touchmove)="onTouchMove($event)"
        (touchend)="onPointerUp()"
        (wheel)="onWheel($event)">
      </div>

      <!-- Bottom Interactive Hotspot Annotations -->
      <div class="absolute bottom-3 inset-x-3 z-20 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        <div class="text-[10px] font-medium text-text-muted px-2.5 py-1 rounded-md bg-surface/85 backdrop-blur-md border border-border">
          {{ i18n.isRo() ? 'Trage pentru rotire • Scroll pentru zoom' : 'Drag to rotate • Scroll to zoom' }}
        </div>

        <div class="flex items-center gap-1.5 pointer-events-auto">
          @for (hs of hotspots(); track hs.id) {
            <button 
              type="button"
              (click)="selectHotspot(hs)"
              [class.bg-accent]="activeHotspot()?.id === hs.id"
              [class.text-white]="activeHotspot()?.id === hs.id"
              [class.bg-surface/85]="activeHotspot()?.id !== hs.id"
              [class.text-text-secondary]="activeHotspot()?.id !== hs.id"
              class="px-2.5 py-1 rounded-md border border-border text-[10px] font-bold transition-all hover:border-accent cursor-pointer shadow-xs">
              {{ hs.label }}
            </button>
          }
        </div>
      </div>

      <!-- Active Hotspot Detail Overlay -->
      @if (activeHotspot(); as hs) {
        <div class="absolute top-14 left-3 right-3 z-20 p-3.5 rounded-xl bg-surface/95 backdrop-blur-md border border-border shadow-xl space-y-1">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-accent">{{ hs.title }}</span>
            <button 
              type="button"
              (click)="activeHotspot.set(null)"
              class="text-text-muted hover:text-text-primary text-xs font-bold cursor-pointer">
              <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          </div>
          <p class="text-xs text-text-secondary leading-relaxed">
            {{ hs.desc }}
          </p>
        </div>
      }

    </div>
  `
})
export class HardwareViewer3dComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvasContainer', { static: true }) canvasContainer!: ElementRef<HTMLDivElement>;
  productName = input<string>('Cryptographic Security Module');
  i18n = inject(TranslationService);
  audioService = inject(AudioFeedbackService);

  isWireframe = signal<boolean>(false);
  isAutoRotating = signal<boolean>(true);
  isExploded = signal<boolean>(false);
  activeHotspot = signal<any>(null);
  activePreset = signal<CameraPreset>('iso');

  hotspots = computed(() => {
    const isRo = this.i18n.isRo();
    return [
      { 
        id: 1, 
        label: 'SoC & NPU', 
        title: isRo ? 'SoC 8-Core ARM64 + Accelerator NPU 6 TOPS' : '8-Core ARM64 SoC + 6 TOPS NPU Accelerator', 
        desc: isRo 
          ? 'Nucleu computațional etanșat pe soclu BGA cu pastă termoconductoare cu galiu și management energetic dinamic.'
          : 'Computational core sealed on BGA socket with gallium thermal interface and dynamic voltage scaling.'
      },
      { 
        id: 2, 
        label: '10G SFP+', 
        title: isRo ? 'Interfață Rețea Duală 10GbE SFP+ (Intel 82599ES)' : 'Dual 10GbE SFP+ Network Interface (Intel 82599ES)', 
        desc: isRo 
          ? 'Transceivere optice și cupru pasiv DAC suportate nativ, cu inspecție hardware a pachetelor de rețea.'
          : 'Native optical transceivers and passive copper DAC support with line-rate packet inspection.'
      },
      { 
        id: 3, 
        label: isRo ? 'Răcire CNC' : 'CNC Cooling', 
        title: isRo ? 'Radiator Masiv din Aluminiu Anodizat Negru' : 'Solid Black Anodized Billet Aluminum Heatsink', 
        desc: isRo 
          ? 'Lamele termice frezate CNC pentru disipare pasivă de până la 35W TDP fără ventilatoare (0dB zgomot).'
          : 'CNC-machined cooling fins for passive heat dissipation up to 35W TDP with zero fan noise (0dB).'
      }
    ];
  });

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private animFrameId: number = 0;
  private hardwareGroup!: THREE.Group;
  private materials: THREE.Material[] = [];
  private explodedParts: ExplodedPart[] = [];

  // Interaction tracking
  private isDragging = false;
  private prevMouseX = 0;
  private prevMouseY = 0;

  ngAfterViewInit() {
    this.initThree();
  }

  ngOnDestroy() {
    if (this.animFrameId) {
      cancelAnimationFrame(this.animFrameId);
    }
    if (this.renderer) {
      this.renderer.dispose();
    }
  }

  private initThree() {
    const container = this.canvasContainer.nativeElement;
    const width = container.clientWidth || 400;
    const height = container.clientHeight || 400;

    // Scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x0c0d12);

    // Camera
    this.camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 1000);
    this.camera.position.set(4.5, 4.0, 5.0);
    this.camera.lookAt(0, 0, 0);

    // Renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(this.renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    this.scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.8);
    dirLight1.position.set(5, 8, 5);
    dirLight1.castShadow = true;
    this.scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xff6b2b, 0.5); // Orange rim light
    dirLight2.position.set(-5, -2, -3);
    this.scene.add(dirLight2);

    // Build Industrial Hardware 3D Model
    this.hardwareGroup = new THREE.Group();

    // 1. Main PCB Board
    const pcbGeo = new THREE.BoxGeometry(4.8, 0.14, 3.2);
    const pcbMat = new THREE.MeshStandardMaterial({
      color: 0x141822,
      roughness: 0.35,
      metalness: 0.2
    });
    this.materials.push(pcbMat);
    const pcbMesh = new THREE.Mesh(pcbGeo, pcbMat);
    pcbMesh.receiveShadow = true;
    this.hardwareGroup.add(pcbMesh);
    this.registerExplodedPart(pcbMesh, new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, -0.6, 0));

    // 2. Dual SFP+ 10GbE Metal Cage Ports
    const cageGeo = new THREE.BoxGeometry(1.2, 0.55, 1.4);
    const cageMat = new THREE.MeshStandardMaterial({
      color: 0x9ba3b4,
      metalness: 0.95,
      roughness: 0.18
    });
    this.materials.push(cageMat);
    const sfpCage = new THREE.Mesh(cageGeo, cageMat);
    sfpCage.position.set(-1.6, 0.35, 0.7);
    this.hardwareGroup.add(sfpCage);
    this.registerExplodedPart(sfpCage, new THREE.Vector3(-1.6, 0.35, 0.7), new THREE.Vector3(-2.8, 0.35, 0.7));

    // 3. SoC BGA Chip Package
    const chipBaseGeo = new THREE.BoxGeometry(1.6, 0.16, 1.6);
    const chipBaseMat = new THREE.MeshStandardMaterial({
      color: 0x090a0f,
      roughness: 0.4,
      metalness: 0.8
    });
    this.materials.push(chipBaseMat);
    const chipBase = new THREE.Mesh(chipBaseGeo, chipBaseMat);
    chipBase.position.set(-0.6, 0.15, 0);
    this.hardwareGroup.add(chipBase);
    this.registerExplodedPart(chipBase, new THREE.Vector3(-0.6, 0.15, 0), new THREE.Vector3(-0.6, 0.9, 0));

    // 4. Heatsink Stack (Framework modular cooling style)
    const heatsinkGroup = new THREE.Group();
    for (let f = 0; f < 6; f++) {
      const finGeo = new THREE.BoxGeometry(1.4, 0.45, 0.08);
      const finMat = new THREE.MeshStandardMaterial({
        color: 0x3a4050,
        metalness: 0.92,
        roughness: 0.15
      });
      this.materials.push(finMat);
      const fin = new THREE.Mesh(finGeo, finMat);
      fin.position.set(-0.6, 0.4, -0.6 + f * 0.24);
      heatsinkGroup.add(fin);
    }
    this.hardwareGroup.add(heatsinkGroup);
    this.registerExplodedPart(heatsinkGroup, new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 1.8, 0));

    // 5. Secondary Daughterboard / Co-Processor
    const cryptoGeo = new THREE.BoxGeometry(0.8, 0.18, 0.8);
    const cryptoMat = new THREE.MeshStandardMaterial({
      color: 0x2d3240,
      metalness: 0.75,
      roughness: 0.25
    });
    this.materials.push(cryptoMat);
    const crypto = new THREE.Mesh(cryptoGeo, cryptoMat);
    crypto.position.set(1.4, 0.14, -0.6);
    this.hardwareGroup.add(crypto);
    this.registerExplodedPart(crypto, new THREE.Vector3(1.4, 0.14, -0.6), new THREE.Vector3(2.4, 0.8, -0.6));

    // 6. Solid-State High-Frequency Capacitors
    const capsGroup = new THREE.Group();
    for (let i = 0; i < 4; i++) {
      const capGeo = new THREE.CylinderGeometry(0.2, 0.2, 0.6, 16);
      const capMat = new THREE.MeshStandardMaterial({
        color: 0x858e9f,
        metalness: 0.9,
        roughness: 0.1
      });
      this.materials.push(capMat);
      const cap = new THREE.Mesh(capGeo, capMat);
      cap.position.set(1.2 + (i % 2) * 0.5, 0.35, 0.4 + Math.floor(i / 2) * 0.5);
      capsGroup.add(cap);
    }
    this.hardwareGroup.add(capsGroup);
    this.registerExplodedPart(capsGroup, new THREE.Vector3(0, 0, 0), new THREE.Vector3(1.5, 0.6, 0.8));

    // 7. Signal Industrial Amber & Orange Activity LEDs
    const ledGeo = new THREE.BoxGeometry(0.12, 0.08, 0.12);
    const ledMat1 = new THREE.MeshBasicMaterial({ color: 0xff6b2b });
    const led1 = new THREE.Mesh(ledGeo, ledMat1);
    led1.position.set(-2.2, 0.12, -1.2);
    this.hardwareGroup.add(led1);

    const ledMat2 = new THREE.MeshBasicMaterial({ color: 0xf59e0b });
    const led2 = new THREE.Mesh(ledGeo, ledMat2);
    led2.position.set(-2.0, 0.12, -1.2);
    this.hardwareGroup.add(led2);

    // Initial group orientation
    this.hardwareGroup.rotation.x = 0.4;
    this.hardwareGroup.rotation.y = -0.5;
    this.scene.add(this.hardwareGroup);

    // Ground Grid
    const grid = new THREE.GridHelper(10, 20, 0x363c4d, 0x1a1d26);
    grid.position.y = -1.2;
    this.scene.add(grid);

    // Render loop with smooth interpolation
    const animate = () => {
      this.animFrameId = requestAnimationFrame(animate);

      const isExp = this.isExploded();
      const lerpSpeed = 0.08;
      for (const part of this.explodedParts) {
        const dest = isExp ? part.targetPos : part.restPos;
        part.mesh.position.lerp(dest, lerpSpeed);
      }

      if (this.isAutoRotating() && !this.isDragging) {
        this.hardwareGroup.rotation.y += 0.007;
      }

      this.renderer.render(this.scene, this.camera);
    };
    animate();

    // Resize observer
    const ro = new ResizeObserver(() => {
      if (!this.canvasContainer) return;
      const w = this.canvasContainer.nativeElement.clientWidth;
      const h = this.canvasContainer.nativeElement.clientHeight;
      if (w > 0 && h > 0) {
        this.camera.aspect = w / h;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(w, h);
      }
    });
    ro.observe(container);
  }

  private registerExplodedPart(mesh: THREE.Object3D, restPos: THREE.Vector3, targetPos: THREE.Vector3) {
    this.explodedParts.push({ mesh, restPos, targetPos });
  }

  setCameraPreset(preset: CameraPreset) {
    this.activePreset.set(preset);
    this.audioService.playClick();
    this.isAutoRotating.set(false);

    if (!this.camera || !this.hardwareGroup) return;

    if (preset === 'iso') {
      this.camera.position.set(4.5, 4.0, 5.0);
      this.camera.lookAt(0, 0, 0);
      this.hardwareGroup.rotation.set(0.4, -0.5, 0);
    } else if (preset === 'front') {
      this.camera.position.set(0, 0.4, 6.2);
      this.camera.lookAt(0, 0.2, 0);
      this.hardwareGroup.rotation.set(0.1, 0, 0);
    } else if (preset === 'top') {
      this.camera.position.set(0, 7.2, 0.01);
      this.camera.lookAt(0, 0, 0);
      this.hardwareGroup.rotation.set(0, 0, 0);
    }
  }

  toggleExplodedView() {
    this.audioService.playSwitch();
    this.isExploded.update(v => !v);
    this.isAutoRotating.set(false);
  }

  toggleWireframe() {
    this.audioService.playClick();
    this.isWireframe.update(v => !v);
    const wire = this.isWireframe();
    this.materials.forEach(m => {
      (m as any).wireframe = wire;
    });
  }

  toggleAutoRotate() {
    this.audioService.playClick();
    this.isAutoRotating.update(v => !v);
  }

  selectHotspot(hs: any) {
    this.audioService.playClick();
    this.activeHotspot.set(hs);
    this.isAutoRotating.set(false);
  }

  // Pointer drag interactions
  onPointerDown(e: MouseEvent) {
    this.isDragging = true;
    this.prevMouseX = e.clientX;
    this.prevMouseY = e.clientY;
  }

  onPointerMove(e: MouseEvent) {
    if (!this.isDragging || !this.hardwareGroup) return;
    const deltaX = e.clientX - this.prevMouseX;
    const deltaY = e.clientY - this.prevMouseY;

    this.hardwareGroup.rotation.y += deltaX * 0.01;
    this.hardwareGroup.rotation.x += deltaY * 0.01;

    this.prevMouseX = e.clientX;
    this.prevMouseY = e.clientY;
  }

  onPointerUp() {
    this.isDragging = false;
  }

  onTouchStart(e: TouchEvent) {
    if (e.touches.length === 1) {
      this.isDragging = true;
      this.prevMouseX = e.touches[0].clientX;
      this.prevMouseY = e.touches[0].clientY;
    }
  }

  onTouchMove(e: TouchEvent) {
    if (!this.isDragging || e.touches.length !== 1 || !this.hardwareGroup) return;
    const deltaX = e.touches[0].clientX - this.prevMouseX;
    const deltaY = e.touches[0].clientY - this.prevMouseY;

    this.hardwareGroup.rotation.y += deltaX * 0.01;
    this.hardwareGroup.rotation.x += deltaY * 0.01;

    this.prevMouseX = e.touches[0].clientX;
    this.prevMouseY = e.touches[0].clientY;
  }

  onWheel(e: WheelEvent) {
    e.preventDefault();
    if (!this.camera) return;
    const zoomDelta = e.deltaY * 0.005;
    this.camera.position.z = Math.min(12, Math.max(4.0, this.camera.position.z + zoomDelta));
  }
}
