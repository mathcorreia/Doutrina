import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProjectService } from '../../services/project.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-project-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.css']
})
export class ProjectCreateComponent implements OnInit {
  projectForm: FormGroup;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    private authService: AuthService,
    private router: Router
  ) {
    // CORREÇÃO PRINCIPAL: Adicionando o controle 'skills' ao formulário
    this.projectForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      budget: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      skills: ['', Validators.required] // <-- ESTA LINHA CORRIGE O ERRO DO ANGULAR
    });
  }

  ngOnInit(): void {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser || currentUser.user_type !== 'company') {
      this.errorMessage = 'Você deve estar logado como uma empresa para acessar esta página.';
    }
  }

  onSubmit(): void {
    this.errorMessage = null;
    this.successMessage = null;

    if (this.projectForm.invalid) {
      this.projectForm.markAllAsTouched();
      this.errorMessage = 'Por favor, preencha todos os campos corretamente.';
      return;
    }

    const projectData = this.projectForm.value;

    this.projectService.createProject(projectData).subscribe({
      next: (response) => {
        this.successMessage = 'Projeto criado com sucesso! Redirecionando...';
        this.projectForm.reset();
        
        setTimeout(() => {
          this.router.navigate(['/projects', response.id]);
        }, 2000);
      },
      error: (err) => {
        console.error("Resposta completa do erro:", err);
        this.errorMessage = err.error?.message || 'Ocorreu um erro inesperado. Tente novamente.';
      }
    });
  }
}