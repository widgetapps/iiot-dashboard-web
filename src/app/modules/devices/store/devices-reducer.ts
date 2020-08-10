import { DeviceModel } from '../../../shared/models';
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import {
  getAllSuccess
} from './devices-actions';

// This adapter will allow is to manipulate contacts (mostly CRUD operations)
export const devicesAdapter = createEntityAdapter<DeviceModel>({
  selectId: (device: DeviceModel) => device._id,
  sortComparer: false
});

export interface State extends EntityState<DeviceModel> {
  // additional props here
}

export const INIT_STATE: State = devicesAdapter.getInitialState({
  // additional props default values here
});

export const featureKey = 'devices';

export const reducer = createReducer<State>(
  INIT_STATE,
  on(getAllSuccess, (state, {devices}) =>
    devicesAdapter.setAll(devices, state)
  )
);

// get the selectors
const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = devicesAdapter.getSelectors();

// select the array of device ids
export const selectDeviceIds = selectIds;

// select the dictionary of device entities
export const selectDeviceEntities = selectEntities;

// select the array of devices
export const selectAllDevices = selectAll;

// select the total device count
export const selectDeviceTotal = selectTotal;
