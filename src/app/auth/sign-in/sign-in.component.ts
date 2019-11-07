import { Credentials } from './../auth.interfaces';
import { AuthFacade } from './../store/auth.facade';
import { LoadingService } from './../../shared/services/loading.service';
import { Component, OnInit, OnDestroy } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";
import { Store } from "@ngrx/store";
import * as authListActions from "./../store/auth.actions";
import * as fromApp from "./../../store/app.reducers";
import { EditModalService } from 'src/app/shared/services/edit-modal.service';

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

  constructor(private store: Store<fromApp.AppState>,
              private authFacade: AuthFacade) {}

  ngOnInit() {}

  ngOnDestroy() {
    this.authStatus.unsubscribe();
  }

  public onLogin(form: NgForm): void {
    const credentials: Credentials = form.value;
    this.authFacade.trySignIn(credentials);
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
}
