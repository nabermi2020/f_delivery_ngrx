import { Action } from "@ngrx/store";
import { User } from "../user.model";

export interface Credentials {
  login: string;
  password: string;
}

// (Optional) I think more correct - SIGN_IN
export const SIGNIN = "[AUTH] SIGNIN";
export const TRY_SIGNIN = "[AUTH] TRY_SIGNIN";
export const SIGNUP = "[AUTH] SIGNUP";
export const LOGOUT = "[AUTH] LOGOUT";
export const TRY_SIGNUP = "[AUTH] TRY_SIGNUP";
export const SET_USER_DATA = "[AUTH] SET_USER_DATA";
export const CLEAN_USER_DATA = "[AUTH] CLEAN_USER_DATA";

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

  // can be - payload: Credentials
  constructor(public payload: { login: string; password: string }) {}
}

export class TrySignUp implements Action {
  readonly type = TRY_SIGNUP;

  constructor(public payload: User) {}
}

export class SetUserData implements Action {
  readonly type = SET_USER_DATA;

  // you have forgotten to add type for payload
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
