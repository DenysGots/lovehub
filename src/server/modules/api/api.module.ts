import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { LoginModule } from './controllers/Login/login.module';

@Module({
  imports: [LoginModule],
  controllers: [ApiController],
  components: [],
})
export class ApiModule {}
