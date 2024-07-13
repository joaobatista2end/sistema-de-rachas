import { Document, Schema, model, Model } from 'mongoose';

export interface PlayerDto extends Document {
  name: string;
  stars: number;
}

const playerSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  stars: {
    type: Number,
    required: true,
  },
});

const PlayerModel: Model<PlayerDto> = model<PlayerDto>('player', playerSchema);

export default PlayerModel;
