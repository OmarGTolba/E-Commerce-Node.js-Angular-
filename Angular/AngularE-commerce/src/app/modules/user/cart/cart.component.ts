import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user/user.service';
import { catchError, throwError } from 'rxjs';
import { PaymentService } from '../../../services/payment/payment.service';
import { OrdersService } from '../../../services/orders/orders.service';
import { LanguageService } from '../../../services/language/language.service';
import { CartService } from '../../../services/cart/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: '../../../app.component.css',
})
export class CartComponent {
  lang = localStorage.getItem('lang') || 'en';
  constructor(
    private userService: UserService,
    private paymentService: PaymentService,
    private orderService: OrdersService,
    private langService: LanguageService,

    private cartService:CartService



  ) {
    this.getCart();

    this.userService.mode.subscribe({
      next: (value) => {
        this.darkMode = value;
      },
    });
  }
  SkeletonLoading = false;
  darkMode: boolean = false;
  cart: any[] = [];

  userId = localStorage.getItem('userId') || '';
  quantity: any = 0;
  show = false;
  userOrder = '';
  body = {};

  total: number = 0;
  getCart() {
    this.SkeletonLoading = true;
    this.total = 0;
    this.userService
      .getUserCart(this.userId)
      .pipe(
        catchError((error) => {
          return error;
        })
      )
      .subscribe((response: any) => {
        this.cart = response?.items;
        if (this.cart) {
          console.log(this.cart);
          
          this.cart.forEach((element) => {
            this.total += element?.quantity * element?.product_id?.price;
            this.userService.total = this.total;
          });
        }
        this.SkeletonLoading = false;
      });
  }

  clear() {
    this.cartService.clearCart(this.userId).subscribe({
      next: (response: any) => {
        console.log(response);
        this.userService.cartLength.next(0);
        this.getCart();
      },
      error: (err) => {
        console.error('clear error:', err);
      },
    });
  }
  pay() {
    this.paymentService
      .showPayment(this.body)
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
  plus(i: any) {
    this.updateQuantity(i, ++i.quantity);
  }

  minus(i: any) {
    this.updateQuantity(i, --i.quantity);

    this.userService.total = this.total;
  }
  updateQuantity(item: any, newQuantity: number) {
    const body = { quantity: newQuantity };
    this.userService
      .updateUserCart(this.userId, item.product_id._id, body)
      .pipe(
        catchError((error) => {
          return error;
        })
      )
      .subscribe({
        next: (response: any) => {
          this.userService.total = this.total;
          this.getCart();
        },
        error: (err) => {
          console.error('Payment error:', err);
        },
      });
  }

  makeOrder() {
    const body = {
      city: 'Alexandria',
      phone: '01060702328',
    };
    this.userService
      .getUserOrder(this.userId, body)
      .pipe(
        catchError((error) => {
          return error;
        })
      )
      .subscribe((response: any) => {
        this.body = {
          user: this.userId,
          orderId: response.data._id,
        };
      });
  }

  deleteCart(item: any) {
    this.userService
      .deleteCartItem(this.userId, item.product_id._id)
      .pipe(
        catchError((error) => {
          return error;
        })
      )
      .subscribe((response: any) => {
        this.userService.getCartCount(this.userId);
        this.getCart();
      });
  }
}
