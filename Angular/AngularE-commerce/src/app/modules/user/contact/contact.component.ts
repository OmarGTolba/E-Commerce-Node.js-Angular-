import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { NgToastService } from 'ng-angular-popup';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/user/user.service';
import { LanguageService } from '../../../services/language/language.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['../../../app.component.css'],
})
export class ContactComponent {
  darkMode: boolean = false;

  data = {
    email: '',
    message: '',
    firstname: '',
    lastname: '',
  };
  lang = localStorage.getItem('lang') || 'en';

  constructor(
    private userService: UserService,
    private toast: NgToastService,
    private langService: LanguageService
  ) {
    this.langService.getLang().subscribe((lang) => {
      this.lang = lang;
    });

    this.userService.mode.subscribe({
      next: (value) => {
        this.darkMode = value;
      },
    });
  }
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
      next: (res) => {
console.log(res);

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
        this.contactFormGroup.markAsUntouched();
      },
    });
  }

  getFormControl(controlName: string) {
    // @ts-ignore
    return this.contactFormGroup.controls[controlName];
  }
}
