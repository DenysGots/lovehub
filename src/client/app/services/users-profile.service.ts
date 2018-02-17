import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { of } from 'rxjs/observable/of';

import { catchError, tap } from 'rxjs/operators';

import { UserProfile } from '../models/user-profile';

export interface FilteredUsersProfile {
  rows?: UserProfile[];
  count?: number;
}

@Injectable()
export class UsersProfileService {

  usersProfileUrl = 'api/users-profile/';

  constructor(private http: HttpClient) { }

  searchUsers(type, term, offset, limit): Observable<FilteredUsersProfile> {
    console.log(`angular: within searchUsers(${type}, ${term})`);
    if (type == 'search') {
      return this.findByName(term, offset, limit);
    } else if(type == 'range') {
      return this.findByAge(term, offset, limit);
    } else if(type == 'radio') {
      return this.findByGender(term, offset, limit);
    }
  }

  findByName(name, offset, limit): Observable<FilteredUsersProfile | {}> {
    console.log(`angular: within findByName(${name})`);
    if (!name.trim()) {
      return of([]);
    }

    return this.http.get<FilteredUsersProfile>(`${this.usersProfileUrl}?name=${name}&&offset=${offset}&&limit=${limit}`).pipe(
      tap(_ => console.log(`found users-profile by "${name}"`)),
      catchError(this.handleError<FilteredUsersProfile>('users-profile: findByName', ))
    );
  }

  findByAge(age, offset, limit): Observable<FilteredUsersProfile | {}> {
    if (!parseInt(age.trim())) {
      return of([]);
    }

    return this.http.get<FilteredUsersProfile>(`${this.usersProfileUrl}?age=${age}&&offset=${offset}&&limit=${limit}`).pipe(
      tap(_ => console.log(`found users-profile by "${age}"`)),
      catchError(this.handleError<FilteredUsersProfile>('users-profile: findByAge', ))
    );
  }

  findByGender(gender, offset, limit): Observable<FilteredUsersProfile | {}> {
    if (!gender.trim()) {
      return of([]);
    }

    return this.http.get<FilteredUsersProfile>(`${this.usersProfileUrl}?gender=${gender}&&offset=${offset}&&limit=${limit}`).pipe(
      tap(_ => console.log(`found users-profile by "${gender}"`)),
      catchError(this.handleError<FilteredUsersProfile>('users-profile: findByGender', ))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
