import { Component, OnInit } from '@angular/core';
import { UserProfileService } from '../../services/user-profile.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  userProfileChangeIsEnabled = false;
  userProfileData: any = {
    userName: '',
    userSex: '',
    userAge: '',
    userLocation: '',
    userInterests: '',
    userAdditInfo: ''
  };

  constructor(private _userProfileService: UserProfileService) {
  }

  ngOnInit() {
    // display current user data
    // this._userProfileService.firstMethod();
    this._userProfileService.getUser(1)
      .subscribe(res => console.log(res));
  }

  enableChanges () {
    this.userProfileChangeIsEnabled = null;
  }

  cancelChanges () {
    // how to reset all inputs at once
    this.userProfileChangeIsEnabled = true;
    console.log('cancel!!');
  }

  submitUserData () {
    console.log(this.userProfileData || 'something went wrong');
  }

}
