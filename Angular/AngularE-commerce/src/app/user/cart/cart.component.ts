import { Component } from '@angular/core';
import { UserService } from '../../user.service';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  constructor(private userService: UserService) { this.getCart() }

  cart: any[] = []
  token = localStorage.getItem('token') || '';
  email = localStorage.getItem('email') || '';
  userId = localStorage.getItem('userId') || '';
  quantity: any = 0;

  getCart() {
    this.userService.getUserCart(this.token, this.email, this.userId).pipe(
      catchError((error) => {
        return (error);
      })
    ).subscribe(
      (response: any) => {
        this.cart = response?.items
        console.log(this.cart);

        this.cart[0].quantity = this.quantity
        console.log(this.cart[0].product_id._id);
      }
    )
  }



  updateQuantity(item: any, newQuantity: number) {

    const token = localStorage.getItem('token') || '';
    const email = localStorage.getItem('email') || '';

    // const updateUrl = `http://localhost:3000/api/v1/cart/${item.product_id.id}`;
    const body = { quantity: newQuantity }
    console.log(item);
    console.log(newQuantity);

    this.userService.updateUserCart(this.email, token, this.userId, item.product_id._id, body).pipe(
      catchError((error) => {
        return (error);
      })
    ).subscribe(
      (response: any) => {

      }
    );
  }



}
