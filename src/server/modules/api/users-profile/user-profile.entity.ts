import {AutoIncrement, BelongsTo, Column, DataType, Default, ForeignKey, Length, Model, PrimaryKey, Table} from 'sequelize-typescript';

import { User } from '../users/user.entity';

enum Gender {
  MALE = 'male',
  FEMALE = 'female',
}

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
/*
  @Default('MALE')
  @Column(DataType.ENUM('MALE', 'FEMALE'))
  gender: Gender;

  @Column
  photo: Buffer;
*/
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

