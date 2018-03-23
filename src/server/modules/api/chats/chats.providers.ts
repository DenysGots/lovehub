import { Chat } from './chat.entity';

export const chatsProviders = [
  {
    provide: 'ChatsRepository',
    useValue: Chat,
  },
];
