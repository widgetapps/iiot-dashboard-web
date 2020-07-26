import * as fromDevices from './reducer';
import {Action, combineReducers, createFeatureSelector, createSelector} from '@ngrx/store';

export interface DevicesState {
  devices: fromDevices.State;
}

/** Provide reducers with AoT-compilation compliance */
/* Do I need this?
export function reducers(state: DevicesState | undefined, action: Action) {
  return combineReducers({
    devices: fromDevices.reducer
  })(state, action)
}
 */

/**
 * The createFeatureSelector function selects a piece of state from the root of the state object.
 * This is used for selecting feature states that are loaded eagerly or lazily.
 */

export const getDevicesState = createFeatureSelector<DevicesState>('devices');

export const getDevicesEntitiesState = createSelector(
  getDevicesState,
  state => state.devices
);

export const {
  selectAll: getAllDevices,
} = fromDevices.devicesAdapter.getSelectors(getDevicesEntitiesState);

export const getDeviceById = (id: number) => createSelector(
  getDevicesEntitiesState,
  fromDevices.getDeviceById(id)
);
