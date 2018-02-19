import {AutoIncrement, BelongsTo, Column, ForeignKey, Length, Model, PrimaryKey, Table} from 'sequelize-typescript';

import { User } from '../users/user.entity';

@Table({tableName: 'UsersProfile'})
export class UserProfile extends Model<UserProfile> {

  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @Length({min: 2, max: 15})
  @Column
  firstName: string;

  @Length({min: 2, max: 15})
  @Column
  lastName: string;

  @Column
  numberLike: number;

  @Column
  age: number;

  @Column
  photo: Buffer;

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

