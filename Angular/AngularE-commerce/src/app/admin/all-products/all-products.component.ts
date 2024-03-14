import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from '../../services/products/products.service';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrl: './all-products.component.css'
})
export class AllProductsComponent {
  name: any;
  description: any;
  quantity: any;
  constructor(private http: HttpClient, private productService: ProductsService) {
    this.getAllProducts();

  }
  products: any[] = [];
  updatedId: any;

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

  edit(x: any) {
    let updated: any;
    this.updatedId = x
    const url = `http://localhost:3000/api/v1/products/${x}`;
    this.productService.getProductsByID(this.token, this.email, x).pipe(
      catchError((error) => {
        return (error);
      })
    ).subscribe(
        (response: any) => {
          updated = response.data;
          this.name = updated.name;
          this.description = updated.description
          this.quantity = updated.countInStock

        }
      );
    ////////////////////////////////////////////////////////////////////////////////////////
  }




  save() {
    const token = localStorage.getItem('token') || '';
    const email = localStorage.getItem('email') || '';

    const updateUrl = `http://localhost:3000/api/v1/products/${this.updatedId}`;
    const body = { name: this.name, description: this.description, countInStock: this.quantity }
    this.productService.updateProduct(this.token,this.email,  this.updatedId, body).subscribe(
      (response: any) => {

        this.getAllProducts()
        this.cancel()
      },
      (error) => {
        console.error('Error fetching books:', error);
      }
    );
  }




  delete(x: any) {
    const token = localStorage.getItem('token') || '';
    const email = localStorage.getItem('email') || '';

    const updateUrl = `http://localhost:3000/api/v1/products/${x}`;

    this.productService.deleteProduct(this.token, this.email, x)
      .subscribe(
        (response: any) => {

          this.getAllProducts()
        },
        (error) => {
          console.error('Error fetching books:', error);
        }
      );
  }

  cancel() {
    this.name = this.description = this.quantity = ''
  }

}
