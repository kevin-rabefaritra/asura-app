import { Injectable } from "@angular/core";
import { AbstractControl, AsyncValidator, ValidationErrors } from "@angular/forms";
import { UserService } from "../../users/user.service";
import { catchError, map, Observable, of } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UniqueEmailValidator implements AsyncValidator {

  constructor(
    private userService: UserService
  ) {}

  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.userService.checkEmail(control.value).pipe(
      map((exists) => exists ? {uniqueEmail: true} : null),
      catchError(() => of(null))
    );
  }
}