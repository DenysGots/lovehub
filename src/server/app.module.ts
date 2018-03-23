import { Module } from '@nestjs/common';

import { ApiModule } from './modules/api/api.module';
import { StaticModule } from './modules/static/static.module';
import { HomepageModule } from './modules/homepage/homepage.module';
import { MatchingModule } from './modules/matching/matching.module';
import { ChatModule } from './modules/chat/chat.module';
import { ChatListModule } from './modules/api/chat-list/chat-list.module';
import { AuthModule } from './modules/auth/auth.module';
import { AdministratorModule } from './modules/api/administrator/administrator.module';

@Module({
  imports: [
    ApiModule,
    HomepageModule,
    MatchingModule,
    ChatModule,
    ChatListModule,
    AuthModule,
    StaticModule,
    AdministratorModule
  ],
  controllers: [],
  components: [],
})
export class ApplicationModule {}
