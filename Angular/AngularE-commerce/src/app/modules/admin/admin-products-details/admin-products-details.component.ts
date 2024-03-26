import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../../services/products/products.service';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-admin-products-details',
  templateUrl: './admin-products-details.component.html',
  styleUrl: './admin-products-details.component.css',
  styleUrl: './admin-products-details.component.css',
})
export class AdminProductsDetailsComponent {
  token = localStorage.getItem('token') || '';
  email = localStorage.getItem('email') || '';
  userId = localStorage.getItem('userId') || '';
  imgSrc: any;

  id: any;
  product: any;
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private productServices: ProductsService
  ) {
    this.route.paramMap.subscribe((params) => {
      if (params.get('id')) {
        const id = params.get('id');
        this.id = params.get('id');
        this.productServices
          .getProductsByID(this.token, this.email, id!)
          .pipe(
            catchError((error) => {
              return error;
            })
          )
          .subscribe((response: any) => {
            this.product = response.data;
            this.imgSrc = this.product.images[0];
          });
      }
    });
    this.updateProduct();
  }
  imgClick(imgsrc: string) {
    this.imgSrc = imgsrc;
  }
  updateProduct() {
    const url = `http://localhost:3000/api/v1/products/${this.id}`;
    const token = localStorage.getItem('token') || '';
    const email = localStorage.getItem('email') || '';

    this.http
      .get<any[]>(url, {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          jwt: token,
          email: email,
        },
      })
      .subscribe(
        (response: any) => {
          console.log(response);

          this.product = response.data;
        },
        (error) => {
          console.error('Error fetching books:', error);
        }
      );
  }
}

