import * as fromAlertGroups from './alertgroups-reducer';
import {Action, combineReducers, createFeatureSelector, createSelector} from '@ngrx/store';

export interface AlertGroupsState {
  alertGroups: fromAlertGroups.State;
}

/** Provide reducers with AoT-compilation compliance */
export function reducers(state: AlertGroupsState | undefined, action: Action) {
  return combineReducers({
    alertGroups: fromAlertGroups.reducer
  })(state, action)
}

export const getAlertGroupsState = createFeatureSelector<fromAlertGroups.State>('alertGroups');

export const selectAlertGroupIds = createSelector(
  getAlertGroupsState,
  fromAlertGroups.selectAlertGroupIds
);
export const selectAlertGroupEntities = createSelector(
  getAlertGroupsState,
  fromAlertGroups.selectAlertGroupEntities
);
export const selectAllAlertGroups = createSelector(
  getAlertGroupsState,
  fromAlertGroups.selectAllAlertGroups
);
export const selectAlertGroupTotal = createSelector(
  getAlertGroupsState,
  fromAlertGroups.selectAlertGroupTotal
);

export const getAlertGroupById = (id: string) => createSelector(
  getAlertGroupsState,
  fromAlertGroups.getAlertGroupById(id)
);
