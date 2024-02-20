import { Component } from '@angular/core';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  constructor(private userService:UserService) {this.getCart()}

cart:any[] = []
token = localStorage.getItem('token') || '';
email = localStorage.getItem('email') || '';
userId = localStorage.getItem('userId') || ''

getCart(){
  this.userService.getUserCart(this.token, this.email, this.userId).subscribe(
    (response: any) => {
      this.cart = response?.items
      console.log(this.cart);
    },
    (error) => {
      console.error('Error fetching orders:', error);
    }
  )    
}

}
