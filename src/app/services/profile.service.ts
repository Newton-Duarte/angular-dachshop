import { Injectable } from '@angular/core';
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
