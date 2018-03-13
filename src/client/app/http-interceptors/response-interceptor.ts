import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AuthErrorHandlerService } from '../services/auth-error-handler.service';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {

  constructor(public authErrorHandlerService: AuthErrorHandlerService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).switchMap((response, err) => {
      console.log(err);
      console.log(response instanceof HttpErrorResponse);

      if (response instanceof HttpErrorResponse) {

      }
      if (response['status'] === 401 || response['status'] === 403) {
        console.log('ResponseInterceptor ', response);
        this.authErrorHandlerService.handleError(response);
        return Observable.empty();
      }
      return Observable.of(response);

    });

  }
}
/*
return next.handle(req).switchMap((response) => {
      console.log(response instanceof HttpErrorResponse);
      if (response instanceof HttpErrorResponse) {
        if (response.status === 401 || response.status === 403) {
          console.log('ResponseInterceptor ', response.statusText);
          this.authErrorHandlerService.handleError(response);
          return Observable.empty();
        }
      }
      return Observable.of(response);
    });
 */

/*
.switchMap((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        return Observable.of(event);
      }
    }, ((err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401 || err.status === 403) {
          console.log('ResponseInterceptor ', err.statusText);
          this.authErrorHandlerService.handleError(err);
          return Observable.empty();
        }
      }
      return Observable.of(err);
    }));
 */

/*

 */
