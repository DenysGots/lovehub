import { Component, Inject } from '@nestjs/common';
import { UserProfile } from './user-profile.entity';
import { UserProfileDto } from './dto/user-profile.dto';
import {where} from 'sequelize';
import {User} from "../users/user.entity";

export interface FilteredUsersProfile {
  rows?: UserProfile[];
  count?: number;
}

@Component()
export class UsersProfileService {

  constructor(@Inject('UsersProfileRepository') private readonly userProfileRepository: typeof UserProfile) {}

  async create(userProfileDto: UserProfileDto): Promise<UserProfile> {
    const userProfile = new UserProfile();
    userProfile.firstName = userProfileDto.firstName;
    userProfile.lastName = userProfileDto.lastName;
    userProfile.age = userProfileDto.age;
    userProfile.gender = userProfileDto.gender;
    userProfile.userId = userProfileDto.userId;

    try {
      return await userProfile.save();
    } catch (error) {
      console.error(`Arise an exception in the save() method UserProfile Service`);
      throw error;
    }
  }

  async findAll(): Promise<FilteredUsersProfile> {
    try {
      return await this.userProfileRepository
        .findAndCountAll<UserProfile>();
    } catch (error) {
      console.error(`Arise an exception in the findAll() method UserProfile Service`);
      throw error;
    }
  }

  async findById(id: number): Promise<UserProfile> {
    try {
      return await this.userProfileRepository
        .findById<UserProfile>(id);
    } catch (error) {
      console.error(`Arise an exception in the findById(${id}) method UserProfile Service`);
      throw error;
    }
  }



  async findByName(name: string, offset: number, limit: number): Promise<FilteredUsersProfile> {
    console.log(`server service: findByName(${name})`);
    try {
      return await this.userProfileRepository
        .findAndCountAll<UserProfile>({where: {firstName: {$iLike: `${name}%`}}, offset: offset, limit: limit});
    } catch (error) {
      console.error(`Arise an exception in the findByName(${name}) method UserProfile Service`);
      throw error;
    }
  }

  async findByAge(age: number, offset: number, limit: number): Promise<FilteredUsersProfile> {
    console.log(`server service: findByAge(${age})`);
    try {
      return await this.userProfileRepository
        .findAndCountAll<UserProfile>({where: {age: {$gte: age}}, offset: offset, limit: limit});
    } catch (error) {
      console.error(`Arise an exception in the findByAge(${age}) method UserProfile Service`);
      throw error;
    }
  }

  async findByGender(gender: string, offset: number, limit: number): Promise<FilteredUsersProfile> {
    console.log(`server service: findByGender(${gender})`);
    try {
      return await this.userProfileRepository
        .findAndCountAll<UserProfile>({where: {gender: gender}, offset: offset, limit: limit});
    } catch (error) {
      console.error(`Arise an exception in the findByGender(${gender}) method UserProfile Service`);
      throw error;
    }
  }



  async update(id: number, userProfileDto: UserProfileDto): Promise<[number, UserProfile[]]> {
    try {
      return await this.userProfileRepository
        .update(userProfileDto, {where: {id: id}});
    } catch (error) {
      throw error;
    }
  }

  async remove(id: number): Promise<number> {
    try {
      return await this.userProfileRepository
        .destroy({where: {id: id}});
    } catch (error) {
      throw error;
    }
  }
}
