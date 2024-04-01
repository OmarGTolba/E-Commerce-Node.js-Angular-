import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { NgToastService } from 'ng-angular-popup';
import { OrdersService } from '../../../services/orders/orders.service';

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrl: './all-orders.component.css',
})
export class AllOrdersComponent {
  constructor(
    private http: HttpClient,
    private orderService: OrdersService,
    private toast: NgToastService
  ) {
    this.getAllOrders();
  }
  orders: any[] = [];
  token = localStorage.getItem('token') || '';
  email = localStorage.getItem('email') || '';

  getAllOrders(): void {
    const url = 'https://ecommerce-node-yxgy.onrender.com/api/v1/orders';

    this.http
      .get<any[]>(url, {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          jwt: this.token,
          email: this.email,
        },
      })
      .pipe(
        catchError((error) => {
          return of(error);
        })
      )

      .subscribe((response: any) => {
        this.orders = response.data;
        console.log(response);
      });
  }

  cancel(id: string) {
    this.orderService
      .cancelOrder(this.token, this.email, id)
      .pipe(
        catchError((error) => {
          return of(error);
        })
      )
      .subscribe((response: any) => {
        if (response.status === 500) {
          this.toast.error({
            detail: 'ERROR',
            summary: 'oops error!',
            duration: 5000,
            position: 'topRight',
          });
          return;
        }
        this.toast.success({
          detail: 'SUCCESS',
          summary: 'Order canceled',
          duration: 5000,
          position: 'topRight',
        });

        console.log(response);
      });
  }
  complete(id: string) {
    this.orderService
      .confirmeOrder(this.token, this.email, id)
      .pipe(
        catchError((error) => {
          return of(error);
        })
      )
      .subscribe((response: any) => {
        if (response.status === 500) {
          this.toast.error({
            detail: 'ERROR',
            summary: 'oops error!',
            duration: 5000,
            position: 'topRight',
          });
          return;
        }
        this.toast.success({
          detail: 'SUCCESS',
          summary: 'Order confirmed',
          duration: 5000,
          position: 'topRight',
        });

        console.log(response);
      });
  }
}
