import * as AuthActions from "./auth.actions";

export interface AppState {
  authModule: State;
}

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
