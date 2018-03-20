import {
  AutoIncrement, BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasOne, Length, Model, PrimaryKey,
  Table
} from 'sequelize-typescript';

import { User } from '../users/user.entity';
import { Location } from './location.entity';
import { Rating } from './rating.entity';
import { SEX } from './sex';
import { ROLE } from './role';
import { PREFERENCE } from './preference';
import { UserProfileInterest } from './user-profile-interest.entity';
import { Interest } from './interest.entity';
import {ORIENTATION} from './orientation';

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
  phoneNumber: number;

  @Column
  age: number;

  @Column(DataType.ENUM('MALE', 'FEMALE'))
  sex: SEX;

  @Column(DataType.ENUM('USER', 'MODERATOR', 'ADMIN'))
  role: ROLE;

  @Column(DataType.ENUM('DATE', 'FRIENDS', 'PARTY'))
  preference: PREFERENCE;

  @Column(DataType.ENUM('MAN', 'WOMAN', 'ALL'))
  orientation: ORIENTATION;

  @Column
  isBaned: boolean;

  @Column
  isActive: boolean;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @HasOne(() => Location)
  location: Location;

  @HasOne(() => Rating)
  rating: Rating;

  @BelongsToMany(() => Interest, () => UserProfileInterest)
  authors: Interest[];
}

