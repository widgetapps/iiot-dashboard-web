import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromUser from './reducer';
import * as fromAuth from '../../../../store/auth.reducer';

export interface AppState {
  user: fromUser.State;
  auth: fromAuth.State;
}

export const userSelector = createFeatureSelector<AppState, fromUser.State>('user');
export const authSelector = createFeatureSelector<AppState, fromAuth.State>('auth');

export const selectUser = createSelector(
  userSelector,
  (state: fromUser.State) => state.user
);

export const selectUserId = createSelector(
  userSelector,
  (state: fromUser.State) => state.user._id
);

export const selectClientId = createSelector(
  userSelector,
  (state: fromUser.State) => state.user.client
);

export const selectApiKey = createSelector(
  userSelector,
  (state: fromUser.State) => state.user.apiKey
);

export const selectToken = createSelector(
  authSelector,
  (state: fromAuth.State) => state.auth.token
)
