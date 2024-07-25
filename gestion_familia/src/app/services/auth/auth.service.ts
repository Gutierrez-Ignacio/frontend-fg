import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  url = '/api'
  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) { }

  login(dataLogin: any): Observable<any> {
    return this.httpClient.post(this.url + '/auth/login', dataLogin).pipe(take(1));
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('nombre');
    localStorage.removeItem('apellido');
    this.router.navigateByUrl('login');
  }

  resetPassword(userMail: any) {
    return this.httpClient.post(this.url + '/auth/reset-password', userMail);
  }

  confirmResetPassword(token: any, newPassword: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.httpClient.post(this.url + '/auth/reset-password/confirm', { token, new_password: newPassword }, { headers: headers });
  }

  changePassword(id: number, newPassword: string, token: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.put(this.url + '/auth/change-password/' + id,  { new_password: newPassword }, { headers: headers });
  }

}
