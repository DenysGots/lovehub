import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AuthService {
  public token: string;

  constructor(private http: HttpClient) {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
  }

  login(username: string, password: string): Observable<boolean> {
    return this.http.post<Response>('api/login', JSON.stringify({ username: username, password: password }))
      .map((response: Response) => {
        let token = response.json() && response.json();
        if (token) {
          token = token;
          localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));
          return true;
        } else {
          return false;
        }
      });
  }
}
