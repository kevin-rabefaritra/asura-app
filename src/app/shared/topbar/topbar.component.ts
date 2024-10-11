import { Component, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { SignInDialogComponent } from "../../users/sign-in-dialog/sign-in-dialog.component";
import { SignUpDialogComponent } from '../../users/sign-up-dialog/sign-up-dialog.component';
import { UserService } from '../../users/user.service';
import { AuthService } from '../../auth/auth.service';
import { Observer, Subscription } from 'rxjs';
import { TokenSet } from '../../users/tokenset.model';
import { User } from '../../users/user.model';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [FormsModule, RouterModule, SignInDialogComponent, SignUpDialogComponent],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css'
})
export class TopbarComponent implements OnInit, OnDestroy {

  query: string = '';
  isSignInDialogDisplayed: WritableSignal<boolean> = signal<boolean>(false);
  isSignUpDialogDisplayed: WritableSignal<boolean> = signal<boolean>(false);
  userInfo: WritableSignal<User | null> = signal<User | null>(null);

  tokenChangeSubscription$?: Subscription;
  routeSubscription$?: Subscription;

  isUserInfoLoading: WritableSignal<boolean> = signal(false);

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private authService: AuthService,
    private userService: UserService
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
          this.query = '';
        }
      }
    });
  }

  fetchUserInfo(): void {
    if (!this.authService.hasTokenSet()) {
      return;
    }
    
    this.isUserInfoLoading.set(true);
    if (this.userService.hasUserInfo()) {
      // we already have the user info in the local storage
      this.userInfo.set(this.userService.getUserInfo());
      this.isUserInfoLoading.set(false);
    }
    else {
      this.userService.fetchInfo(true).subscribe({
        next: (value) => {
          this.userInfo.set(value);
          this.isUserInfoLoading.set(false);
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.tokenChangeSubscription$?.unsubscribe();
    this.routeSubscription$?.unsubscribe();
  }

  search(): void {
    if (!this.query) {
      return;
    }

    let queryParams = {};

    // Add tag if there was one part of the url
    let tag = this.activeRoute.snapshot.queryParamMap.get('tag');
    if (tag) {
      Object.assign(queryParams, { tag });
    }

    // Add query
    Object.assign(queryParams, { q: this.query });

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

  dismiss(): void {
    this.isSignInDialogDisplayed.set(false);
    this.isSignUpDialogDisplayed.set(false);
  }
}
