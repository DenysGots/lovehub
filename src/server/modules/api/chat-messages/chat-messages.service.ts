import { Model } from 'mongoose';
import { Component, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Chat } from './interfaces/chat.interface';
import { CreateMessageDto } from './dto/create-message.dto';
import { ChatSchema } from './schemas/chat.schema';

@Component()
export class ChatMessagesService {
  constructor(@Inject('ChatModelToken') private readonly chatModel: Model<Chat>) {}

  async create(chatId, createMessageDto: CreateMessageDto): Promise<any> {
    return await this.chatModel
      .findOneAndUpdate(
        { chatId },
        {$push: {"messages": createMessageDto}},
        {
          "fields": { "messages": { $slice: -1 } },
          "new": true 
        }
      )
      .then(chat => ({
        chatId,
        message: chat.messages[0]
      }));
  }

  async setLastRead(message, both = false){
    console.log('mes', message);

    return await this.chatModel
      .findOne({ chatId: message.chatId })
      .then(chat => {
        console.log('both', both);

        if(both){
          chat.user1.lastReadId = message.message._id;
          chat.user2.lastReadId = message.message._id;
        } else {
          console.log('chat', chat);
          if(chat.user1.userId === message.message.userId){
            chat.user1.lastReadId = message.message._id;
          } else {
            chat.user2.lastReadId = message.message._id;
          }
        }

        chat.save();
        
      });
  }

  async findByChat(id: number): Promise<any> {
    return await this.chatModel.findOne({ chatId: id }).select('messages -_id');
  }

  async getLastMessage(chatId: number): Promise<any> {
    const message = await this.chatModel.aggregate([
      {$match: { chatId }},
      {$project: {
        message: {$arrayElemAt: ['$messages', -1]}
      }}
    ]).then(mes => !!mes[0] ? mes[0].message :  null);

    return message;
  }
}
