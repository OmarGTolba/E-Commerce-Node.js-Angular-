import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  myLang = new BehaviorSubject<string>(localStorage.getItem("lang")||"en")
  constructor() { } 

  setLang(lang: string){
    this.myLang.next(lang)
    const html = document.getElementsByTagName('html')[0];
        if(lang == "ar"){
          html.dir = 'rtl'
          localStorage.setItem("dir", 'rtl')
        }else{
          html.dir = 'ltr'
          localStorage.setItem("dir", 'ltr')
        }
  }

  getLang(){
    return this.myLang.asObservable()
  }

}
