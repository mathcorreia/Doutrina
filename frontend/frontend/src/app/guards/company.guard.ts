import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const companyGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Agora o método isCompany() existe no AuthService
  if (authService.isLoggedIn() && authService.isCompany()) {
    return true;
  } else {
    // Redireciona para o login ou para uma página de "não autorizado"
    router.navigate(['/login']);
    return false;
  }
};