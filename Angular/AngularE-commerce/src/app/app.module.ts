import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
AdminComponent
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { AllProductsComponent } from './all-products/all-products.component';
import { AllUsersComponent } from './all-users/all-users.component';
import { AllCategoriesComponent } from './all-categories/all-categories.component';
import { AllOrdersComponent } from './all-orders/all-orders.component';
import { AddComponent } from './add/add.component';
import { UserComponent } from './user/user.component';
import { UserProductsComponent } from './user-products/user-products.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    AllProductsComponent,
    AllUsersComponent,
    AllCategoriesComponent,
    AllOrdersComponent,
    AddComponent,
    UserComponent,
    UserProductsComponent,
    HomeComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,FormsModule,BrowserModule,HttpClientModule,ReactiveFormsModule,
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
