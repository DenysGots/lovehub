import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class AuthErrorHandlerService implements ErrorHandler {

  constructor(private injector: Injector) {}

  handleError(error: any): void {
    console.log('AuthErrorHandler', error.status);
    const router = this.injector.get(Router);

    if(error.status === 401) {
      router.navigate(['/login']);
    }

    if(error.status === 403) {
      router.navigate(['/forbidden']);
    }

    throw error;
  }
}
