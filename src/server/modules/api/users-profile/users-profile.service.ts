import { Component, Inject } from '@nestjs/common';
import { UserProfile } from './user-profile.entity';
import { UserProfileDto } from './dto/user-profile.dto';

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

  async findAll(): Promise<UserProfile[]> {
    return await this.userProfileRepository.findAll<UserProfile>();
  }

  async findById(id: number): Promise<UserProfile> {
    return await this.userProfileRepository.findById<UserProfile>(id);
  }

  async findByName(name: string): Promise<UserProfile[]> {
    return await this.userProfileRepository.findAll<UserProfile>();
  }

  async findByAge(age: number): Promise<UserProfile[]> {
    return await this.userProfileRepository.findAll<UserProfile>();
  }

  async findByGender(gender: string): Promise<UserProfile[]> {
    return await this.userProfileRepository.findAll<UserProfile>();
  }
}
