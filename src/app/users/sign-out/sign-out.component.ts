import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { UserService } from '../user.service';
import { Route, Router, RouterModule } from '@angular/router';

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
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.authService.clearTokenSet();
    this.userService.clearUserInfo();
    this.router.navigate(['/home']);
  }
}
