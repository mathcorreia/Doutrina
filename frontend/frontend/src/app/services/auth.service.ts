import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

// Interface para definir a estrutura do objeto User
export interface User {
  id: number;
  name: string;
  email: string;
  company?: { company_name: string; cnpj: string; };
  freelancer?: { cpf: string; skills: string; };
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000/api';
  private userSubject = new BehaviorSubject<User | null>(this.getUserFromToken());
  public user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) { }

  /**
   * Envia os dados de registro para a rota /register da API.
   */
  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData).pipe(
      tap((response: any) => {
        if (response.access_token) {
          this.setSession(response.access_token);
        }
      })
    );
  }

  /**
   * Envia as credenciais de login para a rota /login da API.
   */
  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        if (response.access_token) {
          this.setSession(response.access_token);
        }
      })
    );
  }

  /**
   * Realiza o logout, limpando o token e o estado do usuário.
   */
  logout(): void {
    localStorage.removeItem('auth_token');
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }

  /**
   * Salva o token no localStorage e atualiza o estado do usuário.
   */
  private setSession(token: string): void {
    localStorage.setItem('auth_token', token);
    this.userSubject.next(this.getUserFromToken());
  }

  /**
   * Pega o token do localStorage.
   */
  public getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  /**
   * Verifica se o usuário está logado.
   */
  public isLoggedIn(): boolean {
    return !!this.getToken();
  }
  
  /**
   * Retorna os dados do usuário logado.
   */
  public getCurrentUser(): User | null {
    return this.userSubject.value;
  }
  
  /**
   * Verifica se o usuário logado é uma Empresa.
   */
  public isCompany(): boolean {
    const user = this.getCurrentUser();
    return user ? !!user.company : false;
  }

  /**
   * Decodifica o token JWT para extrair os dados do usuário,
   * tratando tokens expirados ou inválidos.
   */
  private getUserFromToken(): User | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const decoded: any = jwtDecode(token);
      if (decoded.exp * 1000 < Date.now()) {
        localStorage.removeItem('auth_token');
        return null;
      }
      return decoded.user || decoded; 
    } catch (error) {
      localStorage.removeItem('auth_token');
      return null;
    }
  }
}