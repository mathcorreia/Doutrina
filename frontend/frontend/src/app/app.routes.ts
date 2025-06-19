import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupSelectionComponent } from './pages/signup-selection/signup-selection.component';
import { SignupComponent } from './pages/signup/signup.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProjectListComponent } from './pages/project-list/project-list.component';
import { ProjectCreateComponent } from './pages/project-create/project-create.component';
import { ProjectDetailComponent } from './pages/project-detail/project-detail.component';
import { authGuard } from './guards/auth.guard';
import { companyGuard } from './guards/company.guard';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'selecao-cadastro', component: SignupSelectionComponent },
    { path: 'signup/:type', component: SignupComponent },
    
    // Rota da Dashboard, simples e protegida
    { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },

    { path: 'projects', component: ProjectListComponent },
    { path: 'projects/create', component: ProjectCreateComponent, canActivate: [authGuard, companyGuard] },
    { path: 'projects/:id', component: ProjectDetailComponent },
    
    { path: '**', redirectTo: '', pathMatch: 'full' }
];