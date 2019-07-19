import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (sessionStorage.getItem('token')) {
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}

@Injectable()
export class AdminAuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if(sessionStorage.getItem('role')=='ROLE_ADMIN') {
            return true;
        }
        if(sessionStorage.getItem('role')=='ROLE_USER')
            this.router.navigate(['employee'], { queryParams: { returnUrl: state.url }});
        else this.router.navigate(['login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}