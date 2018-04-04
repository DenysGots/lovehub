import * as mongoose from 'mongoose';
import {Model, Types} from 'mongoose';
import { Component, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Chat } from './interfaces/chat.interface';
import { CreateMessageDto } from './dto/create-message.dto';
import { ChatSchema } from './schemas/chat.schema';

@Component()
export class ChatMessagesService {
  constructor(@Inject('ChatModelToken') private readonly chatModel: Model<Chat>) {}

  async create(chatId, createMessageDto: CreateMessageDto): Promise<Chat> {
    return this.chatModel
      .findOne({ chatId: chatId }, function(err, chat){
        chat.messages.push(createMessageDto);

        return chat.save();
      });
  }

  async deleteMessageById(chatId: number, messageId: string): Promise<any> {
    const msgId = mongoose.Types.ObjectId(messageId);
    return await this.chatModel.update({chatId}, {$pull: {messages: {_id: msgId}}});
  }

  async editMessageText(chatId: number, messageId: number, text: string): Promise<any> {
    return await this.chatModel.updateOne({chatId, 'messages._id': messageId}, {$set: {'messages.$.text': text}});
  }

  async findByChat(id: number): Promise<any> {
    return await this.chatModel.findOne({ chatId: id }).select('messages -_id');
  }
}
