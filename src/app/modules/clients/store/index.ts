import * as fromClients from './clients-reducer';
import { Action, combineReducers, createFeatureSelector, createSelector } from '@ngrx/store';

export interface ClientsState {
  clients: fromClients.State;
}

/** Provide reducers with AoT-compilation compliance */
export function reducers(state: ClientsState | undefined, action: Action) {
  return combineReducers({
    clients: fromClients.reducer
  })(state, action)
}

/**
 * The createFeatureSelector function selects a piece of state from the root of the state object.
 * This is used for selecting feature states that are loaded eagerly or lazily.
 */

export const getClientsState = createFeatureSelector<fromClients.State>('clients');

export const getSelectedClient = createSelector(
  getClientsState,
  fromClients.getSelected
);

export const selectClientIds = createSelector(
  getClientsState,
  fromClients.selectClientIds // shorthand for usersState => fromUser.selectUserIds(usersState)
);
export const selectClientEntities = createSelector(
  getClientsState,
  fromClients.selectClientEntities
);
export const selectAllClients = createSelector(
  getClientsState,
  fromClients.selectAllClients
);
export const selectClientTotal = createSelector(
  getClientsState,
  fromClients.selectClientTotal
);
