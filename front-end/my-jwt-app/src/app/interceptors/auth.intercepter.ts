import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

export function AuthInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const authService = inject(AuthService);
  const accessToken = localStorage.getItem('accessToken');
  const router = inject(Router);
  let reqWithHeader = req;
  if (accessToken) {
    reqWithHeader = req.clone({
      headers: req.headers.set('x-access-token', accessToken),
    });
  }
  return next(reqWithHeader).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        if (error.error.message === 'NO_TOKEN_PROVIDED') {
          setTimeout(() => {
            window.alert('Please Login First!');
          }, 100);
        }

        if (error.error.message === 'USERNAME_OR_PASSWORD_IS_NOT_CORRECT') {
          window.alert('Username or Password is not correct!');
        }

        if (error.error.message === 'REFRESH_TOKEN_IS_EXPIRED') {
          window.alert('Refesh Token is exprired!');
        }

        if (error.error.message === 'COOKIE_IS_EXPIRED') {
          window.alert('Cookie is expired!');
        }

        if (error.error.message === 'TOKEN_INVALID') {
          localStorage.removeItem('accessToken');
          return authService.refreshToken().pipe(
            switchMap((data) => {
              localStorage.setItem('accessToken', data.accessToken);

              reqWithHeader = req.clone({
                headers: req.headers.set('x-access-token', data.accessToken),
              });

              return next(reqWithHeader);
            })
          );
        }
      }
      router.navigate(['/login']);
      return throwError(error);
    })
  );
}
