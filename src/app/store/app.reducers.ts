import * as fromAuth from "./../auth/store/auth.reducers";
import * as fromDashboard from "./../dashboard/store/products.reducers";
import { ActionReducerMap } from "@ngrx/store";

export interface AppState {
  authModule: fromAuth.State;
  dashboardModule: fromDashboard.State;
}

export const reducers: ActionReducerMap<AppState> = {
  authModule: fromAuth.authReducers,
  dashboardModule: fromDashboard.productReducer
};
