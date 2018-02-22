import { Injectable } from '@angular/core';
import {IUserStorage} from './IUserStorage';
import {User} from '../models/user';

@Injectable()
export class UserLocalStorageService implements IUserStorage {

  getUser(): User {
    const user = JSON.parse(localStorage.getItem('user'));

    return user;
  }

  setUser(user: User): void {
    const currUser = JSON.stringify(user);
    localStorage.setItem('user', currUser);
    console.log('User saved');
  }

  deleteUser(user: User) {
    localStorage.removeItem('user');
    console.log('user removed');
  }
}
