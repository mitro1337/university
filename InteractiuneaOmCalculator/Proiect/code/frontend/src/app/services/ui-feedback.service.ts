import { Injectable, signal, inject } from '@angular/core';
import { LenisService } from './lenis.service';

export interface ToastItem {
  id: string;
  message: string;
  type: 'info' | 'success' | 'copy';
}

@Injectable({
  providedIn: 'root'
})
export class UiFeedbackService {
  private lenisService = inject(LenisService);

  public scrollProgress = signal<number>(0);
  public showBackToTop = signal<boolean>(false);
  public toasts = signal<ToastItem[]>([]);
  public isSoundEnabled = signal<boolean>(true);
  public isTiltEnabled = signal<boolean>(true);
  public latencyMs = signal<number>(2.4);

  private audioCtx: AudioContext | null = null;
  private isListenerInitialized = false;

  public initGlobalListeners(): void {
    if (this.isListenerInitialized || typeof window === 'undefined') return;
    this.isListenerInitialized = true;

    this.lenisService.init();

    this.lenisService.lenis?.on('scroll', (e: any) => {
      this.scrollProgress.set(e.progress * 100);
      this.showBackToTop.set(e.scroll > 320);
    });

    window.addEventListener('scroll', () => {
      if (!this.lenisService.lenis) {
        this.updateScrollMetrics();
      }
    }, { passive: true });

    this.updateScrollMetrics();

    // Global tactile click feedback
    document.addEventListener('click', (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest('button, a, input, select, [role="button"], .spotlight-card, .btn-3d-primary, .btn-3d-secondary')) {
        this.playTactileClick('click');
      }
    }, { passive: true });

    // Jitter latency benchmark simulation
    setInterval(() => {
      const base = 2.1;
      const variation = (Math.random() * 1.8).toFixed(1);
      this.latencyMs.set(parseFloat((base + parseFloat(variation)).toFixed(1)));
    }, 4500);

    document.addEventListener('mousemove', (event: MouseEvent) => {
      const card = (event.target as HTMLElement | null)?.closest('.spotlight-card') as HTMLElement | null;
      if (card) {
        const rect = card.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      }
    }, { passive: true });
  }

  public playTactileClick(type: 'click' | 'toggle' | 'add' = 'click'): void {
    if (!this.isSoundEnabled() || typeof window === 'undefined') return;
    try {
      if (!this.audioCtx) {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioContextClass) {
          this.audioCtx = new AudioContextClass();
        }
      }
      if (!this.audioCtx) return;
      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }

      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      if (type === 'click') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1400, now);
        osc.frequency.exponentialRampToValueAtTime(320, now + 0.025);
        gain.gain.setValueAtTime(0.045, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.025);
        osc.start(now);
        osc.stop(now + 0.028);
      } else if (type === 'add') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(580, now);
        osc.frequency.exponentialRampToValueAtTime(1180, now + 0.06);
        gain.gain.setValueAtTime(0.07, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);
        osc.start(now);
        osc.stop(now + 0.075);
      } else {
        osc.type = 'square';
        osc.frequency.setValueAtTime(880, now);
        osc.frequency.exponentialRampToValueAtTime(440, now + 0.035);
        gain.gain.setValueAtTime(0.03, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);
        osc.start(now);
        osc.stop(now + 0.04);
      }
    } catch {
      // AudioContext unavailable or blocked
    }
  }

  public toggleSound(): boolean {
    const next = !this.isSoundEnabled();
    this.isSoundEnabled.set(next);
    if (next) this.playTactileClick('toggle');
    return next;
  }

  public toggleTilt(): boolean {
    const next = !this.isTiltEnabled();
    this.isTiltEnabled.set(next);
    return next;
  }

  private updateScrollMetrics(): void {
    if (typeof window === 'undefined') return;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    
    const progress = docHeight > 0 ? Math.min(100, Math.max(0, (scrollTop / docHeight) * 100)) : 0;
    this.scrollProgress.set(progress);
    this.showBackToTop.set(scrollTop > 320);
  }

  public scrollToTop(): void {
    if (this.lenisService.lenis) {
      this.lenisService.scrollToTop(1.15);
    } else if (typeof window !== 'undefined') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }

  public showToast(
    messageOrOptions: string | { message: string; type?: 'info' | 'success' | 'copy' },
    type: 'info' | 'success' | 'copy' = 'info'
  ): void {
    const msg = typeof messageOrOptions === 'string' ? messageOrOptions : messageOrOptions.message;
    const toastType = typeof messageOrOptions === 'string' ? type : (messageOrOptions.type || 'info');

    const id = Math.random().toString(36).substring(2, 9);
    const item: ToastItem = { id, message: msg, type: toastType };

    this.toasts.update(current => [...current, item]);

    setTimeout(() => {
      this.dismissToast(id);
    }, 2800);
  }

  public dismissToast(id: string): void {
    this.toasts.update(current => current.filter(t => t.id !== id));
  }

  public async copyToClipboard(text: string, label: string = 'Text'): Promise<void> {
    if (!text) return;
    let success = false;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        success = true;
      }
    } catch (e) {
      // Fallback below
    }

    if (!success) {
      try {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-9999px';
        textArea.style.top = '-9999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        success = document.execCommand('copy');
        document.body.removeChild(textArea);
      } catch (err) {
        // Fallback failed
      }
    }

    this.showToast(`${label} copiat în clipboard`, 'copy');
  }
}
