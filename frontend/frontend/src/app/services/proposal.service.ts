import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProposalService {
  private apiUrl = 'http://127.0.0.1:8000/api/proposals';

  constructor(private http: HttpClient) {}

  createProposal(proposalData: any): Observable<any> {
    return this.http.post(this.apiUrl, proposalData);
  }

  getMyProposals(): Observable<any> {
    return this.http.get('http://127.0.0.1:8000/api/my-proposals');
  }
  // Busca uma proposta específica pelo ID
  getProposalById(id: string | number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Atualiza uma proposta
  updateProposal(id: number | string, proposalData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, proposalData);
  }

   //Deleta uma proposta
  deleteProposal(id: number | string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}