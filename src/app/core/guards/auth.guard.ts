import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import * as authHelper from '../../shared/helpers/auth.helper';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = authHelper.getUser();

    if (currentUser) {
      // logged in so return true
      return true;
    }

    // TODO: not logged in so redirect to login page with the return url
    this.router.navigate(['/home'], { queryParams: { returnUrl: state.url } });
    return false;
  }

}
