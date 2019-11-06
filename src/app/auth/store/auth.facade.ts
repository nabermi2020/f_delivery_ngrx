import { User } from './../user.model';
import { Injectable } from '@angular/core';
import { TrySignIn } from "./auth.actions";
import * as fromApp from './../../store/app.reducers';
import * as authListActions from './../store/auth.actions';
import { Store } from '@ngrx/store';

export interface Credentials {
    login: string;
    password: string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthFacade {
    constructor(private store: Store<fromApp.AppState>) {}

    public trySignIn(payload: Credentials): void {
        this.store.dispatch(new authListActions.TrySignIn(payload));
    }

    public trySignUp(payload: User): void {
        this.store.dispatch(new authListActions.TrySignUp(payload));        
    }

    public logOut(): void {
        this.store.dispatch(new authListActions.LogOut());
        this.store.dispatch(new authListActions.CleanUserData());
    }
}
 