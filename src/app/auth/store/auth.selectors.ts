import {Store} from '@ngrx/store';
import * as fromApp from './../../store/app.reducers';
import {Injectable} from '@angular/core';
import {createSelector} from "@ngrx/store";
import {State} from "./auth.reducers";

@Injectable()
export class AuthSelectors {
  constructor(private store: Store<fromApp.AppState>) {
  }

  // better to do it, like
  const getAuthStatus = (state) => createSelector(
    state,
    (state: State) => state.authStatus
  );
  // and inside facade do, like
  authModule$ = this.store.pipe(select(getAuthStatus));
  // and use it from facade not selectors

  public authModule$ = this.store.select("authModule");
}
