import {Component, OnChanges, OnInit} from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import {
  debounceTime, distinctUntilChanged, switchMap, tap
} from 'rxjs/operators';

import {animate, state, style, transition, trigger} from '@angular/animations'

import { UsersProfileService } from '../../services/users-profile.service';

import { SearchParam } from './shared/search-param';
import { FilterParam } from './shared/filter-param';
import { UserProfile } from '../../models/user-profile';

@Component({
  moduleId: module.id,
  selector: 'app-user-search',
  templateUrl: 'user-search.component.html',
  styleUrls: ['user-search.component.css'],
  animations: [
    trigger('slideInOut', [
      state('in', style({
        transform: 'translate(0, 0)'
      })),
      state('out', style({
        transform: 'translate(100%, 0)'
      })),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out'))
    ]),
  ]
})
export class UserSearchComponent implements OnInit {

  menuState = 'out';

  users$: Observable<UserProfile[]>;
  serarchFilter: FilterParam;
  ageFilter: FilterParam;
  genderFFilter: FilterParam;
  genderMFilter: FilterParam;

  private searchTerms = new Subject<SearchParam>();

  constructor(private usersProfileService: UsersProfileService) {
    this.serarchFilter = new FilterParam('Name', 'search', 'value', '', 'Enter a favourite name..');
    this.ageFilter = new FilterParam('Age', 'range', 'value', '0', '');
    this.genderMFilter = new FilterParam('Male', 'radio', 'value', 'male', '');
    this.genderFFilter = new FilterParam('Female', 'radio', 'value', 'female', '');
  }

  ngOnInit(): void {
    this.users$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: SearchParam) => this.usersProfileService.searchUsers(term.searchType, term.searchValue))
    );
  }

  search(term: SearchParam): void {
    //this.searchTerms.next(term);
    this.users$ = this.usersProfileService.searchUsers(term.searchType, term.searchValue)
  }

  toggleMenu() {
    this.menuState = this.menuState === 'out' ? 'in' : 'out';
  }
}
