import { createAction, props, union } from '@ngrx/store';
import { Device } from "../../../shared/models";

export const getAll = createAction (
  '[Devices] Get All',
  props<{ clientId: string }>()
);

export const getAllSuccess = createAction (
  '[Devices] Get All Success',
  props<{devices: Device[]}>()
)

export const failure = createAction(
  '[Devices] Failure',
  props<{err: {concern: 'CREATE' | 'PATCH', error: any}}>()
);

const all = union({
  getAll,
  getAllSuccess,
  failure
});

export type DevicesActionsUnion = typeof all;
