import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pet } from '../models/pet.model';

@Injectable({
  providedIn: 'root'
})
export class PetService {
  url = environment.BASE_URL + 'pets';

  pets: Pet[] = [
    {
      id: 1,
      name: "Felicidade",
      description: "Linda pinscher de cor preta e marrom",
      image: "https://place-puppy.com/250x250"
    },
    {
      id: 2,
      name: "Princesa",
      description: "Linda pinscher",
      image: "https://place-puppy.com/251x251"
    },
    {
      id: 3,
      name: "Cherry",
      description: "Linda cachorrinha muito esperta",
      image: "https://place-puppy.com/252x252"
    }
  ]

  constructor(private http: HttpClient) { }

  getPets(): Observable<Pet[]> {
    return new Observable((observer) => {
      setTimeout(() => observer.next(this.pets), 400);
    });
  }
}
