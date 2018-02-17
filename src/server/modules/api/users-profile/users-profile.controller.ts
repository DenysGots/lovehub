import {Body, Controller, Delete, Get, HttpCode, Param, Post, Query} from '@nestjs/common';
import { UserProfileDto } from './dto/user-profile.dto';
import { UsersProfileService } from './users-profile.service';
import { UserProfile } from './user-profile.entity';

export interface FilteredUsersProfile {
  rows?: UserProfile[];
  count?: number;
}

@Controller('api/users-profile')
export class UsersProfileController {

  constructor(private readonly usersProfileService: UsersProfileService) {}

  @Post()
  async create(@Body() userProfileDto: UserProfileDto) {
    console.log(userProfileDto);
    await this.usersProfileService.create(userProfileDto);
  }

  @Get(':id')
  async findById(@Param() params): Promise<UserProfile> {
    return await this.usersProfileService.findById(params.id);
  }

  @Get()
  async findAll(@Query() queries): Promise<FilteredUsersProfile> {
    const key = Object.keys(queries)[0];
    if(key === 'name') {
      console.log(`server controller: findByName(${queries.name})`);
      return await this.usersProfileService.findByName(queries.name, queries.offset, queries.limit);
    } else if(key === 'age') {
      console.log(`server controller: findByAge(${queries.age})`);
      return await this.usersProfileService.findByAge(parseInt(queries.age), queries.offset, queries.limit);
    } else if(key === 'gender') {
      console.log(`server controller: findByGender(${queries.gender})`);
      return await this.usersProfileService.findByGender(queries.gender, queries.offset, queries.limit);
    }
    return await this.usersProfileService.findAll();
  }

  @HttpCode(204)
  @Delete(':id')
  async removeById(@Param() params): Promise<{statusCode: number}> {
    try {
      const affected = await this.usersProfileService.remove(params.id);
      return {statusCode: affected};
    } catch(err) {
      console.error(`Controller: ${err.message}`)
    }
  }
}
