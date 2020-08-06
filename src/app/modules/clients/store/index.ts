import * as fromClients from './clients-reducer';
import {Action, combineReducers, createFeatureSelector, createSelector} from '@ngrx/store';

export interface ClientsState {
  devices: fromClients.State;
}

/** Provide reducers with AoT-compilation compliance */
export function reducers(state: ClientsState | undefined, action: Action) {
  return combineReducers({
    devices: fromClients.reducer
  })(state, action)
}

/**
 * The createFeatureSelector function selects a piece of state from the root of the state object.
 * This is used for selecting feature states that are loaded eagerly or lazily.
 */

export const getDevicesState = createFeatureSelector<fromClients.State>('clients');

export const selectClientIds = createSelector(
  getDevicesState,
  fromClients.selectClientIds // shorthand for usersState => fromUser.selectUserIds(usersState)
);
export const selectClientEntities = createSelector(
  getDevicesState,
  fromClients.selectClientEntities
);
export const selectAllClients = createSelector(
  getDevicesState,
  fromClients.selectAllClients
);
export const selectClientTotal = createSelector(
  getDevicesState,
  fromClients.selectClientTotal
);
