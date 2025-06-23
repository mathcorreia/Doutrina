import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProposalService } from '../../services/proposal.service';

@Component({
  selector: 'app-proposal-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './proposal-edit.component.html',
  styleUrls: ['./proposal-edit.component.css']
})
export class ProposalEditComponent implements OnInit {
  proposalForm!: FormGroup;
  proposalId: string | null = null;
  isLoading = true;

  constructor(
    private fb: FormBuilder,
    private proposalService: ProposalService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.proposalId = this.route.snapshot.paramMap.get('id');
    this.proposalForm = this.fb.group({
      valor: ['', [Validators.required, Validators.min(0)]],
      mensagem_proposta: ['', Validators.required]
    });

    if (this.proposalId) {
      this.proposalService.getProposalById(this.proposalId).subscribe(data => {
        this.proposalForm.patchValue(data);
        this.isLoading = false;
      });
    }
  }

  onSubmit(): void {
    if (this.proposalForm.invalid || !this.proposalId) return;

    this.proposalService.updateProposal(this.proposalId, this.proposalForm.value).subscribe(() => {
      alert('Proposta atualizada com sucesso!');
      this.router.navigate(['/my-proposals']);
    });
  }
}