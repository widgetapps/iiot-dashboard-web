import { Injectable } from '@angular/core';
import {
  map,
  switchMap,
  mergeMap
} from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ClientsService } from '../../../shared/services/api';
import {
  TrendsActionsUnion,
  getTrends,
  getTrendsSuccess
} from './trends-actions';
import { Store } from "@ngrx/store";
import { EMPTY } from 'rxjs';
import * as fromRoot from '../../../store'


/**
 * Effects file is for isolating and managing side effects of the application in one place
 * Http requests, Sockets, Routing, LocalStorage, etc
 */

@Injectable()
export class TrendsEffects {

  //clientId$ = this.store.select(selectClientId);

  // TODO: Figure out how to get the clientId

  getTrends$ = createEffect( () => this.actions$.pipe(
    ofType(getTrends),
    switchMap(props => this.clientsService.getSummaryTelemetry(props.clientId, props.start, props.end, props.tags, props.interval)
      .pipe(
        map(data => getTrendsSuccess({data}))
      )
    ),
  ));


  constructor(
    private actions$: Actions<TrendsActionsUnion>,
    private clientsService: ClientsService,
    private store: Store<fromRoot.State>
  ) {}

}
