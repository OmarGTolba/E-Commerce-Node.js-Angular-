import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  name: string = "";
  email: string = "";
  password: any

  constructor(private router: Router, private http: HttpClient) { }

  onSubmit() {
    const api = 'http://localhost:3000/api/v1/user';

    const body = {
      name: this.name,
      email: this.email,
      password: this.password,
      role: "User"
    }

    const headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    });

    this.http.post(api, body,{ headers })
      .subscribe((response: any) => {
        if (response) {
          const role = response.role;
          if (role === 'Admin') {
            this.router.navigate(['admin']);
          } else {
            this.router.navigate(['user']);
          }
          localStorage.setItem('userId', response._id);
          console.log('register successful:', response);
        } else {
          console.error('register failed: No response received');
        }
      });

  }
}
