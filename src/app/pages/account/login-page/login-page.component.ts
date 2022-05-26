import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { Security } from 'src/app/utils/security.util';
import { CustomValidator } from 'src/app/validators/custom.validator';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  public form!: FormGroup;
  public loading = false;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.form = this.formBuilder.group({
      email: ['', Validators.compose([
        CustomValidator.isEmail,
        Validators.required
      ])],
      password: ['', Validators.compose([
        Validators.minLength(6),
        Validators.required,
      ])]
    });
  }

  ngOnInit(): void {
    if (Security.hasToken()) {
      this.loading = true;
      this
        .authService
        .refreshToken()
        .subscribe(
          (data: any) => {
            this.loading = false;
            this.toastr.success('Bem-vindo', 'Sucesso!');
            this.setUser(data.user, data.token);
          },
          (error) => {
            Security.clear();
            console.log(error);
            this.toastr.error('Ocorreu um erro ao tentar fazer login', 'Erro!');
            this.loading = false;
          },
          () => {
            this.loading = false;
          }
        );
    }
  }

  onSubmit(): void {
    this.loading = true;
    this
      .authService
      .authenticate(this.form.value)
      .subscribe(
        (data: any) => {
          this.setUser(data.user, data.token);
          this.loading = false;
        },
        (error) => {
          console.log(error);
          this.loading = false;
        }
      );
  }

  setUser(user: any, token: any) {
    Security.set(user, token);
    this.router.navigate(['/']);
  }

}
