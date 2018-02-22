import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-registration-full',
  templateUrl: './registration-full.component.html',
  styleUrls: ['./registration-full.component.scss']
})
export class RegistrationFullComponent implements OnInit {

  stage = 0;
  user: User;
  enable = {step0: false, step1: false, step2: false, step3: false};

  public constructor(private userService: UsersService) {}

  ngOnInit() {
    this.user = new User();
  }

  receiveSex($event) {
    this.user.sex = $event;
    this.enable.step0 = true;
    this.stage++;
    console.log(this.user);
  }

  receivePreference($event) {
    this.user.preference = $event;
    this.enable.step1 = true;
    this.stage++;
    console.log(this.user);
  }

  receiveOrientation($event) {
    this.user.orientation = $event;
    this.enable.step2 = true;
    this.stage++;
    console.log(this.user);
  }

  receiveUserForm($event) {
    this.user.name = $event.name;
    this.user.bday = $event.bday;
    this.user.location = $event.location;
    // if (validateEmail($event.email)) {
      this.user.email = $event.email;
    // } else {
    // }
    this.user.password = $event.pass;
    this.enable.step3 = true;
    this.stage++;
    this.userService.registration(this.user as User)
      .subscribe(newUser => {
        if (newUser) {
          // TODO create redirect
          console.log('user registered: ' + newUser);
        } else {
          // TODO create fail logic
          console.log('user registration failed: ' + newUser);
        }
      });
    console.log(this.user);
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

  // validateEmail(email: string) {
  // }
}
