import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-step3',
  templateUrl: './step3.component.html',
  styleUrls: ['../registration-full.component.scss']
})
export class Step3Component implements OnInit {

  @Input() stage: number;
  @Output() formEvent = new EventEmitter<object>();
  constructor() {
  }
  ngOnInit() {
  }
  sendForm(name: string, bday: string, location: string, email: string, pass: string, confirmPass: string) {
    if (!name.trim()) { return; }
      if (!bday.trim()) { return; }
      if (!location.trim()) { return; }
      if (!email.trim()) { return; }
      if (!pass.trim()) { return; }
      if (!confirmPass.trim()) { return; }
      if (pass !== confirmPass) { return; }
    const newUser = {
      name: name,
      bday: bday,
      location: location,
      email: email,
      pass: pass
    };
    this.formEvent.emit(newUser);
  }

  // isNext() {
  // }
  // isPrev() {
  // }
  // isEnable() {
  // }
  // isDisable() {
  // }

}
