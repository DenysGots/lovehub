import { Component, OnInit } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Like } from '../../models/like';
import { LikesService } from '../../services/likes.service';


@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})

export class ProfilePageComponent implements OnInit {

  userId: number;
  userIdUrl: number;
  like: Like;
  condition: Observable<boolean>;
  likeMode = true;

  constructor(private route: ActivatedRoute,
              private likesService: LikesService) { }

  ngOnInit() {
    this.condition = this.route.params.map(params => {
      console.log(params);
      this.userIdUrl = parseInt(params['userId'], 10);
      this.userId = parseInt(jwt_decode(localStorage.getItem('jwt_token')).id, 10);
      console.log('userID', this.userId);
      console.log('URLID', params['userId']);
      return this.userIdUrl === this.userId;
    });
  }

  addLike() {
    this.like.whoLike = this.userId;
    this.like.whatLike = this.userIdUrl;
    this.likesService.addLike(this.like as Like).subscribe();
    console.log('Like wrote');
    this.likeMode = false;
  }

  dislike() {
    this.likesService.dislikeUser(this.userId, this.userIdUrl).subscribe();
    this.likeMode = true;
  }

}
