import mongoose, { Document, Schema, model, Model } from 'mongoose';

export interface TeamDocument extends Document<string> {
  name: string;
  players: mongoose.Types.ObjectId[];
  minPlayers?: number;
  maxPlayers?: number;
}

export const teamSchema: Schema = new Schema({
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

const TeamModel: Model<TeamDocument> = model<TeamDocument>('Team', teamSchema);

export default TeamModel;
