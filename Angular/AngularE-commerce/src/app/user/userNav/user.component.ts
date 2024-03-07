import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products/products.service';
import { UserService } from '../../user.service';

import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { ProfileService } from '../../services/profile/profile.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent implements OnInit {
  constructor(
    private productService: ProductsService,
    private userService: UserService,
    private router: Router,
    private profileService: ProfileService
  ) {
    this.getAllProducts();
  }

  products: any[] = [];
  searchInput: any;
  email = localStorage.getItem('email') || '';
  token = localStorage.getItem('token') || '';
  id = localStorage.getItem('userId') || '';
  username = '';
  getAllProducts(): void {
    this.productService
      .getAllProducts(this.token, this.email)
      .pipe(
        catchError((error) => {
          return error;
        })
      )
      .subscribe((response: any) => {
        this.products = response.data;
      });
  }
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
  search() {
    this.router.navigate([`user/search/${this.searchInput}`]);
  }
  // getUsername(){
  //   this.profileService.getUserInfo(this.id).subscribe({next:(res)=>{
  //     this.username = res.name
  //   },error:()=>{
  //     this.username = ""
  //   }})
  //   return this.username
  // }
  logout() {
    localStorage.setItem('email', '');
    localStorage.setItem('token', '');
    localStorage.setItem('userId', '');
  }
}
