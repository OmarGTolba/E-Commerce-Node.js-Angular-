import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products/products.service';
import { CartService } from '../../services/cart/cart.service';
import { catchError } from 'rxjs/operators';
import { of, throwError } from 'rxjs';
import { NgToastService } from 'ng-angular-popup';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent {
  productId: string = '';
  product: any;
  lang = localStorage.getItem("lang") || 'en';
  token = localStorage.getItem('token') || '';
  email = localStorage.getItem('email') || '';
  userId = localStorage.getItem('userId') || '';

  reviews: any;
  quantity = 1;
  reviewValue: number = 0; //for ratingreview

  currentRating: number = 1;
  productFav: boolean = false;
  added = false;

  reviewForm: FormGroup;

  skeletonLoading = false;
  ReviewskeletonLoading = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private cartService: CartService,
    private productServices: ProductsService,
    private toast: NgToastService
  ) {
    this.reviewForm = this.fb.group({
      title: ['', Validators.required],
    });
  }

  setRating(rating: number): void {
    this.reviewValue = rating;
  }

  ngOnInit(): void {
    this.skeletonLoading = true;
    this.route.params.subscribe((params) => {
      this.productId = params['productId'];
    });

    this.productServices
      .getProductsByID(this.token, this.email, this.productId)
      .pipe(
        catchError((error) => {
          return error;
        })
      )
      .subscribe((response: any) => {
        this.product = response.data;
        this.skeletonLoading = false;
      });

    this.productServices
      .getRatingByID(this.token, this.email, this.productId)
      .pipe(
        catchError((error) => {
          return error;
        })
      )
      .subscribe((response: any) => {
        this.currentRating = Math.floor(response[0].ratingsAvg);
        console.log(this.currentRating);
      });

    this.isFav();
  }

  toggleFavorite(): void {
    if (this.productFav) {
      this.removeFromFav(this.productId);
    } else {
      this.addToFav(this.productId);
    }
    this.productFav = !this.productFav;
  }

  addToFav(productId: string) {
    this.productServices
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
    this.productServices
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
    this.productServices
      .isFav(this.token, this.email, this.userId, this.productId)
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

  min() {
    if (this.quantity !== 0) {
      this.quantity--;
    }
  }
  plus() {
    if (this.quantity !== this.product.countInStock) this.quantity++;
  }

  AddToCart() {
    const body = {
      quantity: this.quantity,
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

  addReview() {
    const body = {
      title: this.reviewForm.value.title,
      rating: this.reviewValue,
      user: this.userId,
    };
    console.log(body);
    this.productServices
      .addReview(this.token, this.email, this.productId, body)
      .pipe(
        catchError((error) => {
          return of(error);
        })
      )
      .subscribe((response: any) => {
        if (response.status === 400) {
          this.toast.error({
            detail: 'ERROR',
            summary: "Oops can't add your review try agin later!",
            duration: 5000,
            position: 'topRight',
          });
        } else {
          this.toast.success({
            detail: 'SUCCESS',
            summary: 'Review added',
            duration: 5000,
            position: 'topRight',
          });
        }

        this.reviewForm.reset();
        this.reviewValue = 0;

        console.log(response);
      });
  }

  showReview(id: string) {
    this.ReviewskeletonLoading = true;
    this.productServices
      .getReviewsByID(this.token, this.email, id)
      .pipe(
        catchError((error) => {
          return error;
        })
      )
      .subscribe((response: any) => {
        this.reviews = response;
        console.log(this.reviews);
        this.ReviewskeletonLoading = false;
      });
  }
}
