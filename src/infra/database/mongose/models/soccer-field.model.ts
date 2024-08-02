import { Document, Model, model, Schema } from 'mongoose';

export interface SoccerFieldDocument extends Document<string> {
  pixKey: string;
  rentalValue: number;
  worksDay: Array<string>;
  workStartTime: string;
  workFinishTime: string;
}

export const soccerFieldSchema: Schema = new Schema({
  pixKey: {
    type: String,
    required: true,
  },
  worksDay: {
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
