import { AuthFacade } from './auth.facade';
import { Credentials } from './auth.actions';
import { AuthService } from "./../services/auth.service";
import { Effect, Actions, ofType, createEffect } from "@ngrx/effects";
import { Injectable } from "@angular/core";
import * as AuthActions from "./../store/auth.actions";
import { map, mergeMap, switchMap } from "rxjs/operators";
import { User } from "../user.model";
import { logging } from 'protractor';
import { UserData } from '../auth.interfaces';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions,
              private authService: AuthService) { }

  authSignIn$ = createEffect( () =>
    this.actions$.pipe(
      ofType('[AUTH] TRY_SIGN_IN'),
      map((action: Credentials)=> {
        return {
          login: action.login,
          password: action.password
        }
      }),
      switchMap((authData: Credentials) => {
        return this.authService.authenticateUser(authData);
      }),
      mergeMap(
        (authResponse: {
          authStatus: boolean;
          onlineMode: boolean;
          userData: any;
        }) => {
          console.log(authResponse.userData);
          if (authResponse.authStatus) {
            return [
              {
                type: '[AUTH] SIGN_IN'
              },
              {
                type: '[AUTH] SET_USER_DATA',
                payload: authResponse.userData
              }
            ];
          } else {
            return [];
          }
        }
      )
    ) );


  authSignUp$ = createEffect( () =>
    this.actions$.pipe(
      ofType('[AUTH] TRY_SIGN_UP'),
      map((action) => {
        console.log(action["data"]);
        return action["data"];
      }),
      switchMap((userData: User) => {

        return this.authService.signUp(userData);
      }),
      mergeMap((registrationStatus: Response) => {
        return [
          {
            type: '[AUTH] SIGN_UP'
          }
        ];
      })
    )
  );

}

// @Effect()
// authSignUp = this.actions$.pipe(
//   ofType(AuthActions.TRY_SIGNUP),
//   map((action: AuthActions.TrySignUp) => action.payload),
//   switchMap((userData: User) => {
//     return this.authService.signUp(userData);
//   }),
//   mergeMap((registrationStatus: Response) => {
//     return [
//       {
//         type: AuthActions.SIGNUP
//       }
//     ];
//   })
// );
