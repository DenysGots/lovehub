import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import * as jwt_decode from 'jwt-decode';

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import {ErrorObservable} from 'rxjs/observable/ErrorObservable';
import {UserCredentialsError} from '../components/login/UserCredentialsError';

@Injectable()
export class AuthService {
  private token: string;
  private redirectUrl: string = '/';
  private loginUrl: string = '/login';
  private isLoggedIn: boolean = false;
  private loggedInUser: any;

  constructor(private http: HttpClient) {}

  sign(email: string, password: string): Observable<any> {
    return this.http.post<Response>('api/auth', { email: email, password: password })
      .map(response => {
        this.token = JSON.parse(JSON.stringify(response)).idToken;

        if(this.token) {
          this.setSession();
          this.isLoggedIn = true;
          this.loggedInUser = this.getLoggedInUserCredential();
        } else {
          this.isLoggedIn = false;
        }

        return {
          isLoggedIn: this.isLoggedIn,
          loggedInUser: this.loggedInUser
        };
      });
  }

  private setSession(): void {
    localStorage.setItem('jwt_token', this.token);
  }

  public getSession(): string {
    return localStorage.getItem('jwt_token');
  }

  public getRedirectUrl(): string {
    return this.redirectUrl;
  }

  public setRedirectUrl(url: string): void {
    this.redirectUrl = url;
  }

  public getLoginUrl(): string {
    return this.loginUrl;
  }

  public logout(): void {
    this.token = null;
    localStorage.removeItem('jwt_token');
  }

  public isTokenExpired(): boolean {
    this.token = this.getSession();

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
    this.token = this.getSession();
    const decoded = jwt_decode(this.token);

    if (decoded.exp === undefined) {
      return null;
    }

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  public getLoggedInUserCredential(): any {
    const decoded = jwt_decode(this.getSession());

    const user = {
      userId: parseInt(decoded.id),
      userRole: decoded.role,
      firstName: decoded.firstName,
      lastName: decoded.lastName,
    };

    return user;
  }

  handleError(error: Error) {

    console.log(error);
  }

}
