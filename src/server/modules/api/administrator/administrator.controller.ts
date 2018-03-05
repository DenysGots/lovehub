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
    return await this.administratorService.manageUsersList(getUsersEnquiryDto);
  }

  @Patch('')
  async updateUsers(@Body() updateUsersEnquiryDto) {
    return await this.administratorService.updateUsersList(updateUsersEnquiryDto);
  }

}
