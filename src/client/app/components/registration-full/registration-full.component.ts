import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { UsersProfileService } from '../../services/users-profile.service';
import { UserProfile } from '../../models/user-profile';
import { User } from '../../models/user';
import { ActivatedRouteSnapshot } from '@angular/router';

@Component({
  selector: 'app-registration-full',
  templateUrl: './registration-full.component.html',
  styleUrls: ['./registration-full.component.scss']
})
export class RegistrationFullComponent implements OnInit {

  stage = 0;
  user: User;
  userProfile: UserProfile;
  enable = {step0: false, step1: false, step2: false, step3: false};

  public constructor(private usersProfileService: UsersProfileService, private usersService: UsersService) {}

  ngOnInit() {
    this.userProfile = new UserProfile(null, null, null, null, null, null, null);
    this.user = new User(null, null, null);
  }

  receiveSex($event) {
    this.userProfile.sex = $event;
    this.enable.step0 = true;
    this.stage++;
    console.log(this.userProfile);
  }

  receivePreference($event) {
    this.userProfile.preference = $event;
    this.enable.step1 = true;
    this.stage++;
    console.log(this.userProfile);
  }

  receiveOrientation($event) {
    this.userProfile.orientation = $event;
    this.enable.step2 = true;
    this.stage++;
    console.log(this.userProfile);
  }

  receiveUserForm($event) {
    this.userProfile.firstName = $event.firstName;
    this.userProfile.lastName = $event.lastName;
    this.userProfile.age = $event.age;
    this.user.name = $event.firstName;
    this.user.email = $event.email;
    this.user.password = $event.password;
    this.enable.step3 = true;
    this.stage++;
    this.usersProfileService.registration(this.userProfile as UserProfile).subscribe();
    this.usersService.registration(this.user as User).subscribe();
    alert('Congratulation! You are registered!');
    console.log(this.userProfile);
    console.log(this.user);
    // this.router.navigate(['/home']);
  }
  isNext() {
    if (((this.enable.step0 === true && this.stage === 0) ||
        (this.enable.step1 === true && this.stage !== 2) ||
        (this.enable.step2 === true && this.stage !== 3)) &&
        this.stage !== 3) {
      this.stage++;
    }
  }
  isPrev() {
    if (this.stage !== 0) {
      this.stage--;
    }
  }
}
