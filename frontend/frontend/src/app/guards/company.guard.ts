import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


export const companyGuard: CanActivateFn = (route, state) => {
  // Pega uma instância do AuthService e do Router
  const authService = inject(AuthService);
  const router = inject(Router);

  // Verifica a condição: o usuário é uma empresa?
  if (authService.isCompany()) {
    // Se for, permite o acesso à rota.
    return true;
  }

  // Se não for uma empresa, bloqueia o acesso e redireciona o usuário
  // para a página de login.
  router.navigate(['/login']);
  return false;
};