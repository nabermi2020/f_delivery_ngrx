import { Credentials } from './../auth.interfaces';
import { AuthSelectors } from './../store/auth.selectors';
import { AuthFacade } from './../store/auth.facade';
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-authentication",
  templateUrl: "./authentication.component.html",
  styleUrls: ["./authentication.component.scss"]
})
export class AuthenticationComponent implements OnInit {
  constructor(private router: Router,
              private authFacade: AuthFacade) {}

  ngOnInit() {
    this.checkAuthenticationStatus();
  }

  private checkAuthenticationStatus(): void {
    
    this.authFacade.authModule$.
      subscribe(authData => {
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
      const credentials: Credentials = JSON.parse(userData);
      this.authFacade.trySignIn(credentials);
    }
  }
}
