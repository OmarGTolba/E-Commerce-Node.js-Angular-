import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products/products.service';
import { Router } from '@angular/router';
import { Observable, catchError } from 'rxjs';
import { FormControl } from '@angular/forms';
import { switchMap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { of } from 'rxjs';
import { ProfileService } from '../../services/profile/profile.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent implements OnInit {
  lang: string;
  constructor(
    private productService: ProductsService,
    private profileService: ProfileService,
    private router: Router,
    private translateService: TranslateService
  ) {
    this.getAllProducts();
    this.initSearchForm();
    this.lang = localStorage.getItem('lang') || 'en';
    this.translateService.setDefaultLang(this.lang);
    this.translateService.use(this.lang);
  }

  products: any[] = [];
  searchInput: any;
  token = localStorage.getItem('token') || '';
  email = localStorage.getItem('email') || '';
  id = localStorage.getItem('userId') || '';

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
  }
  logout() {
    localStorage.setItem('email', '');
    localStorage.setItem('token', '');
    localStorage.setItem('userId', '');
  }
  initSearchForm(): void {
    this.searchFormControl.valueChanges
      .pipe(
        debounceTime(1000), // Debounce to wait for 300 milliseconds after the last keystroke
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
            this.router.navigate([`user/`]);
            return of([]); // If no search input, return an empty array
          }
        }),
        catchError((error) => {
          console.error('Error during search:', error);
          return of([]); // Return an empty array in case of an error
        })
      )
      .subscribe((searchResults) => {
        //   this.router.navigate([`user/search`]);
        this.products = searchResults;
      });
  }
  //on
  // search() {
  //   this.productService.searchByName(this.token, this.email ,this.name ).pipe(
  //     catchError((error) => {
  //       return (error);
  //     })
  //   ).subscribe(
  //     (response: any) => {
  //       this.products = response.data;
  //       console.log(this.products);
  //     }
  //   )
  // }
}
