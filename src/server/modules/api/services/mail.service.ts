import { Component } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as crypto from 'crypto';

@Component()
export class MailService {

  service = 'gmail';
  authMail = 'lovehub.kv034@gmail.com';
  authPass = 'Q32xr710061997';


  async createToken(): Promise<string> {
    try {
      const buf = await crypto.randomBytes(20);
      const token = buf.toString('hex');

      return token;
    } catch (error) {
      console.log(error);
    }
  }

  async sendRecoverPassEmail(email: string, token: string) {
    const transporter = nodemailer.createTransport({
      service: this.service,
      auth: {
        user: this.authMail,
        pass: this.authPass
      }
    });

    const mailOptions = {
      from: 'lovehub.kv034@gmail.com',
      to: email,
      subject: 'LoveHub Password Reset',
      text: `Its your reset password link http://localhost:4200/forgot/${token}`
    };

    try {
      const res = await transporter.sendMail(mailOptions);
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  }

}
