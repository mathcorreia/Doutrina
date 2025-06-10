import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ProjectService } from '../../services/project.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-project-create',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule], // Módulo para formulários reativos
  templateUrl: './project-create.component.html',
  styleUrl: './project-create.component.css'
})
export class ProjectCreateComponent {
  projectForm: FormGroup;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    private router: Router
  ) {
    this.projectForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(255)]],
      description: ['', Validators.required],
      budget: ['', [Validators.required, Validators.min(0)]],
      // IMPORTANTE: Este campo deve ser preenchido com o ID da empresa logada
      company_id: [1, Validators.required] // Usando '1' como exemplo
    });
  }

  onSubmit(): void {
    if (this.projectForm.valid) {
      this.projectService.createProject(this.projectForm.value).subscribe({
        next: (response) => {
          this.successMessage = 'Projeto criado com sucesso!';
          this.errorMessage = null;
          // Redireciona para a lista de projetos após 2 segundos
          setTimeout(() => this.router.navigate(['/projects']), 2000);
        },
        error: (err) => {
          this.errorMessage = 'Erro ao criar o projeto. Verifique os dados e tente novamente.';
          this.successMessage = null;
          console.error(err);
        }
      });
    }
  }
}