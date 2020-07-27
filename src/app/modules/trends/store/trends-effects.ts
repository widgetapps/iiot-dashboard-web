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
    switchMap(() => this.clientsService.getSummaryTelemetry('5e41f50d47504d03aeed10b8', '2020-05-19T00:00:00.000Z', '2020-05-20T01:00:00.000Z', 'AREA6_0027_PI', '2h')
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
