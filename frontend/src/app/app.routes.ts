import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { StudentListComponent } from './pages/student-list/student-list';
import { StudentFormComponent } from './pages/student-form/student-form';
import { LoginComponent } from './pages/login/login';
import { RegisterComponent } from './pages/register/register';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'students', component: StudentListComponent },
  { path: 'add-student', component: StudentFormComponent, canActivate: [authGuard] },
  { path: 'edit-student/:id', component: StudentFormComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', redirectTo: '' }
];
