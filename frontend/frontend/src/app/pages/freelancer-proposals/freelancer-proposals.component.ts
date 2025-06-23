import { Component, OnInit } from '@angular/core';
import { ProposalService } from '../../services/proposal.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-freelancer-proposals',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './freelancer-proposals.component.html',
  styleUrls: ['./freelancer-proposals.component.css']
})
export class FreelancerProposalsComponent implements OnInit {
  proposals: any[] = [];
  isLoading = true;
  errorMessage: string | null = null;

  constructor(private proposalService: ProposalService) { }

  ngOnInit(): void {
    this.proposalService.getMyProposals().subscribe({
      next: (data) => {
        this.proposals = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Ocorreu um erro ao carregar suas propostas.';
        this.isLoading = false;
        console.error(err);
      }
    });
  }
  /**
   * NOVO MÉTODO ADICIONADO AQUI
   * Esta função será chamada quando o botão "Excluir" for clicado.
   * @param proposalId O ID da proposta a ser deletada.
   */
  onDelete(proposalId: number): void {
    if (confirm('Tem certeza que deseja deletar esta proposta?')) {
      this.proposalService.deleteProposal(proposalId).subscribe({
        next: () => {
          // Remove a proposta da lista na tela para um feedback instantâneo
          this.proposals = this.proposals.filter(p => p.id !== proposalId);
          alert('Proposta deletada com sucesso!');
        },
        error: (err) => {
          alert('Erro ao deletar a proposta.');
          console.error(err);
      }})}}}