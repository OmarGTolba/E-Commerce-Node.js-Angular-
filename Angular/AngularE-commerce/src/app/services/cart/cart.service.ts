import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from '../../user.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private http: HttpClient, private userService: UserService) {}
  cart: any[] = [];

  addToCart(
    token: string,
    email: string,
    userId: string,
    body: any
  ): Observable<any[]> {
    const baseUrl = `https://ecommerce-node-wqwd.onrender.com/api/v1/cart?user=${userId}`;
    const headers = new HttpHeaders({
      'Content-type': 'application/json; charset=UTF-8',
      jwt: token,
      email: email,
    });
    this.userService.getCartCount(token, email, userId);
    return this.http.post<any[]>(baseUrl, body, { headers });
  }
}
