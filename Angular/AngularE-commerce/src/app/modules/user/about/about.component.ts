import { Component } from '@angular/core';
import { UserService } from '../../../user.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['../../../app.component.css','./about.component.css'],
})
export class AboutComponent {
  darkMode:boolean = false
constructor(private userService:UserService){
  this.userService.mode.subscribe({
    next: (value) => {
      this.darkMode = value;
    },
  });
}
}
