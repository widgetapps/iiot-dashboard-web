import { Injectable } from '@angular/core';
import * as fromAlertGroups from './index';
import { select, Store } from '@ngrx/store';
import * as fromRoot from '../../../../store'
import { AlertGroupModel } from "../../../../shared/models";
import { createAlertGroup, removeAlertGroup } from "./alertgroups-actions";

@Injectable()
export class AlertGroupsStoreFacade {

  alertGroups$ = this.store.pipe(
    select(fromAlertGroups.selectAllAlertGroups)
  );

  constructor(private store: Store<fromRoot.State>) { }

  createAlertGroup(clientId: string, alertGroup: AlertGroupModel) {
    this.store.dispatch(createAlertGroup({clientId, alertGroup}));
  }

  deleteAlertGroup(clientId: string, code: string) {
    this.store.dispatch(removeAlertGroup({clientId, code}));
  }

}
