import {Body, Controller, Delete, Get, HttpCode, Param, Post, UseFilters} from '@nestjs/common';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';


@Controller('api/users')
export class UsersController {

  constructor(private readonly usersService: UsersService) {}
  @HttpCode(201)
  @Post()
  async create(@Body() userDto: UserDto) {
    await this.usersService.create(userDto);
  }

  @HttpCode(200)
  @Get()
  async findAll(): Promise<User[]> {
    return await this.usersService.findAll();
  }

  @HttpCode(200)
  @Get(':id')
  async findById(@Param() params): Promise<User> {
    return await this.usersService.findById(params.id)
  }

  @HttpCode(204)
  @Delete(':id')
  async removeById(@Param() params): Promise<{statusCode: number}> {
    const affected = await this.usersService.remove(params.id);
    return {statusCode: affected};
  }
}
