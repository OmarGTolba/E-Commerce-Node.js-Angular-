import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './modules/admin/adminNav/admin.component';
import { AllProductsComponent } from './modules/admin/all-products/all-products.component';
import { AllUsersComponent } from './modules/admin/all-users/all-users.component';
import { AllCategoriesComponent } from './modules/admin/all-categories/all-categories.component';
import { AllOrdersComponent } from './modules/admin/all-orders/all-orders.component';
import { AddComponent } from './modules/admin/addProduct/add.component';
import { LoginComponent } from './auth/login/login.component';
import { UserComponent } from './modules/user/userNav/user.component';
import { HomeComponent } from './modules/user/userHome/home.component';
import { RegisterComponent } from './auth/register/register.component';
import { OrdersComponent } from './modules/user/userAllOrders/orders.component';
import { UserOrderComponent } from './modules/user/user-order/user-order.component';
import { CartComponent } from './modules/user/cart/cart.component';
import { ProductPageComponent } from './modules/user/product-page/product-page.component';
import { ProfileComponent } from './modules/profile/profile/profile.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProductComponent } from './modules/user/productDetails/product.component';
import { CategoriesComponent } from './modules/user/categories/categories.component';
import { CheckoutComponent } from './modules/user/checkout/checkout.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { AboutComponent } from './modules/user/about/about.component';
import { ContactComponent } from './modules/user/contact/contact.component';
import { AdminProductsDetailsComponent } from './modules/admin/admin-products-details/admin-products-details.component';

const routes: Routes = [
  { path: '', component: UserComponent   ,children: [
    { path: '',component: HomeComponent } ]},
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent},
  { path: 'reset-password/:id/:token', component: ResetPasswordComponent},
  {
    path: 'user',
    component: UserComponent,
    children: [
      { path: '',component: HomeComponent },
      { path: 'allOrder', component: OrdersComponent },
      { path: 'search/:name', component: ProductPageComponent },
      { path: 'search/category/:catname', component: ProductPageComponent },
      { path: 'allOrder', component: OrdersComponent },
      { path: 'order/:orderId', component: UserOrderComponent },
      { path: 'products', component: ProductPageComponent },
      { path: 'product/:productId', component: ProductComponent },
      { path: 'categories', component: CategoriesComponent },
      { path: 'cart', component: CartComponent },
      { path: 'checkout', component: CheckoutComponent },
      { path: 'about', component: AboutComponent },
      { path: 'contact', component: ContactComponent },
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
      { path: 'products/:id', component: AdminProductsDetailsComponent },
      { path: 'categories', component: AllCategoriesComponent },
      { path: 'orders', component: AllOrdersComponent },
      { path: 'addProduct', component: AddComponent },
      { path: 'addProduct/:id', component: AddComponent },
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
