import { Injectable } from "@angular/core";
import { AbstractControl, AsyncValidator, ValidationErrors, ValidatorFn } from "@angular/forms";
import { catchError, map, Observable, of } from "rxjs";
import { UserService } from "../../users/user.service";

/**
 * Validator for username
 * @returns 
 */
export function compliantUsernameValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const isCompliant = /^[a-zA-Z0-9_]{5,30}$/.test(control.value);
    return isCompliant ? null : {compliantUsername: {value: control.value}};
  };
}

/**
 * Async username validator
 */
@Injectable({
  providedIn: 'root'
})
export class UniqueUsernameValidator implements AsyncValidator {

  constructor(
    private userService: UserService
  ) {}
  
  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.userService.checkUsername(control.value).pipe(
      map((exists) => exists ? { uniqueUsername: true } : null ),
      catchError(() => of(null))
    );
  }
}