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
  isLoading: boolean = false;

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
      this.isLoading = true;
      this.authService.resetPassword(this.mailForm().value).subscribe(
        response => {
          console.log('Response:', response);
          this.isLoading = false;
          this.goLogin()
        },
        error => {
          console.error('Error:', error);
          this.isLoading = false;
          this.goLogin()
        }
      );  
    }
  } 
  
  goLogin() {
    this.router.navigateByUrl('login');
  }

}
