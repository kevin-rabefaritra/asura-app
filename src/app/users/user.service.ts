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

  static KEY_USER_INFO: string = 'user_info';

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
    return !!localStorage.getItem(UserService.KEY_USER_INFO);
  }

  /**
   * Gets the user info either from local storage or from remote server
   * @returns 
   */
  getUserInfo(forceFetch: boolean = false): Observable<User> {
    if (!this.hasUserInfo() || forceFetch) {
      return this.fetchInfo(true);
    }

    return of(JSON.parse(localStorage.getItem(UserService.KEY_USER_INFO)!));
  }

  /**
   * Store user info into local storage
   * @param user info to store
   */
  storeUserInfo(user: User): void {
    localStorage.setItem(UserService.KEY_USER_INFO, JSON.stringify(user));
  }

  /**
   * Clears user info from local storage
   */
  clearUserInfo(): void {
    localStorage.removeItem(UserService.KEY_USER_INFO);
  }
}