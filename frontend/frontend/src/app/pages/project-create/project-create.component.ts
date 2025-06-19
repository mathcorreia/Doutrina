import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service'; // Supondo que você use um ApiService

@Component({
  selector: 'app-project-create',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule // Módulo essencial para formulários
  ],
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.css']
})
export class ProjectCreateComponent implements OnInit {
  projectForm!: FormGroup;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.projectForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(255)]],
      description: ['', Validators.required],
      budget: ['', [Validators.required, Validators.min(1)]],
      skills: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.projectForm.invalid) {
      this.projectForm.markAllAsTouched();
      return;
    }

    // Supondo que você tenha um método no seu ApiService para criar projetos
    this.apiService.post('/projects', this.projectForm.value).subscribe({
      next: (response) => {
        this.successMessage = 'Projeto criado com sucesso!';
        this.errorMessage = null;
        // Redireciona para a página do projeto criado ou para a lista de projetos
        setTimeout(() => this.router.navigate(['/projects']), 2000);
      },
      error: (err) => {
        this.errorMessage = 'Ocorreu um erro ao criar o projeto. Tente novamente.';
        this.successMessage = null;
        console.error(err);
      }
    });
  }
}