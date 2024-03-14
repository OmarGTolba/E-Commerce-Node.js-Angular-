import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/adminNav/admin.component';
import { AllProductsComponent } from './admin/all-products/all-products.component';
import { AllUsersComponent } from './admin/all-users/all-users.component';
import { AllCategoriesComponent } from './admin/all-categories/all-categories.component';
import { AllOrdersComponent } from './admin/all-orders/all-orders.component';
import { AddComponent } from './admin/addProduct/add.component';
import { LoginComponent } from './user/login/login.component';
import { UserComponent } from './user/userNav/user.component';
import { HomeComponent } from './user/userHome/home.component';
import { RegisterComponent } from './user/register/register.component';
import { OrdersComponent } from './user/userAllOrders/orders.component';
import { UserOrderComponent } from './user/user-order/user-order.component';
import { CartComponent } from './user/cart/cart.component';
import { ProductPageComponent } from './user/product-page/product-page.component';
import { ProfileComponent } from './user/profile/profile.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProductComponent } from './user/productDetails/product.component';

const routes: Routes = [
  { path: '', component: LoginComponent, pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  {
    path: 'user',
    component: UserComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'allOrder', component: OrdersComponent },
      { path: 'search/:name', component: ProductPageComponent },
      { path: 'allOrder', component: OrdersComponent },
      { path: 'order/:orderId', component: UserOrderComponent },
      { path: 'products', component: ProductPageComponent },
      { path: 'product/:productId', component: ProductComponent },
      { path: 'cart', component: CartComponent },
      {
        path: 'profile',
        component: ProfileComponent,
        loadChildren: () =>
          import('./modules/profile/profile.module').then(
            (m) => m.ProfileModule
          ),
      },
    ],
  },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: 'products', component: AllProductsComponent },
      { path: 'categories', component: AllCategoriesComponent },
      { path: 'orders', component: AllOrdersComponent },
      { path: 'addProduct', component: AddComponent },
      { path: 'users', component: AllUsersComponent },
    ],
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
