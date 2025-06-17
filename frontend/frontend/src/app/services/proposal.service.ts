import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProposalService {
  private apiUrl = 'http://127.0.0.1:8000/api/proposals';

  constructor(private http: HttpClient) { }

  /**
   * Envia os dados de uma nova proposta para a API.
   * @param proposalData Os dados do formulário da proposta.
   * @returns Um Observable com a resposta da API (a proposta criada).
   */
  createProposal(proposalData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, proposalData);
  }
}