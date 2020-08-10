import { Action, createReducer, on } from '@ngrx/store';
import { clearTrends, getTags, getTagsSuccess, getTrends, getTrendsSuccess } from './trends-actions';
import { TelemetrySummaryModel } from "../../../shared/models";
import { TagGroupModel } from "../../../shared/models";
import { clientsAdapter } from "../../clients/store/clients-reducer";

export interface State {
  telemetry: TelemetrySummaryModel[];
  tags: TagGroupModel[];
  isLoading: boolean;
  errorMessage: string;
  hasError: boolean;
}

export const initialState: State = {
  telemetry: null,
  tags: null,
  isLoading: false,
  errorMessage: '',
  hasError: false
};

export const featureKey = 'telemetrySummary';

const trendsReducer = createReducer(initialState,
  on(getTrends, state => ({ ...state, telemetry: state.telemetry })),
  on(getTrendsSuccess, (state, { data }) => ({ ...state, telemetry: data, hasError: false, isLoading: false })),
  on(getTags, state => ({...state, tags: state.tags})),
  on(getTagsSuccess, (state, { data }) => ({ ...state, tags: data, hasError: false, isLoading: false })),
  on(clearTrends, state => ({ ...state, tags: null, telemetry: null }))
);

export function reducer(state: State | undefined, action: Action) {
  return trendsReducer(state, action);
}
