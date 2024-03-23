import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  name: string = "";
  email: string = "";
  password: any;
  registerForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  constructor(private router: Router, private http: HttpClient, private fb: FormBuilder, private toast: NgToastService) { }

  onSubmit() {
    const api = 'http://localhost:3000/api/v1/user';

    const body = {
      name: this.name,
      email: this.email,
      password: this.password,
      // role: "User"
    };

    const headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    });

    this.http.post(api, body, { headers })
      .subscribe((response: any) => {
        if (response) {
          const role = response.role;
          if (role === 'Admin') {
            this.router.navigate(['admin']);
          } else {
            this.router.navigate(['user']);
          }
          localStorage.setItem('userId', response._id);
          console.log('Register successful:', response);

          // Display toast for successful registration
          this.toast.success({
            detail: 'Registration successful!',
            summary: 'Success',
            duration: 5000,
            position: 'topRight'
          });
        } else {
          console.error('Register failed: No response received');
        }
      }, (error) => {
        console.error('Error occurred:', error);
        this.toast.error({
          detail: 'An error occurred while registering.',
          summary: 'Error',
          duration: 5000,
          position: 'topRight',
        });
      });
  }
}