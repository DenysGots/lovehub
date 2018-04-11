import { Component, OnInit } from '@angular/core';
import { PhotosService } from '../../services/photos.service';
import * as jwt_decode from 'jwt-decode';
import { Photo } from '../../models/photo';
import { Like } from '../../models/like';
import { LikesService } from '../../services/likes.service';


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

  photos: Photo[] = [ {userId: 0, _id: '', base64: '', avatar: false, name: ''} ];

  constructor(private photosService: PhotosService,
              private likesService: LikesService) { }

  ngOnInit() {
    this.like = new Like();
    this.userId = parseInt(jwt_decode(localStorage.getItem('jwt_token')).id, 10);
    this.userIdUrl = 67;

    this.photosService.getPhotos(this.userId)
      .subscribe(items => {
        this.photos = items;
      });

    this.getWhatUserLike();
    this.getLikesForUser();
  }

  addLike() {
    this.like.whoLike = this.userId;
    this.like.whatLike = this.userIdUrl;
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

  dislike() {
    this.likesService.dislikeUser(this.userId).subscribe();
  }

  findMutualLikes() {

  }

  getUsersAva() {

  }

  getUsersName() {

  }

}
