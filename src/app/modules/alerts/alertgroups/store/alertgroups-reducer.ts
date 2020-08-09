import { AlertGroupModel } from '../../../../shared/models';
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import {
  getAllAlertGroupsSuccess
} from './alertgroups-actions';

export const alertGroupsAdapter = createEntityAdapter<AlertGroupModel>({
  selectId: (alertGroup: AlertGroupModel) => alertGroup.code,
  sortComparer: false
});

export interface State extends EntityState<AlertGroupModel> {
  // additional props here
}

export const INIT_STATE: State = alertGroupsAdapter.getInitialState({
  // additional props default values here
});

export const featureKey = 'alertGroups';

export const reducer = createReducer<State>(
  INIT_STATE,
  on(getAllAlertGroupsSuccess, (state, {alertGroups}) => alertGroupsAdapter.setAll(alertGroups, state))
);

// get the selectors
const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = alertGroupsAdapter.getSelectors();

// select the array of device ids
export const selectAlertGroupIds = selectIds;

// select the dictionary of device entities
export const selectAlertGroupEntities = selectEntities;

// select the array of devices
export const selectAllAlertGroups = selectAll;

// select the total device count
export const selectAlertGroupTotal = selectTotal;
