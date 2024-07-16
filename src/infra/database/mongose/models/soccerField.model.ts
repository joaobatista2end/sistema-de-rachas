import { Document, Schema, model, Model } from 'mongoose';

export interface SoccerFieldDto extends Document {
  name: string;
  location: string;
  rentalValue: number;
}

const soccerFieldSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  rentalValue: {
    type: Number,
    required: true,
  },
});

const SoccerFieldModel: Model<SoccerFieldDto> = model<SoccerFieldDto>('SoccerField', soccerFieldSchema);

export default SoccerFieldModel;
