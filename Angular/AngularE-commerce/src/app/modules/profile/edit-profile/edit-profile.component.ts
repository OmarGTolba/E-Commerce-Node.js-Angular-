import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IUser } from '../../../Models/userInterface';
import { ProfileService } from '../../../services/profile/profile.service';
import { LanguageService } from '../../../services/language/language.service';
import { NgToastService } from 'ng-angular-popup';
import { catchError, of } from 'rxjs';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css',
})
export class EditProfileComponent implements OnInit {
  isDisabled: boolean = true;
  userData: IUser = {
    name: '',
    email: '',
    phone: '',
    address: '',
  };
  darkMode:any;
  lang = localStorage.getItem('lang') || 'en';
  constructor(
    private profileService: ProfileService,
    private toast: NgToastService,
    private langService: LanguageService,private userService:UserService
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
  editFormGroup = new FormGroup({
    name: new FormControl({ value: '', disabled: this.isDisabled }, [
      Validators.required,
      Validators.minLength(3),
    ]),
    email: new FormControl({ value: '', disabled: this.isDisabled }, [
      Validators.required,
      Validators.pattern(/^[\w]+@[\w]+.com$/),
    ]),
    phone: new FormControl(
      { value: '', disabled: this.isDisabled },
      Validators.pattern(/^01[0-2]\d{8}$/)
    ),
    address: new FormControl({ value: '', disabled: this.isDisabled }),
  });

  getFormControl(controlName: string) {
    // @ts-ignore
    return this.editFormGroup.controls[controlName];
  }

  ngOnInit(): void {
    let userId = localStorage.getItem('userId') || '';
    this.profileService.getUserInfo(userId).subscribe((res) => {
      this.userData = {
        name: res.name,
        email: res.email,
        phone: res.phone,
        address: res.address,
      };
    });
  }

  update() {
    this.profileService
      .updateProfile(this.userData)
      .pipe(
        catchError((error) => {
          return of(error);
        })
      )
      .subscribe((response: any) => {
        this.toast.success({
          detail: 'SUCCESS',
          summary: 'Data updated',
          duration: 5000,
          position: 'topRight',
        });
      });
      
    // {next:(res)=>{
  }

  toggleInput(formControlNmae: string) {
    if (this.isDisabled) {
      this.editFormGroup.get(formControlNmae)!.enable();
    } else {
      this.editFormGroup.get(formControlNmae)!.disable();
    }
  }
}
