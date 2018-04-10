import { Model } from 'mongoose';
import { Component, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Chat } from './interfaces/chat.interface';
import { CreateMessageDto } from './dto/create-message.dto';
import { ChatSchema } from './schemas/chat.schema';

@Component()
export class ChatMessagesService {
  constructor(@Inject('ChatModelToken') private readonly chatModel: Model<Chat>) {}

  async createChat(chatId): Promise<any> {
    return await this.chatModel.collection.insert({chatId, messages: []});
  }

  async create(chatId, createMessageDto: CreateMessageDto): Promise<any> {
    createMessageDto.created = new Date();
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

  async findByChat(id: number): Promise<any> {
    return await this.chatModel.findOne({ chatId: id }).select('messages -_id');
  }
  
  async setRead(chatId, userId){
    const res = await this.chatModel.update({
      chatId,
      "messages": {$elemMatch: { "userId": userId, "read": false } }
    },{
        $set: { "messages.$[].read" : true}
    },
    {multi:true});
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
