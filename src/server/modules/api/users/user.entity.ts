import { AutoIncrement, Column, HasOne, Model, PrimaryKey, Table, Unique } from 'sequelize-typescript';
import { UserProfile } from '../users-profile/user-profile.entity';

@Table({tableName: 'Users'})
export class User extends Model<User> {

  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @Column
  name: string;

  @Unique
  @Column
  email: string;

  @Column
  password: string;

  @HasOne(() => UserProfile)
  userProfile: UserProfile;
}

