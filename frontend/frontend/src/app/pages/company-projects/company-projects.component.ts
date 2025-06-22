import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-company-projects',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './company-projects.component.html',
  styleUrls: ['./company-projects.component.css']
})
export class CompanyProjectsComponent implements OnInit {
  projects: any[] = [];
  isLoading = true;
  errorMessage: string | null = null;

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    this.projectService.getMyProjects().subscribe({
      next: (data: any[]) => {
        this.projects = data;
        this.isLoading = false;
      },
      error: (err: any) => {
        this.isLoading = false;
        // Se o backend enviar uma mensagem de erro específica (como o 403), exibi-la.
        if (err.error && err.error.message) {
            this.errorMessage = `Erro: ${err.error.message}`;
        } else {
            this.errorMessage = 'Ocorreu um erro ao carregar seus projetos.';
        }
        console.error('Erro detalhado da API:', err);
      }
    });
  }
}