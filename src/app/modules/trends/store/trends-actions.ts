import { createAction, props, union } from '@ngrx/store';
import { TelemetrySummary } from "../../../shared/models/telemetrysummary.model";

export const getTrends = createAction (
  '[Trends] Get Trends',
  props<{ clientId: string, start: string, end: string, tags: string, interval: string }>()
);

export const getTrendsSuccess = createAction (
  '[Trends] Get Trends Success',
  props<{data: TelemetrySummary[]}>()
)

const all = union({
  getTrends,
  getTrendsSuccess
});

export type TrendsActionsUnion = typeof all;
