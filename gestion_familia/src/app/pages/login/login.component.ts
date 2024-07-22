import { JsonPipe, NgIf } from '@angular/common';
import { Component, signal } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    NgIf,
    RouterOutlet,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm = signal<FormGroup>(
    new FormGroup(
      {
        email: new FormControl('familiagutisistema@gmail.com', [Validators.required, Validators.email]),
        password: new FormControl('IBexkXSV', Validators.required)
      }
    )
  );

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login(dataLogin:any = {}) {
    console.log('Comprobando Credenciales')
    this.authService.login(dataLogin).subscribe({
      next: (rta: any) => {
        localStorage.setItem('token', rta.access_token);

        const decodedToken: any = jwtDecode(rta.access_token);
        console.log(decodedToken.id)
        localStorage.setItem('id', decodedToken.id);
        localStorage.setItem('nombre', decodedToken.nombre);
        localStorage.setItem('apellido', decodedToken.apellido);

        this.router.navigateByUrl('vOperaciones');
        console.log(decodedToken)
      }, error: (error) => {
        localStorage.removeItem('token');
        localStorage.removeItem('id');
        localStorage.removeItem('nombre');
        localStorage.removeItem('apellido');
      }, complete: () => {
        console.log('Finalizo')
      }
    })
  }

  submit() {
    if (this.loginForm().valid) {
      this.login(this.loginForm().value);
    } else {
      alert('Formulario inválido');
    }
  }

  resetpassword() {
    this.router.navigateByUrl('vResetPassword');
  }
}