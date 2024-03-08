import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IUser } from '../../Models/userInterface';
import { ProfileService } from '../../services/profile/profile.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent implements OnInit{
  isDisabled:boolean = true
  userData: IUser ={
    name: "",
    email: '',
    phone: '',
    address: ''
  }
  constructor(private profileService : ProfileService){

  }
  editFormGroup = new FormGroup({
    name: new FormControl({ value: '', disabled: this.isDisabled },[Validators.required, Validators.minLength(3)]),
    email: new FormControl({ value: '', disabled: this.isDisabled }, [Validators.required, Validators.pattern(/^[\w]+@[\w]+.com$/)]),
    phone: new FormControl({ value: '', disabled: this.isDisabled }, Validators.pattern(/^01[0-2]\d{8}$/)),
    address: new FormControl({ value: '', disabled: this.isDisabled }),
  })
  
  getFormControl(controlName:string){
    // @ts-ignore    
    return this.editFormGroup.controls[controlName]
  }

  ngOnInit(): void {
    let userId = localStorage.getItem("userId") || ""
    this.profileService.getUserInfo(userId).subscribe((res)=>{
      this.userData = {name: res.name, email:res.email, phone: res.phone, address: res.address}      
    })
  }

  update(){
    this.profileService.updateProfile(this.userData).subscribe({next:(res)=>{
      console.log(res)
    },error: (err)=>{console.log("err",err)}})
  }

  toggleInput(formControlNmae:string) {
    if (this.isDisabled) {
      this.editFormGroup.get(formControlNmae)!.enable();
    } else {
      this.editFormGroup.get(formControlNmae)!.disable();
    }
  }
}
