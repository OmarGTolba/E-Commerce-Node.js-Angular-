import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../../services/products/products.service';
import { CartService } from '../../../services/cart/cart.service';
import { catchError } from 'rxjs/operators';
import { of, throwError } from 'rxjs';
import { NgToastService } from 'ng-angular-popup';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { log } from 'node:console';
import { LanguageService } from '../../../services/language/language.service';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css','../../../app.component.css']
})
export class ProductComponent {
  productId: string = '';
  product: any;
  review: any;
  lang = localStorage.getItem('lang') || 'en';
  token = localStorage.getItem('token') || '';
  email = localStorage.getItem('email') || '';
  userId = localStorage.getItem('userId') || '';
  imgSrc: any;
  reviews: any;
  quantity = 1;
  reviewValue: number = 0; //for ratingreview

  currentRating: number = 1;
  productFav: boolean = false;
  added = false;

  reviewForm: FormGroup;

  skeletonLoading = false;
  ReviewskeletonLoading = false;
  darkMode:boolean = false
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private cartService: CartService,
    private productServices: ProductsService,
    private toast: NgToastService,
    private langService: LanguageService,
    private userService:UserService
  ) {
    this.userService.mode.subscribe({
      next: (value) => {
        this.darkMode = value;
      },
    });

    this.reviewForm = this.fb.group({
      title: ['', Validators.required],
    });
    this.langService.getLang().subscribe((lang) => {
      this.lang = lang;
    });
  }

  setRating(rating: number): void {
    this.reviewValue = rating;
  }

  imgClick(imgsrc: string) {
    this.imgSrc = imgsrc;
  }

  ngOnInit(): void {
    this.skeletonLoading = true;
    this.route.params.subscribe((params) => {
      this.productId = params['productId'];
    });

    this.productServices
      .getProductsByID(this.productId)
      .pipe(
        catchError((error) => {
          return error;
        })
      )
      .subscribe((response: any) => {
        this.product = response.data;
        this.skeletonLoading = false;
        this.imgSrc = this.product.images[0];
      });

    this.productServices
      .getRatingByID(this.productId)
      .pipe(
        catchError((error) => {
          return error;
        })
      )
      .subscribe((response: any) => {
        this.currentRating = Math.floor(response[0].ratingsAvg);
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
      .AddToFav(this.userId, productId)
      .pipe(
        catchError((error) => {
          return error;
        })
      )
      .subscribe((response: any) => {});
  }

  removeFromFav(productId: string) {
    this.productServices
      .removeFromFav(this.userId, productId)
      .pipe(
        catchError((error) => {
          return error;
        })
      )
      .subscribe((response: any) => {});
  }

  isFav() {
    this.productServices
      .isFav(this.userId, this.productId)
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

  addReview() {
    const body = {
      title: this.reviewForm.value.title,
      rating: this.reviewValue,
      user: this.userId,
    };

    this.productServices
      .addReview(this.productId, body)
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
      });
  }

  updateReview(id: any) {
    const body = {
      title: this.review,
      rating: this.reviewValue,
    };
    this.productServices.updateReview(id, body).subscribe((response: any) => {
      this.showReview(this.product_id);

      this.editmode = false;
    });
  }

  deleteReview(id: any) {
    this.productServices.deleteReview(id).subscribe((response: any) => {
      this.editmode = false;
    });
    this.showReview(this.product_id);
  }

  product_id: any;
  editmode: boolean = false;

  toggleEditMode() {
    this.editmode = !this.editmode;
  }
  edit(item: any) {
    this.reviewValue = item.rating;
    this.review = item.title;
    this.toggleEditMode();
  }
  showReview(id: string) {
    this.product_id = id;
    this.ReviewskeletonLoading = true;
    this.productServices
      .getReviewsByID(id)
      .pipe(
        catchError((error) => {
          return error;
        })
      )
      .subscribe((response: any) => {
        this.reviews = response;
        this.ReviewskeletonLoading = false;
      });
  }
}
