import { Injectable, inject, NgZone } from '@angular/core';
import { AccessibilityService } from './accessibility.service';
import gsap from 'gsap';

@Injectable({
  providedIn: 'root'
})
export class AnimationService {
  private ngZone = inject(NgZone);
  private a11y = inject(AccessibilityService);

  /**
   * Checks whether animations should be skipped or neutralized
   */
  public isReducedMotion(): boolean {
    if (typeof window === 'undefined') return true;
    return (
      this.a11y.reducedMotion() ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      document.documentElement.classList.contains('a11y-reduced-motion')
    );
  }

  /**
   * Numeric Counter Animation with ease-out cubic progression
   */
  public animateCounter(
    from: number,
    to: number,
    durationMs: number = 1200,
    onUpdate: (value: number) => void
  ): void {
    if (this.isReducedMotion()) {
      onUpdate(to);
      return;
    }

    this.ngZone.runOutsideAngular(() => {
      const obj = { val: from };
      gsap.to(obj, {
        val: to,
        duration: durationMs / 1000,
        ease: 'power2.out',
        onUpdate: () => {
          this.ngZone.run(() => onUpdate(Math.round(obj.val)));
        }
      });
    });
  }

  /**
   * Cyber/Tech Scramble Text effect for hardware badges & SKU telemetry
   */
  public scrambleText(
    finalText: string,
    durationMs: number = 700,
    onUpdate: (rendered: string) => void
  ): void {
    if (this.isReducedMotion()) {
      onUpdate(finalText);
      return;
    }

    const chars = '01ABCDEF#-_/.:';
    const totalFrames = Math.max(10, Math.floor(durationMs / 35));
    let frame = 0;

    this.ngZone.runOutsideAngular(() => {
      const interval = setInterval(() => {
        frame++;
        const progress = frame / totalFrames;
        const resolvedLength = Math.floor(progress * finalText.length);

        let output = finalText.slice(0, resolvedLength);
        for (let i = resolvedLength; i < finalText.length; i++) {
          if (finalText[i] === ' ') {
            output += ' ';
          } else {
            output += chars[Math.floor(Math.random() * chars.length)];
          }
        }

        this.ngZone.run(() => onUpdate(output));

        if (frame >= totalFrames) {
          clearInterval(interval);
          this.ngZone.run(() => onUpdate(finalText));
        }
      }, 35);
    });
  }

  /**
   * 3D Perspective Tilt for Flagship Hardware Cards
   */
  public handle3DTilt(event: MouseEvent, card: HTMLElement, maxAngle: number = 7): void {
    if (this.isReducedMotion()) return;

    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -maxAngle;
    const rotateY = ((x - centerX) / centerX) * maxAngle;

    card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;
  }

  /**
   * Reset 3D Tilt on mouse leave
   */
  public reset3DTilt(card: HTMLElement): void {
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  }
}
