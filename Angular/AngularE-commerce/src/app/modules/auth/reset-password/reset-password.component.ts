import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ProfileService } from '../../../services/profile/profile.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css',
})
export class ResetPasswordComponent implements OnInit {
  userData: { password: string } = {
    password: '',
  };
  id: string = '';
  token: string = '';
  showPass = false;
  showConfirmPass = false;
  resetFormGroup = new FormGroup({
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required),
  });
  constructor(
    private profileService: ProfileService,
    private route: ActivatedRoute,
    private router: Router,
    private toast: NgToastService
  ) {}
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    this.token = this.route.snapshot.paramMap.get('token') || '';
  }
  getFormControl(controlName: string) {
    // @ts-ignore
    return this.resetFormGroup.controls[controlName];
  }
  checkMatchPass() {
    if (
      this.resetFormGroup.get('password')!.value ==
      this.resetFormGroup.get('confirmPassword')!.value
    ) {
      return true;
    } else {
      return false;
    }
  }
  toggleConfirmPass() {
    this.showConfirmPass = !this.showConfirmPass;
  }
  togglePass() {
    this.showPass = !this.showPass;
  }
  reset() {
    this.profileService
      .resetPassword(this.id, this.token, this.userData)
      .subscribe((res) => {});
    this.router.navigate(['/']);
    this.toast.success({
      detail: 'Success',
      summary: 'Password reset successfully',
      duration: 5000,
      position: 'topRight',
    });
  }
}
