import { Controller, Get, Post } from '@nestjs/common';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { AdministratorServiceComponent } from './administrator.service';

@Controller('api/administrator')
export class AdministratorController {

  constructor(private readonly administratorService: AdministratorServiceComponent) {

  }

  @Get()
  getUsers() {
    console.log('here');
    return of (this.administratorService.getUsers());
  }
}
