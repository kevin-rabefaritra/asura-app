import { Component, EventEmitter, OnInit, Output, Signal, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { passwordMatchValidator, strongPasswordValidator } from '../../shared/validators/password.directive';
import { compliantUsernameValidator, UniqueUsernameValidator } from '../../shared/validators/username.directive';

@Component({
  selector: 'app-sign-up-dialog',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './sign-up-dialog.component.html',
  styleUrl: './sign-up-dialog.component.css'
})
export class SignUpDialogComponent implements OnInit {

  @Output() onSignInClicked: EventEmitter<any> = new EventEmitter();
  @Output() onDismiss: EventEmitter<any> = new EventEmitter();

  signupForm?: FormGroup;
  isLoading: WritableSignal<boolean> = signal(false);

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private usernameValidator: UniqueUsernameValidator
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.signupForm = this.formBuilder.group({
      username: ['', [Validators.required, compliantUsernameValidator()]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, strongPasswordValidator()]],
      passwordConfirmation: ['', Validators.required]
    }, {
      validators: [ passwordMatchValidator ],
      asyncValidators: [],
      updateOn: 'blur'
    });
    
    // Async validator for username
    this.signupForm.controls['username'].addAsyncValidators(
      this.usernameValidator.validate.bind(this.usernameValidator)
    );
  }

  signInClicked(): void {
    this.onSignInClicked.emit();
  }

  dismiss(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.onDismiss.emit();
    }
  }

  /**
   * Signs a user up
   * @returns 
   */
  signup(): void {
    if (!this.signupForm || this.signupForm.invalid || this.isLoading()) {
      return;
    }

    this.isLoading.set(true);
    const signupValues = this.signupForm.getRawValue();
    this.userService.signup(signupValues.username, signupValues.email, signupValues.password).subscribe({
      next: (value) => {
        this.isLoading.set(false);
        /**
         * Todo:
         * (1) Create an event emitter to notify the parent that the account has been created
         * (2) Show another dialog asking for the account activation code
         * (3) The dialog will include a send-email-again button
         * - The activation email will expire after some time. If the user activates too late and try to sign up / sign in,
         * redirect to the email activation dialog and send another email.
         */
      },
      error: (error) => {
        this.isLoading.set(false);
      }
    })
  }
}
