import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private apiService: ApiService) { } 

  cadastrarUsuario(dados: any): Observable<any> {
    return this.apiService.post('/cadastro', dados);
  }

}