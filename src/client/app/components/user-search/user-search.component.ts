import {Component, OnChanges, OnInit} from '@angular/core';

import { Subject } from 'rxjs/Subject';

import {
  debounceTime, distinctUntilChanged
} from 'rxjs/operators';

import { UsersProfileService } from '../../services/users-profile.service';

import { SearchParam } from './shared/search-param';
import { FilterParam } from './shared/filter-param';
import { UserProfile } from '../../models/user-profile';

@Component({
  moduleId: module.id,
  selector: 'app-user-search',
  templateUrl: 'user-search.component.html',
  styleUrls: ['user-search.component.scss'],
})
export class UserSearchComponent implements OnInit, OnChanges {

  users: UserProfile[];
  searchFilter: FilterParam;
  ageFilter: FilterParam;
  genderFFilter: FilterParam;
  genderMFilter: FilterParam;
  term: SearchParam = null;

  countItems: number;
  offsetItems = 0;
  currentPage = 1;
  itemsPerPage = 6;

  isDesc = false;
  property: string;
  direction: number;

  private searchTerms = new Subject<SearchParam>();

  constructor(private usersProfileService: UsersProfileService) {
    this.searchFilter = new FilterParam('Name', 'search', '', 'Enter a favourite name..');
    this.ageFilter = new FilterParam('Age', 'range', '0', '');
    this.genderMFilter = new FilterParam('Male', 'radio', 'MALE', '');
    this.genderFFilter = new FilterParam('Female', 'radio', 'FEMALE', '');
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

  ngOnChanges() {
    /*
    this.setDefaultParamService.getValue().subscribe(type => {
      if(type == 'search') {
        this.ageFilter.value = '0';
      }
    });
    */
  }

  search(term: SearchParam): void {
    this.term = term;
    this.searchTerms.next(term);
  }

  fetchData() {
    return this.usersProfileService
      .searchUsers(this.term.searchType, this.term.searchValue, this.offsetItems, this.itemsPerPage)
      .subscribe(result => {
        console.log('UserSearchComponent');
        this.users = result.rows;
        this.countItems = result.count;
      });
  }

  onPageChange(page) {
    this.currentPage = page;
    this.offsetItems = (this.currentPage - 1) * this.itemsPerPage;
    this.fetchData();
  }
}
