import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from '../../../services/products/products.service';
import { catchError } from 'rxjs';
import { Product } from '../../../Models/products';
@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrl: './all-products.component.css',
})
export class AllProductsComponent {
  name: any;
  price: any;
  quantity: any;
  constructor(
    private http: HttpClient,
    private productService: ProductsService
  ) {
    this.getAllProducts();
  }
  products: Product[] = [];
  updatedId: any;
  sort_name = false;
  sort_price = false;
  token = localStorage.getItem('token') || '';
  email = localStorage.getItem('email') || '';
  getAllProducts(): void {
    this.productService
      .getAllProducts(this.token, this.email)
      .pipe(
        catchError((error) => {
          return error;
        })
      )
      .subscribe((response: any) => {
        this.products = response.data;
        console.log(this.products);
      });
  }
  sortbyName(): void {
    this.products = this.products.sort((a: any, b: any) =>
      a.name_en.localeCompare(b.name_en)
    );
    this.sort_name = true;
    this.sort_price = false;
  }

  sortByPrice(): void {
    this.products = this.products.sort((a: any, b: any) => a.price - b.price);
    this.sort_price = true;
    this.sort_name = false;
  }
  edit(x: any) {
    let updated: any;
    this.updatedId = x;
    const url = `https://ecommerce-node-wqwd.onrender.com/api/v1/products/${x}`;
    this.productService
      .getProductsByID(this.token, this.email, x)
      .pipe(
        catchError((error) => {
          return error;
        })
      )
      .subscribe((response: any) => {
        updated = response.data;
        this.name = updated.name;
        this.price = updated.price;
        this.quantity = updated.countInStock;
      });
    ////////////////////////////////////////////////////////////////////////////////////////
  }

  save() {
    const token = localStorage.getItem('token') || '';
    const email = localStorage.getItem('email') || '';
    const updateUrl = `https://ecommerce-node-wqwd.onrender.com/api/v1/products/${this.updatedId}`;
    const body = {
      name: this.name,
      price: this.price,
      countInStock: this.quantity,
    };
    this.productService
      .updateProduct(this.token, this.email, this.updatedId, body)
      .subscribe(
        (response: any) => {
          this.getAllProducts();
          this.cancel();
        },
        (error) => {
          console.error('Error fetching books:', error);
        }
      );
  }

  delete(x: any) {
    const token = localStorage.getItem('token') || '';
    const email = localStorage.getItem('email') || '';

    const updateUrl = `https://ecommerce-node-wqwd.onrender.com/api/v1/products/${x}`;

    this.productService.deleteProduct(this.token, this.email, x).subscribe(
      (response: any) => {
        this.getAllProducts();
      },
      (error) => {
        console.error('Error fetching books:', error);
      }
    );
  }

  cancel() {
    this.name = this.price = this.quantity = '';
  }
}
