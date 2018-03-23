import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';

@Component({
  moduleId: module.id,
  selector: 'app-user-profile-settings',
  templateUrl: 'user-profile-settings.component.html',
  styleUrls: ['user-profile-settings.component.scss']
})
export class UserProfileSettingsComponent implements OnInit {

  constructor(private userService: UsersService) { }

  ngOnInit() {
  }

}
