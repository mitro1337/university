import { Injectable, signal, computed, effect } from '@angular/core';
import { Product } from '../models/product.model';
import { CartItem } from '../models/cart.model';

const STORAGE_KEY = 'kilowatt_homelab_cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  // Signals state
  private itemsSignal = signal<CartItem[]>(this.loadInitialCart());
  public isOpen = signal<boolean>(false);
  public lastAddedProduct = signal<Product | null>(null);

  // Readonly accessor for items
  public items = this.itemsSignal.asReadonly();

  // Computed properties
  public itemsCount = computed(() => {
    return this.itemsSignal().reduce((sum, item) => sum + item.quantity, 0);
  });

  public subtotal = computed(() => {
    return this.itemsSignal().reduce((sum, item) => sum + item.product.price_ron * item.quantity, 0);
  });

  public freeShippingThreshold = 250.00;

  public freeShippingRemaining = computed(() => {
    const current = this.subtotal();
    return Math.max(0, this.freeShippingThreshold - current);
  });

  public isFreeShipping = computed(() => {
    return this.subtotal() >= this.freeShippingThreshold;
  });

  public shippingEstimate = computed(() => {
    const sub = this.subtotal();
    if (sub === 0) return 0;
    if (sub >= this.freeShippingThreshold) return 0;
    return 19.00; // Curier rapid Sameday
  });

  public total = computed(() => {
    return this.subtotal() + this.shippingEstimate();
  });

  constructor() {
    // Auto-sync cart with LocalStorage
    effect(() => {
      try {
        if (typeof window !== 'undefined' && window.localStorage) {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(this.itemsSignal()));
        }
      } catch (err) {
        console.warn('Could not save cart to localStorage', err);
      }
    });
  }

  private loadInitialCart(): CartItem[] {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          return JSON.parse(saved);
        }
      }
    } catch (err) {
      console.warn('Could not load cart from localStorage', err);
    }
    return [];
  }

  public addToCart(product: Product, quantity = 1): void {
    if (product.stock <= 0) return;

    this.itemsSignal.update(items => {
      const existingIndex = items.findIndex(item => item.product.id === product.id);
      if (existingIndex > -1) {
        const updated = [...items];
        const newQty = Math.min(product.stock, updated[existingIndex].quantity + quantity);
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: newQty
        };
        return updated;
      } else {
        const safeQty = Math.min(product.stock, Math.max(1, quantity));
        return [...items, { product, quantity: safeQty }];
      }
    });

    this.lastAddedProduct.set(product);
    this.openCart();

    // Auto-clear notification after 4s
    setTimeout(() => {
      if (this.lastAddedProduct()?.id === product.id) {
        this.lastAddedProduct.set(null);
      }
    }, 4000);
  }

  public removeFromCart(productId: number): void {
    this.itemsSignal.update(items => items.filter(item => item.product.id !== productId));
  }

  public updateQuantity(productId: number, quantity: number): void {
    if (quantity <= 0) {
      this.removeFromCart(productId);
      return;
    }

    this.itemsSignal.update(items => {
      return items.map(item => {
        if (item.product.id === productId) {
          const clamped = Math.min(item.product.stock, quantity);
          return { ...item, quantity: clamped };
        }
        return item;
      });
    });
  }

  public clearCart(): void {
    this.itemsSignal.set([]);
  }

  public openCart(): void {
    this.isOpen.set(true);
  }

  public closeCart(): void {
    this.isOpen.set(false);
  }

  public toggleCart(): void {
    this.isOpen.update(val => !val);
  }
}
