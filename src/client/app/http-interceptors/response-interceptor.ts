import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AuthErrorHandlerService } from '../services/auth-error-handler.service';
import { Injectable } from '@angular/core';
import {HttpStatus} from '@nestjs/common';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {

  constructor(public authErrorHandlerService: AuthErrorHandlerService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).do((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {

      }
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401 || err.status === 403) {
          console.log('ResponseInterceptor ', err.statusText);
          this.authErrorHandlerService.handleError(err);
        }
      } else {
        this.authErrorHandlerService.handleError(err);
      }
    });
  }

}
