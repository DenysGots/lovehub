import {Controller, Get} from '@nestjs/common';
import {RecoverPassService} from './recover-pass.service';

@Controller('api/forgot')
export class RecoverPassController {

  constructor(private readonly emailService: RecoverPassService) {}

  @Get()
  async recPass() {
    this.emailService.sendRecoverPassEmail('andrejnizovoj598@gmail.com');

    return  {};
  }
}
