import { CanActivateFn, Router } from '@angular/router';
import { Component,inject } from '@angular/core';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {

  const router=inject(Router)
  const _authService=inject(AuthService)
  if (_authService.isLoggedIn()) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
  
};
