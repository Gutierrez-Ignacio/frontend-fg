import { Component, OnInit, HostListener } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    NgIf,
    RouterLink
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  rutaText: boolean = true;

  rutaUsuario: boolean = true;
  rutaOperacion: boolean = true;
  rutaCategoria: boolean = true;
  rutaArchivo: boolean = true;

  usuarioNombre: any;
  usuarioApellido: any;

  constructor(
    private authService: AuthService,
    private activatedRoute: ActivatedRoute
  ) { 
    this.activatedRoute.url.subscribe(segments => {
      const rutaActual = segments.map(segment => segment.path).join('/');
      this.rutaUsuario = rutaActual !== 'vUsuario';
      this.rutaOperacion = rutaActual !== 'vOperaciones'
      this.rutaCategoria = rutaActual !== 'vCategorias'
      this.rutaArchivo = rutaActual !== 'vArchivos'
    });
    
    this.usuarioNombre = localStorage.getItem('nombre');
    this.usuarioApellido = localStorage.getItem('apellido');
  }

  ngOnInit(): void {
    this.actualizarAnchoPantalla();
  }

  cerrarSesion() {
    this.authService.logout();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.actualizarAnchoPantalla();
  }

  private actualizarAnchoPantalla() {
    if (window.innerWidth < 865) {
      this.rutaText = false
    } else {
      this.rutaText = true
    }
  }
}
