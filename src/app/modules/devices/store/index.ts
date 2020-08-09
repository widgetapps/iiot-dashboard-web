import * as fromDevices from './reducer';
import {Action, combineReducers, createFeatureSelector, createSelector} from '@ngrx/store';

export interface DevicesState {
  devices: fromDevices.State;
}

/** Provide reducers with AoT-compilation compliance */
export function reducers(state: DevicesState | undefined, action: Action) {
  return combineReducers({
    devices: fromDevices.reducer
  })(state, action)
}

export const getDevicesState = createFeatureSelector<fromDevices.State>('devices');

export const selectDeviceIds = createSelector(
  getDevicesState,
  fromDevices.selectDeviceIds // shorthand for usersState => fromUser.selectUserIds(usersState)
);
export const selectDeviceEntities = createSelector(
  getDevicesState,
  fromDevices.selectDeviceEntities
);
export const selectAllDevices = createSelector(
  getDevicesState,
  fromDevices.selectAllDevices
);
export const selectDeviceTotal = createSelector(
  getDevicesState,
  fromDevices.selectDeviceTotal
);
