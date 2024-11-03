import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function specialCharactersOnlyValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    const hasOnlySpecialChars = /^[^\w\s]+$/.test(value);
    return hasOnlySpecialChars ? { specialCharactersOnly: true } : null;
  };
}
