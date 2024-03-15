import { CUSTOM_ELEMENTS_SCHEMA, Component, ViewChild } from '@angular/core';
import { ProductsService } from '../../services/products/products.service';
import { MatPaginator } from '@angular/material/paginator';
import { catchError } from 'rxjs';
import { AppModule } from '../../app.module';
import { ProductCardComponent } from '../product-card/product-card.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['../../app.component.css']
})
export class HomeComponent {
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  products: any[] = [];
  categories: any[] = [];
  displayedProducts: any;
  
  token = localStorage.getItem('token') || '';
  email = localStorage.getItem('email') || '';
  constructor(
    private productService: ProductsService
   
  ) {
    this.getAllProducts();
    this.getAllCategories()
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


getAllCategories(){
  this.productService.getAllCategories(this.token, this.email).pipe(
      
    ((error) => {
      return (error);
    })
  ).subscribe(
    (response: any) => {
      this.categories= response.data
//    this.sortbyName()
console.log(this.categories);

this.categories = this.categories.slice(0, 3);
    
     // this.loading = false; // Set loading to false when data is loaded
    }
  );

}

}
