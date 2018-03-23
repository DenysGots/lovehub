import * as jwt from 'jsonwebtoken';
import { ExpressMiddleware, Middleware, NestMiddleware } from '@nestjs/common';
import { AsyncExpressMiddleware } from '@nestjs/common/interfaces';
import { Request, Response, NextFunction } from 'express';
import { User } from '../../api/users/user.entity';
import { MessageCodeError } from '../error/MessageCodeError';

@Middleware()
export class AuthMiddleware implements NestMiddleware {

  public resolve(...args: any[]): ExpressMiddleware | AsyncExpressMiddleware | Promise<AsyncExpressMiddleware> {
    return async(req: Request, res: Response, next: NextFunction) => {
      if(req.headers.authorization && ((req.headers.authorization as string).split(' ')[0]) === 'Bearer') {
        const token = (req.headers.authorization as string).split(' ')[1];
        let decoded: any = jwt.verify(token, process.env.JWT_KEY || 'secretKey');

        const user = await User.findOne<User>({
          where: {
            email: decoded.email
          }
        });

        console.log('AuthMiddleware ' + user.name);
        if (!user) {
          throw new MessageCodeError('request:unauthorized');
        }

        next();
      } else {
        throw new MessageCodeError('request:unauthorized');
      }
    }
  }
}
