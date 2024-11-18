import { HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, switchMap, throwError } from "rxjs";
import { AuthService } from "./auth.service";
import { environment } from "../../environments/environment";

  
export function authInterceptor(request: HttpRequest<unknown>, next: HttpHandlerFn) {
  const router = inject(Router);
  const authService = inject(AuthService);
  const locale = $localize.locale || 'en';

  // Add API base URL
  request = withBaseUrl(request);

  // Add locale to HTTP header
  request = withLocale(request, locale);

  const isAuthEndpoint = authService.isAuthenticationEndpoint(request.url);

  if (authService.hasTokenSet() && !isAuthEndpoint) {
    const accessToken = authService.getTokenSet()!.accessToken;
    request = withAccessToken(request, accessToken);
  }

  return next(request).pipe(
    catchError((err: any) => {
      if (err.status === 401) {
        if (isAuthEndpoint) {
          return throwError(() => err);
        }

        // 401 - Unauthorized error, we attempt to renew the token (if any)
        return authService.renewToken().pipe(
          switchMap(() => {
            const updatedTokenSet = authService.getTokenSet();
            request = withAccessToken(request, updatedTokenSet!.accessToken);
            return next(request);
          }),
          catchError((error) => {
            if (error.status === 401) {
              // Unable to renew access token, sign the user out
              router.navigate(['/signout']);
            }
            return throwError(() => error);
          })
        );
      }
      else {
        // Errors other than 401, throw the error
        return throwError(() => err);
      }
    })
  );
}

function withBaseUrl(request: HttpRequest<any>): HttpRequest<any> {
  if (request.url.startsWith('/')) {
    return request.clone({
      url: `${environment.apiUrl}${request.url}`
    });
  }
  return request;
}

function withAccessToken(request: HttpRequest<any>, accessToken: string): HttpRequest<any> {
  return request.clone({
    setHeaders: { Authorization: `Bearer ${accessToken}` }
  });
}

function withLocale(request: HttpRequest<any>, locale: string): HttpRequest<any> {
  return request.clone({
    setHeaders: { 'Accept-Language': locale }
  });
}