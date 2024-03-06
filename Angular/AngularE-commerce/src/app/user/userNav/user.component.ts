import { Component } from '@angular/core';
import { ProductsService } from '../../services/products/products.service';
import { UserService } from '../../user.service';

import { Router } from '@angular/router';
import { Observable, catchError } from 'rxjs';
import { FormControl } from '@angular/forms';
import { switchMap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  constructor(private productService: ProductsService, private userService: UserService, private router: Router) {
    this.getAllProducts();
    this.initSearchForm();
  }


  products: any[] = [];
  searchInput: any;
  token = localStorage.getItem('token') || '';
  email = localStorage.getItem('email') || '';
  searchFormControl = new FormControl();
  getAllProducts(): void {
    this.productService.getAllProducts(this.token, this.email).pipe(
      catchError((error) => {
        return (error);
      })
    ).subscribe(
      (response: any) => {
        this.productService.products = response.data;
      }
    )

  }

  initSearchForm(): void {
    this.searchFormControl.valueChanges.pipe(
      debounceTime(1000), // Debounce to wait for 300 milliseconds after the last keystroke
      distinctUntilChanged(), // Only emit when the value has changed
      switchMap((searchInput: string): Observable<any[]> => {
        if (searchInput ) {
          this.searchInput = searchInput
          this.productService.searchByName(this.token, this.email ,searchInput ).pipe(
            catchError((error) => {
              return (error);
            })
            ).subscribe(
              (response: any) => {
                this.productService.products = response.data;
                console.log(this.productService.products);
                this.router.navigate([`user/${searchInput}`]);
              }
              )
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
    ).subscribe((searchResults) => {
     //   this.router.navigate([`user/search`]);
      this.products = searchResults;
    });
  }

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
