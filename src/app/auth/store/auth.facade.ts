import { Credentials } from './../auth.interfaces';
import { User } from './../user.model';
import { Injectable } from '@angular/core';
import * as fromApp from './../../store/app.reducers';
import * as authListActions from './../store/auth.actions';
import { Store, select } from '@ngrx/store';
import * as authSelectors from './../store/auth.selectors';

@Injectable({
    providedIn: 'root'
})
export class AuthFacade {
    
    public authModuleStatus$ = this.store.pipe(select(authSelectors.getAuthStatus));

    constructor(private store: Store<fromApp.AppState>) {}

    public trySignIn(payload: Credentials): void {
        this.store.dispatch(authListActions.TrySignIn(payload));
    }

    public trySignUp(payload: User): void {
        this.store.dispatch(authListActions.TrySignUp(payload));
    }

    public logOut(): void {
        this.store.dispatch(authListActions.LogOut());
        this.store.dispatch(authListActions.CleanUserData());
    }
}
