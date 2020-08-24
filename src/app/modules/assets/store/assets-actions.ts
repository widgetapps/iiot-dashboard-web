import { createAction, props, union } from '@ngrx/store';
import { AssetModel } from "../../../shared/models";

export const getAll = createAction (
  '[Assets] Get All',
  props<{ clientId: string }>()
);

export const getAllSuccess = createAction (
  '[Assets] Get All Success',
  props<{assets: AssetModel[]}>()
)

export const failure = createAction(
  '[Assets] Failure',
  props<{err: {concern: 'CREATE' | 'PATCH', error: any}}>()
);

const all = union({
  getAll,
  getAllSuccess,
  failure
});

export type AssetsActionsUnion = typeof all;
