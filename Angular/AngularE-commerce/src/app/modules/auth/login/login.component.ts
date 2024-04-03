import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { FormBuilder, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  constructor(
    private router: Router,
    private http: HttpClient,
    private fb: FormBuilder,
    private toast: NgToastService
  ) {}

  onLoginSubmit(): void {
    const url = 'https://ecommerce-nodejs-slwh.onrender.com/api/v1/user/login';

    const headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    });

    const body = { email: this.email, password: this.password };

    this.http
      .post(url, body, { headers })
      .pipe(
        catchError((error) => {
          this.toast.error({
            detail: 'wrong email or password!',
            summary: 'Error',
            duration: 5000,
            position: 'topRight',
          });
          throw error;
        })
      )
      .subscribe((response: any) => {
        if (response) {
          const role = response.role;

          localStorage.setItem('email', response.email);
          localStorage.setItem('token', response.token);
          localStorage.setItem('role', response.role);
          localStorage.setItem('userId', response._id);

          if (role === 'Admin') {
            this.router.navigate(['admin']);
          } else {
            this.router.navigate(['user']);
          }
          this.toast.success({
            detail: 'Success',
            summary: 'You logged in successfully',
            duration: 5000,
            position: 'topRight',
          });
        } else {
          console.error('Login failed: No response received');
        }
      });
  }
}
