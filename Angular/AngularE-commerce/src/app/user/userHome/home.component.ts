import { Component, ViewChild } from '@angular/core';
import { ProductsService } from '../../services/products/products.service';
import { MatPaginator } from '@angular/material/paginator';
import { catchError } from 'rxjs';
import { AppModule } from '../../app.module';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['../../app.component.css'],
})
export class HomeComponent {
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  products: any[] = [];
  displayedProducts: any;
  
  token = localStorage.getItem('token') || '';
  email = localStorage.getItem('email') || '';
  constructor(
    private productService: ProductsService
   
  ) {
    this.getAllProducts();
  }
  getAllProducts(): void {
    this.productService.getAllProducts(this.token, this.email).pipe(
      
      ((error) => {
        return (error);
      })
    ).subscribe(
      (response: any) => {
        this.products= response.data
  //    this.sortbyName()
  this.displayedProducts = this.products.slice(0, 3);
      
       // this.loading = false; // Set loading to false when data is loaded
      }
    );
  }

}
