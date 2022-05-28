import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pet } from '../models/pet.model';

type PetData = {
  name: string;
  description: string;
  image: string;
};

@Injectable({
  providedIn: 'root'
})
export class PetService {
  pets: Pet[] = [
    {
      id: 1,
      name: "Felicidade",
      description: "Linda pinscher de cor preta e marrom",
      image: "https://place-puppy.com/251x251"
    },
    {
      id: 2,
      name: "Princesa",
      description: "Linda pinscher",
      image: "https://place-puppy.com/252x252"
    },
    {
      id: 3,
      name: "Cherry",
      description: "Linda cachorrinha muito esperta",
      image: "https://place-puppy.com/253x253"
    }
  ]

  constructor(private http: HttpClient) { }

  getPets(): Observable<Pet[]> {
    return new Observable((observer) => {
      setTimeout(() => observer.next(this.pets), 400);
    });
  }

  createPet(petData: PetData): Observable<string> {
    const id = this.pets[this.pets.length - 1]?.id + 1 || 1;

    this.pets.push({
      id,
      ...petData,
    });

    return new Observable((observer) => {
      setTimeout(() => observer.next('Pet adicionado com sucesso!'), 400);
    });
  }

  removePet(pet: Pet): Observable<string> {
    const petIndex = this.pets.indexOf(pet);

    return new Observable((observer) => {
      setTimeout(() => {
        this.pets.splice(petIndex, 1);

        observer.next('Pet removido com sucesso');
      }, 400);
    })
  }
}
