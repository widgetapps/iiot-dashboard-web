import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

import {getLoggedIn} from '../../core/auth/login/store/reducer';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    /*
    Get the current user ID and the JWT
    Add the API headers
     */
    console.log('Logged In State: ' + getLoggedIn);

    return next.handle(request);
  }
}
