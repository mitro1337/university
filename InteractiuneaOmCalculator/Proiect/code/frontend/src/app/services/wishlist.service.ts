import { Injectable, signal, inject } from '@angular/core';
import { Product } from '../models/product.model';
import { UiFeedbackService } from './ui-feedback.service';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private uiFeedback = inject(UiFeedbackService);
  private storageKey = 'vexera_wishlist_ids';

  public wishlistIds = signal<number[]>(this.loadFromStorage());

  private loadFromStorage(): number[] {
    if (typeof window === 'undefined') return [];
    try {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  private saveToStorage(ids: number[]) {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(ids));
    } catch {}
  }

  public isWishlisted(productId: number): boolean {
    return this.wishlistIds().includes(productId);
  }

  public toggleWishlist(product: Product): boolean {
    const current = this.wishlistIds();
    const exists = current.includes(product.id);
    let next: number[];

    if (exists) {
      next = current.filter(id => id !== product.id);
      this.uiFeedback.showToast(`${product.name} eliminat din favorite`, 'info');
    } else {
      next = [...current, product.id];
      this.uiFeedback.showToast(`${product.name} salvat în favorite`, 'success');
    }

    this.wishlistIds.set(next);
    this.saveToStorage(next);
    return !exists;
  }

  public count(): number {
    return this.wishlistIds().length;
  }
}
