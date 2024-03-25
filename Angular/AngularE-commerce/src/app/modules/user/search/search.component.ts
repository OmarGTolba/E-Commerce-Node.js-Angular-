// import { Component } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { ProductsService } from '../../services/products/products.service';
// import { catchError } from 'rxjs';
// @Component({
//   selector: 'app-search',
//   templateUrl: './search.component.html',
//   styleUrl: './search.component.css'
// })
// export class SearchComponent {
// constructor(private route:ActivatedRoute , private productService:ProductsService) {
// }

// products: any[] = [];
// token = localStorage.getItem('token') || '';
// email = localStorage.getItem('email') || '';
// name:any;
// ngOnInit() {
//   this.route.paramMap.subscribe(params => {
//    this.name = params.get('name');
    
//     console.log('ID from URL:', this.name);
//     this.getAllProducts()
//   });
// }

// getAllProducts(): void {
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
// }