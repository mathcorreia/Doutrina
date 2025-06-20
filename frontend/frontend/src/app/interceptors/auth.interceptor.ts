import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

/**
 * Este é o interceptor de autenticação.
 * Ele será executado para cada requisição HTTP que sair do seu app.
 */
export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  
  const authService = inject(AuthService);
  const token = authService.getToken(); // Pega o token salvo no AuthService

  // Se o token existir no localStorage...
  if (token) {
    // Clona a requisição original e adiciona o cabeçalho de Autorização
    const cloned = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    });
    // Envia a requisição clonada (com o token) para o backend
    return next(cloned);
  }

  // Se não houver token, envia a requisição original sem modificação
  return next(req);
};