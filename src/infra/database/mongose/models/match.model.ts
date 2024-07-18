import mongoose, { Document, Schema, model, Model } from 'mongoose';

export interface MatchDocument extends Document<string> {
  name: string;
  thumb: string;
  description: string;
  soccerField: mongoose.Types.ObjectId;
  schedule: mongoose.Types.ObjectId;
  players: mongoose.Types.ObjectId[];
  teams: mongoose.Types.ObjectId[];
}

const matchSchema: Schema = new Schema({
  name: String,
  thumb: String,
  description: String,
  players: [{ type: mongoose.Schema.Types.ObjectId, ref: 'player' }],
  schedule: { type: mongoose.Schema.Types.ObjectId, ref: 'schedule' },
  soccerField: { type: mongoose.Schema.Types.ObjectId, ref: 'soccer-field' },
  teams: [{ type: mongoose.Schema.Types.ObjectId, ref: 'team' }],
});

const MatchModel: Model<MatchDocument> = model<MatchDocument>(
  'match',
  matchSchema
);

export default MatchModel;
