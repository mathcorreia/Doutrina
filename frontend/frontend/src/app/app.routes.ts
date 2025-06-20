import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupSelectionComponent } from './pages/signup-selection/signup-selection.component';
import { SignupComponent } from './pages/signup/signup.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProjectListComponent } from './pages/project-list/project-list.component';
import { ProjectCreateComponent } from './pages/project-create/project-create.component';
import { ProjectDetailComponent } from './pages/project-detail/project-detail.component';
import { CompanyProjectsComponent } from './pages/company-projects/company-projects.component';
import { FreelancerProposalsComponent } from './pages/freelancer-proposals/freelancer-proposals.component';
import { authGuard } from './guards/auth.guard';
import { companyGuard } from './guards/company.guard';
import { freelancerGuard } from './guards/freelancer.guard';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'selecao-cadastro', component: SignupSelectionComponent },
    { path: 'signup/:type', component: SignupComponent },
    
    { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
    
    { path: 'projects', component: ProjectListComponent },
    { path: 'projects/create', component: ProjectCreateComponent, canActivate: [authGuard, companyGuard] },
    { path: 'projects/:id', component: ProjectDetailComponent },

    // Rotas específicas de usuário com suas guardas
    { path: 'my-projects', component: CompanyProjectsComponent, canActivate: [authGuard, companyGuard] },
    { path: 'my-proposals', component: FreelancerProposalsComponent, canActivate: [authGuard, freelancerGuard] },

    // Rota Curinga (sempre por último)
    { path: '**', redirectTo: '', pathMatch: 'full' }
];