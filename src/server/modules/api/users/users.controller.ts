import {Body, Controller, Delete, Get, Param, Post} from '@nestjs/common';
import { User } from './user.entity';
import { UsersService } from './users.service';
import {UserDto } from './dto/user.dto';

@Controller('api/users')
export class UsersController {

    constructor(private readonly usersService: UsersService) {}

    @Post()
    async create(@Body() userDto: UserDto) {
        await this.usersService.create(userDto);
    }

    @Get()
    async findAll(): Promise<User[]> {
        return await this.usersService.findAll();
    }

    @Get(':id')
    async findById(@Param() params): Promise<User> {
        return await this.usersService.findById(params.id);
    }
/*
    @Delete(':id')
    async delete(@Param() params): Promise<User> {
        return await this.usersService.delete(params.id);
    }
    */
}
