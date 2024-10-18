import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { map, Observable, of, tap } from "rxjs";
import { User } from "./user.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  static CHECK_USERNAME_URI: string = '/users/username/check';
  static SIGN_UP_URI: string = '/users/signup';
  static INFO_URI: string = '/users/info';

  static VERIFY_URI: string = '/users/verification/check';
  static REQUEST_VERIFICATION_URI: string = '/users/verification/send';

  static KEY_USERNAME: string = 'username';
  static KEY_EMAIL: string = 'email';
  static KEY_ROLE: string = 'role';

  constructor(
    private httpClient: HttpClient
  ) {}

  checkUsername(username: string): Observable<boolean> {
    return this.httpClient.get<boolean>(`${UserService.CHECK_USERNAME_URI}?v=${username}`);
  }

  signup(username: string, email: string, password: string): Observable<User> {
    return this.httpClient.post<User>(UserService.SIGN_UP_URI, {
      username, email, password
    });
  }

  /**
   * Fetches user info from remote server
   * @param persist If set to true, the fetched user info is stored in the local storage
   * @returns Observable<User>
   */
  private fetchInfo(persist: boolean = true): Observable<User> {
    return this.httpClient.get<User>(UserService.INFO_URI).pipe(
      tap((user) => {
        if (persist) {
          this.storeUserInfo(user);
        }
      })
    );
  }

  /**
   * Returns a boolean whether the user info is available in the local storage
   * @returns 
   */
  hasUserInfo(): boolean {
    return !!localStorage.getItem(UserService.KEY_USERNAME) &&
      !!localStorage.getItem(UserService.KEY_EMAIL) &&
      !!localStorage.getItem(UserService.KEY_ROLE)
  }

  /**
   * Gets the user info either from local storage or from remote server
   * @returns 
   */
  getUserInfo(): Observable<User> {
    if (!this.hasUserInfo()) {
      return this.fetchInfo(true);
    }

    return of({
      username: localStorage.getItem(UserService.KEY_USERNAME)!,
      email: localStorage.getItem(UserService.KEY_EMAIL)!,
      role: localStorage.getItem(UserService.KEY_ROLE)!
    });
  }

  /**
   * Store user info into local storage
   * @param user info to store
   */
  storeUserInfo(user: User): void {
    localStorage.setItem(UserService.KEY_USERNAME, user.username);
    localStorage.setItem(UserService.KEY_EMAIL, user.email);
    localStorage.setItem(UserService.KEY_ROLE, user.role);
  }

  /**
   * Clears user info from local storage
   */
  clearUserInfo(): void {
    localStorage.removeItem(UserService.KEY_USERNAME);
    localStorage.removeItem(UserService.KEY_EMAIL);
    localStorage.removeItem(UserService.KEY_ROLE);
  }

  /**
   * Sends a request to receive a verification code by email
   * @returns 
   */
  requestVerificationCode(): Observable<any> {
    return this.httpClient.put<any>(UserService.REQUEST_VERIFICATION_URI, null);
  }

  /**
   * Sends a request to check the verification code
   */
  checkVerificationCode(): Observable<any> {
    return this.httpClient.put<any>(UserService.VERIFY_URI, null);
  }
}