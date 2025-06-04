import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private baseUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  getUsuarios() {
    return this.http.get(`${this.baseUrl}/usuarios`);
  }

  cadastrarUsuario(dados: any) {
    return this.http.post(`${this.baseUrl}/cadastro`, dados);
  }
}
