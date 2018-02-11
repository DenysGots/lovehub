import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { UsersProfileController } from './users-profile.controller';
import { UsersProfileService } from '../../../../client/app/services/users-profile.service';
import { usersProfileProviders } from './users-profile.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersProfileController],
  components: [UsersProfileService, ...usersProfileProviders],
})
export class UsersProfileModule {}
