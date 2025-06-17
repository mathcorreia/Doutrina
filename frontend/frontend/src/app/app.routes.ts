import { Routes } from '@angular/router';

// Importação dos componentes principais e de páginas
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupSelectionComponent } from './pages/signup-selection/signup-selection.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ProjectListComponent } from './pages/project-list/project-list.component';
import { ProjectCreateComponent } from './pages/project-create/project-create.component';
import { ProjectDetailComponent } from './pages/project-detail/project-detail.component'; // O componente que estava dando erro

// Importação do Guard de rota
import { companyGuard } from './guards/company.guard';

export const routes: Routes = [
    // Rota principal
    { path: '', component: HomeComponent },

    // Rotas de Autenticação
    { path: 'login', component: LoginComponent },
    { path: 'selecao-cadastro', component: SignupSelectionComponent },
    { path: 'signup/:type', component: SignupComponent },

    // Rotas de Projetos
    { path: 'projects', component: ProjectListComponent },
    {
      path: 'projects/create',
      component: ProjectCreateComponent,
      canActivate: [companyGuard] // Rota protegida para empresas
    },
    {
      path: 'projects/:id', // Rota para detalhes de um projeto específico
      component: ProjectDetailComponent
    },

    // Rota curinga - redireciona para a home se a URL não for encontrada
    // Deve ser sempre a última rota da lista
    { path: '**', redirectTo: '', pathMatch: 'full' }
];

