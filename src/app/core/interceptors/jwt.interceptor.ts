import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from "@ngrx/store";
import * as fromStore from '../auth/login/store';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private store: Store<{ }>) {}

  apiKey: string;
  token: string;

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    /*
    Get the current user ID and the JWT
    Add the API headers
     */
    this.store.select(fromStore.selectApiKey).subscribe(v => this.apiKey = v);
    this.store.select(fromStore.selectToken).subscribe(v => this.token = v);


    if (this.token) {
      console.log('API Key: ' + this.apiKey);
      console.log('Token: ' + this.token);

      request = request.clone({
        setHeaders: {
          'x-client-id': this.apiKey,
          'x-access-token': this.token
        }
      });
    }

    return next.handle(request);
  }
}
