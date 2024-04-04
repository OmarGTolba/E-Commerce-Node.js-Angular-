import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError } from 'rxjs';
import { ProductsService } from '../../../services/products/products.service';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css', '../../../app.component.css'],
})
export class ProductPageComponent {
  name: string | null = '';
  catname: string | null = '';

  products: any[] = [];
  displayedProducts: any;
  token = localStorage.getItem('token') || '';
  email = localStorage.getItem('email') || '';
  skeletonLoading = false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private productService: ProductsService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {
    this.userService.mode.subscribe({
      next: (value) => {
        this.darkMode = value;
      },
    });
  }

  darkMode: boolean = false;
  ngOnInit() {
    this.skeletonLoading = true;
    this.route.paramMap.subscribe((params) => {
      this.name = params.get('name');
      this.catname = params.get('catname');
      if (this.name) {
        this.search();
      } else if (this.catname) {
        this.searchByCategory();
      } else {
        this.getAllProducts();
      }
    });
  }

  getAllProducts(): void {
    this.productService
      .getAllProducts()
      .pipe(
        catchError((error) => {
          return error;
        })
      )
      .subscribe((response: any) => {
        this.products = response.data;

        this.displayedProducts = this.products.slice(
          0,
          this.paginator.pageSize
        );

        this.skeletonLoading = false;
      });
  }

  search() {
    this.productService
      .searchByName(this.name!)
      .pipe(
        catchError((error) => {
          return error;
        })
      )
      .subscribe((response: any) => {
        console.log(response);
        
        this.products = response.data;
        this.displayedProducts = this.products.slice(0, this.paginator.pageSize);;
        this.skeletonLoading = false;
        this.skeletonLoading = false;
      });
  }
  searchByCategory() {
    this.productService
      .searchByCategory(this.catname!)
      .pipe(
        catchError((error) => {
          return error;
        })
      )
      .subscribe((response: any) => {
        console.log(response);
        
        this.products = response.data[0];
        this.displayedProducts = this.products.slice(0, this.paginator.pageSize);;
        this.skeletonLoading = false;
        this.skeletonLoading = false;
      });
  }

  sortbyName(): void {
    this.products = this.products.sort((a: any, b: any) =>
      a.name_en.localeCompare(b.name_en)
    );
    this.displayedProducts = this.products.slice(0, this.paginator.pageSize);
  }

  sortByPrice(): void {
    this.products = this.products.sort((a: any, b: any) => a.price - b.price);
    this.displayedProducts = this.products.slice(0, this.paginator.pageSize);
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
        this.router.navigate(['user/product', productId]);
      });
  }

  onPageChange(event: any): void {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.displayedProducts = this.products.slice(startIndex, endIndex);
  }
}
