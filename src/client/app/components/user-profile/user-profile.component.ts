import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  userProfaleChangeIsEnabled = true;
  userProfileData: any = {
    userName: '',
    userSex: '',
    userAge: '',
    userLocation: '',
    userInterests: '',
    userAdditInfo: ''
  };

  constructor() {
  }

  ngOnInit() {
    // display current user data
  }

  enableChanges () {
    this.userProfaleChangeIsEnabled = null;
  }

  cancelChanges () {
    // how to reset all inputs at once
    this.userProfaleChangeIsEnabled = true;
    console.log('cancel!!');
  }

  submitUserData () {
    console.log(this.userProfileData || 'something went wrong');
  }

}
