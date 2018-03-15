import { Module } from '@nestjs/common';
import { ApiModule } from './modules/api/api.module';
import { StaticModule } from './modules/static/static.module';
import { HomepageModule } from './modules/homepage/homepage.module';
import { MatchingModule } from './modules/matching/matching.module';
import { PhotosModule } from './modules/api/photos/photos.module';

@Module({
  imports: [
    ApiModule,
    HomepageModule,
    MatchingModule,
    PhotosModule,
    StaticModule,
  ],
  controllers: [],
  components: [],
})
export class ApplicationModule {}
