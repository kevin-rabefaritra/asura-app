import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { map, Observable, tap } from "rxjs";
import { User } from "./user.model";
import { TokenSet } from "./tokenset.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  static CHECK_USERNAME_URI: string = '/users/check/username';
  static CHECK_EMAIL_URI: string = '/users/check/email';
  static SIGN_UP_URI: string = '/users/signup';
  static INFO_URI: string = '/users/info';

  static KEY_USERNAME: string = 'username';
  static KEY_EMAIL: string = 'email';
  static KEY_ROLE: string = 'role';

  constructor(
    private httpClient: HttpClient
  ) {}

  checkUsername(username: string): Observable<boolean> {
    return this.httpClient.get<boolean>(`${UserService.CHECK_USERNAME_URI}?v=${username}`);
  }

  checkEmail(email: string): Observable<boolean> {
    return this.httpClient.get<boolean>(`${UserService.CHECK_EMAIL_URI}?v=${email}`);
  }

  signup(username: string, email: string, password: string): Observable<User> {
    return this.httpClient.post<User>(UserService.SIGN_UP_URI, {
      username, email, password
    });
  }

  fetchInfo(persist: boolean = true): Observable<User> {
    return this.httpClient.get<User>(UserService.INFO_URI).pipe(
      tap((user) => {
        if (persist) {
          this.storeUserInfo(user);
        }
      })
    );
  }

  hasUserInfo(): boolean {
    return !!localStorage.getItem(UserService.KEY_USERNAME) &&
      !!localStorage.getItem(UserService.KEY_EMAIL) &&
      !!localStorage.getItem(UserService.KEY_ROLE)
  }

  getUserInfo(): User | null {
    if (!this.hasUserInfo()) {
      return null;
    }

    return {
      username: localStorage.getItem(UserService.KEY_USERNAME)!,
      email: localStorage.getItem(UserService.KEY_EMAIL)!,
      role: localStorage.getItem(UserService.KEY_ROLE)!
    };
  }

  storeUserInfo(user: User): void {
    localStorage.setItem(UserService.KEY_USERNAME, user.username);
    localStorage.setItem(UserService.KEY_EMAIL, user.email);
    localStorage.setItem(UserService.KEY_ROLE, user.role);
  }

  clearUserInfo(): void {
    localStorage.removeItem(UserService.KEY_USERNAME);
    localStorage.removeItem(UserService.KEY_EMAIL);
    localStorage.removeItem(UserService.KEY_ROLE);
  }
}