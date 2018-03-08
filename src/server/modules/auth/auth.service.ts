import * as jwt from 'jsonwebtoken';
import * as crypto from 'crypto';
import { Component } from '@nestjs/common';
import { IAuthService, IJwtOptions } from './interfaces/IAuthService';
import { User } from '../api/users/user.entity';

@Component()
export class AuthService implements IAuthService {
  options: IJwtOptions = {
    algorithm: 'HS256',
    expiresIn: '1h',
    jwtid: process.env.JWT_ID || '1',
  };

  public async sign(credentials: { email: string; password: string }): Promise<string> {
    const user = await User.findOne<User>({ where: { id: 1 }});

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
