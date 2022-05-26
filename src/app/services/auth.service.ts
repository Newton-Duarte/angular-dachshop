import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Security } from '../utils/security.util';

type CreateUserData = {
  name: string;
  email: string;
  password: string;
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

  create(data: CreateUserData) {
    return this.http.post(this.url + 'accounts', data);
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
