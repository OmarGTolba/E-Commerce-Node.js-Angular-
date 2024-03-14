import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ProductsService } from '../../services/products/products.service';
import { UserService } from '../../user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError } from 'rxjs';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    private productService: ProductsService,
    private userService: UserService,
    private router: Router,
    private toast: NgToastService,
    private route: ActivatedRoute
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
    this.productService
      .getAllProducts(this.token, this.email)
      .pipe(
        catchError((error) => {
          return error;
        })
      )
      .subscribe((response: any) => {
        this.products = response.data;
        //    this.sortbyName()
        this.displayedProducts = this.products.slice(
          0,
          this.paginator.pageSize
        );
        this.loading = false; // Set loading to false when data is loaded
      });
  }

  sortbyName(): void {
    this.products = this.products.sort((a: any, b: any) =>
      a.name.localeCompare(b.name)
    );
    this.displayedProducts = this.products.slice(0, this.paginator.pageSize);
    this.loading = false; // Set loading to false when data is loaded
  }

  sortbyPrice(): void {
    this.products = this.products.sort((a: any, b: any) =>
      a.Price.localeCompare(b.name)
    );
    this.displayedProducts = this.products.slice(0, this.paginator.pageSize);
    this.loading = false; // Set loading to false when data is loaded
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

  onPageChange(event: any): void {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.displayedProducts = this.products.slice(startIndex, endIndex);
  }

  ngOnInit(): void {
    if (this.route.snapshot.queryParamMap.get('success')) {
      this.toast.success({
        detail: 'SUCCESS',
        summary: 'Your payment process succeeded',
        duration: 5000,
        position: 'topRight',
      });
    } else if (this.route.snapshot.queryParamMap.get('canceled')) {
      this.toast.error({
        detail: 'ERROR',
        summary: 'Your payment process failed',
        duration: 5000,
        position: 'topRight',
      });
    }
  }
}