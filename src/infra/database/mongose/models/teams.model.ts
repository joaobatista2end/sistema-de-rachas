import { Model, model, Schema } from 'mongoose';
import { playerSchema } from './player.model';

export interface TeamdDto extends Document {
  name: string;
}

export const teamSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  players: [playerSchema],
});

const SoccerFieldModel: Model<TeamdDto> = model<TeamdDto>('team', teamSchema);

export default SoccerFieldModel;
