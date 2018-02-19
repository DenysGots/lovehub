import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { User } from '../../models/user';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  public constructor(private userService: UsersService) {}
  ngOnInit() {
  }
  public register(name: string, email: string, pass: string, confirmPass: string): void {
    if (!name.trim()) { return; }
    if (!email.trim()) { return; }
    if (!pass.trim()) { return; }
    if (!confirmPass.trim()) { return; }
    if (pass !== confirmPass) { return; }
    const user = {
      name: name,
      email: email,
      password: pass
    };
    console.log('1111');

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
