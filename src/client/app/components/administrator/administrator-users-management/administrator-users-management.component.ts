import { Component, OnInit } from '@angular/core';

import { AdministratorService } from '../../../services/administrator.service';
import { usersList } from '../shared/mock-users';   // mock usersList, TODO: delete upon obtaining usersList from server

@Component({
  selector: 'app-administrator-users-management',
  templateUrl: './administrator-users-management.component.html',
  styleUrls: [
    '../shared/normalize.css',
    '../shared/default-styles.scss',
    './administrator-users-management.component.scss']
})
export class AdministratorUsersManagementComponent implements OnInit {
  private users = usersList;    // mock usersList, TODO: delete upon obtaining usersList from server
  private mainSectionIsVisible: boolean;

  private getUsersOptions = {
    userRole: 'any',
    userStatus: 'any',
    usersPerPage: 5,
    nextPage: 1,
    sortingOptions: {
      tableColumn: 'none',
      sortingOption: 'none'
    }
  };

  private updateUsersOptions = {
    usersList: [],
    appliedAction: 'disable'
  };

  private usersList = {
    users: [],    // TODO: add binding to html template upon obtaining usersList from server
    currentUser: {},
    numberOfPages: 1,
    currentPage: 1
  };

  private pages = [1, 2, 3];

  constructor(private administratorService: AdministratorService) {
  }

  ngOnInit() {
    this.administratorService.navBarState.subscribe(data => {
      return this.mainSectionIsVisible = data;
    });

    // this.administratorService.getUsersEnquiryRequest(this.getUsersOptions);   // TODO: uncomment upon server response logic being ready for obtaining usersList from server on startup

    this.administratorService.receivedUsers.subscribe(data => {   // TODO: uncomment upon obtaining usersList from server
      // this.usersList = JSON.parse(data);
      // this.pages = [];

      // for (let i = 1, numberOfPages = this.usersList.numberOfPages; i < numberOfPages; i += 1) {
      //   this.pages.push(i);
      // }

      return;
    });
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

  pushSelectedUsersList(form, user): void {
    if (!form.value.selectUser) {
      this.updateUsersOptions.usersList.push(user.id);
    } else {
      const userListIndex = this.updateUsersOptions.usersList.indexOf(user.id);

      this.updateUsersOptions.usersList.splice(userListIndex, 1);
    }
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
    this.resetSortingOptions();
  }

  updateUsers(): void {
    this.administratorService.updateUsersEnquiryRequest(this.updateUsersOptions);
  }

}
