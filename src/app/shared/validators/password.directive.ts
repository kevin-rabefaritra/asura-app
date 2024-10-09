import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

/**
 * Validator for strong password
 * A strong password has the following requirements:
 * - 1 alpha character
 * - 1 digit
 * - At least 8 characters
 * @returns 
 */
export function strongPasswordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const isCompliant = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$/.test(control.value);
    return isCompliant ? null : {strongPassword: {value: control.value}};
  };
}

/**
 * Validator for matching password with passwordConfirmation
 * @param control 
 * @returns 
 */
export const passwordMatchValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const password = control.get('password');
  const passwordConfirmation = control.get('passwordConfirmation');
  return password?.value === passwordConfirmation?.value ? null : { passwordMatch: true }; 
};