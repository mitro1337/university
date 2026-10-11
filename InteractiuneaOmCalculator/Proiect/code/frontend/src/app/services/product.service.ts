import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { Category, Product, FilterFacets } from '../models/product.model';

export interface ProductFilterParams {
  search?: string;
  category?: string;
  subcategory?: string;
  inStock?: boolean;
  featured?: boolean;
  minPrice?: number;
  maxPrice?: number;
  voltage?: string;
  interface?: string;
  sortBy?: 'featured' | 'price_asc' | 'price_desc' | 'rating' | 'newest';
  limit?: number;
  offset?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private http = inject(HttpClient);
  private apiUrl = '/api';

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/categories`).pipe(
      catchError(() => this.http.get<Category[]>('data/categories.json').pipe(
        catchError(() => of([]))
      ))
    );
  }

  getFacets(): Observable<FilterFacets> {
    return this.http.get<FilterFacets>(`${this.apiUrl}/facets`).pipe(
      catchError(() => this.getProducts().pipe(
        map(prods => {
          const subcats = Array.from(new Set(prods.map(p => p.subcategory).filter(Boolean)));
          const prices = prods.map(p => Number(p.price_ron) || 0);
          return {
            subcategories: subcats,
            voltages: ['3.3V', '5V', '12V', '24V', '48V PoE', '230V AC'],
            interfaces: ['I2C', 'SPI', 'UART', '10GbE SFP+', '25GbE SFP28', '2.5GbE', 'Gigabit Ethernet', 'PCIe 3.0 / 4.0', 'Wi-Fi 6 / BT', 'Zigbee / Thread / Matter', 'RS485 / CAN Bus', 'USB-C / PD'],
            minPrice: prices.length ? Math.min(...prices) : 0,
            maxPrice: prices.length ? Math.max(...prices) : 10000
          };
        }),
        catchError(() => of({ 
          subcategories: [], 
          voltages: ['3.3V', '5V', '12V', '24V', '48V PoE', '230V AC'], 
          interfaces: ['I2C', 'SPI', 'UART', '10GbE SFP+', '25GbE SFP28', '2.5GbE', 'Gigabit Ethernet', 'PCIe 3.0 / 4.0', 'Wi-Fi 6 / BT', 'Zigbee / Thread / Matter', 'RS485 / CAN Bus', 'USB-C / PD'], 
          minPrice: 0, 
          maxPrice: 10000 
        }))
      ))
    );
  }

  getProducts(filters: ProductFilterParams = {}): Observable<Product[]> {
    let params = new HttpParams();

    if (filters.search) params = params.set('search', filters.search);
    if (filters.category) params = params.set('category', filters.category);
    if (filters.subcategory) params = params.set('subcategory', filters.subcategory);
    if (filters.inStock !== undefined) params = params.set('inStock', String(filters.inStock));
    if (filters.featured !== undefined) params = params.set('featured', String(filters.featured));
    if (filters.minPrice !== undefined) params = params.set('minPrice', String(filters.minPrice));
    if (filters.maxPrice !== undefined) params = params.set('maxPrice', String(filters.maxPrice));
    if (filters.voltage) params = params.set('voltage', filters.voltage);
    if (filters.interface) params = params.set('interface', filters.interface);
    if (filters.sortBy) params = params.set('sortBy', filters.sortBy);
    if (filters.limit) params = params.set('limit', String(filters.limit));
    if (filters.offset) params = params.set('offset', String(filters.offset));

    return this.http.get<Product[]>(`${this.apiUrl}/products`, { params }).pipe(
      catchError(() => this.http.get<Product[]>('data/products.json').pipe(
        map(prods => this.filterClientSide(prods, filters)),
        catchError(() => of([]))
      ))
    );
  }

  private filterClientSide(prods: Product[], filters: ProductFilterParams): Product[] {
    let list = [...prods];
    if (filters.search) {
      const q = filters.search.toLowerCase();
      list = list.filter(p => p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q) || (p.short_desc && p.short_desc.toLowerCase().includes(q)));
    }
    if (filters.category) {
      list = list.filter(p => String(p.category_id) === String(filters.category));
    }
    if (filters.subcategory) {
      list = list.filter(p => p.subcategory === filters.subcategory);
    }
    if (filters.inStock) {
      list = list.filter(p => (p.stock ?? 0) > 0);
    }
    if (filters.featured) {
      list = list.filter(p => Boolean(p.featured));
    }
    if (filters.minPrice !== undefined) {
      list = list.filter(p => Number(p.price_ron) >= filters.minPrice!);
    }
    if (filters.maxPrice !== undefined) {
      list = list.filter(p => Number(p.price_ron) <= filters.maxPrice!);
    }
    if (filters.sortBy) {
      if (filters.sortBy === 'price_asc') list.sort((a, b) => Number(a.price_ron) - Number(b.price_ron));
      else if (filters.sortBy === 'price_desc') list.sort((a, b) => Number(b.price_ron) - Number(a.price_ron));
      else if (filters.sortBy === 'rating') list.sort((a, b) => (Number(b.rating) || 0) - (Number(a.rating) || 0));
      else if (filters.sortBy === 'newest') list.sort((a, b) => b.id - a.id);
    }
    if (filters.offset !== undefined) {
      list = list.slice(filters.offset);
    }
    if (filters.limit !== undefined) {
      list = list.slice(0, filters.limit);
    }
    return list;
  }

  getProduct(slugOrId: string | number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/products/${slugOrId}`).pipe(
      catchError(() => this.http.get<Product[]>('data/products.json').pipe(
        map(prods => {
          const found = prods.find(p => p.slug === String(slugOrId) || p.id === Number(slugOrId));
          if (!found) throw new Error('Product not found');
          return found;
        })
      ))
    );
  }

  getProductBySlug(slug: string): Observable<Product> {
    return this.getProduct(slug);
  }
}
