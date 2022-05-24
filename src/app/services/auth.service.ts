import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public url = environment.BASE_URL + 'authenticate';

  constructor(private http: HttpClient) { }

  authenticate(data) {
    return this.http.post(this.url, data);
  }
}
