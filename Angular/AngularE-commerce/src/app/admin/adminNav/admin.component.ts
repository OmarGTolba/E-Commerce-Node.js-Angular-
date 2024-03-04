import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
allProducts:any;

constructor(private router:Router) {
  
}
getAllProducts(){
  this.router.navigate(['admin/products']);  
}

getAllUsers(){

  this.router.navigate(['admin/users']);  
}

getAllCategories(){

  this.router.navigate(['admin/categories']);  
}

getAllOrders(){

  this.router.navigate(['admin/orders']);  
}

addProduct(){

  this.router.navigate(['admin/addProduct']);  
}


}
