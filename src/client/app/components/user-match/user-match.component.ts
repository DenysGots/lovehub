import { Component, OnInit } from '@angular/core';
import {MatchingService} from '../../services/matching.service';
import {User} from '../../models/user';
import {Observable} from 'rxjs/Observable';

interface RadioParams {
  label: string;
  value: string;
}
@Component({
  templateUrl: './user-match.component.html',
  styleUrls: ['./user-match.component.scss']
})
export class UserMatchComponent implements OnInit {
  title  = 'My first AGM project';
  lat = 51.678418;
  lng = 7.809007;
  radioParams: RadioParams[] = [
    {label: 'For  Date', value: 'forDate'},
    {label: 'For  Friend', value: 'forFriend'},
    {label: 'For  Party', value: 'forParty'}
  ];
  users$: Observable<string[]>;
  // users$: Observable<User[]>;

  constructor(private matchingService: MatchingService) { }

  ngOnInit() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => console.log(position));
    }
  }

  filter(value) {
    // this.users$ = this.matchingService.searchUsers(value);
    console.log('test');
    this.users$ = this.matchingService.matchUsers(value);
  }
}
