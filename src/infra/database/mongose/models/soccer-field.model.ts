import { Document, Model, model, Schema } from 'mongoose';

export interface SoccerFieldDocument extends Document<string> {
  name: string | null;
  pixKey: string | null;
  rentalValue: number | null;
  workDays: Array<string> | null;
  workStartTime: string | null;
  workFinishTime: string | null;
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
});

const SoccerFieldModel: Model<SoccerFieldDocument> = model<SoccerFieldDocument>(
  'soccer-field',
  soccerFieldSchema
);

export default SoccerFieldModel;
