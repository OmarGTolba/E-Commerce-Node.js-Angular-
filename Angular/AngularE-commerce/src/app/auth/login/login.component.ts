import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-login',
  // standalone:true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private router: Router, private http: HttpClient) {}

  onLoginSubmit(): void {
    const url = 'http://localhost:3000/api/v1/user/login';
  
    

    const headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    });

    const body = { email: this.email, password: this.password };

    this.http.post(url, body, { headers }).pipe(
      catchError((error) => {
        return (error);
      })
    ).subscribe((response: any) => {
        if (response) {
          const role = response.role;

         console.log(response);

          localStorage.setItem('email', response.email);
          localStorage.setItem('token', response.token);
          localStorage.setItem('role', response.role);
          localStorage.setItem('userId', response._id);


          if (role === 'Admin') {
            this.router.navigate(['admin']);
       //     console.log("admin");
            
          } else {
       //     console.log("User");
            this.router.navigate(['user']);
          }

          console.log('Login successful:', response);
        } else {
          console.error('Login failed: No response received');
        }
      });
  }


}
