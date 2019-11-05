import { AuthFacade } from './../store/auth.facade';
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import * as fromApp from "./../../store/app.reducers";
import * as authListActions from "./../store/auth.actions";

@Component({
  selector: "app-authentication",
  templateUrl: "./authentication.component.html",
  styleUrls: ["./authentication.component.scss"]
})
export class AuthenticationComponent implements OnInit {
  constructor(private router: Router,
              private store: Store<fromApp.AppState>,
              private authFacade: AuthFacade) {}

  ngOnInit() {
    this.checkAuthenticationStatus();
  }

  private checkAuthenticationStatus(): void {
    
    this.store.select("authModule").subscribe(authData => {
      if (authData.authStatus && navigator.onLine) {
        this.router.navigate(["/dashboard/products/pizza"]);
      } else {
        this.router.navigate([""]);
      }
    });

    this.isAuthenticated();
  }

  private isAuthenticated(): void {
    const userData = localStorage.getItem("userInfo");
    if (navigator.onLine && userData) {
      const { login, password } = JSON.parse(userData);
      //this.authFacade.trySignIn({ login, password }); // move to facade
      this.store.dispatch(new authListActions.TrySignIn({ login, password }));
    }
  }
}
