import { Credentials } from "./../../auth.interfaces";
import { HttpClient, HttpHandler } from "@angular/common/http";
import { AuthHttpClientService } from "./../../services/auth-http-client.service";
import { RouterTestingModule } from "@angular/router/testing";
import { AuthEffects } from "./../auth.effects";
import { ReplaySubject, Observable, pipe, of } from "rxjs";
import { TestBed } from "@angular/core/testing";
import { User } from "../../user.model";
import * as fromAuthActions from './../auth.actions';

describe("Auth Effects", () => {
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [AuthEffects, AuthHttpClientService, HttpClient, HttpHandler]
    });
  });

  it("TrySignUp effect", () => {
    let actions$ = new ReplaySubject<any>(1);
    let mockUser = {
      firstName: "johnny",
      lastName: "sidness",
      login: "John999",
      password: "test123",
      phone: "0501865210",
      email: "nab@op.op",
      address: "LA, New Walley 145/85",
      userId: 988
    };

    let user = new User(mockUser);
    const trySignUpAction = {
      type: "[AUTH] TRY_SIGN_UP",
      payload: user.data
    };

    actions$.next(of(trySignUpAction));

    let authService = jasmine.createSpyObj("AuthService", ["signUp"]);
    let signUpSpy = jasmine
      .createSpy(authService.signUp)
      .and.returnValue(Observable);
    authService.signUp(mockUser);
    expect(authService.signUp).toHaveBeenCalledTimes(1);
    expect(signUpSpy()).toEqual(Observable);
    const effects = new AuthEffects(actions$, authService);

    effects.authSignUp$.subscribe(action => {
      expect(action).toEqual({
        type: "[AUTH] SIGN_UP"
      });
    });
  });

  it("TrySignIn effect", () => {
    let actions$ = new ReplaySubject<any>(1);
    let credentials: Credentials = {
      login: "John",
      password: "test123"
    };    
    let userData: Array<User> = [];
    const trySignInAction = {
      type: "[AUTH] TRY_SIGN_IN",
      payload: credentials
    };

    actions$.next(of(trySignInAction));

    let authService = jasmine.createSpyObj("AuthService", ["authenticateUser"]);
    let signInSpy = jasmine
      .createSpy(authService.authenticateUser)
      .and.returnValue(Observable);
    authService.authenticateUser(credentials);
    expect(authService.authenticateUser).toHaveBeenCalledTimes(1);

    expect(signInSpy()).toEqual(Observable);

    const effects = new AuthEffects(actions$, authService);

    effects.authSignIn$.subscribe(action => {
      expect(action).toEqual(
        fromAuthActions.SignIn()
      );

      expect(action).toEqual(
        fromAuthActions.SetUserData(userData) 
      );
    });
  });
});
