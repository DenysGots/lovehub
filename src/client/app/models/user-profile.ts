export class UserProfile {

  private _id: number;
  private _firstName: string;
  private _lastName: string;
  private _numberLike: number;
  private _age: number;
  private _isBaned: boolean;
  private _isActive: boolean;

  constructor(id: number, firstName: string, lastName: string, age: number) {
    this._id = id;
    this._firstName = firstName;
    this._lastName = lastName;
    this._age = age;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get firstName(): string {
    return this._firstName;
  }

  set firstName(value: string) {
    this._firstName = value;
  }

  get lastName(): string {
    return this._lastName;
  }

  set lastName(value: string) {
    this._lastName = value;
  }

  get numberLike(): number {
    return this._numberLike;
  }

  set numberLike(value: number) {
    this._numberLike = value;
  }

  get age(): number {
    return this._age;
  }

  set age(value: number) {
    this._age = value;
  }

  get isBaned(): boolean {
    return this._isBaned;
  }

  set isBaned(value: boolean) {
    this._isBaned = value;
  }

  get isActive(): boolean {
    return this._isActive;
  }

  set isActive(value: boolean) {
    this._isActive = value;
  }
}
