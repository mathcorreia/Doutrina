import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-project-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css']
})
export class ProjectEditComponent implements OnInit {
  projectForm!: FormGroup;
  projectId: string | null = null;
  isLoading = true;
  feedbackMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.projectId = this.route.snapshot.paramMap.get('id');

    this.projectForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      budget: ['', [Validators.required, Validators.min(0)]],
      status: ['aberto', Validators.required]
    });

    if (this.projectId) {
      this.projectService.getProjectById(this.projectId).subscribe(project => {
        // Preenche o formulário com os dados do projeto existente
        this.projectForm.patchValue(project);
        this.isLoading = false;
      });
    } else {
      this.isLoading = false;
      this.feedbackMessage = "ID do projeto não encontrado.";
    }
  }

  onSubmit(): void {
    if (this.projectForm.invalid || !this.projectId) {
      return;
    }

    this.projectService.updateProject(this.projectId, this.projectForm.value).subscribe({
      next: () => {
        alert('Projeto atualizado com sucesso!');
        this.router.navigate(['/projects', this.projectId]);
      },
      error: (err) => {
        this.feedbackMessage = 'Erro ao atualizar o projeto.';
        console.error(err);
      }
    });
  }
}