import { Document } from 'mongoose';

export interface Chat extends Document {
  readonly chatId: number;
  readonly messages: object[];
  user1: {
    userId: number;
    lastReadId: any
  },
  user2:{
    userId: number;
    lastReadId: any
  }
}
