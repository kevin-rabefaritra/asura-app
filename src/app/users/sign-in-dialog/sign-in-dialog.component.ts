import { AfterViewInit, Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, signal, ViewChild, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { FacebookLoginProvider, GoogleSigninButtonDirective, GoogleSigninButtonModule, SocialAuthService, SocialLoginModule, SocialUser } from '@abacritt/angularx-social-login';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sign-in-dialog',
  standalone: true,
  imports: [ReactiveFormsModule, SocialLoginModule, GoogleSigninButtonModule],
  templateUrl: './sign-in-dialog.component.html',
  styleUrl: './sign-in-dialog.component.css'
})
export class SignInDialogComponent implements OnInit, OnDestroy, AfterViewInit {

  @Output() onCreateAccountClicked: EventEmitter<any> = new EventEmitter();
  @Output() onDismiss: EventEmitter<any> = new EventEmitter();

  @ViewChild(GoogleSigninButtonDirective) googleAuthButton!: GoogleSigninButtonDirective;
  @ViewChild('facebookAuthButton') facebookAuthButton!: ElementRef;

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

  ngAfterViewInit(): void {
    // Set the Google button width to be the same as the Facebook button (which is 100%)
    this.googleAuthButton.width = this.facebookAuthButton.nativeElement.offsetWidth;
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
        this.signInWithSocial(user);
      }
    });
  }

  signInWithSocial(user: SocialUser): void {
    if (this.isLoading()) {
      return;
    }

    this.isLoading.set(true);
    this.authService.authenticate(user.email, user.idToken, user.authToken, user.provider).subscribe({
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

  signInWithFacebookClicked(): void {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
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
