import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "./user.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  static CHECK_USERNAME_URI: string = 'http://localhost:8080/api/users/check/username';
  static CHECK_EMAIL_URI: string = 'http://localhost:8080/api/users/check/email';
  static SIGN_UP_URI: string = 'http://localhost:8080/api/users/signup';
  static SIGN_IN_URI: string = 'http://localhost:8080/api/users/signin';

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

  signin(username: string, password: string): Observable<User> {
    return this.httpClient.post<User>(UserService.SIGN_IN_URI, {
      username, password
    });
  }
}