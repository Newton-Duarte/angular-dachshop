import { Component, OnInit } from '@angular/core';
import { Pet } from 'src/app/models/pet.model';
import { PetService } from 'src/app/services/pet.service';

@Component({
  selector: 'app-pets-page',
  templateUrl: './pets-page.component.html',
  styleUrls: ['./pets-page.component.css']
})
export class PetsPageComponent implements OnInit {
  pets: Pet[] = [];

  constructor(private petsService: PetService) { }

  ngOnInit(): void {
    this.loadPets();
  }

  loadPets() {
    this.petsService.getPets().subscribe(
      (data) => this.pets = data,
      (error) => console.log(error),
    )
  }

}
