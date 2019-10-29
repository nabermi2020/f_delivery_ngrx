import { AuthService } from './services/auth.service';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from './../store/app.reducers';


@Injectable()
export class AuthGuard implements CanActivate {
    isAuthorized: boolean;

    constructor(private router: Router,
                private route: ActivatedRoute,
                private authService: AuthService,
                private store: Store<fromApp.AppState>) {
        this.checkAuthenticationStatus();   
    }

    private checkAuthenticationStatus(): void {
        this.store.select('authModule')
            .subscribe(
                authData => {
                    this.isAuthorized = authData.authStatus;
            }
        );
    }

    public canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): boolean {
        if (this.isAuthorized && localStorage.getItem('userInfo')) {
            return true;
        } else {
            this.router.navigate([''], {relativeTo: this.route});
            return false;
        }
    }
}
