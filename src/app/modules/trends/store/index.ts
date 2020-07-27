import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromTrends from './trends-reducer';

export interface AppState {
  telemetrySummary: fromTrends.State;
}

export const selectTelemetry = createFeatureSelector<AppState, fromTrends.State>('telemetrySummary');
