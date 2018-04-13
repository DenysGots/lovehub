import {Injectable} from '@angular/core';

import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {catchError, tap} from 'rxjs/operators';

import {User} from '../models/user';

import {HttpClient} from '@angular/common/http';
import {UserProfileDto} from '../../../server/modules/api/users-profile/dto/user-profile.dto';
import {FilteredUsersProfile, UsersProfileService} from './users-profile.service';
import {AuthService} from './auth.service';

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

    findAll(): Observable<UserProfileDto[]> {
      return this.usersProfileService.findAll().map(fup => fup.rows);
  }

  private handleError<T>(operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
        console.log(`${operation} failed: ${error.message}`);
        return of(result as T);
      };
    }
}
