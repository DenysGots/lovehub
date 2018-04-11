import { Component, OnInit } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {

  userId: number;
  userIdUrl: number;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.userId = parseInt(jwt_decode(localStorage.getItem('jwt_token')).id, 10);
    console.log('userID', this.userId);
    this.route.params.subscribe(params => {
      console.log(params);
      this.userIdUrl = params['userId'];
      console.log('URLID', params['userId']);
    });
  }
}
