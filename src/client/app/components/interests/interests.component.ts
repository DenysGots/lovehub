import { Component, OnInit } from '@angular/core';

import { InterestsService } from '../../services/interests.service';

@Component({
  selector: 'app-interests',
  templateUrl: './interests.component.html',
  styleUrls: [
    '../administrator/shared/normalize.scss',
    '../administrator/shared/default-styles.scss',
    './interests.component.scss'
  ]
})
export class InterestsComponent implements OnInit {
  public editMode = false;
  public userTypingNewInterest = false;

  constructor(private interestsService: InterestsService) {
  }

  ngOnInit() {
  }

  // Add and save interest from input field
  addInterest() {
  }

  // Delete interest from interest list in user profile back at DB
  deleteInterest() {
  }

  // Add and save interest from drop down interests list (hints)
  addInterestFromHint() {
  }

}
