import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

// A "Interface" User define a estrutura completa dos dados do usuário
// que recebemos do backend.
export interface User {
  id: number;
  name: string;
  email: string;
  user_type: 'freelancer' | 'company';
  
  // O '?' significa que a propriedade é opcional (um freelancer não terá dados de empresa)
  company?: { 
    company_name: string; 
    razao_social: string;
    cnpj: string;
    data_fundacao: string;
    telefone: string;
  };

  // O '?' significa que a propriedade é opcional (uma empresa não terá dados de freelancer)
  freelancer?: { 
    cpf: string; 
    data_nascimento: string;
    telefone: string;
    skills: string; 
  };
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000/api';
  
  // BehaviorSubject gerencia o estado do usuário logado e notifica toda a aplicação sobre mudanças.
  private userSubject = new BehaviorSubject<User | null>(null);
  public user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    // Ao iniciar o serviço, tentamos carregar os dados do usuário que podem estar salvos
    this.loadUserFromStorage();
  }

  /**
   * Tenta carregar dados do usuário do localStorage ao iniciar o app.
   * Isso mantém o usuário logado mesmo que ele atualize a página.
   */
  private loadUserFromStorage(): void {
    const token = localStorage.getItem('auth_token');
    const userData = localStorage.getItem('user_data');
    if (token && userData) {
      this.userSubject.next(JSON.parse(userData));
    }
  }

  /**
   * Envia os dados de registro para a API.
   */
  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  /**
   * Envia as credenciais de login para a API e salva a sessão se for bem-sucedido.
   */
  login(credentials: any): Observable<{access_token: string, user: User}> {
    return this.http.post<{access_token: string, user: User}>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        if (response.access_token && response.user) {
          this.setSession(response.access_token, response.user);
        }
      })
    );
  }

  /**
   * Limpa os dados de sessão do usuário e o redireciona para a página de login.
   */
  logout(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }

  /**
   * Salva o token e os dados do usuário no localStorage e atualiza o estado da aplicação.
   */
  private setSession(token: string, user: User): void {
    localStorage.setItem('auth_token', token);
    localStorage.setItem('user_data', JSON.stringify(user));
    this.userSubject.next(user);
  }

  /**
   * Retorna o token de autenticação do localStorage.
   */
  public getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  /**
   * Verifica se o usuário está logado (se existe um token).
   */
  public isLoggedIn(): boolean {
    return !!this.getToken();
  }
  
  /**
   * Retorna os dados do usuário logado atualmente.
   */
  public getCurrentUser(): User | null {
    return this.userSubject.value;
  }
  
  /**
   * Verifica se o usuário logado é do tipo "empresa".
   */
  public isCompany(): boolean {
    const user = this.getCurrentUser();
    return user ? user.user_type === 'company' : false;
  }
}
