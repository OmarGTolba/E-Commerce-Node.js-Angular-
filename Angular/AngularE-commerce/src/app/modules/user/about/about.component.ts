import { Component } from '@angular/core';
import { LanguageService } from '../../../services/language/language.service';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['../../../app.component.css', './about.component.css'],
})
export class AboutComponent {
  teamMember = [
    {
      image:
        'https://i.pinimg.com/236x/41/e2/29/41e2292846db26a545e75b1b481b5891.jpg',
      name: 'Areeg',
      githup: 'https://github.com/areeg45',
      linkedIn: 'https://www.linkedin.com/in/areeg-mahmoud-941818287/',
      desc: '',
    },
    {
      image:
        'https://img.wattpad.com/739578fddae37dbddefc5a9c50d515ac9f4a5499/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f7343616349566168384d535355773d3d2d313033393931333639312e313636633337613630646438633236623331393135393633353735352e6a7067?s=fit&w=720&h=720',
      name: 'Menna',
      githup: 'https://github.com/MennatAllahKhalil',
      linkedIn: 'https://www.linkedin.com/in/mennatallah-khalil-9b46b7276/',
      desc: '',
    },
    {
      image:
        'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjKN_GJwEwFIk54iWsef_p4V2GUGW4e3jWD5Byy94_wI59scKtFm1b1IJYEWtVuO1sG_WMa9qOsGsCKyM3OWx-6ICgOuKHoRIxDzD-Gl5T5268FcHzDFSDPdn_r42mXejBGOheMVlg-Cw9fNI6xNwKusLRcNmhuGm7gfWw7c0Qzx1v9JSDxMxYf4afFlQ/w320-h213-rw/%D9%A2%D9%A0%D9%A2%D9%A2%D9%A0%D9%A4%D9%A2%D9%A9_%D9%A0%D9%A7%D9%A2%D9%A7%D9%A2%D9%A5.webp',
      name: 'Nada',
      githup: 'https://github.com/NadaElho',
      linkedIn: 'https://www.linkedin.com/in/nada-elhosary-0684611a5/',
      desc: '',
    },
    {
      image: 'https://pbs.twimg.com/media/CJZYnGIUcAA_F-D.jpg',
      name: 'Omar',
      githup: 'https://github.com/OmarGTolba',
      linkedIn: 'https://www.linkedin.com/in/omar-gaber-523999238/',
      desc: '',
    },
    {
      image:
        'https://i.pinimg.com/236x/cb/58/03/cb580317a3a0bcd17b9d31ede09782c1.jpg',
      name: 'Sohila',
      githup: 'https://github.com/NadaElho',
      linkedIn: 'https://www.linkedin.com/in/nada-elhosary-0684611a5/',
      desc: '',
    },
  ];
  lang = localStorage.getItem('lang') || 'en';
  darkMode: boolean = false;
  constructor(
    private langService: LanguageService,
    private userService: UserService
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
}
