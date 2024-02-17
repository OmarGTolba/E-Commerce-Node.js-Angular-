import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AllProductsComponent } from './all-products/all-products.component';
import { AllUsersComponent } from './all-users/all-users.component';
import { AllCategoriesComponent } from './all-categories/all-categories.component';
import { AllOrdersComponent } from './all-orders/all-orders.component';
import { AddComponent } from './add/add.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { UserProductsComponent } from './user-products/user-products.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
 {path:'',component:LoginComponent},
 {path:'user',component:UserComponent,children:[
  {path:'',component:HomeComponent},
  {path:'getMyProduct',component:UserProductsComponent}
 ]},
  {path:'admin',component:AdminComponent,children:[
    {path:'products',component:AllProductsComponent},
    {path:'categories',component:AllCategoriesComponent},
    {path:'orders',component:AllOrdersComponent},
    {path:'addProduct',component:AddComponent},
    {path:'users',component:AllUsersComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
