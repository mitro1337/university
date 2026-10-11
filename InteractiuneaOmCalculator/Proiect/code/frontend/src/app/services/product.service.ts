import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
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
    return this.http.get<Category[]>(`${this.apiUrl}/categories`);
  }

  getFacets(): Observable<FilterFacets> {
    return this.http.get<FilterFacets>(`${this.apiUrl}/facets`);
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

    return this.http.get<Product[]>(`${this.apiUrl}/products`, { params });
  }

  getProduct(slugOrId: string | number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/products/${slugOrId}`);
  }

  getProductBySlug(slug: string): Observable<Product> {
    return this.getProduct(slug);
  }
}
