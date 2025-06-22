import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const freelancerGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const user = authService.getCurrentUser();

  if (authService.isLoggedIn() && user?.user_type === 'freelancer') {
    return true; // Acesso permitido
  }

  router.navigate(['/dashboard']);
  return false; // Acesso negado
};