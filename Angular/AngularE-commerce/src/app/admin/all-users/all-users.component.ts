import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrl: './all-users.component.css'
})
export class AllUsersComponent {
  constructor(private http: HttpClient) {
    this.getAllProducts();
  }
  products: any[] = [];
    getAllProducts(): void {
  
      const url = 'http://localhost:3000/api/v1/user';
  
      const token = localStorage.getItem('token') || '';
      const email = localStorage.getItem('email') || '';
  
      this.http.get<any[]>(url, {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          jwt: token,
          email: email,
        }
      }).subscribe(
        (response:any) => {
          this.products = response;
          
       //   console.log(this.products);
          
        },
        (error) => {
          console.error('Error fetching books:', error);
        }
      );
    }
  
}
