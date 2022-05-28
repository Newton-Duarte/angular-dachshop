import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

type UserData = {
  id: number;
  name: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  public url = environment.BASE_URL;

  constructor(private authService: AuthService) { }

  getProfile() {
    return this.http.get(this.url + 'accounts/1');
  }

  updateProfile(userData: UserData) {
    return this.http.put(this.url + 'accounts/1', userData);
  }
}
