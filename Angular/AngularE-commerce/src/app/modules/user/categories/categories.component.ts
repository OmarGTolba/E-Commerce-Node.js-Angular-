import { Component, ElementRef, ViewChild } from '@angular/core';
import { ProductsService } from '../../../services/products/products.service';
import { catchError } from 'rxjs';
import { LanguageService } from '../../../services/language/language.service';
import { UserService } from '../../../services/user/user.service';

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

  darkMode: boolean = false;
  constructor(
    private productService: ProductsService,
    private langService: LanguageService,
    private userService: UserService
  ) {
    this.getAllCategories();
    this.langService.getLang().subscribe((lang) => {
      this.lang = lang;
    });
    this.userService.mode.subscribe({
      next: (value) => {
        this.darkMode = value;
      },
    });
  }

  getAllCategories() {
    this.SkeletonLoading = true;
    this.productService
      .getAllCategories()
      .pipe((error) => {
        return error;
      })
      .subscribe((response: any) => {
        this.categories = response.data;
        this.SkeletonLoading = false;
      });
  }
}
