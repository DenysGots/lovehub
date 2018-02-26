import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { of } from 'rxjs/observable/of';

import { catchError, tap } from 'rxjs/operators';

import { UserProfile } from '../models/user-profile';

export interface FilteredUsersProfile {
  rows?: UserProfile[];
  count?: number;
}

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class UsersProfileService {

  usersProfileUrl = 'api/users-profile/';

  constructor(private http: HttpClient) { }

  registration(user: UserProfile): Observable<UserProfile> {
    return this.http.post<UserProfile>(this.usersProfileUrl, user, httpOptions);
  }

  searchUsers(type, term, offset, perPage): Observable<FilteredUsersProfile> {
    console.log(`angular: within searchUsers(${type}, ${term})`);
    if (type == 'search') {
      return this.findByName(term, offset, perPage);
    } else if(type == 'range') {
      return this.findByAge(term, offset, perPage);
    } else if(type == 'radio') {
      return this.findByGender(term, offset, perPage);
    }
  }

  findByName(name, offset, limit): Observable<FilteredUsersProfile | {}> {
    console.log(`angular: within findByName(${name})`);
    if (!name.trim()) {
      return of([]);
    }

    return this.http.get<FilteredUsersProfile>(`${this.usersProfileUrl}?name=${name}&&offset=${offset}&&limit=${limit}`).pipe(
      tap(_ => console.log(`found users-profile by "${name}"`)),
      catchError(this.handleError<FilteredUsersProfile>(`repository users-profile: findByName(${name})`, ))
    );
  }

  findByAge(age, offset, limit): Observable<FilteredUsersProfile | {}> {
    if (!parseInt(age.trim())) {
      return of([]);
    }

    return this.http.get<FilteredUsersProfile>(`${this.usersProfileUrl}?age=${age}&&offset=${offset}&&limit=${limit}`).pipe(
      tap(_ => console.log(`found users-profile by "${age}"`)),
      catchError(this.handleError<FilteredUsersProfile>(`repository users-profile: findByAge(${age})`, ))
    );
  }

  findByGender(gender, offset, limit): Observable<FilteredUsersProfile | {}> {
    if (!gender.trim()) {
      return of([]);
    }

    return this.http.get<FilteredUsersProfile>(`${this.usersProfileUrl}?gender=${gender}&&offset=${offset}&&limit=${limit}`).pipe(
      tap(_ => console.log(`found users-profile by "${gender}"`)),
      catchError(this.handleError<FilteredUsersProfile>(`repository users-profile: findByGender(${gender})`, ))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(`${operation} failed: ${error.status}: ${error.message}`);
      return of(result as T);
    };
  }
}
