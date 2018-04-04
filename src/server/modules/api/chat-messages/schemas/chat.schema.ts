import * as mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
  userId: Number,
  text: String
});

MessageSchema.virtual('title').get(function(){
  console.log('!!', this);
  return this.userId + this.text;
});

export const ChatSchema = new mongoose.Schema({
  chatId: Number,
  messages: [ MessageSchema ],
  user1: {
    id: Number,
    lastReadId: mongoose.Schema.Types.ObjectId
  },
  user2: {
    userId: Number,
    lastReadId: mongoose.Schema.Types.ObjectId
  }
}, {collection: 'Chats'});
