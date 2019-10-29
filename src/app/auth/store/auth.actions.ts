import { Action } from "@ngrx/store";
import { User } from "../user.model";

export interface Credentials {
  login: string;
  password: string;
}

export const SIGNIN = "SIGNIN";
export const TRY_SIGNIN = "TRY_SIGNIN";
export const SIGNUP = "SIGNUP";
export const LOGOUT = "LOGOUT";
export const TRY_SIGNUP = "TRY_SIGNUP";
export const SET_USER_DATA = "SET_USER_DATA";
export const CLEAN_USER_DATA = "CLEAN_USER_DATA";

export class SignIn implements Action {
  readonly type = SIGNIN;
}

export class SignUp implements Action {
  readonly type = SIGNUP;
}

export class LogOut implements Action {
  readonly type = LOGOUT;
}

export class TrySignIn implements Action {
  readonly type = TRY_SIGNIN;

  constructor(public payload: { login: string; password: string }) {}
}

export class TrySignUp implements Action {
  readonly type = TRY_SIGNUP;

  constructor(public payload: User) {}
}

export class SetUserData implements Action {
  readonly type = SET_USER_DATA;

  constructor(public payload) {}
}

export class CleanUserData implements Action {
  readonly type = CLEAN_USER_DATA;
}

export type AuthActions =
  | SignIn
  | TrySignIn
  | SignUp
  | TrySignUp
  | SetUserData
  | CleanUserData
  | LogOut;
