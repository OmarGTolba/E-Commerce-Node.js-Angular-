import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private http: HttpClient, private userService: UserService) {}
  cart: any[] = [];

  addToCart(userId: string, body: any): Observable<any[]> {
    const baseUrl = `https://ecommerce-node-yxgy.onrender.com/api/v1/cart?user=${userId}`;

    this.userService.getCartCount(userId);
    return this.http.post<any[]>(baseUrl, body);
  }

  clearCart(userId: string): Observable<any[]> {
    const baseUrl = `https://ecommerce-node-yxgy.onrender.com/api/v1/cart?user=${userId}`;

    this.userService.getCartCount(userId);

    return this.http.delete<any[]>(baseUrl);
  }
}
