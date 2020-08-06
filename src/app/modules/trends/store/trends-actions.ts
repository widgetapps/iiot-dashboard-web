import { createAction, props, union } from '@ngrx/store';
import { TelemetrySummary } from "../../../shared/models/telemetrysummary.model";
import { TagGroup } from "../../../shared/models/taggroup.model";

export const getTrends = createAction (
  '[Trends] Get Trends',
  props<{ clientId: string, start: string, end: string, tags: string, interval: string }>()
);

export const getTrendsSuccess = createAction (
  '[Trends] Get Trends Success',
  props<{data: TelemetrySummary[]}>()
)

export const getTags = createAction (
  '[Trends] Get Tags',
  props<{ clientId: string }>()
);

export const getTagsSuccess = createAction (
  '[Trends] Get Tags Success',
  props<{data: TagGroup[]}>()
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
