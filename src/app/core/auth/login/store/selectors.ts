import { createSelector, createFeatureSelector } from '@ngrx/store';
import { State as UserState } from './reducer';

export const featureKey = 'user';

export interface AppState {
  user: UserState;
}

export const selectUser = createFeatureSelector<AppState, UserState>(featureKey);

export const selectUserId = createSelector(
  selectUser,
  (state: UserState) => state.user._id
);
/*
import { createSelector } from '@ngrx/store';
import { State as UserState } from './reducer';

export interface AppState {
  user: UserState;
}

export const selectUser = (state: AppState) => state.user;

export const selectUserId = createSelector(
  selectUser,
  (state: UserState) => state.user._id
);
*/
