import * as AuthActions from "./auth.actions";
import { createReducer, on } from '@ngrx/store';

export interface AppState {
  authModule: AuthState;
}

export interface AuthState {
  authStatus: boolean;
  userData: Array<any>;
}

export const initialState = {
  authStatus: false,
  userData: []
};

export const authReducers = createReducer(
  initialState,
  on(AuthActions.SignIn, state => ({
    ...state,
    authStatus: true
  })),

  on(AuthActions.SignUp, state => ({
    ...state
  })),

  on(AuthActions.LogOut, state => ({
    ...state,
    authStatus: false
  })),

  on(AuthActions.SetUserData, (state, payload) => ({
    ...state,
    userData: [...state.userData, ...payload]
  })),

  on(AuthActions.CleanUserData, state => ({
    ...state,
    userData: []
  }))
);

