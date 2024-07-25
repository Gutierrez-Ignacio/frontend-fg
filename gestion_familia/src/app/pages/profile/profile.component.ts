import { Component, signal, OnInit } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { JsonPipe, NgIf } from '@angular/common';
import { UserService } from '../../services/user/user.service';
import { HostListener } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet, Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    NavbarComponent,
    NgIf,
    RouterOutlet,
    ReactiveFormsModule,
    JsonPipe
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  userId!: number;
  esteUser: any;
  cambiarContrasena: boolean = false;
  rutaText: boolean = true;

  perfilForm = signal<FormGroup>(
    new FormGroup(
      {
        nombre: new FormControl('', Validators.required),
        apellido: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.required, Validators.email]),
        password1: new FormControl('', Validators.required),
        password2: new FormControl('', Validators.required)
      }
    )
  );

  constructor(
    private userService: UserService,
  ) {}


  ngOnInit(): void {
    this.actualizarAnchoPantalla();
    
    this.userId = +localStorage.getItem('id')! || 0;
    
    this.userService.getUser(this.userId).subscribe(
      (data) => {
        this.esteUser = data;
        console.log('Usuario obtenido:', this.esteUser);

        this.perfilForm().patchValue({
          nombre: this.esteUser.nombre,
          apellido: this.esteUser.apellido,
          email: this.esteUser.email
        });
      },
      (error) => {
        console.error('Error al obtener el usuario:', error);
      }
    );

    const checkbox: HTMLInputElement | null = document.getElementById('myCheckboxpassword') as HTMLInputElement;

    if (checkbox) {
      checkbox.addEventListener('change', () => {
        this.cambiarContrasena = checkbox.checked;
        console.log('Valor actual del checkbox:', checkbox.checked);
        this.togglePasswordFields();
      });
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.actualizarAnchoPantalla();
  }

  private actualizarAnchoPantalla() {
    if (window.innerWidth < 450) {
      this.rutaText = false
    } else {
      this.rutaText = true
    }
  }

  togglePasswordFields() {
    const password1Control = this.perfilForm().get('password1');
    const password2Control = this.perfilForm().get('password2');
  
    if (password1Control && password2Control) {
      if (this.cambiarContrasena) {
        password1Control.enable();
        password2Control.enable();
      } else {
        password1Control.disable();
        password2Control.disable();
      }
    }
  }

  submit() {
    if (this.perfilForm().value.password1 === this.perfilForm().value.password2 && this.perfilForm().value.password1) {
      const password = this.perfilForm().value.password1
      this.perfilForm().value.plain_password = password
      this.userService.updateUser(this.userId, this.perfilForm().value).subscribe(
        (data) => {
          console.log('Usuario actualizado:', data);
          },
          (error) => {
          console.error('Error al actualizar el usuario:', error);  
        }
      );
    } else {
      this.userService.updateUser(this.userId, this.perfilForm().value).subscribe(
        (data) => {
          console.log('Usuario actualizado:', data);
        },
        (error) => {
          console.error('Error al actualizar el usuario:', error);
        }
      );
    }
  }
}
