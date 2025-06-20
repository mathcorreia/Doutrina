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
}