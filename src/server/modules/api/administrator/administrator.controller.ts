import { Body, Controller, Post, Patch } from '@nestjs/common';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { AdministratorServiceComponent } from './administrator.service';

@Controller('api/administrator')
export class AdministratorController {

  constructor(private readonly administratorService: AdministratorServiceComponent) {
  }

  @Post('')
  async getUsers(@Body() getUsersEnquiryDto) {
    return this.administratorService.manageUsersList(getUsersEnquiryDto);
  }

  @Patch('')
  async updateUsers(@Body() updateUsersEnquiryDto) {
    return this.administratorService.updateUsersList(updateUsersEnquiryDto);
  }

}
