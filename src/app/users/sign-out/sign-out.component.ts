import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { UserService } from '../user.service';
import { Route, Router, RouterModule } from '@angular/router';
import { SocialAuthService } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-sign-out',
  standalone: true,
  imports: [RouterModule],
  template: '',
  styles: ''
})
export class SignOutComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
    private socialAuthService: SocialAuthService
  ) {}

  ngOnInit(): void {
    this.authService.clearTokenSet();
    this.userService.clearUserInfo();
    this.socialAuthService.signOut(true);
    this.router.navigate(['/home']);
  }
}
