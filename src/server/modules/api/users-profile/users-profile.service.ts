import { Component, Inject } from '@nestjs/common';
import { UserProfile } from './user-profile.entity';
import { UserProfileDto } from './dto/user-profile.dto';

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

    return await userProfile.save();
  }

  async findAll(): Promise<FilteredUsersProfile> {
    return await this.userProfileRepository
      .findAndCountAll<UserProfile>();
  }

  async findById(id: number): Promise<UserProfile> {
    return await this.userProfileRepository
      .findById<UserProfile>(id);
  }

  async findByName(name: string, offset: number, limit: number): Promise<FilteredUsersProfile> {
    console.log(`server service: findByName(${name})`);
    return await this.userProfileRepository
      .findAndCountAll<UserProfile>({where: {firstName: {$iLike: `${name}%`}}, offset: offset, limit: limit});
  }

  async findByAge(age: number, offset: number, limit: number): Promise<FilteredUsersProfile> {
    console.log(`server service: findByAge(${age})`);
    return await this.userProfileRepository
      .findAndCountAll<UserProfile>({where: {age: {$gte: age}}, offset: offset, limit: limit});
  }

  async findByGender(gender: string, offset: number, limit: number): Promise<FilteredUsersProfile> {
    console.log(`server service: findByGender(${gender})`);
    return await this.userProfileRepository
      .findAndCountAll<UserProfile>({where: {firstName: gender}, offset: offset, limit: limit});
  }


  async update(id: number, userProfileDto: UserProfileDto): Promise<[number, UserProfile[]]> {
    return await this.userProfileRepository.update(userProfileDto, {where: {id: id}});
  }

  async remove(id: number): Promise<number> {
    return await this.userProfileRepository.destroy({where: {id: id}});
  }
}
