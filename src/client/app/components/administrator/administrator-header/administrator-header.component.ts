import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
  public mainSectionIsVisible: boolean;
  public searchInput: string;

  public currentUser = {
    firstName: '',
    lastName: '',
    role: ''
  };

  constructor(
    private administratorService: AdministratorService,
    private router: Router) {
  }

  ngOnInit() {
    this.administratorService.navBarState.subscribe(data => {
      return this.mainSectionIsVisible = data;
    });

    this.administratorService.receivedCurrentUser.subscribe(data => {
      return this.currentUser = data;
    });
  }

  hideNavBar(): void {
    this.administratorService.changeNavBarState();
  }

  searchUsers(): void {
    if (this.searchInput) {
      this.administratorService.searchUsers(this.searchInput.trim().toLowerCase());
      this.router.navigate(['admin/search']);
    }
  }

}
