import { NgIf } from '@angular/common';
import { Component, signal} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    NgIf,
    RouterOutlet,
    ReactiveFormsModule
  ],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})  
export class ResetPasswordComponent {

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  mailForm = signal<FormGroup>(
    new FormGroup(
      {
        email: new FormControl('familiagutisistema@gmail.com', [Validators.required, Validators.email]),
      }
    )
  );

  submit() {
    if (this.mailForm().valid) {
      console.log(this.mailForm().value);
      this.authService.resetPassword(this.mailForm().value).subscribe(
        response => {
          console.log('Response:', response);
          this.goLogin()
        },
        error => {
          console.error('Error:', error);
        }
      );
      this.goLogin()
    }
  } 
  
  goLogin() {
    this.router.navigateByUrl('login');
  }

}
