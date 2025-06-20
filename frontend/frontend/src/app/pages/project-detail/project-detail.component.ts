import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    private projectService: ProjectService,
    private proposalService: ProposalService,
    public authService: AuthService, 
    private fb: FormBuilder
  )  {}

  ngOnInit(): void {
    // Busca o usuário logado
    this.currentUser = this.authService.getCurrentUser();

    // Define o tipo de usuário (freelancer ou não)
    this.isFreelancer = this.currentUser?.user_type === 'freelancer';

    // Pega o ID do projeto da URL e carrega os detalhes
    const projectId = this.route.snapshot.paramMap.get('id');
    if (projectId) {
      this.loadProjectDetails(projectId);
    } else {
      this.isLoading = false;
      this.feedbackMessage = "ID do projeto não encontrado.";
    }

    // Inicializa o formulário de proposta
    this.proposalForm = this.fb.group({
      valor: ['', [Validators.required, Validators.min(1)]],
      mensagem_proposta: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  loadProjectDetails(id: string): void {
    this.projectService.getProjectById(id).subscribe({
      next: (data) => {
        this.project = data;

        // LÓGICA CORRIGIDA: Define se é o dono do projeto
        // Reseta para 'false' e só define como 'true' se a condição for atendida
        this.isOwner = false;
        if (this.currentUser?.user_type === 'company' && this.currentUser.company?.id === this.project?.company_id) {
          this.isOwner = true;
        }
        
        this.isLoading = false;
      },
      error: (err: any) => {
        this.isLoading = false;
        this.feedbackMessage = "Ocorreu um erro ao carregar o projeto.";
        console.error(err);
      }
    });
  }

  onProposalSubmit(): void {
    this.feedbackMessage = null;
    if (this.proposalForm.invalid) {
      this.feedbackMessage = "Por favor, preencha todos os campos da proposta corretamente.";
      return;
    }

    const proposalData = {
      ...this.proposalForm.value,
      project_id: this.project.id
    };

    this.proposalService.createProposal(proposalData).subscribe({
      next: (newProposal: any) => {
        this.feedbackMessage = 'Proposta enviada com sucesso!';
        if (this.project.proposals) {
          this.project.proposals.push(newProposal);
        } else {
          this.project.proposals = [newProposal];
        }
        this.proposalForm.reset();
      },
      error: (err: any) => {
        this.feedbackMessage = err.error?.message || 'Erro ao enviar proposta.';
        console.error(err);
      }
    });
  }
}