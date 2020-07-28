import {createSelector, createFeatureSelector, select} from '@ngrx/store';
import * as fromTrends from './trends-reducer';
import * as fromDevices from "../../devices/store";

export interface TrendsState {
  telemetrySummary: fromTrends.State;
}

export const getTelemetryState = createFeatureSelector<fromTrends.State>('telemetrySummary');

export const selectAllTelemetry = createSelector(
  getTelemetryState,
  (state: fromTrends.State) => state.telemetry
);

export const selectClientTags = createSelector(
  getTelemetryState,
  (state: fromTrends.State) => state.tags
);
