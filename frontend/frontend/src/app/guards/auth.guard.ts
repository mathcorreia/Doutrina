import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

// Exporta uma constante chamada 'authGuard' que é uma função
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Se o usuário estiver logado, permite o acesso à rota
  if (authService.isLoggedIn()) {
    return true;
  }

  // Se não estiver logado, redireciona para a página de login
  return router.parseUrl('/login');
};