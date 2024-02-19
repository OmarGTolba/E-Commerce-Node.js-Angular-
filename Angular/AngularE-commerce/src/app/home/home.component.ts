import { Component } from '@angular/core';
import { ProductsService } from '../services/products/products.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
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
        console.log(this.products);
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    )
   
  }
}
