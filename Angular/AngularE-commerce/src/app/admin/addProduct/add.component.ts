import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {
  productForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.productForm = this.fb.group({
      productName: ['', Validators.required],
      category: ['', Validators.required]
    });
  }

  addProduct(): void {
    const url = 'http://localhost:3000/api/v1/products';
    const { productName, category } = this.productForm.value;
    const token = localStorage.getItem('token') || '';
    const email = localStorage.getItem('email') || '';
   // console.log(category);

//  console.log(category);
 
  
      this.http.post<any[]>(url,{ name: productName, categories: category }, {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          jwt: token,
          email: email,
        }
      }).subscribe(
        (response:any) => {
          
       //   console.log(response);
          
        },
        (error) => {
          console.error('Error fetching books:', error);
        }
      );
    }
}
