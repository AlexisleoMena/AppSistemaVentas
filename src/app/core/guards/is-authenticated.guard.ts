import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { AuthStatus } from '../Interfaces/auth-status';

export const isAuthenticatedGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  if(authService.authStatus() === AuthStatus.authenticated) {
    return true;
  }
  router.navigateByUrl('/auth/login');
  return false;
};
