import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { trigger, transition, style, animate } from '@angular/animations';
import { NgToastService } from 'ng-angular-popup';
import { ProductsService } from '../../../services/products/products.service';
import { CartService } from '../../../services/cart/cart.service';
import { LanguageService } from '../../../services/language/language.service';
import { UserService } from '../../../services/user/user.service';

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
    private toast: NgToastService,
    private langService: LanguageService,
    private userService: UserService
  ) {
    this.langService.getLang().subscribe((lang) => {
      this.lang = lang;
    });
  }
  @Input() product: any;

  productFav: boolean = false;

  token = localStorage.getItem('token') || '';
  email = localStorage.getItem('email') || '';
  userId = localStorage.getItem('userId') || '';
  added = false;
  lang = localStorage.getItem('lang') || 'en';

  ngOnInit() {
    this.isFav();
  }

  getProduct(productId: string) {
    this.productService
      .getProductsByID(productId)
      .pipe(
        catchError((error) => {
          return error;
        })
      )
      .subscribe((response: any) => {
        this.router.navigate(['user/product/', productId]);
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
      .AddToFav(this.userId, productId)
      .pipe(
        catchError((error) => {
          return error;
        })
      )
      .subscribe((response: any) => {});
  }

  removeFromFav(productId: string) {
    this.productService
      .removeFromFav(this.userId, productId)
      .pipe(
        catchError((error) => {
          return error;
        })
      )
      .subscribe((response: any) => {});
  }

  isFav() {
    this.productService
      .isFav(this.userId, this.product._id)
      .pipe(
        catchError((error) => {
          return error;
        })
      )
      .subscribe((response: any) => {
        if (response?.isFavorite == false) {
          this.productFav = false;
        } else {
          this.productFav = true;
        }
      });
  }

  AddToCart() {
    const body = {
      quantity: 1,
      product_id: this.product._id,
      user: this.userId,
    };

    this.cartService
      .addToCart(this.userId, body)
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
          this.userService.getCartCount(this.userId);
        } else if (response.status === 401) {
          this.toast.error({
            detail: 'ERROR',
            summary: 'Please login first',
            duration: 5000,
            position: 'topRight',
          });
        } else {
          this.toast.error({
            detail: 'ERROR',
            summary: 'Oops the product out of the stock!',
            duration: 5000,
            position: 'topRight',
          });
        }
      });
  }
}
