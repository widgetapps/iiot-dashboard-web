import {Action, ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import {InjectionToken} from '@angular/core';

import * as fromAuth from './auth.reducer';

export interface State {
  auth: fromAuth.State
  // more state here
}

// AOT compatibility
export const ROOT_REDUCERS = new InjectionToken<ActionReducerMap<State, Action>>(
  'ROOT_REDUCERS_TOKEN',
  {
    factory: () => ({
      auth: fromAuth.reducer
    })
  }
);

/// selectors
export const getAuthState = createFeatureSelector<fromAuth.State>('auth');

export const getToken = createSelector(getAuthState, fromAuth.getToken);
