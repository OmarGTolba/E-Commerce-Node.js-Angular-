import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { catchError, of } from 'rxjs';
import { Category } from '../../../Models/categoriesInterface';
import { Router } from '@angular/router';
import { CategoryService } from '../../../services/category/category.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-all-categories',
  templateUrl: './all-categories.component.html',
  styleUrl: './all-categories.component.css',
})
export class AllCategoriesComponent {
  categories: Category[] = [];
  constructor(
    private http: HttpClient,
    private router: Router,
    private categoryService: CategoryService,
    private toast: NgToastService
  ) {
    this.getAllCategories();
  }
  getAllCategories(): void {
    this.categoryService
      .getAllCategories()
      .pipe(
        catchError((error) => {
          return of(error);
        })
      )
      .subscribe((response: any) => {
        this.categories = response.data;
      });
  }
  edit(id: string) {
    this.router.navigate([`admin/updateCategory/${id}`]);
  }
  delete(id: string) {
    this.categoryService
      .deleteCategory(id)
      .pipe(
        catchError((error) => {
          return error;
        })
      )
      .subscribe((response: any) => {
        this.toast.success({
          detail: 'SUCCESS',
          summary: 'category deleted',
          duration: 5000,
          position: 'topRight',
        });
        this.getAllCategories();
      });
  }
}
