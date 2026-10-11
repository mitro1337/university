import { Injectable, signal, NgZone, inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import Lenis, { ScrollToOptions } from 'lenis';

@Injectable({
  providedIn: 'root'
})
export class LenisService {
  private ngZone = inject(NgZone);
  private router = inject(Router);

  public lenis: Lenis | null = null;
  public scroll = signal<number>(0);
  public progress = signal<number>(0);
  public velocity = signal<number>(0);
  public direction = signal<number>(0);
  public isScrolling = signal<boolean>(false);

  private rafId: number | null = null;
  private isInitialized = false;
  private intersectionObserver: IntersectionObserver | null = null;
  private scrollingTimeout: any = null;

  public init(): void {
    if (this.isInitialized || typeof window === 'undefined') return;
    this.isInitialized = true;

    // Run outside Angular zone for optimal 60fps performance without triggering change detection loops
    this.ngZone.runOutsideAngular(() => {
      this.setupLenis();
      this.setupIntersectionObserver();
      this.setupRouterScrollListener();
    });
  }

  private setupLenis(): void {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    this.lenis = new Lenis({
      duration: prefersReducedMotion ? 0.001 : 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: !prefersReducedMotion,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.4,
      autoRaf: false, // Managed manually in coordinate RAF loop
      respectReducedMotion: true
    });

    (window as any).lenis = this.lenis;

    // Listen to Lenis scroll events
    this.lenis.on('scroll', (e: Lenis) => {
      const scr = e.scroll;
      const prog = e.progress;
      const vel = e.velocity;
      const dir = e.direction;

      // Update CSS custom properties on :root for GPU-accelerated styling
      const root = document.documentElement;
      root.style.setProperty('--lenis-scroll', `${scr.toFixed(1)}px`);
      root.style.setProperty('--lenis-progress', `${prog.toFixed(4)}`);
      root.style.setProperty('--lenis-velocity', `${vel.toFixed(2)}`);
      root.style.setProperty('--lenis-velocity-abs', `${Math.abs(vel).toFixed(2)}`);
      root.style.setProperty('--lenis-direction', `${dir}`);

      const skew = Math.max(-2.5, Math.min(2.5, vel * 0.045));
      root.style.setProperty('--lenis-skew', `${skew.toFixed(2)}deg`);

      const tilt = Math.max(-4, Math.min(4, vel * 0.08));
      root.style.setProperty('--lenis-tilt', `${tilt.toFixed(2)}deg`);

      const stretch = Math.min(1.035, 1 + Math.abs(vel) * 0.002);
      root.style.setProperty('--lenis-stretch', `${stretch.toFixed(3)}`);

      if (scr > 32) {
        root.classList.add('lenis-scrolled');
      } else {
        root.classList.remove('lenis-scrolled');
      }

      this.scroll.set(scr);
      this.progress.set(prog);
      this.velocity.set(vel);
      this.direction.set(dir);
      this.isScrolling.set(true);

      clearTimeout(this.scrollingTimeout);
      this.scrollingTimeout = setTimeout(() => {
        this.isScrolling.set(false);
      }, 150);
    });

    const onFrame = (time: number) => {
      this.lenis?.raf(time);
      this.updateParallaxElements();
      this.rafId = requestAnimationFrame(onFrame);
    };

    this.rafId = requestAnimationFrame(onFrame);
  }

  private updateParallaxElements(): void {
    if (typeof window === 'undefined') return;
    const elements = document.querySelectorAll<HTMLElement>(
      '[data-lenis-parallax], [data-lenis-parallax-x], [data-lenis-parallax-scale], [data-lenis-parallax-rotate], [data-lenis-progress]'
    );
    if (!elements.length) return;

    const vh = window.innerHeight;
    elements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.bottom >= -250 && rect.top <= vh + 250) {
        const centerOffset = (rect.top + rect.height / 2) - vh / 2;

        const speedY = parseFloat(el.getAttribute('data-lenis-parallax') || '0');
        if (speedY !== 0) {
          const translateY = centerOffset * speedY * -1;
          el.style.setProperty('--parallax-y', `${translateY.toFixed(1)}px`);
        }

        const speedX = parseFloat(el.getAttribute('data-lenis-parallax-x') || '0');
        if (speedX !== 0) {
          const translateX = centerOffset * speedX * -1;
          el.style.setProperty('--parallax-x', `${translateX.toFixed(1)}px`);
        }

        const speedScale = parseFloat(el.getAttribute('data-lenis-parallax-scale') || '0');
        if (speedScale !== 0) {
          const norm = Math.max(-1, Math.min(1, centerOffset / (vh / 2)));
          const scale = 1 + (norm * speedScale);
          el.style.setProperty('--parallax-scale', `${scale.toFixed(3)}`);
        }

        const speedRotate = parseFloat(el.getAttribute('data-lenis-parallax-rotate') || '0');
        if (speedRotate !== 0) {
          const rot = (centerOffset / vh) * speedRotate * 40;
          el.style.setProperty('--parallax-rotate', `${rot.toFixed(1)}deg`);
        }

        if (el.hasAttribute('data-lenis-progress')) {
          const totalDistance = vh + rect.height;
          const currentDistance = vh - rect.top;
          const prog = Math.max(0, Math.min(1, currentDistance / totalDistance));
          el.style.setProperty('--element-progress', `${prog.toFixed(3)}`);
        }
      }
    });
  }

  private setupIntersectionObserver(): void {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;

    this.intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          this.intersectionObserver?.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.08
    });

    this.observeRevealElements();
  }

  public observeRevealElements(): void {
    if (!this.intersectionObserver || typeof document === 'undefined') return;
    const revealElements = document.querySelectorAll(
      '.lenis-reveal:not(.is-revealed), .lenis-reveal-stagger:not(.is-revealed), .lenis-reveal-left:not(.is-revealed), .lenis-reveal-right:not(.is-revealed), .lenis-reveal-scale:not(.is-revealed), .lenis-reveal-blur:not(.is-revealed)'
    );
    revealElements.forEach(el => this.intersectionObserver?.observe(el));
  }

  private setupRouterScrollListener(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      // Reset scroll position on route change
      this.scrollTo(0, { immediate: true });
      setTimeout(() => {
        this.resize();
        this.observeRevealElements();
      }, 100);
    });
  }

  public scrollTo(target: number | string | HTMLElement, options?: ScrollToOptions): void {
    if (!this.lenis) {
      if (typeof window !== 'undefined') {
        if (typeof target === 'number') {
          window.scrollTo({ top: target, behavior: options?.immediate ? 'auto' : 'smooth' });
        }
      }
      return;
    }

    this.lenis.scrollTo(target, {
      duration: options?.duration ?? 1.1,
      easing: options?.easing ?? ((t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t))),
      offset: options?.offset ?? 0,
      immediate: options?.immediate ?? false,
      lock: options?.lock ?? false,
      onComplete: options?.onComplete
    });
  }

  public scrollToTop(duration = 1.15): void {
    this.scrollTo(0, { duration });
  }

  public stop(): void {
    this.lenis?.stop();
  }

  public start(): void {
    this.lenis?.start();
  }

  public resize(): void {
    this.lenis?.resize();
  }

  public destroy(): void {
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
    this.intersectionObserver?.disconnect();
    this.lenis?.destroy();
    this.lenis = null;
    this.isInitialized = false;
  }
}
