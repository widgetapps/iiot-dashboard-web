import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, exhaustMap, catchError, tap } from 'rxjs/operators';
import { AuthenticationService } from '../../../../shared/services/authentication.service';
import {LoginActionsUnion, logout, login, authSuccess, reloadAuth} from "./actions";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";

@Injectable()
export class AuthEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      exhaustMap(action =>
        this.authService.login(action.email, action.password).pipe(
          map(response => ({ type: '[Login API] Auth Success', response: response })),
          catchError(() => EMPTY)
        )
      )
    )
  );

  authSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authSuccess),
      tap(() => {
        this.router.navigate(['/dashboard']);
      })
    ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions<LoginActionsUnion>,
    private authService: AuthenticationService,
    private router: Router
  ) {}
}
