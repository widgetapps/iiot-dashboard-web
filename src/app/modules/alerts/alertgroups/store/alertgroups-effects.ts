import { Injectable } from '@angular/core';
import {
  map, startWith,
  switchMap
} from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ClientsService } from '../../../../shared/services/api';
import {
  getAllAlertGroups,
  getAllAlertGroupsSuccess,
  createAlertGroup,
  createAlertGroupSuccess,
  updateAlertGroup,
  updateAlertGroupSuccess,
  removeAlertGroup,
  removeAlertGroupSuccess,
  AlertGroupsActionsUnion
} from './alertgroups-actions';
import { Store } from "@ngrx/store";
import * as fromRoot from '../../../../store'
import * as authHelper from '../../../../shared/helpers/auth.helper';

/**
 * Effects file is for isolating and managing side effects of the application in one place
 * Http requests, Sockets, Routing, LocalStorage, etc
 */

@Injectable()
export class AlertGroupsEffects {

  getAllAlertGroups$ = createEffect( () => this.actions$.pipe(
    ofType(getAllAlertGroups),
    startWith(getAllAlertGroups({clientId: authHelper.getUser().client})),
    switchMap(props => this.clientsService.getAlertGroups(props.clientId).pipe(
      map(alertGroups => getAllAlertGroupsSuccess({alertGroups}))
    ))
  ));

  createAlertGroup$ = createEffect(() => this.actions$.pipe(
    ofType(createAlertGroup),
    switchMap(props => this.clientsService.postAlertGroup(props.clientId, props.alertGroup).pipe(
      map(alertGroup => createAlertGroupSuccess({alertGroup}))
    ))
  ));

  updateAlertGroup$ = createEffect( () => this.actions$.pipe(
    ofType(updateAlertGroup),
    switchMap(props => this.clientsService.putAlertGroup(props.clientId, props.code, props.alertGroup).pipe(
      map(alertGroup => updateAlertGroupSuccess({alertGroup}))
    ))
  ));

  removeAlertGroup$ = createEffect(() => this.actions$.pipe(
    ofType(removeAlertGroup),
    switchMap(props => this.clientsService.deleteAlertGroup(props.clientId, props.code).pipe(
      map(message => removeAlertGroupSuccess({message}))
    ))
  ));

  constructor(
    private actions$: Actions<AlertGroupsActionsUnion>,
    private clientsService: ClientsService,
    private store: Store<fromRoot.State>
  ) {}

}
