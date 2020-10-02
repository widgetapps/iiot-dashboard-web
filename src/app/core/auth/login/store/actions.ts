import {createAction, props, union} from '@ngrx/store';
import { AuthModel } from "../../../../shared/models";
import { UserModel } from "../../../../shared/models";

export const login = createAction(
  '[Login Page] Login',
  props<{ email: string; password: string }>()
);

export const loginSuccess = createAction(
  '[Login API] Login Success',
  props<{ user: UserModel }>()
);

export const authSuccess = createAction(
  '[Login API] Auth Success',
  props<{ response: AuthModel }>()
);

export const reloadAuth = createAction(
  '[Login API] Reload Auth',
  props<{ response: AuthModel }>()
);

export const logout = createAction(
  '[Login Page] Logout'
);

export const loginError = createAction(
  '[Login API] Login Error',
  props<{ message: string }>()
);

const all = union({
  login,
  loginSuccess,
  authSuccess,
  loginError
});

export type LoginActionsUnion = typeof all;

