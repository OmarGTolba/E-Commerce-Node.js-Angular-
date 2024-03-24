import { Component } from '@angular/core';
import { ProductsService } from '../../services/products/products.service';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: '../../app.component.css',
})
export class CategoriesComponent {
  categories: any[] = [];

  lang = localStorage.getItem('lang') || 'en';
  token = localStorage.getItem('token') || '';
  email = localStorage.getItem('email') || '';

  SkeletonLoading = false;

  constructor(private productService: ProductsService) {
    this.getAllCategories();
  }

  getAllCategories() {
    this.SkeletonLoading = true;
    this.productService
      .getAllCategories(this.token, this.email)
      .pipe((error) => {
        return error;
      })
      .subscribe((response: any) => {
        this.categories = response.data;
        //    this.sortbyName()
        console.log(this.categories);
        this.SkeletonLoading = false;
      });
  }

  

}
