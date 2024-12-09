import mongoose, { Document, Schema, model } from 'mongoose';
import { PlayerDocument } from './player.model';

export interface TeamDocument extends Document<string> {
  name: string;
  players: mongoose.Types.ObjectId[];
  minPlayers?: number;
  maxPlayers?: number;
}

export interface TeamDocumentWithRelationships extends Document<string> {
  name: string;
  players: PlayerDocument[];
  minPlayers?: number;
  maxPlayers?: number;
}

export const teamSchema: Schema = new Schema({
  name: { type: String, required: true },
  players: [{ type: Schema.Types.ObjectId, ref: 'Player' }],
  minPlayers: { type: Number, default: 6 },
  maxPlayers: { type: Number, default: 12 },
});

export const TeamModel = model<TeamDocument>('Team', teamSchema);
