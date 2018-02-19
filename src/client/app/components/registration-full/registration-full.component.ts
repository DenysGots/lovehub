import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { User } from '../../models/user';
import { carousel } from 'bootstrap';

const stages = [
  {
    stage: 'stage0',
    isDisabled: true
  },
  {
    stage: 'stage1',
    isDisabled: false
  },
  {
    stage: 'stage2',
    isDisabled: false
  },
  {
    stage: 'stage3',
    isDisabled: false
  },
];

@Component({
  selector: 'app-registration-full',
  templateUrl: './registration-full.component.html',
  styleUrls: ['./registration-full.component.scss']
})
export class RegistrationFullComponent implements OnInit {

  public constructor(private userService: UsersService) {}
  ngOnInit() {
    function next () {
      const prevButton = document.querySelector('.carousel-control-prev');
      const nextButton = document.querySelector('.carousel-control-next');

      prevButton.addEventListener('click', handler1);
      nextButton.addEventListener('click', handler2);
    }
    function handler1() {

    }
    function handler2() {

    }
  }

  logevent (e) {
    // console.log('event.target', e.target);
    // document.querySelector('.carousel').carousel('next');
  }

  public registerFull(name: string,
                      bday: string,
                      location: string,
                      sex: string,
                      interestingIn: string,
                      email: string,
                      pass: string,
                      confirmPass: string): void {
    if (!name.trim()) { return; }
    if (!bday.trim()) { return; }
    if (!location.trim()) { return; }
    if (!sex.trim()) { return; }
    if (!interestingIn.trim()) { return; }
    if (!email.trim()) { return; }
    if (!pass.trim()) { return; }
    if (!confirmPass.trim()) { return; }
    if (pass !== confirmPass) { return; }
    const user = {
      name: name,
      bday: bday,
      location: location,
      sex: sex,
      interestingIn: interestingIn,
      email: email,
      password: pass
    };
    console.log('222');

    this.userService.registration(user as User)
      .subscribe(newUser => {
        if (newUser) {
          // TODO create redirect
          console.log('user registered: ' + newUser);
        } else {
          // TODO create fail logic
          console.log('user registration failed: ' + newUser);
        }
      });
  }

}
