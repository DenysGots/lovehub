import { Component, Inject } from '@nestjs/common';
import { User } from './user.entity';
import { UserDto } from './dto/user.dto';

@Component()
export class UsersService {

    constructor(@Inject('UsersRepository') private readonly userRepository: typeof User) {}

    async create(userDto: UserDto): Promise<User> {
        const user = new User();
        user.email = userDto.email;
        user.password = userDto.password;

        return await user.save();
    }

    async findAll(): Promise<User[]> {
        return await this.userRepository.findAll<User>();
    }

    async findById(id: number): Promise<User> {
        return await this.userRepository.findById<User>(id);
    }
/*
    async delete(id: number): Promise<User> {
        return await this.userRepository.remove<User>(id);
    }
    */
}
