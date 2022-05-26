import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Security } from '../utils/security.util';

type User = {
  id: number;
  email: string;
  password: string;
  token: string;
};

type AuthenticateData = {
  email: string;
  password: string;
};

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {
  public url = environment.BASE_URL;

  constructor(private http: HttpClient, private router: Router) { }

  canActivate() {
    const token = Security.getToken();

    if (!token) {
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }

  public composeHeaders() {
    const token = Security.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token as string}`);
    return headers;
  }

  authenticate(data: AuthenticateData) {
    const user = this.usersInMemory.find((user) => user.email === data.email);

    if (!user) {
      throw new Error('Usuário ou senha inválidos');
    }

    this.user = user;
    this.token = user.token;

    localStorage.setItem('dachshop.token', user.token);
  }

  refreshToken() {
    const token = localStorage.getItem('dachshop.token');

    if (!token) {
      throw new Error('Token inválido');
    }

    const user = this.usersInMemory.find((user) => user.token === token);

    if (!user) {
      throw new Error('Usuário não existe');
    }

    this.user = user;
    this.token = user.token;

    localStorage.setItem('dachshop.token', user.token);
  }
}
