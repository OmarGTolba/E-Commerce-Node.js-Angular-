import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from '../../user/productDetails/product.component';
import { ProductPageComponent } from '../../user/product-page/product-page.component';
// import { ProductCardComponent } from '../../user/product-card/product-card.component';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ProductCardComponent } from '../../user/product-card/product-card.component';

const routes: Routes = [
  { path: '', component: ProductPageComponent },

  { path: 'product/:productId', component: ProductComponent },
];
@NgModule({
  declarations: [ProductComponent, ProductPageComponent, ProductCardComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    NgxSkeletonLoaderModule,
    MatPaginatorModule,

    RouterModule.forChild(routes),
  ],
})
export class ProductsModule {}
