import { AuthState } from "./auth.reducers";
import { createSelector } from "@ngrx/store";
import { AppState } from "./../../store/app.reducers";

export const authModule = (state: AppState) => state.authModule;

export const getAuthStatus = createSelector(
  authModule,
  (state: AuthState) => state.authStatus
);

export const getUserData = createSelector(
  authModule,
  (state: AuthState) => state.userData[0]
);
