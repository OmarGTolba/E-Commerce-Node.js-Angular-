import { Component } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-products',
  templateUrl: './user-products.component.html',
  styleUrl: './user-products.component.css'
})
export class UserProductsComponent {


constructor(private userService:UserService) { this.getUserProduct()}
products:any[]=[]

token = localStorage.getItem('token') || '';
email = localStorage.getItem('email') || '';
getUserProduct(){
  this.userService.getUserProducts(this.token,this.email).subscribe(
      (response: any) => {
      this.products = response.Products;
    //  console.log(this.products);
    },
    (error) => {
      console.error('Error fetching products:', error);
    }
  )
}

}
