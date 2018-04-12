import { Component, OnInit } from '@angular/core';
import { PhotosService } from '../../services/photos.service';
import * as jwt_decode from 'jwt-decode';
import { Photo } from '../../models/photo';
import { Like } from '../../models/like';
import { LikesService } from '../../services/likes.service';
import { ActivatedRoute } from '@angular/router';
import { UsersProfileService } from '../../services/users-profile.service';
import { UserProfile } from '../../models/user-profile';


@Component({
  selector: 'app-likes',
  templateUrl: './likes.component.html',
  styleUrls: ['./likes.component.scss']
})
export class LikesComponent implements OnInit {

  userId: number;
  userIdUrl: number;
  like: Like;

  whatUserLike: Like[];
  likesForUser: Like[];
  mutualLikes: number[];

  avatars_1: Photo[] = [ {userId: 0, _id: '', base64: '', avatar: true, name: ''} ];
  avatars_2: Photo[] = [ {userId: 0, _id: '', base64: '', avatar: true, name: ''} ];
  avatars_3: Photo[] = [ {userId: 0, _id: '', base64: '', avatar: true, name: ''} ];

  users_1: UserProfile[];
  users_2: UserProfile[];
  users_3: UserProfile[];

  photos: Photo[] = [ {userId: 0, _id: '', base64: '', avatar: false, name: ''} ];

  constructor(private photosService: PhotosService,
              private likesService: LikesService,
              private usersProfileService: UsersProfileService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.like = new Like();
    this.userId = parseInt(jwt_decode(localStorage.getItem('jwt_token')).id, 10);
    this.route.params.subscribe(params => {
      this.userIdUrl = parseInt(params['id'], 10);
      console.log('URLID', params['id']);
    });

    this.photosService.getPhotos(this.userId)
      .subscribe(items => {
        this.photos = items;
      });

    this.getWhatUserLike();
    this.getLikesForUser();
    // this.findMutualLikes(this.whatUserLike, this.likesForUser);

    // this.getUsersAva(this.mutualLikes, this.avatars_1);
    // this.getUsersAva(this.whatUserLike, this.avatars_2);
    // this.getUsersAva(this.likesForUser, this.avatars_3);
    //
    // this.getUsersName(this.mutualLikes, this.users_1);
    // this.getUsersName(this.whatUserLike, this.users_2);
    // this.getUsersName(this.likesForUser, this.users_3);
  }

  addLike(otherId: number) {
    this.like.whoLike = this.userId;
    this.like.whatLike = otherId;
    this.likesService.addLike(this.like as Like).subscribe();
    console.log('Like wrote');
  }

  getWhatUserLike() {
    this.likesService.getWhatLikeUser(this.userId)
      .subscribe(whatUserLike => {
        this.whatUserLike = whatUserLike;
        console.log(this.whatUserLike);
      });
  }

  getLikesForUser() {
    this.likesService.getWhoLikesUser(this.userId)
      .subscribe(likesForUser => {
        this.likesForUser = likesForUser;
        console.log(this.likesForUser);
      });
  }

  dislike(otherId: number) {
    this.likesService.dislikeUser(this.userId, otherId).subscribe();
  }

  findMutualLikes(arr1: number[], arr2: number[]) {
    for (let i = 0; i < arr1.length; i++) {
      for (let j = 0; j < arr2.length; j++) {
        if (arr1[i] === arr2[j]) {
          this.mutualLikes.push(arr1[i]);
        }
      }
    }
    return ;
  }

  getUsersAva(arr: number[], avatars: Photo[]) {
    for (let i = 0; i < arr.length; i++) {
      this.photosService.getAvatar(arr[i]).subscribe(avatar => {
        avatars.push(avatar);
      });
    }
  }

  getUsersName(arr: number[], users: any[]) {
    for (let i = 0; i < arr.length; i++) {
      this.usersProfileService.findByUserId(arr[i]).subscribe(user => {
        users.push(user);
      });
    }
  }

}
