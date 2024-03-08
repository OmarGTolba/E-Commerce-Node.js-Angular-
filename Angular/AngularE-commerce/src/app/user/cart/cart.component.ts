import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user.service';
import { catchError, throwError } from 'rxjs';
import { PaymentService } from '../../services/payment/payment.service';
import { OrdersService } from '../../services/orders/orders.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit{
  constructor(
    private userService: UserService,
    private paymentService: PaymentService,
    private orderService: OrdersService
  ) {
    this.getCart();
  }
  

  cart: any[] = [];
  token = localStorage.getItem('token') || '';
  email = localStorage.getItem('email') || '';
  userId = localStorage.getItem('userId') || '';
  quantity: any = 0;
  show = false;
  userOrder =""
  body={}
  ngOnInit(): void {
    console.log("hello");
    
    this.orderService.getUserOrders(this.token,this.email,this.userId).subscribe((res)=>{
      res.data.forEach((order)=>{
        console.log(order.status);
        
        if(order.status.toLowerCase() == 'pending'){
          this.userOrder = order._id
          console.log(this.userOrder);
          this.body = {
            user: this.userId,
            orderId: this.userOrder,
          };
        }
      })
    })
  }
  
  getCart() {
    this.userService
      .getUserCart(this.token, this.email, this.userId)
      .pipe(
        catchError((error) => {
          return error;
        })
      )
      .subscribe((response: any) => {
        this.cart = response?.items;
        console.log(this.cart);

        this.cart[0].quantity = this.quantity;
        console.log(this.cart[0].product_id._id);
      });
  }
  pay() {
    this.paymentService
      .showPayment(this.token, this.body)
      .pipe(
        catchError((error) => {
          return throwError(error);
        })
      )
      .subscribe({
        next: (response: any) => {
          window.open(response.session.url, '_blank');
        },
        error: (err) => {
          console.error('Payment error:', err);
        },
      });
  }

  updateQuantity(item: any, newQuantity: number) {
    const token = localStorage.getItem('token') || '';
    const email = localStorage.getItem('email') || '';

    // const updateUrl = `http://localhost:3000/api/v1/cart/${item.product_id.id}`;
    const body = { quantity: newQuantity };
    console.log(item);
    console.log(newQuantity);

    this.userService
      .updateUserCart(this.email, token, this.userId, item.product_id._id, body)
      .pipe(
        catchError((error) => {
          return error;
        })
      )
      .subscribe((response: any) => {});
  }
}
