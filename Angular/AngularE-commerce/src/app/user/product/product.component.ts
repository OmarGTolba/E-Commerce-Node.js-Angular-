import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products/products.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  productId: string="";
  token = localStorage.getItem('token') || '';
  email = localStorage.getItem('email') || '';
  product:any;

  constructor(private route: ActivatedRoute ,private productServices: ProductsService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.productId = params['productId'];
      
    });

    this.productServices.getProductsByID(this.token,this.email,this.productId).subscribe(
      (response: any) => {
        this.product = response.data;
        console.log(this.product)
      },
      (error) => {
        console.error('Error fetching orders:', error);
      }
    )

  }
}
