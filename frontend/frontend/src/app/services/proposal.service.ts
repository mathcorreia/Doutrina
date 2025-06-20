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
}