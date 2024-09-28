import { Model, model, Schema, Document } from 'mongoose';

export interface UserDocument extends Document<string> {
  name: string;
  email: string;
  password: string;
  photoUrl: string;
}

export const userSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  photoUrl: {
    type: String,
    required: true,
  },
});

export const UserModel: Model<UserDocument> = model<UserDocument>(
  'user',
  userSchema
);
