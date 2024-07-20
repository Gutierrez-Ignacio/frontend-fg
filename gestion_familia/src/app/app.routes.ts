import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { OperationsComponent } from './pages/operations/operations.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },   
    { path: 'vOperaciones', component: OperationsComponent}
];
