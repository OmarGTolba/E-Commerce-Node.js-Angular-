import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from '../../../services/profile/profile.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css',
})
export class ForgotPasswordComponent {
  userData: { email: string } = {
    email: '',
  };
  sent = false;
  constructor(private profileService: ProfileService) {}
  passwordFormGroup = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[\w]+@[\w]+.com$/),
    ]),
  });

  getFormControl(controlName: string) {
    // @ts-ignore
    return this.passwordFormGroup.controls[controlName];
  }

  sendEmail() {
    this.profileService.forgotPassword(this.userData).subscribe((data) => {});

    this.sent = true;
  }
}
