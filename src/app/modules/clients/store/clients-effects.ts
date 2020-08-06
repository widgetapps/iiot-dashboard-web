import { Injectable } from '@angular/core';
import {
  map,
  startWith,
  switchMap
} from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ClientsService } from '../../../shared/services/api';
import {
  ClientsActionsUnion,
  getAll,
  getAllSuccess
} from './clients-actions';
import { Store } from "@ngrx/store";
import * as fromRoot from '../../../store'

/**
 * Effects file is for isolating and managing side effects of the application in one place
 * Http requests, Sockets, Routing, LocalStorage, etc
 */

@Injectable()
export class ClientsEffects {

  getAll$ = createEffect( () => this.actions$.pipe(
    ofType(getAll),
    startWith(getAll()),
    switchMap(() => this.clientsService.getClients().pipe(
      map(clients => getAllSuccess({clients}))
    ))
  ));

  constructor(
    private actions$: Actions<ClientsActionsUnion>,
    private clientsService: ClientsService,
    private store: Store<fromRoot.State>
  ) {}

}
