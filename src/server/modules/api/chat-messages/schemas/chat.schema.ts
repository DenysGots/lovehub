import * as mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
        userId: Number,
        text: String
});

export const ChatSchema = new mongoose.Schema({
  chatId: Number,
  messages: [ MessageSchema ]
}, {collection: 'Chats'});
