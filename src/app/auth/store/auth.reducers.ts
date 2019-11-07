import * as AuthActions from "./auth.actions";

export interface AppState {
  authModule: State;
}

// better to name it - AuthState, it is more semantic name
export interface State {
  authStatus: boolean;
  userData: Array<any>;
}

const initialState = {
  authStatus: false,
  userData: []
};

export function authReducers(
  state = initialState,
  action: AuthActions.AuthActions
) {
  // use have the latest version of ngrx, so you can refactor it, please take a look at - https://medium.com/ngrx/announcing-ngrx-version-8-ngrx-data-create-functions-runtime-checks-and-mock-selectors-a44fac112627
  switch (action.type) {
    case AuthActions.SIGNIN:
      return {
        ...state,
        authStatus: true
      };

    case AuthActions.SET_USER_DATA:
      return {
        ...state,
        userData: [...state.userData, ...action.payload]
      };

    case AuthActions.CLEAN_USER_DATA:
      return {
        ...state,
        userData: []
      };

    case AuthActions.SIGNUP:
      return {
        ...state
      };

    case AuthActions.LOGOUT:
      return {
        ...state,
        authStatus: false
      };

    default:
      return state;
  }
}
