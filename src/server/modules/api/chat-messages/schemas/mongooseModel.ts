const mongoose = require('mongoose');
const schema = require('./chat.schema');


export const ChatModel = mongoose.model('ChatModel', schema);