import { AutoIncrement, BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table, Unique } from 'sequelize-typescript';

import { User } from '../users/user.entity';

@Table({tableName: 'UsersProfile'})
export class UserProfile extends Model<UserProfile> {

  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @Column
  firstName: string;

  @Column
  lastName: string;

  @Column
  numberLike: number;

  @Column
  age: number;

  @Column
  isBaned: boolean;

  @Column
  isActive: boolean;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;
}

