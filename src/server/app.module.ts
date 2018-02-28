import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ApiModule } from './modules/api/api.module';
import { StaticModule } from './modules/static/static.module';
import { HomepageModule } from './modules/homepage/homepage.module';
import {MatchingModule} from './modules/matching/matching.module';

@Module({
  imports: [
    ApiModule,
    HomepageModule,
    MatchingModule,
    StaticModule,
    MongooseModule.forRoot('mongodb://localhost/nest')
  ],
  controllers: [],
  components: [],
})
export class ApplicationModule {}
