import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Pet } from 'src/app/models/pet.model';
import { PetService } from 'src/app/services/pet.service';

@Component({
  selector: 'app-pets-page',
  templateUrl: './pets-page.component.html',
  styleUrls: ['./pets-page.component.css']
})
export class PetsPageComponent implements OnInit {
  public loading = false;
  public pets$!: Observable<Pet[]>;

  constructor(private petsService: PetService) { }

  ngOnInit(): void {
    this.loadPets();
  }

  loadPets() {
    this.loading = true;

    setTimeout(() => {
      this.pets$ = this.petsService.getPets();
      this.loading = false;
    }, 600);
  }

}
