import { Component, OnInit, OnDestroy } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";
import { Store } from "@ngrx/store";
import * as authListActions from "./../store/auth.actions";
import * as fromApp from "./../../store/app.reducers";

@Component({
  selector: "app-sign-in",
  templateUrl: "./sign-in.component.html",
  styleUrls: ["./sign-in.component.scss"]
})
export class SignInComponent implements OnInit, OnDestroy {
  authStatus = new Subscription();
  authResults = {
    authStatus: true,
    onlineMode: navigator.onLine
  };

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {}

  private onLogin(form: NgForm): void {
    const { login, password } = form.value;
    this.store.dispatch(
      new authListActions.TrySignIn({ login: login, password: password })
    );
    this.checkAuthenticationStatus();
  }

  private checkAuthenticationStatus(): void {
    this.authStatus = this.store
      .select("authModule")
      .subscribe(
        (authenticationResult: {
          authStatus: boolean;
          userData: Array<any>;
        }) => {
          this.authResults.authStatus = authenticationResult.authStatus;
        }
      );
  }

  ngOnDestroy() {
    this.authStatus.unsubscribe();
  }
}
