import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { UsersProfileController } from './users-profile.controller';
import { usersProfileProviders } from './users-profile.providers';
import { likesProvider } from './users-profile.providers';
import { UsersProfileService } from './users-profile.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [DatabaseModule, UsersModule],
  controllers: [UsersProfileController],
  components: [UsersProfileService, ...usersProfileProviders, ...likesProvider],
  exports: [UsersProfileService]
})
export class UsersProfileModule {}
