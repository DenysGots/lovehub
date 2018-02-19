export class User {
  name: string;
  bday: string;
  location: string;
  sex: string;
  interestingIn: string;
  email: string;
  password: string;
  constructor(name: string, bday: string, location: string, sex: string, interestingIn: string, email: string, password: string) {
    this.email = email;
    this.bday = bday;
    this.location = location;
    this.sex = sex;
    this.interestingIn = interestingIn;
    this.name = name;
    this.password = password;
  }
}
