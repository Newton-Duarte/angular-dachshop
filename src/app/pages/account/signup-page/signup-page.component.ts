import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { CustomValidator } from 'src/app/validators/custom.validator';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css']
})
export class SignupPageComponent implements OnInit {
  public form!: FormGroup;
  public loading = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder,
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
      ])],
      password: ['', Validators.compose([
        Validators.minLength(6),
        Validators.maxLength(20),
        Validators.required
      ])]
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.loading = true;
    this
      .authService
      .create(this.form.value)
      .subscribe(
        (data: any) => {
          this.loading = false;
          this.toastr.success('Cadastro realizado com sucesso!', 'Sucesso!');
          this.router.navigate(['/login']);
        },
        (error) => {
          console.log(error);
          this.toastr.error('Ocorreu um erro ao tentar criar o usuário', 'Erro!');
          this.loading = false;
        }
      );
  }

}
