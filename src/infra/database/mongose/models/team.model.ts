import { Document, Schema, model, Model } from 'mongoose';
import { PlayerDto } from './player.model';

export interface TeamDto extends Document {
  name: string;
  players: Array<PlayerDto['_id']>;
  minPlayers?: number;
  maxPlayers?: number;
}

const teamSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  players: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Player',
    },
  ],
  minPlayers: {
    type: Number,
    default: 6,
  },
  maxPlayers: {
    type: Number,
    default: 12,
  },
});

const TeamModel: Model<TeamDto> = model<TeamDto>('Team', teamSchema);

export default TeamModel;
