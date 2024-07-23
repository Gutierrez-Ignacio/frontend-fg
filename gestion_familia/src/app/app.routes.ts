import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { UserComponent } from './pages/user/user.component';
import { OperationsComponent } from './pages/operations/operations.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { FilesComponent } from './pages/files/files.component';
import { NewPasswordComponent } from './pages/new-password/new-password.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';

export const routes: Routes = [ 
    { path: 'login', component: LoginComponent },
    { path: 'vPerfil', component: ProfileComponent },
    { path: 'vUsuario', component: UserComponent },
    { path: 'vOperaciones', component: OperationsComponent },
    { path: 'vCategorias', component: CategoriesComponent },
    { path: 'vArchivos', component: FilesComponent },
    { path: 'vNewPassword', component: NewPasswordComponent },
    { path: 'vResetPassword', component: ResetPasswordComponent },
    { path: 'vError', component: ErrorPageComponent },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: '**', redirectTo: 'vError' }
];
