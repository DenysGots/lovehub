import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../../../services/navigation.service';
import { Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';


@Component({
  selector: 'app-left-part',
  templateUrl: './left-part.component.html',
  styleUrls: ['./left-part.component.scss']
})
export class LeftPartComponent implements OnInit {

  profileMenu: object[];
  userId: number;
  userIdUrl: number;

  constructor(
    private navService: NavigationService,
    public router: Router
  ) {
  }

  ngOnInit() {
    this.getProfileMenu();
    this.userId = parseInt(jwt_decode(localStorage.getItem('jwt_token')).id, 10);
    // TODO id url
    this.userIdUrl = 3;
  }

  getProfileMenu(): void {
    this.profileMenu = this.navService.getProfileMenuItems();
  }
}
