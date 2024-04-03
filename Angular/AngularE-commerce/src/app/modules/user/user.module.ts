import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';
import { AppRoutingModule } from '../../app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { UserComponent } from './userNav/user.component';
import { OrdersComponent } from './userAllOrders/orders.component';
import { CategoriesComponent } from './categories/categories.component';
import { UserOrderComponent } from './user-order/user-order.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { CartComponent } from './cart/cart.component';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { HomeComponent } from './userHome/home.component';
import {
  NgxSkeletonLoaderComponent,
  NgxSkeletonLoaderModule,
} from 'ngx-skeleton-loader';
import { ProductComponent } from './productDetails/product.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ProductPageComponent } from './product-page/product-page.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../../app.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AppComponent } from '../../app.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AboutComponent,
    ContactComponent,
    CheckoutComponent,
    UserComponent,
    OrdersComponent,
    ContactComponent,
    CategoriesComponent,
    HomeComponent,
    ProductPageComponent,
    UserOrderComponent,
    ProductCardComponent,
    CartComponent,
    ProductComponent,
    FooterComponent,
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
    MatIcon,
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
export class UserModule {}
