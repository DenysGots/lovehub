import {Component} from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Component()
export class RecoverPassService {

 async sendRecoverPassEmail(email: string) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'lovehub.kv034@gmail.com',
        pass: 'Q32xr710061997'
      }
    });

    const mailOptions = {
      from: 'lovehub.kv034@gmail.com',
      to: email,
      subject: 'LoveHub Password Reset',
      text: ``
    };

    try {
      const res = await transporter.sendMail(mailOptions);
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  }
}
