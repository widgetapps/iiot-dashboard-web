import { Injectable } from '@angular/core';
import {
  map,
  startWith,
  switchMap
} from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ClientsService } from '../../../shared/services/api';
import {
  DevicesActionsUnion,
  getAll,
  getAllSuccess
} from './devices-actions';
import { Store } from "@ngrx/store";
import * as fromRoot from '../../../store';
import * as authHelper from '../../../shared/helpers/auth.helper';


/**
 * Effects file is for isolating and managing side effects of the application in one place
 * Http requests, Sockets, Routing, LocalStorage, etc
 */

@Injectable()
export class DeviceEffects {

  getAll$ = createEffect( () => this.actions$.pipe(
    ofType(getAll), /* When action is dispatched */
    startWith(getAll({clientId: authHelper.getUser().client})),
    switchMap(props => this.clientsService.getDevices(props.clientId).pipe(
      map(devices => getAllSuccess({devices}))
    )),
  ));

  constructor(
    private actions$: Actions<DevicesActionsUnion>,
    private clientsService: ClientsService,
    private store: Store<fromRoot.State>
  ) {}

}
