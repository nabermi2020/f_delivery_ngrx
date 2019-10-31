import { AuthService } from "./../services/auth.service";
import { Effect, Actions, ofType } from "@ngrx/effects";
import { Injectable } from "@angular/core";
import * as AuthActions from "./../store/auth.actions";
import { map, mergeMap, switchMap } from "rxjs/operators";
import { User } from "../user.model";

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private authService: AuthService) {}

  @Effect()
  authSignIn = this.actions$.pipe(
    ofType(AuthActions.TRY_SIGNIN),
    map((action: AuthActions.TrySignIn) => {
      //console.log(action.payload);
      return action.payload;
    }),
    switchMap((authData: { login: string; password: string }) => {
      return this.authService.authenticateUser(
        authData.login,
        authData.password
      );
    }),
    mergeMap(
      (authResponse: {
        authStatus: boolean;
        onlineMode: boolean;
        userData: any;
      }) => {
        //console.log(authResponse.userData);
        if (authResponse.authStatus) {
          return [
            {
              type: AuthActions.SIGNIN
            },
            {
              type: AuthActions.SET_USER_DATA,
              payload: authResponse.userData
            }
          ];
        } else {
          return [];
        }
      }
    )
  );

  @Effect()
  authSignUp = this.actions$.pipe(
    ofType(AuthActions.TRY_SIGNUP),
    map((action: AuthActions.TrySignUp) => action.payload),
    switchMap((userData: User) => {
      return this.authService.signUp(userData);
    }),
    mergeMap((registrationStatus: Response) => {
      return [
        {
          type: AuthActions.SIGNUP
        }
      ];
    })
  );
}
