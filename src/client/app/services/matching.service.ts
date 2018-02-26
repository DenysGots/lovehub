import { Injectable } from '@angular/core';

import {Observable} from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { User } from '../models/user';

import { HttpClient } from '@angular/common/http';

@Injectable()
export class MatchingService {

  constructor(private http: HttpClient) {
  }

  searchUsers(term: string): Observable<User[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<User[]>(`api/users/?name=${term}`).pipe(
      tap(_ => console.log(`found users matching "${term}"`)),
      catchError(this.handleError<User[]>('matchUser', []))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  matchUsers(term: string): Observable<string[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<string[]>(`api/matching/?name=${term}`).pipe(
      tap(_ => console.log(`found users matching "${term}"`)),
      catchError(this.handleError<string[]>('matchUser', []))
    );
  }
}
