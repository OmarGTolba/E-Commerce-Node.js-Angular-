import { Component } from '@angular/core';
import { LanguageService } from '../../../services/language/language.service';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['../../../app.component.css','./about.component.css'],
})
export class AboutComponent {
  lang = localStorage.getItem("lang") || "en"
  darkMode:boolean = false
  constructor( private langService: LanguageService, private userService:UserService){
    this.langService.getLang().subscribe((lang)=>{
      this.lang = lang
    })
  this.userService.mode.subscribe({
    next: (value) => {
      this.darkMode = value;
    },
  });
}
}
