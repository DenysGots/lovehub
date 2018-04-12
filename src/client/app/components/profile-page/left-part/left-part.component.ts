import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../../../services/navigation.service';
import { Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-left-part',
  templateUrl: './left-part.component.html',
  styleUrls: ['./left-part.component.scss']
})

export class LeftPartComponent implements OnInit {

  profileMenu: object[];
  userId: number;
  userIdUrl: number;
  isTrue = false;

  constructor(private navService: NavigationService,
              public router: Router,
              private route: ActivatedRoute) {}

  ngOnInit() {
    this.getProfileMenu();
    this.route.params.subscribe(params => {
      this.userId = parseInt(jwt_decode(localStorage.getItem('jwt_token')).id, 10);
      this.userIdUrl = parseInt(params['userId'], 10);
      this.isTrue = this.userId === this.userIdUrl;
    });
  }

  getProfileMenu(): void {
    this.profileMenu = this.navService.getProfileMenuItems();
  }
}
