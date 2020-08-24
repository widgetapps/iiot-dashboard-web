import { Injectable } from '@angular/core';
import {
  map, startWith,
  switchMap
} from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ClientsService } from '../../../../shared/services/api';
import {
  getAllAlerts,
  getAllAlertsSuccess,
  createAlert,
  createAlertSuccess,
  updateAlert,
  updateAlertSuccess,
  removeAlert,
  removeAlertSuccess,
  AlertsActionsUnion
} from './alerts-actions';
import { Store } from "@ngrx/store";
import * as fromRoot from '../../../../store';
import * as authHelper from "../../../../shared/helpers/auth.helper";

/**
 * Effects file is for isolating and managing side effects of the application in one place
 * Http requests, Sockets, Routing, LocalStorage, etc
 */

@Injectable()
export class AlertsEffects {

  constructor(
    private actions$: Actions<AlertsActionsUnion>,
    private clientsService: ClientsService,
    private store: Store<fromRoot.State>
  ) {}

  getAllAlerts$ = createEffect( () => this.actions$.pipe(
    ofType(getAllAlerts),
    startWith(getAllAlerts({clientId: authHelper.getUser().client})),
    switchMap(props => this.clientsService.getAlerts(props.clientId).pipe(
      map(alerts => getAllAlertsSuccess({alerts}))
    ))
  ));

  createAlert$ = createEffect(() => this.actions$.pipe(
    ofType(createAlert),
    switchMap(props => this.clientsService.postAlert(props.clientId, props.alert).pipe(
      map(alert => createAlertSuccess({alert}))
    ))
  ));

  updateAlert$ = createEffect( () => this.actions$.pipe(
    ofType(updateAlert),
    switchMap(props => this.clientsService.putAlert(props.clientId, props.alertId, props.alert).pipe(
      map(alert => updateAlertSuccess({alert}))
    ))
  ));

  removeAlert$ = createEffect(() => this.actions$.pipe(
    ofType(removeAlert),
    switchMap(props => this.clientsService.deleteAlert(props.clientId, props.alertId).pipe(
      map(response => removeAlertSuccess({response}))
    ))
  ));

}
