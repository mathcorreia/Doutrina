import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupSelectionComponent } from './pages/signup-selection/signup-selection.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ProjectListComponent } from './pages/project-list/project-list.component';
import { ProjectCreateComponent } from './pages/project-create/project-create.component';
import { ProjectDetailComponent } from './pages/project-detail/project-detail.component';
import { companyGuard } from './guards/company.guard';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'selecao-cadastro', component: SignupSelectionComponent },
    { path: 'signup/:type', component: SignupComponent },
    { path: 'projects', component: ProjectListComponent },
    { path: 'projects/create', component: ProjectCreateComponent, canActivate: [companyGuard] },
    { path: 'projects/:id', component: ProjectDetailComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];