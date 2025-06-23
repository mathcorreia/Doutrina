import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://192.168.15.57:8000/api'; 
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

  get(endpoint: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json'
      })
    };
    return this.http.get(`${this.baseUrl}${endpoint}`, httpOptions);
  }
  put(endpoint: string, data: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      })
    };
    return this.http.put(`${this.baseUrl}${endpoint}`, data, httpOptions);
  }
  delete(endpoint: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/json'
      })
    };
    return this.http.delete(`${this.baseUrl}${endpoint}`, httpOptions);
  }}