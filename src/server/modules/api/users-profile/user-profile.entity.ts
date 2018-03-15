import {AutoIncrement, BelongsTo, Column, DataType, Default, ForeignKey, Length, Model, PrimaryKey, Table} from 'sequelize-typescript';

import { User } from '../users/user.entity';

@Table({tableName: 'UsersProfile'})
export class UserProfile extends Model<UserProfile> {

  @AutoIncrement
  @PrimaryKey
  @Column
  id: number;

  @Length({min: 2, max: 15, msg: 'wrong length'})
  @Column
  firstName: string;

  @Length({min: 2, max: 15, msg: 'wrong length'})
  @Column
  lastName: string;

  @Column
  numberLike: number;

  @Column
  age: number;

  @Column
  gender: string;

  @Column
  photo: string;

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

