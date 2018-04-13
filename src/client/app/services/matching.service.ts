import { Injectable } from '@angular/core';

import {Observable} from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { User } from '../models/user';

import { HttpClient } from '@angular/common/http';
import { UserProfileDto } from '../../../server/modules/api/users-profile/dto/user-profile.dto';
import { Photo } from '../models/photo';
import {UsersProfileService} from './users-profile.service';
import {AuthService} from './auth.service';

import { AngularFireDatabase } from 'angularfire2/database';

import * as Geofire from 'geofire';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class MatchingService {
  dbRef: any;
  geoFire: any;

  constructor(private http: HttpClient,
              private usersProfileService: UsersProfileService,
              private auth: AuthService) {}
    searchUsers(term: string): Observable<User[]> {
      if (!term.trim()) {
      return of([]);
    }
    return this.http.get<User[]>(`api/users?name=${term}`)
      .pipe(
        tap(_ => console.log(`found users matching "${term}"`)),
        catchError(this.handleError<User[]>('matchUser', []))
      );
  }

    findAll(): Observable<User[]> {
      return this.http.get<User[]>(`api/users`)
        .pipe(
          tap(_ => console.log(`found users matching`)),
          catchError(this.handleError<User[]>('matchUser', []))
        );
  }

  private handleError<T>(operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
        console.log(`${operation} failed: ${error.message}`);
        return of(result as T);
      };
    }
}
