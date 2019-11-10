import { AuthFacade } from './store/auth.facade';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthGuard implements CanActivate {
    isAuthorized: boolean;

    constructor(private router: Router,
                private route: ActivatedRoute,
                private authFacade: AuthFacade) {
        this.checkAuthenticationStatus();   
    }

    private checkAuthenticationStatus(): void {
        this.authFacade.authModuleStatus$
        .subscribe(
            (authStatus) => {
                console.log(authStatus);
                 this.isAuthorized = authStatus;
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
