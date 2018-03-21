import { Component, Inject } from '@nestjs/common';
import { Chat } from './chat.entity';
import { ChatDto } from './dto/chat.dto';
import { Op } from 'sequelize';

@Component()
export class ChatsService {

  constructor(@Inject('ChatsRepository') private readonly chatsRepository: typeof Chat) {}

  async create(chatDto: ChatDto): Promise<Chat> {
    const chat = new Chat();
    chat.userId1 = chatDto.userId1;
    chat.userId1 = chatDto.userId1;

    return await chat.save();
  }

  async findByUser(id: number): Promise<Chat[]> {
    return await this.chatsRepository.findAll<Chat>({
        where: {
            [Op.or]: [
                { userId1: id},
                { userId2: id }
            ]
        }
    });
  }
}
