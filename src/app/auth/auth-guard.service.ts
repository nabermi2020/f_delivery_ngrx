import { AuthFacade } from './store/auth.facade';
import { AuthSelectors } from './store/auth.selectors';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from './../store/app.reducers';


@Injectable()
export class AuthGuard implements CanActivate {
    isAuthorized: boolean;

    constructor(private router: Router,
                private route: ActivatedRoute,
                private authFacade: AuthFacade) {
        this.checkAuthenticationStatus();   
    }

    private checkAuthenticationStatus(): void {
        this.authFacade.authModule$
        .subscribe(
            (authData) => {
                console.log(authData);
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
