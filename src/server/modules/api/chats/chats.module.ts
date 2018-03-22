import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { chatsProviders } from './chats.providers';
import { messagesProviders } from './messages.providers';
import { ChatsController } from './chats.controller';
import { MessagesController } from './messages.controller';
import { ChatsService } from './chats.service';
import { MessagesService } from './messages.service';
import { UsersProfileModule } from '../users-profile/users-profile.module';
import { MongodbModule } from '../mongodb/mongodb.module';

@Module({
  imports: [DatabaseModule, UsersProfileModule, MongodbModule],
  controllers: [ChatsController, MessagesController],
  components: [ ChatsService, MessagesService, ...chatsProviders, ...messagesProviders]
})
export class ChatsModule {}
