import * as mongoose from 'mongoose';

export const PhotoSchema = new mongoose.Schema({
  name: String,
  base64: String,
  time: {
    type: Date,
    default: Date.now()
  }
}, {collection: 'Photo'});
