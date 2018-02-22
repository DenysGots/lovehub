import {Module, NestModule, RequestMethod} from '@nestjs/common';
import { LoginController} from './login.controller';
import { LoginService} from '../../services/login.service';
import { LoginValidateService } from '../../services/login-validate.service';
import {MiddlewaresConsumer} from '@nestjs/common/interfaces/middlewares';
import { LoginMiddleware } from './login.middleware';

@Module({
  controllers: [LoginController],
  components: [LoginValidateService, LoginService]
})
export class LoginModule implements NestModule {
  configure(consumer: MiddlewaresConsumer): void {
    consumer.apply(LoginMiddleware).forRoutes(
      {path: 'api/login', method: RequestMethod.POST}
    );
  }
}
