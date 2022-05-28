import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Pet } from 'src/app/models/pet.model';
import { PetService } from 'src/app/services/pet.service';

@Component({
  selector: 'app-pet-card',
  templateUrl: './pet-card.component.html',
  styleUrls: ['./pet-card.component.css']
})
export class PetCardComponent implements OnInit {
  @Input() pet!: Pet;
  loading = false;

  constructor(private petService: PetService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  removePet() {
    this.loading = true;

    this
      .petService
      .removePet(this.pet)
      .subscribe(
        (message) => {
          this.loading = false;
          this.toastr.success(message, 'Sucesso');
        },
        (error) => {
          this.loading = false;
          this.toastr.error('Ocorreu um erro ao tentar remover o pet', 'Erro');
        }
      )
  }

}
