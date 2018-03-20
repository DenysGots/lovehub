import * as crypto from 'crypto';
import { AutoIncrement, BeforeCreate, Column, DataType, HasOne, Model, PrimaryKey, Table, HasMany, BelongsTo, BelongsToMany } from 'sequelize-typescript';
import { UserProfile } from '../users-profile/user-profile.entity';
import { Chat } from '../chats/chat.entity';

@Table({tableName: 'Users'})
export class User extends Model<User> {

  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @Column
  name: string;

  @Column({
    type: DataType.CHAR(100),
    allowNull: false,
    validate: {
      isEmail: true,
      isUnique: async (value: string, next: Function): Promise<any> => {
        const isExist = await User.findOne<User>({ where: { email: value }});
        if (isExist) {
          const error = new Error('User with this email already exist');
          next(error);
        }
        next();
      }
    }
  })
  email: string;

  @Column
  password: string;

  @HasOne(() => UserProfile)
  userProfile: UserProfile;



/*
  @BeforeCreate
  public static async hashPassword(user: User, options: any) {
    if (!options.transaction) throw new Error('Missing transaction.');

    user.password = crypto.createHmac('sha256', user.password).digest('hex');
  }
  */
}

