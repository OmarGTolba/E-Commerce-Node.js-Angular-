import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './adminNav/admin.component';
import { AllProductsComponent } from './all-products/all-products.component';
import { AllUsersComponent } from './all-users/all-users.component';
import { AllCategoriesComponent } from './all-categories/all-categories.component';
import { AllOrdersComponent } from './all-orders/all-orders.component';
import { AddComponent } from './addProduct/add.component';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AppComponent } from '../../app.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../../app.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { AppRoutingModule } from '../../app-routing.module';
import { AdminProductsDetailsComponent } from './admin-products-details/admin-products-details.component';
import { AddcategoryComponent } from './addcategory/addcategory.component';

@NgModule({
  declarations: [
    AdminComponent,
    AllProductsComponent,
    AllUsersComponent,
    AllCategoriesComponent,
    AllOrdersComponent,
    AddComponent,
    AdminProductsDetailsComponent,
    AddcategoryComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatIconModule,
    NgxSkeletonLoaderModule,
    MatPaginatorModule,
    MatTabsModule,
    MatSliderModule,
    MatSlideToggleModule,
    HttpClientModule,
    MatPaginatorModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [provideClientHydration(), provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AdminModule {}
