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

  users: UserProfile[];
  serarchFilter: FilterParam;
  ageFilter: FilterParam;
  genderFFilter: FilterParam;
  genderMFilter: FilterParam;
  term: SearchParam;

  size: number;
  offset: number = 0;
  limit: number = 6;

  private searchTerms = new Subject<SearchParam>();

  constructor(private usersProfileService: UsersProfileService) {
    this.serarchFilter = new FilterParam('Name', 'search', '', 'Enter a favourite name..');
    this.ageFilter = new FilterParam('Age', 'range', '0', '');
    this.genderMFilter = new FilterParam('Male', 'radio', 'male', '');
    this.genderFFilter = new FilterParam('Female', 'radio', 'female', '');
  }

  ngOnInit(): void {
    this.searchTerms
      .pipe(
        debounceTime(3000),
        distinctUntilChanged()
      )
      .subscribe((term) => {
        this.term = term;
        this.fetchData()
      });
  }

  search(term: SearchParam): void {
    this.searchTerms.next(term);
  }

  fetchData() {
    return this.usersProfileService.searchUsers(this.term.searchType, this.term.searchValue, this.offset, this.limit)
      .subscribe(result => {
        this.users = result.rows;
        this.size = result.count;
      });
  }

  onPageChange(offset) {
    this.offset = offset;
    this.fetchData();
  }

  toggleMenu() {
    this.menuState = this.menuState === 'out' ? 'in' : 'out';
  }
}
