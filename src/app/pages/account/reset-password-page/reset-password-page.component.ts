import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { CustomValidator } from 'src/app/validators/custom.validator';

@Component({
  selector: 'app-reset-password-page',
  templateUrl: './reset-password-page.component.html',
  styleUrls: ['./reset-password-page.component.css']
})
export class ResetPasswordPageComponent implements OnInit {
  public form!: FormGroup;
  public loading = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {
    this.form = this.formBuilder.group({
      email: ['', Validators.compose([
        Validators.required,
        CustomValidator.isEmail
      ])]
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.loading = true;
    this
      .authService
      .resetPassword(this.form.value)
      .subscribe(
        (message: any) => {
          this.toastr.success(message, 'Sucesso!')
          this.loading = false;
          this.router.navigate(['/login']);
        },
        (error) => {
          console.log(error);
          this.toastr.error('Ocorreu um erro ao tentar recuperar sua senha', 'Erro!');
          this.loading = false;
        }
      );
  }

}
