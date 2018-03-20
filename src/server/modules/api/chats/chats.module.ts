import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { chatsProviders } from './chats.providers';

@Module({
  imports: [DatabaseModule],
  // controllers: [UsersController],
  components: [ ...chatsProviders],
  exports: [ ...chatsProviders]
})
export class ChatsModule {}
