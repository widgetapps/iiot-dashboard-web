import {createAction, props, union} from '@ngrx/store';
import { Auth } from "../../../../shared/models/auth.model";

export const login = createAction(
  '[Login Page] Login',
  props<{ email: string; password: string }>()
);

export const loginSuccess = createAction(
  '[Login API] Login Success',
  props<{ response: Auth }>()
);

export const loginError = createAction(
  '[Login API] Login Error',
  props<{ message: string }>()
);

const all = union({
  login,
  loginSuccess,
  loginError
});

export type LoginActionsUnion = typeof all;

