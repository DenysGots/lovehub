import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { of } from 'rxjs/observable/of';

import { catchError, tap } from 'rxjs/operators';

import { UserProfile } from '../models/user-profile';


@Injectable()
export class UsersProfileService {

  constructor(private http: HttpClient) { }

  searchUsers(type, term): Observable<UserProfile[]> {
    console.log(`angular: within searchUsers(${type}, ${term})`);
    if (type == 'search') {
      return this.findByName(term);
    } else if(type == 'range') {
      return this.findByAge(term);
    } else if(type == 'radio') {
      return this.findByGender(term);
    }
  }

  findByName(name): Observable<UserProfile[]> {
    console.log(`angular: within findByName(${name})`);
    if (!name.trim()) {
      return of([]);
    }
    return this.http.get<UserProfile[]>(`api/users-profile/?term=${name}`).pipe(
      tap(_ => console.log(`found users-profile by "${name}"`)),
      catchError(this.handleError<UserProfile[]>('users-profile: findByName', []))
    );
  }

  findByAge(age): Observable<UserProfile[]> {
    if (!parseInt(age.trim())) {
      return of([]);
    }
    return this.http.get<UserProfile[]>(`api/users-profile/?term=${age}`).pipe(
      tap(_ => console.log(`found users-profile by "${age}"`)),
      catchError(this.handleError<UserProfile[]>('users-profile: findByAge', []))
    );
  }

  findByGender(gender): Observable<UserProfile[]> {
    if (!gender.trim()) {
      return of([]);
    }
    return this.http.get<UserProfile[]>(`api/users-profile/?term=${gender}`).pipe(
      tap(_ => console.log(`found users-profile by "${gender}"`)),
      catchError(this.handleError<UserProfile[]>('users-profile: findByGender', []))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
