import { Component } from '@nestjs/common';
import { User } from './user';

@Component()
export class LoginService {

  findUser(email: string, password: number): User {

    return {username: '', age: 10};
  }
}
