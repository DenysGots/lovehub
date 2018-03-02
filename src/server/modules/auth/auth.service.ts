import * as jwt from 'jsonwebtoken';
import * as crypto from 'crypto';
import { Component } from '@nestjs/common';
import { IAuthService, IJwtOptions } from './interfaces/IAuthService';
import { User } from '../api/users/user.entity';

@Component()
export class AuthService implements IAuthService {
  options: IJwtOptions = {
    algorithm: 'HS256',
    expiresIn: '2 days',
    jwtid: process.env.JWT_ID || '',
  };

  public async sign(credentials: { email: string; password: string }): Promise<string> {
    const user = await User.findOne<User>({
      where: {
        email: credentials.email,
        password: crypto.createHmac('sha256', credentials.password).digest('hex'),
      },
    });

    if (!user) {
      throw new Error('UserNotFound');
    }

    const payload = {
      id: user.id,
      email: user.email,
    };

    return await jwt.sign(payload, process.env.JWT_KEY || '', this.options);
  }
}
