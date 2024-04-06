import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}
  getUserProducts(): Observable<any[]> {
    const updateUrl = `https://ecommerce-node-yxgy.onrender.com/api/v1/user/get`;

    return this.http.get<any[]>(updateUrl);
  }

  getUserCart(id: string): Observable<any[]> {
    const updateUrl = `https://ecommerce-node-yxgy.onrender.com/api/v1/cart?user=${id}`;

    return this.http.get<any[]>(updateUrl);
  }

  cartLength = new BehaviorSubject(0);
  mode = new BehaviorSubject(false);
  getCartCount(id: any) {
    this.getUserCart(id)
      .pipe(
        catchError((error) => {
          return of(error);
        })
      )
      .subscribe(async (response: any) => {
        if (response !== null) {
          this.cartLength.next(await response?.items?.length);
        } else {
          this.cartLength.next(0);
        }
      });
  }

  total: any;

  updateUserCart(id: string, productId: string, body: any): Observable<any[]> {
    const updateUrl = `https://ecommerce-node-yxgy.onrender.com/api/v1/cart/${productId}?user=${id}`;

    return this.http.patch<any[]>(updateUrl, body);
  }

  getUserOrder(id: string, body: any): Observable<any[]> {
    const updateUrl = `https://ecommerce-node-yxgy.onrender.com/api/v1/orders/${id}/user`;
    const headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    });
    return this.http.post<any[]>(updateUrl, body, { headers });
  }

  deleteCartItem(id: string, productId: string): Observable<any[]> {
    const updateUrl = `https://ecommerce-node-yxgy.onrender.com/api/v1/cart/${productId}?user=${id}`;

    return this.http.delete<any[]>(updateUrl);
  }
  contact(data: {
    firstname: string;
    lastname: string;
    message: string;
    email: string;
  }): Observable<any> {
    return this.http.post<any>(
      'https://ecommerce-node-yxgy.onrender.com/api/v1/contact',
      data
    );
  }
}
