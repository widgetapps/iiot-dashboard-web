import { Device } from '../../../shared/models';
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import {
  getAllSuccess
} from './actions';

// This adapter will allow is to manipulate contacts (mostly CRUD operations)
export const devicesAdapter = createEntityAdapter<Device>({
  selectId: (device: Device) => device._id,
  sortComparer: false
});

// -----------------------------------------
// The shape of EntityState
// ------------------------------------------
// interface EntityState<Contact> {
//   ids: string[] | number[];
//   entities: { [id: string]: Contact };
// }
// -----------------------------------------
// -> ids arrays allow us to sort data easily
// -> entities map allows us to access the data quickly without iterating/filtering though an array of objects

export interface State extends EntityState<Device> {
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

//export const getDeviceById = (id: string) => (state: State) => state.entities[id];

// get the selectors
const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = devicesAdapter.getSelectors();

// select the array of user ids
export const selectDeviceIds = selectIds;

// select the dictionary of user entities
export const selectDeviceEntities = selectEntities;

// select the array of users
export const selectAllDevices = selectAll;

// select the total user count
export const selectDeviceTotal = selectTotal;
