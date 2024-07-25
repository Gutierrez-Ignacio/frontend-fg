import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = '/api';
  constructor(
    private httpClient: HttpClient,
  ) { }

  getUserIDFromToken(): number | null {
    let auth_token = localStorage.getItem('token');
    if (auth_token) {
      const decodedToken: any = jwtDecode(auth_token);
      return decodedToken.id;
    }
    return null;
  }

  registerUser(userData: any) {
    const auth_token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });
    return this.httpClient.post(this.url + '/auth/register', userData, { headers: headers });
  }

  getUser(id: number) {
    const auth_token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });
    return this.httpClient.get(this.url + '/usuario/' + id, { headers: headers });
  }

  updateUser(id: number, userData: any) {
    const auth_token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });
    return this.httpClient.put(this.url + '/usuario/' + id, userData, { headers: headers });
  }
  deleteUser(id: number) {
    const auth_token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });
    return this.httpClient.delete(this.url + '/usuario/' + id, { headers: headers });
  }

  getUsers(page: number, perPage: number): Observable<any> {
    let auth_token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });
    const params = {
      page: page.toString(),
      per_page: perPage.toString(),
    };
    return this.httpClient.get(this.url + '/usuarios', { headers, params });
  }

  searchUsers(searchTerm: string): Observable<any> {
    let auth_token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    });
    const params: any = {
      search_term: searchTerm,
    };
    return this.httpClient.get(this.url + '/usuarios', { headers, params });
  }

}
