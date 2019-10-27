import { AuthService } from './../services/auth.service';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import * as AuthActions from './../store/auth.actions';
import { map, mergeMap, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class AuthEffects {
   

    @Effect()
    authSignIn = this.actions$
        .pipe(
            ofType(AuthActions.TRY_SIGNIN),
            map((action: AuthActions.TrySignIn) => {
                console.log(action.payload);
                return action.payload;
            }),
            switchMap(
                (authData: {login: string, password: string}) => {
                    return this.authService.authenticateUser(authData.login, authData.password);
                }
            ),
            mergeMap(
                (authResponse: {authStatus: boolean, onlineMode: boolean}) => {
                    if (authResponse.authStatus) {
                        return [
                            {
                                type: AuthActions.SIGNIN
                            }
                        ]
                    }
                }
            )
        );

    // @Effect()
    // authSignUp = this.actions$    
    //     .pipe(
    //         ofType(AuthActions.TRY_SIGNIN),
    //         mergeMap(res=> {
    //             return [
    //                 {
    //                     type: AuthActions.SIGNIN
    //                 }
    //             ]
    //         })
    //     );

        constructor(private actions$: Actions,
            private authService: AuthService) {}

         

        

    
    
    
}