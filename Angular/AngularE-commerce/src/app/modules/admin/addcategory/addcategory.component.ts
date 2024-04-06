import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, catchError, of } from 'rxjs';
import { CategoryService } from '../../../services/category/category.service';

@Component({
  selector: 'app-addcategory',
  templateUrl: './addcategory.component.html',
  styleUrl: './addcategory.component.css',
})
export class AddcategoryComponent implements OnInit {
  categoryName_en: string = '';
  categoryName_ar: string = '';
  categoryImage: string = '';
  id: string | null = '';
  editMode: boolean = false;
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      if (params.get('id')) {
        this.id = params.get('id');
        this.editMode = true;
        this.categoryService
          .getCategoryById(this.id!)
          .pipe(
            catchError((error) => {
              return of(error);
            })
          )
          .subscribe((response: any) => {
            this.categoryName_en = response.data.name_en;
            this.categoryName_ar = response.data.name_ar;
            this.categoryImage = response.data.icon;
          });
      }
    });
  }

  onAdd() {
    this.categoryService
      .addCategories({
        name_en: this.categoryName_en,
        name_ar: this.categoryName_ar,
        icon: this.categoryImage,
      })
      .pipe(
        catchError((error) => {
          return of(error);
        })
      )
      .subscribe((response: any) => {});
  }

  onEdit() {
    this.categoryService
      .updateCategory(this.id!, {
        name_en: this.categoryName_en,
        name_ar: this.categoryName_ar,
        icon: this.categoryImage,
      })
      .pipe(
        catchError((error) => {
          return of(error);
        })
      )
      .subscribe((response: any) => {});
  }
}
