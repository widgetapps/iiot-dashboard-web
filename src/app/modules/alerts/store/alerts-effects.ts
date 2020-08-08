import { Injectable } from '@angular/core';
import {
  map,
  switchMap
} from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ClientsService } from '../../../shared/services/api';
import {
  getAllAlerts,
  getAllAlertsSuccess,
  createAlert,
  createAlertSuccess,
  updateAlert,
  updateAlertSuccess,
  removeAlert,
  removeAlertSuccess,
  getAllAlertGroups,
  getAllAlertGroupsSuccess,
  createAlertGroup,
  createAlertGroupSuccess,
  updateAlertGroup,
  updateAlertGroupSuccess,
  removeAlertGroup,
  removeAlertGroupSuccess,
  AlertsActionsUnion
} from './alerts-actions';
import { Store } from "@ngrx/store";
import * as fromRoot from '../../../store'

/**
 * Effects file is for isolating and managing side effects of the application in one place
 * Http requests, Sockets, Routing, LocalStorage, etc
 */

@Injectable()
export class ClientsEffects {

  getAllAlerts$ = createEffect( () => this.actions$.pipe(
    ofType(getAllAlerts),
    switchMap(props => this.clientsService.getAlerts(props.clientId).pipe(
      map(alerts => getAllAlertsSuccess({alerts}))
    ))
  ));

  constructor(
    private actions$: Actions<AlertsActionsUnion>,
    private clientsService: ClientsService,
    private store: Store<fromRoot.State>
  ) {}

}
