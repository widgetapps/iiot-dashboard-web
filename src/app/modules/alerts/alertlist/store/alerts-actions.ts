import { createAction, props, union } from '@ngrx/store';
import { AlertModel } from "../../../../shared/models";
import { AlertGroupModel } from "../../../../shared/models";

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
  props<{response: any}>()
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
  failure
});

export type AlertsActionsUnion = typeof all;
