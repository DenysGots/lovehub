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
  private usersList: any = {};
  private serverURL = '';   // TODO: add server url
  private isVisible = true;

  private getUsersOptions: any = {};
  private updateUsersOptions: any = {};

  /* POST Request - send usersList requirements and get new usersList from server */
  /*
  private getUsersOptions = {    // Get UsersList from server according to the following options:
    userRole: 'any',             // possible values: any (initial)/user/moderator
    userStatus: 'any',           // possible values: any (initial)/active/disabled/deleted
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
    appliedAction: 'disable '     // possible values: disable/delete/restore
  };
   */

  private isVisibleSource = new BehaviorSubject<boolean>(this.isVisible);
  private receivedUsersList = new BehaviorSubject<any>(this.usersList);

  navBarState = this.isVisibleSource.asObservable();
  receivedUsers = this.receivedUsersList.asObservable();

  constructor(private http: HttpClient) {
  }

  changeNavBarState(): void {
    this.isVisible = !this.isVisible;
    this.isVisibleSource.next(this.isVisible);
  }

  getUsersEnquiryRequest(enquiry): any /*Observable<{}>*/ {   // Get usersList from server according to the specified view parameters, on startup with default parameters
    this.getUsersOptions = enquiry;

    // return this.http.post(this.serverUrl, JSON.stringify(this.getUsersOptions), httpOptions)    // TODO: uncomment upon server response logic being ready for obtaining usersList from server on startup
    //   .subscribe(response => {
    //     this.receivedUsersList.next(JSON.parse(response));
    //   });

    console.log(this.getUsersOptions);      // delete
  }

  updateUsersEnquiryRequest(enquiry): any /*Observable<{}>*/ {    // Update usersList on server and get updated usersList back from server with specified view parameters
    this.updateUsersOptions = enquiry;

    // return this.http.put(this.serverUrl, JSON.stringify(this.updateUsersOptions), httpOptions)    // TODO: uncomment upon server response logic being ready for obtaining usersList from server on startup
    //   .subscribe(response => {
    //     this.receivedUsersList.next(JSON.parse(response));
    //   });

    console.log(this.updateUsersOptions);   // delete
  }

}
