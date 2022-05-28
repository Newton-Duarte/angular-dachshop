import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PetService } from 'src/app/services/pet.service';

@Component({
  selector: 'app-add-pet',
  templateUrl: './add-pet.component.html',
  styleUrls: ['./add-pet.component.css']
})
export class AddPetComponent implements OnInit {
  public form!: FormGroup;
  public loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private petService: PetService
  ) {
    this.form = this.formBuilder.group({
      name: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.required,
      ])],
      description: ['', Validators.compose([
        Validators.minLength(5),
        Validators.maxLength(80),
        Validators.required
      ])],
      image: ['']
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.loading = true;

    // This will create random sizes between 250 and 260
    // 250x250 251x255
    // So the images from this website can change
    // Each size has a different image
    const width = Math.floor(Math.random() * (260 - 250) + 250);
    const height = Math.floor(Math.random() * (260 - 250) + 250);

    const image = `https://place-puppy.com/${width}x${height}`;

    this
      .petService
      .createPet({
        ...this.form.value,
        image
      }).subscribe(
        (message) => {
          this.toastr.success(message, 'Sucesso');
          this.form.reset();
          this.loading = false;
        },
        (error) => {
          this.loading = false;
          this.toastr.error('Ocorreu um erro ao adicionar o pet', 'Erro');
        }
      )
  }

}
