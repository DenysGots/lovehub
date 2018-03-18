import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable()
export class AdministratorService {
  private isVisible = true;
  private usersList: any = {};
  private usersData: any = {};
  private currentUser: any = {};
  private getUsersOptions: any = {};
  private updateUsersOptions: any = {};
  private serverURL = 'api/administrator';

  /* POST Request - send usersList requirements and get new usersList from server */
  /*
  private getUsersOptions = {    // Get UsersList from server according to the following options:
    userRole: 'any',             // possible values: any (initial)/user/moderator
    userStatus: 'any',           // possible values: any (initial)/active/banned
    usersPerPage: 5,             // possible values: 5 (initial)/10/15/20
    nextPage: 1,                 // value: administrator-users-management-component goToPage() method result
    goToPage: 'none',            // possible values: none (initial)/from 1 to (server "usersList.length" / client "usersPerPage")
    sortingEnquiry: {            // Sort table rows according to the following options:
      tableColumn: 'none',       // possible values: none (initial)/id/first-name/last-name/role/status/last-active/membership
      sortingOption: 'none'      // possible values: none (initial)/ascending/descending
    }
  };
  */

  /* POST Response - new usersList with additional view data */
  /*
  private usersList = {
    users: [],                    // usersList to display
    currentUser: {},              // administrator
    numberOfPages: 1,             // value: server "usersList.length" / client "usersPerPage"
    currentPage: 1                // possible values: from 1 (initial) to (server "usersList.length" / client "usersPerPage")
  };
   */

  /* PUT Request - update usersList on server */
  /*
  private updateUsersOptions = {  // Update usersList back to server according to the following options:
    usersList: [],                // array of checked users to update
    appliedAction: 'ban'     // possible values: ban/delete/restore
  };
   */

  private isVisibleSource = new BehaviorSubject<boolean>(this.isVisible);
  private receivedUsersList = new BehaviorSubject<any>(this.usersList);
  private receivedUsersData = new BehaviorSubject<any>(this.usersData);
  private receivedCurrentUserData = new BehaviorSubject<any>(this.currentUser);

  navBarState = this.isVisibleSource.asObservable();
  receivedUsers = this.receivedUsersList.asObservable();
  receivedData = this.receivedUsersData.asObservable();
  receivedCurrentUser = this.receivedCurrentUserData.asObservable();

  constructor(private http: HttpClient) {
  }

  changeNavBarState(): void {
    this.isVisible = !this.isVisible;
    this.isVisibleSource.next(this.isVisible);
  }

  getCurrentUserParameters(currentUserId): any {
    return this.http.get((this.serverURL + ':' + currentUserId), httpOptions)
      .subscribe(response => {
        this.receivedCurrentUserData.next(response);
      });
  }

  // Get usersList from server according to the specified view parameters, on startup with default parameters
  getUsersEnquiryRequest(enquiry?): any {
    if (enquiry) {
      this.getUsersOptions = enquiry;
    }

    return this.http.post(this.serverURL, JSON.stringify(this.getUsersOptions), httpOptions)
       .subscribe(response => this.receivedUsersList.next(response));
  }

  // Update usersList on server and get updated usersList back from server with specified view parameters
  updateUsersEnquiryRequest(enquiry): any {
    this.updateUsersOptions = enquiry;

    this.http.patch(this.serverURL, JSON.stringify(this.updateUsersOptions), httpOptions)
      .subscribe(next => this.getUsersEnquiryRequest());
  }

  // Get site statistics for administrator dashboard view
  getStatistics(): any {
    return this.http.get(this.serverURL, httpOptions)
      .subscribe(response => {
        this.receivedUsersData.next(response);
      });
  }

}
