import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import * as authHelper from '../../shared/helpers/auth.helper';
import { Router } from "@angular/router";
import {tap} from "rxjs/internal/operators";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = authHelper.getJwt();

    if (token) {
      request = request.clone({
        setHeaders: {
          'x-client-id': authHelper.getApiKey(),
          'x-access-token': token
        }
      });
    }

    return next.handle(request).pipe( tap(() => {},
      (err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status !== 401) {
            return;
          }
          authHelper.logout();
          // TODO: This should go to an error page to inform the user what happened
          this.router.navigateByUrl('/home')
        }
      }));
  }
}
