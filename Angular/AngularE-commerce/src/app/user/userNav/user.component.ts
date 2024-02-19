import { Component } from '@angular/core';
import { ProductsService } from '../../services/products/products.service';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
constructor(private productService:ProductsService, private userService:UserService){
  this.getAllProducts()
}
products: any[] = [];

token = localStorage.getItem('token') || '';
email = localStorage.getItem('email') || '';
getAllProducts(): void {
  this.productService.getAllProducts(this.token, this.email).subscribe(
    (response: any) => {
      this.products = response.data;
     // console.log(this.products);
    },
    (error) => {
      console.error('Error fetching products:', error);
    }
  )
 
}

}
