import {Action, createReducer, on} from '@ngrx/store';
import { login } from './actions';
import { User } from '../../../../shared/models/user.model';

export interface State {
  user: User;
  loggedIn: boolean;
  isLoading: boolean;
  errorMessage: string;
  hasError: boolean;
}

export const initialState: State = {
  user: null,
  loggedIn: false,
  isLoading: false,
  errorMessage: '',
  hasError: false
};

export const loginFeatureKey = 'login';

const loginReducer = createReducer(initialState,
  on(login, state => ({ ...state, user: state.user }))
);

export function reducer(state: State | undefined, action: Action) {
  return loginReducer(state, action);
}
