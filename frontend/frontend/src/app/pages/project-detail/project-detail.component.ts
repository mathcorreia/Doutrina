import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProjectService } from '../../services/project.service';
import { ProposalService } from '../../services/proposal.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {
  project: any = null;
  currentUser: any = null;
  isOwner = false;
  isFreelancer = false;
  proposalForm!: FormGroup;
  isLoading = true;
  feedbackMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService,
    public authService: AuthService,
    private proposalService: ProposalService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    const projectId = this.route.snapshot.paramMap.get('id');

    if (projectId) {
      this.loadProjectDetails(projectId);
    } else {
      this.isLoading = false;
      this.feedbackMessage = "Erro: ID do projeto não encontrado na URL.";
    }

    this.currentUser = this.authService.getCurrentUser();
    if (this.currentUser) {
        this.isFreelancer = this.currentUser.user_type === 'freelancer';
    }

    this.proposalForm = this.fb.group({
      valor: ['', [Validators.required, Validators.min(1)]],
      mensagem_proposta: ['', Validators.required]
    });
  }

  loadProjectDetails(id: string): void {
    this.projectService.getProjectById(id).subscribe({
      next: (data) => {
        this.project = data;
        if (this.currentUser && this.currentUser.company) {
          this.isOwner = this.currentUser.company.id === this.project?.company_id;
        }
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        this.feedbackMessage = "Ocorreu um erro ao carregar o projeto.";
      }
    });
  }

  onProposalSubmit(): void {
    if (this.proposalForm.invalid) {
      this.feedbackMessage = "Por favor, preencha todos os campos da proposta.";
      return;
    }
    if (!this.isFreelancer || !this.currentUser?.freelancer?.id) {
      this.feedbackMessage = "Você precisa estar logado como freelancer para enviar uma proposta.";
      return;
    }
    const proposalData = {
      ...this.proposalForm.value,
      project_id: this.project.id,
      freelancer_id: this.currentUser.freelancer.id
    };
    this.proposalService.createProposal(proposalData).subscribe({
      next: (newProposal) => {
        this.feedbackMessage = 'Proposta enviada com sucesso!';
        if (this.project && this.project.proposals) {
            this.project.proposals.push(newProposal);
        }
        this.proposalForm.reset();
      },
      error: (err) => {
          this.feedbackMessage = 'Erro ao enviar proposta. Tente novamente.';
      }
    });
  }
}