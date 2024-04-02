import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IUser } from '../../../Models/userInterface';
import { UserService } from '../../../services/user/user.service';
import { PaymentService } from '../../../services/payment/payment.service';
import { OrdersService } from '../../../services/orders/orders.service';
import { catchError, throwError } from 'rxjs';
import { log } from 'console';
import { ProfileService } from '../../../services/profile/profile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent implements OnInit {
  token = localStorage.getItem('token') || '';
  email = localStorage.getItem('email') || '';
  userId = localStorage.getItem('userId') || '';
  userData: any = {
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    phoneno: '',
  };
  body = {};
  total: any;
  constructor(
    private userService: UserService,
    private paymentService: PaymentService,
    private orderService: OrdersService,
    private profileService: ProfileService,
    private router: Router
  ) {
    this.total = this.userService.total;
    console.log(this.total);
    console.log(this.userService.total);
    this.getCart();
  }

  ngOnInit(): void {
    this.profileService.getUserInfo(this.userId).subscribe((res) => {
      console.log(res);
      this.userData.name = res.name;
      this.userData.email = res.email;
      this.userData.address = res.address;
      console.log(res.name);
    });
  }

  cart: any[] = [];

  getCart() {
    this.total = 0;
    this.userService
      .getUserCart( this.userId)
      .pipe(
        catchError((error) => {
          return error;
        })
      )
      .subscribe((response: any) => {
        this.cart = response?.items;
        console.log(this.cart);
        this.cart.forEach((element) => {
          this.total += element.quantity * element.product_id.price;
          this.userService.total = this.total;
          console.log(this.userService.total);
        });
        // this.cart[0].quantity = this.quantity;
        // console.log(this.cart[0].product_id._id);
      });
  }

  editFormGroup = new FormGroup({
    name: new FormControl({ value: '', disabled: true }, [
      Validators.required,
      Validators.minLength(3),
    ]),
    email: new FormControl({ value: '', disabled: true }, [
      Validators.required,
      Validators.pattern(/^[\w]+@[\w]+.com$/),
    ]),
    phone: new FormControl({ value: '', disabled: false }, [
      Validators.pattern(/^01[0-2]\d{8}$/),
      Validators.required,
    ]),
    address: new FormControl({ value: '', disabled: false }, [
      Validators.required,
    ]),
    city: new FormControl({ value: '', disabled: false }, [
      Validators.required,
    ]),
    paymentMethod: new FormControl({}),
  });

  makeOrder() {
    const token = localStorage.getItem('token') || '';
    const email = localStorage.getItem('email') || '';

    // const updateUrl = `https://ecommerce-node-yxgy.onrender.com/api/v1/cart/${item.product_id.id}`;
    const body = {
      city: this.editFormGroup.controls.city.value,
      phone: this.editFormGroup.controls.phone.value,
    };
    console.log(token, email, this.userId, body);

    this.userService
      .getUserOrder( this.userId, body)
      .pipe(
        catchError((error) => {
          return error;
        })
      )
      .subscribe((response: any) => {
        console.log(response.data._id);
        this.body = {
          user: this.userId,
          orderId: response.data._id,
        };
      });
  }

  makeCreditOrder() {
    const token = localStorage.getItem('token') || '';
    const email = localStorage.getItem('email') || '';

    // const updateUrl = `https://ecommerce-node-yxgy.onrender.com/api/v1/cart/${item.product_id.id}`;
    const body = {
      city: this.editFormGroup.controls.city.value,
      phone: this.editFormGroup.controls.phone.value,
    };
    console.log(token, email, this.userId, body);

    this.userService
      .getUserOrder( this.userId, body)
      .pipe(
        catchError((error) => {
          return error;
        })
      )
      .subscribe((response: any) => {
        console.log(response.data._id);
        this.body = {
          user: this.userId,
          orderId: response.data._id,
        };
        this.pay();
      });
  }
  async click() {
    console.log(this.editFormGroup.controls.paymentMethod.value);

    if (
      this.editFormGroup.controls.paymentMethod.value &&
      this.editFormGroup.controls.paymentMethod.value == 'CASH'
    ) {
      this.makeOrder();
      this.router.navigate(['user/profile/allOrder']);
    } else if (
      this.editFormGroup.controls.paymentMethod.value &&
      this.editFormGroup.controls.paymentMethod.value == 'CREDIT'
    ) {
      await this.makeCreditOrder();
      this.router.navigate(['user/profile/allOrder']);
    }
    this.makeOrder();
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
          this.userService.cartLength.next(0);
        },
        error: (err) => {
          console.error('Payment error:', err);
        },
      });
  }
}
