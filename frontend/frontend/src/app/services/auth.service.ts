import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // URL para o endpoint de login da sua API Laravel (ainda a ser criado)
  private apiUrl = 'http://127.0.0.1:8000/api';

  // BehaviorSubject para armazenar os dados do usuário logado e notificar componentes
  private userSubject = new BehaviorSubject<any | null>(null);
  public user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient) {
    // Tenta carregar dados do usuário do localStorage ao iniciar
    const storedUser = localStorage.getItem('freelahub_user');
    if (storedUser) {
      this.userSubject.next(JSON.parse(storedUser));
    }
  }

  // Método de Login (exemplo)
  login(credentials: { email: string, password: string }) {
    // AINDA PRECISAMOS CRIAR ESTE ENDPOINT NO LARAVEL
    return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        // Salva o token e os dados do usuário no localStorage
        localStorage.setItem('freelahub_token', response.token);
        localStorage.setItem('freelahub_user', JSON.stringify(response.user));
        this.userSubject.next(response.user); // Notifica todos os componentes inscritos
      })
    );
  }

  // Método de Logout
  logout(): void {
    localStorage.removeItem('freelahub_token');
    localStorage.removeItem('freelahub_user');
    this.userSubject.next(null);
  }

  // Retorna o usuário atual
  getCurrentUser(): any | null {
    return this.userSubject.getValue();
  }

  // Verifica se o usuário é do tipo 'company'
  isCompany(): boolean {
    const user = this.getCurrentUser();
    return user && user.user_type === 'company';
  }

   // Verifica se o usuário está logado
  isLoggedIn(): boolean {
    return !!this.getCurrentUser();
  }
}