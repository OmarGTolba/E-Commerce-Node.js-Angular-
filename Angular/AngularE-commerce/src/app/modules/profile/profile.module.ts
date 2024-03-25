import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { FavoritesComponent } from '../../user/favorites/favorites.component';
import { OrdersComponent } from '../user/userAllOrders/orders.component';
import { ReactiveFormsModule } from '@angular/forms';
import {
  NgxSkeletonLoaderComponent,
  NgxSkeletonLoaderModule,
} from 'ngx-skeleton-loader';

const routes: Routes = [
  { path: '', redirectTo: 'edit', pathMatch: 'full' },
  { path: 'edit', component: EditProfileComponent },
  { path: 'favorites', component: FavoritesComponent },
  { path: 'allOrder', component: OrdersComponent },
];
@NgModule({
  declarations: [EditProfileComponent, ProfileComponent, FavoritesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgxSkeletonLoaderModule,
    ReactiveFormsModule,
  ],
})
export class ProfileModule { }



















