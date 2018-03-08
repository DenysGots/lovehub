import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

import * as jwt_decode from 'jwt-decode';

import 'rxjs/add/operator/do';


@Injectable()
export class AuthService {
  public token: string;

  constructor(private http: HttpClient) {}

  sign(username: string, password: string): Observable<any> {
    return this.http.post<Response>('api/auth', JSON.stringify({ username: username, password: password }))
      .do(response => this.setSession(response));
  }

  private setSession(authResult) {
    localStorage.setItem('jwt_token', authResult.idToken);
  }

  public logout() {
    localStorage.removeItem('jwt_token');
  }

  public isTokenExpired(): boolean {
    this.token = this.getToken();

    if(!this.token) {
      return true;
    }

    const date = this.getTokenExpirationDate();

    if(date === undefined) {
      return false;
    }

    return !(date.valueOf() > new Date().valueOf());
  }

  private getTokenExpirationDate(): Date {
    this.token = this.getToken();
    const decoded = jwt_decode(this.token);

    console.log(`Client AuthService get expired time ${decoded.exp}`);
    if (decoded.exp === undefined) {
      return null;
    }

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  public getToken(): string {
    return localStorage.getItem('jwt_token');
  }
}

