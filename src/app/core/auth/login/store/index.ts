import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromUser from './reducer';
import * as fromAuth from '../../../../store/auth.reducer';

export interface AppState {
  user: fromUser.State;
  auth: fromAuth.State;
}

export const selectUser = createFeatureSelector<AppState, fromUser.State>('user');
export const selectAuth = createFeatureSelector<AppState, fromAuth.State>('auth');

export const selectUserId = createSelector(
  selectUser,
  (state: fromUser.State) => state.user._id
);

export const selectClientId = createSelector(
  selectUser,
  (state: fromUser.State) => state.user.client
);

export const selectApiKey = createSelector(
  selectUser,
  (state: fromUser.State) => state.user.apiKey
);

export const selectToken = createSelector(
  selectAuth,
  (state: fromAuth.State) => state.auth.token
)
