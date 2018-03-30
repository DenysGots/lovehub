import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { UsersProfileService } from './users-profile.service';

import { UserProfile } from '../models/user-profile'

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router,
              private authService:AuthService,
              private usersService: UsersService,
              private usersProfileService: UsersProfileService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const url: string = state.url,
      loginUrl = this.authService.getLoginUrl();

    if (this.authService.isLoggedInUser() && !this.authService.isTokenExpired()) {
      let { userId } = this.authService.getLoggedInUser(),
        userRole;
      this.usersProfileService.findByUserId(userId).subscribe(userProfile => {
        userRole = (<UserProfile>userProfile).role;

        console.log(userId, userRole);
        this.usersService.verifyUserRole(userId, userRole).subscribe(isAuth => {
          if (!isAuth) {
            return true;
          }

          this.router.navigate(['/forbidden']);
          return false;
        });
      });
    } else {
      this.authService.setRedirectUrl(url);
      this.router.navigate([loginUrl]);
      return false;
    }
  }
}
