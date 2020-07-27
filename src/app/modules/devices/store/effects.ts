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
} from './actions';
import { Store } from "@ngrx/store";
import * as fromRoot from '../../../store'
import { selectClientId } from "../../../core/auth/login/store";


/**
 * Effects file is for isolating and managing side effects of the application in one place
 * Http requests, Sockets, Routing, LocalStorage, etc
 */

@Injectable()
export class DeviceEffects {

  //clientId$ = this.store.select(selectClientId);

  // TODO: Figure out how to get the clientId
  getAll$ = createEffect( () => this.actions$.pipe(
    ofType(getAll), /* When action is dispatched */
    startWith(getAll({clientId: '5e41f50d47504d03aeed10b8'})),
    /* Hit the Clients Device endpoint of our REST API */
    /* Dispatch GetAllSuccess action to the central store with id list returned by the backend as id*/
    /* 'Devices Reducer' will take care of the rest */
    switchMap(() => this.clientsService.getDevices('5e41f50d47504d03aeed10b8').pipe(
      map(devices => getAllSuccess({devices}))
    )),
  ));

  constructor(
    private actions$: Actions<DevicesActionsUnion>,
    private clientsService: ClientsService,
    private store: Store<fromRoot.State>
  ) {}

}
