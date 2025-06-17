import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs'; // Adicione Observable aqui

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000/api';
  private userSubject = new BehaviorSubject<any | null>(null);
  public user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient) {
    const storedUser = localStorage.getItem('freelahub_user');
    if (storedUser) {
      this.userSubject.next(JSON.parse(storedUser));
    }
  }

  // MÉTODO QUE ESTAVA FALTANDO
  signup(userData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/signup`, userData);
  }

  login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        localStorage.setItem('freelahub_token', response.token);
        localStorage.setItem('freelahub_user', JSON.stringify(response.user));
        this.userSubject.next(response.user);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('freelahub_token');
    localStorage.removeItem('freelahub_user');
    this.userSubject.next(null);
  }

  getCurrentUser(): any | null {
    return this.userSubject.getValue();
  }

  isCompany(): boolean {
    const user = this.getCurrentUser();
    return user && user.user_type === 'company';
  }

  isLoggedIn(): boolean {
    return !!this.getCurrentUser();
  }
}