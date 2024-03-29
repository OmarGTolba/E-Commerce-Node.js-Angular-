import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { NgToastService } from 'ng-angular-popup';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../user.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['../../../app.component.css'],
})
export class ContactComponent {
  data = {
    email: '',
    message: '',
    firstname: '',
    lastname: '',
  };

  constructor(
    private userService: UserService,
    private toast: NgToastService
  ) {}
  contactFormGroup = new FormGroup({
    firstname: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    lastname: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[\w]+@[\w]+.com$/),
    ]),
    message: new FormControl('', Validators.required),
  });
  contactUs() {
    this.userService.contact(this.data).subscribe({
      next: () => {
        this.toast.success({
          detail: 'SUCCESS',
          summary: 'Email sent successfully',
          duration: 5000,
          position: 'topRight',
        });
        this.data = {
          email: '',
          message: '',
          firstname: '',
          lastname: '',
        };
        this.contactFormGroup.markAsPristine();
        this.contactFormGroup.markAsUntouched();      },
    });
  }

  getFormControl(controlName: string) {
    // @ts-ignore
    return this.contactFormGroup.controls[controlName];
  }
}
