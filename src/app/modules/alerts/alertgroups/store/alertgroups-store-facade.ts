import { Injectable } from '@angular/core';
import * as fromAlertGroups from './index';
import { select, Store } from '@ngrx/store';
import * as fromRoot from '../../../../store'

@Injectable()
export class AlertGroupsStoreFacade {

  alertGroups$ = this.store.pipe(
    select(fromAlertGroups.selectAllAlertGroups)
  );

  constructor(private store: Store<fromRoot.State>) { }

}
