import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ProductsService } from '../../services/products/products.service';
import { UserService } from '../../user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ["./product-page.component.css"]
})
export class ProductPageComponent implements OnInit{
   name:string|null='';
  
  
   constructor(
    private productService: ProductsService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {

    this.route.paramMap.subscribe(params => {
         this.name = params.get('name');
         if (this.name) {
           this.search();
         } else {
           this.getAllProducts();
         }
    })
    this.getAllProducts();
   
  }


  
  products: any[] = [];
  displayedProducts: any;
  token = localStorage.getItem('token') || '';
  email = localStorage.getItem('email') || '';
  loading = true; // Initialize loading to true
  skeletonLoading=true
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit() {
    setTimeout(() => {
      this.skeletonLoading = false;
  }, 2000); 
  this.paginator._intl.itemsPerPageLabel="Test String";  
}
  



  getAllProducts(): void {
    this.productService.getAllProducts(this.token, this.email).pipe(
      catchError((error) => {
        return (error);
      })
    ).subscribe(
      (response: any) => {
        this.products= response.data
        this.displayedProducts = this.products.slice(0, this.paginator.pageSize);
        this.loading = false; // Set loading to false when data is loaded

      }
    );
  }

  search() {
    this.productService.searchByName(this.token, this.email ,this.name! ).pipe(
      catchError((error) => {
        return (error);
      })
    ).subscribe(
      (response: any) => {
        this.products = response.data;
        this.displayedProducts=this.products
        console.log(this.products);
      }
    )
     
  }
 
  

  sortbyName():void{
    
    this.products = this.products.sort((a: any, b: any) => a.name.localeCompare(b.name));
    this.displayedProducts = this.products.slice(0, this.paginator.pageSize);
    this.loading = false; // Set loading to false when data is loaded
  }

  sortByPrice(): void {
    this.products = this.products.sort((a: any, b: any) => a.price - b.price);
    this.displayedProducts = this.products.slice(0, this.paginator.pageSize);
    this.loading = false; // Set loading to false when data is loaded
}

  

  getProduct(productId: string) {
    this.productService.getProductsByID(this.token, this.email, productId).pipe(
      catchError((error) => {
        return (error);
      })
    ).subscribe(
      (response: any) => {
        this.router.navigate(['user/product', productId]);
      }
    );
  }

  onPageChange(event: any): void {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.displayedProducts = this.products.slice(startIndex, endIndex);
  }



}
