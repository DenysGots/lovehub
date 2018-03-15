import { Document } from 'mongoose';

export interface Photo extends Document {
  readonly name: string;
  readonly base64: string;
}
