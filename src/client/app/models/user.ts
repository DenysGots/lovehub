export class User {
  constructor(private _username: string, private _age: string) {}


  get username(): string {
    return this._username;
  }

  set username(value: string) {
    this._username = value;
  }

  get age(): string {
    return this._age;
  }

  set email(value: string) {
    this._age = value;
  }
}
