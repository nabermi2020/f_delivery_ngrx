import { AuthStatus } from "./../auth.interfaces";
import { Credentials } from "./auth.actions";
import { AuthService } from "./../services/auth.service";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { Injectable } from "@angular/core";
import { map, mergeMap, switchMap, catchError } from "rxjs/operators";
import { User } from "../user.model";
import { throwError, of } from "rxjs";
import * as fromAuthActions from "./../store/auth.actions";


@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private authService: AuthService) {}

  authSignIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType("[AUTH] TRY_SIGN_IN"),
      map((action: Credentials) => {
        return {
          login: action.login,
          password: action.password
        };
      }),
      switchMap((authData: Credentials) => {
        return this.authService.authenticateUser(authData).pipe(
          catchError(err => {
            return throwError(err);
          })
        );
      }),
      mergeMap((authResponse: AuthStatus) => {
          return of(
            fromAuthActions.SignIn(),
            fromAuthActions.SetUserData(authResponse.userData)
          );
        
      })
    )
  );

  authSignUp$ = createEffect(() =>
    this.actions$.pipe(
      ofType("[AUTH] TRY_SIGN_UP"),
      map(action => {
        console.log(action["data"]);
        return action["data"];
      }),
      switchMap((userData: User) => {
        return this.authService.signUp(userData).pipe(
          catchError(err => {
            return throwError(err);
          })
        );
      }),
      mergeMap(() => {
        return of(fromAuthActions.SignUp());
      })
    )
  );
}
