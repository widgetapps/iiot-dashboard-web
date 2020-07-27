import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromTrends from './trends-reducer';

export interface TrendsState {
  telemetrySummary: fromTrends.State;
}

export const getTelemetryState = createFeatureSelector<fromTrends.State>('telemetrySummary');

export const selectAllTelemetry = createSelector(
  getTelemetryState,
  (state: fromTrends.State) => state.telemetry
);
