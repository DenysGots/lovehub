import {Body, Controller, Get, HttpCode, Post, Param} from '@nestjs/common';
import { Chat } from './chat.entity';
import { ChatsService } from './chats.service';
import { ChatDto } from './dto/chat.dto';
import { UsersProfileService } from '../users-profile/users-profile.service';

@Controller('api/chats')
export class ChatsController {

  constructor(
    private chatsService: ChatsService,
    private usersProfileService: UsersProfileService
  ) {}

  // @HttpCode(201)
  // @Post()
  // async create(@Body() chatDto: ChatDto) {
  //   await this.chatsService.create(chatDto);
  // }

  @HttpCode(200)
  @Get(':id')
  async findById(@Param() params): Promise<any[]> {
    const chats = await this.chatsService.findByUser(params.id);
    const fullChats = chats.map(async (chat) => {
      const userId1 = chat.get('userId1');
      const userId2 = chat.get('userId2');

      let user1 = await this.usersProfileService.findShortInfo(userId1);
      let user2 = await this.usersProfileService.findShortInfo(userId2);

      user1 = { ...user1.dataValues, avatar: 'https://i.pinimg.com/736x/fb/e3/75/fbe37552637081f7bced381c7c464f3b--illustration-girl-girl-illustrations.jpg'};
      user2 = { ...user2.dataValues, avatar: 'https://i.pinimg.com/736x/fb/e3/75/fbe37552637081f7bced381c7c464f3b--illustration-girl-girl-illustrations.jpg'};

      return {
        chatId: chat.chatId,
        user1,
        user2
      }
    });

    return Promise.all(fullChats);
  }
}
