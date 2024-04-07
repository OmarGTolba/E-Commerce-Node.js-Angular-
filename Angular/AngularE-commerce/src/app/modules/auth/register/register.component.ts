import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { log } from 'console';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  name: string = '';
  email: string = '';
  password: any;
  registerForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  constructor(
    private router: Router,
    private http: HttpClient,
    private fb: FormBuilder,
    private toast: NgToastService
  ) {
    this.updateProgress();
  }

  onSubmit() {
    const api = 'https://ecommerce-node-wqwd.onrender.com/api/v1/user';

    const body = {
      name: this.name,
      email: this.email,
      password: this.password,
    };

    const headers = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    });

    this.http.post(api, body, { headers }).subscribe(
      (response: any) => {
        if (response) {
          const role = response.role;
          if (role === 'Admin') {
            this.router.navigate(['admin', 'products']);
          } else {
            this.router.navigate(['/login']);
          }
          localStorage.setItem('userId', response._id);

          this.toast.success({
            detail: 'Registration successful!',
            summary: 'Success',
            duration: 5000,
            position: 'topRight',
          });
        } else {
          console.error('Register failed: No response received');
        }
      },
      (error) => {
        console.error('Error occurred:', error.error.message);
        this.toast.error({
          detail: 'Error',
          summary: error.error.message || 'Registeration failed',
          duration: 5000,
          position: 'topRight',
        });
      }
    );
  }

onSubmitValid(){
 console.log(this.registerForm);
 
  if(this.registerForm.status === "VALID"){
return true
  }else{
    return false
  }
  
}



  progressWidth: string = '0%';
  currentActive: number = 1;

  nextOne() {
    this.registerForm.controls.name.value == this.name;

    if (this.registerForm.controls.name.status == 'VALID') {
      const form1 = document.getElementById('form1');
      const form2 = document.getElementById('form2');
      if (form1 && form2) {
        form1.style.left = '-450px';
        form2.style.left = '25px';
        this.incrementNumber();
        this.updateProgress();
      }
    }
  }

  backOne() {
    
    
    const form1 = document.getElementById('form1');
    const form2 = document.getElementById('form2');
    if (form1 && form2) {
      form1.style.left = '25px';
      form2.style.left = '450px';
      this.decrementNumber();
      this.updateProgress();
    }
  }

  nextTwo() {
    this.registerForm.controls.email.value == this.email;

    if (this.registerForm.controls.email.status == 'VALID') {
      const form2 = document.getElementById('form2');
      const form3 = document.getElementById('form3');
      if (form3 && form2) {
        form2.style.left = '-450px';
        form3.style.left = '25px';
        this.incrementNumber();
        this.updateProgress();
      }
    }
  }

  backTwo() {
    const form2 = document.getElementById('form2');
    const form3 = document.getElementById('form3');
    if (form2 && form3) {
      form2.style.left = '25px';
      form3.style.left = '450px';
      this.decrementNumber();
      this.updateProgress();
    }
  }

  updateProgress() {
    const circles = document.querySelectorAll('.circle');
    circles.forEach((circle, index) => {
      if (index < this.currentActive || this.currentActive == 0) {
        circle.classList.add('active'); // Adds 'active' class to all previous and current circles
      } else if (this.currentActive !== 0) {
        circle.classList.remove('active'); // Removes 'active' class from future circles
      }
    });

    const actives = document.querySelectorAll('.active');
    const progressBar = document.querySelector('.progress') as HTMLElement;
    if (progressBar) {
      progressBar.style.width =
        ((actives.length - 1) / (circles.length - 1)) * 100 + '%';
    }
  }

  incrementNumber() {
    this.currentActive++;
    if (this.currentActive > 3) {
      this.currentActive = 3;
    }
  }

  decrementNumber() {
    this.currentActive--;
    if (this.currentActive < 1) {
      this.currentActive = 1;
    }
  }

  isActive(step: number): boolean {
    return true;
  }
}
