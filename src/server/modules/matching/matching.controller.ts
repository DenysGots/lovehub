import { Controller, Get } from '@nestjs/common';
import {MatchingServiceComponent} from './matching.service';

@Controller('api/matching')
export class MatchingController {
  constructor(private matchingService: MatchingServiceComponent) {}
  @Get()
  matching() {

    return this.matchingService.matchUsers();
  }
}

