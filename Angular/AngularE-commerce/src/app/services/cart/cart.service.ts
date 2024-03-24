import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }
  cart: any[] = [];


  addToCart(token: string, email: string, userId: string, body: any): Observable<any[]> {
    const baseUrl = `http://localhost:3000/api/v1/cart?user=${userId}`
    const headers = new HttpHeaders({
      'Content-type': 'application/json; charset=UTF-8',
      jwt: token,
      email: email,
    });
    return this.http.post<any[]>(baseUrl, body, { headers });
  }
}