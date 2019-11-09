import { Credentials } from './../auth.interfaces';
import { User } from './../user.model';
import { Injectable } from '@angular/core';
import { TrySignIn } from "./auth.actions";
import * as fromApp from './../../store/app.reducers';
import * as authListActions from './../store/auth.actions';
import { Store } from '@ngrx/store';

@Injectable({
    providedIn: 'root'
})
export class AuthFacade {
    public authModule$ = this.store.select("authModule");
    
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
 