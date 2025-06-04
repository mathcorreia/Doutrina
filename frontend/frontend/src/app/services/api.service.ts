// frontend/frontend/src/app/services/api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // A URL base da sua API Laravel
  private baseUrl = 'http://localhost:8000/api'; // Ajuste se necessário

  constructor(private http: HttpClient) { }

  post(endpoint: string, data: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      })
    };
    return this.http.post(`${this.baseUrl}${endpoint}`, data, httpOptions);
  }

  // Métodos GET, PUT, DELETE, etc. podem ser adicionados aqui
}