import { Module } from '@nestjs/common';

import { ApiModule } from './modules/api/api.module';
import { StaticModule } from './modules/static/static.module';
import {MatchingModule} from './modules/matching/matching.module';

@Module({
  imports: [
    ApiModule,
    MatchingModule,
    StaticModule,
  ],
  controllers: [],
  components: [],
})
export class ApplicationModule {}
