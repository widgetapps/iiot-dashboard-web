import { AlertModel } from '../../../../shared/models';
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import {
  getAllAlertsSuccess
} from './alerts-actions';

// This adapter will allow is to manipulate contacts (mostly CRUD operations)
export const alertsAdapter = createEntityAdapter<AlertModel>({
  selectId: (alert: AlertModel) => alert._id,
  sortComparer: false
});

export interface State extends EntityState<AlertModel> {
  // additional props here
}

export const INIT_STATE: State = alertsAdapter.getInitialState({
  // additional props default values here
});

export const featureKey = 'alerts';

export const reducer = createReducer<State>(
  INIT_STATE,
  on(getAllAlertsSuccess, (state, {alerts}) => alertsAdapter.setAll(alerts, state))
);

// get the selectors
const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = alertsAdapter.getSelectors();

// select the array of ids
export const selectAlertIds = selectIds;

// select the dictionary of entities
export const selectAlertEntities = selectEntities;

// select the array
export const selectAllAlerts = selectAll;

// select the total count
export const selectAlertTotal = selectTotal;
