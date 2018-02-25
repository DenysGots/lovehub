import { Component, OnInit, NgModule, Pipe} from '@angular/core';
import { UsersService } from '../../services/users.service';
import { User } from '../../models/user';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})

export class RegistrationComponent implements OnInit {
  myform: FormGroup;
  name: FormControl;
  email: FormControl;
  password: FormControl;
  confirmPassword: FormControl;

  constructor(private userService: UsersService) {}

  ngOnInit() {
    this.createFormControls();
    this.createForm();
  }

  createFormControls() {
    this.name = new FormControl('', Validators.required);
    this.email = new FormControl('', [
      Validators.required,
      Validators.pattern('[^ @]*@[^ @]*')
    ]);
    this.password = new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ]);
    this.confirmPassword = new FormControl('', [
      Validators.required,
    ]);
  }
  passwordMatchValidator(fg: FormGroup) {
    return fg.get('password').value === fg.get('confirmPassword').value ? null : { 'mismatch': true };
  }

  createForm() {
    this.myform = new FormGroup({
      name: this.name,
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword
    }, this.passwordMatchValidator);
  }

  onSubmit() {
    if (this.myform.valid) {
      console.log('Form Submitted!');
      console.log(this.myform);
      const user = {
        name: this.name.value,
        email: this.email.value,
        password: this.password.value
      };
      this.userService.registration(user as User).subscribe();
      alert('Congratulation! You are registered!');
      this.myform.reset();
    }
  }
}
