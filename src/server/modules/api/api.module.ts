import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { UsersModule } from './users/users.module';
import { UsersProfileModule } from './users-profile/users-profile.module';
import { LoginModule } from './controllers/login/login.module';

@Module({
  imports: [LoginModule, UsersModule, UsersProfileModule],
  controllers: [ApiController],
  components: [],
})
export class ApiModule {}
