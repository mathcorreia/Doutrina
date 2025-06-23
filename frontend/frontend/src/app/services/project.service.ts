import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  // Alteramos a apiUrl para ser mais específica para o recurso de projetos
  private projectsApiUrl = 'http://127.0.0.1:8000/api/projects';
  private myProjectsApiUrl = 'http://127.0.0.1:8000/api/my-projects';

  constructor(private http: HttpClient) { }

  // Busca todos os projetos
  getProjects(): Observable<any[]> {
    return this.http.get<any[]>(this.projectsApiUrl);
  }

  // Busca um projeto específico pelo ID
  getProjectById(id: string | number): Observable<any> {
    return this.http.get<any>(`${this.projectsApiUrl}/${id}`);
  }

  // Cria um novo projeto
  createProject(projectData: any): Observable<any> {
    return this.http.post<any>(this.projectsApiUrl, projectData);
  }

  // Busca os projetos do usuário logado
  getMyProjects(): Observable<any[]> {
    return this.http.get<any[]>(this.myProjectsApiUrl);
  }

  /**
   * ATUALIZA um projeto.
   * A CORREÇÃO ESTÁ AQUI: Usa a 'projectsApiUrl' para construir a URL correta.
   */
  updateProject(id: number | string, projectData: any): Observable<any> {
    return this.http.put<any>(`${this.projectsApiUrl}/${id}`, projectData);
  }

  /**
   * DELETA um projeto.
   * A CORREÇÃO ESTÁ AQUI: Usa a 'projectsApiUrl' para construir a URL correta.
   */
  deleteProject(id: number | string): Observable<any> {
    return this.http.delete<any>(`${this.projectsApiUrl}/${id}`);
  }
}