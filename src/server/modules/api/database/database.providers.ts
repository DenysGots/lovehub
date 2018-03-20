import { Sequelize } from 'sequelize-typescript';

import { User } from '../users/user.entity';
import { UserProfile } from '../users-profile/user-profile.entity';
import { Rating } from '../users-profile/rating.entity';
import { Location } from '../users-profile/location.entity';
import { UserProfileInterest } from '../users-profile/user-profile-interest.entity';
import { Interest } from '../users-profile/interest.entity';
import { Chat } from '../chats/chat.entity';

export const databaseProviders = [
  {
    provide: 'SequelizeToken',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: '141296',
        database: 'lovehub',
        pool: {
          max: 5,
          min: 0,
          acquire: 30000,
          idle: 10000
        },
      });
      sequelize.addModels([User, UserProfile, Rating, Location, Interest, UserProfileInterest, Chat]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
