import { AuthService } from './services/auth.service';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Injectable } from '@angular/core';


@Injectable()
export class AuthGuard implements CanActivate {
    isAuthorized: boolean;

    constructor(private router: Router,
                private route: ActivatedRoute,
                private authService: AuthService) {
        // this.isAuthorized = this.authService.isAuthorized();
    }

    /**
     * Check user authentication status
     * @param route snapshot
     * @param router state
     * @return return authentication status
     */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.authService.isAuthorized() && localStorage.getItem('userInfo')) {
            return true;
        } else {
            this.router.navigate([''], {relativeTo: this.route});
            return false;
        }
    }
}
