import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrl: './all-orders.component.css'
})
export class AllOrdersComponent {
  constructor(private http: HttpClient) {
    this.getAllOrders();
  }
  orders: any[] = [];
    getAllOrders(): void {
  
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
          this.orders = response;
          
     //     console.log(this.orders);
          
        },
        (error) => {
          console.error('Error fetching books:', error);
        }
      );
    }
  

}
