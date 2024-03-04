import { Component } from '@angular/core';
import { ProductsService } from '../../services/products/products.service';
import { UserService } from '../../user.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';

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
    this.productService.getAllProducts(this.token, this.email).pipe(
      catchError((error) => {
        return (error);
      })
    ).subscribe(
      (response: any) => {
        this.products = response.data;
        console.log(this.products);
      }
    )
  }

  getProduct(productId: string) {
    this.productService.getProductsByID(this.token, this.email, productId).pipe(
      catchError((error) => {
        return (error);
      })
    ).subscribe(
      (response: any) => {
        this.router.navigate(['user/product', productId]);
      }
    )
  }
}
