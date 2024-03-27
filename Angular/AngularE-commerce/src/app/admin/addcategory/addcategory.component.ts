import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, catchError, of } from 'rxjs';
import { CategoryService } from '../../services/category/category.service';

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

  token = localStorage.getItem('token') || '';
  email = localStorage.getItem('email') || '';
  userId = localStorage.getItem('userId') || '';

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
        console.log(this.editMode);
        this.categoryService
          .getCategoryById(this.token, this.email, this.id!)
          .pipe(
            catchError((error) => {
              return of(error);
            })
          )
          .subscribe((response: any) => {
            this.categoryName_en = response.data.name_en;
            this.categoryName_ar = response.data.name_ar;
            this.categoryImage = response.data.icon;
            console.log(response.data);
          });
      }
    });
  }

  onAdd() {
    this.categoryService
      .addCategories(this.token, this.email, {
        name_en: this.categoryName_en,
        name_ar: this.categoryName_ar,
        icon: this.categoryImage,
      })
      .pipe(
        catchError((error) => {
          return of(error);
        })
      )
      .subscribe((response: any) => {
        console.log(response);
      });
  }

  onEdit() {
    this.categoryService
      .updateCategory(this.token, this.email, this.id!, {
        name_en: this.categoryName_en,
        name_ar: this.categoryName_ar,
        icon: this.categoryImage,
      })
      .pipe(
        catchError((error) => {
          return of(error);
        })
      )
      .subscribe((response: any) => {
        console.log(response);
        console.log(
          this.categoryName_ar,
          this.categoryName_en,
          this.categoryImage
        );
      });
  }
}
