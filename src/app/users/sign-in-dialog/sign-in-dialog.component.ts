import { Component, EventEmitter, OnDestroy, OnInit, Output, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { GoogleSigninButtonModule, SocialAuthService, SocialLoginModule, SocialUser } from '@abacritt/angularx-social-login';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sign-in-dialog',
  standalone: true,
  imports: [ReactiveFormsModule, SocialLoginModule, GoogleSigninButtonModule],
  templateUrl: './sign-in-dialog.component.html',
  styleUrl: './sign-in-dialog.component.css'
})
export class SignInDialogComponent implements OnInit, OnDestroy {

  @Output() onCreateAccountClicked: EventEmitter<any> = new EventEmitter();
  @Output() onDismiss: EventEmitter<any> = new EventEmitter();

  signinForm?: FormGroup;
  isLoading: WritableSignal<Boolean> = signal(false);
  errorMessage: WritableSignal<String> = signal('');

  socialAuthStateSubscription$?: Subscription;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private socialAuthService: SocialAuthService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.initSocialAuth();
  }

  ngOnDestroy(): void {
    this.socialAuthStateSubscription$?.unsubscribe();
  }

  private initForm(): void {
    this.signinForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  private initSocialAuth(): void {
    this.socialAuthStateSubscription$ = this.socialAuthService.authState.subscribe((user) => {
      if (!this.authService.hasTokenSet() && user) {
        this.signInWithGoogle(user);
      }
    });
  }

  signInWithCredentials(): void {
    if (!this.signinForm || this.signinForm.invalid || this.isLoading()) {
      return;
    }

    this.errorMessage.set('');
    this.isLoading.set(true);
    const signinValues = this.signinForm.getRawValue();
    this.authService.authenticate(signinValues.username, signinValues.password).subscribe({
      next: () => {
        // Reload the current page
        this.reload();
        this.onDismiss.emit();
      },
      error: (err) => {
        this.isLoading.set(false);
        this.errorMessage.set(err.message);
      }
    });
  }

  signInWithGoogle(user: SocialUser): void {
    if (this.isLoading()) {
      return;
    }

    this.isLoading.set(true);
    this.authService.authenticateWithGoogle(user.email, user.idToken).subscribe({
      next: () => {
        // Reload the current page
        this.reload();
        this.onDismiss.emit();
      },
      error: (err) => {
        this.isLoading.set(false);
        this.errorMessage.set(err.message);
      }
    })
  }

  createAccountClicked(): void {
    this.onCreateAccountClicked.emit();
  }

  dismiss(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.onDismiss.emit();
    }
  }

  reload(): void {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/auth', { skipLocationChange: true} ).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
}
