import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProjectService } from '../../services/project.service';
import { ProposalService } from '../../services/proposal.service';
import { AuthService } from '../../services/auth.service';
import { RouterLink } from '@angular/router'; 
@Component({
  selector: 'app-project-detail',
  standalone: true,
  // Adicionei RouterLink aos imports para o botão de editar no HTML
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
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
    private fb: FormBuilder,
    // 2. A CORREÇÃO É ADICIONAR O ROUTER AQUI
    private router: Router
  ) {}

  onDeleteProject(): void {
    if (!this.project) return;

    const confirmation = confirm('Tem certeza que deseja deletar este projeto? Esta ação não pode ser desfeita.');

    if (confirmation) {
      this.projectService.deleteProject(this.project.id).subscribe({
        next: () => {
          alert('Projeto deletado com sucesso.');
          // 3. AGORA ESTA LINHA FUNCIONARÁ
          this.router.navigate(['/projects']);
        },
        error: (err) => {
          this.feedbackMessage = 'Erro ao deletar o projeto.';
          console.error(err);
        }
      });
    }
  }

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.isFreelancer = this.currentUser?.user_type === 'freelancer';

    const projectId = this.route.snapshot.paramMap.get('id');
    if (projectId) {
      this.loadProjectDetails(projectId);
    } else {
      this.isLoading = false;
      this.feedbackMessage = "ID do projeto não encontrado.";
    }

    this.proposalForm = this.fb.group({
      valor: ['', [Validators.required, Validators.min(1)]],
      mensagem_proposta: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  loadProjectDetails(id: string): void {
    this.projectService.getProjectById(id).subscribe({
      next: (data) => {
        this.project = data;
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

    // Garante que o ID do freelancer seja enviado na proposta
    const proposalData = {
      ...this.proposalForm.value,
      project_id: this.project.id,
      freelancer_id: this.currentUser?.freelancer?.id
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
  onEditProject(): void {
    if (this.project && this.isOwner) {
      // Redireciona para a página de edição do projeto
      this.router.navigate([`/projects/${this.project.id}/edit`]);
    } else {
      this.feedbackMessage = 'Você não tem permissão para editar este projeto.';
    }
  }
}