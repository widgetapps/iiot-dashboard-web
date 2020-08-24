import * as fromAlerts from './alerts-reducer';
import { Action, combineReducers, createFeatureSelector, createSelector } from '@ngrx/store';

export interface AlertsState {
  alerts: fromAlerts.State;
}

/** Provide reducers with AoT-compilation compliance */
export function reducers(state: AlertsState | undefined, action: Action) {
  return combineReducers({
    alerts: fromAlerts.reducer
  })(state, action)
}

export const getAlertsState = createFeatureSelector<fromAlerts.State>('alerts');

export const selectAlertIds = createSelector(
  getAlertsState,
  fromAlerts.selectAlertIds
);
export const selectAlertEntities = createSelector(
  getAlertsState,
  fromAlerts.selectAlertEntities
);
export const selectAllAlerts = createSelector(
  getAlertsState,
  fromAlerts.selectAllAlerts
);
export const selectAlertTotal = createSelector(
  getAlertsState,
  fromAlerts.selectAlertTotal
);
