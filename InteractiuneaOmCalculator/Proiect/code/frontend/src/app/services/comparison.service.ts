import { Injectable, signal, computed, effect } from '@angular/core';
import { Product } from '../models/product.model';

const STORAGE_KEY = 'vexera_comparison_list';

@Injectable({
  providedIn: 'root'
})
export class ComparisonService {
  private itemsSignal = signal<Product[]>(this.loadInitial());

  public items = this.itemsSignal.asReadonly();
  public count = computed(() => this.itemsSignal().length);
  public maxItems = 4;

  constructor() {
    effect(() => {
      try {
        if (typeof window !== 'undefined' && window.localStorage) {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(this.itemsSignal()));
        }
      } catch (e) {
        console.warn('Could not save comparison to storage', e);
      }
    });
  }

  private loadInitial(): Product[] {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Could not load comparison from storage', e);
    }
    return [];
  }

  public addProduct(product: Product): boolean {
    const current = this.itemsSignal();
    if (current.some(p => p.id === product.id)) {
      return false; // Already in comparison
    }
    if (current.length >= this.maxItems) {
      return false; // Max reached
    }
    this.itemsSignal.update(list => [...list, product]);
    return true;
  }

  public removeProduct(productId: number): void {
    this.itemsSignal.update(list => list.filter(p => p.id !== productId));
  }

  public toggleProduct(product: Product): boolean {
    if (this.isInComparison(product.id)) {
      this.removeProduct(product.id);
      return false;
    } else {
      return this.addProduct(product);
    }
  }

  public isInComparison(productId: number): boolean {
    return this.itemsSignal().some(p => p.id === productId);
  }

  public clear(): void {
    this.itemsSignal.set([]);
  }
}
