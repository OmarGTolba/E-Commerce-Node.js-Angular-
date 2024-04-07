import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  baseUrl = 'https://ecommerce-node-yxgy.onrender.com/api/v1/products';
  getAllProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  getAllCategories(): Observable<any[]> {
    const Url = 'https://ecommerce-node-yxgy.onrender.com/api/v1/categories';
    return this.http.get<any[]>(Url);
  }

  getReviewsByID(id: string): Observable<any[]> {
    const updateUrl = `https://ecommerce-node-wqwd.onrender.com/api/v1/products/${id}/reviews`;
    return this.http.get<any[]>(updateUrl);
  }

  addReview(id: string, body: any): Observable<any[]> {
    const updateUrl = `https://ecommerce-node-yxgy.onrender.com/api/v1/products/${id}/reviews`;
    return this.http.post<any[]>(updateUrl, body);
  }

  getRatingByID(id: string): Observable<any[]> {
    const updateUrl = `https://ecommerce-node-wqwd.onrender.com/api/v1/products/${id}/ratings`;
    return this.http.post<any[]>(updateUrl, {});
  }

  getProductsByID(id: string): Observable<any[]> {
    const updateUrl = `https://ecommerce-node-yxgy.onrender.com/api/v1/products/${id}`;
    return this.http.get<any[]>(updateUrl);
  }

  products: any[] = [];
  searchByName(name: string): Observable<any[]> {
    const updateUrl = `https://ecommerce-node-yxgy.onrender.com/api/v1/search/product/${name}`;
    return this.http.get<any[]>(updateUrl);
  }

  searchByCategory(name: string): Observable<any[]> {
    const updateUrl = `https://ecommerce-node-yxgy.onrender.com/api/v1/search/category/${name}`;
    return this.http.get<any[]>(updateUrl);
  }

  updateProduct(id: string, body: any): Observable<any[]> {
    const updateUrl = `https://ecommerce-node-yxgy.onrender.com/api/v1/products/${id}`;
    return this.http.patch<any[]>(updateUrl, body);
  }

  updateReview(id: string, body: any): Observable<any[]> {
    const updateUrl = `https://ecommerce-node-yxgy.onrender.com/api/v1/products/${id}/reviews`;
    return this.http.patch<any[]>(updateUrl, body);
  }

  deleteReview(id: string): Observable<any[]> {
    const updateUrl = `https://ecommerce-node-yxgy.onrender.com/api/v1/products/${id}/reviews`;
    return this.http.delete<any[]>(updateUrl);
  }

  deleteProduct(id: string): Observable<any[]> {
    const updateUrl = `https://ecommerce-node-yxgy.onrender.com/api/v1/products/${id}`;
    return this.http.delete<any[]>(updateUrl);
  }

  AddToFav(userId: string, id: string): Observable<any[]> {
    const updateUrl = `https://ecommerce-node-yxgy.onrender.com/api/v1/products/favourite/${userId}/${id}`;
    return this.http.post<any[]>(updateUrl, {});
  }
  removeFromFav(userId: string, id: string): Observable<any[]> {
    const updateUrl = `https://ecommerce-node-yxgy.onrender.com/api/v1/products/favourite/${userId}/${id}`;
    return this.http.delete<any[]>(updateUrl);
  }

  isFav(userId: string, id: string): Observable<any[]> {
    const updateUrl = `https://ecommerce-node-yxgy.onrender.com/api/v1/products/favourite/${userId}/${id}`;
    return this.http.get<any[]>(updateUrl);
  }
}
