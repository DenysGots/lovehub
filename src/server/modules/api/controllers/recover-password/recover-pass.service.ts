import {Component, Inject} from '@nestjs/common';
import { RecoverPassEntity } from './recover-pass.entity';
import * as nodemailer from 'nodemailer';
import * as crypto from 'crypto';
import {MailService} from '../../services/mail.service';
import {User} from '../../users/user.entity';
import {UsersService} from '../../users/users.service';

@Component()
export class RecoverPassService {

  constructor(@Inject('RecoverPassRepository') private readonly recoverPassRepository: typeof RecoverPassEntity,
              @Inject('MailService') private readonly mailService: MailService,
              @Inject('UsersService') private readonly userService: UsersService) {}


  async recoverPassByEmail(email: string): Promise<any> {
    const user: User = await this.userService.findByEmail(email);
    if (user) {
      const token = await this.mailService.createToken();
      await this.create(user.id, token);
      await this.mailService.sendRecoverPassEmail(email, token);
      return {message: 'Mail was send.'};
    } else {
      return {error: 'User not found.'};
    }
  }

  async updateUserPassword(token: string, newPass: string): Promise<any> {
    const isTokenValid = await this.isTokenValid(token);

    if (isTokenValid) {
      const userToken = await this.findTokenByValue(token);

      await this.userService.updatePass(newPass, userToken.userId);

      return await this.updateTokenStatus(token);
    } else {
      return null;
    }
  }

  async create(userId: number, token: string): Promise<RecoverPassEntity> {
    const recPassEntity = new RecoverPassEntity();
    recPassEntity.token = token;
    recPassEntity.date = Date.now() + '';
    recPassEntity.userId = userId;
    recPassEntity.used = false;

    return await recPassEntity.save();
  }

  async findTokenByValue(value: string): Promise<RecoverPassEntity> {
    return await this.recoverPassRepository.findOne({where: {token: value}});
  }

  async updateTokenStatus(value: string) {
    return await this.recoverPassRepository.update({used: true}, {where: {token: value}});
  }

  async isTokenUsed(value: string): Promise<boolean> {
    const token = await this.findTokenByValue(value);
    const isUsed = token.used;

    return isUsed;
  }

  async isTokenValid(value: string): Promise<boolean> {
    const token = await this.findTokenByValue(value);
    const currDate = Date.now();
    if (currDate - (+token.date) > 300000) {
      return false;
    }

    return true;
  }
}
