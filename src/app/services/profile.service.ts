import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  public url = environment.BASE_URL;

  constructor(private authService: AuthService) { }

  getProfile() {
    return this.authService.getCurrentUser();
  }

  updateProfile(userData: UserData) {
    return this.http.put(this.url + 'accounts/1', userData);
  }
}
