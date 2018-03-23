import * as jwt from 'jsonwebtoken';

import { Component, Inject } from '@nestjs/common';
import { IAuthService, IJwtOptions } from './interfaces/IAuthService';
import { User } from '../api/users/user.entity';
import {UsersService} from '../api/users/users.service';

@Component()
export class AuthService implements IAuthService {
  options: IJwtOptions = {
    algorithm: 'HS256',
    expiresIn: '1h',
    jwtid: process.env.JWT_ID || '1',
  };

  public async sign(credentials: { email: string, password: string }): Promise<string> {
    const user = await User.findOne({where: {email: credentials.email, password: credentials.password}});

    if (!user) {
      throw new Error('UserNotFound');
    }

    const payload = {
      id: user.id,
      email: user.email,
    };

    return await jwt.sign(payload, process.env.JWT_KEY || 'secretKey', this.options);
  }
}
