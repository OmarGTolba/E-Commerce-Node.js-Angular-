import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../Models/userInterface';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor(private http: HttpClient) {}

  baseUrl = 'http://localhost:3000/api/v1/orders';

  getAllOrders(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  getUserOrder(id: string): Observable<any[]> {
    const updateUrl = `http://localhost:3000/api/v1/orders/${id}/user`;

    return this.http.get<any[]>(updateUrl);
  }

  getUserOrders(id: string): Observable<ApiResponse> {
    const updateUrl = `http://localhost:3000/api/v1/orders/${id}/user/orders`;

    return this.http.get<ApiResponse>(updateUrl);
  }

  getOrderByID(id: string): Observable<any[]> {
    const updateUrl = `http://localhost:3000/api/v1/orders/${id}`;

    return this.http.get<any[]>(updateUrl);
  }

  cancelOrder(id: string): Observable<any[]> {
    const updateUrl = `http://localhost:3000/api/v1/orders/${id}/cancel`;
    const headers = new HttpHeaders({
      'Content-type': 'application/json; charset=UTF-8',
    });
    return this.http.patch<any[]>(updateUrl, {});
  }
  confirmeOrder(id: string): Observable<any[]> {
    const updateUrl = `http://localhost:3000/api/v1/orders/${id}/success`;
    const headers = new HttpHeaders({
      'Content-type': 'application/json; charset=UTF-8',
    });
    return this.http.patch<any[]>(updateUrl, { headers });
  }
}
