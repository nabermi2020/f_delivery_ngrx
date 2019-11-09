import { AuthState } from './auth.reducers';
import { createSelector, select } from '@ngrx/store';
import { Store } from '@ngrx/store';
import * as fromApp from './../../store/app.reducers';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthSelectors {
    constructor(private store: Store<fromApp.AppState>) {}

    getAuthStatus = (state) => createSelector(state, (state: AuthState) => state.authStatus);
    
    authModule$ = this.store.pipe(select(this.getAuthStatus));
}
