import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AudioFeedbackService {
  private audioCtx: AudioContext | null = null;
  public readonly isMuted = signal<boolean>(this.getInitialMuteState());

  constructor() {}

  private getInitialMuteState(): boolean {
    if (typeof window !== 'undefined' && window.localStorage) {
      const saved = window.localStorage.getItem('vexera_audio_muted');
      if (saved !== null) {
        return saved === 'true';
      }
    }
    // Default: sound enabled with very gentle subtle gain
    return false;
  }

  public toggleMute(): void {
    const next = !this.isMuted();
    this.isMuted.set(next);
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem('vexera_audio_muted', String(next));
    }
    if (!next) {
      // Play a quick confirmation click when unmuting
      this.playClick();
    }
  }

  public play(sound: 'click' | 'switch' | 'mount' | 'beep' | 'stamp'): void {
    switch (sound) {
      case 'click': this.playClick(); break;
      case 'switch': this.playSwitch(); break;
      case 'mount': this.playMount(); break;
      case 'beep': this.playBeep(); break;
      case 'stamp': this.playStamp(); break;
    }
  }

  private initContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.audioCtx) {
      const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtxClass) {
        this.audioCtx = new AudioCtxClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    return this.audioCtx;
  }

  /**
   * Procedural tactile mechanical switch click (Teenage Engineering inspired)
   */
  public playClick(): void {
    if (this.isMuted()) return;
    try {
      const ctx = this.initContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      const now = ctx.currentTime;
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(150, now + 0.025);

      gain.gain.setValueAtTime(0.045, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.025);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.03);
    } catch {
      // Silently ignore audio context errors
    }
  }

  /**
   * Double mechanical toggle relay click
   */
  public playSwitch(): void {
    if (this.isMuted()) return;
    try {
      const ctx = this.initContext();
      if (!ctx) return;

      const now = ctx.currentTime;

      // Pulse 1
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'triangle';
      osc1.frequency.setValueAtTime(1200, now);
      osc1.frequency.exponentialRampToValueAtTime(300, now + 0.015);
      gain1.gain.setValueAtTime(0.04, now);
      gain1.gain.exponentialRampToValueAtTime(0.0001, now + 0.015);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.02);

      // Pulse 2 (20ms later)
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(950, now + 0.02);
      osc2.frequency.exponentialRampToValueAtTime(220, now + 0.035);
      gain2.gain.setValueAtTime(0.035, now + 0.02);
      gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.038);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(now + 0.02);
      osc2.stop(now + 0.04);
    } catch {
      // Ignore
    }
  }

  /**
   * Heavy rack unit mount snap
   */
  public playMount(): void {
    if (this.isMuted()) return;
    try {
      const ctx = this.initContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.exponentialRampToValueAtTime(60, now + 0.06);

      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.06);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.07);
    } catch {
      // Ignore
    }
  }

  /**
   * Confirmation high-tech chime (cart addition / confirmation)
   */
  public playBeep(): void {
    if (this.isMuted()) return;
    try {
      const ctx = this.initContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1200, now);
      osc.frequency.setValueAtTime(1600, now + 0.04);

      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.13);
    } catch {
      // Ignore
    }
  }

  /**
   * Deep electronic stamp thud (rubber stamp on invoice)
   */
  public playStamp(): void {
    if (this.isMuted()) return;
    try {
      const ctx = this.initContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(95, now);
      osc.frequency.exponentialRampToValueAtTime(35, now + 0.12);

      gain.gain.setValueAtTime(0.09, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.14);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.15);
    } catch {
      // Ignore
    }
  }
}
