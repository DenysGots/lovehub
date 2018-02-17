import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { UsersProfileController } from './users-profile.controller';
import { usersProfileProviders } from './users-profile.providers';
import { UsersProfileService } from './users-profile.service';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersProfileController],
  components: [UsersProfileService, ...usersProfileProviders],
})
export class UsersProfileModule {}