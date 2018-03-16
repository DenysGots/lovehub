import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/empty';

@Injectable()
export class AuthErrorHandlerService implements ErrorHandler {

  constructor(private injector: Injector) {}

  public handleError(error: any): Observable<any> {
    console.log('AuthErrorHandler', error.status);
    const router = this.injector.get(Router);

    if(error.status === 401) {
      router.navigate(['/login']);
      return Observable.empty();
    }

    if(error.status === 403) {
      router.navigate(['/forbidden']);
      return Observable.empty();
    }

    throw error;
  }
}
