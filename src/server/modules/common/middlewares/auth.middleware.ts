import * as jwt from 'jsonwebtoken';
import { ExpressMiddleware, Middleware, NestMiddleware } from '@nestjs/common';
import { AsyncExpressMiddleware } from '@nestjs/common/interfaces';
import { Request, Response, NextFunction } from 'express';
import { User } from '../../api/users/user.entity';

@Middleware()
export class AuthMiddleware implements NestMiddleware {
  public resolve(...args: any[]): ExpressMiddleware | AsyncExpressMiddleware | Promise<AsyncExpressMiddleware> {
    return async(req: Request, res: Response, next: NextFunction) => {
      if(req.headers.authrization && (req.headers.authorization as string).split(' ')[0] === 'AuthToken') {
        const token = (req.headers.authorization as string).split(' ')[1];
        const decoded: any = jwt.verify(token, process.env.JWT_KEY || '');

        const user = await User.findOne<User>({
          where: {
            id: decoded.id,
            email: decoded.email,
          }
        });

        if (!user) {
          throw new Error('Unauthorized');
        }

        next();
      }
    }
  }
}
