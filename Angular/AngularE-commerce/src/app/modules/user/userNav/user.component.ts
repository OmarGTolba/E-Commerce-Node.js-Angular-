import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';

import { Router } from '@angular/router';
import { BehaviorSubject, Observable, catchError } from 'rxjs';
import { FormControl } from '@angular/forms';
import { switchMap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { of } from 'rxjs';

import { TranslateService } from '@ngx-translate/core';
import { ProductsService } from '../../../services/products/products.service';
import { ProfileService } from '../../../services/profile/profile.service';
import { UserService } from '../../../user.service';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { LanguageService } from '../../../services/language/language.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['../../../app.component.css', './user.component.css'],
  animations: [
    trigger('fadeInOut', [
      state(
        'void',
        style({
          opacity: 0,
        })
      ),
      transition('void <=> *', animate(300)),
    ]),
  ],
})
export class UserComponent implements OnInit {
  lang: string;
  cartLength: number = 0;
  show = false;
  darkMode: boolean = localStorage.getItem('moode') === 'dark';

  constructor(
    private elRef: ElementRef,
    private renderer: Renderer2,
    private productService: ProductsService,
    private profileService: ProfileService,
    private userService: UserService,
    private router: Router,
    private translateService: TranslateService,
    private langService: LanguageService
  ) {
    this.getAllProducts();
    this.initSearchForm();
    this.lang = localStorage.getItem('lang') || 'en';
    this.translateService.setDefaultLang(this.lang);
    this.translateService.use(this.lang);
    this.userService.getCartCount(this.token, this.email, this.id);
    this.userService.cartLength.subscribe({
      next: (value) => {
        this.cartLength = value;
      },
    });
    this.langService.getLang().subscribe((lang) => {
      this.lang = lang;
    });
    const html = document.getElementsByTagName('html')[0];
    html.dir = localStorage.getItem('dir') || 'ltr';
    
    this.userService.mode.next(localStorage.getItem('moode') === 'dark');
  }
  toggleMode() {
    this.darkMode = !this.darkMode;
    this.userService.mode.next(this.darkMode);
    localStorage.setItem('moode', this.darkMode ? 'dark' : 'light');
  }
  products: any[] = [];
  searchInput: any;
  token = localStorage.getItem('token') || '';
  email = localStorage.getItem('email') || '';
  id = localStorage.getItem('userId') || '';

  loggedin = this.token ? true : false;
  searchFormControl = new FormControl();
  username = '';
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
  showSearch() {
    this.show = !this.show;
  }
  getAllProducts(): void {
    this.productService
      .getAllProducts(this.token, this.email)
      .pipe(
        catchError((error) => {
          return error;
        })
      )
      .subscribe((response: any) => {
        this.productService.products = response.data;
      });
  }
  changeLang() {
    this.lang = this.lang === 'en' ? 'ar' : 'en';
    localStorage.setItem('lang', this.lang);
    this.translateService.use(this.lang);
    this.langService.setLang(this.lang);
  }
  logout() {
    localStorage.setItem('email', '');
    localStorage.setItem('token', '');
    localStorage.setItem('userId', '');
    localStorage.clear();
    this.router.navigate(['/user']);
    this.loggedin = false;
    localStorage.clear();
  }
  signIn() {
    this.router.navigate(['/login']);
  }
  initSearchForm(): void {
    this.searchFormControl.valueChanges
      .pipe(
        debounceTime(500), // Debounce to wait for 300 milliseconds after the last keystroke
        distinctUntilChanged(), // Only emit when the value has changed
        switchMap((searchInput: string): Observable<any[]> => {
          if (searchInput) {
            this.searchInput = searchInput;
            this.productService
              .searchByName(this.token, this.email, searchInput)
              .pipe(
                catchError((error) => {
                  return error;
                })
              )
              .subscribe((response: any) => {
                this.productService.products = response.data;
                console.log(this.productService.products);
                this.router.navigate([`user/search/${searchInput}`]);
              });
            return of([]);
          } else {
            this.getAllProducts();
            this.router.navigate(['user/products']);
            return of([]); // If no search input, return an empty array
          }
        }),
        catchError((error) => {
          console.error('Error during search:', error);
          return of([]); // Return an empty array in case of an error
        })
      )
      .subscribe((searchResults) => {
        //   this.router.navigate([user/search]);
        this.products = searchResults;
      });
  }
  setActive(element: HTMLElement) {
    // Remove active class from all navigation items
    const navItems: NodeListOf<HTMLElement> =
      this.elRef.nativeElement.querySelectorAll('.nav-item');
    navItems.forEach((item: HTMLElement) => {
      this.renderer.removeClass(item, 'active');
    });
    // Add active class to the clicked navigation item
    this.renderer.addClass(element, 'active');
  }

  isActive(element: HTMLElement): boolean {
    return element.classList.contains('active');
  }
}
