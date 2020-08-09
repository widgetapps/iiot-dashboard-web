import { Injectable } from '@angular/core';
import * as fromAlerts from './index';
import { select, Store } from '@ngrx/store';
import * as fromRoot from '../../../../store'

@Injectable()
export class AlertsStoreFacade {

  alerts$ = this.store.pipe(
    select(fromAlerts.selectAllAlerts)
  );

  constructor(private store: Store<fromRoot.State>) { }

}
