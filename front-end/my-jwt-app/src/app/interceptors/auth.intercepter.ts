import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

export function AuthInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const authService = inject(AuthService);
  const accessToken = localStorage.getItem('accessToken');
  let reqWithHeader = req;
  if (accessToken) {
    reqWithHeader = req.clone({
      headers: req.headers.set('x-access-token', accessToken),
    });
  }
  return next(reqWithHeader).pipe(
    catchError((error: HttpErrorResponse) => {
      debugger;
      if (
        error.status === 401 &&
        error.message === 'Failed to authenticate token'
      ) {
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
      return throwError(error);
    })
  );
}
