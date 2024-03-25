import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-addcategory',
  templateUrl: './addcategory.component.html',
  styleUrl: './addcategory.component.css',
})
export class AddcategoryComponent {
  categoryName_en: string = '';
  categoryName_ar: string = '';
  categoryImage: string = '';

  constructor(private http: HttpClient) {}

  onSubmit() {
    const url = 'https://node-project-5tke.onrender.com/api/v1/categories';
    const token = localStorage.getItem('token') || '';
    const email = localStorage.getItem('email') || '';

    this.http
      .post<any[]>(
        url,
        {
          name_en: this.categoryName_en,
          name_ar: this.categoryName_ar,
          icon: this.categoryImage,
        },
        {
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
            jwt: token,
            email: email,
          },
        }
      )
      .pipe(
        catchError((error) => {
          return of(error);
        })
      )
      .subscribe((response: any) => {
        console.log(response);
      });
  }
}
