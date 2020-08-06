import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import * as authHelper from '../../shared/helpers/auth.helper';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor() {}

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

    return next.handle(request);
  }
}
