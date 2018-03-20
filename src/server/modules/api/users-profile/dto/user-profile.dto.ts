import { SEX } from '../sex';
import { ORIENTATION } from '../orientation';
import { PREFERENCE } from '../preference';

export class UserProfileDto {
  readonly firstName: string;
  readonly lastName: string;
  readonly age: number;
  readonly sex: SEX;
  readonly preference: PREFERENCE;
  readonly orientation: ORIENTATION;
  readonly userId: number;
}
