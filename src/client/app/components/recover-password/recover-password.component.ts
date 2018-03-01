import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.scss']
})
export class RecoverPasswordComponent implements OnInit {

  recoverPassForm: FormGroup;
  error = '';
  success = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.initForm();
  }

  initForm(): void {
    this.recoverPassForm = this.fb.group({
      email: [null, [
        Validators.email,
        Validators.required
        ]
      ]
    });
  }

  onSubmit(): void {
    if ( !this.checkForm()) {
      return;
    }
  }

  private checkForm(): boolean {
    if (this.recoverPassForm.controls['email'].invalid) {
      this.error = 'That is not a valid email';

      return false;
    }

    return true;
  }

}
