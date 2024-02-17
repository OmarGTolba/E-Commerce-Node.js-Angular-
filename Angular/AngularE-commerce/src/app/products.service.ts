import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  
  constructor(private http:HttpClient) { }
  
  baseUrl = 'http://localhost:3000/api/v1/products'
  getAllProducts(token: string, email: string): Observable<any[]> {
    const headers = new HttpHeaders({
      'Content-type': 'application/json; charset=UTF-8',
      jwt: token,
      email: email,
    });
    return this.http.get<any[]>(this.baseUrl, { headers });
  }


  getProductsByID(token: string, email: string , id:string): Observable<any[]> {
    const updateUrl = `http://localhost:3000/api/v1/products/${id}`
    const headers = new HttpHeaders({
      'Content-type': 'application/json; charset=UTF-8',
      jwt: token,
      email: email,
    });
    return this.http.get<any[]>(updateUrl, { headers });
  }

  updateProduct(token: string, email: string , id:string, body:any): Observable<any[]> {
    const updateUrl = `http://localhost:3000/api/v1/products/${id}`
    const headers = new HttpHeaders({
      'Content-type': 'application/json; charset=UTF-8',
      jwt: token,
      email: email,
    });
    return this.http.patch<any[]>(updateUrl, body,{ headers },);
  }

  
  deleteProduct(token: string, email: string , id:string): Observable<any[]> {
    const updateUrl = `http://localhost:3000/api/v1/products/${id}`
    const headers = new HttpHeaders({
      'Content-type': 'application/json; charset=UTF-8',
      jwt: token,
      email: email,
    });
    return this.http.delete<any[]>(updateUrl, { headers });
  }

}

