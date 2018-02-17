export class UserProfile {

  id: number;
  firstName: string;
  lastName: string;
  numberLike: number;
  age: number;
  isBaned: boolean;
  isActive: boolean;

  constructor(id: number, firstName: string, lastName: string, age: number) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
  }
}
