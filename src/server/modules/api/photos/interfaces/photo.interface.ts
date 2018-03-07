import { Document } from 'mongoose';

export interface Photo extends Document {
  readonly name: string;
  readonly id: Number;
  readonly base64: String;
}
