import {Middleware, NestMiddleware, ExpressMiddleware, Inject} from '@nestjs/common';
import { LoginValidateService } from '../../services/login-validate.service';

@Middleware()
export class LoginMiddleware implements NestMiddleware {
  constructor(@Inject('LoginValidateService') private logValidator: LoginValidateService) {}
  resolve(...ags: any[]): ExpressMiddleware {
    return (req, res, next) => {
      console.log(req.body);
        const {email, password} = req.body;
        if (!this.logValidator.validateEmail(email) || !this.logValidator.validatePassword(password)) {
          console.log('no valid');
          res.send({});
        } else {
          console.log('valid');
          next();
        }
    };
  }
}
