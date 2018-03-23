import { Component, Inject } from '@nestjs/common';
import { User } from './user.entity';
import { UserDto } from './dto/user.dto';
import {UserProfile} from '../users-profile/user-profile.entity';

@Component()
export class UsersService {

  constructor(@Inject('UsersRepository') private readonly userRepository: typeof User) {}

  async create(userDto: UserDto): Promise<User> {
    const user = new User();
    user.name = userDto.name;
    user.email = userDto.email;
    user.password = userDto.password;

    return await user.save();
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.findAll<User>();
  }

  async findById(id: number): Promise<User> {
    return await this.userRepository.findById<User>(id, {include: [UserProfile]});
  }

  async findByEmailAndPassword(email: string, password: string): Promise<User> {
    return await this.userRepository.findOne({where: {email: email, password: password}});
  }

  async remove(id: number): Promise<number> {
    return await this.userRepository.destroy({where: {id: id}});
  }

  async updatePass(newPass: string, id: number) {
    return await this.userRepository.update({password: newPass}, {where: {id}});
  }

  async findByEmailAndPass(email: string, password: string): Promise<User> {
    return await this.userRepository.findOne<User>({where: {email, password}, include: [UserProfile]});
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne<User>({where: {email}});
  }

}
