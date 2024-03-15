import { Component, Input } from '@angular/core';
import { ProductsService } from '../../services/products/products.service';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { trigger, transition, style, animate } from '@angular/animations';
import { CartService } from '../../services/cart/cart.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
  animations: [
    trigger('cardAnimation', [
      transition('void => *', [
        style({ opacity: 0, transform: 'translateY(-50px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'none' })),
      ]),
    ]),
  ],
})
export class ProductCardComponent {
  constructor(
    private productService: ProductsService,
    private cartService: CartService,
    private router: Router,
    private toast: NgToastService
  ) {}
  @Input() product: any;

  productFav: boolean = false;

  token = localStorage.getItem('token') || '';
  email = localStorage.getItem('email') || '';
  userId = localStorage.getItem('userId') || '';
  added = false;

  ngOnInit() {
    this.isFav();
  }

  getProduct(productId: string) {
    this.productService
      .getProductsByID(this.token, this.email, productId)
      .pipe(
        catchError((error) => {
          return error;
        })
      )
      .subscribe((response: any) => {
        this.router.navigate(['user/product', productId]);
      });
  }

  toggleFavorite(): void {
    if (this.productFav) {
      this.removeFromFav(this.product._id);
    } else {
      this.addToFav(this.product._id);
    }
    this.productFav = !this.productFav;
  }

  addToFav(productId: string) {
    this.productService
      .AddToFav(this.token, this.email, this.userId, productId)
      .pipe(
        catchError((error) => {
          return error;
        })
      )
      .subscribe((response: any) => {
        console.log(response);
      });
  }

  removeFromFav(productId: string) {
    this.productService
      .removeFromFav(this.token, this.email, this.userId, productId)
      .pipe(
        catchError((error) => {
          return error;
        })
      )
      .subscribe((response: any) => {
        console.log(response);
      });
  }

  isFav() {
    this.productService
      .isFav(this.token, this.email, this.userId, this.product._id)
      .pipe(
        catchError((error) => {
          return error;
        })
      )
      .subscribe((response: any) => {
        if (response.isFavorite == false) {
          this.productFav = false;
        } else {
          this.productFav = true;
        }
        console.log(response);
      });
  }

  AddToCart() {
    const body = {
      quantity: 1,
      product_id: this.product._id,
      user: this.userId,
    };

    this.cartService
      .addToCart(this.token, this.email, this.userId, body)
      .pipe(
        catchError((error) => {
          return of(error);
        })
      )
      .subscribe((response: any) => {
        if (response.status === 201) {
          this.toast.success({
            detail: 'SUCCESS',
            summary: 'Product added to cart',
            duration: 5000,
            position: 'topRight',
          });

          this.added = true;
          setTimeout(() => {
            this.added = false;
          }, 5000);
        } else {
          this.toast.error({
            detail: 'ERROR',
            summary: 'Oops the product out of the stock!',
            duration: 5000,
            position: 'topRight',
          });
        }
        console.log(response);
      });
  }
}
