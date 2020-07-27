import { Action, createReducer, on } from '@ngrx/store';
import { getTrends, getTrendsSuccess } from './trends-actions';
import { TelemetrySummary } from "../../../shared/models/telemetrysummary.model";

export interface State {
  telemetry: TelemetrySummary[];
  isLoading: boolean;
  errorMessage: string;
  hasError: boolean;
}

export const initialState: State = {
  telemetry: null,
  isLoading: false,
  errorMessage: '',
  hasError: false
};

export const featureKey = 'telemetrySummary';

const trendsReducer = createReducer(initialState,
  on(getTrends, state => ({ ...state, telemetry: state.telemetry })),
  on(getTrendsSuccess, (state, { data }) => ({ ...state, data: data, hasError: false, isLoading: false })),
);

export function reducer(state: State | undefined, action: Action) {
  return trendsReducer(state, action);
}
