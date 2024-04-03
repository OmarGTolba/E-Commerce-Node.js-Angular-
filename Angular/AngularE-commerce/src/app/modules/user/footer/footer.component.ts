import { Component } from '@angular/core';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: '../../../app.component.css',
})
export class FooterComponent {
  darkMode: boolean = false;
  constructor(userService: UserService) {
    userService.mode.subscribe({
      next: (value) => {
        this.darkMode = value;
      },
    });
  }
}
