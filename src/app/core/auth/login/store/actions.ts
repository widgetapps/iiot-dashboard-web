import {createAction, props, union} from '@ngrx/store';
import { User } from "../../../../shared/models/user.model";

export const login = createAction(
  '[Login Page] Login',
  props<{ email: string; password: string }>()
);

export const loginSuccess = createAction(
  '[Login API] Login Success',
  props<{user: User}>()
);

export const loginError = createAction(
  '[Login API] Login Error',
  props<{user: User}>()
);

const all = union({
  login,
  loginSuccess,
  loginError
});

export type LoginActionsUnion = typeof all;

