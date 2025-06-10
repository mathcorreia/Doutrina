import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProjectListComponent } from './pages/project-list/project-list.component';
import { ProjectCreateComponent } from './pages/project-create/project-create.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    // Rota para listar projetos
    { path: 'projects', component: ProjectListComponent },
    // Rota para o formulário de criação
    { path: 'projects/create', component: ProjectCreateComponent },
    // Você pode adicionar a rota de detalhes depois:
    // { path: 'projects/:id', component: ProjectDetailComponent },

    // Redireciona para a home se a rota não existir
    { path: '**', redirectTo: '', pathMatch: 'full' }
];