import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';
export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const toast = new NgToastService();
  const role = localStorage.getItem('role');

    if (role === 'Admin') {
      return true;
    } else {
      alert('only admin'); 
      router.navigateByUrl('/user');
      return false;
    }
  };
