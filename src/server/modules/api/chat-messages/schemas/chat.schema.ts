import * as mongoose from 'mongoose';

const MessageSchema = mongoose.Schema({
        userId: Number,
        text: String
},{ _id : false });

export const ChatSchema = new mongoose.Schema({
  chatId: Number,
  messages: [ MessageSchema ]
}, {collection: 'Chats'});
