import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  // URL base da sua API Laravel. Ajuste a porta se for diferente.
  private apiUrl = 'http://127.0.0.1:8000/api/projects';

  constructor(private http: HttpClient) { }

  /**
   * Busca todos os projetos da API.
   * @returns Um Observable com a lista de projetos.
   */
  getProjects(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  /**
   * Busca um único projeto pelo seu ID.
   * @param id O ID do projeto.
   * @returns Um Observable com os dados do projeto.
   */
  getProjectById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  /**
   * Envia os dados de um novo projeto para a API.
   * @param projectData Os dados do formulário do projeto.
   * @returns Um Observable com a resposta da API.
   */
  createProject(projectData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, projectData);
  }
}