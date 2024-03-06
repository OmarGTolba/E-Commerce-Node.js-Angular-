import { Component, Input } from '@angular/core';
import { ProductsService } from '../../services/products/products.service';
import { UserService } from '../../user.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  constructor(
    private productService: ProductsService,
    private userService: UserService,
    private router: Router
  ) {
  }
  @Input() product: any;

  token = localStorage.getItem('token') || '';
  email = localStorage.getItem('email') || '';
  

  getProduct(productId: string) {
    this.productService.getProductsByID(this.token, this.email, productId).pipe(
      catchError((error) => {
        return (error);
      })
    ).subscribe(
      (response: any) => {
        this.router.navigate(['user/product', productId]);
      }
    );
  }

}
