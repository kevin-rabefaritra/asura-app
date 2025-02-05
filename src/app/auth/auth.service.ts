import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, of, Subject, tap, throwError } from "rxjs";
import { TokenSet } from "../users/tokenset.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  static KEY_ACCESS_TOKEN: string = 'ACCESS_TOKEN';
  static KEY_REFRESH_TOKEN: string = 'REFRESH_TOKEN';

  static AUTH_URI: string = '/auth';
  static SOCIAL_AUTH_URI: string = '/auth/social';
  static RENEW_TOKEN_URI: string = '/auth/renew';

  tokenUpdateSubject: Subject<TokenSet | null> = new Subject<TokenSet | null>();

  constructor(
    private httpClient: HttpClient
  ) {}

  authenticate(email: string, idToken: string, authToken: string, provider: string): Observable<TokenSet> {
    return this.httpClient.post<TokenSet>(AuthService.SOCIAL_AUTH_URI, { email, idToken, authToken, provider }).pipe(
      tap((tokenSet: TokenSet) => {
        this.storeTokenSet(tokenSet);
      }),
      catchError((error) => {
        return throwError(() => new Error(`Unable to authenticate. Please try again later. Code ${error.status}`));
      })
    );
  }

  renewToken(): Observable<TokenSet> {
    const tokenSet = this.getTokenSet();
    return this.httpClient.post<TokenSet>(AuthService.RENEW_TOKEN_URI, { refreshToken: tokenSet?.refreshToken }).pipe(
      tap((tokenSet: TokenSet) => {
        this.storeTokenSet(tokenSet);
      })
    );
  }

  storeTokenSet(tokenSet: TokenSet): void {
    localStorage.setItem(AuthService.KEY_ACCESS_TOKEN, tokenSet.accessToken);
    localStorage.setItem(AuthService.KEY_REFRESH_TOKEN, tokenSet.refreshToken);
    this.tokenUpdateSubject.next(tokenSet);
  }

  clearTokenSet(): void {
    localStorage.removeItem(AuthService.KEY_ACCESS_TOKEN);
    localStorage.removeItem(AuthService.KEY_REFRESH_TOKEN);
    this.tokenUpdateSubject.next(null);
  }

  getTokenSet(): TokenSet | null {
    const accessToken = localStorage.getItem(AuthService.KEY_ACCESS_TOKEN);
    const refreshToken = localStorage.getItem(AuthService.KEY_REFRESH_TOKEN);

    if (accessToken && refreshToken) {
      return { accessToken, refreshToken };
    }
    return null;
  }

  hasTokenSet(): boolean {
    return !!this.getTokenSet();
  }

  /**
   * Returns true if a given URL is an authentication endpoint
   * @param url 
   */
  isAuthenticationEndpoint(url: string): boolean {
    return /api\/auth\/\w+$/.test(url);
  }
}