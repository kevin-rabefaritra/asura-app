import { Component, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { SignInDialogComponent } from "../../users/sign-in-dialog/sign-in-dialog.component";
import { SignUpDialogComponent } from '../../users/sign-up-dialog/sign-up-dialog.component';
import { UserService } from '../../users/user.service';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs';
import { User } from '../../users/user.model';
import { VerifyAccountDialogComponent } from "../../users/verify-account-dialog/verify-account-dialog.component";
import { ToastService } from '../toast/toast.service';
import { ProfileDialogComponent } from "../../users/profile-dialog/profile-dialog.component";

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [FormsModule, RouterModule, SignInDialogComponent, SignUpDialogComponent, VerifyAccountDialogComponent, ProfileDialogComponent],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css'
})
export class TopbarComponent implements OnInit, OnDestroy {

  query: WritableSignal<string> = signal('');

  isSignInDialogDisplayed: WritableSignal<boolean> = signal<boolean>(false);
  isSignUpDialogDisplayed: WritableSignal<boolean> = signal<boolean>(false);
  isVerifyAccountDialogDisplayed: WritableSignal<boolean> = signal<boolean>(false);
  isAccountProfileDialogDisplayed: WritableSignal<boolean> = signal<boolean>(false);

  userInfo: WritableSignal<User | null> = signal<User | null>(null);

  tokenChangeSubscription$?: Subscription;
  routeSubscription$?: Subscription;
  queryParamsSubscription$?: Subscription

  isUserInfoLoading: WritableSignal<boolean> = signal(false);

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private authService: AuthService,
    private userService: UserService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.initEventSubscription();
    this.fetchUserInfo();
  }

  initEventSubscription(): void {
    this.tokenChangeSubscription$ = this.authService.tokenUpdateSubject.subscribe({
      next: (tokenSet) => {
        if (tokenSet) {
          this.fetchUserInfo();
        }
        else {
          this.userInfo.set(null);
        }
      }
    });

    this.routeSubscription$ = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        let route = this.router.url.toString();
        if (!route.startsWith('/search')) {
          // Clean search when user navigates out of the search page
          this.query.set('');
        }
      }
    });

    this.queryParamsSubscription$ = this.activeRoute.queryParams.subscribe( queryParams => {
      if (queryParams['q'] !== this.query) {
        this.query.set(queryParams['q']);
      }
    });
  }

  fetchUserInfo(forceFetch: boolean = false): void {
    if (!this.authService.hasTokenSet()) {
      return;
    }
    
    this.isUserInfoLoading.set(true);
    this.userService.getUserInfo(forceFetch).subscribe({
      next: (value) => {
        this.userInfo.set(value);
        this.isUserInfoLoading.set(false);
      }
    });
  }

  ngOnDestroy(): void {
    this.tokenChangeSubscription$?.unsubscribe();
    this.routeSubscription$?.unsubscribe();
    this.queryParamsSubscription$?.unsubscribe();
  }

  search(): void {
    if (!this.query()) {
      return;
    }

    let queryParams = {};

    // Add tag if there was one part of the url
    let tag = this.activeRoute.snapshot.queryParamMap.get('tag');
    if (tag) {
      Object.assign(queryParams, { tag });
    }

    // Add query
    Object.assign(queryParams, { q: this.query() });

    this.router.navigate(['/search'], { queryParams });
  }

  toggleSignInDialog(): void {
    this.isSignUpDialogDisplayed.set(this.isSignInDialogDisplayed());
    this.isSignInDialogDisplayed.update((value) => !value);
  }

  toggleSignUpDialog(): void {
    this.isSignInDialogDisplayed.set(this.isSignUpDialogDisplayed());
    this.isSignUpDialogDisplayed.update((value) => !value);
  }

  toggleAccountVerificationDialog(): void {
    this.isVerifyAccountDialogDisplayed.update((value) => !value);
  }

  toggleAccountProfileDialog(): void {
    this.isAccountProfileDialogDisplayed.update((value) => !value);
  }

  dismiss(): void {
    this.isSignInDialogDisplayed.set(false);
    this.isSignUpDialogDisplayed.set(false);
    this.isVerifyAccountDialogDisplayed.set(false);
    this.isAccountProfileDialogDisplayed.set(false);
  }

  /**
   * Called when a user sign up is successful
   */
  signUpSuccess(): void {
    this.dismiss();
    this.toggleAccountVerificationDialog();
  }

  /**
   * Called when the user account has been verified successfully
   */
  userAccountVerified(): void {
    this.dismiss();
    this.fetchUserInfo(true);

    // Display success message
    this.toastService.notify('Account verified successfully!');
  }
}
