import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../../services/profile/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  id = localStorage.getItem('userId') || '';
  username = '';

  constructor(private profileService: ProfileService){
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
