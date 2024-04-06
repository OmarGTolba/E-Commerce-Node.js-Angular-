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

  getAllOrders(): void {
    const url = 'https://ecommerce-node-yxgy.onrender.com/api/v1/orders';

    this.http
      .get<any[]>(url, {})
      .pipe(
        catchError((error) => {
          return of(error);
        })
      )

      .subscribe((response: any) => {
        this.orders = response.data;
      });
  }

  cancel(id: string) {
    this.orderService
      .cancelOrder(id)
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
      });
  }
  complete(id: string) {
    this.orderService
      .confirmeOrder(id)
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
      });
  }
}
