import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { fakeUser } from './fakeUser';

@Injectable()
export class UserProfileService {

  private static handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      if (error.status === 404) {
        errMsg = `Resourse ${error.url} wasn\'t found`;
      } else {
        const body = error.json() || '';
        // const err = body.error || JSON.stringify(body);
        const err = body || JSON.stringify(body);
        errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
      }
    } else {
        errMsg = error.message ? error.message : error.toString();
    }
    return Observable.throw(errMsg);
  }

  constructor(private http: HttpClient) {}

  getUser (userId: number): Subject<any> {
    const mockUserSubject = new Subject();
    setTimeout(() => mockUserSubject.next(fakeUser), 1000);

    return mockUserSubject;
  }
}
