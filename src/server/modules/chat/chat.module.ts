import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { messagesProviders } from './messages.providers';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { MongodbModule } from '../api/mongodb/mongodb.module';

@Module({
  imports: [MongodbModule],
  controllers: [ MessagesController],
  components: [ ChatGateway, MessagesService, ...messagesProviders]
})
export class ChatModule {}
