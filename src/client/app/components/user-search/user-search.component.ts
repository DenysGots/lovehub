import {Component, ElementRef, OnInit} from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

import { User } from '../../models/user';
import { UsersService } from '../../services/users.service';
import {animate, state, style, transition, trigger} from '@angular/animations';

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
  users$: Observable<User[]>;
  menuState = 'out';

  private searchTerms = new Subject<string>();

  constructor(private usersService: UsersService, private el: ElementRef) {}

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.users$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.usersService.searchUsers(term)),
    );
  }

  toggleMenu() {
    this.menuState = this.menuState === 'out' ? 'in' : 'out';
  }
}
