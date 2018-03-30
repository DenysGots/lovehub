import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { LoggedInUser } from './logged-in-user';

@Component({
  moduleId: module.id,
  template: `Logged In: {{ loggedInUser.name}} | 
              <button (click)="logout()">Logout</button>
      `
})
export class LogoutComponent implements OnInit {
  loggedInUser: LoggedInUser;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.loggedInUser = this.authService.getLoggedInUser();
  }

  logout() {
    this.authService.logout();
    this.router.navigate([ this.authService.getLoginUrl() ]);
  }
}
