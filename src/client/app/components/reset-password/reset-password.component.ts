import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  resetPassForm: FormGroup;
  error = '';
  success = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.initForm();
  }

  initForm(): void {
    this.resetPassForm = this.fb.group({
      password: [null, [
        Validators.required
        ]
      ],
      verify_password: [null, [
        Validators.required
        ]
      ]
    });
  }

}
