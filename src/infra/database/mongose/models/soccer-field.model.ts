import mongoose, { Document, Model, model, Schema } from 'mongoose';
import { UserDocument } from './user.model';

export interface SoccerFieldDocument extends Document<string> {
  name: string;
  pixKey: string;
  rentalValue: number;
  workDays: Array<string>;
  workStartTime: string;
  workFinishTime: string;
  user: UserDocument;
}

export const soccerFieldSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  pixKey: {
    type: String,
    required: true,
  },
  workDays: {
    type: Array<String>,
    required: true,
  },
  workStartTime: {
    type: String,
    required: true,
  },
  workFinishTime: {
    type: String,
    required: true,
  },
  rentalValue: {
    type: Number,
    required: true,
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
});

const SoccerFieldModel: Model<SoccerFieldDocument> = model<SoccerFieldDocument>(
  'soccer-field',
  soccerFieldSchema
);

export default SoccerFieldModel;
