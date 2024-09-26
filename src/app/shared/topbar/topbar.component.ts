import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { SignInDialogComponent } from "../../users/sign-in-dialog/sign-in-dialog.component";
import { SignUpDialogComponent } from '../../users/sign-up-dialog/sign-up-dialog.component';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [FormsModule, RouterModule, SignInDialogComponent, SignUpDialogComponent],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css'
})
export class TopbarComponent implements OnInit {

  query: string = '';
  isSignInDialogDisplayed = signal<boolean>(false);
  isSignUpDialogDisplayed = signal<boolean>(false);

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initEventSubscription();
  }

  initEventSubscription(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        let route = this.router.url.toString();
        if (!route.startsWith('/search')) {
          this.query = '';
        }
      }
    });
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
