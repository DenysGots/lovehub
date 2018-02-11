import { Sequelize } from 'sequelize-typescript';

import { User } from '../users/user.entity';
import { UserProfile } from '../users-profile/user-profile.entity';

export const databaseProviders = [
  {
    provide: 'SequelizeToken',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'nss22NSS22',
        database: 'postgres',
        pool: {
          max: 5,
          min: 0,
          acquire: 30000,
          idle: 10000
        },
      });
      sequelize.addModels([User, UserProfile]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
