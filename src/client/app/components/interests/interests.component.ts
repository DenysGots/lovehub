import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import * as jwt_decode from 'jwt-decode';

import { InterestsService } from '../../services/interests.service';

interface Results {
  interests: string[];
  hints: string[];
}

@Component({
  selector: 'app-interests',
  templateUrl: './interests.component.html',
  styleUrls: [
    '../administrator/shared/normalize.scss',
    '../administrator/shared/default-styles.scss',
    './interests.component.scss'
  ]
})
export class InterestsComponent implements OnInit, OnDestroy {
  public connection: any;
  public router: any;
  public interestsToSave: string[] = [];
  public interestsToDelete: string[] = [];
  public typedInterestChanged: Subject<string> = new Subject<string>();
  public currentUserId: number;
  public editMode = false;
  public editingIsForbidden = false;
  public inputFieldFocus = false;
  public interestsToShow: string[] = [];
  public hints: string[] = [];
  public interests: string[] = [];
  public typedInterest: string;
  public changesInInterests = {
    interestsToSave: this.interestsToSave,
    interestsToDelete: this.interestsToDelete
  };

  constructor(
      private interestsService: InterestsService,
      private _router: Router
  ) {
    this.router = _router;

    this.typedInterestChanged
      .debounceTime(300)
      .distinctUntilChanged()
      .subscribe(input => this.typedInterest = input);
  }

  ngOnInit() {
    this.connection = this.interestsService.getData().subscribe((results: Results) => {
      this.hints = results.hints;
      this.interests = results.interests;
      this.interestsToShow = [...this.interests];
    });

    this.distinctProfileOwner();
    this.getInterests();
  }

  ngOnDestroy() {
    this.connection.unsubscribe();
    this.typedInterestChanged.unsubscribe();
  }

  async inputChange(input: string) {
    await this.typedInterestChanged.next(input);
    this.getHints(this.typedInterest);
  }

  getInterests() {
    this.interestsService.getInterests();
  }

  getHints(input) {
    if (input) {
      this.interestsService.getHints(input.trim().toLowerCase());
    } else {
      this.interestsService.getHints('');
    }
  }

  addInterest() {
    if (this.typedInterest) {
      this.interestsToSave.push(this.typedInterest.trim().toLowerCase());
    }

    this.interestsToShow = [...new Set([...this.interestsToShow, ...this.interestsToSave])]
        .sort((a, b) => a.localeCompare(b));
    this.typedInterest = '';
  }

  addInterestFromHint(hint) {
    this.typedInterest = hint;
  }

  deleteInterest(interest) {
    this.interestsToDelete.push(interest);
    this.interestsToShow.splice(this.interestsToShow.indexOf(interest), 1);

    if (this.interestsToSave.indexOf(interest)) {
      this.interestsToSave.splice(this.interestsToSave.indexOf(interest), 1);
    }
  }

  saveChanges() {
    this.interests = this.interestsToShow;
    this.interestsService.saveChanges(this.changesInInterests);
    this.editMode = false;
  }

  toggleEditMode() {
    this.editMode = !this.editMode;

    if (!this.editMode) {
      this.interestsToShow = this.interests;
      this.interestsToSave = [];
      this.interestsToDelete = [];
    }
  }

  onInputFocus() {
    this.inputFieldFocus = true;
    this.getHints(this.typedInterest || '');
  }

  onInputBlur() {
    setTimeout(() => {
      this.inputFieldFocus = false;
    }, 100);
  }

  distinctProfileOwner() {
    let profileOwnerId; // TODO: get id from, then: (profileOwnerId !== currentUserId) => (editingIsForbidden = true)

    this.currentUserId = parseInt(jwt_decode(localStorage.getItem('jwt_token')).id, 10);
    this.interestsService.currentUserId = this.currentUserId;
  }

}
