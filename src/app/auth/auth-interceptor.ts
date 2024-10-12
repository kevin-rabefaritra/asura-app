import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHandlerFn, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Route, Router } from "@angular/router";
import { catchError, Observable, switchMap, tap, throwError } from "rxjs";
import { AuthService } from "./auth.service";
import { environment } from "../../environments/environment.development";
import { UserService } from "../users/user.service";

  
export function authInterceptor(request: HttpRequest<unknown>, next: HttpHandlerFn) {
  const router = inject(Router);
  const authService = inject(AuthService);

  request = withBaseUrl(request);

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
              router.navigate(['/logout']);
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