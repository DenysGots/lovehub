import { Connection } from 'mongoose';
import { UserProfileSchema } from './user-profile.schema';

export const UserProfileProvider = [
  {
    provide: 'UserProfileModelToken',
    useFactory: (connection: Connection) => connection.model('UserProfile', UserProfileSchema),
    inject: ['MongodbConnectionToken'],
  },
];
