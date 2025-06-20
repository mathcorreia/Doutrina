import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) { }

  getProjects(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/projects`);
  }

  getProjectById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/projects/${id}`);
  }

  createProject(projectData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/projects`, projectData);
  }

  // MÉTODO ADICIONADO AQUI
  getMyProjects(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/my-projects`);
  }
}