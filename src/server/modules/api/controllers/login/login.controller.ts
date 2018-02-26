import {Controller, Get, Post, Request, Response, Body, Query, HttpCode, UseFilters, Param} from '@nestjs/common';
import { User } from '../../users/user.entity';
import {UsersService} from '../../users/users.service';
import { HttpExceptionFilter} from '../../../filters/http-exception.filter';

@UseFilters(new HttpExceptionFilter())
@Controller('api/login')
export class LoginController {

  constructor(private readonly usersService: UsersService) {}

  @HttpCode(201)
  @Post()
  async findById(@Body() body) {
    const {email, password} = body;

    const user: User = await this.usersService.findByEmail(email, password);

    return user ? user : {};
  }
}
