import { Injectable } from '@angular/core';
import * as fromAlerts from './index';
import { select, Store } from '@ngrx/store';
import * as fromRoot from '../../../../store'
import { AlertModel } from "../../../../shared/models";
import { createAlert } from "./alerts-actions";

@Injectable()
export class AlertsStoreFacade {

  alerts$ = this.store.pipe(
    select(fromAlerts.selectAllAlerts)
  );

  constructor(private store: Store<fromRoot.State>) { }

  createAlert(clientId: string, alert: AlertModel) {
    this.store.dispatch(createAlert({clientId, alert}));
  }

}
