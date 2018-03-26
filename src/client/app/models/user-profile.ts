import { User } from './user';

export class UserProfile {

  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: number;
  age: number;
  sex: string;
  preference: string;
  orientation: string;
  location: string;
  isBaned: boolean;
  isActive: boolean;
  userId: User;

  constructor(id: number,
              firstName: string,
              lastName: string,
              age: number,
              sex: string,
              orientation: string,
              preference: string,
              location: string ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.sex = sex;
    this.orientation = orientation;
    this.preference = preference;
    this.location = location;
  }
}
