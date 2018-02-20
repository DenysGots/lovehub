import { Component, OnInit } from '@angular/core';
import { UserProfileService } from '../../services/user-profile.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  userProfileChangeIsEnabled = true;
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
    this._userProfileService.getUser(2)
      .subscribe(res => {
        console.log(res);
        this.userProfileData.userName = res.name;
        this.userProfileData.userSex = res.sex;
        this.userProfileData.userAge = res.age;
        this.userProfileData.userLocation = `X: ${res.location.latitude}; Y: ${res.location.longitude};`;
        this.userProfileData.userInterests = res.interests,
        this.userProfileData.userAdditInfo = res.additInfo;
        console.log(this.userProfileData);
      });
  }

  enableChanges () {
    this.userProfileChangeIsEnabled = null;
  }

  cancelChanges () {
    // how to reset all inputs at once
    // this.userProfileChangeIsEnabled = false;
    console.log('cancel!!');
  }

  submitUserData () {
    this._userProfileService.updateUser(this.userProfileData);
    console.log(this.userProfileData || 'something went wrong');
  }
}
