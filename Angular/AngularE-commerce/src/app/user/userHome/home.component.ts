import { Component } from '@angular/core';
import { ProductsService } from '../../services/products/products.service';
import { UserService } from '../../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private productService:ProductsService, private userService:UserService, private router: Router){
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

  getProduct(productId: string) {
    this.productService.getProductsByID(this.token, this.email, productId).subscribe(
      (response: any) => {
        this.router.navigate(['user/product', productId]);
      },
      (error) => {
        console.error('Error fetching order:', error);
      }
    )
  }
}
