import {Component, Inject, Injector, OnInit} from '@angular/core';
import { UsersService } from '../../services/users.service';
import { AuthService } from '../../services/auth.service';
import { UsersProfileService } from '../../services/users-profile.service';

import { LoggedInUser } from '../login/logged-in-user';
import { UserProfile } from '../../models/user-profile';
import { User}  from '../../models/user';
import {Router} from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'app-user-profile-settings',
  templateUrl: 'user-profile-settings.component.html',
  styleUrls: ['user-profile-settings.component.scss']
})
export class UserProfileSettingsComponent implements OnInit {

  private loggedInUser: LoggedInUser;
  public user: User;
  public userProfile: UserProfile;

  constructor(private injector: Injector) { }

  ngOnInit() {
    const usersService = this.injector.get(UsersService),
      authService = this.injector.get(AuthService);

    this.loggedInUser = authService.getLoggedInUser();
    usersService.findById(this.loggedInUser.userId).subscribe(user => {
      this.user = <User>user;
      this.userProfile = <UserProfile>user.userProfile;
      console.log(this.userProfile.firstName);
    });
  }

  public updateUser() {
    const usersProfileService = this.injector.get(UsersProfileService);
    console.log('UserProfileSettingsComponent updateUser');
    usersProfileService.update(this.userProfile);
  }
}
