import { Component, OnInit } from '@angular/core';

import { AdministratorService } from '../../../services/administrator.service';

@Component({
  selector: 'app-administrator-header',
  templateUrl: './administrator-header.component.html',
  styleUrls: [
    '../shared/normalize.scss',
    '../shared/default-styles.scss',
    './administrator-header.component.scss'
  ]
})
export class AdministratorHeaderComponent implements OnInit {
  mainSectionIsVisible: boolean;

  currentUser = {
    firstName: '',
    lastName: ''
  };

  constructor(private administratorService: AdministratorService) {
  }

  ngOnInit() {
    this.administratorService.receivedUsers.subscribe(data => {
      if (data.currentUser) {
        this.currentUser = data.currentUser;
      }
    });

    this.administratorService.navBarState.subscribe(data => {
      return this.mainSectionIsVisible = data;
    });
  }

  hideNavBar(): void {
    this.administratorService.changeNavBarState();
  }
}
