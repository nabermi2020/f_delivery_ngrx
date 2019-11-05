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
}
 