import { createAction, props, union } from '@ngrx/store';
import { TelemetrySummaryModel } from "../../../shared/models";
import { TagGroupModel } from "../../../shared/models";
import { TelemetryRawModel } from "../../../shared/models/telemetryraw.model";

export const getTrends = createAction (
  '[Trends] Get Trends',
  props<{ clientId: string, start: string, end: string, tags: string, interval: string, dataType: string }>()
);

export const getTrendsSuccess = createAction (
  '[Trends] Get Trends Success',
  props<{data: TelemetrySummaryModel[]}>()
)

export const getRawData = createAction (
  '[Trends] Get Raw Data',
  props<{ clientId: string, start: string, end: string, tags: string }>()
)

export const getRawDataSuccess = createAction (
  '[Trends] Get Raw Data Success',
  props<{data: TelemetryRawModel[]}>()
)

export const getTags = createAction (
  '[Trends] Get Tags',
  props<{ clientId: string }>()
);

export const getTagsSuccess = createAction (
  '[Trends] Get Tags Success',
  props<{data: TagGroupModel[]}>()
)

export const clearTrends = createAction(
  '[Trends] Clear All'
);

const all = union({
  getTrends,
  getTrendsSuccess,
  getTags,
  getTagsSuccess,
  clearTrends
});

export type TrendsActionsUnion = typeof all;
