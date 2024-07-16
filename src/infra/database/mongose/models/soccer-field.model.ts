import { Model, model, Schema } from 'mongoose';

export interface SoccerFieldDto extends Document {
  pixKey: string;
  rentalValue: number;
}

export const soccerFieldSchema: Schema = new Schema({
  pixKey: {
    type: String,
    required: true,
  },
  rentalValue: {
    type: Number,
    required: true,
  },
});

const SoccerFieldModel: Model<SoccerFieldDto> = model<SoccerFieldDto>(
  'soccer-field',
  soccerFieldSchema
);

export default SoccerFieldModel;
