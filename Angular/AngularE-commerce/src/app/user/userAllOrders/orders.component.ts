import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../services/orders/orders.service';
import { Router } from '@angular/router';
import { UserService } from '../../user.service';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit {
  constructor(private orderServices: OrdersService, private router: Router, private userService:UserService) { }
  orders: any[] = []


  token = localStorage.getItem('token') || '';
  email = localStorage.getItem('email') || '';
  userId = localStorage.getItem('userId') || ''

  ngOnInit() {
    this.getUserOrders()
  }

  getUserOrders() {
    this.orderServices.getUserOrders(this.token, this.email, this.userId).pipe(
      catchError((error) => {
        return (error);
      })
    ).subscribe(
      (response: any) => {
        this.orders = response.data;
      }
    )
  }
  
  getOrder(orderId: string) {
    this.orderServices.getOrderByID(this.token, this.email, orderId).pipe(
      catchError((error) => {
        return (error);
      })
    ).subscribe(
      (response: any) => {
        this.router.navigate(['user/order', orderId]);
      }
    )
  }
}