import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../Models/userInterface';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor(private http: HttpClient) {}

  baseUrl = 'https://ecommerce-node-yxgy.onrender.com/api/v1/orders';

  getAllOrders(token: string, email: string): Observable<any[]> {
    //for admin
    const headers = new HttpHeaders({
      'Content-type': 'application/json; charset=UTF-8',
      jwt: token,
      email: email,
    });
    return this.http.get<any[]>(this.baseUrl, { headers });
  }

  getUserOrder(token: string, email: string, id: string): Observable<any[]> {
    const updateUrl = `https://ecommerce-node-yxgy.onrender.com/api/v1/orders/${id}/user`;
    const headers = new HttpHeaders({
      'Content-type': 'application/json; charset=UTF-8',
      jwt: token,
      email: email,
    });
    return this.http.get<any[]>(updateUrl, { headers });
  }

  getUserOrders(
    token: string,
    email: string,
    id: string
  ): Observable<ApiResponse> {
    const updateUrl = `https://ecommerce-node-yxgy.onrender.com/api/v1/orders/${id}/user/orders`;
    const headers = new HttpHeaders({
      'Content-type': 'application/json; charset=UTF-8',
      jwt: token,
      email: email,
    });
    return this.http.get<ApiResponse>(updateUrl, { headers });
  }

  getOrderByID(token: string, email: string, id: string): Observable<any[]> {
    const updateUrl = `https://ecommerce-node-yxgy.onrender.com/api/v1/orders/${id}`;
    const headers = new HttpHeaders({
      'Content-type': 'application/json; charset=UTF-8',
      jwt: token,
      email: email,
    });
    return this.http.get<any[]>(updateUrl, { headers });
  }

  cancelOrder(token: string, email: string, id: string): Observable<any[]> {
    const updateUrl = `https://ecommerce-node-yxgy.onrender.com/api/v1/orders/${id}/cancel`;
    const headers = new HttpHeaders({
      'Content-type': 'application/json; charset=UTF-8',
      jwt: token,
      email: email,
    });
    return this.http.patch<any[]>(updateUrl, { headers });
  }
  confirmeOrder(token: string, email: string, id: string): Observable<any[]> {
    const updateUrl = `https://ecommerce-node-yxgy.onrender.com/api/v1/orders/${id}/success`;
    const headers = new HttpHeaders({
      'Content-type': 'application/json; charset=UTF-8',
      jwt: token,
      email: email,
    });
    return this.http.patch<any[]>(updateUrl, { headers });
  }
}
