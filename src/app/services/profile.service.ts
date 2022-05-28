import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  constructor(private authService: AuthService) { }

  getProfile() {
    return this.authService.getCurrentUser();
  }

  updateProfile(name: string, email: string) {
    return this.authService.updateUserProfile(name, email);
  }
}
