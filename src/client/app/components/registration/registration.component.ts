import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { User } from '../../models/user';
import {ElementRef, Renderer2} from '@angular/core';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  @ViewChild('name') name: ElementRef;
  @ViewChild('email') email: ElementRef;
  @ViewChild('pass') pass: ElementRef;
  @ViewChild('confirmPass') confPass: ElementRef;

  public constructor(private userService: UsersService, private rd: Renderer2) {}
  ngOnInit() {
  }

  public register(name: string, email: string, pass: string, confirmPass: string): void {

    if (this.validationFields(name, email, pass, confirmPass)) {
      const user = {
        name: name,
        email: email,
        password: pass
      };
      this.userService.registration(user as User).subscribe();
      console.log(user);
      this.freeFields();
      alert('Congratulation! You are registered!');
    }
  }

  public validationFields(name: string, email: string, pass: string, confirmPass: string) {
    if (!name.trim()) { alert(('Please, put your name!')); return 0; } else
    if (!email.trim()) { alert(('Please, put your email!')); return 0; } else
    if (!pass.trim()) { alert(('Please, put your pass!')); return; } else
    if (!confirmPass.trim()) { alert(('Please, confirm your pass!')); return 0; } else
    if (pass !== confirmPass) { alert(('The passwords are not matching. Try again!')); return 0; } else {return 1; }
  }

  public freeFields() {
    this.name.nativeElement.value = '';
    this.email.nativeElement.value = '';
    this.pass.nativeElement.value = '';
    this.confPass.nativeElement.value = '';
  }
}
