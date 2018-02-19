import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [ApiController],
  components: [],
})
export class ApiModule {}
