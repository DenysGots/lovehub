import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { chatsProviders } from './chats.providers';
import { ChatsController } from './chats.controller';
import { ChatsService } from './chats.service';
import { UsersProfileModule } from '../users-profile/users-profile.module';

@Module({
  imports: [DatabaseModule, UsersProfileModule],
  controllers: [ChatsController],
  components: [ ChatsService, ...chatsProviders]
})
export class ChatsModule {}
