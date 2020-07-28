import { Injectable } from '@angular/core';
import * as fromTrends from './index';
import { select, Store } from '@ngrx/store';
import * as fromRoot from '../../../store'

@Injectable()
export class TrendsStoreFacade {

  tags$ = this.store.pipe(
    select(fromTrends.selectClientTags)
  );

  constructor(private store: Store<fromRoot.State>) { }

}
