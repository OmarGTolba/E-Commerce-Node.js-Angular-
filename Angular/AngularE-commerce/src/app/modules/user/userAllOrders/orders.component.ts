import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../../services/orders/orders.service';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user/user.service';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit {
  constructor(private orderServices: OrdersService, private router: Router, private userService:UserService) { }
  orders: any[] = []
  isLoading = false;

  token = localStorage.getItem('token') || '';
  email = localStorage.getItem('email') || '';
  userId = localStorage.getItem('userId') || ''

  ngOnInit() {
    this.getUserOrders()
  }

  getUserOrders() {
    this.isLoading = true
    this.orderServices.getUserOrders( this.userId).subscribe(
      (response: any) => {
        this.orders = response.data;
        this.isLoading = false
      }
    )
  }
  
  getOrder(orderId: string) {
    this.orderServices.getOrderByID( orderId).pipe(
      catchError((error) => {
        return of(error);
      })
    ).subscribe(
      (response: any) => {
        this.router.navigate(['user/order', orderId]);
      }
    )
  }


  cancelOrder(orderId: string) {
    this.orderServices.cancelOrder( orderId).pipe(
      catchError((error) => {
        return (error);
      })
    ).subscribe(
      (response: any) => {
        this.getUserOrders()
  
 }
    )
  }
  
}