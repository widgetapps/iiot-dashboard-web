import { createAction, props, union } from '@ngrx/store';
import { AlertModel } from "../../../shared/models";
import { AlertGroupModel } from "../../../shared/models";

// Alert actions
export const getAllAlerts = createAction (
  '[Alerts] Get All',
  props<{clientId: string}>()
);

export const getAllAlertsSuccess = createAction (
  '[Alerts] Get All Success',
  props<{alerts: AlertModel[]}>()
);

export const createAlert = createAction(
  '[Alerts] Create',
  props<{clientId: string, alert: AlertModel}>()
);

export const createAlertSuccess = createAction(
  '[Alerts] Create Success',
  props<{alert: AlertModel}>()
);

export const updateAlert = createAction(
  '[Alerts] Update',
  props<{clientId: string, alertId: string, alert: AlertModel}>()
);

export const updateAlertSuccess = createAction(
  '[Alerts] Update Success',
  props<{alert: AlertModel}>()
);

export const removeAlert = createAction(
  '[Alerts] Remove',
  props<{clientId: string, alertId: string}>()
);

export const removeAlertSuccess = createAction(
  '[Alerts] Remove Success',
  props<{message: string}>()
);

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
  props<{message: string}>()
);

export const failure = createAction(
  '[Alerts] Failure',
  props<{err: {concern: 'CREATE' | 'PATCH', error: any}}>()
);

const all = union({
  getAllAlerts,
  getAllAlertsSuccess,
  createAlert,
  createAlertSuccess,
  updateAlert,
  updateAlertSuccess,
  removeAlert,
  removeAlertSuccess,
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

export type AlertsActionsUnion = typeof all;
