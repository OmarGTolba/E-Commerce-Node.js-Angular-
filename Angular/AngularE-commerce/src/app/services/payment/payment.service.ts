import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  constructor(private httpClient: HttpClient) {}
  showPayment(token: string, body: any): Observable<any[]> {
    const headers = new HttpHeaders({
      'Content-type': 'application/json; charset=UTF-8',
      jwt: token,
    });
    return this.httpClient.post<any>(
      'https://ecommerce-node-yxgy.onrender.com/api/v1/payment/checkout',
      body,
      { headers }
    );
  }

  showResult(): Observable<string> {
    // const headers = new HttpHeaders({
    //   'Content-type': 'application/json; charset=UTF-8',
    //   jwt: token,
    // });
    return this.httpClient.post<string>(
      'https://ecommerce-node-yxgy.onrender.com/api/v1/payment/result',{}
    );
  }
}
