import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  userProfaleChangeIsEnabled = true;
  userName: string;
  userSex: number;
  userAge: number;
  userLocation: string;
  userInterests: string;
  userAdditInfo: string;
  
  constructor() {
  }

  ngOnInit() {
    // display current user data
  }

  enableChanges () {
    this.userProfaleChangeIsEnabled = null;
  }

  cancelChanges () {
    
  }

}
