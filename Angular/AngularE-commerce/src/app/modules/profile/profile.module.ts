import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from '../../user/profile/profile.component';
import { EditProfileComponent } from '../../user/edit-profile/edit-profile.component';
import { FavoritesComponent } from '../../user/favorites/favorites.component';
import { OrdersComponent } from '../../user/userAllOrders/orders.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', redirectTo: 'edit', pathMatch: 'full' },
  { path: 'edit', component: EditProfileComponent },
  { path: 'favorites', component: FavoritesComponent },
  { path: 'allOrder', component: OrdersComponent },
];
@NgModule({
  declarations: [EditProfileComponent, ProfileComponent, FavoritesComponent],
  imports: [CommonModule, RouterModule.forChild(routes), ReactiveFormsModule],
})
export class ProfileModule {}