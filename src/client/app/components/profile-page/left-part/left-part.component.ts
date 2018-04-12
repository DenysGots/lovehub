import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../../../services/navigation.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { NotificationsService } from '../../../services/notifications.service';

@Component({
  selector: 'app-left-part',
  templateUrl: './left-part.component.html',
  styleUrls: ['./left-part.component.scss']
})
export class LeftPartComponent implements OnInit {

  profileMenu: object[];

  public profileOwnerId: number;
  public isUserOnline: boolean;

  constructor(
    private navService: NavigationService,
    private notificationsService: NotificationsService,
    private route: ActivatedRoute,
    public router: Router
  ) {
    this.route.params.subscribe(params => {
      this.profileOwnerId = parseInt(params.id, 10);
      this.checkIfUserIsOnline();
    });
  }

  ngOnInit() {
    this.getProfileMenu();

    this.notificationsService.isUserOnline.subscribe(data => {
      this.isUserOnline = data;
    });

    this.checkIfUserIsOnline();
  }

  getProfileMenu(): void {
    this.profileMenu = this.navService.getProfileMenuItems();
  }

  checkIfUserIsOnline() {
    this.notificationsService.checkIfUserIsOnline(this.profileOwnerId);
  }

}
