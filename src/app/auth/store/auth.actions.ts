import { UserData } from './../auth.interfaces';
import { Action, createAction, props } from "@ngrx/store";
import { User } from "../user.model";

export interface Credentials {
  login: string;
  password: string;
}

export const SignIn = createAction(
  '[AUTH] SIGN_IN'
);

export const SignUp = createAction(
  '[AUTH] SIGN_UP'  
);

export const TrySignIn = createAction(
  '[AUTH] TRY_SIGN_IN',
  props<Credentials>()
);

export const LogOut = createAction(
  '[AUTH] LOG_OUT' 
);

export const TrySignUp = createAction(
  '[AUTH] TRY_SIGN_UP',
  props<User>()
);

export const SetUserData = createAction(
  '[AUTH] SET_USER_DATA',
  props<Array<UserData>>()
);

export const CleanUserData = createAction(
  '[AUTH] CLEAN_USER_DATA' 
);











// export const SIGNIN = "[AUTH] SIGN_IN";
// export const TRY_SIGNIN = "[AUTH] TRY_SIGN_IN";
// export const SIGNUP = "[AUTH] SIGN_UP";
// export const LOGOUT = "[AUTH] LOG_OUT";
// export const TRY_SIGNUP = "[AUTH] TRY_SIGN_UP";
// export const SET_USER_DATA = "[AUTH] SET_USER_DATA";
// export const CLEAN_USER_DATA = "[AUTH] CLEAN_USER_DATA";

// export class SignIn implements Action {
//   readonly type = SIGNIN;
// }

// export class SignUp implements Action {
//   readonly type = SIGNUP;
// }

// export class LogOut implements Action {
//   readonly type = LOGOUT;
// }

// export class TrySignIn implements Action {
//   readonly type = TRY_SIGNIN;

//   constructor(public payload: Credentials) {}
// }

// export class TrySignUp implements Action {
//   readonly type = TRY_SIGNUP;

//   constructor(public payload: User) {}
// }

// export class SetUserData implements Action {
//   readonly type = SET_USER_DATA;

//   constructor(public payload: Array<UserData>) {}
// }

// export class CleanUserData implements Action {
//   readonly type = CLEAN_USER_DATA;
// }

// export type AuthActions =
//   | SignIn
//   | TrySignIn
//   | SignUp
//   | TrySignUp
//   | SetUserData
//   | CleanUserData
//   | LogOut;
