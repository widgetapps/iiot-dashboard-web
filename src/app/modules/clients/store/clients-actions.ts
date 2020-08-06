import { createAction, props, union } from '@ngrx/store';
import { ClientModel } from "../../../shared/models";

export const getAll = createAction (
  '[Clients] Get All'
);

export const getAllSuccess = createAction (
  '[Clients] Get All Success',
  props<{clients: ClientModel[]}>()
);

export const setSelected = createAction (
  '[Clients] Set Selected',
  props<{client: string}>()
);

export const failure = createAction(
  '[Clients] Failure',
  props<{err: {concern: 'CREATE' | 'PATCH', error: any}}>()
);

export const clearClients = createAction(
  '[Clients] Clear All'
);

const all = union({
  getAll,
  getAllSuccess,
  setSelected,
  failure
});

export type ClientsActionsUnion = typeof all;
