import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { User } from '../models/user';

import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class UsersService {

  constructor(private http: HttpClient) { }

  searchUsers(term: string): Observable<User[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<User[]>(`api/users/?name=${term}`).pipe(
      tap(_ => console.log(`found users matching "${term}"`)),
      catchError(this.handleError<User[]>('searchHeroes', []))
    );
  }
  registration(user: User): Observable<User> {
    const url = 'api/users';
    return this.http.post<User>(url, user, httpOptions);
  }


  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
