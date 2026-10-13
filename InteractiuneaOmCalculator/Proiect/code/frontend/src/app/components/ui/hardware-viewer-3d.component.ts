import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy, signal, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as THREE from 'three';

@Component({
  selector: 'app-hardware-viewer-3d',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="relative w-full aspect-square rounded-2xl bg-[#080b11] border border-cyan-900/40 overflow-hidden shadow-2xl flex flex-col group select-none">
      
      <!-- Top HUD Header -->
      <div class="absolute top-3 inset-x-3 z-20 flex items-center justify-between pointer-events-none">
        <div class="flex items-center gap-2 px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md border border-cyan-500/30 text-[10px] font-mono text-cyan-400">
          <span class="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span>
          <span>3D WEBGL CAD // {{ productName() || 'HARDWARE MODULE' }}</span>
        </div>

        <div class="flex items-center gap-1.5 pointer-events-auto">
          <button 
            type="button"
            (click)="toggleWireframe()"
            [class.bg-cyan-500]="isWireframe()"
            [class.text-black]="isWireframe()"
            [class.bg-black/60]="!isWireframe()"
            [class.text-cyan-400]="!isWireframe()"
            class="px-2 py-1 rounded border border-cyan-500/40 text-[10px] font-mono transition-all hover:bg-cyan-500/20 active:scale-95 cursor-pointer">
            {{ isWireframe() ? 'SOLID' : 'WIREFRAME' }}
          </button>
          <button 
            type="button"
            (click)="toggleAutoRotate()"
            [class.text-cyan-400]="isAutoRotating()"
            [class.text-slate-500]="!isAutoRotating()"
            class="p-1 rounded bg-black/60 border border-cyan-500/30 text-[10px] font-mono hover:text-white transition-colors cursor-pointer"
            title="Auto Rotate">
            <svg class="w-3.5 h-3.5" [class.animate-spin]="isAutoRotating()" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
            </svg>
          </button>
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
        <div class="text-[10px] font-mono text-slate-400 px-2 py-1 rounded bg-black/60 border border-slate-800">
          Rotate: Drag • Zoom: Scroll
        </div>

        <div class="flex items-center gap-1.5 pointer-events-auto">
          @for (hs of hotspots; track hs.id) {
            <button 
              type="button"
              (click)="selectHotspot(hs)"
              [class.bg-cyan-500]="activeHotspot()?.id === hs.id"
              [class.text-black]="activeHotspot()?.id === hs.id"
              [class.bg-black/75]="activeHotspot()?.id !== hs.id"
              [class.text-slate-300]="activeHotspot()?.id !== hs.id"
              class="px-2 py-0.5 rounded border border-cyan-500/40 text-[10px] font-mono transition-all hover:border-cyan-400 cursor-pointer">
              {{ hs.label }}
            </button>
          }
        </div>
      </div>

      <!-- Active Hotspot Detail Overlay -->
      @if (activeHotspot(); as hs) {
        <div class="absolute top-12 left-3 right-3 z-20 p-3 rounded-xl bg-slate-900/90 backdrop-blur-md border border-cyan-500/50 shadow-xl space-y-1 animate-fadeIn">
          <div class="flex items-center justify-between">
            <span class="text-xs font-mono font-bold text-cyan-400">{{ hs.title }}</span>
            <button 
              type="button"
              (click)="activeHotspot.set(null)"
              class="text-slate-400 hover:text-white text-xs font-mono">
              [✕]
            </button>
          </div>
          <p class="text-[11px] text-slate-300 leading-relaxed font-sans">
            {{ hs.desc }}
          </p>
        </div>
      }

    </div>
  `,
  styles: [`
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-4px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-fadeIn {
      animation: fadeIn 0.2s ease-out forwards;
    }
  `]
})
export class HardwareViewer3dComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvasContainer', { static: true }) canvasContainer!: ElementRef<HTMLDivElement>;
  productName = input<string>('Cryptographic Security Module');

  isWireframe = signal<boolean>(false);
  isAutoRotating = signal<boolean>(true);
  activeHotspot = signal<any>(null);

  hotspots = [
    { id: 1, label: 'MCU', title: 'ATECC608A CryptoAuth Co-processor', desc: 'Secure hardware key storage, ECDSA signatures and high-entropy RNG.' },
    { id: 2, label: 'PHY', title: '10GbE SFP+ Transceiver Controller', desc: 'Low-latency packet inspection pipeline with hardware offloading.' },
    { id: 3, label: 'HEATSINK', title: 'Anodized CNC Aluminum Cooling', desc: 'Passive dissipation architecture engineered for continuous datacenter operation.' }
  ];

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private animFrameId: number = 0;
  private hardwareGroup!: THREE.Group;
  private materials: THREE.Material[] = [];

  // Interaction tracking
  private isDragging = false;
  private prevMouseX = 0;
  private prevMouseY = 0;

  ngAfterViewInit() {
    if (typeof window !== 'undefined') {
      this.initThree();
    }
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

    // Scene & Camera
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x080b11);

    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    this.camera.position.set(0, 4.5, 7.5);
    this.camera.lookAt(0, 0, 0);

    // Renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    container.appendChild(this.renderer.domElement);

    // Lights
    const ambient = new THREE.AmbientLight(0xffffff, 0.8);
    this.scene.add(ambient);

    const dirLight1 = new THREE.DirectionalLight(0x06b6d4, 2.5); // Cyan key light
    dirLight1.position.set(5, 8, 5);
    this.scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xa855f7, 1.8); // Purple fill light
    dirLight2.position.set(-5, -3, -5);
    this.scene.add(dirLight2);

    // Build Procedural 3D Hardware Object
    this.hardwareGroup = new THREE.Group();

    // 1. PCB Mainboard
    const pcbGeo = new THREE.BoxGeometry(5.2, 0.15, 3.4);
    const pcbMat = new THREE.MeshStandardMaterial({
      color: 0x092e20, // Classic Dark Cyber Emerald PCB
      roughness: 0.35,
      metalness: 0.2
    });
    this.materials.push(pcbMat);
    const pcb = new THREE.Mesh(pcbGeo, pcbMat);
    this.hardwareGroup.add(pcb);

    // 2. Gold PCIe / Edge Connector Contacts
    const edgeGeo = new THREE.BoxGeometry(4.8, 0.16, 0.3);
    const edgeMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37, // Gold
      metalness: 0.9,
      roughness: 0.2
    });
    this.materials.push(edgeMat);
    const edge = new THREE.Mesh(edgeGeo, edgeMat);
    edge.position.set(0, 0, 1.6);
    this.hardwareGroup.add(edge);

    // 3. Central Processor / SoC with Heatsink Fins
    const chipBaseGeo = new THREE.BoxGeometry(1.6, 0.2, 1.6);
    const chipBaseMat = new THREE.MeshStandardMaterial({
      color: 0x111827,
      metalness: 0.8,
      roughness: 0.2
    });
    this.materials.push(chipBaseMat);
    const chipBase = new THREE.Mesh(chipBaseGeo, chipBaseMat);
    chipBase.position.set(-0.6, 0.15, 0);
    this.hardwareGroup.add(chipBase);

    // Heatsink Fins
    for (let f = 0; f < 6; f++) {
      const finGeo = new THREE.BoxGeometry(1.4, 0.45, 0.08);
      const finMat = new THREE.MeshStandardMaterial({
        color: 0x1f2937,
        metalness: 0.95,
        roughness: 0.15
      });
      this.materials.push(finMat);
      const fin = new THREE.Mesh(finGeo, finMat);
      fin.position.set(-0.6, 0.4, -0.6 + f * 0.24);
      this.hardwareGroup.add(fin);
    }

    // 4. Secondary Crypto Co-processor
    const cryptoGeo = new THREE.BoxGeometry(0.8, 0.15, 0.8);
    const cryptoMat = new THREE.MeshStandardMaterial({
      color: 0x0369a1,
      metalness: 0.7,
      roughness: 0.3
    });
    this.materials.push(cryptoMat);
    const crypto = new THREE.Mesh(cryptoGeo, cryptoMat);
    crypto.position.set(1.4, 0.12, -0.6);
    this.hardwareGroup.add(crypto);

    // 5. High-Frequency Capacitors (Cylinders)
    for (let i = 0; i < 4; i++) {
      const capGeo = new THREE.CylinderGeometry(0.2, 0.2, 0.6, 16);
      const capMat = new THREE.MeshStandardMaterial({
        color: 0x94a3b8,
        metalness: 0.9,
        roughness: 0.1
      });
      this.materials.push(capMat);
      const cap = new THREE.Mesh(capGeo, capMat);
      cap.position.set(1.2 + (i % 2) * 0.5, 0.35, 0.4 + Math.floor(i / 2) * 0.5);
      this.hardwareGroup.add(cap);
    }

    // 6. Glowing Activity LEDs
    const ledGeo = new THREE.BoxGeometry(0.12, 0.08, 0.12);
    const ledMat = new THREE.MeshBasicMaterial({ color: 0x06b6d4 });
    const led = new THREE.Mesh(ledGeo, ledMat);
    led.position.set(-2.2, 0.12, -1.2);
    this.hardwareGroup.add(led);

    const led2 = new THREE.Mesh(ledGeo, new THREE.MeshBasicMaterial({ color: 0x10b981 }));
    led2.position.set(-2.0, 0.12, -1.2);
    this.hardwareGroup.add(led2);

    // Position overall group
    this.hardwareGroup.rotation.x = 0.4;
    this.hardwareGroup.rotation.y = -0.5;
    this.scene.add(this.hardwareGroup);

    // Cyber scanning grid floor
    const grid = new THREE.GridHelper(10, 20, 0x0891b2, 0x1e293b);
    grid.position.y = -1.2;
    this.scene.add(grid);

    // Render loop
    const animate = () => {
      this.animFrameId = requestAnimationFrame(animate);

      if (this.isAutoRotating() && !this.isDragging) {
        this.hardwareGroup.rotation.y += 0.008;
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

  toggleWireframe() {
    this.isWireframe.update(v => !v);
    const wire = this.isWireframe();
    this.materials.forEach(m => {
      (m as any).wireframe = wire;
    });
  }

  toggleAutoRotate() {
    this.isAutoRotating.update(v => !v);
  }

  selectHotspot(hs: any) {
    this.activeHotspot.set(hs);
    this.isAutoRotating.set(false);
  }

  // Pointer interactions for rotation
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
