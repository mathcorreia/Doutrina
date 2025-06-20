import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // Importe o RouterModule

@Component({
  selector: 'app-company-projects',
  standalone: true,
  imports: [CommonModule, RouterModule], // Adicione CommonModule e RouterModule
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
      next: (data) => {
        this.projects = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Ocorreu um erro ao carregar seus projetos.';
        this.isLoading = false;
        console.error(err);
      }
    });
  }
}