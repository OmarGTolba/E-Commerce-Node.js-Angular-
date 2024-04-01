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
  }

  getLang(){
    return this.myLang.asObservable()
  }

}
