import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';

export const loginGuard: CanActivateFn = (route, state) => {
  const toast = new NgToastService();
  const router = inject(Router);
  const localData = localStorage.getItem('token');

  if (localData === null) {
    return true;
  } else {
    toast.error({
      detail: 'Please login first',
      summary: 'Error',
      duration: 5000,
      position: 'topRight',
    });
    router.navigateByUrl('/');
    return false;
  }
};
