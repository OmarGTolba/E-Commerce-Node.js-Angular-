import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { AdminComponent } from './modules/admin/adminNav/admin.component';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  HttpClient,
  HttpClientModule,
  provideHttpClient,
} from '@angular/common/http';
import { AllProductsComponent } from './modules/admin/all-products/all-products.component';
import { AllUsersComponent } from './modules/admin/all-users/all-users.component';
import { AllCategoriesComponent } from './modules/admin/all-categories/all-categories.component';
import { AllOrdersComponent } from './modules/admin/all-orders/all-orders.component';
import { AddComponent } from './modules/admin/addProduct/add.component';
import { CommonModule } from '@angular/common';

import { MatTabsModule } from '@angular/material/tabs';
import { MatSliderModule } from '@angular/material/slider';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {  MatIconModule } from '@angular/material/icon';

import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NgToastModule } from 'ng-angular-popup';
import { NotFoundComponent } from './not-found/not-found.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AuthModule } from './auth/auth.module';
import { HomeComponent } from './modules/user/userHome/home.component';
import { UserModule } from './modules/user/user.module';
import { AdminModule } from './modules/admin/admin.module';
import { AddcategoryComponent } from './admin/addcategory/addcategory.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '../assets/i18n/', '.json');
}
@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    AddcategoryComponent
  ],
  imports: [
    BrowserModule,
    MatTabsModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatPaginatorModule,
    UserModule,
    AuthModule,
    AppRoutingModule,
    FormsModule,
    AdminModule,
    MatIconModule,
    NgxSkeletonLoaderModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule,
    NgToastModule,
    CommonModule,
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
export class AppModule {}
