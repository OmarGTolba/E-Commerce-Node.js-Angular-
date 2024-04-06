import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../../services/profile/profile.service';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css', '../../../app.component.css']
})
export class ProfileComponent implements OnInit{
  id = localStorage.getItem('userId') || '';
  username = '';
  darkMode:any;
  constructor(private profileService: ProfileService, private userService:UserService){
    this.userService.mode.subscribe({
      next: (value) => {
        this.darkMode = value;
      },
    });
  }
  ngOnInit(): void {
    this.profileService.getUserInfo(this.id).subscribe({
      next: (res) => {
        this.username = res.name;
      },
      error: () => {
        this.username = '';
      },
    });
  }
}
