import * as mongoose from 'mongoose';

export const mongodbProviders = [
  {
    provide: 'MongodbConnectionToken',
    useFactory: async () => {
      (mongoose as any).Promise = global.Promise;
      return await mongoose.connect('mongodb://localhost:27017/lovehub');
    },
  },
];
