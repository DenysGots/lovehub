import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { UsersModule } from './users/users.module';
import { UsersProfileModule } from './users-profile/users-profile.module';

@Module({
  imports: [UsersModule, UsersProfileModule],
  controllers: [],
  components: [],
})
export class ApiModule {}
