// frontend/frontend/src/app/services/usuario.service.ts
import { Injectable } from '@angular/core';
import { ApiService } from './api.service'; // Seu ApiService
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private apiService: ApiService) { } // Injete o ApiService

  cadastrarUsuario(dados: any): Observable<any> {
    // O endpoint '/cadastro' deve corresponder ao que você definiu no backend
    return this.apiService.post('/cadastro', dados);
  }

  // Outros métodos como login, etc.
}