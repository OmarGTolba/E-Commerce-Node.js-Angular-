import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ProductsService } from '../../services/products/products.service';
import { UserService } from '../../user.service';
import { Router } from '@angular/router';
import { MatSort, Sort } from '@angular/material/sort';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
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
    this.productService.getAllProducts(this.token, this.email).subscribe(
      (response: any) => {
        this.products= response.data
  //    this.sortbyName()
        this.displayedProducts = this.products.slice(0, this.paginator.pageSize);
        this.loading = false; // Set loading to false when data is loaded
      },
      (error) => {
        console.error('Error fetching products:', error);
        this.loading = false; // Handle loading state in case of an error
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
    this.productService.getProductsByID(this.token, this.email, productId).subscribe(
      (response: any) => {
        this.router.navigate(['user/product', productId]);
      },
      (error) => {
        console.error('Error fetching order:', error);
      }
    );
  }

  onPageChange(event: any): void {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.displayedProducts = this.products.slice(startIndex, endIndex);
  }






  
}
