import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-all-categories',
  templateUrl: './all-categories.component.html',
  styleUrl: './all-categories.component.css'
})
export class AllCategoriesComponent {


  constructor(private http: HttpClient) {
    this.getAllCategories()
  }
  categories: any[] = [];
  getAllCategories(): void {

    const url = 'http://localhost:3000/api/v1/categories';

    const token = localStorage.getItem('token') || '';
    const email = localStorage.getItem('email') || '';

    this.http.get<any[]>(url, {
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        jwt: token,
        email: email,
      }
    }).pipe(
      catchError((error) => {
        return (error);
      })
    ).subscribe(
      (response: any) => {
        this.categories = response.data;
      }
    );
  }
}
