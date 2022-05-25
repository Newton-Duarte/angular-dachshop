import { AbstractControl, Validators, FormControl } from '@angular/forms';

export class CustomValidator {
  constructor() { }

  static isEmail(control: FormControl) {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (!re.test(control.value)) {
      return { 'E-mail inválido': true };
    }

    return null;
  }
}
