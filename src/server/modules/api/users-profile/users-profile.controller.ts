import {Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query, UseFilters} from '@nestjs/common';
import { UserProfileDto } from './dto/user-profile.dto';
import { UsersProfileService } from './users-profile.service';
import { UserProfile } from './user-profile.entity';
import { HttpExceptionFilter } from '../../common/filters/http-exception.filter';

export interface FilteredUsersProfile {
  rows?: UserProfile[];
  count?: number;
}


@Controller('api/users-profile')
export class UsersProfileController {

  constructor(private readonly usersProfileService: UsersProfileService) {}

  @HttpCode(201)
  @Post()
  async create(@Body() userProfileDto: UserProfileDto) {
    console.log(userProfileDto);
    await this.usersProfileService.create(userProfileDto);
  }

  @Put()
  async update(@Body() userProfileDto: UserProfileDto) {
    console.log('Server Update ' + typeof userProfileDto.id);
    await this.usersProfileService.update(userProfileDto.id, userProfileDto);
  }


  @HttpCode(200)
  @Get(':id')
  async findById(@Param() params): Promise<UserProfile> {
    return await this.usersProfileService.findById(params.id);
  }

  @HttpCode(200)
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
    const affected = await this.usersProfileService.remove(params.id);
    return {statusCode: affected};
  }
}
