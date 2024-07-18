import { Document, Schema, model, Model } from 'mongoose';

export interface PlayerDocument extends Document<string> {
  name: string;
  stars: number;
}

export const playerSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  stars: {
    type: Number,
    required: true,
  },
});

const PlayerModel: Model<PlayerDocument> = model<PlayerDocument>(
  'player',
  playerSchema
);

export default PlayerModel;
