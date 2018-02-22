import {User} from '../models/user';

export interface IUserStorage {
  getUser(): User;
  setUser(user: User);
  deleteUser(user: User);
}
