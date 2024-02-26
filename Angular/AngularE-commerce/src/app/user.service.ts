import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }
  getUserProducts(token: string, email: string ): Observable<any[]> {
    const updateUrl = `http://localhost:3000/api/v1/user/get`
    const headers = new HttpHeaders({
      'Content-type': 'application/json; charset=UTF-8',
      jwt: token,
      email: email,
    });
    return this.http.get<any[]>(updateUrl, { headers });
  }

  
  getUserCart(token: string, email: string , id:string ): Observable<any[]> {
    const updateUrl = `http://localhost:3000/api/v1/cart?user=${id}`
    const headers = new HttpHeaders({
      'Content-type': 'application/json; charset=UTF-8',
      jwt: token,
      email: email,
    });
    return this.http.get<any[]>(updateUrl, { headers });
  }

  updateUserCart(token: string, email: string , id:string , productId:string , body:any): Observable<any[]> {  
    const updateUrl = `http://localhost:3000/api/v1/cart/${productId}?user=${id}`
    const headers = new HttpHeaders({
      'Content-type': 'application/json; charset=UTF-8',
      jwt: token,
      email: email,
    });
    return this.http.patch<any[]>(updateUrl, body,{ headers },);
  }

}
