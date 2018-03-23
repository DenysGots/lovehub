import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import {Observable} from 'rxjs/Observable';
import {UsersService} from './users.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService, private usersService: UsersService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const url: string = state.url,
      loginUrl = this.authService.getLoginUrl();

    console.log(url, this.authService.isTokenExpired());

    if (!this.authService.isTokenExpired()) {
      const {userId, userRole} = this.authService.getLoggedInUserCredential();
      this.usersService.verifyUserRole(userId, userRole).subscribe(isAuth => {
        if (!isAuth) {
          return true;
        }

        this.router.navigate(['/forbidden']);
        return false;
      });
    } else {
      this.authService.setRedirectUrl(url);
      this.router.navigate([loginUrl]);
      return false;
    }
  }
}
