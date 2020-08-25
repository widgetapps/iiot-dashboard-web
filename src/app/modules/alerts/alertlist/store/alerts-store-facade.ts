import { Injectable } from '@angular/core';
import * as fromAlerts from './index';
import { select, Store } from '@ngrx/store';
import * as fromRoot from '../../../../store'
import { AlertModel } from "../../../../shared/models";
import {createAlert, removeAlert, updateAlert} from "./alerts-actions";
import * as fromAlertGroups from "../../alertgroups/store";

@Injectable()
export class AlertsStoreFacade {

  alerts$ = this.store.pipe(
    select(fromAlerts.selectAllAlerts)
  );

  constructor(private store: Store<fromRoot.State>) { }

  createAlert(clientId: string, alert: AlertModel) {
    this.store.dispatch(createAlert({clientId, alert}));
  }

  deleteAlert(clientId: string, alertId: string) {
    this.store.dispatch(removeAlert({clientId, alertId}));
  }

  editAlert(clientId: string, alertId: string, alert: AlertModel) {
    this.store.dispatch(updateAlert({clientId, alertId, alert}));
  }

  getAlertById(id: string) {
    return this.store.pipe(
      select(fromAlerts.getAlertById(id))
    )
  }

}
