import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

// AQUI ESTÁ A ATUALIZAÇÃO PRINCIPAL
export interface User {
  id: number;
  name: string;
  email: string;
  user_type: 'freelancer' | 'company';
  
  // Define a estrutura completa para o perfil da empresa
  company?: { 
    company_name: string; 
    razao_social: string;
    cnpj: string;
    data_fundacao: string;
    telefone: string;
  };

  // Define a estrutura completa para o perfil do freelancer
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
  private userSubject = new BehaviorSubject<User | null>(null);
  public user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    this.loadUserFromStorage();
  }

  private loadUserFromStorage(): void {
    const userData = localStorage.getItem('user_data');
    if (userData) {
      this.userSubject.next(JSON.parse(userData));
    }
  }

  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  login(credentials: any): Observable<{access_token: string, user: User}> {
    return this.http.post<{access_token: string, user: User}>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        if (response.access_token && response.user) {
          this.setSession(response.access_token, response.user);
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }

  private setSession(token: string, user: User): void {
    localStorage.setItem('auth_token', token);
    localStorage.setItem('user_data', JSON.stringify(user));
    this.userSubject.next(user);
  }

  public getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  public isLoggedIn(): boolean {
    return !!this.getToken();
  }
  
  public getCurrentUser(): User | null {
    return this.userSubject.value;
  }
  
  public isCompany(): boolean {
    const user = this.getCurrentUser();
    return user ? user.user_type === 'company' : false;
  }
}