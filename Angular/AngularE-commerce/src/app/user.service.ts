import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}
  getUserProducts(token: string, email: string): Observable<any[]> {
    const updateUrl = `https://ecommerce-node-yxgy.onrender.com/api/v1/user/get`;
    const headers = new HttpHeaders({
      'Content-type': 'application/json; charset=UTF-8',
      jwt: token,
      email: email,
    });
    return this.http.get<any[]>(updateUrl, { headers });
  }

  getUserCart(token: string, email: string, id: string): Observable<any[]> {
    const updateUrl = `https://ecommerce-node-yxgy.onrender.com/api/v1/cart?user=${id}`;
    const headers = new HttpHeaders({
      'Content-type': 'application/json; charset=UTF-8',
      jwt: token,
      email: email,
    });
    return this.http.get<any[]>(updateUrl, { headers });
  }

  cartLength = new BehaviorSubject(0);

  getCartCount(token: any, email: any, id: any) {
    this.getUserCart(token, email, id)
      .pipe(
        catchError((error) => {
          // this.cartLength = 0;
          return of(error);
        })
      )
      .subscribe(async (response: any) => {
        this.cartLength.next(await response?.items?.length);

        console.log(response.items.length);

        console.log(response);
      });
  }

  total: any;

  updateUserCart(
    token: string,
    email: string,
    id: string,
    productId: string,
    body: any
  ): Observable<any[]> {
    const updateUrl = `https://ecommerce-node-yxgy.onrender.com/api/v1/cart/${productId}?user=${id}`;
    const headers = new HttpHeaders({
      'Content-type': 'application/json; charset=UTF-8',
      jwt: token,
      email: email,
    });
    return this.http.patch<any[]>(updateUrl, body, { headers });
  }

  getUserOrder(
    token: string,
    email: string,
    id: string,
    body: any
  ): Observable<any[]> {
    const updateUrl = `https://ecommerce-node-yxgy.onrender.com/api/v1/orders/${id}/user`;
    const headers = new HttpHeaders({
      'Content-type': 'application/json; charset=UTF-8',
      jwt: token,
      email: email,
    });
    return this.http.post<any[]>(updateUrl, body, { headers });
  }

  deleteCartItem(
    token: string,
    email: string,
    id: string,
    productId: string
  ): Observable<any[]> {
    const updateUrl = `https://ecommerce-node-yxgy.onrender.com/api/v1/cart/${productId}?user=${id}`;
    const headers = new HttpHeaders({
      'Content-type': 'application/json; charset=UTF-8',
      jwt: token,
      email: email,
    });
    return this.http.delete<any[]>(updateUrl, { headers: headers });
  }
  contact(data: {
    firstname: string;
    lastname: string;
    message: string;
    email: string;
  }): Observable<any> {
    return this.http.post<any>(
      'https://ecommerce-node-wqwd.onrender.com/api/v1/contact',
      data
    );
  }
}
