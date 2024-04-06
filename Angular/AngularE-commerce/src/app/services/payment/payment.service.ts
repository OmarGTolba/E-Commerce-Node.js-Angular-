import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  constructor(private httpClient: HttpClient) {}
  showPayment(body: any): Observable<any[]> {
    return this.httpClient.post<any>(
      'https://ecommerce-node-yxgy.onrender.com/api/v1/payment/checkout',
      body
    );
  }

  showResult(): Observable<string> {
    return this.httpClient.post<string>(
      'https://ecommerce-node-yxgy.onrender.com/api/v1/payment/checkout',
      {}
    );
  }
}
