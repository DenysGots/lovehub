import { Module } from '@nestjs/common';
import { MatchingController } from './matching.controller';
import {MatchingServiceComponent} from './matching.service';

@Module({
  imports: [],
  controllers: [MatchingController],
  components: [MatchingServiceComponent],
})
export class MatchingModule {}


