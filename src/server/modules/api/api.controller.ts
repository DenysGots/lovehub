import { Controller, Get } from '@nestjs/common';

@Controller('api')
export class ApiController {

  @Get('')
  root() {

    return {
      message: 'Hello World!',
    };
  }
}
