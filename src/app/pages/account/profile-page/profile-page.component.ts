import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProfileService } from 'src/app/services/profile.service';
import { Security } from 'src/app/utils/security.util';
import { CustomValidator } from 'src/app/validators/custom.validator';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {
  public form!: FormGroup;
  public loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private profileService: ProfileService,
    private toastr: ToastrService
  ) {
    this.form = this.formBuilder.group({
      name: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(80),
        Validators.required
      ])],
      email: ['', Validators.compose([
        Validators.required,
        CustomValidator.isEmail
      ])]
    });
  }

  ngOnInit(): void {
    this.loading = true;
    this
      .profileService
      .getProfile()
      .subscribe(
        (data: any) => {
          this.form.controls['name'].setValue(data.name);
          this.form.controls['email'].setValue(data.email);
          this.loading = false;
        },
        (error) => {
          this.toastr.error('Ocorreu um erro ao tentar buscar o perfil', 'Erro');
          this.loading = false;
        }
      )
  }

  onSubmit() {
    this.loading = true;
    const { name, email } = this.form.value;

    this
      .profileService
      .updateProfile(name, email)
      .subscribe(
        (user) => {
          this.toastr.success('Perfil atualizado com sucesso', 'Sucesso');
          Security.setUser(user);
          this.loading = false;
        },
        (error) => {
          this.toastr.error('Ocorreu um erro ao tentar atualizar o perfil', 'Erro');
          this.loading = false;
        }
      );
  }

}
