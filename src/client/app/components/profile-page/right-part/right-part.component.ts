import { Component, OnInit } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-right-part',
  templateUrl: './right-part.component.html',
  styleUrls: ['./right-part.component.scss']
})
export class RightPartComponent implements OnInit {

  userId: number;
  userIdUrl: number;
  userName: string;
  age: number;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.userId = parseInt(jwt_decode(localStorage.getItem('jwt_token')).id, 10);
    this.userName = jwt_decode(localStorage.getItem('jwt_token')).firstName;
    this.age = parseInt(jwt_decode(localStorage.getItem('jwt_token')).age, 10);
    this.route.params.subscribe(params => {
      this.userIdUrl = params['userId'];
    });
  }

}
