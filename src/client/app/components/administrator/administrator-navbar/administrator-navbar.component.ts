import { Component, OnInit } from '@angular/core';
import * as jwt_decode from 'jwt-decode';

import { AdministratorService } from '../../../services/administrator.service';

@Component({
  selector: 'app-administrator-navbar',
  templateUrl: './administrator-navbar.component.html',
  styleUrls: [
    '../shared/normalize.scss',
    '../shared/default-styles.scss',
    './administrator-navbar.component.scss'
  ]
})
export class AdministratorNavbarComponent implements OnInit {
  public dropdownLists = {
    homeDropdownList: false,
    usersDropdownList: false,
    analyticsDropdownList: false
  };
  public currentUserId: number;
  public currentUser = {} as any;
  public mainSectionIsVisible: boolean;

  constructor(private administratorService: AdministratorService) {
  }

  ngOnInit() {
    this.administratorService.navBarState.subscribe(data => {
      return this.mainSectionIsVisible = data;
    });

    this.currentUserId = parseInt(jwt_decode(localStorage.getItem('jwt_token')).id, 10);
    this.administratorService.getCurrentUserParameters(this.currentUserId);

    this.administratorService.receivedCurrentUser.subscribe(data => {
      return this.currentUser = data;
    });
  }

  adminNavbarHandler(list): void {
    for (const prop in this.dropdownLists) {
      if (this.dropdownLists.hasOwnProperty(prop)) {
        if (prop !== list && this.dropdownLists[prop] !== false) {
          this.dropdownLists[prop] = false;
        }
      }
    }

    this.dropdownLists[list] = !this.dropdownLists[list];
  }

}
