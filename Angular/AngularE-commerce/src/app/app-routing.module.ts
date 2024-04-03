import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './modules/auth/register/register.component';
import { ForgotPasswordComponent } from './modules/auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './modules/auth/reset-password/reset-password.component';
import { authGuard } from './guard/auth.guard';
import { adminGuard } from './guard/admin.guard';
import { AddcategoryComponent } from './modules/admin/addcategory/addcategory.component';
import { AllProductsComponent } from './modules/admin/all-products/all-products.component';
import { AllCategoriesComponent } from './modules/admin/all-categories/all-categories.component';
import { AllOrdersComponent } from './modules/admin/all-orders/all-orders.component';
import { AddComponent } from './modules/admin/addProduct/add.component';
import { AllUsersComponent } from './modules/admin/all-users/all-users.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AdminComponent } from './modules/admin/adminNav/admin.component';
import { ContactComponent } from './modules/user/contact/contact.component';
import { ProfileComponent } from './modules/profile/profile/profile.component';
import { CheckoutComponent } from './modules/user/checkout/checkout.component';
import { AboutComponent } from './modules/user/about/about.component';
import { CategoriesComponent } from './modules/user/categories/categories.component';
import { CartComponent } from './modules/user/cart/cart.component';
import { ProductComponent } from './modules/user/productDetails/product.component';
import { ProductPageComponent } from './modules/user/product-page/product-page.component';
import { UserOrderComponent } from './modules/user/user-order/user-order.component';
import { OrdersComponent } from './modules/user/userAllOrders/orders.component';
import { HomeComponent } from './modules/user/userHome/home.component';
import { UserComponent } from './modules/user/userNav/user.component';
import { LoginComponent } from './modules/auth/login/login.component';
import { AdminProductsDetailsComponent } from './modules/admin/admin-products-details/admin-products-details.component';
import { loginGuard } from './guard/login.guard';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [{ path: '', component: HomeComponent }],
  },
  { path: 'login', component: LoginComponent, canActivate: [loginGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password/:id/:token', component: ResetPasswordComponent },
  {
    path: 'user',
    component: UserComponent,
    children: [
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'search/:name', component: ProductPageComponent },
      { path: 'search/category/:catname', component: ProductPageComponent },
      {
        path: 'allOrder',
        component: OrdersComponent,
        canActivate: [authGuard],
      },
      {
        path: 'order/:orderId',
        component: UserOrderComponent,
        canActivate: [authGuard],
      },
      { path: 'products', component: ProductPageComponent },
      { path: 'product/:productId', component: ProductComponent },
      { path: 'categories', component: CategoriesComponent },
      { path: 'cart', component: CartComponent, canActivate: [authGuard] },
      {
        path: 'checkout',
        component: CheckoutComponent,
        canActivate: [authGuard],
      },
      { path: 'about', component: AboutComponent },
      { path: 'contact', component: ContactComponent },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [authGuard],
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
    canActivate: [adminGuard],
    children: [
      { path: 'products', component: AllProductsComponent },
      { path: 'products/:id', component: AdminProductsDetailsComponent },
      { path: 'addProduct/:id', component: AddComponent },
      { path: 'categories', component: AllCategoriesComponent },
      { path: 'orders', component: AllOrdersComponent },
      { path: 'addProduct', component: AddComponent },
      { path: 'addProduct/:id', component: AddComponent },
      { path: 'addCategory', component: AddcategoryComponent },
      { path: 'updateCategory/:id', component: AddcategoryComponent },
      { path: 'users', component: AllUsersComponent },
      { path: 'addProduct/:id', component: AddComponent },
    ],
  },
  { path: '', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
