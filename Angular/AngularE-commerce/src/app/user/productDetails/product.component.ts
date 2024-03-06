import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products/products.service';
import { CartService } from '../../services/cart/cart.service';
import { catchError } from 'rxjs/operators';
import {  throwError } from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  productId: string = "";
  token = localStorage.getItem('token') || '';
  email = localStorage.getItem('email') || '';
  userId = localStorage.getItem('userId') || '';
  reviews:any;

  product: any;
  quantity = 0;
  size = 'choose size';
  value: number = 0;

  constructor(private route: ActivatedRoute, private cartServices: CartService, private productServices: ProductsService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.productId = params['productId'];

    });
    this.productServices.getProductsByID(this.token, this.email, this.productId).pipe(
      catchError((error) => {
        return (error);
      })
    ).subscribe((response: any) => {
      this.product = response.data;
      console.log(this.product);
    });
    
    
  }

  min() {
    if (this.quantity !== 0) {
      this.quantity--;
    }
  }
  plus() {
    if (this.quantity !== this.product.countInStock) this.quantity++;
  }
  selectSize(size: string) {
    this.size = size
  }

  body = { "quantity": this.quantity, "product_id": this.productId, "user": this.userId }

  AddToCart() {
    this.cartServices.addToCart(this.token, this.email, this.body).pipe(
      catchError((error) => {
        return (error);
      })
    ).subscribe(
      (response: any) => {
        this.reviews=response
      }
    )


  }

  showReview(id: string){
   this.productServices.getReviewsByID(this.token,this.email,id).pipe(
    catchError((error) => {
      return (error);
    })
  ).subscribe(
    (response: any) => {
      this.reviews=response
      console.log(this.reviews)
    }
    
  )

  }
}
