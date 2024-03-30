import { Component } from '@angular/core';
import { LanguageService } from '../../../services/language/language.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['../../../app.component.css','./about.component.css'],
})
export class AboutComponent {
  lang = localStorage.getItem("lang") || "en"
  constructor( private langService: LanguageService){
    this.langService.getLang().subscribe((lang)=>{
      this.lang = lang
    })
  }
}
