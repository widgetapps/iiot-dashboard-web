import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { AuthenticationService } from '../../../../shared/services/authentication.service';
import {LoginActionsUnion} from "./actions";


@Injectable()
export class AuthEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[Login Page] Login'),
      exhaustMap(action =>
        this.authService.login(action.email, action.password).pipe(
          map(response => ({ type: '[Login API] Login Success', payload: response })),
          catchError(() => EMPTY)
        )
      )
    )
  );

  constructor(
    private actions$: Actions<LoginActionsUnion>,
    private authService: AuthenticationService
  ) {}
}
