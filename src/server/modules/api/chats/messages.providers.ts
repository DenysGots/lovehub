import { Connection } from 'mongoose';
import { ChatSchema } from './schemas/chat.schema';

export const messagesProviders = [
  {
    provide: 'ChatModelToken',
    useFactory: (connection: Connection) => connection.model('Chat', ChatSchema),
    inject: ['MongodbConnectionToken'],
  },
];
