import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IUser } from '../../../Models/userInterface';
import { UserService } from '../../../services/user/user.service';
import { PaymentService } from '../../../services/payment/payment.service';
import { OrdersService } from '../../../services/orders/orders.service';
import { catchError, of, throwError } from 'rxjs';
import { log } from 'console';
import { ProfileService } from '../../../services/profile/profile.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css', '../../../app.component.css'],
})
export class CheckoutComponent implements OnInit {
   
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
  darkMode:any;
  total: any;
  constructor(
    private userService: UserService,
    private paymentService: PaymentService,
    private orderService: OrdersService,
    private profileService: ProfileService,
    // private profileService: ProfileService,
    private router: Router, private toast: NgToastService
  ) {
    this.total = this.userService.total;
    this.getCart();

    this.userService.mode.subscribe({
      next: (value) => {
        this.darkMode = value;
      },
    });
  }

  ngOnInit(): void {
    this.profileService.getUserInfo(this.userId).subscribe((res) => {
      this.userData.name = res.name;
      this.userData.email = res.email;
      this.userData.address = res.address;
    });
  console.log(this.userData);
  
  }

  cart: any[] = [];

  getCart() {
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
        this.cart.forEach((element) => {
          this.total += element.quantity * element.product_id.price;
          this.userService.total = this.total;
        });
      });
  }

  editFormGroup = new FormGroup({
    name: new FormControl({ value: '', disabled: true }, [
      
      Validators.minLength(3),
    ]),
    email: new FormControl({ value: '', disabled: true }, [
   
      Validators.pattern(/^[\w]+@[\w]+.com$/),
    ]),
    phone: new FormControl({ value: '', disabled: false }, [
      // Validators.pattern(/^01[0-2]\d{8}$/),

    ]),
    address: new FormControl({ value: '', disabled: false }, [
      
    ]),
    city: new FormControl({ value: '', disabled: false }, [
      Validators.required,
    ]),
    paymentMethod: new FormControl({}),
  });

  makeOrder() {
    const body = {
      city: this.editFormGroup.controls.city.value,
      phone: this.editFormGroup.controls.phone.value,
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
        this.userService.cartLength.next(0);
      });
  }

  makeCreditOrder() {
    const body = {
      city: this.editFormGroup.controls.city.value,
      phone: this.editFormGroup.controls.phone.value,
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
        this.pay();
        // this.userService.cartLength.next(0);
      });
  }
  async click() {
    
    if(this.editFormGroup.valid){
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
      this.makeCreditOrder();
      this.router.navigate(['user/profile/allOrder']);
    }
    this.makeOrder();}
    else{
      this.toast.error({
        detail: 'City and Phone are required',
        summary: 'Error',
        duration: 5000,
        position: 'topRight',
      }); 
      
    }
    
  }
  pay() {
    this.paymentService
      .showPayment(this.body)
      .pipe(
        catchError((error) => {
          return of(error) ;
        })
      )
      .subscribe({
        next: (response: any) => {

          console.log(response.session);
          
          window.open(response.session.url, '_blank');
          // this.userService.cartLength.next(0);
        },
        error: (err) => {
          console.error('Payment error:', err);
        },
      });
  }
}
