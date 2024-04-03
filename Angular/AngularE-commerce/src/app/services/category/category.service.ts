import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  baseUrl = 'https://ecommerce-node-yxgy.onrender.com/api/v1/categories';
  getAllCategories(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  addCategories(body: any): Observable<any[]> {
    return this.http.post<any[]>(this.baseUrl, body);
  }

  getCategoryById(id: string): Observable<any[]> {
    const updateUrl = `https://ecommerce-node-wqwd.onrender.com/api/v1/categories/${id}`;

    return this.http.get<any[]>(updateUrl);
  }
  deleteCategory(id: string): Observable<any[]> {
    const updateUrl = `https://ecommerce-node-wqwd.onrender.com/api/v1/categories/${id}`;

    return this.http.delete<any[]>(updateUrl);
  }
  updateCategory(id: string, body: any): Observable<any[]> {
    const updateUrl = `https://ecommerce-node-yxgy.onrender.com/api/v1/categories/${id}`;

    return this.http.put<any[]>(updateUrl, body);
  }
}
