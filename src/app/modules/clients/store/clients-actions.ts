import { createAction, props, union } from '@ngrx/store';
import { ClientModel } from "../../../shared/models";

export const getAll = createAction (
  '[Clients] Get All'
);

export const getAllSuccess = createAction (
  '[Clients] Get All Success',
  props<{clients: ClientModel[]}>()
)

export const failure = createAction(
  '[Clients] Failure',
  props<{err: {concern: 'CREATE' | 'PATCH', error: any}}>()
);

const all = union({
  getAll,
  getAllSuccess,
  failure
});

export type ClientsActionsUnion = typeof all;
