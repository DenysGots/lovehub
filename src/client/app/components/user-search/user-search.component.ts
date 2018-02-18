import {Component, OnInit} from '@angular/core';

import { Subject } from 'rxjs/Subject';

import {
  debounceTime, distinctUntilChanged
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
  styleUrls: ['user-search.component.scss']
})
export class UserSearchComponent implements OnInit {

  users: UserProfile[];
  searchFilter: FilterParam;
  ageFilter: FilterParam;
  genderFFilter: FilterParam;
  genderMFilter: FilterParam;
  term: SearchParam = null;

  size: number;
  offset: number = 0;
  limit: number = 6;

  private searchTerms = new Subject<SearchParam>();

  constructor(private usersProfileService: UsersProfileService) {
    this.searchFilter = new FilterParam('Name', 'search', '', 'Enter a favourite name..');
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
        this.fetchData()
      });
  }

  search(term: SearchParam): void {
    this.term = term;
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
}
