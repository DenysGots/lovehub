export class User {
  name?: string;
  bday?: string;
  location?: string;
  sex?: string;
  preference?: string;
  orientation?: string;
  email?: string;
  password?: string;
  constructor(name?: string,
              bday?: string,
              location?: string,
              sex?: string,
              preference?: string,
              orientation?: string,
              email?: string,
              password?: string) {
    this.email = email;
    this.bday = bday;
    this.location = location;
    this.sex = sex;
    this.preference = preference;
    this.orientation = orientation;
    this.name = name;
    this.password = password;
  }
}
// export class User {
//
//   private _id: number;
//   private _email: string;
//   private _hashPassword?: string;
//
//
//   constructor(id: number, email: string, hashPassword: string) {
//     this._id = id;
//     this._email = email;
//     this._hashPassword = hashPassword;
//   }
//
//   get id(): number {
//     return this._id;
//   }
//
//   set id(value: number) {
//     this._id = value;
//   }
//
//   get email(): string {
//     return this._email;
//   }
//
//   set email(value: string) {
//     this._email = value;
//   }
//
//   get hashPassword(): string {
//     return this._hashPassword;
//   }
//
//   set hashPassword(value: string) {
//     this._hashPassword = value;
//   }
// }
