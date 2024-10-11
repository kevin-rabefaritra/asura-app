import { Component, EventEmitter, OnInit, Output, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-sign-in-dialog',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './sign-in-dialog.component.html',
  styleUrl: './sign-in-dialog.component.css'
})
export class SignInDialogComponent implements OnInit {

  @Output() onCreateAccountClicked: EventEmitter<any> = new EventEmitter();
  @Output() onDismiss: EventEmitter<any> = new EventEmitter();

  signinForm?: FormGroup;
  isLoading: WritableSignal<Boolean> = signal(false);
  errorMessage: WritableSignal<String> = signal('');

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.signinForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  signInWithCredentials(): void {
    if (!this.signinForm || this.signinForm.invalid) {
      return;
    }

    this.errorMessage.set('');
    this.isLoading.set(true);
    const signinValues = this.signinForm.getRawValue();
    this.authService.authenticate(signinValues.username, signinValues.password).subscribe({
      next: () => {
        this.onDismiss.emit();
      },
      error: (err) => {
        this.isLoading.set(false);
        this.errorMessage.set(err.message);
      }
    });
  }

  createAccountClicked(): void {
    this.onCreateAccountClicked.emit();
  }

  dismiss(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.onDismiss.emit();
    }
  }
}
