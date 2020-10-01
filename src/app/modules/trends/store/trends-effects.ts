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
  getTrendsSuccess, getTags, getTagsSuccess, getRawData, getRawDataSuccess
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

  getTrends$ = createEffect( () => this.actions$.pipe(
    ofType(getTrends),
    switchMap(props => this.clientsService.getSummaryTelemetry(props.clientId, props.start, props.end, props.tags, props.interval)
      .pipe(
        map(data => getTrendsSuccess({data}))
      )
    ),
  ));

  getRawData$ = createEffect( () => this.actions$.pipe(
    ofType(getRawData),
    switchMap(props => this.clientsService.getRawTelemetry(props.clientId, props.start, props.end, props.tags)
      .pipe(
        map(data => getRawDataSuccess({data}))
      )
    ),
  ));

  getTags$ = createEffect(() => this.actions$.pipe(
    ofType(getTags),
    switchMap(props => this.clientsService.getTagList(props.clientId)
      .pipe(
        map(data => getTagsSuccess({data}))
      ))
    )
  );

  constructor(
    private actions$: Actions<TrendsActionsUnion>,
    private clientsService: ClientsService,
    private store: Store<fromRoot.State>
  ) {}

}
