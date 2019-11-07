import { Credentials } from './auth.facade';
import { AuthService } from "./../services/auth.service";
import { Effect, Actions, ofType } from "@ngrx/effects";
import { Injectable } from "@angular/core";
import * as AuthActions from "./../store/auth.actions";
import { map, mergeMap, switchMap } from "rxjs/operators";
import { User } from "../user.model";
import { SIGNUP } from "./auth.actions";

// please add error handling for your requests and for it better to use - https://nx.dev/angular/guides/misc-data-persistence
@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private authService: AuthService) {}

  @Effect()
  authSignIn = this.actions$.pipe(
    ofType(AuthActions.TRY_SIGNIN),
    map((action: AuthActions.TrySignIn) => {
      return action.payload;
    }),
    switchMap((authData: Credentials) => {
      return this.authService.authenticateUser(authData);
    }),
    mergeMap(
      (authResponse: {
        // if you have more than one property better to create interface for it
        authStatus: boolean;
        onlineMode: boolean;
        userData: any;
      }) => {
        // again please take a look at - https://www.yakaboo.ua/chistij-kod.html?gclid=Cj0KCQiAno_uBRC1ARIsAB496IUurPxiXmIZVx7qWb27sUMWAuOJXND5rCCEj51YbC3mXs561kwuT9caAt7aEALw_wcB
        // better to do like or add default value for authStatus
        // if (!authResponse.authStatus) {
        //   return [];
        // }
        //
        // return [
        //   {
        //     type: AuthActions.SIGNIN
        //   },
        //   {
        //     type: AuthActions.SET_USER_DATA,
        //     payload: authResponse.userData
        //   }
        // ];

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
      // and there is no need to return [] with type better to do like
      // return new SIGNUP();

      return [
        {
          type: AuthActions.SIGNUP
        }
      ];
    })
  );
}
