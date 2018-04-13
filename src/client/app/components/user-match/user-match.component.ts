import {Component, OnInit} from '@angular/core';
import {MatchingService} from '../../services/matching.service';
import {Observable} from 'rxjs/Observable';
import {UsersProfileService} from '../../services/users-profile.service';

import {PhotosService} from '../../services/photos.service';
import {Photo} from '../../models/photo';
import {UserProfileDto} from '../../../../server/modules/api/users-profile/dto/user-profile.dto';


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
  lat: number ;
  lng: number ;

  radioParams: RadioParams[] = [
    {label: 'For  Date', value: 'DATE'},
    {label: 'For  Friend', value: 'FRIENDS'},
    {label: 'For  Party', value: 'PARTY'}
  ];
  // users$: any[];
  avatar: any;
  photos: Photo[] = [ {userId: 0, _id: '', base64: '', avatar: false, name: ''} ];
  users$: Observable<UserProfileDto[]>;

  constructor(private matchingService: MatchingService,
              private usersProfileService: UsersProfileService,
              private photoService: PhotosService,
              ) {
    this.findAll();
  }


  ngOnInit() {
    //  if (navigator.geolocation) {
    //  navigator.geolocation.getCurrentPosition(position => console.log(position));
   // }
  }
  private getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        });
    }
  }
  findAll() {
    // this.users$ = this.matchingService.searchUsers(value);
    console.log('test');
    this.users$ = this.matchingService.findAll();
  }
  getPhoto(userId) {
    this.photoService.getAvatar(userId).subscribe(avatar => {
      this.avatar = avatar.base64;
    });
  }
}
