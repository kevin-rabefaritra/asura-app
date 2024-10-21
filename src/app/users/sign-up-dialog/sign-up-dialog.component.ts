import { Component, EventEmitter, OnInit, Output, Signal, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { passwordMatchValidator, strongPasswordValidator } from '../../shared/validators/password.directive';
import { compliantUsernameValidator, UniqueUsernameValidator } from '../../shared/validators/username.directive';
import { AuthService } from '../../auth/auth.service';

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
  @Output() onSignUpSuccess: EventEmitter<any> = new EventEmitter();

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
      next: () => {
        // TokenSet has been stored in local storage
        this.isLoading.set(false);
        this.onSignUpSuccess.emit();
      },
      error: (error) => {
        this.isLoading.set(false);
      }
    })
  }
}
