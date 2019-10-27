import { Action } from '@ngrx/store';


export interface Credentials {
    login: string;
    password: string;
}

export const SIGNIN = 'SIGNIN';
export const TRY_SIGNIN = 'TRY_SIGNIN' 

export class SignIn implements Action {
    readonly type = SIGNIN;
}

export class TrySignIn implements Action {
    readonly type = TRY_SIGNIN;

    constructor(public payload: {login: string, password: string}) {

    }
}
 
export type AuthActions = SignIn | TrySignIn;