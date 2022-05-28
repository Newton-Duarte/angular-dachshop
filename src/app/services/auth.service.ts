import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';
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

type AuthData = {
  user: User;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {
  public url = environment.BASE_URL;
  users: User[] = [
    {
      id: 1,
      name: "Dachshop User",
      email: "dachshop@dachshop.com",
    }
  ];

  authData = {
    user: {
      id: 1,
      name: "Dachshop User",
      email: "dachshop@dachshop.com"
    },
    token: "123456789"
  };

  constructor(private router: Router) { }

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
    const id = this.users[this.users.length - 1].id + 1;

    this.users.push({
      id,
      ...data,
    });

    return new Observable((observer) => {
      setTimeout(() => observer.next('Cadastro realizado com sucesso!'), 400);
    })
  }

  authenticate(data: AuthenticateData): Observable<AuthData> {
    const user = this.getUserByEmail(data.email);

    return new Observable((observer) => {
      setTimeout(() => {
        if (user) {
          this.authData.user = { ...user };
          observer.next(this.authData);
        } else {
          observer.error('Usuário ou senha inválidos');
        }
      }, 400);
    })
  }

  refreshToken(): Observable<string> {
    return new Observable((observer) => {
      setTimeout(() => observer.next('Token de autorização atualizado!'), 400);
    })
  }

  resetPassword(email: string): Observable<string> {
    return new Observable((observer) => {
      setTimeout(() => observer.next('Um e-mail foi enviado com as instruções para recuperar sua senha'), 400);
    })
  }

  getUserProfile(id: number): Observable<User> {
    const user = this.getUserById(id);

    return new Observable((observer) => {
      setTimeout(() => {
        if (user) {
          observer.next(user);
        } else {
          observer.error('Ocorreu um erro ao tentar buscar o perfil');
        }
      }, 400);
    })
  }

  updateUserProfile(name: string, email: string): Observable<User> {
    this.authData.user.name = name;
    this.authData.user.email = email;

    return new Observable((observer) => {
      setTimeout(() => observer.next(this.authData.user), 400);
    })
  }

  getCurrentUser() {
    return new Observable((observer) => {
      setTimeout(() => observer.next({ ...this.authData.user }), 400);
    })
  }

  getUserById(id: number) {
    return this.users.find((user) => user.id === id);
  }

  resetPassword(email: string) {
    return this.http.get(this.url + 'reset-password');
  }
}
