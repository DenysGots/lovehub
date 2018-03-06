import { Component, OnInit } from '@angular/core';

import { AdministratorService } from '../../../services/administrator.service';

@Component({
  selector: 'app-administrator-users-management',
  templateUrl: './administrator-users-management.component.html',
  styleUrls: [
    '../shared/normalize.scss',
    '../shared/default-styles.scss',
    './administrator-users-management.component.scss']
})
export class AdministratorUsersManagementComponent implements OnInit {
  mainSectionIsVisible: boolean;

  // Initial options to get usersList from DB
  getUsersOptions = {
    userRole: 'any',
    userStatus: 'any',
    usersPerPage: 5,
    nextPage: 1,
    sortingOptions: {
      tableColumn: 'id',
      sortingOption: 'ascending'
    }
  };

  updateUsersOptions = {
    usersList: [],
    appliedAction: 'ban'
  };

  usersList = {
    users: [],
    currentUser: {},
    numberOfPages: 1,
    currentPage: 1
  };

  pages = [];

  constructor(private administratorService: AdministratorService) {
  }

  ngOnInit() {
    this.administratorService.receivedUsers.subscribe(data => {
      this.usersList.users = data.users;
      this.usersList.currentUser = data.currentUser;
      this.usersList.numberOfPages = data.numberOfPages;
      this.usersList.currentPage = this.getUsersOptions.nextPage;
      this.pages = [];

      for (let i = 1, numberOfPages = this.usersList.numberOfPages; i <= numberOfPages; i += 1) {
        this.pages.push(i);
      }
    });

    this.administratorService.getUsersEnquiryRequest(this.getUsersOptions);

    this.administratorService.navBarState.subscribe(data => {
      return this.mainSectionIsVisible = data;
    });
  }

  pushSelectedUsersList(form, user): void {
    if (!form.value.selectUser) {
      this.updateUsersOptions.usersList.push(user.id);
    } else {
      const userListIndex = this.updateUsersOptions.usersList.indexOf(user.id);

      this.updateUsersOptions.usersList.splice(userListIndex, 1);
    }
  }

  resetSelectedUsersList(): void {
    this.updateUsersOptions.usersList = [];
  }

  applySort(column, direction): void {
    this.getUsersOptions.sortingOptions = {
      tableColumn: column,
      sortingOption: direction
    };
  }

  resetSortingOptions(): void {
    this.getUsersOptions.sortingOptions = {
      tableColumn: 'none',
      sortingOption: 'none'
    };
  }

  resetNextPage(): void {
    this.getUsersOptions.nextPage = 1;
  }

  goToPage(page): void {
    const lastPage = this.pages[this.pages.length - 1];
    const currentPage = this.usersList.currentPage;
    let nextPage;

    switch (page) {
      case 'previous':
        (currentPage === 1) ? (nextPage = 1) : (nextPage = currentPage - 1);
        break;

      case 'next':
        (currentPage + 1 > lastPage) ? (nextPage = lastPage) : (nextPage = currentPage + 1);
        break;

      default:
        nextPage = page;
        break;
    }

    this.getUsersOptions.nextPage = nextPage;
  }

  getUsers(): void {
    this.administratorService.getUsersEnquiryRequest(this.getUsersOptions);
  }

  updateUsers(): void {
    this.administratorService.updateUsersEnquiryRequest(this.updateUsersOptions);
  }

}
