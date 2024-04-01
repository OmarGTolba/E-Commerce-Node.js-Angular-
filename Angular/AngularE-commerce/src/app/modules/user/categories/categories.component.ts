import { Component, ElementRef, ViewChild } from '@angular/core';
import { ProductsService } from '../../../services/products/products.service';
import { catchError } from 'rxjs';
import { UserService } from '../../../user.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: '../../../app.component.css',
})
export class CategoriesComponent {
  categories: any[] = [];

  lang = localStorage.getItem('lang') || 'en';
  token = localStorage.getItem('token') || '';
  email = localStorage.getItem('email') || '';

  SkeletonLoading = false;
darkMode:boolean  = false
  constructor(private productService: ProductsService , private userService:UserService) {
    this.getAllCategories();
    this.userService.mode.subscribe({
      next: (value) => {
        this.darkMode = value;
      },
    });
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
