import {Body, Controller, Delete, Get, Param, Post, Query} from '@nestjs/common';
import { UserProfileDto } from './dto/user-profile.dto';
import { UsersProfileService } from './users-profile.service';
import { UserProfile } from './user-profile.entity';

@Controller('api/users-profile')
export class UsersProfileController {

  constructor(private readonly usersProfileService: UsersProfileService) {}

  @Post()
  async create(@Body() userProfileDto: UserProfileDto) {
    await this.usersProfileService.create(userProfileDto);
  }

  @Get()
  async findAll(): Promise<UserProfile[]> {
    console.log(`server findAll()`);
    return await this.usersProfileService.findAll();
  }

  @Get(':id')
  async findById(@Param() params): Promise<UserProfile> {
    return await this.usersProfileService.findById(params.id);
  }

  @Get('?name')
  async findByName(@Query() queries): Promise<UserProfile[]> {
    return await this.usersProfileService.findByName(queries.name);
  }

  @Get('?age')
  async findByAge(@Query() queries): Promise<UserProfile[]> {
    return await this.usersProfileService.findByAge(parseInt(queries.age));
  }

  @Get('?gender')
  async findByGender(@Query() queries): Promise<UserProfile[]> {
    return await this.usersProfileService.findByGender(queries.gender);
  }

}
