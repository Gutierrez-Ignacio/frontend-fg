import { NgIf } from '@angular/common';
import { Component, signal, OnInit, OnDestroy} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet, Router, Route, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-new-password',
  standalone: true,
  imports: [
    NgIf,
    RouterOutlet,
    ReactiveFormsModule,
  ],
  templateUrl: './new-password.component.html',
  styleUrl: './new-password.component.css'
})
export class NewPasswordComponent {
  pass0k: string = '';
  resetToken: string = '';
  isLoading: boolean = false;
  
  private unsubscribe$ = new Subject<void>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {
    this.passwordForm().valueChanges.subscribe(() => {
      this.checkPasswords();
    }); 
  }

  passwordForm = signal<FormGroup>(
    new FormGroup(
      {
        password1: new FormControl('', Validators.required),
        password2: new FormControl('', Validators.required)
      }
    )
  );

  ngOnInit(): void { 
    this.route.queryParams.subscribe(params => {
      this.resetToken = params['token'] || '';
    });
  }

  checkPasswords() {
    const pass1 = this.passwordForm().get('password1')?.value;
    const pass2 = this.passwordForm().get('password2')?.value;
    this.pass0k = pass1 === pass2 ? 'yes' : 'no';
  }

  submit(): void {
    const password1 = this.passwordForm().value.password1;
    const password2 = this.passwordForm().value.password2;

    if (password1 === password2 && password1 !== "") {
      this.isLoading = true;
      this.authService.confirmResetPassword(this.resetToken, password1)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(response => {
          console.log('Contraseña restablecida exitosamente', response);
          this.isLoading = false;
          this.router.navigateByUrl('login');
        }, error => {
          console.error('Error al restablecer la contraseña', error);
          this.isLoading = false;
        });
    } else {
      alert("Ingrese una contraseña válida");
    }
  }


  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}