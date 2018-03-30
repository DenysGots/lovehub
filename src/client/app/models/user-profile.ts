export class UserProfile {

  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: number;
  age: number;
  role: string;
  sex: string;
  preference: string;
  orientation: string;
  location: string;
  isBaned: boolean;
  isActive: boolean;
  avatar: string;
  userId: number;

  constructor(id: number,
              firstName: string,
              lastName: string,
              age: number,
              role: string,
              sex: string,
              orientation: string,
              preference: string,
              location: string,
              avatar: string = null) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.sex = sex;
    this.role = role;
    this.orientation = orientation;
    this.preference = preference;
    this.location = location;
    this.avatar = avatar;
  }
}
