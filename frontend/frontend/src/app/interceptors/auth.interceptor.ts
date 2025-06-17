import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Pega o token de autenticação do localStorage
  const authToken = localStorage.getItem('freelahub_token');

  // Se o token existir, clona a requisição e adiciona o cabeçalho de autorização
  if (authToken) {
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${authToken}`)
    });
    // Continua com a requisição modificada
    return next(authReq);
  }
  // Se não houver token, continua com a requisição original
  return next(req);
}