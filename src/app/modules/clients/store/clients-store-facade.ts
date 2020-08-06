import { Injectable } from '@angular/core';
import * as fromClients from './index';
import { select, Store } from '@ngrx/store';
import * as fromRoot from '../../../store'

@Injectable()
export class ClientsStoreFacade {

  clients$ = this.store.pipe(
    select(fromClients.selectAllClients)
  );

  constructor(private store: Store<fromRoot.State>) { }

}
