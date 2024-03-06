import { Component, Input, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ProductsService } from '../../services/products/products.service';
import { UserService } from '../../user.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css'
})
export class ProductPageComponent {
  constructor(
    private productService: ProductsService,
    private userService: UserService,
    private router: Router
  ) {
    this.getAllProducts();
  }

  products: any[] = [];
  displayedProducts: any;
  token = localStorage.getItem('token') || '';
  email = localStorage.getItem('email') || '';
  loading = true; // Initialize loading to true

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  getAllProducts(): void {
    this.productService.getAllProducts(this.token, this.email).pipe(
      catchError((error) => {
        return (error);
      })
    ).subscribe(
      (response: any) => {
        this.products= response.data
  //    this.sortbyName()
        this.displayedProducts = this.products.slice(0, this.paginator.pageSize);
        this.loading = false; // Set loading to false when data is loaded
      }
    );
  }
  

  sortbyName():void{
    
    this.products = this.products.sort((a: any, b: any) => a.name.localeCompare(b.name));
    this.displayedProducts = this.products.slice(0, this.paginator.pageSize);
    this.loading = false; // Set loading to false when data is loaded
  }

  sortbyPrice():void{
    
    this.products = this.products.sort((a: any, b: any) => a.Price.localeCompare(b.name));
    this.displayedProducts = this.products.slice(0, this.paginator.pageSize);
    this.loading = false; // Set loading to false when data is loaded
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
    );
  }

  onPageChange(event: any): void {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.displayedProducts = this.products.slice(startIndex, endIndex);
  }



}
