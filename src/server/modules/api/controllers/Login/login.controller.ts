import {Controller, Get, Post, Request, Response, Body} from '@nestjs/common';
import { LoginService } from '../../services/login.service';
import { User } from '../../services/user';

@Controller('api/login')
export class LoginController {

  user: User;

  constructor(private logService: LoginService) {}

  @Get()
  printMessage() {
    console.log('Its work)');
    return {};
  }

  @Post()
  async getUser(@Body() body, @Response() res) {
    console.log(body);

    const user = this.logService.findUser(body.email, body.password);
    res.send(user);
  }

}
