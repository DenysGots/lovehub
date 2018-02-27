import { Component, OnInit} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { NgClass } from '@angular/common';
import { Subscription } from 'rxjs/Subscription';

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
  dropdownLists = {
    homeDropdownList: false,
    usersDropdownList: false,
    analyticsDropdownList: false
  };

  mainSectionIsVisible: boolean;

  constructor(private administratorService: AdministratorService) {
  }

  ngOnInit() {
    this.administratorService.navBarState.subscribe(data => {
      return this.mainSectionIsVisible = data;
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
