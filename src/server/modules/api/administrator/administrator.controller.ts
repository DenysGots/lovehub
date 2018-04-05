import { Controller, Body, Param, Get, Post, Patch } from '@nestjs/common';
import { ParseIntPipe } from '@nestjs/common/pipes/parse-int.pipe';

import { AdministratorServiceComponent } from './administrator.service';

@Controller('api/administrator')
export class AdministratorController {

  constructor(private readonly administratorService: AdministratorServiceComponent) {
  }

  // Get user from DB by id
  @Get('get-user/:id')
  async getUser(@Param('id', new ParseIntPipe()) id) {
    await this.administratorService.getUser(id);
    return this.administratorService.currentUser;
  }

  // Get site statistics information
  @Get('get-statistics')
  async getStatistics() {
    return await this.administratorService.collectSiteStatistics();
  }

  // Get search results
  @Get('search/:input')
  async getSearchResults(@Param('input') input) {
    return await this.administratorService.getSearchResults(input);
  }

  // Create an array of users according to options, received from client
  @Post('get-users')
  async getUsers(@Body() getUsersEnquiryDto) {
    return await this.administratorService.manageUsersList(getUsersEnquiryDto);
  }

  // Update users parameters in DB according to options, received from client
  @Patch('update-users')
  async updateUsers(@Body() updateUsersEnquiryDto) {
    return await this.administratorService.updateUsersList(updateUsersEnquiryDto);
  }

}
