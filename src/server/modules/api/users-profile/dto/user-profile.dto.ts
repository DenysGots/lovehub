import { Gender } from '../user-profile.entity';

export class UserProfileDto {
  readonly firstName: string;
  readonly lastName: string;
  readonly age: number;
  readonly gender: string;
}
