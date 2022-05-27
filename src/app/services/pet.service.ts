import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Pet } from '../models/pet.model';

@Injectable({
  providedIn: 'root'
})
export class PetService {
  url = environment.BASE_URL + 'pets';

  constructor(private http: HttpClient) { }

  getPets() {
    return this.http.get<Pet[]>(this.url);
  }
}
