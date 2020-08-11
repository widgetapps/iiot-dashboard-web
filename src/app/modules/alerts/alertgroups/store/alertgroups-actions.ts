import { createAction, props, union } from '@ngrx/store';
import { AlertGroupModel } from "../../../../shared/models";

// Alert Group Actions
export const getAllAlertGroups = createAction (
  '[Alert Groups] Get All',
  props<{clientId: string}>()
);

export const getAllAlertGroupsSuccess = createAction (
  '[Alert Groups] Get All Success',
  props<{alertGroups: AlertGroupModel[]}>()
);

export const createAlertGroup = createAction(
  '[Alert Groups] Create',
  props<{clientId: string, alertGroup: AlertGroupModel}>()
);

export const createAlertGroupSuccess = createAction(
  '[Alert Groups] Create Success',
  props<{alertGroup: AlertGroupModel}>()
);

export const updateAlertGroup = createAction(
  '[Alert Groups] Update',
  props<{clientId: string, code: string, alertGroup: AlertGroupModel}>()
);

export const updateAlertGroupSuccess = createAction(
  '[Alert Groups] Update Success',
  props<{alertGroup: AlertGroupModel}>()
);

export const removeAlertGroup = createAction(
  '[Alert Groups] Remove',
  props<{clientId: string, code: string}>()
);

export const removeAlertGroupSuccess = createAction(
  '[Alert Groups] Remove Success',
  props<{response: any}>()
);

export const failure = createAction(
  '[Alert Groups] Failure',
  props<{err: {concern: 'CREATE' | 'PATCH', error: any}}>()
);

const all = union({
  getAllAlertGroups,
  getAllAlertGroupsSuccess,
  createAlertGroup,
  createAlertGroupSuccess,
  updateAlertGroup,
  updateAlertGroupSuccess,
  removeAlertGroup,
  removeAlertGroupSuccess,
  failure
});

export type AlertGroupsActionsUnion = typeof all;
