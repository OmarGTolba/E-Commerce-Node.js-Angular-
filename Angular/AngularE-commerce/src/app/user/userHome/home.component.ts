import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ProductsService } from '../../services/products/products.service';
import { UserService } from '../../user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSort, Sort } from '@angular/material/sort';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor(
    private route:ActivatedRoute , 
    private productService: ProductsService,
    private userService: UserService,
    private router: Router
  ) {
   // this.getAllProducts();
  }

  products: any[] = [];
  displayedProducts: any;
  token = localStorage.getItem('token') || '';
  email = localStorage.getItem('email') || '';
  loading = true; // Initialize loading to true

  @ViewChild(MatPaginator) paginator!: MatPaginator;
//..............................................................................................
getAllProducts(): void {
  this.productService.getAllProducts(this.token, this.email).pipe(
    catchError((error) => {
      return (error);
    })
    ).subscribe(
      (response: any) => {
        this.products= response.data
        //    this.sortbyName()
        this.getpagination(this.products)
        this.loading = false; // Set loading to false when data is loaded
      }
      );
    }
    
    
    getpagination(p:any[]):void{
      
      this.displayedProducts = p.slice(0, this.paginator.pageSize);
    }
    //..............................................................................................

      // (error) => {
        //   console.error('Error fetching products:', error);
      //   this.loading = false; // Handle loading state in case of an error
      //   this.products = response.data;
      //   console.log(this.products);
      // }
  


     name:any;
      ngOnInit() {
        this.route.paramMap.subscribe(params => {
          this.name = params.get('name');
          
          if(!this.name ){
             this.getAllProducts()
          }          
          else{
          console.log('ID from URL:', this.name);
          this.getSearchProducts()
        }
        });
      }
      
      getSearchProducts(): void {
        this.productService.searchByName(this.token, this.email ,this.name ).pipe(
          catchError((error) => {
            return (error);
          })
          ).subscribe(
            (response: any) => {
              this.getpagination(response.data)
              
              console.log(this.products);
          }
        )
      }




  sortbyName():void{
    this.products = this.products.sort((a: any, b: any) => a.name.localeCompare(b.name));
    this.displayedProducts = this.products.slice(0, this.paginator.pageSize);
    this.loading = false; // Set loading to false when data is loaded
  }

  sortbyPrice():void{
    this.products = this.products.sort((a: any, b: any) => a.Price.localeCompare(b.name));
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
